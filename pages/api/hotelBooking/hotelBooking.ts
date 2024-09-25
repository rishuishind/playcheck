import {
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  USER_BOOKINGS_COLLECTION_NAME,
  HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  BOOKED_ROOMS_COLLECTION_NAME,
  HOTEL_BOOKINGS_COLLECTION_NAME,
  HOTEL_CONTROL_CENTER_COLLECTION_NAME,
  STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
  STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
  STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
  STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
  STAYBOOK_HOTEL_DAILY_BOOKINGS_COLLECTION_NAME,
  STAYBOOK_HOTEL_BOOKINGS_COLLECTION_NAME,
  formatTimestampToDateType,
  CACHED_BOOKING_TOKEN,
  extractJWTValues,
  formatDateForBookingMail,
  generateStars,
  countRoomsAndPlans,
} from "@/lib/helper";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { format } from "date-fns";
import { mailTransporter, senderEmail } from "../utils/nodemailerService";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import {
  convertFromAnyTimeZoneToIST,
  convertToIST,
  formatDateStringToCustomString,
  formatDateToCustomString,
} from "@/lib/helper/timestampToDate";
const shortid = require("shortid");
const generateUniqueId = require("generate-unique-id");

// Booking will be stored for the user
const userHotelBookingCreation = async (
  userBooking: BookingDetails,
  bookingId: string,
  receiptId: string,
) => {
  try {
    // If the userbooking.checkin or checkout time has GMT+ in the string then add 8 hours 30 minutes to it
    if (userBooking.checkin_Time.includes("GMT+")) {
      const checkinDate = new Date(userBooking.checkin_Time);
      checkinDate.setHours(checkinDate.getHours() + 8);
      checkinDate.setMinutes(checkinDate.getMinutes() + 30);
      userBooking.checkin_Time = checkinDate.toISOString();
    }
    if (userBooking.checkout_Time.includes("GMT+")) {
      const checkoutDate = new Date(userBooking.checkout_Time);
      checkoutDate.setHours(checkoutDate.getHours() + 8);
      checkoutDate.setMinutes(checkoutDate.getMinutes() + 30);
      userBooking.checkout_Time = checkoutDate.toISOString();
    }
    const userDocRef = await setDoc(
      doc(
        db,
        USER_BOOKINGS_COLLECTION_NAME,
        userBooking.user_Email_Id,
        BOOKED_ROOMS_COLLECTION_NAME,
        bookingId,
      ),
      {
        booking_Time: new Date(),
        checkin_Time: new Date(userBooking.checkin_Time),
        checkout_Time: new Date(userBooking.checkout_Time),
        hotel_Image_Url: userBooking.hotel_Image_Url,
        hotel_Name: userBooking.hotel_Name,
        hotel_Slug_Name: userBooking.hotel_Slug_Name,
        hotel_Landmark: userBooking.hotel_Landmark,
        hotel_Arrival_Time: userBooking.hotel_Arrival_Time,
        hotel_Departure_Time: userBooking.hotel_Departure_Time,
        hotel_Map_Url: userBooking.hotel_Map_Url,
        hotel_General_Policy: userBooking.hotel_General_Policy,
        hotel_Cancellation_Policy: userBooking.hotel_Cancellation_Policy,
        hotel_Refund_Policy: userBooking.hotel_Refund_Policy,
        user_Instructions: userBooking.user_Instructions,
        payment_Gateway: userBooking.payment_Gateway,
        payment_Type: userBooking.payment_Type,
        booking_Created_From: userBooking.booking_Created_From,
        hotel_Owner_Id: userBooking.hotel_Owner_Id,
        hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
        total_Rooms_Count: userBooking.total_Rooms_Count,
        total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
        total_Tax: Math.ceil(userBooking.total_Tax),
        total_Price: Math.ceil(userBooking.total_Price),
        payment_Made: userBooking.payment_Made,
        amount_Paid: Math.ceil(userBooking.amount_Paid),
        paying_Amount: Math.ceil(userBooking.paying_Amount),
        hotel_Handling_Charges: userBooking.hotel_Handling_Charges,
        booking_Status: true,
        booking_Checkin_Status: false,
        booking_Noshow_Status: false,
        booking_Cancelled_Status: false,
        user_Unique_Id: userBooking.user_Unique_Id,
        user_Name: userBooking.user_Name,
        user_Address: userBooking.user_Address,
        user_Email_Id: userBooking.user_Email_Id,
        user_Phone_Number: userBooking.user_Phone_Number,
        booking_Coins: 0,
        total_Guests_Count: userBooking.total_Guests_Count,
        total_Children_Count: userBooking.total_Children_Count,
        booking_Confirmation_Url: `https://staybook.in/bookingInformation/${bookingId}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${receiptId}`,

        razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
        razorpay_Order_Id: userBooking.razorpay_Order_Id,
        razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
        receipt_Id: receiptId,
      },
    );

    for (let i = 0; i < userBooking.roomsList.length; i++) {
      const roomRef = await addDoc(
        collection(
          db,
          USER_BOOKINGS_COLLECTION_NAME,
          userBooking.user_Email_Id,
          BOOKED_ROOMS_COLLECTION_NAME,
          bookingId,
          HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
        ),
        {
          room_Id: userBooking.roomsList[i].room_Id,
          room_Name: userBooking.roomsList[i].room_Name,
          room_Info: userBooking.roomsList[i].room_Info,
          plan_Id: userBooking.roomsList[i].plan_Id,
          plan_Name: userBooking.roomsList[i].plan_Name,
          plan_Info: userBooking.roomsList[i].plan_Info,
          room_Guest_Occupancy: userBooking.roomsList[i].room_Guest_Occupancy,
          room_Children_Occupancy:
            userBooking.roomsList[i].room_Children_Occupancy,

          plan_End_Date: new Date(userBooking.roomsList[i].plan_End_Date),
          plan_Start_Date: new Date(userBooking.roomsList[i].plan_Start_Date),

          room_Count: userBooking.roomsList[i].room_Count,
          num_Guests: userBooking.roomsList[i].num_Guests,
          num_Children: userBooking.roomsList[i].num_Children,

          plan_Children_Price: userBooking.roomsList[i].plan_Child_Price,
          plan_Room_Price: userBooking.roomsList[i].plan_Room_Price,
          plan_Tax: userBooking.roomsList[i].plan_Tax,
          plan_Price: userBooking.roomsList[i].plan_Price,
          priceBreakUp: userBooking.roomsList[i].priceBreakUp,
          room_Children_Age_Price_Info:
            userBooking.roomsList[i].room_Children_Age_Price_Info,

          total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
          total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
          total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
        },
      );
    }

    return userDocRef;
  } catch (error) {
    console.log("userHotelBookingCreation", error);
    return {
      id: generateUniqueId(),
    };
  }
};

// Booking will be stored for the hotel
const hotelBookingCreation = async (
  userBooking: BookingDetails,
  userBookingId: any,
  receiptId: string,
) => {
  try {
    const docBookingRef = doc(
      db,
      HOTEL_CONTROL_CENTER_COLLECTION_NAME,
      userBooking.hotel_Slug_Name,
      HOTEL_BOOKINGS_COLLECTION_NAME,
      userBookingId,
    );

    const response = await setDoc(docBookingRef, {
      booking_Id: userBookingId,
      booking_Time: new Date(),
      checkin_Time: convertToIST(new Date(userBooking.checkin_Time)),
      checkout_Time: convertToIST(new Date(userBooking.checkout_Time)),
      hotel_Name: userBooking.hotel_Name,
      hotel_Slug_Name: userBooking.hotel_Slug_Name,
      hotel_Landmark: userBooking.hotel_Landmark,
      hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
      hotel_Arrival_Time: userBooking.hotel_Arrival_Time,
      hotel_Departure_Time: userBooking.hotel_Departure_Time,
      hotel_Map_Url: userBooking.hotel_Map_Url,
      hotel_General_Policy: userBooking.hotel_General_Policy,
      hotel_Cancellation_Policy: userBooking.hotel_Cancellation_Policy,
      hotel_Refund_Policy: userBooking.hotel_Refund_Policy,
      user_Instructions: userBooking.user_Instructions,
      payment_Gateway: userBooking.payment_Gateway,
      payment_Type: userBooking.payment_Type,
      booking_Created_From: userBooking.booking_Created_From,
      total_Rooms_Count: userBooking.total_Rooms_Count,
      total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
      total_Tax: Math.ceil(userBooking.total_Tax),
      total_Price: Math.ceil(userBooking.total_Price),
      paying_Amount: Math.ceil(userBooking.paying_Amount),
      handling_Charges: userBooking.hotel_Handling_Charges,
      payment_Made: userBooking.payment_Made,
      amount_Paid: Math.ceil(userBooking.amount_Paid),
      booking_Status: true,
      booking_Checkin_Status: false,
      booking_Noshow_Status: false,
      booking_Cancelled_Status: false,
      user_Unique_Id: userBooking.user_Unique_Id,
      user_Name: userBooking.user_Name,
      user_Address: userBooking.user_Address,
      user_Email_Id: userBooking.user_Email_Id,
      user_Phone_Number: userBooking.user_Phone_Number,
      total_Guests_Count: userBooking.total_Guests_Count,
      total_Children_Count: userBooking.total_Children_Count,
      booking_Confirmation_Url: `https://staybook.in/bookingInformation/${userBookingId}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${receiptId}`,

      razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
      razorpay_Order_Id: userBooking.razorpay_Order_Id,
      razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
      receipt_Id: receiptId,
    });

    for (let i = 0; i < userBooking.roomsList.length; i++) {
      const roomCollectionRef = collection(
        db,
        HOTEL_CONTROL_CENTER_COLLECTION_NAME,
        userBooking.hotel_Slug_Name,
        HOTEL_BOOKINGS_COLLECTION_NAME,
        userBookingId,
        HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
      );
      const roomRef = await addDoc(roomCollectionRef, {
        room_Id: userBooking.roomsList[i].room_Id,
        room_Name: userBooking.roomsList[i].room_Name,
        room_Info: userBooking.roomsList[i].room_Info,
        plan_Id: userBooking.roomsList[i].plan_Id,
        plan_Name: userBooking.roomsList[i].plan_Name,
        plan_Info: userBooking.roomsList[i].plan_Info,
        room_Guest_Occupancy: userBooking.roomsList[i].room_Guest_Occupancy,
        room_Children_Occupancy:
          userBooking.roomsList[i].room_Children_Occupancy,

        plan_End_Date: new Date(userBooking.roomsList[i].plan_End_Date),
        plan_Start_Date: new Date(userBooking.roomsList[i].plan_Start_Date),

        room_Count: userBooking.roomsList[i].room_Count,
        num_Guests: userBooking.roomsList[i].num_Guests,
        num_Children: userBooking.roomsList[i].num_Children,

        plan_Children_Price: userBooking.roomsList[i].plan_Child_Price,
        plan_Room_Price: userBooking.roomsList[i].plan_Room_Price,
        plan_Tax: userBooking.roomsList[i].plan_Tax,
        plan_Price: userBooking.roomsList[i].plan_Price,
        priceBreakUp: userBooking.roomsList[i].priceBreakUp,
        room_Children_Age_Price_Info:
          userBooking.roomsList[i].room_Children_Age_Price_Info,

        total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
        total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
        total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
      });
    }

    return response;
  } catch (error) {
    console.log("hotelBookingCreation: ", error);
    return {
      id: generateUniqueId(),
    };
  }
};

// Booking will be stored for the staybook website
const staybookHotelBookingCreation = async (
  userBooking: BookingDetails,
  userBookingId: any,
  receiptId: string,
) => {
  const bookingYear = formatTimestampToDateType(userBooking.booking_Time)
    .getFullYear()
    .toString();
  const bookingMonth = (
    formatTimestampToDateType(userBooking.booking_Time).getMonth() + 1
  ).toString();
  const bookingDate = formatTimestampToDateType(userBooking.booking_Time)
    .getDate()
    .toString();

  let response1;

  try {
    const staybookBookingRef = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_COLLECTION_NAME,
      userBookingId,
    );

    response1 = await setDoc(staybookBookingRef, {
      booking_Id: userBookingId,
      booking_Time: new Date(),
      checkin_Time: new Date(userBooking.checkin_Time),
      checkout_Time: new Date(userBooking.checkout_Time),
      hotel_Slug_Name: userBooking.hotel_Slug_Name,
      hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
    });
  } catch (error2) {
    console.log("staybookHotelBookingCreation: ", error2);
  }

  return response1;
};

const staybookHotelBookingStatistics = async (userBooking: BookingDetails) => {
  const bookingYear = formatTimestampToDateType(userBooking.booking_Time)
    .getFullYear()
    .toString();
  const bookingMonth = (
    formatTimestampToDateType(userBooking.booking_Time).getMonth() + 1
  ).toString();
  const bookingDate = formatTimestampToDateType(userBooking.booking_Time)
    .getDate()
    .toString();

  const checkinYear = formatTimestampToDateType(userBooking.checkin_Time)
    .getFullYear()
    .toString();
  const checkinMonth = (
    formatTimestampToDateType(userBooking.checkin_Time).getMonth() + 1
  ).toString();
  const checkinDate = formatTimestampToDateType(userBooking.checkin_Time)
    .getDate()
    .toString();

  // Booking Date Based Yearly Stats
  try {
    const bookingYearlyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      bookingYear,
    );
    const yearlyBookingInfo = await getDoc(bookingYearlyDoc);
    if (yearlyBookingInfo.exists()) {
      const total_Yearly_Bookings_Count =
        yearlyBookingInfo.data()?.total_Yearly_Bookings_Count + 1;
      const total_Yearly_Price =
        yearlyBookingInfo.data()?.total_Yearly_Price + userBooking.total_Price;
      const total_Yearly_Room_Cost =
        yearlyBookingInfo.data()?.total_Yearly_Room_Cost +
        userBooking.total_Room_Cost;
      const total_Yearly_Tax =
        yearlyBookingInfo.data()?.total_Yearly_Tax + userBooking.total_Tax;

      let total_Yearly_Paid_Bookings_Count = userBooking.payment_Made ? 1 : 0;
      let total_Yearly_Paid_Bookings_Amount = userBooking.payment_Made
        ? userBooking.amount_Paid
        : 0;
      let total_Yearly_Unpaid_Bookings_Count = userBooking.payment_Made ? 0 : 1;
      let total_Yearly_Unpaid_Bookings_Amount = userBooking.payment_Made
        ? 0
        : userBooking.total_Price;
      if (yearlyBookingInfo.data()?.total_Yearly_Paid_Bookings_Count) {
        total_Yearly_Paid_Bookings_Count +=
          yearlyBookingInfo.data()?.total_Yearly_Paid_Bookings_Count;
      }
      if (yearlyBookingInfo.data()?.total_Yearly_Paid_Bookings_Amount) {
        total_Yearly_Paid_Bookings_Amount +=
          yearlyBookingInfo.data()?.total_Yearly_Paid_Bookings_Amount;
      }
      if (yearlyBookingInfo.data()?.total_Yearly_Unpaid_Bookings_Count) {
        total_Yearly_Unpaid_Bookings_Count +=
          yearlyBookingInfo.data()?.total_Yearly_Unpaid_Bookings_Count;
      }
      if (yearlyBookingInfo.data()?.total_Yearly_Unpaid_Bookings_Amount) {
        total_Yearly_Unpaid_Bookings_Amount +=
          yearlyBookingInfo.data()?.total_Yearly_Unpaid_Bookings_Amount;
      }

      await updateDoc(bookingYearlyDoc, {
        total_Yearly_Bookings_Count: +total_Yearly_Bookings_Count,
        total_Yearly_Paid_Bookings_Count: +total_Yearly_Paid_Bookings_Count,
        total_Yearly_Unpaid_Bookings_Count: +total_Yearly_Unpaid_Bookings_Count,
        total_Yearly_Paid_Bookings_Amount: Math.ceil(
          +total_Yearly_Paid_Bookings_Amount,
        ),
        total_Yearly_Unpaid_Bookings_Amount: Math.ceil(
          +total_Yearly_Unpaid_Bookings_Amount,
        ),
        total_Yearly_Price: Math.ceil(+total_Yearly_Price),
        total_Yearly_Room_Cost: Math.ceil(+total_Yearly_Room_Cost),
        total_Yearly_Tax: Math.ceil(+total_Yearly_Tax),
      });
    } else {
      await setDoc(bookingYearlyDoc, {
        total_Yearly_Bookings_Count: 1,
        total_Yearly_Paid_Bookings_Count: userBooking.payment_Made ? 1 : 0,
        total_Yearly_Unpaid_Bookings_Count: userBooking.payment_Made ? 0 : 1,
        total_Yearly_Paid_Bookings_Amount: userBooking.payment_Made
          ? Math.ceil(+userBooking.total_Price)
          : 0,
        total_Yearly_Unpaid_Bookings_Amount: userBooking.payment_Made
          ? 0
          : Math.ceil(+userBooking.total_Price),
        total_Yearly_Price: Math.ceil(+userBooking.total_Price),
        total_Yearly_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Yearly_Tax: Math.ceil(+userBooking.total_Tax),
      });
    }
  } catch (err) {}

  // Booking Date Based Monthly Stats
  try {
    const bookingMonthlyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      bookingYear,
      STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
      `MONTH-${bookingMonth}`,
    );
    const monthlyBookingInfo = await getDoc(bookingMonthlyDoc);
    if (monthlyBookingInfo.exists()) {
      const total_Monthly_Bookings_Count =
        monthlyBookingInfo.data()?.total_Monthly_Bookings_Count + 1;
      const total_Monthly_Price =
        monthlyBookingInfo.data()?.total_Monthly_Price +
        userBooking.total_Price;
      const total_Monthly_Room_Cost =
        monthlyBookingInfo.data()?.total_Monthly_Room_Cost +
        userBooking.total_Room_Cost;
      const total_Monthly_Tax =
        monthlyBookingInfo.data()?.total_Monthly_Tax + userBooking.total_Tax;

      let total_Monthly_Paid_Bookings_Count = userBooking.payment_Made ? 1 : 0;
      let total_Monthly_Paid_Bookings_Amount = userBooking.payment_Made
        ? userBooking.amount_Paid
        : 0;
      let total_Monthly_Unpaid_Bookings_Count = userBooking.payment_Made
        ? 0
        : 1;
      let total_Monthly_Unpaid_Bookings_Amount = userBooking.payment_Made
        ? 0
        : userBooking.total_Price;
      if (monthlyBookingInfo.data()?.total_Monthly_Paid_Bookings_Count) {
        total_Monthly_Paid_Bookings_Count +=
          monthlyBookingInfo.data()?.total_Monthly_Paid_Bookings_Count;
      }
      if (monthlyBookingInfo.data()?.total_Monthly_Paid_Bookings_Amount) {
        total_Monthly_Paid_Bookings_Amount +=
          monthlyBookingInfo.data()?.total_Monthly_Paid_Bookings_Amount;
      }
      if (monthlyBookingInfo.data()?.total_Monthly_Unpaid_Bookings_Count) {
        total_Monthly_Unpaid_Bookings_Count +=
          monthlyBookingInfo.data()?.total_Monthly_Unpaid_Bookings_Count;
      }
      if (monthlyBookingInfo.data()?.total_Monthly_Unpaid_Bookings_Amount) {
        total_Monthly_Unpaid_Bookings_Amount +=
          monthlyBookingInfo.data()?.total_Monthly_Unpaid_Bookings_Amount;
      }

      await updateDoc(bookingMonthlyDoc, {
        total_Monthly_Bookings_Count: +total_Monthly_Bookings_Count,
        total_Monthly_Paid_Bookings_Count: +total_Monthly_Paid_Bookings_Count,
        total_Monthly_Unpaid_Bookings_Count:
          +total_Monthly_Unpaid_Bookings_Count,
        total_Monthly_Paid_Bookings_Amount: Math.ceil(
          +total_Monthly_Paid_Bookings_Amount,
        ),
        total_Monthly_Unpaid_Bookings_Amount: Math.ceil(
          +total_Monthly_Unpaid_Bookings_Amount,
        ),
        total_Monthly_Price: Math.ceil(+total_Monthly_Price),
        total_Monthly_Room_Cost: Math.ceil(+total_Monthly_Room_Cost),
        total_Monthly_Tax: Math.ceil(+total_Monthly_Tax),
      });
    } else {
      await setDoc(bookingMonthlyDoc, {
        total_Monthly_Bookings_Count: 1,
        total_Monthly_Paid_Bookings_Count: userBooking.payment_Made ? 1 : 0,
        total_Monthly_Unpaid_Bookings_Count: userBooking.payment_Made ? 0 : 1,
        total_Monthly_Paid_Bookings_Amount: userBooking.payment_Made
          ? Math.ceil(+userBooking.total_Price)
          : 0,
        total_Monthly_Unpaid_Bookings_Amount: userBooking.payment_Made
          ? 0
          : Math.ceil(+userBooking.total_Price),
        total_Monthly_Price: Math.ceil(+userBooking.total_Price),
        total_Monthly_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Monthly_Tax: Math.ceil(+userBooking.total_Tax),
      });
    }
  } catch (err) {}

  // Booking Date Based Daily Stats
  try {
    const bookingDailyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      bookingYear,
      STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
      `MONTH-${bookingMonth}`,
      STAYBOOK_HOTEL_DAILY_BOOKINGS_COLLECTION_NAME,
      `DAY-${bookingDate}`,
    );
    const dailyBookingInfo = await getDoc(bookingDailyDoc);
    if (dailyBookingInfo.exists()) {
      const total_Daily_Bookings_Count =
        dailyBookingInfo.data()?.total_Daily_Bookings_Count + 1;
      const total_Daily_Price =
        dailyBookingInfo.data()?.total_Daily_Price + userBooking.total_Price;
      const total_Daily_Room_Cost =
        dailyBookingInfo.data()?.total_Daily_Room_Cost +
        userBooking.total_Room_Cost;
      const total_Daily_Tax =
        dailyBookingInfo.data()?.total_Daily_Tax + userBooking.total_Tax;

      let total_Daily_Paid_Bookings_Count = userBooking.payment_Made ? 1 : 0;
      let total_Daily_Paid_Bookings_Amount = userBooking.payment_Made
        ? userBooking.amount_Paid
        : 0;
      let total_Daily_Unpaid_Bookings_Count = userBooking.payment_Made ? 0 : 1;
      let total_Daily_Unpaid_Bookings_Amount = userBooking.payment_Made
        ? 0
        : userBooking.total_Price;
      if (dailyBookingInfo.data()?.total_Daily_Paid_Bookings_Count) {
        total_Daily_Paid_Bookings_Count +=
          dailyBookingInfo.data()?.total_Daily_Paid_Bookings_Count;
      }
      if (dailyBookingInfo.data()?.total_Daily_Paid_Bookings_Amount) {
        total_Daily_Paid_Bookings_Amount +=
          dailyBookingInfo.data()?.total_Daily_Paid_Bookings_Amount;
      }
      if (dailyBookingInfo.data()?.total_Daily_Unpaid_Bookings_Count) {
        total_Daily_Unpaid_Bookings_Count +=
          dailyBookingInfo.data()?.total_Daily_Unpaid_Bookings_Count;
      }
      if (dailyBookingInfo.data()?.total_Daily_Unpaid_Bookings_Amount) {
        total_Daily_Unpaid_Bookings_Amount +=
          dailyBookingInfo.data()?.total_Daily_Unpaid_Bookings_Amount;
      }

      await updateDoc(bookingDailyDoc, {
        total_Daily_Bookings_Count: +total_Daily_Bookings_Count,
        total_Daily_Paid_Bookings_Count: +total_Daily_Paid_Bookings_Count,
        total_Daily_Unpaid_Bookings_Count: +total_Daily_Unpaid_Bookings_Count,
        total_Daily_Paid_Bookings_Amount: Math.ceil(
          +total_Daily_Paid_Bookings_Amount,
        ),
        total_Daily_Unpaid_Bookings_Amount: Math.ceil(
          +total_Daily_Unpaid_Bookings_Amount,
        ),
        total_Daily_Price: Math.ceil(+total_Daily_Price),
        total_Daily_Room_Cost: Math.ceil(+total_Daily_Room_Cost),
        total_Daily_Tax: Math.ceil(+total_Daily_Tax),
      });
    } else {
      await setDoc(bookingDailyDoc, {
        total_Daily_Bookings_Count: 1,
        total_Daily_Paid_Bookings_Count: userBooking.payment_Made ? 1 : 0,
        total_Daily_Unpaid_Bookings_Count: userBooking.payment_Made ? 0 : 1,
        total_Daily_Paid_Bookings_Amount: userBooking.payment_Made
          ? Math.ceil(+userBooking.total_Price)
          : 0,
        total_Daily_Unpaid_Bookings_Amount: userBooking.payment_Made
          ? 0
          : Math.ceil(+userBooking.total_Price),
        total_Daily_Price: Math.ceil(+userBooking.total_Price),
        total_Daily_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Daily_Tax: Math.ceil(+userBooking.total_Tax),
      });
    }
  } catch (error) {}

  // ### Check-In Date ### //

  // Check-In Date Based Yearly Stats
  try {
    const checkinYearlyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      checkinYear,
    );
    const yearlyCheckinInfo = await getDoc(checkinYearlyDoc);

    if (yearlyCheckinInfo.exists()) {
      let total_Yearly_Checkin_Paid_Count =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Paid_Count || 0;
      let total_Yearly_Checkin_Unpaid_Count =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Unpaid_Count || 0;
      let total_Yearly_Checkin_Paid_Amount =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Paid_Amount || 0;
      let total_Yearly_Checkin_Unpaid_Amount =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Unpaid_Amount || 0;
      let total_Yearly_Checkin_Count =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Count || 0;
      let total_Yearly_Checkin_Price =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Price || 0;
      let total_Yearly_Checkin_Tax =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Tax || 0;
      let total_Yearly_Checkin_Room_Cost =
        yearlyCheckinInfo.data()?.total_Yearly_Checkin_Room_Cost || 0;

      total_Yearly_Checkin_Paid_Count = userBooking.payment_Made
        ? +total_Yearly_Checkin_Paid_Count + 1
        : total_Yearly_Checkin_Paid_Count;
      total_Yearly_Checkin_Unpaid_Count = userBooking.payment_Made
        ? total_Yearly_Checkin_Unpaid_Count
        : +total_Yearly_Checkin_Unpaid_Count + 1;
      total_Yearly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +total_Yearly_Checkin_Paid_Amount + userBooking.total_Price
        : +total_Yearly_Checkin_Paid_Amount;
      total_Yearly_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? total_Yearly_Checkin_Unpaid_Amount
        : +total_Yearly_Checkin_Unpaid_Amount + userBooking.total_Price;

      total_Yearly_Checkin_Count = +total_Yearly_Checkin_Count + 1;
      total_Yearly_Checkin_Room_Cost =
        +total_Yearly_Checkin_Room_Cost + userBooking.total_Room_Cost;
      total_Yearly_Checkin_Tax =
        +total_Yearly_Checkin_Tax + userBooking.total_Tax;
      total_Yearly_Checkin_Price =
        +total_Yearly_Checkin_Price + userBooking.total_Price;

      await updateDoc(checkinYearlyDoc, {
        total_Yearly_Checkin_Paid_Count: +total_Yearly_Checkin_Paid_Count,
        total_Yearly_Checkin_Unpaid_Count: +total_Yearly_Checkin_Unpaid_Count,
        total_Yearly_Checkin_Paid_Amount: Math.ceil(
          +total_Yearly_Checkin_Paid_Amount,
        ),
        total_Yearly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Amount,
        ),
        total_Yearly_Checkin_Count: +total_Yearly_Checkin_Count,
        total_Yearly_Checkin_Room_Cost: Math.ceil(
          +total_Yearly_Checkin_Room_Cost,
        ),
        total_Yearly_Checkin_Tax: Math.ceil(+total_Yearly_Checkin_Tax),
        total_Yearly_Checkin_Price: Math.ceil(+total_Yearly_Checkin_Price),
      });
    } else {
      let total_Yearly_Checkin_Paid_Count = userBooking.payment_Made ? 1 : 0;
      let total_Yearly_Checkin_Unpaid_Count = userBooking.payment_Made ? 0 : 1;
      let total_Yearly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +userBooking.total_Price
        : 0;
      let total_Yearly_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? 0
        : +userBooking.total_Price;

      await setDoc(checkinYearlyDoc, {
        total_Yearly_Bookings_Count: 0,
        total_Yearly_Paid_Bookings_Count: 0,
        total_Yearly_Unpaid_Bookings_Count: 0,
        total_Yearly_Paid_Bookings_Amount: 0,
        total_Yearly_Unpaid_Bookings_Amount: 0,
        total_Yearly_Price: 0,
        total_Yearly_Room_Cost: 0,
        total_Yearly_Tax: 0,

        total_Yearly_Checkin_Paid_Count: Math.ceil(
          +total_Yearly_Checkin_Paid_Count,
        ),
        total_Yearly_Checkin_Unpaid_Count: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Count,
        ),
        total_Yearly_Checkin_Paid_Amount: Math.ceil(
          +total_Yearly_Checkin_Paid_Amount,
        ),
        total_Yearly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Amount,
        ),

        total_Yearly_Checkin_Count: 1,
        total_Yearly_Checkin_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Yearly_Checkin_Tax: Math.ceil(+userBooking.total_Tax),
        total_Yearly_Checkin_Price: Math.ceil(+userBooking.total_Price),
      });
    }
  } catch (error) {}

  // Check-In Date Based Month Stats
  try {
    const checkinMonthlyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      checkinYear,
      STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
      `MONTH-${checkinMonth}`,
    );
    const monthlyCheckinInfo = await getDoc(checkinMonthlyDoc);
    if (monthlyCheckinInfo.exists()) {
      let total_Monthly_Checkin_Paid_Count =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Paid_Count || 0;
      let total_Monthly_Checkin_Unpaid_Count =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Unpaid_Count || 0;
      let total_Monthly_Checkin_Paid_Amount =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Paid_Amount || 0;
      let total_Monthly_Checkin_Unpaid_Amount =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Unpaid_Amount || 0;
      let total_Monthly_Checkin_Count =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Count || 0;
      let total_Monthly_Checkin_Price =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Price || 0;
      let total_Monthly_Checkin_Tax =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Tax || 0;
      let total_Monthly_Checkin_Room_Cost =
        monthlyCheckinInfo.data()?.total_Monthly_Checkin_Room_Cost || 0;

      total_Monthly_Checkin_Paid_Count = userBooking.payment_Made
        ? +total_Monthly_Checkin_Paid_Count + 1
        : total_Monthly_Checkin_Paid_Count;
      total_Monthly_Checkin_Unpaid_Count = userBooking.payment_Made
        ? total_Monthly_Checkin_Unpaid_Count
        : +total_Monthly_Checkin_Unpaid_Count + 1;
      total_Monthly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +total_Monthly_Checkin_Paid_Amount + userBooking.total_Price
        : +total_Monthly_Checkin_Paid_Amount;
      total_Monthly_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? total_Monthly_Checkin_Unpaid_Amount
        : +total_Monthly_Checkin_Unpaid_Amount + userBooking.total_Price;

      total_Monthly_Checkin_Count = +total_Monthly_Checkin_Count + 1;
      total_Monthly_Checkin_Room_Cost =
        +total_Monthly_Checkin_Room_Cost + userBooking.total_Room_Cost;
      total_Monthly_Checkin_Tax =
        +total_Monthly_Checkin_Tax + userBooking.total_Tax;
      total_Monthly_Checkin_Price =
        +total_Monthly_Checkin_Price + userBooking.total_Price;

      await updateDoc(checkinMonthlyDoc, {
        total_Monthly_Checkin_Paid_Count: +total_Monthly_Checkin_Paid_Count,
        total_Monthly_Checkin_Unpaid_Count: +total_Monthly_Checkin_Unpaid_Count,
        total_Monthly_Checkin_Paid_Amount: Math.ceil(
          +total_Monthly_Checkin_Paid_Amount,
        ),
        total_Monthly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Amount,
        ),
        total_Monthly_Checkin_Count: +total_Monthly_Checkin_Count,
        total_Monthly_Checkin_Room_Cost: Math.ceil(
          +total_Monthly_Checkin_Room_Cost,
        ),
        total_Monthly_Checkin_Tax: Math.ceil(+total_Monthly_Checkin_Tax),
        total_Monthly_Checkin_Price: Math.ceil(+total_Monthly_Checkin_Price),
      });
    } else {
      let total_Monthly_Checkin_Paid_Count = userBooking.payment_Made ? 1 : 0;
      let total_Monthly_Checkin_Unpaid_Count = userBooking.payment_Made ? 0 : 1;
      let total_Monthly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +userBooking.total_Price
        : 0;
      let total_Monthly_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? 0
        : +userBooking.total_Price;

      await setDoc(checkinMonthlyDoc, {
        total_Monthly_Bookings_Count: 0,
        total_Monthly_Paid_Bookings_Count: 0,
        total_Monthly_Unpaid_Bookings_Count: 0,
        total_Monthly_Paid_Bookings_Amount: 0,
        total_Monthly_Unpaid_Bookings_Amount: 0,
        total_Monthly_Price: 0,
        total_Monthly_Room_Cost: 0,
        total_Monthly_Tax: 0,

        total_Monthly_Checkin_Paid_Count: Math.ceil(
          +total_Monthly_Checkin_Paid_Count,
        ),
        total_Monthly_Checkin_Unpaid_Count: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Count,
        ),
        total_Monthly_Checkin_Paid_Amount: Math.ceil(
          +total_Monthly_Checkin_Paid_Amount,
        ),
        total_Monthly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Amount,
        ),

        total_Monthly_Checkin_Count: 1,
        total_Monthly_Checkin_Room_Cost: Math.ceil(
          +userBooking.total_Room_Cost,
        ),
        total_Monthly_Checkin_Tax: Math.ceil(+userBooking.total_Tax),
        total_Monthly_Checkin_Price: Math.ceil(+userBooking.total_Price),
      });
    }
  } catch (error) {}

  // Check-In Date Based Daily Stats
  try {
    const checkinDailyDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      checkinYear,
      STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
      `MONTH-${checkinMonth}`,
      STAYBOOK_HOTEL_DAILY_BOOKINGS_COLLECTION_NAME,
      `DAY-${checkinDate}`,
    );
    const dailyCheckinInfo = await getDoc(checkinDailyDoc);
    if (dailyCheckinInfo.exists()) {
      let total_Daily_Checkin_Paid_Count =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Paid_Count || 0;
      let total_Daily_Checkin_Unpaid_Count =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Unpaid_Count || 0;
      let total_Daily_Checkin_Paid_Amount =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Paid_Amount || 0;
      let total_Daily_Checkin_Unpaid_Amount =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Unpaid_Amount || 0;
      let total_Daily_Checkin_Count =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Count || 0;
      let total_Daily_Checkin_Price =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Price || 0;
      let total_Daily_Checkin_Tax =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Tax || 0;
      let total_Daily_Checkin_Room_Cost =
        dailyCheckinInfo.data()?.total_Daily_Checkin_Room_Cost || 0;

      total_Daily_Checkin_Paid_Count = userBooking.payment_Made
        ? +total_Daily_Checkin_Paid_Count + 1
        : total_Daily_Checkin_Paid_Count;
      total_Daily_Checkin_Unpaid_Count = userBooking.payment_Made
        ? total_Daily_Checkin_Unpaid_Count
        : +total_Daily_Checkin_Unpaid_Count + 1;
      total_Daily_Checkin_Paid_Amount = userBooking.payment_Made
        ? +total_Daily_Checkin_Paid_Amount + userBooking.total_Price
        : +total_Daily_Checkin_Paid_Amount;
      total_Daily_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? total_Daily_Checkin_Unpaid_Amount
        : +total_Daily_Checkin_Unpaid_Amount + userBooking.total_Price;

      total_Daily_Checkin_Count = +total_Daily_Checkin_Count + 1;
      total_Daily_Checkin_Room_Cost =
        +total_Daily_Checkin_Room_Cost + userBooking.total_Room_Cost;
      total_Daily_Checkin_Tax =
        +total_Daily_Checkin_Tax + userBooking.total_Tax;
      total_Daily_Checkin_Price =
        +total_Daily_Checkin_Price + userBooking.total_Price;

      await updateDoc(checkinDailyDoc, {
        total_Daily_Checkin_Paid_Count: +total_Daily_Checkin_Paid_Count,
        total_Daily_Checkin_Unpaid_Count: +total_Daily_Checkin_Unpaid_Count,
        total_Daily_Checkin_Paid_Amount: Math.ceil(
          +total_Daily_Checkin_Paid_Amount,
        ),
        total_Daily_Checkin_Unpaid_Amount: Math.ceil(
          +total_Daily_Checkin_Unpaid_Amount,
        ),
        total_Daily_Checkin_Count: +total_Daily_Checkin_Count,
        total_Daily_Checkin_Room_Cost: Math.ceil(
          +total_Daily_Checkin_Room_Cost,
        ),
        total_Daily_Checkin_Tax: Math.ceil(+total_Daily_Checkin_Tax),
        total_Daily_Checkin_Price: Math.ceil(+total_Daily_Checkin_Price),
      });
    } else {
      let total_Daily_Checkin_Paid_Count = userBooking.payment_Made ? 1 : 0;
      let total_Daily_Checkin_Unpaid_Count = userBooking.payment_Made ? 0 : 1;
      let total_Daily_Checkin_Paid_Amount = userBooking.payment_Made
        ? +userBooking.total_Price
        : 0;
      let total_Daily_Checkin_Unpaid_Amount = userBooking.payment_Made
        ? 0
        : +userBooking.total_Price;

      await setDoc(checkinDailyDoc, {
        total_Daily_Bookings_Count: 0,
        total_Daily_Paid_Bookings_Count: 0,
        total_Daily_Unpaid_Bookings_Count: 0,
        total_Daily_Paid_Bookings_Amount: 0,
        total_Daily_Unpaid_Bookings_Amount: 0,
        total_Daily_Price: 0,
        total_Daily_Room_Cost: 0,
        total_Daily_Tax: 0,

        total_Daily_Checkin_Paid_Count: Math.ceil(
          +total_Daily_Checkin_Paid_Count,
        ),
        total_Daily_Checkin_Unpaid_Count: Math.ceil(
          +total_Daily_Checkin_Unpaid_Count,
        ),
        total_Daily_Checkin_Paid_Amount: Math.ceil(
          +total_Daily_Checkin_Paid_Amount,
        ),
        total_Daily_Checkin_Unpaid_Amount: Math.ceil(
          +total_Daily_Checkin_Unpaid_Amount,
        ),

        total_Daily_Checkin_Count: 1,
        total_Daily_Checkin_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Daily_Checkin_Tax: Math.ceil(+userBooking.total_Tax),
        total_Daily_Checkin_Price: Math.ceil(+userBooking.total_Price),
      });
    }
  } catch (error) {
    console.log("staybookHotelBookingStatistics: ", error);
  }
};

const userBookingConfirmationalMail = async (
  userBooking: BookingDetails,
  checkInDate: any,
  checkOutDate: any,
  hotelStars: any,
  bookingMessage: any,
  roomsInfo: any,
  totalCounts: any,
) => {
  // function to get the payment mode
  const getPaymentMode = (totalPrice: number, amountPaid: number) => {
    if (amountPaid === totalPrice) {
      return `prepaidBooking`;
    } else if (amountPaid > 0) {
      return `partialBooking`;
    } else {
      return `payAtHotelBooking`;
    }
  };
  const paymentMode = getPaymentMode(
    userBooking.total_Price,
    userBooking.amount_Paid,
  );

  try {
    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: userBooking.user_Email_Id,
      subject: `Room Reservation from Staybook - ${userBooking.receipt_Id}`,
      text: `Your booking at ${userBooking.hotel_Name} has been confirmed.`,
      html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width" />
              <title>Email template</title>
            </head>
            <body>
              <div
                id="email"
                style="
                  width: 640px;
                  margin: auto;
                  background: #005250;
                  font-family: sans-serif;
                "
              >
                <!-- Header -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 16px"
                >
                  <tr>
                    <td align="center">
                      <img
                        alt="brand_logo"
                        src="https://images.staybook.in/logo%20(1).png"
                        width="100px"
                      />
                    </td>
                    <td style="color: white">
                      <p>Thank you for booking with us...</p>
                      <p style="font-size: 20px; font-weight: bold">
                        Your booking at Staybook - ${userBooking.hotel_Name} is
                        confirmed
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Simple details -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  style="padding: 16px"
                >
                  <tr>
                    <td bgcolor="#ffffff" style="padding: 16px; border-radius: 10px">
                      <p style="font-size: 16px">
                        &#9864;
                        <b>${userBooking.hotel_Name}</b> is expecting you on
                        ${checkInDate}, 12:00 PM onwards. for
                        ${totalCounts.totalGuestCount} ${
                          totalCounts.totalGuestCount > 1 ? "Adults" : "Adult"
                        } is confirmed. You have reserved
                        ${totalCounts.totalRoomCount} ${
                          totalCounts.totalRoomCount > 1 ? "Rooms" : "Room"
                        } for ${userBooking.num_nights}
                        ${userBooking.num_nights > 1 ? "Nights" : "Night"}.
                      </p>
                      <p style="font-size: 16px">&#9864; ${bookingMessage}</p>
                    </td>
                  </tr>
                </table>

                <!-- hotel name and rating -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="padding: 16px; border-radius: 10px 10px 0 0"
                    >
                      <h2 style="font-size: 20px; margin: 0">
                        Staybook - ${userBooking.hotel_Name}
                      </h2>
                      <p
                        style="
                          font-family: sans-serif;
                          font-size: 16px;
                          margin: 7px 0 0 0;
                        "
                      >
                        ${hotelStars}
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- flex section with hotel details -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="60%"
                      style="
                        vertical-align: top;
                        padding: 16px;
                        border-radius: 0 0 0 10px;
                      "
                    >
                      <p style="margin: 0">&#9864; ${
                        userBooking.hotel_Landmark
                      }</p>
                      <p>
                        &#9864;
                        <a
                          color="#000000"
                          style="text-decoration: none"
                          href="tel:+919910613040"
                          >9910613040</a
                        >
                      </p>
                      <p>
                        &#9864;
                        <a style="color: #000000" href="mailto:staybookbooking@gmail.com"
                          >booking@staybook.in</a
                        >
                      </p>

                      <br />
                      <strong>Please Note</strong>
                      <p style="font-size: 0.875rem">
                        &#9864; For early check-in and extra bed please contact the hotel
                        directly.
                      </p>
                    </td>

                    <td bgcolor="#ffffff" style="border-radius: 0 0 10px 0">
                      <a
                        target="_blank"
                        style="
                          display: grid;
                          place-items: center;
                          position: relative;
                          width: 100%;
                          height: 180px;
                          overflow: hidden;
                        "
                      >
                        <img
                          class="hotel_image"
                          style="position: absolute"
                          src="${userBooking.hotel_Image_Url}"
                          width="100%"
                        />
                      </a>
                      <a
                        href="${userBooking.hotel_Map_Url}"
                        target="_blank"
                        align="center"
                        style="
                          display: block;
                          background-color: #005250;
                          padding: 12px;
                          font-size: 18px;
                          color: #ffffff;
                          margin-top: 16px;
                          border-radius: 5px;
                        "
                      >
                        View on Map
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Booking heading -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 16px 16px 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="padding: 16px; border-radius: 10px 10px 0 0"
                    >
                      <h2 style="font-size: 20px; margin: 0">Booking Details</h2>
                    </td>
                  </tr>
                </table>

                <!-- flex section about nights details -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="
                        vertical-align: top;
                        padding: 16px 0 7px 16px;
                        border-bottom: 1px solid gray;
                      "
                    >
                      <strong
                        >${userBooking.num_nights} ${
                          userBooking.num_nights > 1 ? "Nights" : "Night"
                        } Stay</strong
                      >
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td bgcolor="#ffffff" width="50%" style="padding: 16px">
                      <p style="font-size: 13px; margin: 0">Check-in</p>
                      <p style="font-weight: bold; margin: 5px 0 5px 0">${checkInDate}</p>
                      <p style="font-size: 13px; margin: 0">after 12 PM</p>
                    </td>

                    <td bgcolor="#ffffff" width="50%" style="padding: 16px">
                      <p style="font-size: 13px; margin: 0">Check-out</p>
                      <p style="font-weight: bold; margin: 5px 0 5px 0">
                        ${checkOutDate}
                      </p>
                      <p style="font-size: 13px; margin: 0">before 11 AM</p>
                    </td>
                  </tr>
                </table>

                <!-- flex section about rooms details -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="1000%"
                      style="
                        vertical-align: top;
                        padding: 16px 0 7px 16px;
                        border-bottom: 1px solid gray;
                      "
                    >
                      <strong
                        >${totalCounts.totalRoomCount} ${
                          totalCounts.totalRoomCount > 1 ? "Rooms" : "Room"
                        }</strong
                      >
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" width="100%" style="padding: 16px">
                      <p style="font-weight: bold; margin: 5px 0 5px 0">${roomsInfo}</p>
                      <p style="font-size: 13px; margin: 0">
                        ${totalCounts.totalGuestCount} ${
                          totalCounts.totalGuestCount > 1 ? "Adults" : "Adult"
                        }, ${totalCounts.totalChildCount} ${
                          totalCounts.totalChildCount > 1
                            ? "Childrens"
                            : "Children"
                        }
                      </p>
                      <p style="font-size: 13px; margin: 0"></p>
                    </td>
                  </tr>
                </table>

                <!-- flex section about guest deatails -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="
                        vertical-align: top;
                        padding: 16px 0 7px 16px;
                        border-radius: 0;
                        border-bottom: 1px solid gray;
                      "
                    >
                      <strong
                        >${totalCounts.totalGuestCount} ${
                          totalCounts.totalGuestCount > 1 ? "Adults" : "Adult"
                        }</strong
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="padding: 16px; border-radius: 0 0 10px 10px"
                    >
                      <p style="font-size: 13px; margin: 0">
                        ${totalCounts.totalRoomCount} ${
                          totalCounts.totalRoomCount > 1 ? "Rooms" : "Room"
                        }
                      </p>
                      <p style="font-weight: bold; margin: 5px 0 5px 0">
                        ${userBooking.user_Name} (Primary Guest)
                      </p>
                      <p style="font-size: 13px; margin: 0">
                        ${userBooking.user_Email_Id} , ${
                          userBooking.user_Phone_Number
                        }
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Payment heading -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 16px 16px 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="padding: 16px; border-radius: 10px 10px 0 0"
                    >
                      <h2 style="font-size: 20px; margin: 0">Payment Details</h2>
                    </td>
                  </tr>
                </table>

                <!-- flex section about payment details -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="100%"
                      style="
                        vertical-align: top;
                        padding: 16px 0 7px 16px;
                        border-bottom: 1px solid gray;
                      "
                    >
                      <strong>Price Breakup (in INR)</strong>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 0 16px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      width="50%"
                      style="padding: 16px; border-radius: 0 0 0 10px"
                    >
                      <p style="font-weight: bold; margin: 0">Total room price</p>
                      <p style="font-weight: bold; margin: 0">Taxes & fees</p>
                      <p style="font-weight: bold; margin: 0 0 24px 0">Total Price</p>
                      ${
                        paymentMode === "prepaidBooking"
                          ? `
                      <p style="font-weight: bold; margin: 0">Total Price Paid</p>
                      <p style="font-weight: bold; margin: 0">Price Left to Pay</p>
                      `
                          : paymentMode === "partialBooking"
                            ? `
                      <p style="font-weight: bold; margin: 0">Total Price Paid</p>
                      <p style="font-weight: bold; margin: 0">Price Left to Pay</p>
                      `
                            : paymentMode === "payAtHotelBooking"
                              ? `
                      <p style="font-weight: bold; margin: 0">Price Left to Pay</p>
                      `
                              : ``
                      }
                    </td>

                    <td
                      bgcolor="#ffffff"
                      width="50%"
                      align="right"
                      style="padding: 16px; border-radius: 0 0 10px 0"
                    >
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${userBooking.total_Room_Cost}
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${
                          userBooking.total_Tax +
                          userBooking.hotel_Handling_Charges
                        }
                      </p>
                      <p style="font-weight: bold; margin: 0 0 24px 0">
                        &#8377; ${
                          userBooking.total_Price +
                          userBooking.hotel_Handling_Charges
                        }
                      </p>
                      ${
                        paymentMode === "prepaidBooking"
                          ? `
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${userBooking.amount_Paid}
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${
                          userBooking.total_Price - userBooking.amount_Paid
                        }
                      </p>
                      `
                          : paymentMode === "partialBooking"
                            ? `
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${userBooking.amount_Paid}
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${
                          userBooking.total_Price - userBooking.amount_Paid
                        }
                      </p>
                      `
                            : paymentMode === "payAtHotelBooking"
                              ? `
                      <p style="font-weight: bold; margin: 0">
                        &#8377; ${
                          userBooking.total_Price +
                          userBooking.hotel_Handling_Charges
                        }
                      </p>
                      `
                              : ``
                      }
                    </td>
                  </tr>
                </table>

                <!-- Hotel policy -->
                <table role="presentation" border="0" width="100%" style="padding: 16px">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style="padding: 16px; border-radius: 10px"
                    >
                      <h2 style="font-size: 28px; margin: 0 0 20px 0; font-family: Arial">
                        Hotel Policies
                      </h2>
                      <p style="font-size: 12px">
                        1. Please Note: You can check in using any government-issued ID
                        (except PAN card) and address proof of any local or outstation
                        address. Do carry your original ID (Photocopy not accepted) for
                        cross-verification. Couples are welcome.
                      </p>
                      <p style="font-size: 12px">
                        2. Early check-in or late check-out is subject to availability and
                        may be chargeable by the hotel directly.
                      </p>
                      <p style="font-size: 12px">
                        3. If cancelled before 7 days: 85% refund, Between 7 days-72 hrs:
                        50% refund, Less than 72hrs, No-Shows or Early Checkout : No
                        refund.
                      </p>
                      <p style="font-size: 12px">
                        4. It is mandatory for guests to present valid photo
                        identification upon check in.
                      </p>
                      <p style="font-size: 12px">
                        5. We reserve the right to cancel or modify reservations where it
                        appears that a customer has engaged in fraudulent or inappropriate
                        activity or under other circumstances where it appears that the
                        reservations contain or resulted from a mistake or error.
                      </p>
                      <p style="font-size: 12px">
                        6. To make modifications or cancellations please Reply to this
                        email.
                      </p>
                      <p style="font-size: 12px">
                        7. Refund shall be initiated within 48 hours of receiving the
                        request and the payment would be credited within 5-7 working days
                        via the same mode as used while making the booking.
                      </p>
                      <p style="font-size: 12px">
                        For more assistance, please visit the Staybook help center
                        <a href="https://staybook.in/contactUs">here</a>
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="16"
                  style="padding: 16px"
                >
                  <tr>
                    <td align="center" style="padding: 16px">
                      <a
                        href="https://staybook.in"
                        target="_blank"
                        class="display: block"
                      >
                        <img
                          alt="brand_logo"
                          src="https://images.staybook.in/logo%20(1).png"
                          width="64px"
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
          </html>`,
    });

    return {
      status: true,
      responseMessage:
        "Successfully sended the booking confirmation mail to the user.",
    };
  } catch (error) {
    console.log("userBookingConfirmationalMail: ", error);
    return {
      status: false,
      responseMessage: "Something went wrong. Unable to send mail",
    };
  }
};

const hotelierBookingConfirmationalMail = async (
  userBooking: BookingDetails,
  checkInDate: any,
  checkOutDate: any,
  hotelStars: any,
  bookingMessage: any,
  roomsInfo: any,
  totalCounts: any,
) => {
  try {
    // function to get the payment mode
    const getPaymentMode = (totalPrice: number, amountPaid: number) => {
      if (amountPaid === totalPrice) {
        return `Prepaid`;
      } else if (amountPaid > 0) {
        return `Partial`;
      } else {
        return `Pay At Hotel`;
      }
    };
    const paymentMode = getPaymentMode(
      userBooking.total_Price,
      userBooking.amount_Paid,
    );

    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: userBooking.hotel_Email_Id,
      subject: `Room Confirmation from Staybook - (Booking ID: ${userBooking.receipt_Id})`,
      text: `You have a new Booking for ${userBooking.hotel_Name}.`, // it'll only visible when the client cannot render the HTML
      html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="text/html; UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap"
                rel="stylesheet"
              />
              <title>Document</title>
              <style type="text/css">
                * {
                  font-family: "Quicksand", sans-serif;
                }
              </style>
            </head>
            <body>
              <div
                id="email"
                style="
                  box-sizing: border-box;
                  width: 640px;
                  margin: auto;
                  background: #005250;
                  font-family: sans-serif;
                  padding: 32px 32px 10px 32px;
                "
              >
                <!-- Inner white box -->
                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  height="580px"
                  bgcolor="#ffffff"
                  cellspacing="0"
                  cellpadding="0"
                  style="border-radius: 100% 100% 0 0; padding: 16px"
                >
                  <tr>
                    <td align="center" valign="top">
                      <table role="presentation" style="margin: 0">
                        <tr>
                          <td>
                            <a href="https://staybook.in" target="_blank">
                              <img
                                src="https://images.staybook.in/logo%20(1).png"
                                width="72px"
                                style="border-radius: 50%"
                              />
                            </a>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" style="margin: 0">
                        <tr>
                          <td align="center">
                            <p style="margin: 0; font-weight: 500; font-size: 12px">
                              Hello Team
                            </p>
                            <p
                              style="
                                font-weight: 0;
                                font-size: 18px;
                                margin: 4px 0;
                                padding: 0 40px;
                              "
                            >
                              You have a new booking from
                              <span style="font-weight: 700; color: #005250"
                                >STAYBOOK</span
                              ><br />
                              @${userBooking.hotel_Name}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" style="margin: 0">
                        <tr>
                          <td align="center">
                            <img
                              src="${userBooking.hotel_Image_Url}"
                              alt="hotel_Image"
                              width="100%"
                              height="200px"
                              style="border-radius: 5px; object-fit: cover"
                            />
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" style="margin: 0">
                        <tr>
                          <td align="center">
                            <p
                              style="
                                color: #005250;
                                letter-spacing: 1px;
                                margin: 0;
                                font-size: 18px;
                                font-weight: 700;
                                text-decoration: underline;
                              "
                            >
                              Hotel Booking Details
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table
                        role="presentation"
                        border="0"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        style="padding: 16px 0; font-size: 12px"
                      >
                        <tr>
                          <td align="center" width="50%">
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Booking Id :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.receipt_Id}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Customer Name :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.user_Name}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Customer Email :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.user_Email_Id}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Customer Ph No. :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.user_Phone_Number}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td
                            align="center"
                            width="50%"
                            style="border-left: 1px solid #e8a646"
                          >
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%" style="padding-left: 16px">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Check-In :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">${checkInDate}</p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%" style="padding-left: 16px">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    Check-Out :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">${checkOutDate}</p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%" style="padding-left: 16px">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    No. of Rooms :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.total_Rooms_Count}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%">
                              <tr>
                                <td width="40%" style="padding-left: 16px">
                                  <p
                                    style="
                                      margin: 0;
                                      font-weight: 700;
                                      color: #005250;
                                      padding: 2px 0;
                                    "
                                  >
                                    No. of Guests :
                                  </p>
                                </td>
                                <td width="60%">
                                  <p style="margin: 0; padding: 2px 0">
                                    ${userBooking.total_Guests_Count} ${
                                      userBooking.total_Children_Count > 0
                                        ? ` ,
                                    <span style="font-weight: 700; color: #005250">
                                      Children:
                                    </span>
                                    ${userBooking.total_Children_Count}`
                                        : ``
                                    }
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->

                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  bgcolor="#ffffff"
                  style="
                    padding: 0 16px 16px 16px;
                    margin-top: -18px;
                    border-radius: 0 0 10px 10px;
                  "
                >
                  <tr>
                    <td>
                      <p style="margin: 0; font-size: 12px; padding: 2px 0">
                        <span style="font-weight: 700; color: #005250"
                          >Room Details :
                        </span>
                        ${roomsInfo}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style="
                          margin: 0;
                          font-size: 18px;
                          font-weight: 700;
                          color: #005250;
                          padding: 2px 0;
                        "
                      >
                        <span>Total Booking Amount : </span>
                        ${
                          userBooking.total_Price +
                          userBooking.hotel_Handling_Charges
                        }
                        <span style="font-size: 10px;">(${paymentMode})</span>
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="padding: 16px"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="https://staybook.in"
                        target="_blank"
                        class="display: block"
                      >
                        <img
                          alt="brand_logo"
                          src="https://images.staybook.in/logo%20(1).png"
                          width="42px"
                          style="border-radius: 50%"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p style="margin: 2px 0 0 0; font-weight: 700; color: #e8a646">
                        Thank you
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
          </html>`,
    });

    return {
      status: true,
      responseMessage:
        "Successfully sended the booking confirmation mail to the user.",
    };
  } catch (error) {
    console.log("hotelierBookingConfirmationalMail: ", error);
    return {
      status: false,
      responseMessage: "Something went wrong. Unable to send mail",
    };
  }
};

const aisencywhhatappMessage = async (userBooking: BookingDetails) => {
  try {
    let formattedCheckinTime;
    let formattedCheckoutTime;
    if (userBooking.checkin_Time.includes("GMT+")) {
      formattedCheckinTime = formatDateStringToCustomString(
        userBooking.checkin_Time,
      );
      formattedCheckoutTime = formatDateStringToCustomString(
        userBooking.checkout_Time,
      );
    } else {
      formattedCheckinTime = formatDateToCustomString(
        new Date(userBooking.checkin_Time).toISOString(),
      );
      formattedCheckoutTime = formatDateToCustomString(
        new Date(userBooking.checkout_Time).toISOString(),
      );
    }

    const payload = {
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzQ5OTgwMDAzZmQ2MGI3MjA1MTM3NiIsIm5hbWUiOiJTdGF5Qm9vayBIb3NwaXRhbGl0eSBQcml2YXRlIExpbWl0ZWQiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjU2MDVkYWNmNTI2NWQwYjkwNWQwZTVlIiwiYWN0aXZlUGxhbiI6Ik5PTkUiLCJpYXQiOjE3MTQ3MjMyMDB9.tUHMaJ9e5EOnIkDpGyrL4jbhRW87ZDW7pw9PHowzS80",
      campaignName: "booking-texted-one",
      destination: `${userBooking.user_Phone_Number}`,
      userName: "StayBook Hospitality Private Limited",
      templateParams: [
        `${userBooking.user_First_Name}${userBooking.user_Last_Name ? " " + userBooking.user_Last_Name : ""}`,
        `${userBooking.hotel_Name}`,
        `${userBooking.hotel_Name}`,
        formattedCheckinTime,
        formattedCheckoutTime,
        `${userBooking.hotel_Landmark}`,
        `${userBooking.hotel_Map_Url}`,
      ],
      source: "new-landing-page form",
    };
    const response = await fetch(
      "https://backend.aisensy.com/campaign/t1/api/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    console.log(response, "response from whatapp api for message");
    if (!response.ok) {
      // throw new Error("Failed to call Aisensy endpoint");
      return {
        status: "false",
        message: "Failed to call Aisensy endpoint",
      };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error calling Aisensy endpoint:", error);
    // throw error;
    return {
      status: "false",
      message: "Error occoured while executing Aisensy endpoint!!!",
    };
  }
};

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const {
    userBooking,
    // checkInDate,
    // checkOutDate,
    // hotelStars,
    // bookingMessage,
    // roomsInfo,
    // totalCounts,
  } = receivedData;
  let hotelStars = generateStars(userBooking.hotel_Star_Rating);
  let checkInDate;
  let checkOutDate;
  if (userBooking.checkin_Time.includes("GMT+")) {
    checkInDate = formatDateStringToCustomString(userBooking.checkin_Time);
    checkOutDate = formatDateStringToCustomString(userBooking.checkout_Time);
  } else {
    checkInDate = formatDateToCustomString(
      new Date(userBooking.checkin_Time).toISOString(),
    );
    checkOutDate = formatDateToCustomString(
      new Date(userBooking.checkout_Time).toISOString(),
    );
  }

  // generate booking message
  let bookingMessage = "";
  try {
    if (userBooking.amount_Paid === userBooking.total_Price) {
      bookingMessage = `You have paid the full amount (₹${Math.ceil(
        userBooking.amount_Paid,
      )}) in advance.`;
    } else if (userBooking.amount_Paid > 0) {
      bookingMessage = `You have paid partial amount (₹${Math.ceil(
        userBooking.amount_Paid,
      )}) in advance.`;
    } else {
      bookingMessage = `You have to pay the remaining booking amount of INR ₹${
        Math.ceil(userBooking.total_Price) + userBooking.hotel_Handling_Charges
      } at the time of check-in.`;
    }
  } catch (error) {
    bookingMessage =
      "Your booking has been confirmed. Thank you for choose us yoour booking partner.";
  }

  // new rooms lists
  let roomsInfo = countRoomsAndPlans(userBooking.roomsList);
  // total guest and child count object
  let totalCounts: any = {
    totalRoomCount: 0,
    totalGuestCount: 0,
    totalChildCount: 0,
  };

  try {
    userBooking.roomsList.forEach((room: RoomDetails) => {
      totalCounts.totalRoomCount += room.room_Count;
      totalCounts.totalGuestCount += room.num_Guests;
      totalCounts.totalChildCount += room.num_Children;
    });
  } catch (error) {
    totalCounts = {
      totalRoomCount: 1,
      totalGuestCount: 2,
      totalChildCount: 0,
    };
  }

  try {
    if (userBooking.user_Email_Id === "") {
      userBooking.user_Email_Id = "unknown@gmail.com";
    }

    if (!userBooking.receipt_Id || userBooking.receipt_Id === "") {
      userBooking.receipt_Id = shortid.generate();
    }
    if (!userBooking.booking_Id || userBooking.booking_Id === "") {
      userBooking.booking_Id = generateUniqueId();
    }
    const receipt_Id = userBooking.receipt_Id;
    const booking_id = userBooking.booking_Id;
    userBooking.booking_Id = booking_id;

    const [
      userDocRef,
      hotelBookingDocRef,
      staybookDocRef,
      staybookStats,
      userEmail,
      hotierEmail,
      aisencyResponse,
    ] = await Promise.all([
      aisencywhhatappMessage(userBooking),
      userHotelBookingCreation(userBooking, booking_id, receipt_Id),
      hotelBookingCreation(userBooking, booking_id, receipt_Id),
      staybookHotelBookingCreation(userBooking, booking_id, receipt_Id),
      staybookHotelBookingStatistics(userBooking),
      userBookingConfirmationalMail(
        userBooking,
        checkInDate,
        checkOutDate,
        hotelStars,
        bookingMessage,
        roomsInfo,
        totalCounts,
      ),
      hotelierBookingConfirmationalMail(
        userBooking,
        checkInDate,
        checkOutDate,
        hotelStars,
        bookingMessage,
        roomsInfo,
        totalCounts,
      ),
    ]);

    // // let userDocRef, hotelBookingDocRef;
    // try {
    //   const userDocRef = await userHotelBookingCreation(
    //     userBooking,
    //     booking_id,
    //     receipt_Id,
    //   );
    // } catch (error) {
    //   console.log("UserBookingHandler: ", error);
    // }

    // try {
    //   const hotelBookingDocRef = await hotelBookingCreation(
    //     userBooking,
    //     booking_id,
    //     receipt_Id,
    //   );
    // } catch (err2) {
    //   console.log("HotelBookingHandler: ", err2);
    // }

    // try {
    //   const staybookDocRef = await staybookHotelBookingCreation(
    //     userBooking,
    //     booking_id,
    //     receipt_Id,
    //   );
    // } catch (err3) {
    //   console.log("StayBookHotelBookingCreationHandler: ", err3);
    // }

    // try {
    //   const staybookStats = await staybookHotelBookingStatistics(userBooking);
    // } catch (err4) {
    //   console.log("staybookHotelBookingStatisticsHandler: ", err4);
    // }

    // try {
    //   const userEmail = await userBookingConfirmationalMail(
    //     userBooking,
    //     checkInDate,
    //     checkOutDate,
    //     hotelStars,
    //     bookingMessage,
    //     roomsInfo,
    //     totalCounts,
    //   );
    // } catch (err5) {
    //   console.log("userBookingConfirmationalMailHandler: ", err5);
    // }

    // try {
    //   const hotierEmail = await hotelierBookingConfirmationalMail(
    //     userBooking,
    //     checkInDate,
    //     checkOutDate,
    //     hotelStars,
    //     bookingMessage,
    //     roomsInfo,
    //     totalCounts,
    //   );
    // } catch (err6) {
    //   console.log("hotelierBookingConfirmationalMailHandler: ", err6);
    // }

    // try {
    //   const pdfResponse = await sendPdfViaWhatsApp(userBooking);
    //   console.log(pdfResponse, "pdfResponse from pdf api");
    // } catch (err7) {
    //   console.log("Error in pdf generation: ", err7);
    // }

    // try {
    //   const whatsappResponse = await aisencywhhatappMessage(userBooking);
    // } catch (err8) {
    //   console.log("Error in sending whatapp message: ", err8);
    // }

    res.status(201).json({
      status: true,
      booking_Id: booking_id,
      receipt_Id: receipt_Id,
      error: null,
      message: "User access token value generated!",
    });

    // res.redirect(
    //   301,
    //   `/bookingInformation/${booking_id}?booking_status=Booking Successful&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email_Id=${userBooking.user_Email_Id}&user_Phone_Number=${userBooking.user_Phone_Number}&booking_receipt=${receipt_Id}`,
    // );
  } catch (error) {
    console.log("Booking Creation failed");
    res.status(422).json({
      status: false,
      userCredentials: null,
      ownerCredentials: null,
      booking_Id: "",
      receipt_Id: "",
      error,
      message: "Error occoured",
    });
  }
}

export default handler;
