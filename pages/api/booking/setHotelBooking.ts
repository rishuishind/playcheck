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
} from "@/lib/helper";

// Booking will be stored for the user
const userHotelBookingCreation = async (
  userBooking: any,
  receiptId: string
) => {
  const userDocRef = await addDoc(
    collection(
      db,
      USER_BOOKINGS_COLLECTION_NAME,
      userBooking.user_Email_Id,
      BOOKED_ROOMS_COLLECTION_NAME
    ),
    {
      booking_Id: "",
      booking_Time: new Date(),
      checkin_Time: new Date(userBooking.checkin_Time),
      checkout_Time: new Date(userBooking.checkout_Time),
      hotel_Image_Url: userBooking.hotel_Image_Url,
      hotel_Name: userBooking.hotel_Name,
      hotel_Slug_Name: userBooking.hotel_Slug_Name,
      hotel_Landmark: userBooking.hotel_Landmark,
      hotel_Owner_Id: userBooking.hotel_Owner_Id,
      hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
      total_Rooms_Count: userBooking.total_Rooms_Count,
      total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
      total_Tax: Math.ceil(userBooking.total_Tax),
      total_Price: Math.ceil(userBooking.total_Price),
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
      booking_Coins: 0,
      total_Guests_Count: userBooking.total_Guests_Count,

      razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
      razorpay_Order_Id: userBooking.razorpay_Order_Id,
      razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
      receipt_Id: receiptId,
    }
  );

  const docRef = doc(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    userBooking.user_Email_Id,
    BOOKED_ROOMS_COLLECTION_NAME,
    userDocRef.id
  );
  const response = await updateDoc(docRef, {
    booking_Id: userDocRef.id,
  });

  for (let i = 0; i < userBooking.roomsList.length; i++) {
    const roomRef = await addDoc(
      collection(
        db,
        USER_BOOKINGS_COLLECTION_NAME,
        userBooking.user_Email_Id,
        BOOKED_ROOMS_COLLECTION_NAME,
        userDocRef.id,
        HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME
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

        total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
        total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
        total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
      }
    );
  }

  return userDocRef;
};

// Booking will be stored for the hotel
const hotelBookingCreation = async (
  userBooking: any,
  userBookingId: any,
  receiptId: string
) => {
  const docBookingRef = doc(
    db,
    HOTEL_CONTROL_CENTER_COLLECTION_NAME,
    userBooking.hotel_Slug_Name,
    HOTEL_BOOKINGS_COLLECTION_NAME,
    userBookingId
  );

  const response = await setDoc(docBookingRef, {
    booking_Id: userBookingId,
    booking_Time: new Date(),
    checkin_Time: new Date(userBooking.checkin_Time),
    checkout_Time: new Date(userBooking.checkout_Time),
    hotel_Name: userBooking.hotel_Name,
    hotel_Slug_Name: userBooking.hotel_Slug_Name,
    hotel_Landmark: userBooking.hotel_Landmark,
    hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
    total_Rooms_Count: userBooking.total_Rooms_Count,
    total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
    total_Tax: Math.ceil(userBooking.total_Tax),
    total_Price: Math.ceil(userBooking.total_Price),
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
      HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME
    );
    const roomRef = await addDoc(roomCollectionRef, {
      room_Id: userBooking.roomsList[i].room_Id,
      room_Name: userBooking.roomsList[i].room_Name,
      room_Info: userBooking.roomsList[i].room_Info,
      plan_Id: userBooking.roomsList[i].plan_Id,
      plan_Name: userBooking.roomsList[i].plan_Name,
      plan_Info: userBooking.roomsList[i].plan_Info,
      room_Guest_Occupancy: userBooking.roomsList[i].room_Guest_Occupancy,
      room_Children_Occupancy: userBooking.roomsList[i].room_Children_Occupancy,

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

      total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
      total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
      total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
    });
  }

  return response;
};

// Booking will be stored for the staybook website
const staybookHotelBookingCreation = async (
  userBooking: any,
  userBookingId: any,
  receiptId: string,
  currentDateCollection: string
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
    const docDailyBookingRef = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
      STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME,
      bookingYear,
      STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME,
      `MONTH-${bookingMonth}`,
      STAYBOOK_HOTEL_DAILY_BOOKINGS_COLLECTION_NAME,
      `DAY-${bookingDate}`,
      STAYBOOK_HOTEL_BOOKINGS_COLLECTION_NAME,
      userBookingId
    );

    response1 = await setDoc(docDailyBookingRef, {
      booking_Id: userBookingId,
      booking_Time: new Date(),
      checkin_Time: new Date(userBooking.checkin_Time),
      checkout_Time: new Date(userBooking.checkout_Time),
      hotel_Name: userBooking.hotel_Name,
      hotel_Slug_Name: userBooking.hotel_Slug_Name,
      hotel_Landmark: userBooking.hotel_Landmark,
      hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
      total_Rooms_Count: userBooking.total_Rooms_Count,
      total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
      total_Tax: Math.ceil(userBooking.total_Tax),
      total_Price: Math.ceil(userBooking.total_Price),
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

      razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
      razorpay_Order_Id: userBooking.razorpay_Order_Id,
      razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
      receipt_Id: receiptId,
    });
  } catch (error: any) {
    console.log(error);
  }

  return response1;
};

const staybookHotelBookingStatistics = async (
  userBooking: any,
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
      bookingYear
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
      let total_Yearly_Unpaid_Bookings_Amount = userBooking.payment_Made ? 0 : userBooking.total_Price;
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
          +total_Yearly_Paid_Bookings_Amount
        ),
        total_Yearly_Unpaid_Bookings_Amount: Math.ceil(
          +total_Yearly_Unpaid_Bookings_Amount
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
        total_Yearly_Unpaid_Bookings_Amount: userBooking.payment_Made ? 0 : Math.ceil(+userBooking.total_Price),
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
      `MONTH-${bookingMonth}`
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
      let total_Monthly_Unpaid_Bookings_Count = userBooking.payment_Made ? 0 : 1;
      let total_Monthly_Unpaid_Bookings_Amount = userBooking.payment_Made ? 0 : userBooking.total_Price;
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
          +total_Monthly_Paid_Bookings_Amount
        ),
        total_Monthly_Unpaid_Bookings_Amount: Math.ceil(
          +total_Monthly_Unpaid_Bookings_Amount
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
        total_Monthly_Unpaid_Bookings_Amount: userBooking.payment_Made ? 0 : Math.ceil(+userBooking.total_Price),
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
      `DAY-${bookingDate}`
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
      let total_Daily_Unpaid_Bookings_Amount = userBooking.payment_Made ? 0 : userBooking.total_Price;
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
          +total_Daily_Paid_Bookings_Amount
        ),
        total_Daily_Unpaid_Bookings_Amount: Math.ceil(
          +total_Daily_Unpaid_Bookings_Amount
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
        total_Daily_Unpaid_Bookings_Amount: userBooking.payment_Made ? 0 : Math.ceil(+userBooking.total_Price),
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
      checkinYear
    );
    const yearlyCheckinInfo = await getDoc(checkinYearlyDoc);

    if (yearlyCheckinInfo.exists()) {
      let total_Yearly_Checkin_Paid_Count = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Paid_Count || 0;
      let total_Yearly_Checkin_Unpaid_Count = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Unpaid_Count || 0;
      let total_Yearly_Checkin_Paid_Amount = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Paid_Amount || 0;
      let total_Yearly_Checkin_Unpaid_Amount = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Unpaid_Amount || 0;
      let total_Yearly_Checkin_Count = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Count || 0;
      let total_Yearly_Checkin_Price = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Price || 0;
      let total_Yearly_Checkin_Tax = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Tax || 0;
      let total_Yearly_Checkin_Room_Cost = yearlyCheckinInfo.data()?.total_Yearly_Checkin_Room_Cost || 0;

      total_Yearly_Checkin_Paid_Count = userBooking.payment_Made
        ? +total_Yearly_Checkin_Paid_Count + 1
        : total_Yearly_Checkin_Paid_Count;
      total_Yearly_Checkin_Unpaid_Count = userBooking.payment_Made ? total_Yearly_Checkin_Unpaid_Count : +total_Yearly_Checkin_Unpaid_Count + 1;
      total_Yearly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +total_Yearly_Checkin_Paid_Amount + userBooking.total_Price
        : +total_Yearly_Checkin_Paid_Amount;
      total_Yearly_Checkin_Unpaid_Amount = userBooking.payment_Made ? total_Yearly_Checkin_Unpaid_Amount : +total_Yearly_Checkin_Unpaid_Amount + userBooking.total_Price;

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
          +total_Yearly_Checkin_Paid_Amount
        ),
        total_Yearly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Amount
        ),
        total_Yearly_Checkin_Count: +total_Yearly_Checkin_Count,
        total_Yearly_Checkin_Room_Cost: Math.ceil(
          +total_Yearly_Checkin_Room_Cost
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
      let total_Yearly_Checkin_Unpaid_Amount = userBooking.payment_Made ? 0 : +userBooking.total_Price;

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
          +total_Yearly_Checkin_Paid_Count
        ),
        total_Yearly_Checkin_Unpaid_Count: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Count
        ),
        total_Yearly_Checkin_Paid_Amount: Math.ceil(
          +total_Yearly_Checkin_Paid_Amount
        ),
        total_Yearly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Yearly_Checkin_Unpaid_Amount
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
      `MONTH-${checkinMonth}`
    );
    const monthlyCheckinInfo = await getDoc(checkinMonthlyDoc);
    if (monthlyCheckinInfo.exists()) {
      let total_Monthly_Checkin_Paid_Count = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Paid_Count || 0;
      let total_Monthly_Checkin_Unpaid_Count = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Unpaid_Count || 0;
      let total_Monthly_Checkin_Paid_Amount = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Paid_Amount || 0;
      let total_Monthly_Checkin_Unpaid_Amount = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Unpaid_Amount || 0;
      let total_Monthly_Checkin_Count = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Count || 0;
      let total_Monthly_Checkin_Price = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Price || 0;
      let total_Monthly_Checkin_Tax = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Tax || 0;
      let total_Monthly_Checkin_Room_Cost = monthlyCheckinInfo.data()?.total_Monthly_Checkin_Room_Cost || 0;

      total_Monthly_Checkin_Paid_Count = userBooking.payment_Made
        ? +total_Monthly_Checkin_Paid_Count + 1
        : total_Monthly_Checkin_Paid_Count;
      total_Monthly_Checkin_Unpaid_Count = userBooking.payment_Made ? total_Monthly_Checkin_Unpaid_Count : +total_Monthly_Checkin_Unpaid_Count + 1;
      total_Monthly_Checkin_Paid_Amount = userBooking.payment_Made
        ? +total_Monthly_Checkin_Paid_Amount + userBooking.total_Price
        : +total_Monthly_Checkin_Paid_Amount;
      total_Monthly_Checkin_Unpaid_Amount = userBooking.payment_Made ? total_Monthly_Checkin_Unpaid_Amount : +total_Monthly_Checkin_Unpaid_Amount + userBooking.total_Price;

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
          +total_Monthly_Checkin_Paid_Amount
        ),
        total_Monthly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Amount
        ),
        total_Monthly_Checkin_Count: +total_Monthly_Checkin_Count,
        total_Monthly_Checkin_Room_Cost: Math.ceil(
          +total_Monthly_Checkin_Room_Cost
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
      let total_Monthly_Checkin_Unpaid_Amount = userBooking.payment_Made ? 0 : +userBooking.total_Price;

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
          +total_Monthly_Checkin_Paid_Count
        ),
        total_Monthly_Checkin_Unpaid_Count: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Count
        ),
        total_Monthly_Checkin_Paid_Amount: Math.ceil(
          +total_Monthly_Checkin_Paid_Amount
        ),
        total_Monthly_Checkin_Unpaid_Amount: Math.ceil(
          +total_Monthly_Checkin_Unpaid_Amount
        ),

        total_Monthly_Checkin_Count: 1,
        total_Monthly_Checkin_Room_Cost: Math.ceil(
          +userBooking.total_Room_Cost
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
      `DAY-${checkinDate}`
    );
    const dailyCheckinInfo = await getDoc(checkinDailyDoc);
    if (dailyCheckinInfo.exists()) {
      let total_Daily_Checkin_Paid_Count = dailyCheckinInfo.data()?.total_Daily_Checkin_Paid_Count || 0;
      let total_Daily_Checkin_Unpaid_Count = dailyCheckinInfo.data()?.total_Daily_Checkin_Unpaid_Count || 0;
      let total_Daily_Checkin_Paid_Amount = dailyCheckinInfo.data()?.total_Daily_Checkin_Paid_Amount || 0;
      let total_Daily_Checkin_Unpaid_Amount = dailyCheckinInfo.data()?.total_Daily_Checkin_Unpaid_Amount || 0;
      let total_Daily_Checkin_Count = dailyCheckinInfo.data()?.total_Daily_Checkin_Count || 0;
      let total_Daily_Checkin_Price = dailyCheckinInfo.data()?.total_Daily_Checkin_Price || 0;
      let total_Daily_Checkin_Tax = dailyCheckinInfo.data()?.total_Daily_Checkin_Tax || 0;
      let total_Daily_Checkin_Room_Cost = dailyCheckinInfo.data()?.total_Daily_Checkin_Room_Cost || 0;

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
          +total_Daily_Checkin_Paid_Amount
        ),
        total_Daily_Checkin_Unpaid_Amount: Math.ceil(
          +total_Daily_Checkin_Unpaid_Amount
        ),
        total_Daily_Checkin_Count: +total_Daily_Checkin_Count,
        total_Daily_Checkin_Room_Cost: Math.ceil(
          +total_Daily_Checkin_Room_Cost
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
          +total_Daily_Checkin_Paid_Count
        ),
        total_Daily_Checkin_Unpaid_Count: Math.ceil(
          +total_Daily_Checkin_Unpaid_Count
        ),
        total_Daily_Checkin_Paid_Amount: Math.ceil(
          +total_Daily_Checkin_Paid_Amount
        ),
        total_Daily_Checkin_Unpaid_Amount: Math.ceil(
          +total_Daily_Checkin_Unpaid_Amount
        ),

        total_Daily_Checkin_Count: 1,
        total_Daily_Checkin_Room_Cost: Math.ceil(+userBooking.total_Room_Cost),
        total_Daily_Checkin_Tax: Math.ceil(+userBooking.total_Tax),
        total_Daily_Checkin_Price: Math.ceil(+userBooking.total_Price),
      });
    }
  } catch (error) {}
};

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userBooking, currentDateCollection } = receivedData;

  try {
    if (userBooking.user_Email_Id === "") {
      userBooking.user_Email_Id = "unknown@gmail.com";
    }

    const receipt_Id = userBooking.receipt_Id;
    const userDocRef = await userHotelBookingCreation(userBooking, receipt_Id);
    const hotelBookingDocRef = await hotelBookingCreation(
      userBooking,
      userDocRef.id,
      receipt_Id
    );

    const staybookDocRef = await staybookHotelBookingCreation(
      userBooking,
      userDocRef.id,
      receipt_Id,
      currentDateCollection
    );
    await staybookHotelBookingStatistics(userBooking);

    res.status(201).json({
      userCredentials: userDocRef,
      ownerCredentails: hotelBookingDocRef,
      booking_Id: userDocRef.id,
      receipt_Id: receipt_Id,
      error: null,
      message: "User access token value generated!",
    });
  } 
  catch (error) {
    res.status(422).json({
      userCredentials: null,
      ownerCredentails: null,
      booking_Id: "",
      receipt_Id: "",
      error,
      message: "Error occoured",
    });
  }
}

export default handler;
