
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatINR } from '@/lib/utils';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Fund {
  scheme: string;
  folio: string;
  isin: string;
  currentMarketValue: number;
  currentlyInvested: number;
  overallProfit: number;
  profitPercentage: number;
  overallRealizedGain: number;
  currentFYRealizedGain: number;
  unrealizedGain: number;
  unrealizedLongTermGain: number;
  unrealizedShortTermGain: number;
  xirr: number | null;
}

interface AMC {
  name: string;
  funds: Fund[];
}

interface FundsListProps {
  amcs: AMC[];
}

const FundsList = ({ amcs }: FundsListProps) => {
  const [expandedFunds, setExpandedFunds] = useState<Record<string, boolean>>({});
  const [expandedAMCs, setExpandedAMCs] = useState<Record<string, boolean>>(
    // Initialize with all AMCs expanded
    amcs.reduce((acc, amc) => {
      acc[amc.name] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleFundDetails = (amcName: string, fundIndex: number) => {
    const key = `${amcName}-${fundIndex}`;
    setExpandedFunds(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAMC = (amcName: string) => {
    setExpandedAMCs(prev => ({
      ...prev,
      [amcName]: !prev[amcName]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Funds by AMC</h3>
      </div>
      
      {amcs.map((amc, amcIndex) => (
        <Card key={amcIndex} className="overflow-hidden">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer bg-secondary/50 hover:bg-secondary/70 transition-colors"
            onClick={() => toggleAMC(amc.name)}
          >
            <h4 className="text-lg font-medium">{amc.name}</h4>
            <Button variant="ghost" size="icon">
              {expandedAMCs[amc.name] ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {expandedAMCs[amc.name] && (
            <div className="p-4 space-y-4">
              {amc.funds.map((fund, fundIndex) => {
                const fundKey = `${amc.name}-${fundIndex}`;
                const isProfitable = fund.overallProfit > 0;
                
                return (
                  <div key={fundIndex} className="fund-card">
                    <div className="fund-card-header">
                      <div>
                        <a 
                          href={`https://coin.zerodha.com/mf/fund/${fund.isin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-1"
                        >
                          {fund.scheme}
                          <ExternalLink className="h-4 w-4 opacity-50" />
                        </a>
                        <p className="text-sm text-muted-foreground">Folio: {fund.folio}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-medium">{formatINR(fund.currentMarketValue)}</p>
                        <div className={`text-sm ${isProfitable ? 'text-investment-growth' : 'text-investment-loss'}`}>
                          {formatINR(fund.overallProfit)} ({fund.profitPercentage}%)
                        </div>
                      </div>
                    </div>
                    
                    <div className="fund-card-content">
                      <span 
                        className="fund-detail-toggle" 
                        onClick={() => toggleFundDetails(amc.name, fundIndex)}
                      >
                        {expandedFunds[fundKey] ? 'Hide Details' : 'View Details'}
                      </span>
                      
                      <div className={`fund-details ${expandedFunds[fundKey] ? 'block' : 'hidden'}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Currently Invested</p>
                            <p className="text-base">{formatINR(fund.currentlyInvested)}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Overall Profit</p>
                            <p className={`text-base ${isProfitable ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.overallProfit)} ({fund.profitPercentage}%)
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Overall Realized Gain</p>
                            <p className={`text-base ${fund.overallRealizedGain >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.overallRealizedGain)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Realized Gain (Current FY)</p>
                            <p className={`text-base ${fund.currentFYRealizedGain >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.currentFYRealizedGain)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Unrealized Gain</p>
                            <p className={`text-base ${fund.unrealizedGain >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.unrealizedGain)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">XIRR</p>
                            <p className={`text-base ${fund.xirr && fund.xirr > 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {fund.xirr ? `${fund.xirr.toFixed(2)}%` : 'N/A'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Unrealized Long-Term Gain</p>
                            <p className={`text-base ${fund.unrealizedLongTermGain >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.unrealizedLongTermGain)}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Unrealized Short-Term Gain</p>
                            <p className={`text-base ${fund.unrealizedShortTermGain >= 0 ? 'text-investment-growth' : 'text-investment-loss'}`}>
                              {formatINR(fund.unrealizedShortTermGain)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FundsList;
