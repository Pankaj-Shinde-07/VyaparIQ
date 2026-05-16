import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { apiClient } from "../api/client.js";
import { useAuth } from "../contexts/AuthContext.js";
import { Building2 } from "lucide-react";
import { Logo } from "../components/Logo.js";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await apiClient.post("/auth/login", formData);
      login(res.data.tokens.accessToken, res.data.user);
      
      toast.success("Welcome back!");
      if (!res.data.user.businessId) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const loadDemoProps = () => {
    setFormData({
      email: "demo@sanjeevani.local",
      password: "Demo123!"
    });
    toast("Demo credentials loaded! Click Log In.");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* Left decorative side for marketing Polish */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-brand-teal to-teal-800 p-12 text-white flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 p-8 w-96 h-96 bg-black/10 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="relative z-10 max-w-lg">
          <Building2 className="w-16 h-16 mb-8 text-white/90" />
          <h2 className="text-4xl font-bold mb-4 leading-tight">Manage your business with clarity.</h2>
          <p className="text-lg text-teal-100">
            Join thousands of pharmacies, kirana stores, and retailers upgrading their daily operations with VyaparIQ.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 md:text-left">
            <Link to="/" className="inline-block mb-6 md:hidden">
              <Logo className="h-10 w-auto mx-auto object-contain" />
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-slate-600 dark:text-slate-400">Log in to your account</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none dark:text-white transition-all shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <a href="#" className="text-sm font-medium text-brand-teal hover:underline relative z-10">Forgot password?</a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none dark:text-white transition-all shadow-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-teal text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 shadow-sm"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Demo mode</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <button
              onClick={loadDemoProps}
              type="button"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-white py-3 rounded-xl font-medium border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              Fill Demo Credentials
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-teal font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// synced
