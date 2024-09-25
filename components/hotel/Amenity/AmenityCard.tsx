import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import Image from "next/image";

type Props = {
  amenity: any;
};

export default function AmenityCard({ amenity }: Props) {
  return (
    <div className="flex py-2 font-medium text-xs sm:text-sm">
      <div className="flex items-center gap-1">
        <Image
          src={
            amenity.amenity_Image_Url
              ? amenity.amenity_Image_Url
              : "/brand_logo.svg"
          }
          alt={amenity.amenity_Name}
          width={28}
          height={28}
          className="w-7 h-7 rounded-full p-[1px] bg-gray-50"
        />
        <h3 className="whitespace-nowrap">{amenity.amenity_Name}</h3>
      </div>
    </div>
  );
}
