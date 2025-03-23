
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  TrendingUp, 
  DollarSign, 
  FileText,
  ShieldCheck,
  Clock,
  ChevronRight
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Analyze Your Mutual Fund Investments with Confidence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
                Upload your CAS statement to get detailed insights about your investments, 
                gains, tax implications, and more — all processed locally for maximum privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
              <Card className="w-full max-w-[500px] shadow-xl transform -rotate-2">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="h-40 bg-secondary/50 rounded-lg flex items-center justify-center">
                      <BarChart className="h-24 w-24 text-primary/60" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-secondary/70 rounded"></div>
                      <div className="h-6 w-1/2 bg-secondary/70 rounded"></div>
                      <div className="h-6 w-2/3 bg-secondary/70 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Comprehensive Investment Analysis</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
              Get a complete picture of your mutual fund investments with detailed insights and statistics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/40 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Performance Tracking</h3>
                <p className="text-muted-foreground">Track the performance of your investments with detailed metrics like XIRR and profit percentages.</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Gains Analysis</h3>
                <p className="text-muted-foreground">Analyze your realized and unrealized gains with detailed breakdowns by short-term and long-term.</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Tax Implications</h3>
                <p className="text-muted-foreground">Understand the tax implications of your investments with detailed LTCG calculations.</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Complete Privacy</h3>
                <p className="text-muted-foreground">Your data is processed locally and never stored on any server, ensuring maximum privacy.</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Multiple CAS Support</h3>
                <p className="text-muted-foreground">Upload and analyze multiple CAS statements at once for a comprehensive view of your investments.</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-background w-fit">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Start Analyzing Now</h3>
                <p className="text-muted-foreground mb-4">Ready to get insights into your investments? Head to the dashboard now.</p>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-[800px] mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Investments?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Upload your CAS statement to get detailed insights about your investments.
              All data is processed locally and never stored on any server.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Go to Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
