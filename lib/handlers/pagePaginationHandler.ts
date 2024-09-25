import {
  USER_BOOKINGS_COLLECTION_NAME,
  BOOKED_ROOMS_COLLECTION_NAME,
  HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
} from "../helper";

import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { db } from "../firebase";

export const getUserBookingsOld = async (
  email: any = 1,
  lastDoc: any = 1,
  limitSize: any = 100,
  userAccessTokenObject: any = 1,
) => {
  let userEmailId = "";

  if (email == 1) {
    userEmailId = userAccessTokenObject.email;
  } else {
    userEmailId = email;
  }

  const firestore = getFirestore();

  const bookingCollectionRef = collection(
    firestore,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
  );

  let bookingsQuerySnapshot;

  if (lastDoc != 1) {
    bookingsQuerySnapshot = await getDocs(
      query(
        bookingCollectionRef,
        startAfter(lastDoc),
        limit(limitSize),
        orderBy("createdAt", "desc"),
      ),
    );
  } else {
    bookingsQuerySnapshot = await getDocs(
      query(
        bookingCollectionRef,
        limit(limitSize),
        orderBy("checkout_Time", "desc"),
      ),
    );
  }
  let bookingList: BookingDetails[] = [];

  for (let booking of bookingsQuerySnapshot.docs) {
    const bookedRoomsCollectionRef = collection(
      firestore,
      USER_BOOKINGS_COLLECTION_NAME,
      userEmailId,
      BOOKED_ROOMS_COLLECTION_NAME,
      booking.id,
      HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
    );

    let bookingInfo = new BookingDetails();

    // let bookingTimeValue = booking.data().booking_Time.seconds;
    // if (booking.data().booking_Time.seconds) {
    //   bookingTimeValue = new Date(
    //     booking.data().booking_Time.seconds * 1000
    //   ).toISOString();
    // }

    bookingInfo.booking_Id = booking.id;
    bookingInfo.hotel_Image_Url = String(booking.data().hotel_Image_Url) + "";
    bookingInfo.hotel_Name = booking.data().hotel_Name;
    bookingInfo.hotel_Landmark = booking.data().hotel_Landmark;
    bookingInfo.hotel_Owner_Id = booking.data().hotel_Owner_Id;
    bookingInfo.hotel_Firebase_Id = booking.data().hotel_Firebase_Id;
    // bookingInfo.user_Unique_Id = booking.data().user_Unique_Id;
    // bookingInfo.user_Email_Id = booking.data().user_Email_Id;
    // bookingInfo.user_Name = booking.data().user_Name;
    // bookingInfo.user_Phone_Number = booking.data().user_Phone_Number;
    // bookingInfo.total_Rooms_Count = booking.data().total_Rooms_Count;
    // bookingInfo.total_Room_Cost = booking.data().total_Room_Cost;
    bookingInfo.total_Tax = booking.data().total_Tax;
    bookingInfo.total_Price = booking.data().total_Price;
    bookingInfo.payment_Made = booking.data().payment_Made;
    bookingInfo.amount_Paid = booking.data().amount_Paid;
    bookingInfo.booking_Time = booking.data().booking_Time;
    bookingInfo.checkin_Time = booking.data().checkin_Time;
    bookingInfo.checkout_Time = booking.data().checkout_Time;
    bookingInfo.receipt_Id = booking.data().receipt_Id;

    if (bookingInfo.hotel_Image_Url === "undefined") {
      bookingInfo.hotel_Image_Url = "";
    }

    bookingList.push(bookingInfo);
  }

  if (bookingsQuerySnapshot.empty) {
    return {
      lastDoc: null,
      bookingList: JSON.stringify(bookingList),
    };
  }

  lastDoc = bookingsQuerySnapshot.docs[bookingsQuerySnapshot.docs.length - 1];

  return {
    lastDoc: lastDoc,
    bookingList: JSON.stringify(bookingList),
    email: userEmailId,
  };
};

export const getUserBookings = async (
  user_email: string,
  startAfterDoc: any,
  limitSize: number = 10,
) => {

  const bookingCollectionRef = collection(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    user_email,
    BOOKED_ROOMS_COLLECTION_NAME,
  );

  let bookingsQuerySnapshot;

  if (startAfterDoc) {
    bookingsQuerySnapshot = await getDocs(
      query(
        bookingCollectionRef,
        orderBy("booking_Time", "desc"),
        startAfter(startAfterDoc),
        limit(limitSize),
      ),
    );
  } else {
    bookingsQuerySnapshot = await getDocs(
      query(
        bookingCollectionRef,
        orderBy("booking_Time", "desc"),
        limit(limitSize),
      ),
    );
  }

  let bookingList: BookingDetails[] = [];

  let lastDoc: any = null;

  for (let booking of bookingsQuerySnapshot.docs) {
    let bookingInfo = new BookingDetails();

    bookingInfo.booking_Id = booking.id;
    bookingInfo.hotel_Image_Url = String(booking.data().hotel_Image_Url) + "";
    bookingInfo.hotel_Name = booking.data().hotel_Name;
    bookingInfo.hotel_Landmark = booking.data().hotel_Landmark;
    bookingInfo.hotel_Owner_Id = booking.data().hotel_Owner_Id;
    bookingInfo.hotel_Firebase_Id = booking.data().hotel_Firebase_Id;
    bookingInfo.total_Tax = booking.data().total_Tax;
    bookingInfo.total_Price = booking.data().total_Price;
    bookingInfo.payment_Made = booking.data().payment_Made;
    bookingInfo.amount_Paid = booking.data().amount_Paid;
    bookingInfo.booking_Time = booking.data().booking_Time;
    bookingInfo.checkin_Time = booking.data().checkin_Time;
    bookingInfo.checkout_Time = booking.data().checkout_Time;
    bookingInfo.receipt_Id = booking.data().receipt_Id;

    if (bookingInfo.hotel_Image_Url === "undefined") {
      bookingInfo.hotel_Image_Url = "";
    }

    bookingList.push(bookingInfo);
    lastDoc = booking.data().booking_Time;
  }

  return {
    lastDoc: lastDoc,
    bookingList: bookingList,
    email: user_email,
  };
};
