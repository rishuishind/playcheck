import { RoomPlanInfo } from "@/components/hotel/RoomsCard/RoomPlanInfo";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import { useRouter } from "next/router";

type Props = {
  plansList: any[];
  roomDetails: any;
};

export default function RoomsSection({ plansList, roomDetails }: Props) {
  const router = useRouter();

  return (
    <div id="plans" className="navLink">
      <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
        Room Plans
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {plansList.map((planInfo: HotelRoomPlanInformation, index: number) => (
          <RoomPlanInfo
            key={index}
            planIndex={index}
            hotelSlugName={router.query.hotelInfo + ""}
            roomInfo={roomDetails}
            planInfo={planInfo}
          />
        ))}
      </div>
    </div>
  );
}
