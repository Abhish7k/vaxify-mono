import { HeroSectionComponent } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorksSection";
import { Features } from "@/components/landing/FeaturesSection";

const HomePage = () => {
  return (
    <div>
      <HeroSectionComponent />

      <HowItWorks />

      <Features />
    </div>
  );
};

export default HomePage;
