import Footer from "@/components/_landingPage/Footer";
import Hero from "@/components/_landingPage/Hero";
import HowitWorks from "@/components/_landingPage/HowitWorks";
import PricingSection from "@/components/_landingPage/PricingSection";

export default function page() {
  return (
    <div className="">
      <Hero />
      <HowitWorks />
      <PricingSection />
      <Footer />
    </div>
  );
}
