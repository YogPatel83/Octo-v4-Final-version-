import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LogosStrip from "../components/LogosStrip";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Control from "../components/Control";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogosStrip />
      <Features />
      <HowItWorks />
      <Control />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
