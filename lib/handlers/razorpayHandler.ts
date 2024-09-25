import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { bookingConfirmationRedirector } from "../firebase/bookingHandler";
import { payAtHotelApiBookingHandler } from "./hotelBookingApiHandler";
declare var window: any;

const retryRazorpayHandler = async (
  fn: () => Promise<any>,
  retries: number = 3,
  delay: number = 2000,
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      if (attempt === retries) {
        throw new Error(
          "Max retries reached. Failing Razorpay response handling...",
        );
      }
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export const paymentSignatureConfirmation = async (
  razorpayPaymentResponse: any,
): Promise<boolean> => {
  const response = await fetch("/api/booking/razorpayPaymentSignature", {
    method: "POST",
    body: JSON.stringify({
      response: razorpayPaymentResponse,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const data = await response.json();
    if (data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const initializeRazorpay = (userBooking: BookingDetails) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const makeRazorpayPayment = async (
  router: any,
  userBooking: BookingDetails,
  setErrorMessage: Function,
  setErrorModel: Function,
  setLoadingModel: Function,
) => {
  const res = await initializeRazorpay(userBooking);

  if (!res) {
    alert("Razorpay SDK Failed to load");
    setErrorMessage("Razorpay SDK Failed to load! Please try again.");
    setLoadingModel(false);
    setErrorModel(true);
    return;
  }

  // Make API call to the serverless API
  const data = await fetch("/api/booking/razorpay", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((t) => t.json());
  // const receiptId = data.id;
  const amountPaid = data.amount / 100;

  var options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    name: "StayBook",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: "Staybook Hotel Booking",
    image: "/brand_logo.svg",
    handler: async function (response: {
      razorpay_payment_id: any;
      razorpay_order_id: any;
      razorpay_signature: any;
    }) {
      try {
        await retryRazorpayHandler(
          async () => {
            if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
              throw new Error("Incomplete Razorpay response");
            }
            try {
              userBooking.razorpay_Payment_Id = response.razorpay_payment_id;
              userBooking.razorpay_Order_Id = response.razorpay_order_id;
              userBooking.razorpay_Signature_Id = response.razorpay_signature;
            } catch (err1) {}

            let paymentStatus = true;
            try {
              const paymentConfirmation =
                await paymentSignatureConfirmation(response);
              paymentStatus = paymentConfirmation;
            } catch (err2) {}

            if (paymentStatus) {
              userBooking.amount_Paid = userBooking.paying_Amount;
              userBooking.payment_Made = true;
              userBooking.payment_Gateway = "razorpay";
              setLoadingModel(true);

              // make the api call to send the user the email of their booking
              const bookingRes = await payAtHotelApiBookingHandler(userBooking);

              if (bookingRes.status) {
                userBooking.booking_Id = bookingRes.booking_Id;
                userBooking.receipt_Id = bookingRes.receipt_Id;
                bookingConfirmationRedirector(
                  router,
                  bookingRes.booking_Id,
                  bookingRes.receipt_Id,
                  userBooking,
                );
              } else {
                setErrorMessage("Invalid booking Id! Please try again.");
                setLoadingModel(false);
                setErrorModel(true);
              }
            } else {
              setErrorMessage("Booking Failed! Please try again.");
              setLoadingModel(false);
              setErrorModel(true);
            }
          },
          3,
          2000,
        );
      } catch (error) {
        setErrorMessage("Booking Failed! Please try again.");
        setLoadingModel(false);
        setErrorModel(true);
      }
    },
    prefill: {
      name: userBooking.user_Name,
      email: userBooking.user_Email_Id,
      contact: userBooking.user_Phone_Number,
    },
    notes: {
      address: userBooking.user_Address,
    },
    theme: {
      color: "#CF8F24",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  return;
};
