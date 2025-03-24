
import { Card } from '@/components/ui/card';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { formatINR } from '@/lib/utils';
import { HelpCircle, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryStats {
  currentMarketValue: number;
  currentlyInvested: number;
  overallProfit: number;
  profitPercentage: number;
  xirr: number;
  lockedAmount: number;
}

interface InvestmentSummaryProps {
  stats: SummaryStats;
  onViewLockedDetails: () => void;
}

const InvestmentSummary = ({
  stats,
  onViewLockedDetails,
}: InvestmentSummaryProps) => {
  const isProfitable = stats.overallProfit > 0;

  return (
    <Card className="overflow-hidden animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Investment Summary</h3>
          <Wallet className="h-5 w-5 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="stat-title">Current Market Value</p>
            <p className="stat-value">{formatINR(stats.currentMarketValue)}</p>
          </div>

          <div>
            <p className="stat-title">Currently Invested</p>
            <p className="stat-value">{formatINR(stats.currentlyInvested)}</p>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="stat-title">Overall Profit</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="z-[1000] TooltipContent">
                    <p>Total profit across all your investments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <p className={`stat-value ${isProfitable ? 'gain-positive' : 'gain-negative'}`}>
                {formatINR(stats.overallProfit)}
              </p>
              <div className={`flex items-center text-sm ${isProfitable ? 'text-investment-growth' : 'text-investment-loss'}`}>
                <span className="flex items-center">
                  {isProfitable ? <TrendingUp className="h-3.5 w-3.5 mr-1" /> : <TrendingDown className="h-3.5 w-3.5 mr-1" />}
                  {stats.profitPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="stat-title">XIRR (Annual Return)</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="z-[1000] TooltipContent">
                    <p>Extended Internal Rate of Return - annualized return of your investments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className={`stat-value ${stats.xirr > 0 ? 'gain-positive' : 'gain-negative'}`}>
              {stats.xirr ? stats.xirr.toFixed(2) : '0.00'}%
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="stat-title">Locked (ELSS) Investment</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="z-[1000] TooltipContent">
                    <p>Investments in ELSS funds that have a lock-in period</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="group flex items-center">
              <p className="stat-value">{formatINR(stats.lockedAmount)}</p>
              <button 
                onClick={onViewLockedDetails} 
                className="ml-2 text-xs py-1 px-2 text-primary rounded bg-primary/5 opacity-80 hover:opacity-100 transition-opacity"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentSummary;
