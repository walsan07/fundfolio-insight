
import { useState, useRef } from 'react';
import { Upload, FileType, X, AlertCircle, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface UploadedFile {
  name: string;
  id: number;
  data: any;
}

interface UploadSectionProps {
  onDataReceived: (data: any) => void;
}

const UploadSection = ({ onDataReceived }: UploadSectionProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const passwordForm = useForm({
    defaultValues: {
      password: "",
    },
  });

  const combineData = (resultsArray: any[]) => {
    if (resultsArray.length === 0) return null;
    if (resultsArray.length === 1) return resultsArray[0];

    let combined = {
      data: {
        folios: [],
        investor_info: {},
        statement_period: {}
      },
      msg: "success",
      status: "success"
    };

    // Create a map to track AMCs and merge their schemes
    let amcMap: Record<string, any> = {};
    
    resultsArray.forEach(result => {
      if (!result || !result.data || !result.data.folios) return;
      
      result.data.folios.forEach((folio: any) => {
        let amcName = folio.amc.trim();
        if (amcMap[amcName]) {
          amcMap[amcName].schemes = [...amcMap[amcName].schemes, ...folio.schemes];
        } else {
          amcMap[amcName] = { ...folio };
        }
      });
    });
    
    combined.data.folios = Object.values(amcMap);
    
    // Use investor_info and statement_period from the first result
    if (resultsArray.length > 0) {
      combined.data.investor_info = resultsArray[0].data.investor_info;
      combined.data.statement_period = resultsArray[0].data.statement_period;
    }
    
    return combined;
  };

  const uploadFileWithPassword = async (password: string) => {
    if (!currentFile) return;
    await handleFileUpload(currentFile, password);
    setCurrentFile(null);
  };

  const handleFileUpload = async (file: File, password: string = '') => {
    setIsUploading(true);
    setError(null);
    setUploadStatus('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);
    if (password) {
      formData.append('password', password);
    }

    try {
      const response = await fetch('http://127.0.0.1:5001/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.includes('password')) {
          // If password error, show password dialog
          setCurrentFile(file);
          setPasswordDialogOpen(true);
          setIsUploading(false);
          return;
        }
        throw new Error(data.error || `Server error: ${response.statusText}`);
      }

      console.log('Parsed data received:', data);
      
      // Add to uploaded files
      const newFile = { name: file.name, id: Date.now(), data };
      const updatedFiles = [...uploadedFiles, newFile];
      setUploadedFiles(updatedFiles);
      
      // Clear file input
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setUploadStatus('File uploaded successfully');
      toast({
        title: "Success",
        description: "CAS statement uploaded successfully",
        variant: "default"
      });
      
      // Combine all data and pass to parent component
      const combinedData = combineData(updatedFiles.map(f => f.data));
      onDataReceived(combinedData);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file');
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }

    await handleFileUpload(file);
  };

  const removeFile = (id: number) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    setUploadedFiles(updatedFiles);
    
    if (updatedFiles.length === 0) {
      setUploadStatus('File removed. Please upload a new PDF.');
      onDataReceived(null);
    } else {
      setUploadStatus('File removed. Recombining data from remaining files.');
      const combinedData = combineData(updatedFiles.map(f => f.data));
      onDataReceived(combinedData);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onPasswordSubmit = (values: { password: string }) => {
    setPasswordDialogOpen(false);
    uploadFileWithPassword(values.password);
    passwordForm.reset();
  };

  return (
    <>
      <Card className="w-full overflow-hidden animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <FileType className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-medium">Upload CAS Statement</h3>
          </div>
          
          <p className="text-muted-foreground mb-5">
            Upload your CAMS or Karvy Consolidated Account Statement (CAS) PDF to analyze your investments.
            You can upload multiple PDFs to view combined data.
          </p>
          
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mt-2 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center bg-secondary rounded-full pl-3 pr-1 py-1">
                  <span className="text-sm mr-2">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={triggerFileInput} 
                disabled={isUploading}
                className="relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>{uploadedFiles.length === 0 ? 'Upload PDF' : 'Upload Another PDF'}</span>
                </div>
              </Button>
              
              {uploadStatus && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {uploadStatus === 'File uploaded successfully' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : null}
                  <span>{uploadStatus}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Password Protected PDF</DialogTitle>
            <DialogDescription>
              This PDF is password protected. Please enter the password to continue.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Enter PDF password" {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setPasswordDialogOpen(false);
                    setCurrentFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadSection;
