import { format } from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { makeRazorpayPayment } from "@/lib/handlers/razorpayHandler";
import Router, { useRouter } from "next/router";
import { bookingConfirmationRedirector } from "@/lib/firebase/bookingHandler";
import CustomHead from "@/components/header/CustomHead";
import { makeCCAvenuePayment } from "@/lib/handlers/ccAvenueHandler";
import LoadingModel from "@/components/models/LoadingModel";
import { payAtHotelApiBookingHandler } from "@/lib/handlers/hotelBookingApiHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookingDetailsInfo,
  updateBookingIdInfo,
  updatePaymentMethodInfo,
} from "@/lib/redux/bookingConfirmationSlice";
import {
  formatDateToCustomString,
} from "@/lib/helper/timestampToDate";
type Props = {
  // bookingDetails: any;
  // hotelDetails: HotelInformationDetails;
};

const generateUniqueId = require("generate-unique-id");
const shortid = require("shortid");

export default function PaymentPage(props: Props) {
  const dispatch = useDispatch();
  const bookingCnfInfo = useSelector(selectBookingDetailsInfo);
  const router = useRouter();
  const canonical = router.asPath.split("?");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorModel, setErrorModel] = useState<boolean>(false);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);
  const [hotelInfo, setHotelInfo] = useState<boolean>(false);
  const checkInDate = new Date(bookingCnfInfo.checkin_Time);
  const checkOutDate = new Date(bookingCnfInfo.checkout_Time);
  const handleHotel = () => {
    setHotelInfo((prev: any) => !prev);
  };

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

  const generateBookingDetails = async (): Promise<BookingDetails> => {
    let bookingDetails = new BookingDetails();
    bookingDetails.booking_Id = bookingCnfInfo.booking_Id;
    bookingDetails.receipt_Id = bookingCnfInfo.receipt_Id;
    bookingDetails.roomsList = bookingCnfInfo.roomsList;
    bookingDetails.hotel_Image_Url = bookingCnfInfo.hotel_Image_Url;
    bookingDetails.hotel_Name = bookingCnfInfo.hotel_Name;
    bookingDetails.hotel_Email_Id = bookingCnfInfo.hotel_Email_Id;
    bookingDetails.hotel_Landmark = bookingCnfInfo.hotel_Address;
    bookingDetails.hotel_Firebase_Id = bookingCnfInfo.hotel_Firebase_Id;
    bookingDetails.hotel_Slug_Name = bookingCnfInfo.hotel_Slug_Name;
    bookingDetails.hotel_Map_Url = bookingCnfInfo.hotel_Map_Url;
    bookingDetails.hotel_Star_Rating = bookingCnfInfo.hotel_Star_Rating;
    bookingDetails.hotel_Arrival_Time = bookingCnfInfo.hotel_Arrival_Time;
    bookingDetails.hotel_Departure_Time = bookingCnfInfo.hotel_Departure_Time;
    bookingDetails.hotel_General_Policy = bookingCnfInfo.hotel_General_Policy;
    bookingDetails.hotel_Cancellation_Policy =
      bookingCnfInfo.hotel_Cancellation_Policy;
    bookingDetails.hotel_Refund_Policy = bookingCnfInfo.hotel_Refund_Policy;

    bookingDetails.user_Name = `${bookingCnfInfo.user_First_Name} ${
      bookingCnfInfo.user_Last_Name || ""
    }`;
    bookingDetails.user_First_Name = bookingCnfInfo.user_First_Name;
    bookingDetails.user_Last_Name = bookingCnfInfo.user_Last_Name;
    bookingDetails.user_Email_Id = bookingCnfInfo.user_Email_Id;
    bookingDetails.user_Phone_Number = bookingCnfInfo.user_Phone_Number;
    bookingDetails.user_Instructions = bookingCnfInfo.user_Instructions;

    bookingDetails.total_Rooms_Count = bookingCnfInfo.total_Rooms_Count;
    bookingDetails.total_Guests_Count = bookingCnfInfo.total_Guests_Count;
    bookingDetails.total_Children_Count = bookingCnfInfo.total_Children_Count;
    bookingDetails.checkin_Time = new Date(
      bookingCnfInfo.checkin_Time,
    ).toString();
    bookingDetails.checkout_Time = new Date(
      bookingCnfInfo.checkout_Time,
    ).toString();
    bookingDetails.num_nights = bookingCnfInfo.num_nights;
    bookingDetails.total_Room_Cost = bookingCnfInfo.total_Room_Cost;
    bookingDetails.total_Tax = bookingCnfInfo.total_Tax;
    bookingDetails.total_Price = bookingCnfInfo.total_Price;
    bookingDetails.paying_Amount = bookingCnfInfo.paying_Amount;

    bookingDetails.user_Address = bookingCnfInfo.user_Address;
    bookingDetails.user_Pincode = bookingCnfInfo.user_Pincode;
    bookingDetails.user_State = bookingCnfInfo.user_State;

    return bookingDetails;
  };

  const [prepaidOptions, setPrepaidOptions] = useState<boolean>(false);
  const [payAtHotel, setPayAtHotel] = useState<boolean>(false);
  const [partialPayment, setPartialPayment] = useState<boolean>(false);

  const kotaMahindraPaymentHandler = async () => {
    let bookingInfo = await generateBookingDetails();
    const reqHandler = await makeCCAvenuePayment(
      router,
      bookingInfo,
      setErrorMessage,
      setErrorModel,
      setLoadingModel,
    );
  };

  const handlePartialAirpayPayment = async () => {
    dispatch(
      updateBookingIdInfo({
        booking_Id: generateUniqueId(),
        receipt_Id: shortid.generate(),
      }),
    );
    dispatch(
      updatePaymentMethodInfo({
        paying_Amount: Math.ceil(
          bookingCnfInfo.hotel_Partial_Payment_Percentage *
            0.01 *
            bookingCnfInfo.total_Price,
        ),
        payment_Type: "Partial payment",
        payment_Gateway: "airpay",
        booking_Created_From: "staybook.in",
      }),
    );
    router.push({
      pathname: `/payment/sendtoairpay`,
    });
  };

  const airpayPaymentHandler = async () => {
    dispatch(
      updateBookingIdInfo({
        booking_Id: generateUniqueId(),
        receipt_Id: shortid.generate(),
      }),
    );
    dispatch(
      updatePaymentMethodInfo({
        paying_Amount: Math.ceil(bookingCnfInfo.total_Price),
        payment_Type: "Prepaid payment",
        payment_Gateway: "airpay",
        booking_Created_From: "staybook.in",
      }),
    );
    router.push({
      pathname: `/payment/sendtoairpay`,
    });
  };

  const razorpayPaymentHandler = async () => {
    setLoadingModel(true);
    let bookingInfo = await generateBookingDetails();
    bookingInfo.hotel_Handling_Charges = 0;
    bookingInfo.payment_Type = "Prepaid payment";
    bookingInfo.paying_Amount = Math.ceil(bookingCnfInfo.total_Price);

    const response: any = await makeRazorpayPayment(
      router,
      bookingInfo,
      setErrorMessage,
      setErrorModel,
      setLoadingModel,
    );
    setLoadingModel(false);
  };

  async function check() {
    const bookingInfo = await generateBookingDetails();
  }
  check();

  const payAtHotelPaymentHandler = async () => {
    setLoadingModel(true);
    let bookingInfo = await generateBookingDetails();
    bookingInfo.payment_Type = "Pay at hotel";
    bookingInfo.paying_Amount =
      Math.ceil(bookingCnfInfo.total_Price) +
      Math.max(50, Math.ceil(0.03 * Number(bookingCnfInfo.total_Price)));
    bookingInfo.hotel_Handling_Charges = Math.max(
      50,
      Math.ceil(0.03 * Number(bookingCnfInfo.total_Price)),
    );
    try {
      const data = await payAtHotelApiBookingHandler(bookingInfo);
      if (data.booking_Id === "") {
        setErrorMessage("Booking Failed! Please try again.");
        setLoadingModel(false);
        setErrorModel(true);
      } else {
        bookingConfirmationRedirector(
          router,
          data.booking_Id,
          data.receipt_Id,
          bookingInfo,
        );
      }
    } catch (error) {
      console.error("Error handling pay at hotel payment:", error);
      setErrorMessage("Booking Failed! Please try again.");
      setLoadingModel(false);
      setErrorModel(true);
    }
  };

  const handlePartialRazorPayPayment = async () => {
    let bookingInfo = await generateBookingDetails();
    bookingInfo.hotel_Handling_Charges = 0;
    bookingInfo.payment_Type = "Partail payment";
    bookingInfo.paying_Amount = Math.ceil(
      bookingCnfInfo.hotel_Partial_Payment_Percentage *
        0.01 *
        bookingCnfInfo.total_Price,
    );

    const response: any = makeRazorpayPayment(
      router,
      bookingInfo,
      setErrorMessage,
      setErrorModel,
      setLoadingModel,
    );
    setLoadingModel(false);
  };

  const [loading, setLoading] = useState<boolean>(false);
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <CustomHead
        metaShowTitle={`Payment-${bookingCnfInfo.hotel_Name}`}
        metaDescription={`Payment details of the booking at ${bookingCnfInfo.hotel_Name}, ${bookingCnfInfo.hotel_Address}`}
        metaImageUrl={bookingCnfInfo.hotel_Image_Url}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />
      <LoadingModel isLoading={loadingModel} setIsLoading={setLoadingModel} />

      {/* loading if the local storage data is missing or the booking price is missing */}
      {loading && (
        <LoadingModel isLoading={loading} setIsLoading={setLoading} />
      )}

      <section className="h-auto min-h-screen w-full bg-secondary/75">
        <div className="container mx-auto h-full py-10">
          <div className="flex w-full flex-col items-center justify-between p-4 lg:flex-row">
            <h1 className="mb-2 text-center text-4xl font-bold text-white">
              Pay{" "}
              {payAtHotel ? (
                <span className="text-primary">
                  {`₹${
                    Math.ceil(bookingCnfInfo.total_Price) +
                    Math.max(
                      50,
                      Math.ceil(0.03 * Number(bookingCnfInfo.total_Price)),
                    )
                  }`}{" "}
                </span>
              ) : (
                <span className="text-primary">
                  {`₹${Math.ceil(bookingCnfInfo.total_Price)}`}{" "}
                </span>
              )}
              to confirm booking
            </h1>
            {/* <CountdownTimer
              iat={bookingCnfInfo.iat}
              exp={bookingCnfInfo.exp}
            /> */}
          </div>
          <div className="flex h-full w-full justify-between">
            <div className="h-full w-full p-4 lg:w-2/3">
              {/* hotel Info */}
              <div className="hidden rounded-lg bg-white p-4 lg:block">
                <div className="flex items-center justify-between">
                  <h2 className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                    {bookingCnfInfo.hotel_Name}
                  </h2>
                  <button
                    onClick={handleHotel}
                    className="flex items-center justify-between gap-x-4 rounded-full border-2 p-2 pl-4 outline-none"
                  >
                    <p>Details</p>
                    <ChevronDownIcon
                      className={`${
                        !hotelInfo ? "rotate-180" : ""
                      } h-7 w-7 rounded-full bg-primary p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    hotelInfo ? "hidden" : "block"
                  } flex items-center gap-x-4 border-b px-4 py-4 text-sm font-medium`}
                >
                  <p>{`${
                    checkInDate.toString().includes("GMT+")
                      ? format(checkInDate, "MMM dd, yyyy")
                      : formatDateToCustomString(checkInDate.toISOString())
                  }`}</p>
                  <p>-</p>
                  <p>
                    {checkOutDate.toString().includes("GMT+")
                      ? format(checkOutDate, "MMM dd, yyyy")
                      : formatDateToCustomString(checkOutDate.toISOString())}
                  </p>
                </div>
                <div
                  className={`${
                    hotelInfo ? "hidden" : "block"
                  } flex items-center gap-x-4 border-b px-4 py-4 text-sm font-medium`}
                >
                  <p>
                    {bookingCnfInfo.user_First_Name}{" "}
                    {bookingCnfInfo.user_Last_Name}
                  </p>
                  <p>
                    {bookingCnfInfo.user_Email_Id}, +
                    {bookingCnfInfo.user_Phone_Number}
                  </p>
                </div>
                {bookingCnfInfo.user_Instructions !== "" && (
                  <div
                    className={`${
                      hotelInfo ? "hidden" : "block"
                    } flex items-center gap-x-4 border-b px-4 py-4 text-sm font-medium`}
                  >
                    <p>
                      User Instructions -{" "}
                      <span className="font-medium">
                        {bookingCnfInfo.user_Instructions}
                      </span>
                    </p>
                  </div>
                )}

                {bookingCnfInfo.user_Address !== "" &&
                bookingCnfInfo.user_Pincode !== "" &&
                bookingCnfInfo.user_State !== "" ? (
                  <div
                    className={`${
                      hotelInfo ? "hidden" : "block"
                    } flex items-center gap-x-4 px-4 py-4 text-sm font-medium`}
                  >
                    <p>{bookingCnfInfo.user_Address} </p>
                    <p>
                      {bookingCnfInfo.user_Pincode}, {bookingCnfInfo.user_State}
                    </p>
                  </div>
                ) : null}
                {hotelInfo && (
                  <>
                    <div className="flex items-center gap-x-5 border-b p-4 font-medium">
                      <div className="w-1/2">
                        <p>{`${
                          checkInDate.toString().includes("GMT+")
                            ? format(checkInDate, "MMM dd, yyyy")
                            : formatDateToCustomString(checkInDate.toISOString())
                        }`}</p>
                        <p className="text-sm text-gray-500">Check-in</p>
                      </div>
                      <div className="w-1/2">
                        <p>
                          {checkOutDate.toString().includes("GMT+")
                            ? format(checkOutDate, "MMM dd, yyyy")
                            : formatDateToCustomString(checkOutDate.toISOString())}
                        </p>
                        <p className="text-sm text-gray-500">Check-out</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-5 border-b p-4 font-medium">
                      <div className="w-1/2">
                        <p>Booking Details will be sent to:</p>
                      </div>
                      <div className="w-1/2">
                        <p>
                          {bookingCnfInfo.user_First_Name}{" "}
                          {bookingCnfInfo.user_Last_Name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {bookingCnfInfo.user_Email_Id}, +
                          {bookingCnfInfo.user_Phone_Number}
                        </p>
                      </div>
                    </div>
                    {bookingCnfInfo.user_Address !== "" &&
                    bookingCnfInfo.user_Pincode !== "" &&
                    bookingCnfInfo.user_State !== "" ? (
                      <div className="flex items-center gap-x-5 p-4 font-medium">
                        <div className="w-1/2">
                          <p>Address Details</p>
                        </div>
                        <div className="w-1/2">
                          <p>{bookingCnfInfo.user_Address} </p>
                          <p className="text-sm text-gray-500">
                            {bookingCnfInfo.user_Pincode},{" "}
                            {bookingCnfInfo.user_State}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {bookingCnfInfo.user_Instructions !== "" && (
                      <div className="flex items-center gap-x-5 border-b p-4 font-medium">
                        <div className="w-1/2">
                          <p>User Instructions :</p>
                        </div>
                        <div className="w-1/2">
                          <p>
                            <span className="font-medium">
                              {bookingCnfInfo.user_Instructions}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* small screen hotel info */}
              <div className="rounded-lg bg-white p-4 lg:hidden">
                <div className="flex items-center justify-between">
                  <p className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                    {bookingCnfInfo.hotel_Name}
                  </p>
                  <button
                    onClick={handleHotel}
                    className="rounded-full border-0 outline-none"
                  >
                    <ChevronDownIcon
                      className={`${
                        hotelInfo ? "rotate-180" : ""
                      } h-7 w-7 rounded-full bg-primary p-1.5 transition-all duration-200`}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    hotelInfo ? "" : "block"
                  } flex items-center gap-x-4 py-3 text-sm font-medium`}
                >
                  <p>{`${format(
                    new Date(bookingCnfInfo.checkin_Time),
                    "MMM dd, yyyy",
                  )}`}</p>
                  <p>-</p>
                  <p>{`${format(
                    new Date(bookingCnfInfo.checkout_Time),
                    "MMM dd, yyyy",
                  )}`}</p>
                </div>
                {hotelInfo && (
                  <>
                    <div className="rounded-lg bg-primary px-4 py-2.5">
                      <div className="mb-1 font-medium">
                        <p className="uppercase">
                          {bookingCnfInfo.user_First_Name}{" "}
                          {bookingCnfInfo.user_Last_Name}
                        </p>
                        <a
                          href={`tel:+${bookingCnfInfo.user_Phone_Number}`}
                          className="block"
                        >
                          {bookingCnfInfo.user_Phone_Number}
                        </a>
                        <a
                          href={`mailto:${bookingCnfInfo.user_Email_Id}`}
                          className="block"
                        >
                          {bookingCnfInfo.user_Email_Id}
                        </a>
                      </div>

                      {/* guest details */}
                      <div className="mb-1">
                        <p>
                          Total Adults :{" "}
                          <strong className="ml-2">
                            {bookingCnfInfo.total_Guests_Count}
                          </strong>
                        </p>
                        <p>
                          Total Childrens :{" "}
                          <strong className="ml-2">
                            {bookingCnfInfo.total_Children_Count}
                          </strong>
                        </p>
                      </div>

                      {/* user address deatils if user has filled it */}
                      {bookingCnfInfo.user_Address !== "" &&
                      bookingCnfInfo.user_Pincode !== "" &&
                      bookingCnfInfo.user_State !== "" ? (
                        <div className="mb-1">
                          <p>
                            Address :{" "}
                            <strong>{bookingCnfInfo.user_Address}</strong>
                          </p>
                          <p>
                            State & Pincode :{" "}
                            <strong>
                              {bookingCnfInfo.user_State},{" "}
                              {bookingCnfInfo.user_Pincode}
                            </strong>
                          </p>
                        </div>
                      ) : null}

                      <div>
                        {bookingCnfInfo.user_Instructions !== "" && (
                          <p>
                            User Instructions :{" "}
                            <strong>{bookingCnfInfo.user_Instructions}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                    {/* price info */}
                    <div className="mt-4 rounded-lg bg-white">
                      <div className="flex items-center justify-between border-b pb-3 font-medium">
                        <p>Grand Total</p>
                        {payAtHotel ? (
                          <p>{`₹${
                            Math.ceil(bookingCnfInfo.total_Price) +
                            Math.max(
                              50,
                              Math.ceil(
                                0.03 * Number(bookingCnfInfo.total_Price),
                              ),
                            )
                          }`}</p>
                        ) : (
                          <p>{`₹${Math.ceil(bookingCnfInfo.total_Price)}`}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <p>Base Price</p>
                        <p>{`₹${Math.ceil(bookingCnfInfo.total_Room_Cost)}`}</p>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <p>Taxes & fees</p>
                        {payAtHotel ? (
                          <p>{`₹${
                            Math.ceil(bookingCnfInfo.total_Tax) +
                            Math.max(
                              50,
                              Math.ceil(
                                0.03 * Number(bookingCnfInfo.total_Price),
                              ),
                            )
                          }`}</p>
                        ) : (
                          <p>{`₹${Math.ceil(bookingCnfInfo.total_Tax)}`}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* payment Options */}
              {!prepaidOptions && !payAtHotel && !partialPayment && (
                <div className="mt-4 rounded-lg bg-white p-4">
                  <div className="flex items-center justify-between pb-4">
                    <span className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                      SELECT PAYMENT METHOD
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row sm:p-4">
                    {/* pay online */}
                    {bookingCnfInfo.hotel_Payment_Option.prepaid_Payment && (
                      <label className="w-full cursor-pointer sm:w-1/2">
                        <input
                          onClick={() => {
                            setPrepaidOptions(true);
                            setPayAtHotel(false);
                            setPartialPayment(false);
                          }}
                          type="radio"
                          className="peer sr-only"
                          value="Pay Now"
                        />
                        <div className="rounded-lg border-2 p-4 tracking-wide peer-hover:border-secondary">
                          <span className="mb-2 text-lg font-bold text-secondary">
                            Full Payment
                          </span>
                          <div className="flex items-center justify-between">
                            <p>Room Cost:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Room_Cost)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>Taxes & fees:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Tax)}</p>
                          </div>
                          <div className="flex items-center justify-between border-b-2 border-inherit pb-4 peer-checked:border-secondary">
                            <p>Final Price:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Price)}</p>
                          </div>
                          <div className="custom-shadow mt-4 flex h-12 items-center justify-between rounded bg-[#005250] p-4 font-medium text-white">
                            <p>Pay Now</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Price)}</p>
                          </div>
                        </div>
                      </label>
                    )}

                    {/* Partial Payment */}
                    {bookingCnfInfo.hotel_Payment_Option.partial_Payment && (
                      <label className="w-full cursor-pointer sm:w-1/2">
                        <input
                          onClick={() => {
                            setPrepaidOptions(false);
                            setPayAtHotel(false);
                            setPartialPayment(true);
                          }}
                          type="radio"
                          className="peer sr-only"
                          value="Partial Payment"
                        />
                        <div className="rounded-lg border-2 p-4 tracking-wide peer-hover:border-secondary">
                          <span className="mb-2 text-lg font-bold text-secondary">
                            Partial Payment
                          </span>
                          <div className="flex items-center justify-between">
                            <p>Room Cost:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Room_Cost)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>Taxes & fees:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Tax)}</p>
                          </div>
                          <div className="flex items-center justify-between border-b-2 border-inherit pb-4 peer-checked:border-secondary">
                            <p>Final Price:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Price)}</p>
                          </div>
                          <div className="custom-shadow mt-4 flex h-12 items-center justify-between rounded bg-secondary p-4 py-2.5 font-medium text-white">
                            <p>
                              Pay{" "}
                              {bookingCnfInfo.hotel_Partial_Payment_Percentage}%
                              now
                            </p>
                            <p>
                              ₹
                              {Math.ceil(
                                bookingCnfInfo.hotel_Partial_Payment_Percentage *
                                  0.01 *
                                  bookingCnfInfo.total_Price,
                              )}
                            </p>
                          </div>
                        </div>
                      </label>
                    )}

                    {/* pay at hotel */}
                    {bookingCnfInfo.hotel_Payment_Option.postpaid_Payment && (
                      <label className="w-full cursor-pointer sm:w-1/2">
                        <input
                          onClick={() => {
                            setPrepaidOptions(false);
                            setPayAtHotel(true);
                            setPartialPayment(false);
                          }}
                          type="radio"
                          className="peer sr-only"
                          value="Pay at Hotel"
                        />
                        <div className="rounded-lg border-2 p-4 tracking-wide peer-hover:border-secondary">
                          <span className="mb-2 text-lg font-bold text-secondary">
                            Pay At Hotel
                          </span>
                          <div className="flex items-center justify-between">
                            <p>Room Cost:</p>
                            <p>₹{Math.ceil(bookingCnfInfo.total_Room_Cost)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>Taxes & Fees:</p>
                            <p>
                              ₹
                              {Math.ceil(bookingCnfInfo.total_Tax) +
                                Math.max(
                                  50,
                                  Math.ceil(
                                    0.03 * Number(bookingCnfInfo.total_Price),
                                  ),
                                )}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-b-2 border-inherit pb-4 peer-checked:border-secondary">
                            <p>Final Price:</p>
                            <p>
                              ₹
                              {Math.ceil(bookingCnfInfo.total_Price) +
                                Math.max(
                                  50,
                                  Math.ceil(
                                    0.03 * Number(bookingCnfInfo.total_Price),
                                  ),
                                )}
                            </p>
                          </div>
                          <div className="custom-shadow mt-4  flex h-12 items-center justify-between rounded bg-[#005250] p-4 font-medium text-white">
                            <p>Pay at Hotel</p>
                            <p>
                              ₹
                              {Math.ceil(bookingCnfInfo.total_Price) +
                                Math.max(
                                  50,
                                  Math.ceil(
                                    0.03 * Number(bookingCnfInfo.total_Price),
                                  ),
                                )}
                            </p>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {prepaidOptions && (
                <>
                  <div className="mt-4 rounded-lg border-[1px] border-gray-200 bg-white p-4">
                    <div
                      onClick={() => {
                        setPrepaidOptions(false);
                        setPayAtHotel(false);
                        setPartialPayment(false);
                      }}
                      className="flex cursor-pointer items-center gap-x-4 border-b-[1px] border-gray-300 pb-4"
                    >
                      <ChevronLeftIcon className="h-7 w-7 cursor-pointer rounded-full hover:bg-primary" />
                      <p className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                        All Payment Methods
                      </p>
                    </div>
                    <div
                      onClick={razorpayPaymentHandler}
                      className="flex cursor-pointer items-center justify-between border-b-[1px] border-gray-300 py-4 hover:bg-gray-100 sm:px-4"
                    >
                      <Image
                        src={"/razorpay.png"}
                        alt="razorpay_icon"
                        width={160}
                        height={90}
                        priority
                      />
                      <ChevronRightIcon className="h-7 w-7 rounded-full hover:bg-primary" />
                    </div>
                    <div
                      onClick={airpayPaymentHandler}
                      className="flex cursor-pointer items-center justify-between border-b-[1px] border-gray-300 py-4 hover:bg-gray-100 sm:px-4"
                    >
                      <Image
                        src={"/icons/airpay_icon.svg"}
                        alt=""
                        width={60}
                        height={100}
                        className="mix-blend-multiply"
                      />
                      <ChevronRightIcon className="h-7 w-7 rounded-full hover:bg-primary" />
                    </div>
                  </div>
                </>
              )}
              {payAtHotel && (
                <>
                  <div className="mt-4 rounded-lg border-[1px] border-gray-200 bg-white p-4">
                    <div
                      onClick={() => {
                        setPrepaidOptions(false);
                        setPayAtHotel(false);
                        setPartialPayment(false);
                      }}
                      className="flex cursor-pointer items-center gap-x-4 border-b-[1px] border-gray-300 pb-4"
                    >
                      <ChevronLeftIcon className="h-7 w-7 cursor-pointer rounded-full hover:bg-primary" />
                      <p className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                        All Payment Methods
                      </p>
                    </div>
                    <button
                      onClick={payAtHotelPaymentHandler}
                      className="mt-4 w-full rounded-lg border-0 bg-primary p-4 py-6 text-center font-semibold tracking-wide text-white outline-none sm:text-xl"
                    >
                      Proceed to pay at Hotel
                    </button>
                  </div>
                </>
              )}
              {partialPayment && (
                <>
                  <div className="mt-4 rounded-lg border-[1px] border-gray-200 bg-white p-4">
                    <div
                      onClick={() => {
                        setPrepaidOptions(false);
                        setPayAtHotel(false);
                        setPartialPayment(false);
                      }}
                      className="flex cursor-pointer items-center gap-x-4 border-b-[1px] border-gray-300 pb-4"
                    >
                      <ChevronLeftIcon className="h-7 w-7 cursor-pointer rounded-full hover:bg-primary" />
                      <p className="font-dream text-2xl font-semibold tracking-wide text-secondary">
                        All Payment Methods
                      </p>
                    </div>
                    <div
                      onClick={handlePartialRazorPayPayment}
                      className="flex cursor-pointer items-center justify-between border-b-[1px] border-gray-300 py-4 sm:px-4"
                    >
                      <Image
                        src={"/razorpay.png"}
                        alt="razorpay_icon"
                        width={160}
                        height={90}
                        priority
                      />
                      <ChevronRightIcon className="h-7 w-7 rounded-full hover:bg-primary" />
                    </div>

                    <div
                      onClick={handlePartialAirpayPayment}
                      className="flex cursor-pointer items-center justify-between border-b-[1px] border-gray-300 py-4 hover:bg-gray-100 sm:px-4"
                    >
                      <Image
                        src={"/icons/airpay_icon.svg"}
                        alt=""
                        width={60}
                        height={100}
                        className="mix-blend-multiply"
                      />
                      <ChevronRightIcon className="h-7 w-7 rounded-full hover:bg-primary" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="hidden h-full w-full p-4 lg:block lg:w-1/3">
              {/* price info */}
              <div className="rounded-lg bg-white p-4 ">
                <div className="flex items-center justify-between border-b pb-3">
                  <p>Grand Total</p>
                  {payAtHotel ? (
                    <p>{`₹${
                      Math.ceil(bookingCnfInfo.total_Price) +
                      Math.max(
                        50,
                        Math.ceil(0.03 * Number(bookingCnfInfo.total_Price)),
                      )
                    }`}</p>
                  ) : (
                    <p>{`₹${Math.ceil(bookingCnfInfo.total_Price)}`}</p>
                  )}
                </div>
                <div className="flex items-center justify-between py-1">
                  <p>Base Price</p>
                  <p>{`₹${Math.ceil(bookingCnfInfo.total_Room_Cost)}`}</p>
                </div>
                <div className="flex items-center justify-between py-1">
                  <p>Taxes & fees</p>
                  {payAtHotel ? (
                    <p>{`₹${
                      Math.ceil(bookingCnfInfo.total_Tax) +
                      Math.max(
                        50,
                        Math.ceil(0.03 * Number(bookingCnfInfo.total_Price)),
                      )
                    }`}</p>
                  ) : (
                    <p>{`₹${Math.ceil(bookingCnfInfo.total_Tax)}`}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
