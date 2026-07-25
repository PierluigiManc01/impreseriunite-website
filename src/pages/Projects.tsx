import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";

const Projects = () => {
  useEffect(() => {
    document.title = "Progetti | Imprese Riunite";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "I cantieri del Gruppo Imprese Riunite: opere pubbliche, edilizia penitenziaria e impiantistica, con luogo, committente e importi realizzati da Costruzioni Angelico e Nuova C.C.S."
      );
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top padding clears the fixed navbar; ProjectsShowcase brings its own heading. */}
      <div className="pt-24 md:pt-28">
        <ProjectsShowcase />
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
