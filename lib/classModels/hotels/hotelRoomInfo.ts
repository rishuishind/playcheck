import { HotelRoomPlanInformation } from "./hotelRoomPlanInfo";
import { HotelAmenityInformation } from "./hotelAmenityInfo";
import { HotelImageDetails } from "../images/hotelImageDetails";

export class HotelRoomInformation {
  hotelRoom_Id: string = "";
  hotelRoom_Availability: boolean = true;
  hotelRoom_Count: number = 2;
  hotelRoom_Availability_Count: number = 0;
  hotelRoom_Guest_Price: number = 0;
  hotelRoom_Guest_Count: number = 1;
  hotelRoom_Min_Guest_Occupancy: number = 0;
  hotelRoom_Max_Guest_Occupancy: number = 2;
  hotelRoom_Image_Url: string = "";
  hotelRoom_Info: string = "";
  hotelRoom_Type: string = "";
  hotelRoom_Description: string = "";
  hotelRoom_Meta_Title: string = "";
  hotelRoom_Meta_Description: string = "";
  hotelRoom_Starting_Price: number = 0;
  hotelRoom_Children_Age_Limit: number = 3;
  hotelRoom_Children_Price: number = 0;
  hotelRoom_Guest_Price_Percentage: number = 10;
  hotelRoom_Min_Children_Occupancy: number = 0;
  hotelRoom_Max_Children_Occupancy: number = 2;
  hotelRoom_Bed_Count: number = 1;
  hotelRoom_Style: string = "";
  hotelRoom_Sharing_Type: string = "";
  hotelRoom_Children_Count: number = 0;
  hotelRoom_Smoking_Type: boolean = false;
  hotelRoom_Checkin_Time: string = "12:00";
  hotelRoom_Checkout_Time: string = "12:00";
  hotelRoom_BathAndToilet: any = {
    bathroom_Type: "",
    bathroom_Bathtub: false,
    bathroom_Shower: true,
    bathroom_Mobility_Accessible: false,
    bathroom_Electronic_Bidet: false,
  };
  hotelRoom_Beds_List: any[] = [];
  hotelRoom_ARI_Attributes: any = {
    suite: false,
    capsule: false,
    outdoor: false,
    mobilityAccessible: false,
    openAirBath: false,
    airConditioning: true,
    balcony: false,
  };
  hotelRoom_View: any = {
    AirportView: false,
    BayView: false,
    BeachView: false,
    CastleView: false,
    CityView: false,
    CountrysideView: false,
    CourtyardView: false,
    DuneView: false,
    ForestView: false,
    GardenView: false,
    GolfCourseView: false,
    HarborView: false,
    LagoonView: false,
    LakeView: false,
    MarinaView: false,
    MountainView: false,
    NatureView: false,
    OceanView: false,
    ParkView: false,
    PartialOceanView: false,
    PisteView: false,
    PoolView: false,
    PyramidView: false,
    RiverView: false,
    StreetView: false,
  };

  hotelRoom_Features_List: any[] = [];
  hotelRoom_Max_Age_List: AgeInfo[] = [
    {
      amount: 0,
      counts_as_base_occupant: "never",
      exclude_from_capacity: true,
      max_age: 5,
      percentage: 0,
    },
  ];
  hotelRoom_Amenities_List: HotelAmenityInformation[] = [];
  hotelRoom_Images_List: HotelImageDetails[] = [];
  hotelRoom_ImageAmenities_List: HotelAmenityInformation[] = [];
  hotelRoom_Plans_List: HotelRoomPlanInformation[] = [];
  hotelRoom_Images_Object_List: HotelImageDetails[] = [];
}

export class AgeInfo {
  amount: number = 0;
  counts_as_base_occupant: string = "never";
  exclude_from_capacity: boolean = true;
  max_age: number = 0;
  percentage: number = 0;
}
