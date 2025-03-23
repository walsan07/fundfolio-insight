
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-border/40 py-4 px-4 md:px-6 lg:px-8 sticky top-0 z-10 backdrop-blur-md bg-white/80">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-medium">Investment Dashboard</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Button size="sm" asChild>
              <Link to="/dashboard">Upload CAS</Link>
            </Button>
          </nav>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
