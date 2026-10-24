import "./index.css";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogIndexPage from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPost";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import LegalBar from "./components/LegalBar";
import WeincNotFoundPage from "./pages/WeincNotFound";

function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<WeincNotFoundPage />} />
    </Routes>
      <LegalBar />
    </>
  );
}
