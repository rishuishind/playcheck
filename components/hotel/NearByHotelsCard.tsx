"use client";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { resetBookingInfo } from "@/lib/redux/bookingSlice";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const StarIcon = dynamic(() => import("@heroicons/react/solid/StarIcon"));

type Props = {
  info: any;
};

const NearByHotelsCard = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  function stringToDate(dateString) {
    if (!dateString) return false;
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  // Check if the router.query.hotelInfo has the same slug as current hotel then remove the Link tag for that

  const check = router.query.hotelInfo === props.info.hotel_Slug_Name;

  const checkInDate = stringToDate(props.info.checkin) || new Date();
  const checkOutDate =
    stringToDate(props.info.checkout) ||
    new Date(new Date().setDate(new Date().getDate() + 2));

  const numOfNights = Number(props.info.num_nights) || 1;
  const searchAudlts = Number(props.info.num_guests) || 1;
  const searchRoomsCount = Number(props.info.num_rooms) || 0;
  const searchChildrenCount = Number(props.info.num_children) || 0;

  const stars = Array.from(
    { length: props.info.hotel_Star_Rating },
    (_, index) => <StarIcon className="h-5 w-5 fill-primary" key={index} />,
  );

  let checkinFormated = String(moment(checkInDate).format("DD-MM-YYYY"));
  let checkoutFormated = String(moment(checkOutDate).format("DD-MM-YYYY"));

  const hotelUrl = router.query?.checkin
    ? `/hotels/${props.info.hotel_Slug_Name || props.info.slug}?checkin=${checkinFormated}&checkout=${checkoutFormated}&num_nights=${numOfNights}&num_guests=${searchAudlts}&num_rooms=${searchRoomsCount}&num_children=${searchChildrenCount}&webpage=true`
    : `/hotels/${props.info.hotel_Slug_Name || props.info.slug}`;

  return check ? (
    <div>
      <div
        onClick={() => dispatch(resetBookingInfo())}
        className="flex h-[260px] min-w-[230px] max-w-[235px] cursor-pointer snap-start flex-col justify-between rounded-xl border-[3px] border-primary bg-primary/25 p-2 text-sm lg:text-base"
      >
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg">
          <Image
            src={
              props.info.hotel_Image_Url ||
              props.info.imageUrl ||
              "/images/hotel/general.svg"
            }
            className="object-fit h-full w-full"
            alt="hotel info img"
            title="hotel info img"
            width={130}
            height={130}
          />
        </div>

        <p className="line-clamp-2 font-semibold text-secondary">
          {props.info.name || props.info.hotel_Name}
        </p>

        {/* <p className="flex">{stars}</p> */}

        {/* <p className="font-semibold text-secondary">
          ₹ {Math.ceil(props.info.hotel_Starting_Price)}
        </p> */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full rounded bg-secondary py-1 text-white hover:bg-[#24817f]"
        >
          View Hotel
        </button>
      </div>
    </div>
  ) : (
    <Link href={hotelUrl} target="_blank">
      <div
        onClick={() => dispatch(resetBookingInfo())}
        className="mt-2 flex h-[260px] min-w-[230px] max-w-[235px] cursor-pointer snap-start flex-col justify-between rounded-xl border-2 p-2 text-sm lg:text-base"
      >
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg">
          <Image
            src={
              props.info.hotel_Image_Url ||
              props.info.imageUrl ||
              "/images/hotel/general.svg"
            }
            className="object-fit h-full w-full"
            alt="hotel info img"
            title="hotel info img"
            width={130}
            height={130}
          />
        </div>

        <p className="line-clamp-2 font-semibold text-secondary">
          {props.info.name || props.info.hotel_Name}
        </p>

        {/* <p className="flex">{stars}</p> */}

        {/* <p className="font-semibold text-secondary">
          ₹ {Math.ceil(props.info.hotel_Starting_Price)}
        </p> */}
        <button className="w-full rounded-md bg-secondary py-1 text-white hover:bg-[#24817f]">
          View Hotel
        </button>
      </div>
    </Link>
  );
};

export default NearByHotelsCard;
