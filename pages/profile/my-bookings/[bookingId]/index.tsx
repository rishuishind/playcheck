import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { parse } from "cookie";
import {
  LOGO_IMAGE_URL1,
  USER_ACCESS_TOKEN,
  extractJWTValues,
  formatTimestampToDate,
} from "@/lib/helper";
import { getUserBookingInfoNew } from "@/lib/firebase/userHandler";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { pdfHtmlContent } from "@/templates/bookingHtmlToPdf";
import CustomHead from "@/components/header/CustomHead";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import Link from "next/link";
import dynamic from 'next/dynamic';

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
  { ssr: false },
);
const DownloadIcon = dynamic(
  () => import("@heroicons/react/solid/DownloadIcon"),
  { ssr: false },
);
const MailIcon = dynamic(
  () => import("@heroicons/react/solid/MailIcon"),
  { ssr: false },
);
const PhoneIcon = dynamic(
  () => import("@heroicons/react/solid/PhoneIcon"),
  { ssr: false },
);

type Prop = {
  bookingInfo: BookingDetails;
};

export default function Index(props: Prop) {
  const router = useRouter();
  const canonical = router.asPath.split("?");

  const [pdfLoader, setPdfLoader] = useState<boolean>(false);

  async function generatePDF() {
    let htmlContent = pdfHtmlContent(props.bookingInfo);

    if (htmlContent) {
      const printWindow: any = window.open("", "", "width=1000,height=1000");
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  }

  function getNumberOfNights() {
    let checkIn = getDateObj(props.bookingInfo.checkin_Time);
    let checkOut = getDateObj(props.bookingInfo.checkout_Time);
    let differenceInMilliseconds = checkOut.getTime() - checkIn.getTime();
    let differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays;
  }
  function getDateObj(input: any) {
    let date = new Date();
    if (typeof input === "string") {
      date = new Date(input);
      date.setUTCHours(date.getUTCHours() + 5);
      date.setUTCMinutes(date.getUTCMinutes() + 30);
    } else {
      const milliseconds = input.seconds * 1000 + input.nanoseconds / 1e6;
      date = new Date(milliseconds);
      date.setUTCHours(date.getUTCHours() + 5);
      date.setUTCMinutes(date.getUTCMinutes() + 30);
    }

    return date;
  }

  // function to get the payment mode name
  const getPaymentMode = (totalPrice: number, amountPaid: number) => {
    if (amountPaid === totalPrice) {
      return `Prepaid Booking`;
    } else if (amountPaid > 0) {
      return `Partial Payment`;
    } else {
      return `Pay@Hotel`;
    }
  };
  const paymentMode = getPaymentMode(
    props.bookingInfo.total_Price,
    props.bookingInfo.amount_Paid,
  );

  return (
    <>
      <CustomHead
        metaShowTitle={`Booking Details | ${props.bookingInfo.hotel_Name}`}
        metaDescription={`List of all bookings of the user`}
        // tabImageUrl={TAB_IMAGE_URL}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />

      <section className="h-auto min-h-screen w-full">
        <div className="wrapper h-full py-5">
          <div className="flex w-full justify-between py-4">
            <div
              onClick={() => router.back()}
              className="flex items-center gap-2.5"
            >
              <button>
                <span className="sr-only">Go Back</span>
                <ChevronLeftIcon className="h-8 w-8 rounded-full bg-primary p-1 text-white md:h-10 md:w-10" />
              </button>
              <h1 className="text-2xl font-bold text-secondary md:text-4xl">
                Room Info
              </h1>
            </div>

            <button
              className="flex h-12 w-44 items-center justify-center gap-1 rounded-full bg-primary font-bold text-white"
              onClick={generatePDF}
            >
              {pdfLoader ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <>
                  <DownloadIcon className="h-6 w-6" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>

          <div id="contentToPrint">
            <div className="mt-4 flex flex-col items-center gap-4 rounded-lg border-2 p-4 md:mt-7 md:p-7 lg:flex-row lg:items-start">
              <div className="overflow-hideen relative aspect-video w-full max-w-lg">
                <Image
                  id="hotelImage"
                  alt={`hotel-img`}
                  src={
                    props.bookingInfo.hotel_Image_Url
                      ? props.bookingInfo.hotel_Image_Url
                      : "/fallback_image.jpg"
                  }
                  className={`h-full w-full rounded-md object-cover`}
                  width={800}
                  height={600}
                  priority
                />
              </div>
              <div className="max-w-lg text-center lg:text-left">
                <h2 className="py-1 font-serif text-2xl font-bold text-secondary">
                  {props.bookingInfo.hotel_Name}
                </h2>
                <p className="py-1 font-medium tracking-wide">
                  {props.bookingInfo.hotel_Landmark}
                </p>
                <Link
                  href="tel:+918373929299"
                  className="flex items-center justify-center gap-x-2 py-1 font-medium tracking-wide lg:justify-start"
                >
                  <PhoneIcon className="h-6 w-6 rounded-full p-1" />
                  <p>+91 8373929299</p>
                </Link>
                <Link
                  href="mailto:staybookbooking@gmail.com"
                  className="flex items-center justify-center gap-x-2 py-1 font-medium tracking-wide lg:justify-start"
                >
                  <MailIcon className="h-6 w-6 rounded-full p-0.5" />
                  <p>staybookbooking@gmail.com</p>
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-lg border-2 md:mt-7">
              <h3 className="w-full border-b-2 p-4 text-2xl font-bold text-secondary md:px-7">
                Booking Details
              </h3>
              <div className="flex w-full flex-col p-4 md:px-7 lg:flex-row lg:gap-4">
                {/* left side */}
                <div className="w-full lg:w-1/2">
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Guest Name
                    </p>
                    <p className="w-full py-1 font-medium uppercase tracking-wide lg:w-1/2">
                      {props.bookingInfo.user_Name}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary md:hidden lg:w-1/2">
                      Guest Phone
                    </p>
                    <p className="hidden w-full py-1 font-bold tracking-wide text-secondary md:block lg:w-1/2">
                      Guest Email
                    </p>
                    <p className="w-full py-1 font-medium uppercase tracking-wide md:hidden lg:w-1/2">
                      {props.bookingInfo.user_Phone_Number}
                    </p>
                    <p className="hidden w-full py-1 font-medium uppercase tracking-wide md:block lg:w-1/2">
                      {props.bookingInfo.user_Email_Id}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Total Guests
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {props.bookingInfo.total_Guests_Count}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Total Childrens
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {props.bookingInfo.total_Children_Count}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Total Rooms
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {props.bookingInfo.total_Rooms_Count}
                    </p>
                  </div>
                </div>
                {/* right side */}
                <div className="w-full lg:w-1/2">
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Payment Mode
                    </p>
                    <p className="w-full py-1 font-medium uppercase tracking-wide lg:w-1/2">
                      {paymentMode}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      No of Nights
                    </p>
                    <p className="w-full py-1 font-medium uppercase tracking-wide lg:w-1/2">
                      {getNumberOfNights()}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Booking Time
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {formatTimestampToDate(props.bookingInfo.booking_Time)}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Checkin Time
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {formatTimestampToDate(props.bookingInfo.checkin_Time)}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                      Checkout Time
                    </p>
                    <p className="w-full py-1 font-medium tracking-wide lg:w-1/2">
                      {formatTimestampToDate(props.bookingInfo.checkout_Time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between rounded-lg border-2 md:mt-7">
              <h3 className="w-full border-b-2 p-4 text-2xl font-bold text-secondary md:px-7">
                Room Details
              </h3>
              <div className="flex w-full flex-col gap-4 p-4 md:p-7">
                {props.bookingInfo.roomsList.map(
                  (roomInfo: RoomDetails, index: number) => {
                    const handlingCharges = Math.max(
                      50,
                      Math.ceil(0.03 * Number(roomInfo.total_Plan_Price)),
                    );
                    const showHandlingCharges =
                      props.bookingInfo.amount_Paid === 0;

                    return (
                      <div
                        key={index}
                        className="flex w-full flex-col items-center justify-between rounded-lg border-2"
                      >
                        <div className="w-full border-b-2 p-4 md:px-7">
                          <h3 className="text-lg font-bold text-secondary md:text-2xl">
                            {roomInfo.room_Count} x {roomInfo.room_Name}
                          </h3>
                        </div>
                        <div className="w-full p-4 md:px-7">
                          <div className="flex w-full items-center justify-between">
                            <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                              Room Info
                            </p>
                            <p className="w-full py-1 font-medium uppercase lg:w-1/2">
                              {roomInfo.room_Info}
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                              Room Plan Info
                            </p>
                            <p className="w-full py-1 font-medium lg:w-1/2">
                              {roomInfo.plan_Info} ({roomInfo.plan_Name})
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <p className="w-full py-1 font-bold tracking-wide text-secondary lg:w-1/2">
                              Room Guests Info
                            </p>
                            <p className="w-full py-1 font-medium lg:w-1/2">
                              {roomInfo.num_Guests}{" "}
                              {roomInfo.num_Guests > 1 ? "Adults" : "Adult"}
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

                        <h3 className="text-lg font-bold text-secondary underline underline-offset-4 md:text-2xl">
                          Room Price Breakup
                        </h3>
                        <div className="w-full p-4 md:px-7">
                          <div className="flex w-full items-center justify-between">
                            <p className="py-1 font-bold tracking-wide text-secondary">
                              Room Base Price :
                            </p>
                            <p className="py-1 font-bold tracking-wide">
                              ₹ {roomInfo.total_Room_Plan_Price}
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <p className="py-1 font-bold tracking-wide text-secondary">
                              Taxes & fees :
                            </p>
                            <p className="py-1 font-bold tracking-wide">
                              ₹ {roomInfo.total_Plan_Tax + (showHandlingCharges ? handlingCharges : 0)}
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-between pb-2">
                            <p className="py-1 font-bold tracking-wide text-secondary">
                              Room Total Price{" "}
                              <span className="hidden sm:inline-block">
                                (Including taxes)
                              </span>{" "}
                              :
                            </p>
                            <p className="py-1 font-bold tracking-wide">
                              ₹ {roomInfo.total_Plan_Price + (showHandlingCharges ? handlingCharges : 0)}
                            </p>
                          </div>
                          <div className="flex w-full items-center justify-between border-t-2 pt-2">
                            <p className="py-1 font-bold tracking-wide text-secondary">
                              Grand Room Total :
                            </p>
                            <p className="py-1 font-bold tracking-wide">
                              ₹ {roomInfo.total_Plan_Price + (showHandlingCharges ? handlingCharges : 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between rounded-lg border-2 md:mt-7">
              <h3 className="w-full border-b-2 p-4 text-2xl font-bold text-secondary md:px-7">
                Payment summary
              </h3>
              <div className="w-full p-4 md:px-7">
                <div className="flex w-full items-center justify-between">
                  <p className="py-1 font-bold tracking-wide text-secondary">
                    Total Room Price
                  </p>
                  <p className="py-1 font-bold tracking-wide">
                    ₹ {props.bookingInfo.total_Room_Cost}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="py-1 font-bold tracking-wide text-secondary">
                    taxes & fees
                  </p>
                  <p className="py-1 font-bold tracking-wide">
                    ₹{" "}
                    {props.bookingInfo.total_Tax +
                      props.bookingInfo.hotel_Handling_Charges}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between pb-2">
                  <p className="py-1 font-bold tracking-wide text-secondary">
                    Total Room Price{" "}
                    <span className="hidden sm:inline-block">
                      (Including taxes)
                    </span>
                  </p>
                  <p className="py-1 font-bold tracking-wide">
                    ₹{" "}
                    {props.bookingInfo.total_Price +
                      props.bookingInfo.hotel_Handling_Charges}
                  </p>
                </div>
                {paymentMode === "Prepaid Booking" ||
                  (paymentMode === "Partial Payment" && (
                    <div className="flex items-center justify-between pt-2">
                      <strong className="tracking-wide text-secondary">
                        Total Price Paid
                      </strong>
                      <strong>₹ {props.bookingInfo.amount_Paid}</strong>
                    </div>
                  ))}
                <div className="flex items-center justify-between border-t-2 pt-2 text-red-700">
                  <strong>Price Left to Pay</strong>
                  <strong>
                    ₹{" "}
                    {props.bookingInfo.total_Price +
                      props.bookingInfo.hotel_Handling_Charges -
                      props.bookingInfo.amount_Paid}
                  </strong>
                </div>
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
  const bookingId = params?.bookingId;
  const cookies = parse(req.headers.cookie || "");
  const userAccessToken = cookies[USER_ACCESS_TOKEN];
  const userAccessTokenObject: any = await extractJWTValues(userAccessToken);

  let bookingInfo = await getUserBookingInfoNew(
    userAccessTokenObject?.email,
    bookingId,
  );

  return {
    props: {
      bookingInfo: JSON.parse(JSON.stringify(bookingInfo)),
    },
  };
}