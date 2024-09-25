import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  hotelRegions: any;
};

export default function RegionCard(props: Props) {
  const router = useRouter();
  const showRegionHotelsHandler = () => {
    router.push({
      pathname: `regions/${props.hotelRegions.hotelRegion_Slug_Name}`,
    });
  };
  return (
    <>
      <div
        onClick={showRegionHotelsHandler}
        className="relative w-full mt-28 grid place-items-center overflow-hidden"
      >
        <div className="animate-scroll flex gap-x-5 whitespace-nowrap">
          {props?.hotelRegions?.map((region: any, index: number) => (
            <div
              key={index}
              className="min-w-[300px] w-[360px] aspect-square rounded-xl overflow-hidden shadow-xl"
            >
              <div className="w-full h-[300px]">
                <Image
                  src={
                    region.hotelRegion_Image_Url
                      ? region.hotelRegion_Image_Url
                      : "/fallback_image.jpg"
                  }
                  alt="region_image"
                  width={24}
                  height={24}
                  unoptimized
                  className="w-full h-full"
                />
              </div>
              <p className="text-xl text-center font-medium text-secondary tracking-wide p-4">
                {region.hotelRegion_Name}
              </p>
            </div>
          ))}

          {/* duplicate the images for ifinity scroll */}
          {props?.hotelRegions?.map((region: any, index: number) => (
            <div
              key={index}
              className="min-w-[300px] w-[360px] aspect-square rounded-xl overflow-hidden shadow-xl"
            >
              <div className="w-full h-[300px]">
                <Image
                  src={
                    region.hotelRegion_Image_Url
                      ? region.hotelRegion_Image_Url
                      : "/fallback_image.jpg"
                  }
                  alt="region_image"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <p className="text-xl text-center font-medium text-secondary tracking-wide p-4">
                {region.hotelRegion_Name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
