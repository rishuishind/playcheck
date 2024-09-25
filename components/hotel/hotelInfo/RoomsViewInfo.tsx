import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import dynamic from "next/dynamic";
import { memo } from "react";

import HotelInfoRoomCard from "../RoomsCard/HotelInfoRoomCard";

type Props = {
  roomsList: HotelRoomInformation[];
  openAlertModel: () => void;
  hotelName: string;
  hotelCity: string;
};

function RoomsViewInfo({
  roomsList,
  openAlertModel,
  hotelCity,
  hotelName,
}: Props) {
  return (
    <div id="room-plans" className="navLink">
      <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
        Room Details of {hotelName} in {hotelCity}
      </h2>
      <div className="container-snap relative flex h-full w-full flex-col space-y-3 overflow-y-scroll">
        {roomsList.map((room, index) => (
          <div key={index}>
            <HotelInfoRoomCard
              roomData={room}
              openAlertModel={openAlertModel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(RoomsViewInfo);
