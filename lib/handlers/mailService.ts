import { BookingDetails } from "../classModels/bookings/bookingDetails";

export const sendUserBookingConfirmationMail = async (
  userBooking: BookingDetails,
  checkInDate: string,
  checkOutDate: string,
  hotelStars: string,
  bookingMessage: string,
  roomsInfo: string
) => {
  const response = await fetch("/api/userBookingMail", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      hotelStars: hotelStars,
      bookingMessage: bookingMessage,
      roomsInfo: roomsInfo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const sendHotelierBookingConfirmationMail = async (
  userBooking: BookingDetails,
  checkInDate: string,
  checkOutDate: string,
  hotelStars: string,
  bookingMessage: string,
  roomsInfo: string
) => {
  const response = await fetch("/api/hotelierBookingMail", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      hotelStars: hotelStars,
      bookingMessage: bookingMessage,
      roomsInfo: roomsInfo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
