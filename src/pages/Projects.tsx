import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { useSeo } from "@/hooks/use-seo";
import { projectsMeta } from "@/lib/seo";

const Projects = () => {
  useSeo(projectsMeta);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top padding clears the fixed navbar; ProjectsShowcase brings its own heading. */}
      <main id="main-content" className="pt-[5.5rem] md:pt-[6.875rem]">
        <ProjectsShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
