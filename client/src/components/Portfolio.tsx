import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { ProjectsSection } from "./ProjectsSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

import { defaultConfig, type PortfolioConfig } from "@/config/portfolio";

export function Portfolio() {
  const [config] = useState<PortfolioConfig>(defaultConfig);

  // Add smooth scrolling CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-slate-900 text-white font-inter overflow-x-hidden">
      <Navigation config={config} />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection config={config} />
      <Footer config={config} />
    </div>
  );
}
