import { PlanPackageDetails } from "../calendar/planPackageDetails";

export class CityHotelcardInfo {
  hotel_Slug_Name: string = "";
  hotel_Firebase_Id: string = "";
  hotel_Name: string = "";
  hotel_Landmark: string = "";
  hotel_Address: string = "";
  hotel_City: string = "";
  hotel_State: string = "";
  hotel_Star_Rating: string = "";
  hotel_Image_Url: string = "";
  hotel_Images_List: any[] = [];
  hotel_Starting_Price: string = "";
  hotel_Region_Slug_Name: string = "";
  hotel_Starting_Price_Obj: PlanPackageDetails = new PlanPackageDetails();
  hotel_Google_Rating: number = 0;
  hotel_Ratings_Count: number = 0;
  hotel_Bookings_Count: number = 0;
  hotel_Amenities_List?: any[] = [];
}
