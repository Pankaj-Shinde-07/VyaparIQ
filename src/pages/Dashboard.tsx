import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../api/client";
import { 
  Building2, User, LogOut, LayoutGrid, Package, 
  Settings, ShoppingCart, Users, Receipt, ArrowRight,
  TrendingUp, Shield, Activity
} from "lucide-react";
import { Logo } from "../components/Logo";

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user?.businessId) {
          navigate("/onboarding");
          return;
        }

        const [bizRes, modsRes] = await Promise.all([
          apiClient.get("/businesses/me"),
          apiClient.get("/modules/me")
        ]);

        setBusiness(bizRes.data);
        setModules(modsRes.data);
      } catch (error) {
        console.error("Dashboard fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 border-none text-slate-800 dark:text-slate-200">Loading your workspace...</div>;
  }

  const hasMedicalModule = modules.some(m => m.code === 'MEDICAL');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-8 w-auto object-contain" />
          </Link>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Platform</div>
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 text-slate-900 dark:text-white rounded-lg font-medium">
            <LayoutGrid className="w-5 h-5" /> Overview
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>

          {hasMedicalModule && (
            <>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-2">Medical Module</div>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg font-medium transition-colors">
                <Package className="w-5 h-5" /> Inventory
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg font-medium transition-colors">
                <ShoppingCart className="w-5 h-5" /> POS Billing
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg font-medium transition-colors">
                <Users className="w-5 h-5" /> Customers
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg font-medium transition-colors">
                <Receipt className="w-5 h-5" /> Invoices
              </a>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500 truncate">{business?.name}</p>
            </div>
            <button onClick={logout} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors" title="Log out">
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Overview</h1>
          <div className="inline-flex px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 rounded-full text-xs font-semibold border border-green-200 dark:border-green-800/60">
            Platform Active
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Business Profile Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-teal-400 flex items-center justify-center shrink-0 shadow-inner">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{business?.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Owner</span>
                  <span>•</span>
                  <span>{business?.type} Business</span>
                  {business?.gstin && (
                    <>
                      <span>•</span>
                      <span>GST: {business.gstin}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Subscribed Modules */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Your Active Modules</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {modules.map(mod => (
                  <div key={mod.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <Activity className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">{mod.name}</h4>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2.5 py-1 rounded-full font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm flex-1">{mod.description}</p>
                    <button className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                      Launch Module <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {modules.length === 0 && (
                  <div className="col-span-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center">
                    <Package className="w-12 h-12 text-slate-400 mb-3" />
                    <h4 className="font-bold text-slate-900 dark:text-white">No active modules</h4>
                    <p className="text-slate-500 mt-1 mb-4">Subscribe to a module to start using VyaparIQ.</p>
                    <Link to="/onboarding" className="bg-brand-teal text-white px-5 py-2 rounded-xl font-medium">
                      Browse Modules
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats Placeholder */}
            {modules.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Platform Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Today's Sales", value: "₹0.00" },
                    { label: "Active Invoices", value: "0" },
                    { label: "Total Customers", value: "0" },
                    { label: "Low Stock Items", value: "0" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// synced
