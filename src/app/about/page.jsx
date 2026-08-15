// app/about/page.jsx
import MissionSection from "@/components/MissionSection";
import StorySection from "@/components/StorySection";
import TeamValuesSection from "@/components/TeamValuesSection";

export default function AboutPage() {
  return (
    <div style={{ background: "#060b16" }}>
    <MissionSection/> 
    <StorySection/> 
    <TeamValuesSection/>
    </div>
  );
}