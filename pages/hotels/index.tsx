import ExploreIndiaSection from "@/components/screens/hotel/ExploreIndiaSection";
import LandingSection from "@/components/screens/hotel/LandingSection";
import Nav from "@/components/navbar/Nav";
import MobileNav from "@/components/navbar/MobileNav";
import HotelsHead from "@/components/header/HotelsHead";
import dynamic from "next/dynamic";

// Dynamically load the PopularDestinationSection component
const DynamicPopularDestinationSection = dynamic(
  () => import("@/components/screens/hotel/PopularDestinationSection"),
  { ssr: false },
);

// Dynamically load the OurCitiesSection component
const DynamicOurCitiesSection = dynamic(
  () => import("@/components/screens/hotel/OurCitiesSection"),
  { ssr: false },
);

// Dynamically load the PageLinksSection component
const DynamicPageLinksSection = dynamic(
  () => import("@/components/screens/hotel/PageLinksSection"),
  { ssr: false },
);

export default function HotelPage() {
  return (
    <>
      <HotelsHead />
      <section className="h-auto min-h-screen w-full pb-7 md:pb-10">
        <LandingSection />
        <Nav />
        <MobileNav />
        <ExploreIndiaSection />
        <DynamicPopularDestinationSection />
        <DynamicOurCitiesSection />
        <DynamicPageLinksSection />
        {/* <FaqSection /> */}
      </section>
    </>
  );
}
