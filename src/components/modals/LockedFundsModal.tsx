
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

interface LockedFund {
  fund: string;
  folio: string;
  lockedInAmount: number;
  lockedInProfit: number;
}

interface LockedFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lockedFunds: LockedFund[];
}

const LockedFundsModal = ({
  isOpen,
  onClose,
  lockedFunds,
}: LockedFundsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Locked Funds Details (ELSS)</DialogTitle>
          <DialogDescription>
            ELSS funds with a 3-year lock-in period for tax benefits under Section 80C
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-left">
                <th className="p-3 font-medium">Fund</th>
                <th className="p-3 font-medium">Folio</th>
                <th className="p-3 font-medium text-right">Locked-In Amount</th>
                <th className="p-3 font-medium text-right">Locked-In Profit</th>
              </tr>
            </thead>
            <tbody>
              {lockedFunds.length > 0 ? (
                lockedFunds.map((fund, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-secondary/20">
                    <td className="p-3">{fund.fund}</td>
                    <td className="p-3">{fund.folio}</td>
                    <td className="p-3 text-right">{formatINR(fund.lockedInAmount)}</td>
                    <td className={`p-3 text-right ${fund.lockedInProfit >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                      {formatINR(fund.lockedInProfit)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-muted-foreground">
                    No locked funds details available
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

export default LockedFundsModal;
