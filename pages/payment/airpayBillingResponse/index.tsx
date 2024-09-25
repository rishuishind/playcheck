import { parse } from "cookie";
import CustomHead from "@/components/header/CustomHead";
import LoadingModel from "@/components/models/LoadingModel";
import {
  CACHED_BOOKING_TOKEN,
  LOGO_IMAGE_URL1,
  STAYBOOK_PAYMENT_STATUS,
  TAB_IMAGE_URL,
  extractJWTValues,
} from "@/lib/helper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSessionStorageWithExpiry } from "@/lib/handlers/sessionHandler";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToPaymentPage } from "@/lib/handlers/pageHandler";
import {
  airpayHotelApiBookingHandler,
  payAtHotelApiBookingHandler,
} from "@/lib/handlers/hotelBookingApiHandler";
import {
  bookingConfirmationRedirector,
} from "@/lib/firebase/bookingHandler";
import { useSelector } from "react-redux";
import { selectBookingDetailsInfo } from "@/lib/redux/bookingConfirmationSlice";

type Props = {};

export default function ResponsefromAirpay(props: Props) {
  const bookingCnfInfo = useSelector(selectBookingDetailsInfo);
  const router = useRouter();
  const canonical = router.asPath.split("?");

  const [loadingModel, setLoadingModel] = useState<boolean>(true);
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorModel, setErrorModel] = useState<boolean>(false);

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
    bookingDetails.hotel_Cancellation_Policy = bookingCnfInfo.hotel_Cancellation_Policy;
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
    bookingDetails.checkin_Time = new Date(bookingCnfInfo.checkin_Time);
    bookingDetails.checkout_Time = new Date(bookingCnfInfo.checkout_Time);
    bookingDetails.num_nights = bookingCnfInfo.num_nights;
    bookingDetails.total_Room_Cost = bookingCnfInfo.total_Room_Cost;
    bookingDetails.total_Tax = bookingCnfInfo.total_Tax;
    bookingDetails.total_Price = bookingCnfInfo.total_Price;
    bookingDetails.paying_Amount = bookingCnfInfo.paying_Amount;
    bookingDetails.amount_Paid = bookingCnfInfo.paying_Amount;

    bookingDetails.user_Address = bookingCnfInfo.user_Address;
    bookingDetails.user_Pincode = bookingCnfInfo.user_Pincode;
    bookingDetails.user_State = bookingCnfInfo.user_State;

    return bookingDetails;
  };

  useEffect(() => {
    async function makeAirpayBooking() {
      let userBooking = await generateBookingDetails();
      userBooking.hotel_Handling_Charges = 0;
      userBooking.booking_Created_From = bookingCnfInfo.booking_Created_From;
      userBooking.payment_Gateway = bookingCnfInfo.payment_Gateway;
      userBooking.payment_Type = bookingCnfInfo.payment_Type;
      const bookingConfirmation = await airpayHotelApiBookingHandler(userBooking);

      if (bookingConfirmation.status) {
        if (bookingConfirmation.booking_Id === "") {
          setErrorMessage("Booking Failed! Please try again.");
          setLoadingModel(false);
          setErrorModel(true);
        } else {
          // call aisency function to send the user a whats app message
          bookingConfirmationRedirector(
            router,
            bookingConfirmation.booking_Id,
            bookingConfirmation.receipt_Id,
            userBooking,
          );
        }
      } else {
        setErrorMessage("Booking Failed! Please try again.");
        setLoadingModel(false);
        setErrorModel(true);
      }
    }
    makeAirpayBooking();
  }, []);

  return (
    <>
      <CustomHead
        metaShowTitle={`Airpay Billing Response`}
        metaDescription={`Payment details from airpay`}
        // tabImageUrl={TAB_IMAGE_URL}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />
      <LoadingModel isLoading={loadingModel} setIsLoading={setLoadingModel} />
      <section className="h-auto min-h-screen w-full bg-secondary/75">
        Airpay Transactions
      </section>
    </>
  );
}
