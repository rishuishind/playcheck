import dayjs from "dayjs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  DAY_PLANNER_COLLECTION_NAME,
  HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
  MONTH_PLANNER_COLLECTION_NAME,
  YEAR_PLANNER_COLLECTION_NAME,
  HOTEL_PRICE_PLANNER_COLLECTION_NAME,
  HOTEL_INVENTORY_PLANNER_COLLECTION_NAME,
  getDateDifference,
  addDays,
  subtractDays,
} from "../helper";
import { db } from "../firebase";
import { PlanPackageDetails } from "../classModels/calendar/planPackageDetails";
import { HotelRoomInformation } from "../classModels/hotels/hotelRoomInfo";

export function getMonth(year = dayjs().year(), month = dayjs().month()) {
  month = Math.floor(month);
  // const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export const hotelPriceRangeMatrix = (
  planPackage: PlanPackageDetails = new PlanPackageDetails()
) => {
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate = new Date(
    new Date().getFullYear() + 2,
    Number(11),
    Number(31)
  );
  let sd = startDate;
  let ed = endDate;

  var threeYearPriceList: any[] = [
    [[], [], [], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], [], [], []],
  ];
  for (
    let currentDate = sd;
    currentDate <= ed;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    var yearVal = currentDate.getFullYear();
    var monthVal = currentDate.getMonth();
    var dayVal = currentDate.getDate();
    var yearIdx = yearVal - new Date().getFullYear();

    threeYearPriceList[yearIdx][monthVal].push(planPackage);
  }

  return threeYearPriceList;
};

export const checkHotelRoomInventoryAvailability = async (
  hotelId: string,
  roomId: string,
  startDate: Date,
  endDate: Date
): Promise<boolean> => {
  let sd = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  let ed = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  let num_Nights = getDateDifference(sd, ed);
  if (num_Nights > 0) {
    ed = addDays(sd, num_Nights - 1);
  }

  // const docRoomRef = doc(
  //   db,
  //   HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  //   hotelId,
  //   HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  //   roomId
  // );
  // const roomInfo = await getDoc(docRoomRef);
  // const totalRoomCnt = roomInfo.data()?.hotelRoom_Count
  //   ? roomInfo.data()?.hotelRoom_Count
  //   : 1;

  for (
    let currentDate = sd;
    currentDate <= ed;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    var yearVal = currentDate.getFullYear();
    var monthVal = currentDate.getMonth() + 1;
    var dayVal = currentDate.getDate();

    const docRef = doc(
      db,
      HOTEL_INVENTORY_PLANNER_COLLECTION_NAME,
      hotelId,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
      YEAR_PLANNER_COLLECTION_NAME,
      `${yearVal}`,
      MONTH_PLANNER_COLLECTION_NAME,
      `MONTH-${monthVal}`,
      DAY_PLANNER_COLLECTION_NAME,
      `DAY-${dayVal}`
    );
    const inventoryInfo = await getDoc(docRef);

    if (!inventoryInfo.exists()) {
      continue;
    }
    else {
      if (inventoryInfo.data()?.hotelRoom_Count > 0) continue;
      else {
        return false;
      }
    }
  }

  return true;
};

export const getHotelRoomPlanPriceDetails = async (
  hotelId: string,
  roomId: string,
  planId: string,
  basePrice: number,
  perExtraAdultPrice: number,
  perAdultPricePercentage: number,
  planDate: Date
): Promise<PlanPackageDetails> => {
  let sd = new Date(
    planDate.getFullYear(),
    planDate.getMonth(),
    planDate.getDate()
  );

  var dayVal = sd.getDate();
  var monthVal = sd.getMonth() + 1;
  var yearVal = sd.getFullYear();

  const docRef = doc(
    db,
    HOTEL_PRICE_PLANNER_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    planId,
    YEAR_PLANNER_COLLECTION_NAME,
    `${yearVal}`,
    MONTH_PLANNER_COLLECTION_NAME,
    `MONTH-${monthVal}`,
    DAY_PLANNER_COLLECTION_NAME,
    `DAY-${dayVal}`
  );
  const planInfo = await getDoc(docRef);

  let planObj = new PlanPackageDetails();
  planObj.plan_Date = new Date(
    yearVal,
    monthVal-1,
    dayVal
  );

  if (planInfo.exists()) {
    planObj.plan_Base_Price = +planInfo.data().plan_Base_Price;
    if (planInfo.data()?.plan_Extra_Adult_Price) {
      planObj.plan_Extra_Adult_Price = +planInfo.data().plan_Extra_Adult_Price;
    }
    else {
      planObj.plan_Extra_Adult_Price = perExtraAdultPrice;
    }
    if (planInfo.data()?.plan_Adult_Price_Percentage) {
      planObj.plan_Adult_Price_Percentage = +planInfo.data().plan_Adult_Price_Percentage;
    }
    else {
      planObj.plan_Adult_Price_Percentage = perAdultPricePercentage;
    }
    // planObj.plan_Promotion_Price = +planInfo.data().plan_Promotion_Price;
    // planObj.plan_Child_Price = +planInfo.data().plan_Child_Price;
  } else {
    planObj.plan_Base_Price = +basePrice;
  }

  return planObj;
};

export const getHotelRoomPlanPriceDateRangeList = async (
  hotelId: string,
  roomId: string,
  planId: string,
  basePrice: number,
  perExtraAdultPrice: number,
  perAdultPricePercentage: number,
  startDate: Date,
  endDate: Date
): Promise<PlanPackageDetails[]> => {
  let sd = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  let ed = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  ed = subtractDays(ed, 1);

  let priceList: PlanPackageDetails[] = [];
  for (
    let currentDate = sd;
    currentDate <= ed;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    let planObj: PlanPackageDetails = await getHotelRoomPlanPriceDetails(
      hotelId,
      roomId,
      planId,
      basePrice,
      perExtraAdultPrice,
      perAdultPricePercentage,
      currentDate
    );
    priceList.push(planObj);
  }

  return priceList;
};

export const getHotelRoomPlanPriceDateRangeMap = async (
  hotelId: string,
  roomId: string,
  planId: string,
  basePrice: number,
  perExtraAdultPrice: number,
  perAdultPricePercentage: number,
  startDate: Date,
  endDate: Date
): Promise<Map<string, PlanPackageDetails>> => {
  let sd = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  let ed = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  ed = subtractDays(ed, 1);

  let priceMap = new Map();
  for (
    let currentDate = sd;
    currentDate <= ed;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    var yearVal = currentDate.getFullYear();
    var monthVal = currentDate.getMonth() + 1;
    var dayVal = currentDate.getDate();

    var keyVal = `${dayVal}-${monthVal}-${yearVal}`;
    let planObj: PlanPackageDetails = await getHotelRoomPlanPriceDetails(
      hotelId,
      roomId,
      planId,
      basePrice,
      perExtraAdultPrice,
      perAdultPricePercentage,
      currentDate
    );
    priceMap.set(keyVal, planObj);
  }

  return priceMap;
};

export const fetchHotelPriceRangeMatrix = async (
  hotelId: string,
  roomId: string,
  planId: string
) => {
  const docRef = doc(
    db,
    HOTEL_PRICE_PLANNER_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    planId
  );
  const planInfo = await getDoc(docRef);
  let planObj = new PlanPackageDetails();
  planObj.plan_Base_Price = planInfo.data()?.roomPlan_Price;

  const priceMatrix = hotelPriceRangeMatrix(planObj);
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate = new Date(
    new Date().getFullYear() + 2,
    Number(11),
    Number(31)
  );

  for (let i = 0; i < 3; i++) {
    const yearVal = (new Date().getFullYear() + i).toString();
    const monthPlanInfoCollectionRef = collection(
      db,
      HOTEL_PRICE_PLANNER_COLLECTION_NAME,
      hotelId,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
      HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
      planId,
      YEAR_PLANNER_COLLECTION_NAME,
      `${yearVal}`,
      MONTH_PLANNER_COLLECTION_NAME
    );
    const monthPlanInfoQuerySnapshot = await getDocs(
      monthPlanInfoCollectionRef
    );

    for (let monthPlan of monthPlanInfoQuerySnapshot.docs) {
      const monthVal = Number(monthPlan.id.split("-")[1]);
      const dayPlanInfoCollectionRef = collection(
        db,
        HOTEL_PRICE_PLANNER_COLLECTION_NAME,
        hotelId,
        HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
        roomId,
        HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
        planId,
        YEAR_PLANNER_COLLECTION_NAME,
        `${yearVal}`,
        MONTH_PLANNER_COLLECTION_NAME,
        monthPlan.id,
        DAY_PLANNER_COLLECTION_NAME
      );
      const dayPlanInfoQuerySnapshot = await getDocs(dayPlanInfoCollectionRef);

      for (let dayPlan of dayPlanInfoQuerySnapshot.docs) {
        const dayVal = Number(dayPlan.id.split("-")[1]);

        let packageObj = new PlanPackageDetails();
        packageObj.plan_Promotion_Price = dayPlan.data().plan_Promotion_Price;
        packageObj.plan_Base_Price = dayPlan.data().plan_Base_Price;
        packageObj.plan_Child_Price = dayPlan.data().plan_Child_Price;
        priceMatrix[i][monthVal - 1][dayVal - 1] = packageObj;
      }
    }
  }

  return priceMatrix;
};
