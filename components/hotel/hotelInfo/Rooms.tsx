import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import RoomsCard from "../RoomsCard/RoomsCard";

type Props = {
  data: any[];
  hotelSlug: string;
  openAlertModel: any;
  hotelAmenityList: HotelAmenityInformation[];
};

export default function RoomsSection({
  data,
  hotelSlug,
  openAlertModel,
  hotelAmenityList,
}: Props) {
  return (
    <>
      {data.length > 0 && (
        <div
          id="room-details"
          className="navLink h-[175vh] md:h-[109vh] lg:h-[98vh] xl:h-[105vh]"
        >
          <h2 className="mb-2 text-2xl font-bold leading-none tracking-wider">
            Room Details
          </h2>

          <div
            className={`relative flex h-full w-full flex-col overflow-y-scroll`}
          >
            <RoomsCard
              roomsList={data}
              hotel_Amenities_List={hotelAmenityList}
              hotelSlugName={hotelSlug}
              openAlertModel={openAlertModel}
            />
          </div>
        </div>
      )}
    </>
  );
}
