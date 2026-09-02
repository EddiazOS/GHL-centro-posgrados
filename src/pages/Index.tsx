import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { SearchBar } from "@/components/SearchBar";
import { AcademicOffer } from "@/components/AcademicOffer";
import { CampusSection } from "@/components/CampusSection";
import { AgreementsSection } from "@/components/AgreementsSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSlider />
      <SearchBar />
      <AcademicOffer />
      <CampusSection />
      <AgreementsSection />

      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
