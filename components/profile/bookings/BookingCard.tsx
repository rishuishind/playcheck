import React from "react";
import Image from "next/image";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { useRouter } from "next/router";
import { formatTimestampToDate } from "@/lib/helper";

type Props = {
  bookingInfo: BookingDetails;
};

export default function BookingCard(props: Props) {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => {
          router.push({
            pathname: `/profile/my-bookings/${props.bookingInfo.booking_Id}`,
          });
        }}
        className={`relative flex flex-col justify-between w-full p-3 rounded-2xl bg-white shadow-md hover:shadow-lg cursor-pointer`}
      >
        <div className="relative w-full aspect-video overlflow-hidden">
          <Image
            alt={`booking`}
            className={`rounded-lg w-full h-full object-cover`}
            src={String(props.bookingInfo.hotel_Image_Url)}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="relative w-full flex flex-col justify-between mt-3">
          <div className="w-full text-seconday font-xl text-secondary font-bold">
            {props.bookingInfo.hotel_Name}
          </div>

          <div className="flex flex-col space-y-1 my-3">
            <div className="relative w-full flex space-x-1 align-middle items-center">
              <span className={`flex text-sm my-auto align-middle`}>
                Booked On:
              </span>
              <span className={`flex text-md my-auto align-middle font-medium`}>
                {formatTimestampToDate(props.bookingInfo.booking_Time)}
              </span>
            </div>
            <div className="relative w-full flex space-x-1 align-middle items-center">
              <span className={`flex text-sm my-auto align-middle`}>
                Check In:
              </span>
              <span className={`flex text-md my-auto align-middle font-medium`}>
                {formatTimestampToDate(props.bookingInfo.checkin_Time)}
              </span>
            </div>
            <div className="relative w-full flex space-x-1 align-middle items-center">
              <span className={`flex text-sm my-auto align-middle`}>
                Check Out:
              </span>
              <span className={`flex text-md my-auto align-middle font-medium`}>
                {formatTimestampToDate(props.bookingInfo.checkout_Time)}
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-secondary font-semibold">
              {" "}
              {props.bookingInfo.payment_Made ? "Paid" : "Pay@Hotel"}
            </p>
            <p className="text-secondary text-lg font-bold">
              {" "}
              ₹ {props.bookingInfo.total_Price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}