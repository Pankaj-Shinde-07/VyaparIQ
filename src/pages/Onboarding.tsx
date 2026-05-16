import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import { apiClient } from "../api/client.js";
import { useAuth } from "../contexts/AuthContext.js";
import { Store, Stethoscope, ChevronRight, CheckCircle2 } from "lucide-react";

export function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<any[]>([]);

  const [businessData, setBusinessData] = useState({
    name: "",
    type: "RETAIL",
    address: "",
    gstin: "",
  });

  const [selectedModule, setSelectedModule] = useState<string>("");

  useEffect(() => {
    if (user?.businessId && step === 1) {
      setStep(2);
    }
  }, [user]);

  useEffect(() => {
    if (step === 2) {
      apiClient.get("/modules/available").then((res: any) => {
        setModules(res.data);
      }).catch(err => {
        toast.error("Failed to load available modules");
      });
    }
  }, [step]);

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await apiClient.post("/businesses", businessData);
      updateUser({ businessId: res.data.id });
      toast.success("Business created successfully!");
      setStep(2);
    } catch (error: any) {
      toast.error(error.message || "Failed to create business");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedModule) {
      toast.error("Please select a module");
      return;
    }
    setLoading(true);
    try {
      await apiClient.post("/modules/subscribe", { moduleId: selectedModule });
      toast.success("Module activated!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to activate module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 border-none transition-colors flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-teal -z-10 rounded-full transition-all duration-500`} style={{ width: step === 1 ? '50%' : '100%' }}></div>
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 1 ? 'bg-brand-teal' : 'bg-slate-200 dark:bg-slate-700'}`}>
              1
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-brand-teal text-white' : 'bg-white border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-400'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <span>Create Business</span>
            <span>Select Module</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-8"
            >
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-500/20 text-brand-teal rounded-2xl flex items-center justify-center mb-4">
                  <Store className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tell us about your business</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Let's get your store set up on VyaparIQ.</p>
              </div>

              <form onSubmit={handleCreateBusiness} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none dark:text-white"
                    placeholder="e.g. Apollo Pharmacy"
                    value={businessData.name}
                    onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GSTIN (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none dark:text-white"
                      placeholder="e.g. 27AADCB2230M1Z2"
                      value={businessData.gstin}
                      onChange={(e) => setBusinessData({ ...businessData, gstin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Type</label>
                    <select
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none dark:text-white"
                      value={businessData.type}
                      onChange={(e) => setBusinessData({ ...businessData, type: e.target.value })}
                    >
                      <option value="RETAIL">Retail</option>
                      <option value="MEDICAL">Medical/Pharmacy</option>
                      <option value="KIRANA">Kirana/Grocery</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address (Optional)</label>
                   <textarea
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none dark:text-white"
                    value={businessData.address}
                    onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !businessData.name}
                  className="w-full mt-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Saving..." : "Continue"} <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-8"
            >
              <div className="flex flex-col items-center mb-8 text-center">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose your first Module</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Modules add specific capabilities to your VyaparIQ platform.</p>
              </div>

              <div className="space-y-4 mb-8">
                {modules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      selectedModule === mod.id 
                        ? 'border-brand-teal bg-teal-50/50 dark:bg-teal-500/10' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-brand-teal/50'
                    }`}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedModule === mod.id
                        ? 'border-brand-teal bg-brand-teal text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {selectedModule === mod.id && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{mod.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{mod.description}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {mod.pricePerMonth === 0 ? 'Free tier available' : `₹${mod.pricePerMonth}/mo`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubscribe}
                disabled={loading || !selectedModule}
                className="w-full bg-brand-teal text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Activating..." : "Complete Setup"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// synced
