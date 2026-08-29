import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";

const Projects = () => {
  useDocumentMetadata(
    "Progetti | Imprese Riunite",
    "I cantieri del Gruppo Imprese Riunite: opere pubbliche, edilizia penitenziaria e impiantistica, con luogo, committente e importi realizzati da Costruzioni Angelico e Nuova C.C.S."
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top padding clears the fixed navbar; ProjectsShowcase brings its own heading. */}
      <main id="main-content" className="pt-24 md:pt-28">
        <ProjectsShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
