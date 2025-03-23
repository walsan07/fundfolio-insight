
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { formatINR } from '@/lib/utils';
import { Info, Receipt } from 'lucide-react';

interface LTCGSummary {
  eligibleUnits: number;
  eligibleValue: number;
  longTermRealizedGain: number;
  unrealizedLTGain: number;
  totalLTGain: number;
  nonTaxableAmount: number;
  finalTaxableLTGain: number;
}

interface TaxSummaryProps {
  ltcgSummary: LTCGSummary;
  onViewLTCGDetails: () => void;
}

const TaxSummary = ({ ltcgSummary, onViewLTCGDetails }: TaxSummaryProps) => {
  return (
    <Card className="overflow-hidden animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Long-Term Gains & Tax</h3>
          <Receipt className="h-5 w-5 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">LTCG Eligible Units</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Units eligible for Long Term Capital Gains tax treatment (held &gt; 1 year)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="stat-value">{ltcgSummary.eligibleUnits.toFixed(3)}</p>
            </div>
            
            <div>
              <p className="stat-title">Eligible Current Value</p>
              <p className="stat-value">{formatINR(ltcgSummary.eligibleValue)}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">Long-Term Realized Gain (Current FY)</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit from long-term investments redeemed in current financial year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="stat-value">{formatINR(ltcgSummary.longTermRealizedGain)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="stat-title">Unrealized LT Gain</p>
              <p className="stat-value">{formatINR(ltcgSummary.unrealizedLTGain)}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">Total LT Gain (LTCG)</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total Long Term Capital Gains (realized + unrealized)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="stat-value">{formatINR(ltcgSummary.totalLTGain)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="stat-title">Non-Taxable Amount</p>
                <p className="text-lg font-medium">{formatINR(ltcgSummary.nonTaxableAmount)}</p>
              </div>
              
              <div>
                <p className="stat-title">Final Taxable LT Gain</p>
                <p className="text-lg font-medium">{formatINR(ltcgSummary.finalTaxableLTGain)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onViewLTCGDetails}>
            View LTCG Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaxSummary;
