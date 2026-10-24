import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <div className="bg-black">
      <main>
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
