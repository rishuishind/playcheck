import jwt_decode from "jwt-decode";
import moment from "moment";
import { format, parse } from "date-fns";
import { RoomDetails } from "../classModels/bookings/roomDetails";
import { formatDateToCustomString } from "./timestampToDate";

// Cached booking info
export const CACHED_BOOKING_TOKEN = "booking-details";
export const CACHED_BOOKING_EXPIRATOIN_TIME = 42 * 60; // 42 min booking expiry time

// Website Logo Url Constants
export const TAB_IMAGE_URL: string = "/brand_logo.svg";
export const LOGO_IMAGE_URL1: string =
  "https://images.staybook.in/Frame%201162.jpg";
export const LOGO_IMAGE_URL2: string =
  "https://drive.google.com/drive/u/0/folders/1ORN-WA9EACd4OLpvQSvwMMY9BgrD54Rl";
export const STAYBOOK_PAYMENT_STATUS: string = "staybook-payment-option";

// Webpage Description Firebase Constants
export const STAYBOOK_HOTEL_PAGE_COLLECTION_NAME: string =
  "STAYBOOK-HOTEL-PAGE-INFORMATION";
export const ALL_HOTELS_PAGE_CONSTANT: string = "ALL-HOTELS-PAGE-DESCRIPTION";
export const HOTELS_REGIONS_PAGE_CONSTANT: string =
  "HOTELS-REGIONS-PAGE-DESCRIPTION";
export const HOTELS_SEARCH_PAGE_CONSTANT: string =
  "HOTELS-SEARCH-PAGE-DESCRIPTION";
export const HOME_PAGE_CONSTANT: string = "HOME-PAGE-DESCRIPTION";
export const ABOUT_US_PAGE_CONSTANT: string = "ABOUT-US-PAGE-DESCRIPTION";
export const LOGIN_PAGE_CONSTANT: string = "LOGIN-PAGE-DESCRIPTION";
export const CONTACT_US_PAGE_CONSTANT: string = "CONTACT-US-PAGE-DESCRIPTION";
export const TOUR_AND_PACKAGES_PAGE_CONSTANT: string =
  "TOUR-AND-PACKAGES-PAGE-DESCRIPTION";
export const PRIVACY_POLICY_PAGE_CONSTANT: string =
  "PRIVACY-POLICY-PAGE-DESCRIPTION";
export const REFUND_POLICY_PAGE_CONSTANT: string =
  "REFUND-POLICY-PAGE-DESCRIPTION";
export const TERMS_AND_CONDITIONS_POLICY_PAGE_CONSTANT: string =
  "TERMS-AND-CONDITION-PAGE-DESCRIPTION";

// STAYBOOK Hotel Bookings Firebase Constants
export const STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME: string =
  "STAYBOOK-BOOKINGS-STATISTICAL-INFORMATION";
export const STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME =
  "hotel-bookings-information";
export const STAYBOOK_HOTEL_YEARLY_BOOKINGS_COLLECTION_NAME: string =
  "HOTEL-YEARLY-BOOKINGS-INFORMATION";
export const STAYBOOK_HOTEL_MONTHLY_BOOKINGS_COLLECTION_NAME: string =
  "HOTEL-MONTHLY-BOOKINGS-INFORMATION";
export const STAYBOOK_HOTEL_DAILY_BOOKINGS_COLLECTION_NAME: string =
  "HOTEL-DAILY-BOOKINGS-INFORMATION";
export const STAYBOOK_HOTEL_BOOKINGS_COLLECTION_NAME: string =
  "STAYBOOK-HOTEL-BOOKINGS-INFORMATION";
export const STAYBOOK_HOTEL_CHECKIN_BOOKINGS_COLLECTION_NAME: string =
  "STAYBOOK-HOTEL-CHECKIN-BOOKINGS-INFORMATION";

// STAYBOOK Destination Firebase Constants
export const TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME: string =
  "TRAVEL-DESTINATION-LOCATION-INFORMATION";
export const TRAVEL_DESTINATION_IMAGES_COLLECTION_NAME: string =
  "TRAVEL-DESTINATION-IMAGES-DETAILS-INFORMATION";
export const VISITING_PLACES_DESTINATION_COLLECTION_NAME: string =
  "VISITING-PLACES-DESTINATION-INFORMATION";

// STAYBOOK Tour & Travels Firebase Constants
export const TOUR_AND_TRAVELS_PACKAGE_COLLECTION_NAME: string =
  "TOUR-AND-TRAVELS-PACKAGE-INFORMATION";

// Website MetaTags Constants
export const HOME_PAGE_TAB_TITLE: string =
  "Staybook Hotels: Affordable Hotels Rooms- Official Booking Website";
export const HOME_PAGE_META_DESCRIPTION: string =
  "Create memories with Staybook Hotels. Experience exceptional hospitality, magnificent accommodations, and a range of top-notch facilities.";
export const ABOUT_US_PAGE_TAB_TITLE: string =
  "Our Story: Redefine Hospitality at Staybook Hotels";
export const ABOUT_US_PAGE_META_DESCRIPTION: string =
  "Learn more about Staybook Hotels and our commitment about how we can make your stay unforgettable. we provide a seamless booking experience with Staybook Hotels.";
export const LOGIN_PAGE_TAB_TITLE: string =
  "Welcome- Login To Your Staybook Account";
export const LOGIN_PAGE_META_DESCRIPTION: string =
  "Become our member to get exclusive dicounts and acess your reservation and other offerings. Secure login process";
export const CONTACT_US_PAGE_TAB_TITLE: string =
  "Reach Out To Us: Contact Staybook.in for exceptional support";
export const CONTACT_US_PAGE_META_DESCRIPTION: string =
  "For prompt reliable assistance, Staybook reservation team available 24/7 to assist every queries. Feel free to contact us to know more for hassle free reservation. ";
export const FAQ_PAGE_TAB_TITLE: string =
  "Staybook Hotels FAQs: Answers to Common Queries | Staybook.com";
export const FAQ_PAGE_META_DESCRIPTION: string =
  "Explore our comprehensive Staybook Hotels FAQs for information on reservations, accommodations, amenities, policies, and more. Get answers to common queries for a seamless booking experience with Staybook Hotels.";
export const TOUR_PACKAGES_PAGE_TAB_TITLE: string =
  "Tour Packages: Explore Our Customizable Tour Packages- Staybook";
export const TOUR_PACKAGES_PAGE_META_DESCRIPTION: string =
  "Browse through a wide range of options. Checkout our special offering and discover beautiful destination to create memories for lifetime";
export const PRIVACY_POLICY_PAGE_TAB_TITLE: string =
  "Your Privacy Metters: Learn More About Privacy Policy";
export const PRIVACY_POLICY_PAGE_META_DESCRIPTION: string =
  "Review our privacy policy to understand how we prioritize data security, handle your personal informations";
export const REFUND_POLICY_PAGE_TAB_TITLE: string =
  "Your Satisfaction Is Important: Explore Our Refund Policy";
export const REFUND_POLICY_PAGE_META_DESCRIPTION: string =
  "Learn more about refund policy and gain clear understanding about our refund policy ";
export const TERMS_AND_CONDITION_PAGE_TAB_TITLE: string =
  "Terms & Conditions : Explore Our Terms and Conditions";
export const TERMS_AND_CONDITION_PAGE_META_DESCRIPTION: string =
  "Cancelation Policy | Discover the Terms & Condition for a seamless reservation and stay. Learn about our services, and important information";
export const FORGOT_PASSWORD_PAGE_TAB_TITLE: string =
  "Forgot Password? Recover Your Account | Staybook";
export const FORGOT_PASSWORD_PAGE_META_DESCRIPTION: string =
  "Recover your account by resetting your password. Our step-by-step guide makes it easy!";
export const RESET_PASSWORD_PAGE_TAB_TITLE: string =
  "Reset Your Password | Staybook";
export const RESET_PASSWORD_PAGE_META_DESCRIPTION: string =
  "Forgot your password? Reset it securely with MyApp's password recovery process. Follow the steps to regain access to your account.";
export const _PAGE_TAB_TITLE: string = "";
export const _PAGE_META_DESCRIPTION: string = "";
export const COUNTRY_INDIA_PAGE_META_TITLE: string =
  "Affordable Hotels in India | Best Price Guarantee | Staybook";
export const COUNTRY_INDIA_PAGE_META_DESCRIPTION: string =
  "Looking for affordable hotels in India? Staybook offers the lowest prices guaranteed. Explore our wide range of hotels and book your stay today.";
export const LOCAL_BUSINESS_HOTEL_META_TITLE: string =
  "Staybook Hotels: Affordable Hotels Rooms- Official Booking Website";
export const LOCAL_BUSINESS_HOTEL_META_DESCRIPTION: string =
  "Learn more about Staybook Hotels and our commitment about how we can make your stay unforgettable.";
export const LOCAL_BUSINESS_HOTEL_META_IMAGE_URL: string =
  "Staybook Hotels: Affordable Hotels Rooms- Official Booking Website";

// Web-Page Url Constants
export const TOUR_PACKAGES_URL = "/packages";
export const BLOGS_URL = "/blogs";
export const ABOUT_US_URL = "/aboutus";
export const CONTACT_US_URL = "/contactUs";
export const FREQUENTLY_ASKED_QUESTIONS_URL = "/faq";
export const TERMS_AND_CONDITIONS_URL = "/termscondition";
export const PRIVACY_POLICY_URL = "/privacypolicy";
export const REFUND_POLICY_URL = "/refundpolicy";
export const CANCELLATION_POLICY_URL = "/cancellationpolicy";
export const PROFILE_URL = "/profile";
export const FORGOT_PASSWORD_URL = "/forgotPassword";
export const RESET_PASSWORD_URL = "/resetPassword";
export const LOGIN_URL = "/login";
export const TRAVEL_URL = "/travel";
export const TOUR_URL = "/tours";
export const HOTELS_URL = "/hotels";
export const EVISA_URL = "/indian-e-visa";

// Hotel Info Page ID's
export const IAMGE_GALLERY_INFO_ID = "image-gallery-info";
export const CONTACT_INFO_ID = "contact-info";
export const ROOMS_INFO_ID = "romos-info";
export const HOTEL_INFO_ID = "hotel-info";
export const HOTEL_AMENITIES_ID = "hotel-amenities";
export const NEARBY_PLACES_ID = "nearby-places";
export const BOOKING_USER_INFO_ID = "booking-user-info";
export const FAQS_INFO_ID = "hotel-faqs";
export const HOTEL_SELECTION_CARD_ID = "selection-card";
export const HOTEL_REVIEWS_INFO_ID = "hotel-user-reviews";
export const HOTEL_NEARBY_PLACES_ID = "hotel-nearby-places";

// Social Media URLs
export const INSTAGRAM_URL = "https://www.instagram.com/staybook_in/";
export const FACEBOOK_URL =
  "https://www.facebook.com/budgetfriendlyhotel?paipv=0&eav=AfZ-waWz6OajACPaAqHeTptaNS9Rt4i4iwbdVK0jE5KwoQfbZ6GsLkTVHLjTpMMeyxk";
export const TWITTER_URL = "https://twitter.com/Staybook_exp";

// User Authentication Constants
export const EMAIL_SIGNUP = "email-sign-up";
export const EMAIL_LOGIN = "email-log-in";
export const GOOGLE_SIGNUP = "google-sign-up";
export const GOOGLE_LOGIN = "google-log-in";
export const USER_ACCESS_TOKEN = "user-access-token";
export const USER_COLLECTION_NAME = "USER-PERSONAL-INFORMATION";
export const COOKIE_EXPIRATOIN_TIME = 30 * 24 * 60 * 60;
export const GET_USER_TOKEN_OBJECT = "get-user-token-obj";
export const USER_UPDATE_TYPE_NAME = "update-user-name";

// Hotel Details Constants
export const HOTEL_DETAILS_INFORMATION_COLLECTION_NAME =
  "HOTEL-DETAILS-INFORMATION";
export const HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME =
  "HOTEL-IMAGES-DETAILS-INFORMATION";
export const HOTEL_ROOMS_INFORMATION_COLLECTION_NAME =
  "HOTEL-ROOMS-DETAILS-INFORMATION";
export const HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME =
  "HOTEL-ROOM-PLAN-DETAILS-INFORMATION";
export const HOTEL_NEARBY_PLACES_INFORMATION_COLLECION_NAME =
  "HOTEL-NEARBY-PLACES-INFORMATION";
export const HOTEL_AMENITIES_INFORMATION_COLLECION_NAME =
  "HOTEL-AMENITIES-INFORMATION";
export const HOTEL_ROOM_AMENITIES_INFORMATION_COLLECION_NAME =
  "HOTEL-ROOM-AMENITIES-INFORMATION";
export const HOTEL_ROOM_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME =
  "HOTEL-ROOM-IMAGES-DETAILS-INFORMATION";
export const HOTEL_CARD_AMENITIES_INFORMATION_COLLECION_NAME =
  "HOTEL-CARD-AMENITIES-INFORMATION";
export const HOTEL_FAQ_INFORMATION_COLLECION_NAME = "HOTEL-FAQ-INFORMATION";
export const HOTEL_USER_REVIEWS_COLLECON_NAME = "HOTEL-USER-REVIEW-INFORMATION";
export const STAYBOOK_DAILY_BOOKINGS_COLLECTION_NAME =
  "STAYBOOK-DAILY-BOOKINGS-INFORMATION";
export const HOTEL_CONTROL_CENTER_COLLECTION_NAME =
  "GOOGLE-HOTEL-CENTER-INFORMATION";
export const HOTEL_GOOGLE_REVIEWS_INFORMATION =
  "HOTEL-GOOGLE-REVIEWS-INFORMATION";

// Hotel City & Regions Constants
export const HOTEL_COUNTRY_COLLECTION_NAME = "HOTEL-COUNTRY-INFORMATION";
export const HOTEL_COUNTRY_INDIA_DOCUMENT_NAME = "hotels-in-IN";
export const HOTEL_CITY_COLLECTION_NAME = "HOTEL-CITY-INFORMATION";
export const HOTEL_CITY_REGION_COLLECTION_NAME =
  "HOTEL-CITY-REGION-INFORMATION";

// Hotel Owner Information
export const HOTEL_OWNER_DETAILS_INFORMATION_COLLECTION_NAME =
  "HOTEL-OWNER-DETAILS-INFORMATION";
export const AFFILIATED_HOTEL_DETAILS_COLLECTION_NAME =
  "AFFILIATED-HOTEL-DETAILS-INFORMATION";

// Booking Hotels Constants
export const HOTEL_BOOKINGS_COLLECTION_NAME = "HOTEL-BOOKINGS-INFORMATION";
export const BOOKED_ROOMS_COLLECTION_NAME = "HOTEL-BOOKINGS";
export const USER_BOOKINGS_COLLECTION_NAME = "USER-BOOKINGS-INFORMATION";
export const HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME = "BOOKED-ROOMS-INFORMATION";

// Amenities Collection Constant
export const HOTEL_AMENITIES_COLLECTION_NAME = "HOTEL-AMENITIES-INFORMATION";

// Hotel Regions Collection Constant
export const HOTEL_REGION_COLLECTION_NAME = "HOTEL-REGIONS-INFORMATION";

// -----------------------------------------------------------------------------------------------------

// Price Planner Constants
export const AFFILIATED_COLLECTION_NAME = "AFFLIATED-HOTELS";
export const HOTEL_ROOMS_COLLECTION_NAME = "HOTEL-ROOMS";
export const ROOM_PLANS_COLLECTION_NAME = "ROOM-PLANS";
export const ROOM_PRICE_PLANNER_COLLECTION_NAME =
  "ROOM-PRICE-PLANNER-INFORMATION";
export const PLAN_PRICE_PLANNER_COLLECTION_NAME =
  "PLAN-PRICE-PLANNER-INFORMATION";

export const YEAR_PLANNER_COLLECTION_NAME = "YEAR-PLANNER-INFORMATION";
export const MONTH_PLANNER_COLLECTION_NAME = "MONTH-PLANNER-INFORMATION";
export const DAY_PLANNER_COLLECTION_NAME = "DAY-PLANNER-INFORMATION";
export const HOTEL_PRICE_PLANNER_COLLECTION_NAME =
  "HOTEL-PRICE-PLANNER-INFORMATION";
export const HOTEL_INVENTORY_PLANNER_COLLECTION_NAME =
  "HOTEL-INVENTORY-PLANNER-INFORMATION";

export const MONTH_NAME_LIST = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

export function addDays(
  startDate: string | number | Date,
  numberOfDays: number,
): Date {
  const result = new Date(startDate);
  result.setDate(result.getDate() + numberOfDays);
  return result;
}

export function subtractDays(
  startDate: string | number | Date,
  numberOfDays: number,
): Date {
  const result = new Date(startDate);
  result.setDate(result.getDate() - numberOfDays);
  return result;
}

export function compareDate(d1: Date, d2: Date): boolean {
  if (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  ) {
    return true;
  } else return false;
}

export const formatDateForBookingMail = (checkin_Time: Date) => {
  try {
    let day = checkin_Time.getDate();
    let month = checkin_Time.getMonth() + 1;
    let year = checkin_Time.getFullYear();

    let dateVal = "",
      monthVal = "",
      yearVal = "";
    if (day < 10) dateVal = `0${day}`;
    else dateVal = `${day}`;

    if (month < 10) monthVal = `0${month}`;
    else monthVal = `${month}`;

    yearVal = `${year}`;

    return [dateVal, monthVal, yearVal].join("/");
  } catch (error) {
    try {
      let given_date = new Date(checkin_Time);

      let day = given_date.getDate();
      let month = given_date.getMonth() + 1;
      let year = given_date.getFullYear();

      let dateVal = "",
        monthVal = "",
        yearVal = "";
      if (day < 10) dateVal = `0${day}`;
      else dateVal = `${day}`;

      if (month < 10) monthVal = `0${month}`;
      else monthVal = `${month}`;

      yearVal = `${year}`;

      return [dateVal, monthVal, yearVal].join("/");
    } catch (err) {
      let given_date = new Date();

      let day = given_date.getDate();
      let month = given_date.getMonth() + 1;
      let year = given_date.getFullYear();

      let dateVal = "",
        monthVal = "",
        yearVal = "";
      if (day < 10) dateVal = `0${day}`;
      else dateVal = `${day}`;

      if (month < 10) monthVal = `0${month}`;
      else monthVal = `${month}`;

      yearVal = `${year}`;

      return [dateVal, monthVal, yearVal].join("/");
    }
  }
};

export const generateStars = (num: number) => {
  let stars = "";
  for (let i = 0; i < num; i++) {
    stars += "&#9733;";
  }
  return stars;
};

export function getDateDifference(startDate: Date, endDate: Date): number {
  let sd = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  let ed = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );
  var timeDiff = ed.getTime() - sd.getTime();
  var dayDiff = timeDiff / (1000 * 3600 * 24);

  return Math.floor(dayDiff);
}

export async function getErrorMessage(errorValue: String) {
  if (errorValue === "auth/wrong-password") {
    return "Wrong combination of the credentials!";
  } else if (errorValue === "auth/email-already-in-use") {
    return "Email already is in use!";
  } else {
    return errorValue;
  }
}

export const extractJWTValues = async (token: any) => {
  try {
    const decodedValue = await jwt_decode(token);
    return decodedValue;
  } catch (error) {
    return null;
  }
};

export const stringToDate = (dt: string) => {
  let date = +dt.split("-")[0];
  let month = +dt.split("-")[1] - 1;
  let year = +dt.split("-")[2];

  return new Date(Date.UTC(year, month, date));
};

const checkUrlDateFormat = (date: string) => {
  let n = String(date).length;
  if (n !== 10) return false;
  let list = date.toString().split("-");
  if (list.length !== 3) return false;
  if (list[0].length !== 2 || list[1].length !== 2 || list[2].length !== 4)
    return false;
  for (let number of list) {
    if (typeof Number(number) !== "number") return false;
  }
  return true;
};

export const ariDateFormat = (fullDate: Date) => {
  const list = [
    "",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const yearVal = fullDate.getFullYear();
  const monthVal = fullDate.getMonth() + 1;
  const dateVal = fullDate.getDate();

  const val = `${yearVal}-${list[monthVal]}-${list[dateVal]}`;
  return val;
};

export const searchDateFormat = (fullDate: Date) => {
  const list = [
    "",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const yearVal = fullDate.getFullYear();
  const monthVal = fullDate.getMonth() + 1;
  const dateVal = fullDate.getDate();

  const val = `${list[dateVal]}-${list[monthVal]}-${yearVal}`;
  return val;
};

export const unixToDate = async (timeStamp: any) => {
  const dateObj = new Date(Number(timeStamp) * 1000);
  return dateObj;
};

export const authenticateStartAndEndDate = (
  checkin: string,
  checkout: string,
): boolean => {
  let f1 = checkUrlDateFormat(checkin);
  let f2 = checkUrlDateFormat(checkout);
  if (!f1 || !f2) return false;
  let currDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  let cin = moment(checkin, "DD-MM-YYYY").toDate();
  let cout = moment(checkout, "DD-MM-YYYY").toDate();

  if (cin < currDate || cout < currDate || cout <= cin) {
    return false;
  } else return true;
};

export const JsonStringifyReplacer = (key: any, value: any) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
};

export const JsonParseReviver = (key: any, value: any) => {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
};

export const formatDateToIST = (enteredDate: Date = new Date()): Date => {
  const date = new Date(
    enteredDate.getFullYear(),
    enteredDate.getMonth(),
    enteredDate.getDate(),
    enteredDate.getHours(),
    enteredDate.getMinutes(),
    enteredDate.getSeconds(),
  );

  const dateFormat = date.toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  const istDate = moment(dateFormat, "DD/MM/YYYY, hh:mm").toDate();

  return istDate;
};

export const hotelPageQueryHandler = (query: any) => {
  let checkin = new Date();
  let checkout = addDays(new Date(), 1);
  let num_nights = 1;
  let num_guests = 2;
  let num_adults = 2;
  let num_children = 0;
  let num_rooms = 1;
  let roomId = "";
  let planId = "";
  let childAgeList = [];

  let dChk = authenticateStartAndEndDate(query.checkin, query.checkout);
  if (dChk) {
    checkin = stringToDate(query.checkin);
    checkout = stringToDate(query.checkout);
    num_nights = getDateDifference(checkin, checkout);
  }

  if (query.num_adults) {
    let parsed: number = parseInt(query.num_adults, 10);
    if (Number.isInteger(parsed)) {
      num_adults = parsed;
    }
  }
  if (query.num_children) {
    let parsed: number = parseInt(query.num_children, 10);
    if (Number.isInteger(parsed)) {
      num_children = parsed;
    }
  }
  if (query.num_guests) {
    let parsed: number = parseInt(query.num_guests, 10);
    if (Number.isInteger(parsed)) {
      num_guests = parsed;
    }
  }
  if (query.num_rooms) {
    let parsed: number = parseInt(query.num_rooms, 10);
    if (Number.isInteger(parsed)) {
      num_rooms = parsed;
    }
  }
  if (query.roomId) {
    roomId = String(query.roomId);
  }
  if (query.planId) {
    planId = String(query.planId);
  }
  if (query.child_age) {
    const childAgeArray = Array.isArray(query.child_age)
      ? query.child_age
      : [query.child_age];
    childAgeList = childAgeArray.map((ageStr: any) => {
      const [idx, age] = ageStr.split("_").map(Number);
      return { idx, age, price: 0, status: true };
    });
  }

  if (num_guests < 1) num_guests = 1;
  if (num_adults < 1) num_adults = 1;
  // if (num_guests > 16) num_guests = 16;
  if (num_rooms < 1) num_rooms = 1;
  // if (num_rooms > 8) num_rooms = 8;
  if (num_children < 0) num_children = 0;
  // if (num_children > 2 * num_rooms) num_children = 2 * num_rooms;

  return {
    checkin,
    checkout,
    num_nights,
    num_guests,
    num_adults,
    num_children,
    childAgeList,
    num_rooms,
    roomId,
    planId,
  };
};

export function planTaxCalculator(amount: number): number {
  if (amount <= 7500) {
    // apply 12% tax
    return amount * 0.12;
  } else {
    // apply 18% tax
    return amount * 0.18;
  }
}

export const formatTimestampToDateType = (input: any) => {
  let date = new Date();

  if (typeof input === "string") {
    date = new Date(input);
    date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
    date.setUTCMinutes(date.getUTCMinutes() + 30); // Adjust for IST
  } else {
    const milliseconds = input.seconds * 1000 + input.nanoseconds / 1e6;
    date = new Date(milliseconds);

    // Convert to IST
    date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
    date.setUTCMinutes(date.getUTCMinutes() + 30);
  }
  return date;
};

export function formatTimestampToDate(input: any) {
  let date = new Date();

  if (typeof input === "string") {
    date = new Date(input);
    date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
    date.setUTCMinutes(date.getUTCMinutes() + 30); // Adjust for IST
  } else {
    const milliseconds = input.seconds * 1000 + input.nanoseconds / 1e6;
    date = new Date(milliseconds);

    // Convert to IST
    // date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
    // date.setUTCMinutes(date.getUTCMinutes() + 30);
  }

  const options: any = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = formatDateToCustomString(date.toISOString());

  return formattedDate;
}

// Function to count rooms and plans
export function countRoomsAndPlans(roomList: RoomDetails[]) {
  try {
    // Object to store a string as a key
    const counts = {};

    // Iterate through roomList
    roomList.forEach((room: any) => {
      // Generate a key based on room_Count, room_Name, plan_Info, num_Guests, and num_Children
      let key = `${room.room_Name} (${room.num_Guests} Guests`;
      if (room.num_Children > 0) {
        key += ` & ${room.num_Children} Children`;
      }
      key += `) (${room.plan_Info})`;

      // If key exists, append the key to existing value
      if (counts[key]) {
        counts[key]++;
      } else {
        counts[key] = room.room_Count;
      }
    });

    // Generate the result string
    let result = "";
    for (const key in counts) {
      if (counts.hasOwnProperty(key)) {
        const count = counts[key];
        result += `${count} x ${key},<br/>`;
      }
    }

    return result;
  } catch (error) {
    return "Room Details.";
  }
}

export const changeFormat = (time) => {
  const parsedTime = parse(time, "HH:mm", new Date());
  // Format the parsed time into 12-hour format with AM/PM indicator
  const formattedTime = format(parsedTime, "h:mm a");
  return formattedTime;
};

export const copyToClipboard = async (text: string) => {
  try {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return "Text copied to clipboard successfully.";
    } else {
      // If Clipboard API is not available, fall back to using document.execCommand
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  } catch (error) {
    console.error("Unable to copy text to clipboard:", error);
  }
};

// function to return a string out of child array
export const convertChildArrayToString = (childArray: number[]): string => {
  const data = childArray.map((value, index) => `${index}_${value}`);
  return data.join("&");
};

// function to return a string out of child array
export const convertChildStringToArray = (urlQuery: any[]): number[] => {
  // input is empty then return empty array
  if (urlQuery == undefined || urlQuery.length == 0) {
    return [];
  }

  const numbers = urlQuery
    .map((item) => {
      const parts = item.split("_");
      return parseInt(parts[1], 10) || 0; // Parse the number after '_' and handle invalid parsing
    })
    .filter((num) => !isNaN(num)); // Filter out non-numeric values

  return numbers;
};

// convert array of numbers into url query
// e.g [5, 7] => child_age=0_5&child_age=1_7
export const convertChildArrayOfNumbersIntoUrlQuery = (
  chilgAgeArray: number[],
): string => {
  // Add all child ages in the desired format
  return chilgAgeArray.map((age, idx) => `child_age=${idx}_${age}`).join("&");
};

// covert child array object into array of numbers
// e.g [{idx: 0, age: 5, price: 0, status: true}, {idx: 1, age: 7, price: 0, status: true}] => [5, 7]
export const convertChildArrayOfObjectsIntoArrayOfNumbers = (
  childArray: any[],
): number[] => {
  const childData = Array.isArray(childArray) ? childArray : [childArray];
  const numbers = childData.map((item, idx) => {
    return item.age;
  });
  return numbers;
};

// covert the router query innto an array of objects
// e.g [0_5, 1_7] => [{idx: 0, age: 5, price: 0, status: true}, {idx: 1, age: 7, price: 0, status: true}]
export const convertChildUrlQueryIntoArrayOfObjects = (childArray: any[]) => {
  if (childArray == undefined || childArray.length == 0) {
    return [];
  }
  const childAgeArray = Array.isArray(childArray) ? childArray : [childArray];
  const childAgeList = childAgeArray.map((ageStr: any) => {
    const [idx, age] = ageStr.split("_").map(Number);
    return { idx, age, price: 0, status: true };
  });
  return childAgeList;
};
