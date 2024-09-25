import Image from "next/image";
import { useState } from "react";

type Props = {
  hotelMainImage: string;
  hotelName: string;
  hotelDescription: string;
  isExpanded?: boolean;
};

export default function HotelDetailedData({
  hotelMainImage,
  hotelName,
  hotelDescription,
  isExpanded: isExpanded,
}: Props) {
  const [showMore, setShowMore] = useState<boolean>(isExpanded ? true : false);

  return (
    <div className="border-2 p-4">
      <div className="relative h-[320px] w-full">
        <Image
          title={"hotel main image"}
          alt={"hotel main image"}
          src={hotelMainImage}
          width={1600}
          height={900}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black/60 p-4 md:px-7 text-light">
          <p className="text-lg tracking-wide">More Details of</p>
          <h2 className="text-3xl font-bold">{hotelName}</h2>
        </div>
      </div>

      {isExpanded ? (
        <p
          className={`pt-7 ${showMore ? "line-clamp-5" : "line-clamp-none"}`}
          dangerouslySetInnerHTML={{ __html: hotelDescription }}
        />
      ) : (
        <p
          className="pt-7"
          dangerouslySetInnerHTML={{ __html: hotelDescription }}
        />
      )}

      {isExpanded && (
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="mt-2 bg-secondary p-2 px-4 font-semibold text-light hover:bg-secondary hover:opacity-90"
        >
          {showMore ? "See More +" : "See Less -"}
        </button>
      )}
    </div>
  );
}
