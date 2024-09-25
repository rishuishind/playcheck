import RoomsCard from "../../RoomsCard/RoomsCard";
import NearByHotelCard from "@/components/nearbycard/NearByHotelCard";

type Props = {
  hotelName: string;
  hotelCity: string;
  roomsList: any[];
  nearByHotel: any[];
  amentiesList: any[];
  hotelSlugName: string;
};

export default function RoomsSection({
  hotelName,
  hotelCity,
  roomsList,
  nearByHotel,
  amentiesList,
  hotelSlugName,
}: Props) {
  return (
    <>
      {roomsList.length > 0 ? (
        <div id="room-plans" className="navLink">
          <h2 className="mb-2 tracking-wider font-medium md:text-2xl md:font-bold md:leading-none">
            Room Details of {hotelName} in {hotelCity}
          </h2>
          <RoomsCard
            roomsList={roomsList}
            hotel_Amenities_List={amentiesList}
            hotelSlugName={hotelSlugName}
            openAlertModel={() => {}}
          />
        </div>
      ) : (
        <div>
          <div className="mt-4 rounded-xl border-4 border-red-600 bg-rose-50 p-4">
            <h3 className="text-xl font-bold text-red-600">Sold Out !</h3>
            <p className="tracking-wide mt-1">
              Hotel is sold out for the selected Dates.
              <br />
              Choose other dates to book this hotel or check nearby hotels
              around this property
            </p>
          </div>
          <NearByHotelCard data={nearByHotel} />
        </div>
      )}
    </>
  );
}
