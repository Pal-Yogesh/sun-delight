import About from "@/components/About";
import FAQSection from "@/components/FAQ";
import HeroNoCookie from "@/components/Hero";
import MissionSection from "@/components/Mission";
import OneBite from "@/components/OneBite";
import ProductsSection from "@/components/ProductSection";
import ModernPromoSection from "@/components/PromoFeatures";
// import VideoSection from "@/components/VideoSection";
import WhyUsSection from "@/components/WhyUs";

export default function Home() {
  return (
  <>
  <HeroNoCookie />
  <About />
  <ProductsSection />
  <OneBite />
  {/* <VideoSection /> */}
  {/* <ModernPromoSection /> */}
  <MissionSection />

  <WhyUsSection />
  <FAQSection />
  
  </>
  );
}
