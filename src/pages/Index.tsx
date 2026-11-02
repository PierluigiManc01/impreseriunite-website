import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CompaniesSection from "@/components/CompaniesSection";
import ProjectsTeaser from "@/components/ProjectsTeaser";
import CertificationsTeaser from "@/components/CertificationsTeaser";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/use-seo";
import { homeMeta } from "@/lib/seo";

const Index = () => {
  useSeo(homeMeta);

  return (
    // overflow-x-clip (not -hidden): hidden would create a scroll container
    // and break position:sticky in descendants (e.g. the projects preview).
    <div className="homepage min-h-screen overflow-x-clip">
      <HeroSection />
      <main id="main-content">
        <CompaniesSection />
        <ClientLogosMarquee />
        <ProjectsTeaser />
        <CertificationsTeaser />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
