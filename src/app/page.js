import HeroBanner from "@/components/HeroBanner";
import LawyersFeatured from "@/components/LawyersFeatured";
import LegalCategories from "@/components/LegalCategories";
import TopExpert from "@/components/TopExpert";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
       <div>
       <HeroBanner/> 
       <LawyersFeatured/>
         <TopExpert/> 
             <LegalCategories/> 
             <TestimonialsSection/>
             <WhyChooseUsSection/>
             <FAQSection/>
       </div>
  );
}
