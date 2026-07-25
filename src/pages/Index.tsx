import { useState } from "react";
import { hasIntroPlayed } from "@/lib/intro-state";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CompaniesSection from "@/components/CompaniesSection";
import ProjectsTeaser from "@/components/ProjectsTeaser";
import CertificationsTeaser from "@/components/CertificationsTeaser";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  // The navbar stays hidden while the hero intro (video + name reveal) plays.
  // On client-side navigations back home the intro is skipped, so the navbar
  // must be there from the very first frame.
  const [introDone, setIntroDone] = useState(() => hasIntroPlayed());

  return (
    // overflow-x-clip (not -hidden): hidden would create a scroll container
    // and break position:sticky in descendants (e.g. the projects preview).
    <div className="min-h-screen overflow-x-clip">
      {introDone && <Navbar />}
      <HeroSection onIntroComplete={() => setIntroDone(true)} />
      <AboutSection />
      <ClientLogosMarquee />
      <CompaniesSection />
      <ProjectsTeaser />
      <CertificationsTeaser />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
