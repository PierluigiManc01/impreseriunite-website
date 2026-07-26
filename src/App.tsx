import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import CompanyDetail from "./pages/CompanyDetail.tsx";
import Certifications from "./pages/Certifications.tsx";
import Projects from "./pages/Projects.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/azienda/:id" element={<CompanyDetail />} />
      <Route path="/progetti" element={<Projects />} />
      <Route path="/certificazioni" element={<Certifications />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
