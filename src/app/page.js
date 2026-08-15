import HeroBanner from "@/components/HeroBanner";
import LawyersFeatured from "@/components/LawyersFeatured";
import LegalCategories from "@/components/LegalCategories";
import TopExpert from "@/components/TopExpert";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FAQSection from "@/components/FAQSection";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <div>
      {/* Hero loads immediately, no reveal needed */}
      <HeroBanner />

      <RevealOnScroll>
        <LawyersFeatured />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <TopExpert />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <LegalCategories />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <TestimonialsSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <WhyChooseUsSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <FAQSection />
      </RevealOnScroll>
    </div>
  );
}