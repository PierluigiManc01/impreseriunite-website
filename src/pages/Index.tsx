import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import CompaniesSection from "@/components/CompaniesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <HistoryTimeline />
    <ClientLogosMarquee />
    <CompaniesSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
