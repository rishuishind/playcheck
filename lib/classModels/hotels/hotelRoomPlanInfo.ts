import { PlanPackageDetails } from "../calendar/planPackageDetails";

export class HotelRoomPlanInformation {
  roomPlan_Id: string = "";
  roomPlan_Name: string = "";
  roomPlan_Info: string = "";
  roomPlan_Price: number = 0.0;
  roomPlan_Image_Url: string = "";
  roomPlan_Availability: boolean = true;
  roomPlan_Features_List: string[] = [];
  roomPlan_Price_Group: PlanPackageDetails = new PlanPackageDetails();
  roomPLan_Date_Price_Map: Map<string, PlanPackageDetails> = new Map<
    string,
    PlanPackageDetails
  >();
  roomPlan_Date_Price_List: PlanPackageDetails[] = [];

  roomPlan_ARI_Attributes: any = {
    breakfast_Included: false,
    internet_Included: false,
    parking_Included: false,
  };
  roomPlan_CheckinTime: any = "11:00 AM";
  roomPlan_CheckoutTime: any = "12:00 PM";
  roomPlan_Description: string = "";
  roomPlan_Meals: any = {
    breakfast: {
      buffet: false,
      in_private_space: false,
      in_room: false,
      included: false,
    },
    lunch: {
      buffet: false,
      in_private_space: false,
      in_room: false,
      included: false,
    },
    dinner: {
      buffet: false,
      in_private_space: false,
      in_room: false,
      included: false,
    },
    other: {
      buffet: false,
      in_private_space: false,
      in_room: false,
      included: false,
    },
  };
  roomPlan_Price_Plan_Ratio: any = {
    roomPlan_Amount: 0,
    roomPlan_Percentage: 0,
  };
  roomPlan_Promotion_Id: string = "";
  roomPlan_Refund: any = {
    refund_Available: true,
    refundable_Until_Days: 3,
    refundable_Until_Time: "06:00 PM",
  };
  roomPlan_Tax_Details: any = {
    tax_IN: this.roomPlan_Price >= 10000 ? 18 : 12,
  };
}
