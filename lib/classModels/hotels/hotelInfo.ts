import { HotelRoomInformation } from "./hotelRoomInfo";
import { HotelAmenityInformation } from "./hotelAmenityInfo";
import { HotelImageDetails } from "../images/hotelImageDetails";
import { PlanPackageDetails } from "../calendar/planPackageDetails";

export class HotelInformationDetails {
  hotel_Authorization: boolean = true;
  hotel_Status: string = "ACTIVE";
  hotel_Firebase_Id: string = "";
  hotel_Name: string = "";
  hotel_Email_Id: string = "";
  hotel_Contact_Number: number = +919910638216;
  hotel_Landmark: string = "";
  hotel_Address: string = "";
  hotel_City: string = "";
  hotel_City_Slug: string = "";
  hotel_State: string = "";
  hotel_Region: string = "";
  hotel_Description: string = "";
  hotel_Slug_Name: string = "";
  hotel_Region_Slug_Name: string = "";
  hotel_Owner_Id: string = "";
  hotel_Image_Url: string = "";
  hotel_Map_Url: string = "";
  hotel_Image_Logo_Url: string = "";
  hotel_Starting_Price: number = 0;
  hotel_Star_Rating: number = 1;
  hotel_Longitude: number = 0.0;
  hotel_Latitude: number = 0.0;
  hotel_Payment_Option: any = {
    postpaid_Payment: true,
    prepaid_Payment: true,
    partial_Payment: false,
  };
  partial_Payment_Percentage: number = 20;
  hotel_Relative_Ordering: number = 0;
  hotel_Checkin_Time: string = "12:00";
  hotel_Checkout_Time: string = "12:00";
  hotel_Policy_List: any[] = [];
  hotel_Pincode: number = 0;
  hotel_Near_Airport: any = {
    distance: 0,
    name: "",
    time: "",
  };
  hotel_Near_Railway_Station: any = {
    distance: 0,
    name: "",
    time: "",
  };
  hotel_Near_Bus_Station: any = {
    distance: 0,
    name: "",
    time: "",
  };
  hotel_General_Policy: any = {
    description: "",
    policy_List: [],
  };
  hotel_Cancellation_Policy: any = {
    description: "",
    policy_List: [],
    duration_List: [],
  };
  hotel_Refund_Policy: any = {
    description: "",
    policy_List: [],
  };
  hotel_TnC_Policy: any = {
    description: "",
    policy_List: [],
  };

  hotel_TnC: string = "";

  hotel_Starting_PlanPackage: PlanPackageDetails = new PlanPackageDetails();

  hotel_Category_List: string[] = [];
  hotel_Nearby_Hotels_List: string[] = [];
  hotel_Description_List: string[] = [];
  hotel_Amenities_List: string[] = [];
  // hotel_Images_List: string[] = [];
  hotel_Images_Object_List: HotelImageDetails[] = [];

  hotel_Available_Amenities_List: HotelAmenityInformation[] = [];
  hotel_Card_Amenities_List: HotelAmenityInformation[] = [];
  hotel_FAQ_List: any[] = [];
  hotel_FAQ_Schema_List: any[] = [];
  hotel_Nearby_Places_List: any[] = [];
  hotel_User_Reviews_List: any[] = [];
  hotel_Nearby_HotelsInfo_List: any[] = [];
  hotel_Rooms_List: HotelRoomInformation[] = [];
  hotel_Meta_Object_Details: any = {};

  hotel_Total_Ratings: number = 0;
  hotel_Total_Ratings_Count: number = 0;
  hotel_Meta_Description: string = "";
  hotel_Meta_Title: string = "";

  // google reviews
  hotel_Google_Rating: number = 0;
  hotel_Google_Reviews_List: any[] = [];
  hotel_Ratings_Count: number = 0;
  hotel_Rating_Distribution: any = {};
  hotel_Review_List: any[] = [];

  // newly added keys
  hotel_Type: string = "";
  hotel_Detailed_Description: string = "";
  hotel_Total_Rooms_Count: number = 0;
  hotel_Nearby_Shopping_Places_List: ListData[] = [];
  hotel_Acitivities_List: ListData[] = [];
  hotel_Special_Facility_List: ListData[] = [];
  hotel_Nearby_Cities_List: ListData[] = [];
}

export class ListData {
  id: string = "";
  name: string = "";
  info: string = "";
}