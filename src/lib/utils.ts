
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number as Indian Rupee with commas and ₹ symbol
export function formatINR(num: number): string {
  if (num === undefined || num === null) {
    return "₹0.00";
  }
  return num.toLocaleString('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    minimumFractionDigits: 2 
  });
}

// Transform raw data into formats needed by components
export function transformData(data: any) {
  if (!data || !data.data || !data.data.folios) {
    return null;
  }

  // Investment summary stats
  let overallCurrentMarketValue = 0;
  let overallCurrentlyInvested = 0;
  let overallProfit = 0;
  let overallWithdrawn = 0;
  let xirrValues: number[] = [];
  let lockedOverall = { amount: 0, profit: 0 };
  
  // Realized & unrealized gains summary
  let realizedSummary = { 
    overallRealizedGain: 0,
    currentFY: 0, 
    lt: 0, 
    st: 0 
  };
  
  let unrealizedSummary = { 
    total: 0, 
    lt: 0, 
    st: 0 
  };
  
  // LTCG summary
  let ltcgSummary = { 
    eligibleUnits: 0, 
    eligibleValue: 0, 
    potentialTax: 0, 
    unrealizedLTGain: 0 
  };
  
  // Detailed data
  let lockedDetailsArray: any[] = [];
  let allWithdrawals: any[] = [];
  let ltcgDetails: any[] = [];
  
  // AMCs with funds
  let amcsWithFunds: any[] = [];
  
  // Process data
  data.data.folios.forEach((folio: any) => {
    const amc = folio.amc;
    const amcFunds: any[] = [];
    
    folio.schemes.forEach((scheme: any) => {
      if (scheme.scheme && (scheme.scheme.toLowerCase().includes("uclaim") || scheme.scheme.toLowerCase().includes("redemption"))) {
        return;
      }
      
      const sim = scheme.unrealized_tax_simulation.summary;
      overallCurrentMarketValue += sim.investment_summary.current_market_value;
      overallCurrentlyInvested += sim.investment_summary.currently_invested;
      overallWithdrawn += sim.investment_summary.withdrawn_amount;
      overallProfit += sim.investment_summary.overall_profit;
      
      if (sim.investment_summary.xirr !== null && !isNaN(sim.investment_summary.xirr)) {
        xirrValues.push(sim.investment_summary.xirr);
      }
      
      let schemeRealizedGain = 0;
      if (scheme.unrealized_tax_simulation.details && 
          scheme.unrealized_tax_simulation.details.lot_details_realized) {
        scheme.unrealized_tax_simulation.details.lot_details_realized.forEach((tx: any) => {
          schemeRealizedGain += tx.gain;
        });
      }
      
      realizedSummary.overallRealizedGain += schemeRealizedGain;
      realizedSummary.currentFY += sim.realized.realized_total_gain_current_FY;
      realizedSummary.lt += sim.realized.realized_long_term_gain_current_FY;
      realizedSummary.st += sim.realized.realized_short_term_gain_current_FY;
      
      unrealizedSummary.total += sim.unrealized.unrealized_gain;
      unrealizedSummary.lt += sim.unrealized.unrealized_long_term_gain;
      unrealizedSummary.st += sim.unrealized.unrealized_short_term_gain;
      
      ltcgSummary.eligibleUnits += sim.ltcg_eligibility.eligible_units;
      ltcgSummary.eligibleValue += sim.ltcg_eligibility.eligible_current_value;
      ltcgSummary.potentialTax += sim.ltcg_eligibility.potential_tax_on_ltcg;
      ltcgSummary.unrealizedLTGain += sim.unrealized.unrealized_long_term_gain;
      
      // Locked funds (ELSS)
      let lockedData = sim.locked || scheme.locked;
      if (lockedData && lockedData.locked_in_amount > 0) {
        lockedOverall.amount += lockedData.locked_in_amount;
        lockedOverall.profit += lockedData.locked_in_profit;
        lockedDetailsArray.push({
          fund: scheme.scheme,
          folio: scheme.folio,
          lockedInAmount: lockedData.locked_in_amount,
          lockedInProfit: lockedData.locked_in_profit
        });
      }
      
      // Withdrawals
      if (sim.lot_details_realized && sim.lot_details_realized.length > 0) {
        sim.lot_details_realized.forEach((r: any) => {
          allWithdrawals.push({
            fund: scheme.scheme,
            folio: scheme.folio,
            redemptionDate: r.redemption_date,
            amount: r.gain,
            units: r.units
          });
        });
      }
      
      // LTCG eligible funds
      if (sim.ltcg_eligibility.eligible_current_value > 0) {
        ltcgDetails.push({
          fund: scheme.scheme,
          folio: scheme.folio,
          currentMarketValue: sim.investment_summary.current_market_value,
          eligibleCurrentValue: sim.ltcg_eligibility.eligible_current_value,
          unrealizedLongTermGain: sim.unrealized.unrealized_long_term_gain
        });
      }
      
      // Add fund to AMC
      amcFunds.push({
        scheme: scheme.scheme,
        folio: scheme.folio,
        isin: scheme.isin || '',
        currentMarketValue: sim.investment_summary.current_market_value,
        currentlyInvested: sim.investment_summary.currently_invested,
        overallProfit: sim.investment_summary.overall_profit,
        profitPercentage: sim.investment_summary.profit_percentage,
        overallRealizedGain: schemeRealizedGain,
        currentFYRealizedGain: sim.realized.realized_total_gain_current_FY,
        unrealizedGain: sim.unrealized.unrealized_gain,
        unrealizedLongTermGain: sim.unrealized.unrealized_long_term_gain,
        unrealizedShortTermGain: sim.unrealized.unrealized_short_term_gain,
        xirr: sim.investment_summary.xirr
      });
    });
    
    if (amcFunds.length > 0) {
      amcsWithFunds.push({
        name: amc,
        funds: amcFunds
      });
    }
  });
  
  // Calculate overall stats
  const profitPercentage = overallCurrentlyInvested ? ((overallProfit/overallCurrentlyInvested)*100) : 0;
  const returnOnInvestment = overallCurrentlyInvested ? ((unrealizedSummary.total/overallCurrentlyInvested)*100) : 0;
  
  // Calculate weighted average XIRR
  const overallXirr = xirrValues.length > 0 ? 
    xirrValues.reduce((sum, value) => sum + value, 0) / xirrValues.length : 0;
  
  // Calculate LTCG tax
  let totalLTRealizedFY = realizedSummary.lt;
  let totalLTGain = totalLTRealizedFY + ltcgSummary.unrealizedLTGain;
  let nonTaxable = 100000; // Exempt amount for LTCG
  let taxableLTGain = totalLTGain - nonTaxable;
  taxableLTGain = taxableLTGain > 0 ? taxableLTGain : 0;
  
  return {
    summaryStats: {
      currentMarketValue: overallCurrentMarketValue,
      currentlyInvested: overallCurrentlyInvested,
      overallProfit: overallProfit,
      profitPercentage: profitPercentage,
      xirr: overallXirr,
      lockedAmount: lockedOverall.amount
    },
    realizedGains: {
      overallRealizedGain: realizedSummary.overallRealizedGain,
      currentFYGain: realizedSummary.currentFY,
      longTermGain: realizedSummary.lt,
      shortTermGain: realizedSummary.st
    },
    unrealizedGains: {
      totalGain: unrealizedSummary.total,
      longTermGain: unrealizedSummary.lt,
      shortTermGain: unrealizedSummary.st,
      returnOnInvestment: returnOnInvestment,
      lockedProfit: lockedOverall.profit
    },
    ltcgSummary: {
      eligibleUnits: ltcgSummary.eligibleUnits,
      eligibleValue: ltcgSummary.eligibleValue,
      longTermRealizedGain: totalLTRealizedFY,
      unrealizedLTGain: ltcgSummary.unrealizedLTGain,
      totalLTGain: totalLTGain,
      nonTaxableAmount: nonTaxable,
      finalTaxableLTGain: taxableLTGain
    },
    amcs: amcsWithFunds,
    lockedFunds: lockedDetailsArray,
    withdrawals: allWithdrawals,
    ltcgDetails: ltcgDetails
  };
}
