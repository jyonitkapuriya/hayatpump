// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "../components/hero";
import Clients from "../components/clients";
import Skills from "../components/skills";
import Projects from "../components/projects";
import ContactForm from "../components/contact-form";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Clients />
      <Skills />
      <Projects />
      {/* <Resume /> */}
      {/* <Testimonial /> */}
      {/* <PopularClients /> */}
      <ContactForm />
      <Footer />
    </>
  );
}
