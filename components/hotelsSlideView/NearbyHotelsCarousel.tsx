import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import SeoHotelCard from "../screens/hotel/SeoHotelCard";

type Props = {
  hotelsList: HotelInformationDetails[];
};

export default function NearbyHotelsCarousel({ hotelsList }: Props) {
  return (
    <div className="w-full h-fit p-2 flex gap-4 snap-x snap-mandatory overflow-x-scroll container-snap">
      {hotelsList.map((hotel: HotelInformationDetails, index: number) => (
        <SeoHotelCard key={index} hotelInfo={hotel} />
      ))}
    </div>
  );
}
