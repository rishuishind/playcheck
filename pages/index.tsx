import RootHead from "@/components/header/RootHead";
import dynamic from "next/dynamic";
import TrendingSection from "@/components/screens/root/TrendingSection";
import Nav from "@/components/navbar/Nav";
import MobileNav from "@/components/navbar/MobileNav";
import LandingSection from "@/components/screens/hotel/LandingSection";


const DynamicTourNTravelSection = dynamic(
  () => import("@/components/screens/root/TourNTravelSection"),
  { ssr: true },
);

const DynamicReviewSection = dynamic(
  () => import("@/components/screens/root/ReviewSection"),
  { ssr: true },
);

const DynamicFaqSection = dynamic(
  () => import("@/components/screens/root/FaqSection"),
  { ssr: true },
);

const DynamicAboutUsSection = dynamic(
  () => import("@/components/screens/root/AboutUsSection"),
  { ssr: true },
);

const DynamicExploreIndiaSection = dynamic(
  () => import("@/components/screens/root/ExploreIndiaSection"),
  { ssr: true },
);

export default function Home() {
  return (
    <>
      <RootHead />
      <section className="h-auto min-h-screen w-full pb-7 md:pb-10">
        <LandingSection />
        <MobileNav />
        <Nav />
        <TrendingSection />
        <DynamicExploreIndiaSection />
        <DynamicTourNTravelSection />
        <DynamicAboutUsSection />
        <DynamicReviewSection />
        <DynamicFaqSection />
      </section>
    </>
  );
}
