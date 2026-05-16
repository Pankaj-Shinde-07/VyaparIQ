import { Navbar } from "../components/Navbar";
import { Hero } from "../components/sections/Hero";
import { SocialProof } from "../components/sections/SocialProof";
import { Features } from "../components/sections/Features";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Industries } from "../components/sections/Industries";
import { AiAssistant } from "../components/sections/AiAssistant";
import { DashboardPreview } from "../components/sections/DashboardPreview";
import { Testimonials } from "../components/sections/Testimonials";
import { Pricing } from "../components/sections/Pricing";
import { Faq } from "../components/sections/Faq";
import { CallToAction } from "../components/sections/CallToAction";
import { Footer } from "../components/sections/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 selection:bg-brand-teal selection:text-white font-sans transition-colors duration-500 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Industries />
        <AiAssistant />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

// synced
