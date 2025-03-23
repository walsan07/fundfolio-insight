
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, FileText, TrendingUp, Calculator, Shield, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Track & Analyze Your Mutual Fund Investments
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload your CAS statements and get instant insights into your investments, gains, and tax implications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Investment Summary</h3>
                  <BarChart3 className="text-primary h-5 w-5" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-2xl font-bold">₹10,45,230</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-lg font-medium">₹8,25,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="text-lg font-medium text-green-600">+26.7%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/30 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our dashboard provides comprehensive analytics for your mutual fund investments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple CAS Support</h3>
              <p className="text-muted-foreground">
                Upload multiple CAS statements and view your consolidated portfolio in one place.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
              <p className="text-muted-foreground">
                Track your investment performance with metrics like XIRR, absolute returns, and more.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tax Analysis</h3>
              <p className="text-muted-foreground">
                Get detailed tax analysis for your investments, including LTCG & STCG calculations.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data is processed locally and never stored on any server, ensuring complete privacy.
              </p>
            </Card>
            
            <Card className="p-6 md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Insights</h3>
                <p className="text-muted-foreground mb-4">
                  Get detailed insights into your portfolio, including fund-wise breakdowns, locked-in investments, and withdrawal history.
                </p>
                <Button asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/30 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Your investment data is processed locally and never stored on any server</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
