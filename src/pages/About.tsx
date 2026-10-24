import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <main>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
