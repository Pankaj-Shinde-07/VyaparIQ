import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 border-none transition-colors">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Page Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved to a different URL.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-teal text-white font-medium rounded-xl hover:bg-teal-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

// synced
