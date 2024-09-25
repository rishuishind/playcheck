import { addDays } from "@/lib/helper";
import { RoomDetails } from "./roomDetails";

export class BookingDetails {
  roomsList: RoomDetails[] = [];
  hotel_Owner_Id: string = "";
  hotel_Image_Url: string = "";
  hotel_Slug_Name: string = "";
  hotel_Name: string = "";
  hotel_Email_Id: string = "";
  hotel_Landmark: string = "";
  hotel_Firebase_Id: string = "";
  hotel_Map_Url: string = "";
  hotel_Star_Rating: number = 0;
  hotel_Arrival_Time: string = "11:00";
  hotel_Departure_Time: string = "11:00";
  hotel_General_Policy: string = "";
  hotel_Cancellation_Policy: string = "";
  hotel_Refund_Policy: string = "";
  payment_Gateway: string = "None";
  payment_Type: string = "Pay at hotel";
  booking_Created_From: string = "staybook.in";
  hotel_Handling_Charges: number = 0;
  user_Name: string = "";
  user_First_Name: string = "";
  user_Last_Name: string = "";
  user_Email_Id: string = "";
  user_Phone_Number: string = "";
  user_Instructions: string = "";
  total_Rooms_Count: number = 0;
  total_Guests_Count: number = 0;
  total_Children_Count: number = 0;
  checkin_Time: any = new Date();
  checkout_Time: any = addDays(new Date(), 1);
  num_nights: number = 1;
  total_Room_Cost: number = 0;
  total_Tax: number = 0;
  total_Price: number = 0;
  booking_Time: Date = new Date();
  user_Address: String = "";
  user_Pincode: String = "";
  user_City: String = "";
  user_State: String = "";
  user_Country: String = "INDIA";
  paying_Amount: number = 0;
  user_Request: string = "";
  
  booking_Id: string = "";
  user_Unique_Id: string = "";
  user_Staybook_Coins: number = 0;
  
  payment_Made: boolean = false;
  amount_Paid: number = 0;

  razorpay_Payment_Id: string = "";
  razorpay_Order_Id: string = "";
  razorpay_Signature_Id: string = "";
  receipt_Id: string = "";

  booking_Cancelled_Status: boolean = false;
  booking_Checkin_Status: boolean = false;
  booking_Coins: number = 0;
  booking_Noshow_Status: boolean = false;
  booking_Status: boolean = true;

  get getTotalRoomCount(): number {
    return this.total_Rooms_Count;
  }
  get getTotalRoomCost(): number {
    return this.total_Room_Cost;
  }
  get getTotalTax(): number {
    return this.total_Tax;
  }
  get getTotalPrice(): number {
    return this.total_Price;
  }
}
