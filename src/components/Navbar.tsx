import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Zap, Target, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Industries", href: "#industries" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto",
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-4 border-b border-slate-200 dark:border-slate-800"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto md:h-10 object-contain" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn("text-sm font-medium transition-colors hover:text-brand-teal", scrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-800 dark:text-slate-200")}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/dashboard" className={cn("text-sm font-medium px-5 py-2.5 rounded-full transition-all active:scale-95 flex items-center gap-2", scrolled ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100")}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className={cn("text-sm font-medium transition-colors", scrolled ? "text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" : "text-slate-800 hover:text-black dark:text-slate-200 dark:hover:text-white")}>
                  Log in
                </Link>
                <Link to="/register" className={cn("text-sm font-medium px-5 py-2.5 rounded-full transition-all active:scale-95 flex items-center gap-2", scrolled ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100")}>
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn("md:hidden p-2 transition-colors", scrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-800 dark:text-slate-200")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-800 p-2 hover:bg-slate-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="border-slate-100 my-2" />
          {isAuthenticated ? (
            <Link to="/dashboard" className="w-full text-center text-base font-medium bg-brand-teal text-white px-5 py-3 rounded-xl">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="w-full text-center text-base font-medium text-slate-700 p-2">
                Log in
              </Link>
              <Link to="/register" className="w-full text-center text-base font-medium bg-brand-teal text-white px-5 py-3 rounded-xl">
                Start Free Trial
              </Link>
            </>
          )}
        </motion.div>
      )}
    </header>
  );
}

// synced
