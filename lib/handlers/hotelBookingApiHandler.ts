import { BookingDetails } from "../classModels/bookings/bookingDetails";
import { RoomDetails } from "../classModels/bookings/roomDetails";
import {
  countRoomsAndPlans,
  formatDateForBookingMail,
  generateStars,
} from "../helper";

export const payAtHotelApiBookingHandler = async (
  userBooking: BookingDetails,
) => {
  // let checkInDate = formatDateForBookingMail(userBooking.checkin_Time);
  // let checkOutDate = formatDateForBookingMail(userBooking.checkout_Time);
  // let hotelStars = generateStars(userBooking.hotel_Star_Rating);

  // // generate booking message
  // let bookingMessage = "";
  // if (userBooking.amount_Paid === userBooking.total_Price) {
  //   bookingMessage = `You have paid the full amount (₹${Math.ceil(
  //     userBooking.amount_Paid,
  //   )}) in advance.`;
  // } else if (userBooking.amount_Paid > 0) {
  //   bookingMessage = `You have paid partial amount (₹${Math.ceil(
  //     userBooking.amount_Paid,
  //   )}) in advance.`;
  // } else {
  //   bookingMessage = `You have to pay the remaining booking amount of INR ₹${
  //     Math.ceil(userBooking.total_Price) + userBooking.hotel_Handling_Charges
  //   } at the time of check-in.`;
  // }

  // // whatsAppAPICaller(userBooking, checkInDate, checkOutDate, bookingMessage);

  // // new rooms lists
  // let roomsInfo = countRoomsAndPlans(userBooking.roomsList);

  // // total guest and child count object
  // let totalCounts = {
  //   totalRoomCount: 0,
  //   totalGuestCount: 0,
  //   totalChildCount: 0,
  // };
  // userBooking.roomsList.forEach((room: RoomDetails) => {
  //   totalCounts.totalRoomCount += room.room_Count;
  //   totalCounts.totalGuestCount += room.num_Guests;
  //   totalCounts.totalChildCount += room.num_Children;
  // });

  try {
    const response = await fetch("/api/hotelBooking/hotelBooking", {
      method: "POST",
      body: JSON.stringify({
        userBooking: userBooking,
        // checkInDate: checkInDate,
        // checkOutDate: checkOutDate,
        // hotelStars: hotelStars,
        // bookingMessage: bookingMessage,
        // roomsInfo: roomsInfo,
        // totalCounts: totalCounts,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: false,
      userCredentials: null,
      ownerCredentials: null,
      booking_Id: "",
      receipt_Id: "",
      error,
      message: "Error occoured",
    };
  }
};

export const airpayHotelApiBookingHandler = async (
  userBooking: BookingDetails,
) => {
  let checkInDate = formatDateForBookingMail(userBooking.checkin_Time);
  let checkOutDate = formatDateForBookingMail(userBooking.checkout_Time);
  let hotelStars = generateStars(userBooking.hotel_Star_Rating);

  // generate booking message
  let bookingMessage = "";
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

  // whatsAppAPICaller(userBooking, checkInDate, checkOutDate, bookingMessage);

  // new rooms lists
  let roomsInfo = countRoomsAndPlans(userBooking.roomsList);

  // total guest and child count object
  let totalCounts = {
    totalRoomCount: 0,
    totalGuestCount: 0,
    totalChildCount: 0,
  };
  userBooking.roomsList.forEach((room: RoomDetails) => {
    totalCounts.totalRoomCount += room.room_Count;
    totalCounts.totalGuestCount += room.num_Guests;
    totalCounts.totalChildCount += room.num_Children;
  });

  const response = await fetch("/api/airpay/airpayHotelBooking", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      hotelStars: hotelStars,
      bookingMessage: bookingMessage,
      roomsInfo: roomsInfo,
      totalCounts: totalCounts,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
