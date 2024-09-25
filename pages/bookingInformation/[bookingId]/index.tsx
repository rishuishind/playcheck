import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import { LOGO_IMAGE_URL1, formatTimestampToDate } from "@/lib/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { getUserBookingInfo } from "@/lib/firebase/userHandler";
import Image from "next/image";
import { differenceInDays, format } from "date-fns";
import Navbar from "@/components/navbar/booking/Navbar";
import BookingHead from "@/components/header/BookingHead";
import { resetBookingInfo } from "@/lib/redux/bookingSlice";
import { useDispatch } from "react-redux";
import { resetBookingConfirmationInfo } from "@/lib/redux/bookingConfirmationSlice";
import dynamic from "next/dynamic";
import {
  convertFromAnyTimeZoneToIST,
  formatDateToCustomString,
} from "@/lib/helper/timestampToDate";

const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
  { ssr: false },
);
const BadgeCheckIcon = dynamic(
  () => import("@heroicons/react/solid/BadgeCheckIcon"),
  { ssr: false },
);
const MailIcon = dynamic(() => import("@heroicons/react/solid/MailIcon"), {
  ssr: false,
});
const PhoneIcon = dynamic(() => import("@heroicons/react/solid/PhoneIcon"), {
  ssr: false,
});

type Props = {
  userBooking: BookingDetails;
};

export default function BookingInformation(props: Props) {
  const router = useRouter();
  const canonical = router.asPath.split("?");

  const booking_Id = router.query.bookingId;

  const [guestDetails, setGuestDetails] = useState<boolean>(true);
  const handleGuestDetails = () => {
    setGuestDetails((prev: any) => !prev);
  };

  const dispatch = useDispatch();

  const [roomDetails, setRoomDetails] = useState<boolean>(true);
  const handleRoomDetails = () => {
    setRoomDetails((prev: any) => !prev);
  };

  const [paymentDetails, setPaymentDetails] = useState<boolean>(true);
  const handlePaymentDetails = () => {
    setPaymentDetails((prev: any) => !prev);
  };

  useEffect(() => {
    dispatch(resetBookingConfirmationInfo());
  }, []);

  const [confettie, setConfettie] = useState<boolean>(true);
  useEffect(() => {
    const animationDuration = 2700;
    setTimeout(() => {
      setConfettie(false);
    }, animationDuration);
  }, []);

  // function to get the payment mode name
  const getPaymentMode = (totalPrice: number, amountPaid: number) => {
    if (amountPaid === totalPrice) {
      return `Prepaid Booking`;
    } else if (amountPaid > 0) {
      return `Partial Payment`;
    } else {
      return `Pay at Hotel Payment`;
    }
  };
  const paymentMode = getPaymentMode(
    props.userBooking.total_Price,
    props.userBooking.amount_Paid,
  );
  const extraAmountOnPayAtHotelBooking =
    props.userBooking.paying_Amount - props.userBooking.total_Price;

  // funtion to get the date from seconds and nanoseconds object
  const dateObjectFromSeconds = (timeObject: any) => {
    const timestamp = timeObject.seconds * 1000;
    const dateObj = new Date(timestamp);
    return dateObj;
  };
  const checkInTime = dateObjectFromSeconds(props.userBooking.checkin_Time);
  const checkOutTime = dateObjectFromSeconds(props.userBooking.checkout_Time);
  const dateDifference = differenceInDays(checkOutTime, checkInTime);

  dispatch(resetBookingInfo());

  return (
    <>
      <BookingHead
        metaTitle={`Staybook.in: Booking Confirmation`}
        metaDescription={`${router.query.hotel_Name}`}
        // tabImageUrl={TAB_IMAGE_URL}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />
      {confettie && (
        <div className="fixed inset-0 z-50 h-screen w-full">
          <iframe
            src="https://lottie.host/embed/c79571d1-0bde-43b9-a737-2310d2eb6aa7/LsGFt1bpfG.json"
            className="h-full w-full"
          ></iframe>
        </div>
      )}
      <section className="h-auto w-full">
        <Navbar />
        <div className="wrapper h-full py-16">
          <div className="flex flex-col items-center justify-between md:px-10 lg:flex-row xl:px-0">
            {/* leftBar */}
            <div className="flex w-full justify-center self-start p-4 lg:sticky lg:top-24 lg:w-1/3">
              <div className="flex w-full flex-col items-center justify-between rounded-lg bg-secondary p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  {props.userBooking.hotel_Image_Url === "" ? (
                    <Image
                      src={"/fallback_image.jpg"}
                      alt="Hotel_Info"
                      width={160}
                      height={90}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <LazyLoadImage
                      src={props.userBooking.hotel_Image_Url}
                      alt="Hotel_Info"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4 text-white">
                  <p className="text-lg font-medium">
                    {props.userBooking.hotel_Name}
                  </p>
                  <Link
                    href="tel:+918373929299"
                    className="flex items-center py-1"
                  >
                    <PhoneIcon className="h-6 w-6 rounded-full p-1" />
                    <p>+91 8527703312</p>
                  </Link>
                  <Link
                    href="mailto:staybookbooking@gmail.com"
                    className="flex items-center gap-x-2"
                  >
                    <MailIcon className="h-6 w-6 rounded-full p-0.5" />
                    <p>staybookbooking@gmail.com</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* rightBar */}
            <div className="w-full p-4 lg:w-2/3">
              {/* Print the as PDF Document */}
              {/* <div className="relative flex w-full bg-white px-3 py-5 shadow-md">
                <div className={`relative`}></div>
                <div className={`relative`}></div>
              </div> */}
              <div className="p-2">
                <div className="mb-3 flex flex-col justify-between sm:flex-row">
                  <div className="flex items-center justify-end gap-x-1">
                    <BadgeCheckIcon className="h-12 w-12 self-start fill-green-500 sm:self-center" />
                    <h1 className="text-2xl font-bold">
                      YOUR BOOKING IS COMPLETE
                    </h1>
                  </div>
                  <div className="py-1">
                    <h2>Booking Id</h2>
                    <strong>{booking_Id}</strong>
                  </div>
                </div>
                <div>
                  <p>Thank you for booking with us</p>
                  <p>
                    You will soon receive a confirmation mail at{" "}
                    {props.userBooking.user_Email_Id}
                  </p>
                </div>
                {/* <div>
                  {userAuthReduxState.isLoggedIn ? (
                    <button
                      className="mt-3 rounded-md bg-primary px-3 py-2 font-semibold text-white"
                      onClick={() =>
                        router.push(`/profile/my-bookings/${booking_Id}`)
                      }
                    >
                      View your booking
                    </button>
                  ) : (
                    <button
                      className="mt-3 rounded-md bg-primary px-3 py-2 font-semibold text-white"
                      onClick={() => router.push("/login")}
                    >
                      View booking
                    </button>
                  )}
                </div> */}
              </div>

              {/* dates and guest */}
              <div className="my-4 flex w-full flex-col gap-4 rounded-lg bg-primary p-4 sm:flex-row sm:px-9 md:items-center md:justify-between">
                <div>
                  <p>Check In</p>
                  <strong>
                    {checkInTime.toString().includes("GMT+")
                      ? format(checkInTime, "MMM dd, yyyy")
                      : formatDateToCustomString(checkInTime.toISOString())}
                  </strong>
                  <p>After 12PM</p>
                </div>
                <div>
                  <p>Check Out</p>
                  <strong>
                    {checkOutTime.toString().includes("GMT+")
                      ? format(checkOutTime, "MMM dd, yyyy")
                      : formatDateToCustomString(checkOutTime.toISOString())}
                  </strong>
                  <p>Before 12PM</p>
                </div>
                <div>
                  <p>Guests</p>
                  <strong>
                    {props.userBooking.total_Guests_Count} Guests |{" "}
                  </strong>
                  <strong>
                    {props.userBooking.total_Children_Count > 0 ? (
                      <>
                        {props.userBooking.total_Children_Count}{" "}
                        {props.userBooking.total_Children_Count > 1
                          ? "Children"
                          : "Child"}
                      </>
                    ) : (
                      "0 Children"
                    )}
                  </strong>
                  <p>
                    {dateDifference} {dateDifference > 1 ? "Nights" : "Night"} &{" "}
                    {props.userBooking.total_Rooms_Count}{" "}
                    {props.userBooking.total_Rooms_Count > 1 ? "Rooms" : "Room"}
                  </p>
                </div>
              </div>

              {/* guest details */}
              <div className="rounded-lg bg-white p-4 shadow-2xl">
                <div
                  className={`${
                    !guestDetails ? "border-0" : "border-b-2 pb-4"
                  } flex items-center justify-between border-primary`}
                >
                  <p className="font-serif text-2xl font-semibold tracking-wide text-secondary">
                    Guest Details
                  </p>
                  <button
                    onClick={handleGuestDetails}
                    className="flex items-center gap-x-2 rounded-full border-0 bg-primary outline-none"
                  >
                    <ChevronDownIcon
                      className={`${
                        !guestDetails ? "rotate-180" : ""
                      } h-8 w-8 rounded-full p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                {guestDetails && (
                  <div className="mt-4 w-full">
                    <div className="mb-1 font-medium">
                      <p className="uppercase">{props.userBooking.user_Name}</p>
                      <a
                        href={`tel:+${props.userBooking.user_Phone_Number}`}
                        className="block"
                      >
                        +{props.userBooking.user_Phone_Number}
                      </a>
                      <a
                        href={`mailto:${props.userBooking.user_Email_Id}`}
                        className="block"
                      >
                        {props.userBooking.user_Email_Id}
                      </a>
                    </div>

                    {/* user address deatils if user has filled it */}
                    {props.userBooking.user_Address && (
                      <p className="mb-1">
                        Address :{" "}
                        <strong>{props.userBooking.user_Address}</strong>
                      </p>
                    )}
                    {props.userBooking.user_Pincode &&
                      props.userBooking.user_State && (
                        <p className="mb-1">
                          State & Pincode :{" "}
                          <strong>
                            {props.userBooking.user_Pincode},{" "}
                            {props.userBooking.user_State}
                          </strong>
                        </p>
                      )}

                    {props.userBooking.user_Instructions !== "" && (
                      <p>
                        User Instructions :{" "}
                        <strong>{props.userBooking.user_Instructions}</strong>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Room details */}
              <div className="mt-4 rounded-lg bg-white p-4 shadow-2xl">
                <div
                  className={`${
                    !roomDetails ? "border-0" : "border-b-2 pb-4"
                  } flex items-center justify-between border-primary`}
                >
                  <p className="font-serif text-2xl font-semibold tracking-wide text-secondary">
                    Room Details
                  </p>
                  <button
                    onClick={handleRoomDetails}
                    className="flex items-center gap-x-2 rounded-full border-0 bg-primary outline-none"
                  >
                    <ChevronDownIcon
                      className={`${
                        !roomDetails ? "rotate-180" : ""
                      } h-8 w-8 rounded-full p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                {roomDetails && (
                  <div className="mt-4 w-full">
                    {props.userBooking.roomsList.map(
                      (roomInfo: RoomDetails, index: number) => (
                        <div
                          key={index}
                          className="mb-4 w-full gap-x-4 rounded-lg"
                        >
                          <div className="rounded-t-lg bg-primary px-4 py-2.5">
                            <span className="text-xl font-semibold">
                              {roomInfo.room_Count} x {roomInfo.room_Name}
                            </span>
                          </div>

                          <div className="rounded-b-lg border-2 border-primary px-4 py-2.5">
                            <div className="my-1 rounded border-l-2 border-secondary pl-2 text-sm font-medium tracking-wide">
                              <p>{roomInfo.room_Info}</p>
                              <p>
                                {roomInfo.plan_Info} ({roomInfo.plan_Name})
                              </p>
                              <p>
                                {roomInfo.num_Guests}{" "}
                                {roomInfo.num_Guests > 1 ? "Guests" : "Guest"}
                                {roomInfo.num_Children > 0 && (
                                  <>
                                    {roomInfo.num_Children > 0 && " & "}
                                    {roomInfo.num_Children}{" "}
                                    {roomInfo.num_Children > 1
                                      ? "Childrens"
                                      : "Child"}
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Payment Breakup */}
              <div className="mt-4 rounded-lg bg-white p-4 shadow-2xl">
                <div
                  className={`${
                    !paymentDetails ? "border-0" : "border-b-2 pb-4"
                  } flex items-center justify-between border-primary`}
                >
                  <p className="font-serif text-2xl font-semibold tracking-wide text-secondary">
                    Payment Summary ({paymentMode})
                  </p>
                  <button
                    onClick={handlePaymentDetails}
                    className="flex items-center gap-x-2 rounded-full border-0 bg-primary outline-none"
                  >
                    <ChevronDownIcon
                      className={`${
                        !paymentDetails ? "rotate-180" : ""
                      } h-8 w-8 rounded-full p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                {paymentDetails && (
                  <div className="mt-4 w-full px-4">
                    <div className="flex items-center justify-between">
                      <p>Total room price</p>
                      <p>₹ {props.userBooking.total_Room_Cost}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Taxes & fees</p>
                      <p>
                        ₹{" "}
                        {props.userBooking.total_Tax +
                          props.userBooking.hotel_Handling_Charges}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pb-2 font-medium">
                      <p>Total Price (Including Tax)</p>
                      <p>
                        ₹{" "}
                        {props.userBooking.total_Price +
                          props.userBooking.hotel_Handling_Charges}
                      </p>
                    </div>
                    {paymentMode === "Prepaid Booking" ||
                      (paymentMode === "Partial Payment" && (
                        <div className="flex items-center justify-between">
                          <strong>Total Price Paid</strong>
                          <strong>₹ {props.userBooking.amount_Paid}</strong>
                        </div>
                      ))}
                    <div className="flex items-center justify-between text-red-700">
                      <strong>Price Left to Pay</strong>
                      <strong>
                        ₹{" "}
                        {props.userBooking.total_Price +
                          props.userBooking.hotel_Handling_Charges -
                          props.userBooking.amount_Paid}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params, query, req, res } = await context;

  const hotel_Id = query.hotel_Id;
  const userEmailId = query.user_Email;
  const booking_Id = params.bookingId;

  const userBooking = await getUserBookingInfo(userEmailId, booking_Id);
  const serializedUserBooking = JSON.stringify(userBooking);

  // const cookies = parse(req.headers.cookie || "");
  // const userAccessToken = cookies[USER_ACCESS_TOKEN];
  // const userAccessTokenObject: any = await extractJWTValues(userAccessToken);
  // let user_email = userAccessTokenObject;

  return {
    props: {
      userBooking: JSON.parse(serializedUserBooking),
    },
  };
}
