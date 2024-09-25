import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { HotelRoomPlanInformation } from "../classModels/hotels/hotelRoomPlanInfo";
import {
  HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
} from "../helper";
import { db } from ".";
import {
  getHotelRoomPlanPriceDateRangeList,
  getHotelRoomPlanPriceDetails,
} from "../handlers/calendarHandler";
import { HotelRoomInformation } from "../classModels/hotels/hotelRoomInfo";

export const getHotelRoomPlanDetails = async (
  hotelSlugName: string,
  roomId: string,
  planId: string,
): Promise<HotelRoomPlanInformation> => {
  let planDetails = new HotelRoomPlanInformation();
  const planDoc = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    planId,
  );
  const planInfo = await getDoc(planDoc);
  if (!planInfo.exists()) return planDetails;

  planDetails.roomPlan_Id = planInfo.id;
  planDetails.roomPlan_Name = planInfo.data()?.roomPlan_Name;
  planDetails.roomPlan_Info = planInfo.data()?.roomPlan_Info;
  planDetails.roomPlan_Price = planInfo.data()?.roomPlan_Price;
  planDetails.roomPlan_Image_Url = planInfo.data()?.roomPlan_Image_Url;
  planDetails.roomPlan_Features_List = planInfo.data()?.roomPlan_Features_List;
  planDetails.roomPlan_ARI_Attributes =
    planInfo.data()?.roomPlan_ARI_Attributes;
  planDetails.roomPlan_CheckinTime = planInfo.data()?.roomPlan_CheckinTime;
  planDetails.roomPlan_CheckoutTime = planInfo.data()?.roomPlan_CheckoutTime;
  planDetails.roomPlan_Description = planInfo.data()?.roomPlan_Description;
  planDetails.roomPlan_Meals = planInfo.data()?.roomPlan_Meals;
  planDetails.roomPlan_Price_Plan_Ratio =
    planInfo.data()?.roomPlan_Price_Plan_Ratio;
  planDetails.roomPlan_Promotion_Id = planInfo.data()?.roomPlan_Promotion_Id;
  planDetails.roomPlan_Refund = planInfo.data()?.roomPlan_Refund;
  planDetails.roomPlan_Tax_Details = planInfo.data()?.roomPlan_Tax_Details;

  return planDetails;
};

export const getHotelRoomPlanTab = async (
  hotelSlugName: string,
  roomId: string,
  planId: string,
): Promise<HotelRoomPlanInformation> => {
  let planDetails = new HotelRoomPlanInformation();
  const planDoc = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    planId,
  );
  const planInfo = await getDoc(planDoc);
  if (!planInfo.exists()) return planDetails;

  planDetails.roomPlan_Id = planInfo.id;
  planDetails.roomPlan_Name = planInfo.data()?.roomPlan_Name;
  planDetails.roomPlan_Info = planInfo.data()?.roomPlan_Info;
  planDetails.roomPlan_Price = +planInfo.data()?.roomPlan_Price;

  return planDetails;
};

export const getHotelRoomPlanRangeDetails = async (
  hotelSlugName: string,
  roomId: string,
  planId: string,
  perExtraAdultPrice: number,
  perAdultPricePercentage: number,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<HotelRoomPlanInformation> => {
  let planDetails = await getHotelRoomPlanDetails(
    hotelSlugName,
    roomId,
    planId,
  );
  planDetails.roomPlan_Date_Price_List =
    await getHotelRoomPlanPriceDateRangeList(
      hotelSlugName,
      roomId,
      planId,
      planDetails.roomPlan_Price,
      perExtraAdultPrice,
      perAdultPricePercentage,
      checkInDate,
      checkOutDate,
    );

  planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
    hotelSlugName,
    roomId,
    planId,
    planDetails.roomPlan_Price,
    perExtraAdultPrice,
    perAdultPricePercentage,
    checkInDate,
  );

  return planDetails;
};

export const googleAriHotelRoomPlanInfo = async (
  hotelSlugName: string,
  roomId: string,
  planId: string,
  roomInfo: HotelRoomInformation,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<HotelRoomPlanInformation> => {
  const planDetails: any = await getHotelRoomPlanTab(
    hotelSlugName,
    roomId,
    planId,
  );
  planDetails.roomPlan_Date_Price_List =
    await getHotelRoomPlanPriceDateRangeList(
      hotelSlugName,
      roomId,
      planId,
      planDetails.roomPlan_Price,
      roomInfo.hotelRoom_Guest_Price,
      roomInfo.hotelRoom_Guest_Price_Percentage,
      checkInDate,
      checkOutDate,
    );

  planDetails.roomPlan_Price_Group = planDetails.roomPlan_Date_Price_List[0];
  // planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
  //   hotelSlugName,
  //   roomId,
  //   planId,
  //   planDetails.roomPlan_Price,
  //   checkInDate
  // );

  return planDetails;
};

export const getRoomPlanListWithDateRangeInfo = async (
  hotelSlugName: string,
  roomId: string,
  roomInfo: HotelRoomInformation,
  checkInDate: Date,
  checkOutDate: Date,
  ascOrder: boolean = true,
): Promise<HotelRoomPlanInformation[]> => {
  let planList: HotelRoomPlanInformation[] = [];

  const planCollection = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
  );
  const roomPlanQuery = await getDocs(planCollection);

  for (let plan of roomPlanQuery.docs) {
    let planInfo = await googleAriHotelRoomPlanInfo(
      hotelSlugName,
      roomId,
      plan.id,
      roomInfo,
      checkInDate,
      checkOutDate,
    );
    planList.push(planInfo);
  }

  if (ascOrder) {
    planList.sort(function (
      a: HotelRoomPlanInformation,
      b: HotelRoomPlanInformation,
    ) {
      return (
        a.roomPlan_Price_Group.plan_Base_Price -
        b.roomPlan_Price_Group.plan_Base_Price
      );
    });
  } else {
    planList.sort(function (
      a: HotelRoomPlanInformation,
      b: HotelRoomPlanInformation,
    ) {
      return (
        b.roomPlan_Price_Group.plan_Base_Price -
        a.roomPlan_Price_Group.plan_Base_Price
      );
    });
  }

  return planList;
};
