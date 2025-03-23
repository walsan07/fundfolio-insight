
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

interface Withdrawal {
  fund: string;
  folio: string;
  redemptionDate: string;
  amount: number;
  units: number;
}

interface WithdrawalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawals: Withdrawal[];
}

const WithdrawalsModal = ({
  isOpen,
  onClose,
  withdrawals,
}: WithdrawalsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Withdrawal Transactions Details</DialogTitle>
          <DialogDescription>
            History of your mutual fund redemptions
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-left">
                <th className="p-3 font-medium">Fund</th>
                <th className="p-3 font-medium">Folio</th>
                <th className="p-3 font-medium">Redemption Date</th>
                <th className="p-3 font-medium text-right">Amount Withdrawn</th>
                <th className="p-3 font-medium text-right">Units</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length > 0 ? (
                withdrawals.map((withdrawal, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-secondary/20">
                    <td className="p-3">{withdrawal.fund}</td>
                    <td className="p-3">{withdrawal.folio}</td>
                    <td className="p-3">{withdrawal.redemptionDate}</td>
                    <td className="p-3 text-right">{formatINR(withdrawal.amount)}</td>
                    <td className="p-3 text-right">{withdrawal.units}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No withdrawal transactions available
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

export default WithdrawalsModal;
