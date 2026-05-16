import { Navbar } from "../components/Navbar.js";
import { Hero } from "../components/sections/Hero.js";
import { SocialProof } from "../components/sections/SocialProof.js";
import { Features } from "../components/sections/Features.js";
import { HowItWorks } from "../components/sections/HowItWorks.js";
import { Industries } from "../components/sections/Industries.js";
import { AiAssistant } from "../components/sections/AiAssistant.js";
import { DashboardPreview } from "../components/sections/DashboardPreview.js";
import { Testimonials } from "../components/sections/Testimonials.js";
import { Pricing } from "../components/sections/Pricing.js";
import { Faq } from "../components/sections/Faq.js";
import { CallToAction } from "../components/sections/CallToAction.js";
import { Footer } from "../components/sections/Footer.js";

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
