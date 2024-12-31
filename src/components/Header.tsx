import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Bgremoval.in
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-sm">
              <Link to="/try-now">
                Try Now - It's Free!
              </Link>
            </Button>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className={`
          sm:hidden fixed inset-x-0 top-16 p-4 bg-white border-b transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Button 
              asChild 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/try-now">
                Try Now - It's Free!
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};