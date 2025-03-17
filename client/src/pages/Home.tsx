import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import AttractionSection from "@/components/home/AttractionSection";
import CulturalSection from "@/components/home/CulturalSection";
import AccommodationSection from "@/components/home/AccommodationSection";
import TransportSection from "@/components/home/TransportSection";
import MapSection from "@/components/home/MapSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";
import Newsletter from "@/components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <AttractionSection />
      <CulturalSection />
      <AccommodationSection />
      <TransportSection />
      <MapSection />
      <TestimonialSection />
      <ContactSection />
      <Newsletter />
    </div>
  );
};

export default Home;
