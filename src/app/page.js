import HeroBanner from "@/components/HeroBanner";
import LawyersFeatured from "@/components/LawyersFeatured";
import LegalCategories from "@/components/LegalCategories";
import TopExpert from "@/components/TopExpert";


export default function Home() {
  return (
       <div>
       <HeroBanner/> 
       <LawyersFeatured/>
         <TopExpert/> 
             <LegalCategories/>
       </div>
  );
}
