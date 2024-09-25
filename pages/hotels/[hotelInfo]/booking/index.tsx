import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import PhoneInput from "react-phone-input-2";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import { changeFormat } from "@/lib/helper";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import Router, { useRouter } from "next/router";
import { routerToPaymentPage } from "@/lib/handlers/pageHandler";
import CustomHead from "@/components/header/CustomHead";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingModel from "@/components/models/LoadingModel";
import { Toaster } from "sonner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBookingInfo,
  selectTotalRoomsCount,
} from "@/lib/redux/bookingSlice";
import {
  selectBookingDetailsInfo,
  updateUserBookingInfo,
} from "@/lib/redux/bookingConfirmationSlice";
import dynamic from "next/dynamic";
import {
  convertToIST,
  formatDateToCustomString,
} from "@/lib/helper/timestampToDate";

const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
  { ssr: false },
);
const StarIcon = dynamic(() => import("@heroicons/react/solid/StarIcon"), {
  ssr: false,
});
const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});

const shortid = require("shortid");

type Props = {
  // bookingDetails: any;
  // hotelDetails: HotelInformationDetails;
};

type FormData = {
  firstName: string;
  email: string;
  phoneNumber: string;
};

export default function HotelBookingInformationPage(props: Props) {
  const totalRoomCount = useSelector(selectTotalRoomsCount);
  const bookingCnfInfo = useSelector(selectBookingDetailsInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const canonical = router.asPath.split("?");
  const [priceInfo, setPriceInfo] = useState<boolean>(false);
  const [hotelInfo, setHotelInfo] = useState<boolean>(false);
  const [guestDetails, setGuestDetails] = useState<boolean>(true);
  const [Policy, setPolicy] = useState<boolean>(false);
  const [roomsList, setRoomsList] = useState<any[]>(bookingCnfInfo.roomsList);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);
  const [checkInTime, setCheckinTime] = useState("01:00 PM");
  const [checkOutTime, setCheckOutTime] = useState("11:00 AM");
  const [loading, setLoading] = useState<boolean>(false);
  const checkInDate = new Date(bookingCnfInfo.checkin_Time);
  const checkOutDate = new Date(bookingCnfInfo.checkout_Time);

  useEffect(() => {
    // Check if 'persist:root' in localStorage is empty and redirect to rooms
    const persistRoot = localStorage.getItem("persist:root");
    if (
      bookingCnfInfo.total_Price === 0 ||
      !persistRoot ||
      persistRoot === "undefined" ||
      persistRoot === "{}"
    ) {
      router.back();
    }
  }, [localStorage.getItem("persist:root")]);

  // window.location.reload();
  useEffect(() => {
    setCheckinTime(changeFormat(bookingCnfInfo.hotel_Arrival_Time));
    setCheckOutTime(changeFormat(bookingCnfInfo.hotel_Departure_Time));
  }, [bookingCnfInfo]);

  useEffect(() => {
    dispatch(resetBookingInfo());
  }, []);

  const flex = "flex items-start justify-between";

  const handlePrice = () => {
    setPriceInfo((prev: any) => !prev);
  };
  const handleHotel = () => {
    setHotelInfo((prev: any) => !prev);
  };
  const handleGuest = () => {
    setGuestDetails((prev: any) => !prev);
  };
  const handlePolicy = () => {
    setPolicy((prev: any) => !prev);
  };

  const [pincodeNDetails, setPincodeNDetails] = useState<any>(true);
  const handlePincodeNDetails = () => {
    setPincodeNDetails((prev: any) => !prev);
  };

  const [formData, setFormData] = useState({
    firstName: bookingCnfInfo.user_Name.split(" ")[0],
    lastName: bookingCnfInfo.user_Name.split(" ")[1],
    email: bookingCnfInfo.user_Email_Id,
    phoneNumber: "",
    instructions: "",
    address: "",
    pincode: "",
    state: "",
    country: "in",
  });

  const [formErrors, setFormErrors] = useState<FormData>({
    firstName: "",
    email: "",
    phoneNumber: "",
  });

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // form validation logic
  const handleFormValidation = (): boolean => {
    const newFormErrors: FormData = {
      firstName: "",
      email: "",
      phoneNumber: "",
    };
    if (!formData.firstName.trim()) {
      newFormErrors.firstName = "First name is required";
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newFormErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 5) {
      newFormErrors.phoneNumber = "Please enter a valid phone number";
    }
    setFormErrors(newFormErrors);
    const isValid = Object.values(newFormErrors).every((error) => error === "");
    return isValid;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
      country: country.countryCode,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleFormValidation()) {
      setLoadingModel(true);

      dispatch(
        updateUserBookingInfo({
          user_First_Name: formData.firstName,
          user_Last_Name: formData.lastName,
          user_Email_Id: formData.email,
          user_Phone_Number: formData.phoneNumber,
          user_Instructions: formData.instructions,
          user_Address: formData.address,
          user_Pincode: formData.pincode,
          user_City: "",
          user_State: formData.state,
          user_Country: "",
        }),
      );

      const params = new PageRouterQueryParams(router);
      params.hotelName = bookingCnfInfo.hotel_Name;
      params.hotelSlugName = bookingCnfInfo.hotel_Slug_Name;
      params.checkin = new Date(bookingCnfInfo.checkin_Time);
      params.checkout = new Date(bookingCnfInfo.checkout_Time);
      params.num_nights = bookingCnfInfo.num_nights;
      params.num_guests = bookingCnfInfo.total_Guests_Count;

      routerToPaymentPage(params);
    }
  };
  const handleFormButtonClick = () => {
    if (guestDetails === false) {
      setGuestDetails(true);
    }
  };

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <CustomHead
        metaShowTitle={`Detail | ${bookingCnfInfo.hotel_Name}`}
        metaDescription={`Confirm booking details at ${bookingCnfInfo.hotel_Name}, ${bookingCnfInfo.hotel_Address}`}
        metaImageUrl={bookingCnfInfo.hotel_Image_Url}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />

      <LoadingModel isLoading={loadingModel} setIsLoading={setLoadingModel} />

      <div className="absolute inset-x-0 top-0 z-50">
        <Toaster richColors position="top-right" />
      </div>

      {/* loading if the local storage data is missing or the booking price is missing */}
      {loading && (
        <LoadingModel isLoading={loading} setIsLoading={setLoading} />
      )}

      <section className="fixed inset-0 h-auto w-full overflow-y-scroll bg-secondary/75">
        <h1 className="hidden">booking page</h1>
        <div className="container mx-auto h-auto min-h-screen py-0 sm:py-14">
          <div className="flex h-full w-full flex-col justify-between lg:flex-row">
            <div className="h-full w-full p-4 lg:w-2/3">
              {/* hotel Info */}
              <div className="rounded-lg bg-white p-4">
                <div
                  className={`${
                    !hotelInfo ? "border-0" : "border-b pb-4"
                  } flex items-center justify-between  `}
                >
                  <h2 className="font-dream text-2xl font-semibold tracking-wide text-secondary ">
                    HOTEL INFO
                  </h2>
                  <button
                    onClick={handleHotel}
                    className="flex items-center gap-x-2 rounded-full border-0 outline-none"
                  >
                    <ChevronDownIcon
                      className={`${
                        !hotelInfo ? "rotate-180" : ""
                      } h-8 w-8 rounded-full bg-primary p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                {hotelInfo && (
                  <>
                    {/* hotel info */}
                    <div
                      className={`${flex} w-full flex-col gap-x-4 py-4 sm:flex-row`}
                    >
                      <div className="w-full sm:w-1/3">
                        <div className="aspect-video w-full overflow-hidden rounded-md">
                          {bookingCnfInfo.hotel_Image_Url === "" ? (
                            <Image
                              src={"/fallback_image.jpg"}
                              alt="Hotel_Info"
                              width={160}
                              height={90}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <LazyLoadImage
                              src={bookingCnfInfo.hotel_Image_Url}
                              alt="Hotel_Info"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <div className="top-0 w-full p-2 text-start sm:w-2/3 sm:p-0">
                        <div className="my-2 flex items-center gap-x-4 sm:py-0">
                          <div className="flex w-fit justify-end self-start">
                            {[...Array(bookingCnfInfo.hotel_Star_Rating)].map(
                              (item: any, idx: number) => (
                                <StarIcon
                                  key={idx}
                                  className="h-4 w-4 rounded-full fill-primary"
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <span className="flex items-center gap-x-2 font-dream text-xl font-semibold tracking-wide sm:p-0">
                          {bookingCnfInfo.hotel_Name}
                        </span>
                        <Link href={bookingCnfInfo.hotel_Map_Url}>
                          {bookingCnfInfo.hotel_Address}
                        </Link>
                      </div>
                    </div>

                    {/* dates and guest */}
                    <div
                      className={`flex w-full flex-col gap-4 rounded-lg bg-primary p-4 sm:flex-row sm:px-9 md:items-center md:justify-between`}
                    >
                      <div>
                        <p>Check In</p>
                        <strong>
                          {checkInDate.toString().includes("GMT+")
                            ? format(checkInDate, "MMM dd, yyyy")
                            : formatDateToCustomString(checkInDate.toISOString())}
                        </strong>
                        <p>{`After ${checkInTime}`}</p>
                      </div>
                      <div>
                        <p>Check Out</p>
                        <strong>
                          {checkOutDate.toString().includes("GMT+")
                            ? format(checkOutDate, "MMM dd, yyyy")
                            : formatDateToCustomString(checkOutDate.toISOString())}
                        </strong>
                        <p>{`Before ${checkOutTime}`}</p>
                      </div>
                      <div>
                        <p>Guests</p>
                        <strong>
                          {bookingCnfInfo.total_Guests_Count} Adults |{" "}
                        </strong>
                        <strong>
                          {bookingCnfInfo.total_Children_Count > 0 ? (
                            <>
                              {bookingCnfInfo.total_Children_Count}{" "}
                              {bookingCnfInfo.total_Children_Count > 1
                                ? "Children"
                                : "Child"}
                            </>
                          ) : (
                            "0 Children"
                          )}
                        </strong>

                        <p>
                          {bookingCnfInfo.num_nights} Night &{" "}
                          {bookingCnfInfo.total_Rooms_Count}{" "}
                          {bookingCnfInfo.total_Rooms_Count > 1
                            ? "Rooms"
                            : "Room"}
                        </p>
                      </div>
                    </div>

                    {/* room map list */}
                    <div className="relative flex w-full flex-col space-y-2">
                      {roomsList.map((roomInfo: RoomDetails, index: number) => (
                        <div
                          key={index}
                          className="mt-4 w-full gap-x-4 rounded-lg"
                        >
                          <div className="rounded-t-lg bg-primary px-4 py-2.5">
                            <span className="text-xl font-semibold">
                              {roomInfo.room_Count} x {roomInfo.room_Name}
                            </span>
                          </div>

                          <div className="rounded-b-lg border-2 border-primary px-4 py-2.5">
                            <div className="my-1 rounded border-l-2 border-secondary pl-2 text-sm font-medium tracking-wide">
                              <p>{roomInfo.room_Info}</p>
                              <p>{roomInfo.plan_Info}</p>
                              <p>
                                {roomInfo.num_Guests}{" "}
                                {roomInfo.num_Guests > 1 ? "Adults" : "Adult"}
                                {roomInfo.num_Children > 0 && (
                                  <>
                                    {roomInfo.num_Children > 0 && " & "}
                                    {roomInfo.num_Children}{" "}
                                    {roomInfo.num_Children > 1
                                      ? "Children"
                                      : "Child"}
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handlePolicy} className="px-4 text-xs">
                      View Booking & Cancellation Policy
                    </button>
                  </>
                )}
              </div>
              {Policy && (
                <>
                  <div className="fixed inset-0 z-20 grid h-full w-full place-items-center overflow-y-scroll bg-black/50 p-4">
                    <div className="container-snap relative h-5/6 w-full overflow-y-scroll rounded-lg bg-white sm:w-2/4">
                      <div className="sticky inset-x-0 top-0 flex w-full items-center justify-between bg-white p-4">
                        <p className="text-xl font-bold tracking-wide">
                          Policies
                        </p>
                        <XIcon
                          onClick={handlePolicy}
                          className="block h-7 w-7 cursor-pointer rounded-full text-right"
                        />
                      </div>
                      <div className="px-4 pb-4">
                        <div>
                          <p className="text-xl font-medium">Must Read</p>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: bookingCnfInfo.hotel_General_Policy,
                            }}
                          />
                          <p>
                            17. In the event that the hotel is unable to provide
                            a reserved room due to reasons including, but not
                            limited to, price inaccuracy, modifications made by
                            the customer, or any other unforeseen circumstances,
                            Staybook shall issue a full refund of any payment
                            made by the customer. However, any associated
                            charges incurred in processing the reservation or
                            cancellation shall be payable by the customer
                          </p>
                          <p>
                            18. In the event of any future fluctuations or
                            increases in hotel prices, the customer shall be
                            responsible for any additional charges incurred.
                            This includes circumstances where the initially
                            agreed upon price may vary or be subject to change
                            due to market conditions, seasonal adjustments, or
                            other factors. The customer acknowledges and agrees
                            to assume responsibility for any such price
                            adjustments and agrees to pay the difference, if
                            applicable, upon notification by the hotel.
                          </p>
                          <p>
                            By proceeding with any booking via Staybook, you are
                            inherently acknowledging and conting to adhere to
                            all the terms and conditions.
                          </p>
                        </div>

                        {bookingCnfInfo.hotel_Refund_Policy.length !== 0 && (
                          <div>
                            <p className="text-xl font-medium">Refund Policy</p>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: bookingCnfInfo.hotel_Refund_Policy,
                              }}
                            />
                          </div>
                        )}

                        <div className="mt-4">
                          <p className="pb-2 text-xl font-medium">
                            Cancellation Policy
                          </p>
                          {/* <div className="border-2 p-4 rounded-xl">
                              <div className="bg-primary rounded-full w-full p-1 flex items-center justify-between">
                                <span className="h-3 w-3 rounded-full bg-white block"></span>
                                <span className="h-3 w-3 rounded-full bg-white block"></span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-medium">now</p>
                                <p className="text-xs text-right">date</p>
                              </div>
                            </div> */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: bookingCnfInfo.hotel_Refund_Policy,
                            }}
                          />

                          <p className="mb-1 mt-4 font-medium sm:mb-2">
                            Cancellations post that will be subject to a fee as
                            follows
                          </p>
                          <div className="borde-2 flex items-center justify-between rounded-xl border-2 p-2">
                            <div className="w-1/2">
                              <strong className="mb-1 block border-b sm:mb-2">
                                Date
                              </strong>
                              <p className="py-0.5 text-xs sm:text-base">
                                Before 7 days
                              </p>
                              <p className="py-0.5 text-xs sm:text-base">
                                Between 7 days & 72 hours
                              </p>
                              <p className="py-0.5 text-xs sm:text-base">
                                Less then 72 hours
                              </p>
                            </div>
                            <div className="w-1/2 pl-2">
                              <strong className="mb-1 block border-b sm:mb-2">
                                Payable Fee
                              </strong>
                              <p className="py-0.5 text-xs sm:text-base">
                                25% of Booking Amount
                              </p>
                              <p className="py-0.5 text-xs sm:text-base">
                                50% of Booking Amount
                              </p>
                              <p className="py-0.5 text-xs sm:text-base">
                                100% of Booking Amount
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* User Info */}
              <form onSubmit={formSubmitHandler}>
                <div className="mt-4 rounded-lg bg-white p-4">
                  <div
                    className={`${
                      !guestDetails ? "border-0" : "border-b"
                    } flex items-center justify-between pb-4`}
                  >
                    <span className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                      GUEST DETAILS
                    </span>
                    <div
                      onClick={handleGuest}
                      className="flex items-center gap-x-2 rounded-full border-0 outline-none"
                    >
                      <ChevronDownIcon
                        className={`${
                          !guestDetails ? "rotate-180" : ""
                        } h-8 w-8 rounded-full bg-primary p-1.5 transition-all duration-200`}
                      />
                    </div>
                  </div>
                  {guestDetails && (
                    <div className="w-full py-0 sm:p-4 sm:py-4">
                      {/* User Name */}
                      <div className="flex w-full flex-col items-center gap-x-4 sm:flex-row">
                        <div className="mb-3 w-full tracking-wide">
                          <label
                            htmlFor="firstName"
                            className="block py-1 font-medium"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            className="block h-12 w-full rounded border-2 px-4 outline-0"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                          <p className="text-xs font-medium tracking-wide text-red-800">
                            {formErrors.firstName}
                          </p>
                        </div>
                        <div className="mb-3 w-full tracking-wide">
                          <label
                            htmlFor="lastName"
                            className="block py-1 font-medium"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            className="block h-12 w-full rounded border-2 px-4 outline-0"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* User Email */}
                      <div className="mb-3 tracking-wide">
                        <label
                          htmlFor="email"
                          className="block py-1 font-medium"
                        >
                          Email Address{" "}
                          <span className="hidden text-xs sm:inline">
                            (Booking voucher will be sent to this email address)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter your email"
                          className="block h-12 w-full rounded border-2 px-4 outline-0"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs font-medium tracking-wide text-red-800">
                          {formErrors.email}
                        </p>
                      </div>
                      {/* User Phone */}
                      <div className="mb-3 tracking-wide">
                        <label
                          htmlFor="phone"
                          className="block py-1 font-medium"
                        >
                          Phone No.
                        </label>
                        <PhoneInput
                          country={formData.country}
                          inputProps={{
                            name: "phoneNumber",
                            required: true,
                          }}
                          value={formData.phoneNumber}
                          onChange={handlePhoneChange}
                          countryCodeEditable={false}
                          inputStyle={{
                            width: "100%",
                            height: "3rem",
                            border: "2px solid #e5e7eb",
                          }}
                          buttonStyle={{
                            padding: "4px",
                          }}
                          dropdownStyle={{
                            background: "#e8a646",
                          }}
                        />
                        <p className="text-xs font-medium tracking-wide text-red-800">
                          {formErrors.phoneNumber}
                        </p>
                      </div>
                      {/* special Instructions */}
                      <div className="mb-3 tracking-wide">
                        <label
                          htmlFor="instructions"
                          className="block py-1 font-medium"
                        >
                          Special Instructions
                        </label>
                        <textarea
                          disabled={false}
                          name="instructions"
                          placeholder="Enter your request(s) (if any) for your stay at our hotel"
                          className="block w-full resize-none rounded border-2 px-4 py-2 outline-0"
                          cols={30}
                          rows={2}
                          value={formData.instructions}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                <div className="my-4 rounded-lg bg-white p-4">
                  <div
                    className={`${
                      !pincodeNDetails ? "border-0" : "border-b"
                    } flex items-center justify-between pb-4`}
                  >
                    <p className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                      YOUR PINCODE AND STATE
                    </p>
                    <div
                      onClick={handlePincodeNDetails}
                      className="flex items-center gap-x-2 rounded-full border-0 outline-none"
                    >
                      <ChevronDownIcon
                        className={`${
                          !pincodeNDetails ? "rotate-180" : ""
                        } h-8 w-8 rounded-full bg-primary p-1.5 transition-all duration-200`}
                      />
                    </div>
                  </div>
                  {pincodeNDetails && (
                    <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 sm:mt-0 sm:flex-row sm:p-4">
                      {/* User Addres */}
                      <div className="w-full tracking-wide sm:w-2/3">
                        <label
                          htmlFor="address"
                          className="block pb-1 font-medium"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter your address"
                          className="block h-12 w-full rounded border-2 px-4 outline-0"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* User Pincode */}
                      <div className="w-full tracking-wide sm:w-1/3">
                        <label
                          htmlFor="pincode"
                          className="block pb-1 font-medium"
                        >
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Your pincode"
                          maxLength={6}
                          className="block h-12 w-full rounded border-2 px-4 outline-0"
                          value={formData.pincode}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* User State */}
                      <div className="w-full tracking-wide sm:w-1/3">
                        <label
                          htmlFor="state"
                          className="block pb-1 font-medium"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          placeholder="Your state"
                          className="block h-12 w-full rounded border-2 px-4 outline-0"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill details visible on small screens only */}
                <div className="mt-4 rounded-lg bg-white p-4 lg:hidden">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="font-dream text-xl font-semibold tracking-wide text-secondary">
                      {priceInfo ? "Price Details" : "Price Summary"}
                    </span>
                    <div
                      onClick={handlePrice}
                      className="flex items-center gap-x-2 rounded-full border-0 outline-none"
                    >
                      <span className="text-xs">view price brakeup</span>
                      <ChevronDownIcon
                        className={`${
                          priceInfo ? "rotate-180" : ""
                        } h-8 w-8 rounded-full bg-primary p-1.5 transition-all duration-200`}
                      />
                    </div>
                  </div>

                  <div
                    className={`${flex} ${priceInfo ? "font-medium" : ""} py-2`}
                  >
                    <p>{`Base Price (${bookingCnfInfo.total_Rooms_Count} room x ${bookingCnfInfo.num_nights} night)`}</p>
                    <p>₹{Math.round(bookingCnfInfo.total_Room_Cost)}</p>
                  </div>

                  {priceInfo && (
                    <div className={`${flex} py-2`}>
                      <p>Discount by the Property</p>
                      <p>₹{bookingCnfInfo.total_Discount}</p>
                    </div>
                  )}

                  <div
                    className={`${flex} ${priceInfo ? "font-medium" : ""} py-2`}
                  >
                    <p>Taxes & fees</p>
                    <p>₹{Math.round(bookingCnfInfo.total_Tax)}</p>
                  </div>

                  <div className={`${flex} py-2 text-lg font-semibold`}>
                    <p>Total Amount to be paid</p>
                    <p>₹{Math.round(bookingCnfInfo.total_Price)}</p>
                  </div>
                </div>

                {/* Functional button */}
                {Object.entries(formErrors).map(
                  ([fieldName, error], index: number) => (
                    <div key={index}>
                      {error && (
                        <p className="font-medium text-white">{`${error}`}</p>
                      )}
                    </div>
                  ),
                )}
                <button
                  type="submit"
                  onClick={handleFormButtonClick}
                  className="mt-4 w-full rounded-lg border-0 bg-primary p-4 text-center font-semibold tracking-wide text-white outline-none sm:text-xl"
                >
                  Proceed To Payment Options
                </button>
              </form>
            </div>

            {/* left side visible on large devices only */}
            <div className="sticky top-0 hidden h-full w-full p-4 lg:block lg:w-1/3">
              <div className="rounded-lg bg-white p-4">
                {/* heading */}
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-dream text-xl font-semibold tracking-wide text-secondary">
                    {priceInfo ? "Price Details" : "Price Summary"}
                  </span>
                  <button
                    onClick={handlePrice}
                    className="flex items-center gap-x-2 rounded-full border-0 outline-none"
                  >
                    <span className="text-xs">view price brakeup</span>
                    <ChevronDownIcon
                      className={`${
                        priceInfo ? "rotate-180" : ""
                      } h-8 w-8 rounded-full bg-primary p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>

                {/* details */}
                <div
                  className={`${flex} ${priceInfo ? "font-medium" : ""} py-2`}
                >
                  <p>{`Base Price (${bookingCnfInfo.total_Rooms_Count} room x ${bookingCnfInfo.num_nights} night)`}</p>
                  <p>{`₹${Math.round(bookingCnfInfo.total_Room_Cost)}`}</p>
                </div>
                <div
                  className={`${flex} ${priceInfo ? "font-medium" : ""} py-2`}
                >
                  <p>Taxes & fees</p>
                  <p>{`₹${Math.round(bookingCnfInfo.total_Tax)}`}</p>
                </div>

                <div className={`${flex} py-2 text-lg font-semibold`}>
                  <p>Total Amount to be paid</p>
                  <p>{`₹${Math.round(bookingCnfInfo.total_Price)}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
