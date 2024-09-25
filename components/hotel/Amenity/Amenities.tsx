"use client";
import { HOTEL_AMENITIES_ID } from "@/lib/helper";
import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
// import AmenityCard from "./AmenityCard";
import Image from "next/image";

type Props = {
  amenityList: HotelAmenityInformation[];
  seeAllAmenities: boolean;
};

export default function Amenities({ amenityList, seeAllAmenities }: Props) {
  const fewAmenities = amenityList.slice(0, Math.min(amenityList.length, 10));

  return (
    <div
      id={HOTEL_AMENITIES_ID}
      className="grid grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4"
      // className="flex flex-wrap gap-2"
    >
      {seeAllAmenities ? (
        <>
          {amenityList.map((amenity: HotelAmenityInformation) => (
            <AmenityCard key={amenity.amenity_Id} amenity={amenity} />
          ))}
        </>
      ) : (
        <>
          {fewAmenities.map((amenity: HotelAmenityInformation) => (
            <AmenityCard key={amenity.amenity_Id} amenity={amenity} />
          ))}
        </>
      )}
    </div>
  );
}

const AmenityCard = ({ amenity }) => {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="relative h-[18px] w-[18px] overflow-hidden rounded-full">
        <Image
          src={
            amenity.amenity_Image_Url
              ? amenity.amenity_Image_Url
              : "/brand_logo.svg"
          }
          alt={amenity.amenity_Name}
          width={28}
          height={28}
          className="h-[18px] w-[18px]"
        />
      </div>
      <h3 className="truncate text-sm lg:text-base">{amenity.amenity_Name}</h3>
    </div>
  );
};
