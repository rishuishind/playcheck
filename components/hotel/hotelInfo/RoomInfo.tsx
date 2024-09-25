import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import dynamic from "next/dynamic";
import { memo, useState, useEffect } from "react";
import HotelRoomCard from "../RoomsCard/HotelRoomCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure you import the styles

const HotelInfoRoomCard = dynamic(
  () => import("../RoomsCard/HotelInfoRoomCard"),
  {
    ssr: false,
  },
);

type Props = {
  roomsList: HotelRoomInformation[];
  hotelName: string;
};

function RoomsInfo({ roomsList, hotelName }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (roomsList.length > 0) {
      setIsLoading(false);
    }
  }, [roomsList]);

  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Room Details at ${hotelName}`}
      </h2>

      <div
        id="room-details"
        className="navLink mb-4 mt-8 rounded-lg border-2 p-5 "
      >
        <div className="relative  flex h-full w-full flex-col">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="mb-4">
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton height={200} />
                  </SkeletonTheme>
                </div>
              ))
            : roomsList.map((room, index) => (
                <div key={index} className="mb-4">
                  <HotelRoomCard roomData={room} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default memo(RoomsInfo);
