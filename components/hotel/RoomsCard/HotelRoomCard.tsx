import { useState, memo } from "react";
import Image from "next/image";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import Link from "next/link";
import {
  getDateDifference,
  HOTEL_SELECTION_CARD_ID,
  stringToDate,
} from "@/lib/helper";
import FallbackImage from "../FallbackImage";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
} from "@/lib/redux/bookingSlice";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToAllRoomsPage } from "@/lib/handlers/pageHandler";

type Props = {
  roomData: HotelRoomInformation;
};

function HotelInfoRoomCard({ roomData }: Props) {
  const [roomDetailsModel, setRoomDetailsModel] = useState(false);

  const handleImageClick = () => {
    setRoomDetailsModel(true);
  };

  const handleAlertClick = () => {
    alert("Room Info Model");
  };

  const router = useRouter();
  const checkinSlice = useSelector(selectCheckInDate);
  const checkoutSlice = useSelector(selectCheckOutDate);
  const adultSearchedSlice = useSelector(selectSearchedGuestsCount);
  const childrenSearchedSlice = useSelector(selectSearchedChildrenCount);
  const roomSeachedSlice = useSelector(selectSearchedRoomsCount);

  const checkInDate =
    (router.query.checkin &&
      stringToDate(
        Array.isArray(router.query.checkin)
          ? router.query.checkin[0]
          : router.query.checkin,
      )) ||
    checkinSlice;
  const checkOutDate =
    (router.query.checkout &&
      stringToDate(
        Array.isArray(router.query.checkout)
          ? router.query.checkout[0]
          : router.query.checkout,
      )) ||
    checkoutSlice;
  const searchAdults =
    (router.query.num_guests && Number(router.query.num_guests)) ||
    adultSearchedSlice;
  const searchChildrenCount =
    (router.query.num_children && Number(router.query.num_children)) ||
    childrenSearchedSlice;
  const searchRoomsCount =
    (router.query.num_rooms && Number(router.query.num_rooms)) ||
    roomSeachedSlice;
  const numOfNights = getDateDifference(checkInDate, checkOutDate);

  const hotelPageHandler = async () => {
    const pageRouter = new PageRouterQueryParams(router);
    pageRouter.hotelSlugName = String(router.query?.hotelInfo);
    pageRouter.checkin = checkInDate;
    pageRouter.checkout = checkOutDate;
    pageRouter.num_nights = numOfNights;
    pageRouter.num_guests = searchAdults;
    pageRouter.num_rooms = searchRoomsCount;
    pageRouter.num_children = searchChildrenCount;
    // pageRouter.new_tab = true;

    await routerToAllRoomsPage(pageRouter);
  };

  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden rounded-2xl border-2 p-4 md:flex-row">
      {/* room gallery */}
      <div
        onClick={handleImageClick}
        className="relative h-[180px] w-full overflow-hidden rounded-md bg-secondary sm:h-[230px] lg:h-[200px] lg:w-1/3"
      >
        {roomData.hotelRoom_Image_Url ? (
          <Image
            alt="hotel room main image"
            title="hotel room main image"
            src={roomData.hotelRoom_Image_Url}
            width={160}
            height={90}
            priority
            className="h-full w-full object-cover"
          />
        ) : (
          <FallbackImage />
        )}
      </div>

      {/* room information */}
      <div className="flex h-fit w-full flex-col justify-between gap-2 divide-y-2 sm:h-[230px] lg:h-[200px] lg:w-2/3">
        <div className="flex h-full w-full flex-col">
          {/* room name */}
          <div onClick={handleAlertClick} className="w-full cursor-pointer">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-wide">
                {roomData.hotelRoom_Type}
              </h2>
              {/* <InformationCircleIcon className="h-6 w-6 fill-secondary" /> */}
            </div>
          </div>

          {/* default guest count and view room */}
          <div className="mb-1.5 gap-2 text-sm">
            <p className="leading-tight">{roomData.hotelRoom_Info}</p>
            <p className="leading-tight">
              {roomData.hotelRoom_Guest_Count} guests / room
            </p>
          </div>

          {/* room additional details */}
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="w-full">
              <p className="text-sm font-semibold tracking-wide text-secondary sm:text-base">
                Room Details
              </p>
              <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-0">
                <p className="py-0.5 text-xs tracking-wide sm:text-sm">
                  &bull; Max Guest -{" "}
                  <span className="font-bold">
                    {roomData.hotelRoom_Max_Guest_Occupancy}
                  </span>
                </p>
                <p className="py-0.5 text-xs tracking-wide sm:text-sm">
                  &bull; Max Child -{" "}
                  <span className="font-bold">
                    {roomData.hotelRoom_Max_Children_Occupancy}
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full">
              <p className="text-sm font-semibold tracking-wide text-secondary sm:text-base">
                Charges (If Added)
              </p>
              <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-0">
                <p className="py-0.5 text-xs tracking-wide sm:text-sm">
                  &bull; Extra Adult -{" "}
                  <span className="font-bold">
                    &#8377;{roomData.hotelRoom_Guest_Price}
                  </span>
                </p>
                <p className="py-0.5 text-xs tracking-wide sm:text-sm">
                  &bull; Per Child -{" "}
                  <span className="font-bold">
                    &#8377;{roomData.hotelRoom_Children_Price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* show prices */}
        <div className="grid h-full w-full place-items-center pt-2">
          <div
            onClick={hotelPageHandler}
            className="hidden cursor-pointer rounded-lg border-2 p-3 px-4 text-sm font-bold leading-none tracking-wide text-secondary lg:block lg:justify-self-end"
          >
            Show Price
          </div>
          {/* <button
            onClick={openAlertModel}
            className="rounded-lg border-2 p-3 px-4 text-sm font-bold leading-none tracking-wide text-secondary lg:hidden"
          >
            Show Price
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default memo(HotelInfoRoomCard);
