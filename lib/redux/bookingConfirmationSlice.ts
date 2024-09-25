import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RoomDetails } from "../classModels/bookings/roomDetails";
import { addDays, getDateDifference } from "../helper";
import { RootState } from "@/store";
import { HotelRoomPlanInformation } from "../classModels/hotels/hotelRoomPlanInfo";
import { HotelRoomInformation } from "../classModels/hotels/hotelRoomInfo";
import { BookingDetails } from "../classModels/bookings/bookingDetails";
import { HotelInformationDetails } from "../classModels/hotels/hotelInfo";

export interface BookingConfirmationState {
  roomsList: RoomDetails[];
  hotel_Slug_Name: string;
  hotel_Name: string;
  user_Image_Url: string;
  hotel_Image_Url: string;
  hotel_Email_Id: string;
  hotel_Landmark: string;
  hotel_Address: string;
  hotel_Firebase_Id: string;
  hotel_Map_Url: string;
  hotel_Star_Rating: number;
  hotel_Arrival_Time: string;
  hotel_Departure_Time: string;
  hotel_General_Policy: string;
  hotel_Cancellation_Policy: string;
  hotel_Refund_Policy: string;
  hotel_Payment_Option: any;
  hotel_Partial_Payment_Percentage: any;

  checkin_Time: Date;
  checkout_Time: Date;
  num_nights: number;
  room_Map: any;
  room_Plan_Map: any;

  total_Rooms_Count: number;
  total_Guests_Count: number;
  total_Children_Count: number;
  total_Guest_Occupancy: number;

  total_Room_Cost: number;
  total_Tax: number;
  total_Price: number;

  paying_Amount: number;
  amount_Paid: number;
  total_Discount: number;

  user_Unique_Id: string;
  user_Name: string;
  user_First_Name: string;
  user_Last_Name: string;
  user_Email_Id: string;
  user_Phone_Number: string;
  user_Staybook_Coins: number;
  user_Instructions: string;
  user_Address: string;
  user_Pincode: string;
  user_City: string;
  user_State: string;
  user_Country: string;

  booking_Id: string;
  receipt_Id: string;
  payment_Type: string;
  payment_Gateway: string;
  booking_Created_From: string;
  payment_Made: boolean;
  razorpay_Payment_Id: string;
  razorpay_Order_Id: string;
  razorpay_Signature_Id: string;
}

const initialBookingConfirmationState: BookingConfirmationState = {
  roomsList: [],
  hotel_Slug_Name: "",
  hotel_Image_Url: "",
  hotel_Name: "",
  hotel_Email_Id: "",
  hotel_Landmark: "",
  hotel_Firebase_Id: "",
  hotel_Map_Url: "",
  hotel_Address: "",
  hotel_Star_Rating: 0,
  hotel_Arrival_Time: "11:00",
  hotel_Departure_Time: "11:00",
  hotel_General_Policy: "",
  hotel_Cancellation_Policy: "",
  hotel_Refund_Policy: "",
  hotel_Payment_Option: {
    partial_Payment: false,
    postpaid_Payment: true,
    prepaid_Payment: true,
  },
  hotel_Partial_Payment_Percentage: 10,

  checkin_Time: new Date(),
  checkout_Time: addDays(new Date(), 1),
  num_nights: 1,
  room_Map: {},
  room_Plan_Map: {},

  total_Rooms_Count: 0,
  total_Guests_Count: 0,
  total_Children_Count: 0,
  total_Guest_Occupancy: 0,

  total_Room_Cost: 0,
  total_Tax: 0,
  total_Price: 0,

  paying_Amount: 0,
  total_Discount: 0,

  user_Unique_Id: "",
  user_Name: "",
  user_Image_Url: "",
  user_First_Name: "",
  user_Last_Name: "",
  user_Email_Id: "",
  user_Phone_Number: "",
  user_Staybook_Coins: 0,
  user_Instructions: "",
  user_Address: "",
  user_Pincode: "",
  user_City: "",
  user_State: "",
  user_Country: "",

  booking_Id: "",
  receipt_Id: "",
  payment_Type: "Pay at hotel",
  payment_Gateway: "None",
  booking_Created_From: "staybook.in",
  payment_Made: false,
  amount_Paid: 0,
  razorpay_Payment_Id: "",
  razorpay_Order_Id: "",
  razorpay_Signature_Id: "",
};

// Action creators are generated for each case render function
export const bookingConfirmationSlice = createSlice({
  name: "bookingConfirmation",
  initialState: initialBookingConfirmationState,
  reducers: {
    updateBookingIdInfo: (
      state,
      action: PayloadAction<{
        booking_Id: string;
        receipt_Id: string;
      }>,
    ) => {
      state.booking_Id = action.payload.booking_Id;
      state.receipt_Id = action.payload.receipt_Id;
    },
    createHotelBookingInfo: (
      state,
      action: PayloadAction<{
        roomsList: RoomDetails[];
        userName: string;
        userId: string,
        userImageUrl: string;
        userEmailId: string;
        hotelSlugName: string;
        checkInDate: Date;
        checkOutDate: Date;
        numGuests: number;
        numChildren: number;
        numNights: number;
        totalRoomCount: number;
        totalRoomCost: number;
        totalTax: number;
        totalPrice: number;
        totalDiscount: number;
        totalPayingAmount: number;
        roomMap: any;
        roomPlanMap: any;
        bookingId: string;
        receiptId: string;
        formattedCheckinTime: string;
        formattedCheckoutTime: string;
      }>
    ) => {
      state.roomsList = action.payload.roomsList;
      state.user_Name = action.payload.userName;
      state.user_Unique_Id = action.payload.userId;
      state.user_Image_Url = action.payload.userImageUrl;
      state.user_Email_Id = action.payload.userEmailId;
      state.hotel_Slug_Name = action.payload.hotelSlugName;
      state.checkin_Time = action.payload.checkInDate;
      state.checkout_Time = action.payload.checkOutDate;
      state.total_Guests_Count = action.payload.numGuests;
      state.total_Children_Count = action.payload.numChildren;
      state.num_nights = action.payload.numNights;
      state.total_Rooms_Count = action.payload.totalRoomCount;
      state.total_Room_Cost = action.payload.totalRoomCost;
      state.total_Tax = action.payload.totalTax;
      state.total_Price = action.payload.totalPrice;
      state.total_Discount = action.payload.totalDiscount;
      state.paying_Amount = action.payload.totalPayingAmount;
      state.room_Map = action.payload.roomMap;
      state.room_Plan_Map = action.payload.roomPlanMap;

      state.booking_Id = action.payload.bookingId;
      state.receipt_Id = action.payload.receiptId;
    },
    updateHotelInfo: (
      state,
      action: PayloadAction<{
        hotelInfo: HotelInformationDetails;
      }>,
    ) => {
      state.hotel_Slug_Name = action.payload.hotelInfo.hotel_Slug_Name;
      state.hotel_Name = action.payload.hotelInfo.hotel_Name;
      state.hotel_Image_Url = action.payload.hotelInfo.hotel_Image_Url;
      state.hotel_Email_Id = action.payload.hotelInfo.hotel_Email_Id;
      state.hotel_Landmark = action.payload.hotelInfo.hotel_Landmark;
      state.hotel_Address = action.payload.hotelInfo.hotel_Address;
      state.hotel_Firebase_Id = action.payload.hotelInfo.hotel_Firebase_Id;
      state.hotel_Map_Url = action.payload.hotelInfo.hotel_Map_Url;
      state.hotel_Star_Rating = action.payload.hotelInfo.hotel_Star_Rating;
      state.hotel_Arrival_Time = action.payload.hotelInfo.hotel_Checkin_Time;
      state.hotel_Departure_Time = action.payload.hotelInfo.hotel_Checkout_Time;
      state.hotel_General_Policy = action.payload.hotelInfo.hotel_General_Policy.description;
      state.hotel_Cancellation_Policy = action.payload.hotelInfo.hotel_Cancellation_Policy.description;
      state.hotel_Refund_Policy = action.payload.hotelInfo.hotel_Refund_Policy.description;
      state.hotel_Payment_Option = action.payload.hotelInfo.hotel_Payment_Option;
      state.hotel_Partial_Payment_Percentage = action.payload.hotelInfo.partial_Payment_Percentage;
    },
    updateHotelBookingInfo: (
      state,
      action: PayloadAction<{
        bookingDetails: BookingDetails;
      }>,
    ) => {
      state.roomsList = action.payload.bookingDetails.roomsList;
      state.hotel_Slug_Name = action.payload.bookingDetails.hotel_Slug_Name;
      state.hotel_Name = action.payload.bookingDetails.hotel_Name;
      state.hotel_Image_Url = action.payload.bookingDetails.hotel_Image_Url;
      state.hotel_Email_Id = action.payload.bookingDetails.hotel_Email_Id;
      state.hotel_Landmark = action.payload.bookingDetails.hotel_Landmark;
      state.hotel_Firebase_Id = action.payload.bookingDetails.hotel_Firebase_Id;
      state.hotel_Map_Url = action.payload.bookingDetails.hotel_Map_Url;
      state.hotel_Star_Rating = action.payload.bookingDetails.hotel_Star_Rating;


      state.checkin_Time = action.payload.bookingDetails.checkin_Time;
      state.checkout_Time = action.payload.bookingDetails.checkout_Time;
      state.num_nights = action.payload.bookingDetails.num_nights;

      state.total_Rooms_Count = action.payload.bookingDetails.total_Rooms_Count;
      state.total_Guests_Count = action.payload.bookingDetails.total_Guests_Count;
      state.total_Children_Count = action.payload.bookingDetails.total_Children_Count;
      state.total_Room_Cost = action.payload.bookingDetails.total_Room_Cost;
      state.total_Tax = action.payload.bookingDetails.total_Tax;
      state.total_Price = action.payload.bookingDetails.total_Price;
      state.paying_Amount = action.payload.bookingDetails.paying_Amount;
    },
    updateUserBookingInfo: (
      state,
      action: PayloadAction<{
        user_First_Name: string;
        user_Last_Name: string;
        user_Email_Id: string;
        user_Phone_Number: string;
        user_Instructions: string;
        user_Address: string;
        user_Pincode: string;
        user_City: string;
        user_State: string;
        user_Country: string;
      }>,
    ) => {
      state.user_Name = `${action.payload.user_First_Name} ${action.payload.user_Last_Name}`;
      state.user_First_Name = action.payload.user_First_Name;
      state.user_Last_Name = action.payload.user_Last_Name;
      state.user_Email_Id = action.payload.user_Email_Id;
      state.user_Phone_Number = action.payload.user_Phone_Number;
      state.user_Instructions = action.payload.user_Instructions;
      state.user_Address = action.payload.user_Address;
      state.user_Pincode = action.payload.user_Pincode;
      state.user_City = action.payload.user_City;
      state.user_State = action.payload.user_State;
      state.user_Country = action.payload.user_Country;
    },
    updatePaymentMethodInfo: (
      state,
      action: PayloadAction<{
        paying_Amount: number;
        payment_Type: string;
        payment_Gateway: string;
        booking_Created_From: string;
      }>,
    ) => {
      state.paying_Amount = action.payload.paying_Amount;
      state.payment_Type = action.payload.payment_Type;
      state.payment_Gateway = action.payload.payment_Gateway;
      state.booking_Created_From = action.payload.booking_Created_From;
    },
    resetBookingConfirmationInfo: (state) => {
      state.roomsList = [];
      state.hotel_Slug_Name = "";
      state.hotel_Name = "";
      state.hotel_Image_Url = "";
      state.hotel_Email_Id = "";
      state.hotel_Landmark = "";
      state.hotel_Address = "";
      state.hotel_Firebase_Id = "";
      state.hotel_Map_Url = "";
      state.hotel_Star_Rating = 0;
      state.hotel_Arrival_Time = "11:00";
      state.hotel_Departure_Time = "11:00";
      state.hotel_General_Policy = "";
      state.hotel_Cancellation_Policy = "";
      state.hotel_Refund_Policy = "";

      state.checkin_Time = new Date();
      state.checkout_Time = addDays(new Date(), 1);
      state.num_nights = 1;
      state.room_Map = {};
      state.room_Plan_Map = {};

      state.total_Rooms_Count = 0;
      state.total_Guests_Count = 0;
      state.total_Children_Count = 0;

      state.user_Unique_Id = "";
      state.user_Name = "";
      state.user_First_Name = "";
      state.user_Last_Name = "";
      state.user_Email_Id = "";
      state.user_Phone_Number = "";
      state.user_Staybook_Coins = 0;
      state.user_Instructions = "";
      state.user_Address = "";
      state.user_Pincode = "";
      state.user_City = "";
      state.user_State = "";
      state.user_Country = "";

      state.booking_Id = "";
      state.receipt_Id = "";
      state.payment_Gateway = "";
      state.booking_Created_From = "staybook.in";
      state.payment_Made = false;
      state.razorpay_Payment_Id = "";
      state.razorpay_Order_Id = "";
      state.razorpay_Signature_Id = "";
    },
  },
});

export const {
  updateBookingIdInfo,
  createHotelBookingInfo,
  updateHotelInfo,
  updateHotelBookingInfo,
  updateUserBookingInfo,
  updatePaymentMethodInfo,
  resetBookingConfirmationInfo,
} = bookingConfirmationSlice.actions;

//////////////////////////// Selectors ////////////////////////////

// Booking Hotel Details Selectors
export const selectBookingDetailsInfo = (state: RootState) =>
  state.bookingConfirmation;
export const selectBookingHotelSlugName = (state: RootState) =>
  state.bookingConfirmation.hotel_Slug_Name;
export const selectBookingHotelName = (state: RootState) =>
  state.bookingConfirmation.hotel_Name;
export const selectBookingHotelImageUrl = (state: RootState) =>
  state.bookingConfirmation.hotel_Image_Url;
export const selectBookingHotelEmailId = (state: RootState) =>
  state.bookingConfirmation.hotel_Email_Id;
export const selectBookingHotelLandmark = (state: RootState) =>
  state.bookingConfirmation.hotel_Landmark;
export const selectBookingHotelAddress = (state: RootState) =>
  state.bookingConfirmation.hotel_Address;
export const selectBookingHotelMapUrl = (state: RootState) =>
  state.bookingConfirmation.hotel_Map_Url;
export const selectBookingHotelMapStarRating = (state: RootState) =>
  state.bookingConfirmation.hotel_Star_Rating;
export const selectBookingHotelCheckinTime = (state: RootState) =>
  state.bookingConfirmation.hotel_Arrival_Time;
export const selectBookingHotelCheckoutTime = (state: RootState) =>
  state.bookingConfirmation.hotel_Departure_Time;
export const selectBookingHotelGeneralPolicy = (state: RootState) =>
  state.bookingConfirmation.hotel_General_Policy;
export const selectBookingHotelCancellationPolicy = (state: RootState) =>
  state.bookingConfirmation.hotel_Cancellation_Policy;
export const selectBookingHotelPaymentOptions = (state: RootState) =>
  state.bookingConfirmation.hotel_Payment_Option;
export const selectBookingHotelPartialPaymentPercentage = (state: RootState) =>
  state.bookingConfirmation.hotel_Partial_Payment_Percentage;

// Booking User Details Selectors
export const selectBookingUserUniqueId = (state: RootState) =>
  state.bookingConfirmation.user_Unique_Id;
export const selectBookingUserName = (state: RootState) =>
  state.bookingConfirmation.user_Name;
export const selectBookingUserImageUrl = (state: RootState) =>
  state.bookingConfirmation.user_Image_Url;
export const selectBookingUserFirstName = (state: RootState) =>
  state.bookingConfirmation.user_First_Name;
export const selectBookingUserLastName = (state: RootState) =>
  state.bookingConfirmation.user_Last_Name;
export const selectBookingUserEmailId = (state: RootState) =>
  state.bookingConfirmation.user_Email_Id;
export const selectBookingUserPhoneNumber = (state: RootState) =>
  state.bookingConfirmation.user_Phone_Number;
export const selectBookingUserStaybookCoins = (state: RootState) =>
  state.bookingConfirmation.user_Staybook_Coins;
export const selectBookingUserInstructions = (state: RootState) =>
  state.bookingConfirmation.user_Instructions;
export const selectBookingUserAddress = (state: RootState) =>
  state.bookingConfirmation.user_Address;
export const selectBookingUserPincode = (state: RootState) =>
  state.bookingConfirmation.user_Pincode;
export const selectBookingUserCity = (state: RootState) =>
  state.bookingConfirmation.user_City;
export const selectBookingUserState = (state: RootState) =>
  state.bookingConfirmation.user_State;
export const selectBookingUserCountry = (state: RootState) =>
  state.bookingConfirmation.user_Country;

// Booking Details Selections
export const selectBookingId = (state: RootState) =>
  state.bookingConfirmation.booking_Id;
export const selectBookingReceiptId = (state: RootState) =>
  state.bookingConfirmation.receipt_Id;
export const selectBookingPaymentGateway = (state: RootState) =>
  state.bookingConfirmation.payment_Gateway;
export const selectBookingBookingCreationWebsite = (state: RootState) =>
  state.bookingConfirmation.booking_Created_From;
export const selectBookingRazorPayPaymentId = (state: RootState) =>
  state.bookingConfirmation.razorpay_Payment_Id;
export const selectBookingRazorPayOrderId = (state: RootState) =>
  state.bookingConfirmation.razorpay_Order_Id;
export const selectBookingRazorPaySignatureId = (state: RootState) =>
  state.bookingConfirmation.razorpay_Signature_Id;

export const selectBookingCheckinDate = (state: RootState) =>
  state.bookingConfirmation.checkin_Time;
export const selectBookingCheckoutDate = (state: RootState) =>
  state.bookingConfirmation.checkout_Time;
export const selectBookingNumOfNights = (state: RootState) =>
  state.bookingConfirmation.num_nights;
export const selectBookingTotalRoomsCount = (state: RootState) =>
  state.bookingConfirmation.total_Rooms_Count;
export const selectBookingTotalGuestsCount = (state: RootState) =>
  state.bookingConfirmation.total_Guests_Count;
export const selectBookingTotalChildrenCount = (state: RootState) =>
  state.bookingConfirmation.total_Children_Count;
export const selectBookingTotalGuestOccupancy = (state: RootState) =>
  state.bookingConfirmation.total_Guest_Occupancy;
export const selectBookingTotalRoomCost = (state: RootState) =>
  state.bookingConfirmation.total_Room_Cost;
export const selectBookingTotalTax = (state: RootState) =>
  state.bookingConfirmation.total_Tax;
export const selectBookingTotalPrice = (state: RootState) =>
  state.bookingConfirmation.total_Price;

export const selectBookingRoomMapping = (state: RootState) =>
  state.bookingConfirmation.room_Map;
export const selectBookingRoomPlanMapping = (state: RootState) =>
  state.bookingConfirmation.room_Plan_Map;

export const selectBookingAmountPaid = (state: RootState) =>
  state.bookingConfirmation.amount_Paid;
export const selectBookingPayingAmount = (state: RootState) =>
  state.bookingConfirmation.paying_Amount;
export const selectBookingTotalDiscount = (state: RootState) =>
  state.bookingConfirmation.total_Discount;
export const selectBookingPaymentMade = (state: RootState) =>
  state.bookingConfirmation.payment_Made;

export default bookingConfirmationSlice.reducer;
