
import { useState, useRef } from 'react';
import { Upload, FileType, X, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface UploadedFile {
  name: string;
  id: number;
}

interface UploadSectionProps {
  onDataReceived: (data: any) => void;
}

const UploadSection = ({ onDataReceived }: UploadSectionProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    setIsUploading(true);
    setError(null);
    setUploadStatus('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5001/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Parsed data received:', data);
      
      // Add to uploaded files
      const newFile = { name: file.name, id: Date.now() };
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Clear file input
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setUploadStatus('File uploaded successfully');
      toast({
        title: "Success",
        description: "CAS statement uploaded successfully",
        variant: "default"
      });
      
      // Pass data to parent component
      onDataReceived(data);
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

  const removeFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    setUploadStatus('File removed. Please upload a new PDF.');
    // In a real app, you would also need to handle removing the specific data from the server
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full overflow-hidden animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <FileType className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-medium">Upload CAS Statement</h3>
        </div>
        
        <p className="text-muted-foreground mb-5">
          Upload your CAMS or Karvy Consolidated Account Statement (CAS) PDF to analyze your investments.
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
                  <Check className="h-4 w-4 text-investment-growth" />
                ) : null}
                <span>{uploadStatus}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UploadSection;
