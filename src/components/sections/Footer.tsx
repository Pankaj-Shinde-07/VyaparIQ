import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="h-12 w-auto object-contain" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
              AI-Powered Business Automation for SMEs. Automate your invoicing, follow-ups, and daily operations.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-brand-teal dark:hover:text-brand-teal hover:border-brand-teal dark:hover:border-brand-teal transition-colors shadow-sm">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-teal dark:hover:text-brand-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-teal dark:hover:text-brand-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-teal dark:hover:text-brand-teal transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} VyaparIQ Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
             <span>Made with</span>
             <span className="text-rose-500">♥</span>
             <span>for modern businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// synced
