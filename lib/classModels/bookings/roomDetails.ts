import { addDays } from "@/lib/helper";
import { PlanPackageDetails } from "../calendar/planPackageDetails";
import { AgeInfo } from "../hotels/hotelRoomInfo";

export class RoomDetails {
  room_Id: string = "";
  room_Name: string = "";
  room_Info: string = "";
  plan_Id: string = "";
  plan_Name: string = "";
  plan_Info: string = "";

  room_Child_Dynamic_Price: boolean = false;
  room_Guest_Occupancy: number = 2;
  room_Guest_Count: number = 2;
  room_Guest_Extra_Count: number = 0;
  room_Guest_Price: number = 0;
  room_Guest_Price_Percentage: number = 10;
  room_Min_Guest_Occupancy: number = 0;
  room_Max_Guest_Occupancy: number = 2;

  room_Age_Pricing_List: AgeInfo[] = [];
  room_Children_Age_Price_Info: any[] = [];
  room_Children_Occupancy: number = 0;
  room_Children_As_Guest_Count: number = 0;
  room_Children_Count: number = 0;
  room_Children_Price: number = 0;
  room_Min_Children_Occupancy: number = 0;
  room_Max_Children_Occupancy: number = 2;

  plan_Start_Date: Date = new Date();
  plan_End_Date: Date = addDays(new Date(), 1);

  plan_Room_Price: number = 0;
  plan_Tax: number = 0;
  plan_Price: number = 0;
  plan_Adult_Price: number = 0;
  plan_Child_Price: number = 0;
  priceBreakUp: any[] = [];

  total_Room_Plan_Price: number = 0;
  total_Plan_Tax: number = 0;
  total_Plan_Price: number = 0;
  total_Adult_Price: number = 0;
  total_Child_Price: number = 0;

  total_Price: number = 0;

  room_Count: number = 1;
  num_Guests: number = 0;
  num_Children: number = 0;

  calculatePlanPrice(
    priceList: PlanPackageDetails[],
    childAgeList: any[],
    extraAdultCount: number,
    extraChildCount: number,
  ) {
    let currentDate = new Date(
      this.plan_Start_Date.getFullYear(),
      this.plan_Start_Date.getMonth(),
      this.plan_Start_Date.getDate(),
    );

    const planChildPrice = childAgeList.length === 0 ? 0 : childAgeList.reduce((cPrice, info) => cPrice + Math.ceil(Number(info.price.toFixed(2))), 0);
    const gCnt = this.room_Child_Dynamic_Price ? this.room_Guest_Occupancy - this.room_Guest_Count : this.room_Guest_Occupancy - this.room_Guest_Count - this.room_Children_As_Guest_Count;
    for (let pkg of priceList) {
      const perAdultPricePercentage = pkg.plan_Adult_Price_Percentage === -1 ? this.room_Guest_Price_Percentage : pkg.plan_Adult_Price_Percentage;
      const basePlanPrice = Math.ceil(Number(+pkg.plan_Base_Price.toFixed(2)));
      const deflatedPlanPrice = gCnt > 0 ? basePlanPrice - (gCnt * Math.ceil(perAdultPricePercentage * 0.01 * basePlanPrice)) : basePlanPrice;
      const adultPrice = pkg.plan_Extra_Adult_Price === -1 ? Math.ceil(Number(this.room_Guest_Price.toFixed(2))) : Math.ceil(Number(pkg.plan_Extra_Adult_Price.toFixed(2)));
      const childPrice = Math.ceil(Number(this.room_Children_Price.toFixed(2)));
      const totalRoomPrice =
        deflatedPlanPrice +
        (this.room_Guest_Extra_Count > 0
          ? Math.ceil(
              Number((this.room_Guest_Extra_Count * adultPrice).toFixed(2)),
            )
          : 0) +
        (this.room_Child_Dynamic_Price ? planChildPrice : (this.room_Children_Occupancy > 0
          ? Math.ceil(
              Number((this.room_Children_Occupancy * childPrice).toFixed(2)),
            )
          : 0));
      const taxPrice = +totalRoomPrice > 7500
          ? Math.ceil(Number((+totalRoomPrice * 0.18).toFixed(2)))
          : Math.ceil(Number((+totalRoomPrice * 0.12).toFixed(2)));
      const totalPrice = +totalRoomPrice + taxPrice;

      let datePrice = {
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
        ),
        basePrice: deflatedPlanPrice,
        adultPrice: adultPrice,
        childPrice: childPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };

      this.room_Children_Age_Price_Info = childAgeList;
      this.plan_Room_Price += deflatedPlanPrice;
      this.plan_Tax += taxPrice;
      this.plan_Price += totalPrice;
      this.plan_Adult_Price += adultPrice * this.room_Guest_Extra_Count;
      this.plan_Child_Price += childPrice * this.room_Children_Occupancy;
      this.priceBreakUp.push(datePrice);
      // this.num_Guests = this.room_Guest_Occupancy + this.room_Guest_Extra_Count;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    this.num_Guests = this.room_Guest_Count + this.room_Guest_Extra_Count;
    this.num_Children = this.room_Children_Occupancy;
    
    this.total_Room_Plan_Price += this.plan_Room_Price + this.plan_Adult_Price + this.plan_Child_Price;
    this.total_Plan_Tax += this.plan_Tax;
    this.total_Plan_Price += this.plan_Price;
    this.total_Adult_Price += this.plan_Adult_Price;
    this.total_Child_Price += this.plan_Child_Price;
  }

  addSameRoomPlan() {
    this.total_Room_Plan_Price += this.plan_Room_Price + this.plan_Adult_Price + this.plan_Child_Price;
    this.total_Plan_Tax += this.plan_Tax;
    this.total_Plan_Price += this.plan_Price;
    this.total_Adult_Price += this.plan_Adult_Price;
    this.total_Child_Price += this.plan_Child_Price;
    this.room_Count += 1;
    // this.num_Guests += this.room_Guest_Occupancy+this.room_Guest_Extra_Count;
    this.num_Guests += this.room_Guest_Count + this.room_Guest_Extra_Count;
    this.num_Children += this.room_Children_Occupancy;
  }

  removeSameRoomPlan() {
    this.total_Room_Plan_Price -= this.plan_Room_Price + this.plan_Adult_Price + this.plan_Child_Price;
    this.total_Plan_Tax -= this.plan_Tax;
    this.total_Plan_Price -= this.plan_Price;
    this.total_Adult_Price -= this.plan_Adult_Price;
    this.total_Child_Price -= this.plan_Child_Price;
    this.room_Count -= 1;
    // this.num_Guests -= this.room_Guest_Occupancy+this.room_Guest_Extra_Count;
    this.num_Guests -= this.room_Guest_Count + this.room_Guest_Extra_Count;
    this.num_Children -= this.room_Children_Occupancy;
  }

  compareRooms(room: RoomDetails): any {
    if (
      this.room_Id === room.room_Id &&
      this.room_Name === room.room_Name &&
      this.room_Info === room.room_Info &&
      this.plan_Id === room.plan_Id &&
      this.plan_Name === room.plan_Name &&
      this.plan_Info === room.plan_Info &&
      this.room_Guest_Occupancy === room.room_Guest_Occupancy &&
      this.room_Guest_Count === room.room_Guest_Count &&
      this.room_Children_Occupancy === room.room_Children_Occupancy &&
      this.room_Guest_Extra_Count === room.room_Guest_Extra_Count
    ) {
      if (this.room_Guest_Count === room.room_Guest_Count) {
        return { roomPlan: true, planMap: false };
      } else {
        return { roomPlan: true, planMap: true };
      }
    } else {
      return { roomPlan: false, planMap: false };
    }
  }

  compareForMultipleRooms(room: RoomDetails): any {
    if (
      this.room_Id === room.room_Id &&
      this.room_Name === room.room_Name &&
      this.room_Info === room.room_Info &&
      this.plan_Id === room.plan_Id &&
      this.plan_Name === room.plan_Name &&
      this.plan_Info === room.plan_Info &&
      this.room_Guest_Occupancy === room.room_Guest_Occupancy &&
      this.room_Guest_Count === room.room_Guest_Count &&
      this.room_Children_Occupancy === room.room_Children_Occupancy &&
      this.room_Guest_Extra_Count === room.room_Guest_Extra_Count
    ) {
      if (this.room_Guest_Count === room.room_Guest_Count) {
        return { roomPlan: true, planMap: false };
      } else {
        return { roomPlan: true, planMap: true };
      }
    } else {
      return { roomPlan: false, planMap: false };
    }
  }
}