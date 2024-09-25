import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

type PageProps = {
  margin: string;
  heading: string;
  regionsInfo: any;
};

export default function RegionsUiCard({
  regionsInfo,
  margin,
  heading,
}: PageProps) {
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;

      const currentScroll = slideContainerRef.current.scrollLeft;

      slideContainerRef.current.scrollTo({
        left: currentScroll + cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;
      const currentScroll = slideContainerRef.current.scrollLeft;
      slideContainerRef.current.scrollTo({
        left: currentScroll - cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${margin} relative cursor-pointer rounded-xl border-2 p-4`}
    >
      <h2 className="text-xl font-bold tracking-wide">
        {heading} {regionsInfo.name}
      </h2>

      <div className="">
        <ChevronLeftIcon
          onClick={prevSlide}
          className="absolute left-0 top-1/2 z-10 h-8 w-8 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
        />
        <ChevronRightIcon
          onClick={nextSlide}
          className="absolute right-0 top-1/2 z-10 h-8 w-8 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div
        ref={slideContainerRef}
        className="container-snap mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-scroll"
      >
        {regionsInfo.map((region: any) => (
          <RegionCard key={region.slug} regionInfo={region} />
        ))}
      </div>
    </div>
  );
}

const RegionCard = ({ regionInfo }: { regionInfo: any }) => {
  const router = useRouter();
  // const arrayOfRegionSlug = regionInfo.hotelCityRegion_Slug_Name.split("-|-");
  // const formattedRegionSlug =
  //   arrayOfRegionSlug.length > 0 ? arrayOfRegionSlug[1] : "";

  return (
    <Link
      href={`/${regionInfo.slug}`}
      className="min-w-fit snap-start rounded-lg bg-primary/50 p-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <div className="aspect-video w-full overflow-hidden rounded-md bg-primary">
    <Image
      alt={`${regionInfo.hotelCityRegion_Name} image`}
      title={`${regionInfo.hotelCityRegion_Name} image`}
      className="h-full w-[124px] object-cover"
      src={regionInfo.hotelCityRegion_Image_Url}
      width={160}
      height={90}
    />
  </div> */}
      <h3 className="mt-1 font-bold leading-none tracking-wide">
        {regionInfo.name}
      </h3>
      <p className="mt-1 text-sm leading-none tracking-wide">View Hotels</p>
    </Link>
  );
};
