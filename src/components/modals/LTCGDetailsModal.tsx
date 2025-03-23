
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

interface LTCGDetail {
  fund: string;
  folio: string;
  currentMarketValue: number;
  eligibleCurrentValue: number;
  unrealizedLongTermGain: number;
}

interface LTCGDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: LTCGDetail[];
}

const LTCGDetailsModal = ({
  isOpen,
  onClose,
  details,
}: LTCGDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>LTCG Eligible Funds Details</DialogTitle>
          <DialogDescription>
            Details of funds eligible for Long Term Capital Gains tax treatment
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-left">
                <th className="p-3 font-medium">Fund</th>
                <th className="p-3 font-medium">Folio</th>
                <th className="p-3 font-medium text-right">Current Market Value</th>
                <th className="p-3 font-medium text-right">LTCG Eligible Value</th>
                <th className="p-3 font-medium text-right">Unlocked LT Gain</th>
              </tr>
            </thead>
            <tbody>
              {details.length > 0 ? (
                details.map((detail, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-secondary/20">
                    <td className="p-3">{detail.fund}</td>
                    <td className="p-3">{detail.folio}</td>
                    <td className="p-3 text-right">{formatINR(detail.currentMarketValue)}</td>
                    <td className="p-3 text-right">{formatINR(detail.eligibleCurrentValue)}</td>
                    <td className="p-3 text-right">{formatINR(detail.unrealizedLongTermGain)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No LTCG eligible details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LTCGDetailsModal;
