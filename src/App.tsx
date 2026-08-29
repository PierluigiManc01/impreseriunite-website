import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index.tsx"));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail.tsx"));
const Certifications = lazy(() => import("./pages/Certifications.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/azienda/:id" element={<CompanyDetail />} />
        <Route path="/progetti" element={<Projects />} />
        <Route path="/certificazioni" element={<Certifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
