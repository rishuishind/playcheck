import { useRouter } from "next/router";
import { routerToHotelDetailPage } from "@/lib/handlers/pageHandler";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
  updateHotelDetails,
} from "@/lib/redux/bookingSlice";
import { getDateDifference } from "@/lib/helper";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import ImageGallery from "@/components/hotelsSlideView/ImageGallery";
import { useState } from "react";

type Props = {
  hotelInfo: HotelInformationDetails;
};

export default function SeoHotelCard({ hotelInfo }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loadMainImage, setLoadMainImage] = useState<boolean>(true);

  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchedGuestCount = useSelector(selectSearchedGuestsCount);
  const searchedRoomCount = useSelector(selectSearchedRoomsCount);
  const searchedChildrenCount = useSelector(selectSearchedChildrenCount);

  const bookHotelHandler = () => {
    dispatch(
      updateHotelDetails({
        hotelSlugName: hotelInfo.hotel_Slug_Name,
        hotelId: hotelInfo.hotel_Firebase_Id,
        hotelName: hotelInfo.hotel_Name,
        hotelAddress: hotelInfo.hotel_Address,
        hotelStarRating: hotelInfo.hotel_Star_Rating,
      })
    );
    const params = new PageRouterQueryParams(router);
    params.hotelSlugName = hotelInfo.hotel_Slug_Name;
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = getDateDifference(checkInDate, checkOutDate);
    params.num_guests = searchedGuestCount;
    params.num_rooms = searchedRoomCount;
    params.num_children = searchedChildrenCount;
    routerToHotelDetailPage(params);
  };

  return (
    <div
      onClick={bookHotelHandler}
      className="snap-start rounded-xl overflow-hidden min-w-[240px] max-w-xs aspect-square shadow-[0px_0px_7px_rgba(0,0,0,0.1)]"
    >
      <div className="w-full aspect-video overflow-hidden">
        <ImageGallery
          imagesList={hotelInfo.hotel_Images_Object_List}
          showMoreButton={false}
          roomsList={[]}
          isHotelPage={false}
          loadMainImage={loadMainImage}
          setLoadMainImage={setLoadMainImage}
        />
      </div>

      <div className="w-full p-3">
        {Array.from({
          length: hotelInfo.hotel_Star_Rating,
        }).map((key: any) => (
          <span key={key}>⭐</span>
        ))}
        <h3 className="font-dream font-semibold tracking-wider text-secondary line-clamp-1">
          {hotelInfo.hotel_Name}
        </h3>
        <p className="text-sm font-medium py-1">{hotelInfo.hotel_Landmark}</p>
        <div className="flex items-center mt-1">
          <p className="text-xl font-bold text-secondary">
            ₹ {Math.ceil(hotelInfo.hotel_Starting_Price)}
          </p>
          <p className="text-sm ml-1 text-textSecondary">/ night</p>
        </div>
      </div>
    </div>
  );
}
