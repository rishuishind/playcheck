import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  GOOGLE_LOGIN,
  GOOGLE_SIGNUP,
  USER_COLLECTION_NAME,
  GET_USER_TOKEN_OBJECT,
  USER_BOOKINGS_COLLECTION_NAME,
  BOOKED_ROOMS_COLLECTION_NAME,
  HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  USER_UPDATE_TYPE_NAME,
} from "../helper";
import { auth, googleAuthProvider } from "./index";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db } from ".";
import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";

import { UserPersonalInformation } from "../classModels/user/user_personal_information";

export const googleAuthentication = async () => {
  try {
    const googleResponse = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(googleResponse);
    if (!credential) {
      return {
        userCredentials: null,
        error: null,
        message: "Google account not selected!",
      };
    }
    const user = googleResponse.user;
    const userAccessToken = await googleResponse.user.getIdToken();
    const userId = user.uid;
    const userEmail = user.email;
    const userImageUrl = user.photoURL;
    const displayName = user.displayName;

    let authType = "";
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      authType = GOOGLE_LOGIN;
    } else {
      authType = GOOGLE_SIGNUP;
    }

    const response = await fetch("/api/auth/userGoogleAuth", {
      method: "POST",
      body: JSON.stringify({
        authType,
        userAccessToken,
        userId,
        userEmail,
        userImageUrl,
        displayName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      userCredentials: user,
      error: null,
      message: "",
    };
  } catch (error) {
    return {
      userCredentials: null,
      error,
      message: "Error occoured",
    };
  }
};

export const updateProfileDetailsHandler = async (
  headerValue1: string,
  textValue1: string,
) => {
  const response = await fetch("/api/userProfile/updateUserDetails", {
    method: "POST",
    body: JSON.stringify({
      headerValue1: headerValue1,
      textValue1: textValue1,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deductStaybookCoinsFromUser = async (
  user_Unique_Id: string,
  coinsCnt: number,
) => {
  const docRef = doc(db, USER_COLLECTION_NAME, user_Unique_Id);
  const userInfo = await getDoc(docRef);
  const currCoins = userInfo.data()?.User_Staybook_Coins;

  const finalCoinsCnt = currCoins - coinsCnt;

  const response = await updateDoc(docRef, {
    User_Staybook_Coins: Number(finalCoinsCnt),
  });
};

export const addStaybookCoinsToUser = async (
  user_Unique_Id: string,
  pricePaid: number,
) => {
  const docRef = doc(db, USER_COLLECTION_NAME, user_Unique_Id);
  const userInfo = await getDoc(docRef);
  const currCoins = userInfo.data()?.User_Staybook_Coins;

  const coinsEarned = Math.floor(pricePaid / 100);
  const totalCoins = currCoins + coinsEarned;

  const response = await updateDoc(docRef, {
    User_Staybook_Coins: Number(totalCoins),
  });
};

export const createUserAccount = async (
  accessToken: string,
  userId: string,
  userEmailId: string,
  userImageUrl = "",
  authType = "email",
  displayName = "",
) => {
  const response = await setDoc(doc(db, USER_COLLECTION_NAME, userId), {
    User_Id: userId,
    User_Access_Token: accessToken,
    User_Auth_Type: authType,
    User_Staybook_Coins: 0,
    User_Display_Name: displayName,
    User_First_Name: "",
    User_Middle_Name: "",
    User_Last_Name: "",
    User_Gender: "",
    User_Image_Url: userImageUrl,
    User_Mobile_Number: "",
    User_Alternate_Mobile_Number: "",
    User_Email_Id: userEmailId,
    User_Permanent_Address: "",
    User_Coins: 0,
    User_Landmark: "",
    User_Full_Address: "",
    User_State: "",
    User_City: "",
    User_Pincode: "",
    User_Aadhaar_Number: "",
    User_Aadhaar_Url: "",
    User_Pancard_Number: "",
    User_Pancard_Url: "",
  });
};

export const getUserAccessTokenObject = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const requestType = GET_USER_TOKEN_OBJECT;
  const response = await fetch(`/api/userProfile/fetchUserAccessToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.userCredentials;
};

export const getUserProfileDetails = async (userAccessTokenObject: any) => {
  if (userAccessTokenObject === null || !userAccessTokenObject.user_id)
    return null;

  const docRef = doc(db, USER_COLLECTION_NAME, userAccessTokenObject.user_id);
  const docSnap = await getDoc(docRef);

  let info = new UserPersonalInformation();

  if (docSnap.exists()) {
    const userData = docSnap.data();
    info.User_Access_Token = userData?.admin_Access_Token || "";
    info.User_Alternate_Mobile_Number =
      userData?.admin_Alternate_Mobile_Number || "";
    info.User_Auth_Type = userData?.admin_Auth_Type || "";
    info.User_Coins = userData?.admin_Coins || "";
    info.User_Display_Name = userData?.admin_Display_Name || "";
    info.User_Email_Id = userData?.admin_Email_Id || "";
    info.User_First_Name = userData?.admin_First_Name || "";
    info.User_Gender = userData?.admin_Gender || "";
    info.User_Id = userData?.admin_Id || "";
    info.User_Image_Url = userData?.admin_Image_Url || "";
    info.User_Last_Name = userData?.admin_Last_Name || "";
    info.User_Middle_Name = userData?.admin_Middle_Name || "";
    info.User_Mobile_Number = userData?.admin_Mobile_Number || "";
    info.User_Permanent_Address = userData?.admin_Permanent_Address || "";
    info.User_Full_Address = userData?.admin_Full_Address || "";
    info.User_Staybook_Coins = userData?.admin_Staybook_Coins || 0;
  }
  return info;
};

export const getUserBookings = async (userAccessTokenObject: any) => {
  const userEmailId = userAccessTokenObject.email;

  const firestore = getFirestore();

  const bookingCollectionRef = collection(
    firestore,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
  );

  const bookingsQuerySnapshot = await getDocs(bookingCollectionRef);

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

    let bookingTimeValue = booking.data().booking_Time.seconds;
    if (booking.data().booking_Time.seconds) {
      bookingTimeValue = new Date(
        booking.data().booking_Time.seconds * 1000,
      ).toISOString();
    }

    bookingInfo.booking_Id = booking.id;
    bookingInfo.hotel_Image_Url = booking.data().hotel_Image_Url;
    bookingInfo.hotel_Name = booking.data().hotel_Name;
    bookingInfo.hotel_Landmark = booking.data().hotel_Landmark;
    bookingInfo.hotel_Owner_Id = booking.data().hotel_Owner_Id;
    bookingInfo.hotel_Firebase_Id = booking.data().hotel_Firebase_Id;
    bookingInfo.user_Unique_Id = booking.data().user_Unique_Id;
    bookingInfo.user_Email_Id = booking.data().user_Email_Id;
    bookingInfo.user_Name = booking.data().user_Name;
    bookingInfo.user_Phone_Number = booking.data().user_Phone_Number;
    bookingInfo.total_Rooms_Count = booking.data().total_Rooms_Count;
    bookingInfo.total_Room_Cost = booking.data().total_Room_Cost;
    bookingInfo.total_Tax = booking.data().total_Tax;
    bookingInfo.total_Price = booking.data().total_Price;
    bookingInfo.payment_Made = booking.data().payment_Made;
    bookingInfo.amount_Paid = booking.data().amount_Paid;
    bookingInfo.booking_Time = bookingTimeValue;
    bookingInfo.checkin_Time = new Date(booking.data().checkin_Time);
    bookingInfo.checkout_Time = new Date(booking.data().checkout_Time);
    bookingInfo.razorpay_Payment_Id = booking.data().razorpay_Payment_Id;
    bookingInfo.razorpay_Order_Id = booking.data().razorpay_Order_Id;
    bookingInfo.razorpay_Signature_Id = booking.data().razorpay_Signature_Id;
    bookingInfo.receipt_Id = booking.data().receipt_Id;

    bookingList.push(bookingInfo);
  }

  return JSON.stringify(bookingList);
};

export const fetchUserImageUrl = async () => {
  const response = await fetch("/api/userProfile/fetchUserDetails", {
    method: "POST",
    body: JSON.stringify({
      userBooking: "userBooking",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  let imageUrl = "";

  if (data.userCredentials) {
    imageUrl = data.userCredentials.User_Image_Url;
  }

  return imageUrl;
};

export const getUserBookingInfo = async (
  userEmailId: string,
  bookingId: string,
) => {
  const bookingCollectionRef = doc(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
    bookingId,
  );

  let booking = await getDoc(bookingCollectionRef);

  let bookingInfo: any = {};
  const bookedRoomsCollectionRef = collection(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
    bookingId,
    HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  );

  const roomsQuerySnapshot = await getDocs(query(bookedRoomsCollectionRef));

  let roomsList: RoomDetails[] = [];
  for (let room of roomsQuerySnapshot.docs) {
    let roomInfo = new RoomDetails();
    roomInfo.num_Children = room.data().num_Children;
    roomInfo.num_Guests = room.data().num_Guests;
    roomInfo.plan_Child_Price = room.data().plan_Children_Price;
    roomInfo.plan_Id = room.data().plan_Id;
    roomInfo.plan_Info = room.data().plan_Info;
    roomInfo.plan_Name = room.data().plan_Name;

    roomInfo.priceBreakUp = room.data().priceBreakUp;
    if (room.data().priceBreakUp) {
      for (let pd of room.data().priceBreakUp) {
        roomInfo.plan_Room_Price += +pd.basePrice;
        roomInfo.plan_Tax += +pd.basePrice;
        roomInfo.plan_Tax += +pd.taxPrice;
        roomInfo.plan_Price += +pd.totalPrice;
      }
    }

    if (Math.floor(roomInfo.plan_Room_Price) === 0) {
      roomInfo.plan_Room_Price = room.data().plan_Room_Price;
      roomInfo.plan_Tax = room.data().plan_Tax;
      roomInfo.plan_Price = room.data().plan_Price;
    }

    roomInfo.room_Count = room.data().room_Count;
    roomInfo.room_Guest_Occupancy = room.data().room_Guest_Occupancy;
    roomInfo.room_Id = room.id;
    roomInfo.room_Name = room.data().room_Name;
    roomInfo.room_Info = room.data().room_Info;

    roomInfo.total_Room_Plan_Price = room.data().total_Room_Plan_Price;
    roomInfo.total_Plan_Tax = room.data().total_Plan_Tax;
    roomInfo.total_Plan_Price = room.data().total_Plan_Price;

    roomsList.push(roomInfo);
  }

  bookingInfo = { ...booking.data() };
  bookingInfo["roomsList"] = roomsList;

  return bookingInfo;
};

export const getUserBookingInfoNew = async (
  userEmailId: string,
  bookingId: string,
) => {
  const bookingCollectionRef = doc(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
    bookingId,
  );

  let booking = await getDoc(bookingCollectionRef);

  let bookingInfo = new BookingDetails();
  const bookedRoomsCollectionRef = collection(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    userEmailId,
    BOOKED_ROOMS_COLLECTION_NAME,
    bookingId,
    HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  );

  const roomsQuerySnapshot = await getDocs(query(bookedRoomsCollectionRef));

  for (let room of roomsQuerySnapshot.docs) {
    let roomInfo = new RoomDetails();
    roomInfo.num_Children = room.data().num_Children;
    roomInfo.num_Guests = room.data().num_Guests;
    roomInfo.plan_Child_Price = room.data().plan_Children_Price;
    roomInfo.plan_Id = room.data().plan_Id;
    roomInfo.plan_Info = room.data().plan_Info;
    roomInfo.plan_Name = room.data().plan_Name;

    roomInfo.priceBreakUp = room.data().priceBreakUp;

    roomInfo.plan_Room_Price = room.data().plan_Room_Price;
    roomInfo.plan_Tax = room.data().plan_Tax;
    roomInfo.plan_Price = room.data().plan_Price;

    // if (room.data().priceBreakUp) {
    //   for (let pd of room.data().priceBreakUp) {
    //     roomInfo.plan_Room_Price += +pd.basePrice;
    //     roomInfo.plan_Tax += +pd.basePrice;
    //     roomInfo.plan_Tax += +pd.taxPrice;
    //     roomInfo.plan_Price += +pd.totalPrice;
    //   }
    // }

    // if (Math.floor(roomInfo.plan_Room_Price) === 0) {
    //   roomInfo.plan_Room_Price = room.data().plan_Room_Price;
    //   roomInfo.plan_Tax = room.data().plan_Tax;
    //   roomInfo.plan_Price = room.data().plan_Price;
    // }

    roomInfo.room_Count = room.data().room_Count;
    roomInfo.room_Guest_Occupancy = room.data().room_Guest_Occupancy;
    roomInfo.room_Id = room.id;
    roomInfo.room_Name = room.data().room_Name;
    roomInfo.room_Info = room.data().room_Info;

    roomInfo.total_Room_Plan_Price = room.data().total_Room_Plan_Price;
    roomInfo.total_Plan_Tax = room.data().total_Plan_Tax;
    roomInfo.total_Plan_Price = room.data().total_Plan_Price;

    bookingInfo.roomsList.push(roomInfo);
  }

  bookingInfo.booking_Cancelled_Status =
    booking.data()?.booking_Cancelled_Status;
  bookingInfo.booking_Checkin_Status = booking.data()?.booking_Checkin_Status;
  bookingInfo.booking_Noshow_Status = booking.data()?.booking_Noshow_Status;
  bookingInfo.booking_Status = booking.data()?.booking_Status;

  bookingInfo.booking_Time = booking.data()?.booking_Time;
  bookingInfo.checkin_Time = booking.data()?.checkin_Time;
  bookingInfo.checkout_Time = booking.data()?.checkout_Time;

  bookingInfo.hotel_Slug_Name = booking.data()?.hotel_Slug_Name;
  bookingInfo.hotel_Firebase_Id = booking.data()?.hotel_Firebase_Id;
  bookingInfo.hotel_Name = booking.data()?.hotel_Name;
  bookingInfo.hotel_Image_Url = booking.data()?.hotel_Image_Url;
  bookingInfo.hotel_Landmark = booking.data()?.hotel_Landmark;
  bookingInfo.hotel_Owner_Id = booking.data()?.hotel_Owner_Id;
  bookingInfo.hotel_Handling_Charges =
    booking.data()?.hotel_Handling_Charges || 0;

  bookingInfo.receipt_Id = booking.data()?.receipt_Id;
  bookingInfo.total_Guests_Count = booking.data()?.total_Guests_Count;
  bookingInfo.total_Rooms_Count = booking.data()?.total_Rooms_Count;
  bookingInfo.total_Children_Count = booking.data()?.total_Children_Count;

  bookingInfo.payment_Made = booking.data()?.payment_Made;
  bookingInfo.amount_Paid = booking.data()?.amount_Paid;
  bookingInfo.razorpay_Order_Id = booking.data()?.razorpay_Order_Id;
  bookingInfo.razorpay_Payment_Id = booking.data()?.razorpay_Payment_Id;
  bookingInfo.razorpay_Signature_Id = booking.data()?.razorpay_Signature_Id;

  bookingInfo.user_Unique_Id = booking.data()?.user_Unique_Id;
  bookingInfo.user_Name = booking.data()?.user_Name;
  bookingInfo.user_Email_Id = booking.data()?.user_Email_Id;
  bookingInfo.user_Phone_Number = booking.data()?.user_Phone_Number;
  bookingInfo.user_Address = booking.data()?.user_Address;

  bookingInfo.total_Room_Cost = booking.data()?.total_Room_Cost;
  bookingInfo.total_Tax = booking.data()?.total_Tax;
  bookingInfo.total_Price = booking.data()?.total_Price;

  return bookingInfo;
};
