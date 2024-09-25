import { useState, memo } from "react";
import Image from "next/image";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import Link from "next/link";
import { HOTEL_SELECTION_CARD_ID } from "@/lib/helper";
import FallbackImage from "../FallbackImage";

type Props = {
  openAlertModel: () => void;
  roomData: HotelRoomInformation;
};

function HotelInfoRoomCard({ roomData, openAlertModel }: Props) {
  const [roomDetailsModel, setRoomDetailsModel] = useState(false);

  const handleImageClick = () => {
    setRoomDetailsModel(true);
  };

  const handleAlertClick = () => {
    alert("Room Info Model");
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
          <Link
            href={`#${HOTEL_SELECTION_CARD_ID}`}
            className="hidden rounded-lg border-2 p-3 px-4 text-sm font-bold leading-none tracking-wide text-secondary lg:block lg:justify-self-end"
          >
            Show Price
          </Link>
          <button
            onClick={openAlertModel}
            className="rounded-lg border-2 p-3 px-4 text-sm font-bold leading-none tracking-wide text-secondary lg:hidden"
          >
            Show Price
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(HotelInfoRoomCard);
