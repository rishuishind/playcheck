import { BookingDetails } from "../classModels/bookings/bookingDetails";

export const initializeCCAvenue = async (userBooking: BookingDetails) => {
  const response = await fetch("/api/paymentGateway/CCAvenue/ccavenue", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const makeCCAvenuePayment = async (
  router: any,
  userBooking: BookingDetails,
  setErrorMessage: Function,
  setErrorModel: Function,
  setLoadingModel: Function
) => {
  const res = await initializeCCAvenue(userBooking);

  if (!res) {
    alert("CCAvenue SDK Failed to load");
    setErrorMessage("CCAvenue SDK Failed to load! Please try again.");
    setLoadingModel(false);
    setErrorModel(true);
    return;
  }
};
