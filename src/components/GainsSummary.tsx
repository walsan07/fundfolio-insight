
import { Card } from '@/components/ui/card';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { formatINR } from '@/lib/utils';
import { Info, PieChart, BarChart3 } from 'lucide-react';

interface RealizedGains {
  overallRealizedGain: number;
  currentFYGain: number;
  longTermGain: number;
  shortTermGain: number;
}

interface UnrealizedGains {
  totalGain: number;
  longTermGain: number;
  shortTermGain: number;
  returnOnInvestment: number;
  lockedProfit: number;
}

interface GainsSummaryProps {
  realized: RealizedGains;
  unrealized: UnrealizedGains;
}

const GainsSummary = ({ realized, unrealized }: GainsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Realized Gains</h3>
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">Overall Realized Gain</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total profit from all redeemed investments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className={`stat-value ${realized.overallRealizedGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                {formatINR(realized.overallRealizedGain)}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">Realized Gain (Current FY)</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit from investments redeemed in the current financial year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className={`stat-value ${realized.currentFYGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                {formatINR(realized.currentFYGain)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="stat-title">Long-Term Gain (FY)</p>
                <p className={`text-lg font-medium ${realized.longTermGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {formatINR(realized.longTermGain)}
                </p>
              </div>
              
              <div>
                <p className="stat-title">Short-Term Gain (FY)</p>
                <p className={`text-lg font-medium ${realized.shortTermGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {formatINR(realized.shortTermGain)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Unrealized Gains</h3>
            <PieChart className="h-5 w-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1">
                <p className="stat-title">Unrealized Gain</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit from current investments that have not been redeemed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className={`stat-value ${unrealized.totalGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                {formatINR(unrealized.totalGain)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="stat-title">Long-Term Gain</p>
                <p className={`text-lg font-medium ${unrealized.longTermGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {formatINR(unrealized.longTermGain)}
                </p>
              </div>
              
              <div>
                <p className="stat-title">Short-Term Gain</p>
                <p className={`text-lg font-medium ${unrealized.shortTermGain >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {formatINR(unrealized.shortTermGain)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1">
                  <p className="stat-title">ROI</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Return on current investment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className={`text-lg font-medium ${unrealized.returnOnInvestment >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {unrealized.returnOnInvestment.toFixed(2)}%
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-1">
                  <p className="stat-title">Locked Profit</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Profit in locked ELSS investments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className={`text-lg font-medium ${unrealized.lockedProfit >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                  {formatINR(unrealized.lockedProfit)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GainsSummary;
