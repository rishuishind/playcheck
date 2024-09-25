import { HotelImageDetails } from "../images/hotelImageDetails";
import { VisitingPlaceInformation } from "./destinationVisitingPlaceInfo";

export class DestinationPlaceInformation {
  destination_Id: string = "";
  destination_Name: string = "";
  destination_Info: string = "";
  destination_Description: string = "";
  destination_General_Info: string = "";
  destination_Latitude: number = 0;
  destination_Longitude: number = 0;
  destination_Map_Url: string = "";
  destination_Landmark: string = "";
  destination_Address: string = "";

  destination_City_Code: string = "";
  destination_City_Name: string = "";
  destination_City_Slug_Name: string = "";

  destination_State_Code: string = "";
  destination_State_Name: string = "";
  destination_State_Slug_Name: string = "";

  destination_Country_Code: string = "";
  destination_Country_Name: string = "";
  destination_Country_Slug_Name: string = "";

  destination_Image_Url: string = "";
  destination_Highlights: string = "";
  destination_Show_Details: string = "";

  destination_Visiting_Info: string = "";
  destination_Visiting_Description: string = "";
  destination_Visiting_Details: any[] = [];
  destination_Slug_Name: string = "";
  destination_Image_Object_List: HotelImageDetails[] = [];
  destination_Visiting_Places_List: VisitingPlaceInformation[] = [];

  // lists
  destination_Highlights_List: any[] = [];
}
