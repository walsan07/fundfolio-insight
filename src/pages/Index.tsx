
import { useState } from 'react';
import UploadSection from '@/components/UploadSection';
import InvestmentSummary from '@/components/InvestmentSummary';
import GainsSummary from '@/components/GainsSummary';
import TaxSummary from '@/components/TaxSummary';
import FundsList from '@/components/FundsList';
import SkeletonDashboard from '@/components/SkeletonDashboard';
import LTCGDetailsModal from '@/components/modals/LTCGDetailsModal';
import LockedFundsModal from '@/components/modals/LockedFundsModal';
import WithdrawalsModal from '@/components/modals/WithdrawalsModal';
import Navbar from '@/components/Navbar';
import { transformData } from '@/lib/utils';

const Index = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [ltcgModalOpen, setLtcgModalOpen] = useState(false);
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const [withdrawalsModalOpen, setWithdrawalsModalOpen] = useState(false);

  const handleDataReceived = (data: any) => {
    setLoading(true);
    // Simulate a short loading delay for better UX
    setTimeout(() => {
      const transformedData = transformData(data);
      setDashboardData(transformedData);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 pb-20">
        <UploadSection onDataReceived={handleDataReceived} />
        
        {loading ? (
          <div className="mt-8">
            <SkeletonDashboard />
          </div>
        ) : dashboardData ? (
          <div className="mt-8 space-y-8">
            <InvestmentSummary 
              stats={dashboardData.summaryStats}
              onViewLockedDetails={() => setLockedModalOpen(true)}
            />
            
            <GainsSummary 
              realized={dashboardData.realizedGains}
              unrealized={dashboardData.unrealizedGains}
            />
            
            <TaxSummary 
              ltcgSummary={dashboardData.ltcgSummary}
              onViewLTCGDetails={() => setLtcgModalOpen(true)}
            />
            
            <FundsList amcs={dashboardData.amcs} />
            
            {/* Modals */}
            <LTCGDetailsModal 
              isOpen={ltcgModalOpen}
              onClose={() => setLtcgModalOpen(false)}
              details={dashboardData.ltcgDetails}
            />
            
            <LockedFundsModal 
              isOpen={lockedModalOpen}
              onClose={() => setLockedModalOpen(false)}
              lockedFunds={dashboardData.lockedFunds}
            />
            
            <WithdrawalsModal 
              isOpen={withdrawalsModalOpen}
              onClose={() => setWithdrawalsModalOpen(false)}
              withdrawals={dashboardData.withdrawals}
            />
          </div>
        ) : null}
      </main>
      
      <footer className="border-t border-border/30 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Your investment data is processed locally and never stored on any server</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
