import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  or,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const shortid = require("shortid");

import {
  HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
  HOTEL_NEARBY_PLACES_INFORMATION_COLLECION_NAME,
  HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  HOTEL_FAQ_INFORMATION_COLLECION_NAME,
  HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  LOCAL_BUSINESS_HOTEL_META_TITLE,
  LOCAL_BUSINESS_HOTEL_META_DESCRIPTION,
  LOCAL_BUSINESS_HOTEL_META_IMAGE_URL,
  addDays,
  getDateDifference,
  HOTEL_INVENTORY_PLANNER_COLLECTION_NAME,
  YEAR_PLANNER_COLLECTION_NAME,
  MONTH_PLANNER_COLLECTION_NAME,
  DAY_PLANNER_COLLECTION_NAME,
  HOTEL_GOOGLE_REVIEWS_INFORMATION,
} from "../helper";
import { HotelInformationDetails } from "../classModels/hotels/hotelInfo";
import { HotelAmenityInformation } from "../classModels/hotels/hotelAmenityInfo";
import { HotelRoomInformation } from "../classModels/hotels/hotelRoomInfo";
import { HotelRoomPlanInformation } from "../classModels/hotels/hotelRoomPlanInfo";
import { FetchHotelDetailsQueryParams } from "../classModels/queryParams/FetchHotelDetailsQueryParams";
import { HotelImageDetails } from "../classModels/images/hotelImageDetails";
import {
  getHotelRoomDetailsList,
  getHotelRoomImageInfoList,
  getHotelRoomListWithDateRange,
} from "./hotelRoomHandler";
import {
  checkHotelRoomInventoryAvailability,
  getHotelRoomPlanPriceDateRangeList,
  getHotelRoomPlanPriceDetails,
} from "../handlers/calendarHandler";
import { PlanPackageDetails } from "../classModels/calendar/planPackageDetails";

export const fetchAllHotelsNameSearchHandler = async (): Promise<any[]> => {
  const hotelCollection = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelQuery = await getDocs(hotelCollection);
  let hotelList: any[] = [];
  for (let hotel of hotelQuery.docs) {
    hotelList.push({
      hotel_Name: hotel.data()?.hotel_Name,
      hotel_Slug_Name: hotel.id,
      hotel_City: hotel.data()?.hotel_City,
      hotel_Star_Rating: hotel.data()?.hotel_Star_Rating,
    });
  }

  return hotelList;
};

//////////////////////////////////////////////////////////////////////////////////////////

export const getHotelImageObjectList = async (
  hotelId: string,
  imageCount: number = 1000,
): Promise<HotelImageDetails[]> => {
  const hotelCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelImagesQuerySnapshot = await getDocs(
    query(hotelCollectionRef, limit(imageCount)),
  );

  let list: HotelImageDetails[] = hotelImagesQuerySnapshot.docs.map(
    (roomImage: any) => {
      let imageInfo = { ...roomImage.data() } as HotelImageDetails;
      return imageInfo;
    },
  );

  return list;
};

export const getHotelRoomObjectImageList = async (
  hotelSlugName: string,
  colName: string = HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
) => {
  const hotelRoomListCol = collection(
    db,
    colName,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const hotelRoomsQuerySnapshot = await getDocs(hotelRoomListCol);

  const list: any[] = await Promise.all(
    hotelRoomsQuerySnapshot.docs.map(async (hotelRoom: any) => {
      const imageList = await getHotelRoomImageInfoList(
        hotelSlugName,
        hotelRoom.id,
        50,
      );

      let obj = {
        hotelRoom_Type: "",
        hotelRoom_Info: "",
        hotelRoom_Image_Url: imageList.length > 0 ? imageList[0].image_Url : "",
        hotelRoom_Images_Object_List: imageList,
        hotelRoom_Amenities_List: [],
      };

      return obj;
    }),
  );

  return list;
};

export const getHotelAmenitiesList = async (
  hotelId: string,
  limitSize: number = 100,
): Promise<HotelAmenityInformation[]> => {
  // const firestore = getFirestore();

  const hotelAmenitiesCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  );
  const hotelAmenitiesQuerySnapshot = await getDocs(
    query(hotelAmenitiesCollectionRef, limit(limitSize)),
  );

  let list: HotelAmenityInformation[] = [];
  // List of all available hotel Amenities
  for (let amenity of hotelAmenitiesQuerySnapshot.docs) {
    // let amenityInfo = new HotelAmenityInformation();
    // amenityInfo.amenity_Id = amenity.id;
    // amenityInfo.amenity_Name = amenity.data().amenity_Name;
    // amenityInfo.amenity_Image_Url =
    //   amenity.data().amenity_Image_Url != null
    //     ? amenity.data().amenity_Image_Url
    //     : "";
    // list.push(amenityInfo);
    let amenityObj = { ...amenity.data() } as HotelAmenityInformation;
    list.push(amenityObj);
  }

  return list;
};

export const getHotelFAQsList = async (hotelId: string): Promise<any[]> => {
  const firestore = getFirestore();

  const hotelFaqsCollectionRef = collection(
    firestore,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_FAQ_INFORMATION_COLLECION_NAME,
  );
  const hotelFaqsQuerySnapshot = await getDocs(hotelFaqsCollectionRef);

  let list: any[] = hotelFaqsQuerySnapshot.docs.map((faq: any) => {
    let obj = { ...faq.data() };
    return obj;
  });

  return list;
};

export const getHotelNearByPlacesList = async (
  hotelId: string,
  limit: number = 100,
): Promise<any[]> => {
  const firestore = getFirestore();

  const hotelNearbyPlacesCollectionRef = collection(
    firestore,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_NEARBY_PLACES_INFORMATION_COLLECION_NAME,
  );

  const hotelNearbyPlacesQuerySnapshot = await getDocs(
    hotelNearbyPlacesCollectionRef,
  );

  let list: any[] = [];
  // List of all hotel FAQ's
  for (let place of hotelNearbyPlacesQuerySnapshot.docs) {
    list.push({ ...place.data() });
  }

  return list;
};

export const getHotelMinimumRoomPrice = async (
  hotelId: string,
): Promise<number> => {
  const firestore = getFirestore();

  const hotelRoomInfoCollectionRef = collection(
    firestore,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );

  const hotelRoomInfoQuerySnapshot = await getDocs(hotelRoomInfoCollectionRef);

  let minPrice = 0;
  for (let room of hotelRoomInfoQuerySnapshot.docs) {
    const hotelRoomPlanCollectionRef = collection(
      firestore,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelId,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      room.id,
      HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    );

    const hotelRoomPlanQuerySnapshot = await getDocs(
      // hotelRoomPlanCollectionRef
      query(
        hotelRoomPlanCollectionRef,
        orderBy("roomPlan_Price", "asc"),
        limit(1),
      ),
    );

    for (let roomPlan of hotelRoomPlanQuerySnapshot.docs) {
      if (roomPlan.data().roomPlan_Price) {
        if (minPrice == 0) {
          minPrice = roomPlan.data().roomPlan_Price;
        } else {
          minPrice = Math.min(minPrice, roomPlan.data().roomPlan_Price);
        }
      }
    }
  }

  return minPrice;
};

export const getSelectedRoomPlanDateRangeInfo = async (
  hotelSlugName: string,
  roomId: string,
  planId: string,
  startDate: Date,
  endDate: Date,
) => {
  const roomDoc = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
  );
  const planDoc = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
    planId,
  );

  const [roomInfo, planInfo] = await Promise.all([
    getDoc(roomDoc),
    getDoc(planDoc),
  ]);

  const roomData = { ...roomInfo.data() } as HotelRoomInformation;
  const planData = { ...planInfo.data() } as HotelRoomPlanInformation;

  if (!roomInfo.exists() || !planInfo.exists()) {
    return {
      roomDetails: null,
      planDetails: null,
      planStatus: false,
    };
  }

  let checkAvailability = await checkHotelRoomInventoryAvailability(
    hotelSlugName,
    roomId,
    startDate,
    endDate,
  );

  if (!checkAvailability) {
    return {
      roomDetails: null,
      planDetails: null,
      planStatus: false,
    };
  }

  const priceList = await getHotelRoomPlanPriceDateRangeList(
    hotelSlugName,
    roomId,
    planId,
    +planData.roomPlan_Price,
    +roomData.hotelRoom_Guest_Price,
    +roomData.hotelRoom_Guest_Price_Percentage,
    startDate,
    endDate,
  );
  planData.roomPlan_Date_Price_List = priceList;

  return {
    roomDetails: roomData,
    planDetails: planData,
    planStatus: true,
  };
};

export const getHotelInformationDetails = async (
  hotelParams: FetchHotelDetailsQueryParams,
): Promise<any> => {
  const docRef = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelParams.hotelSlugName,
  );
  const hotelInfo = await getDoc(docRef);

  let starttime = performance.now();

  let hotelDetails = new HotelInformationDetails();
  let roomDetailsInfo = new HotelRoomInformation();
  let planDetailsInfo = new HotelRoomPlanInformation();
  let planStatusInfo = false;

  hotelDetails = { ...hotelInfo.data() } as HotelInformationDetails;
  hotelDetails.hotel_Images_Object_List = [
    new HotelImageDetails(hotelDetails.hotel_Image_Url),
  ];

  if (hotelParams.roomId !== "" && hotelParams.planId !== "") {
    const { roomDetails, planDetails, planStatus } =
      await getSelectedRoomPlanDateRangeInfo(
        hotelParams.hotelSlugName,
        hotelParams.roomId,
        hotelParams.planId,
        hotelParams.checkInDate,
        hotelParams.checkOutDate,
      );

    roomDetailsInfo = roomDetails as HotelRoomInformation;
    planDetailsInfo = planDetails as HotelRoomPlanInformation;
    planStatusInfo = planStatus;
  }

  hotelDetails.hotel_Rooms_List = [];

  if (
    hotelParams.fetchHotelNearbyPlacesList &&
    hotelParams.fetchHotelAmenityList
  ) {
    let [hotelNearbyPlacesList, hotelAmenitiesList] = await Promise.all([
      getHotelNearByPlacesList(hotelParams.hotelSlugName),
      getHotelAmenitiesList(hotelParams.hotelSlugName),
    ]);

    hotelDetails.hotel_Nearby_Places_List = hotelNearbyPlacesList;
    hotelDetails.hotel_Available_Amenities_List = hotelAmenitiesList;
  }

  return {
    hotelDetails,
    roomDetails: roomDetailsInfo,
    planDetails: planDetailsInfo,
    planStatus: planStatusInfo,
  };
};

export const getHotelNearbyHotelsList = async (list: string[]) => {
  let nearbyHotelsList: any[] = [];
  for (let i = 0; i < list.length; i++) {
    const hotelInfo = await getHotelCardTabDetails(list[i]);
    nearbyHotelsList.push(hotelInfo);
  }

  return nearbyHotelsList;
};

export const getNearHotelByRegion = async (city: string, region: string) => {
  const hotelsCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelsQuerySnapshot = await getDocs(hotelsCollectionRef);
  // Here I'm trying to get the list of hotels and then filter them based on the city and region
  const list = await Promise.all(
    hotelsQuerySnapshot.docs.map(async (hotel) => {
      const obj = await getNearHotelCardTabDetails(hotel.id);
      return obj;
    }),
  );
  const filteredList = list.filter(
    (hotel) =>
      (hotel.hotel_City === city && hotel.hotel_Region_Slug_Name === region) ||
      hotel.hotel_City === city,
  );
  return filteredList.splice(0, 4);
};

export const getNearByHotels = async (hotelSlug: string) => {
  const hotelRef = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlug,
  );
  const hotel = await getDoc(hotelRef);
  const hotelData = hotel.data();
  const city = hotelData?.hotel_City;
  const regionSlug = hotelData?.hotel_Region_Slug_Name;
  const nearByHotels = await getNearHotelByRegion(city, regionSlug);
  return nearByHotels;
};

export const getHotelCardTabDetails = async (hotelId: string): Promise<any> => {
  const hotelRef = doc(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME, hotelId);
  const hotel = await getDoc(hotelRef);

  let hotelObj = {
    ...hotel.data(),
  };
  hotelObj.hotel_Images_Object_List = [
    new HotelImageDetails(hotel.data()?.hotel_Image_Url),
  ];

  return hotelObj;
};

export const getNearHotelCardTabDetails = async (
  hotelId: string,
): Promise<any> => {
  const hotelRef = doc(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME, hotelId);
  const hotel = await getDoc(hotelRef);

  let hotelObj = {
    hotel_Name: hotel.data()?.hotel_Name,
    hotel_City: hotel.data()?.hotel_City,
    hotel_Region_Slug_Name: hotel.data()?.hotel_Region_Slug_Name,
    hotel_Image_Url: hotel.data()?.hotel_Image_Url,
    hotel_Slug_Name: hotel.data()?.hotel_Slug_Name,
    hotel_Ratings_Count: hotel.data()?.hotel_Ratings_Count,
    hotel_Starting_Price_Obj: hotel.data()?.hotel_Starting_Price_Obj,
    hotel_Star_Rating: hotel.data()?.hotel_Star_Rating,
    hotel_Landmark: hotel.data()?.hotel_Landmark,
    hotel_Google_Rating: hotel.data()?.hotel_Google_Rating,
  };

  return hotelObj;
};

// here
export const getListOfAllHotelTabs = async () => {
  const hotelsCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelsQuerySnapshot = await getDocs(
    // query(hotelsCollectionRef, orderBy("hotel_Relative_Ordering", "asc"))
    hotelsCollectionRef,
  );

  const list = await Promise.all(
    hotelsQuerySnapshot.docs.map(async (hotel) => {
      const obj = await getHotelCardTabDetails(hotel.id);
      return obj;
    }),
  );

  list.sort(function (a: any, b: any) {
    return b.hotel_Min_Price - a.hotel_Min_Price;
  });

  return list;
};

export const getHotelBookingPageDetails = async (
  hotelSlugName: string,
  fetchImages: boolean = false,
): Promise<any> => {
  const hotelDoc = doc(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
  );
  const hotelInfo = await getDoc(hotelDoc);

  let hotelObj = { ...hotelInfo.data() };
  hotelObj.hotel_Meta_Title = hotelObj.hotel_Meta_Title || "Best hotel";
  hotelObj.hotel_Images_Object_List = [
    new HotelImageDetails(hotelObj.hotel_Image_Url),
  ];

  return hotelObj;
};

export const getAllAmenities = async (): Promise<any> => {
  const amenitiesCollection = collection(
    db,
    HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  );
  const amenitiesSnapshot = await getDocs(amenitiesCollection);

  const amenitiesData = amenitiesSnapshot.docs.map((doc) => doc.data());
  return amenitiesData;
};

export const filterHotels = async (
  slug_name: string,
  ratingArray: any[],
  regionsArray: any[],
  amenityArray: any[],
  priceArray: any[],
): Promise<any> => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  let slugCondtion = where("hotel_City_Slug", "==", slug_name);

  let ratingCondition =
    ratingArray.length > 0
      ? where("hotel_Star_Rating", "in", ratingArray)
      : null;

  let regionsCondition =
    regionsArray.length > 0
      ? where("hotel_Region_Slug_Name", "in", regionsArray)
      : null;

  const priceConditions: any[] = [];

  //creating array of conditions with price array where each value represents
  // {1 = { 0-2000 } , 2 =  {2000-4000} , 3 = {4000- 6000} , 4 = {6000-8000} , 5= {8000- infiny}}

  for (const priceIndex of priceArray) {
    const [minPrice, maxPrice] = getPriceRange(priceIndex);

    if (maxPrice !== Infinity) {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", maxPrice),
      );
      priceConditions.push(condition);
    } else {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", 1000000),
      );
      priceConditions.push(condition);
    }
  }

  const orFilterConditions: any[] = [];
  const andFilterCondition: any[] = [];

  if (ratingCondition != null) andFilterCondition.push(ratingCondition);
  if (regionsCondition != null) andFilterCondition.push(regionsCondition);
  if (priceArray.length > 0) orFilterConditions.push(...priceConditions);

  const docSnapshot = await getDocs(
    query(
      docRef,
      and(slugCondtion, or(...priceConditions), ...andFilterCondition),
    ),
  );

  let result: any[] = [];

  for (const doc of docSnapshot.docs) {
    if (amenityArray.length > 0) {
      const amenitiesRef = collection(
        docRef,
        doc.id,
        HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
      );

      const amenitiesSnapshot = await getDocs(amenitiesRef);

      const amenitiesMatch = amenityArray.every((amenity) =>
        amenitiesSnapshot.docs.some(
          (amenityDoc) => amenityDoc.data().amenity_Name === amenity,
        ),
      );

      if (amenitiesMatch) {
        let hotel_slug_name = doc.data()?.hotel_Slug_Name;

        let info = new HotelInformationDetails();

        info.hotel_Slug_Name = hotel_slug_name;
        info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
        info.hotel_Name = doc.data()?.hotel_Name;
        info.hotel_Landmark = doc.data()?.hotel_Landmark;
        info.hotel_Address = doc.data()?.hotel_Address;
        info.hotel_City = doc.data()?.hotel_City;
        info.hotel_State = doc.data()?.hotel_State;
        info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
        info.hotel_Near_Railway_Station =
          doc.data()?.hotel_Near_Railway_Station;
        info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
        info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
        info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
        info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
          hotel_slug_name,
          100,
        );
        info.hotel_Description = doc.data()?.hotel_Description;
        result.push(info);
      }
    } else {
      let hotel_slug_name = doc.data()?.hotel_Slug_Name;

      let info = new HotelInformationDetails();

      info.hotel_Slug_Name = hotel_slug_name;
      info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
      info.hotel_Name = doc.data()?.hotel_Name;
      info.hotel_Landmark = doc.data()?.hotel_Landmark;
      info.hotel_Address = doc.data()?.hotel_Address;
      info.hotel_City = doc.data()?.hotel_City;
      info.hotel_State = doc.data()?.hotel_State;
      info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
      info.hotel_Near_Railway_Station = doc.data()?.hotel_Near_Railway_Station;
      info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
      info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
      info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
      info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
        hotel_slug_name,
        100,
      );
      info.hotel_Description = doc.data()?.hotel_Description;
      result.push(info);
    }
  }
  return result;
};

const getPriceRange = (idx): any => {
  switch (idx) {
    case 1:
      return [0, 2000];
    case 2:
      return [2000, 4000];
    case 3:
      return [4000, 6000];
    case 4:
      return [6000, 8000];
    case 5:
      return [8000, Infinity];
    default:
      return [0, Infinity];
  }
};

export const fetchHotelTabsInfinite = async (
  lastDoc: any = 1,
  limitSize: number = 5,
  asc: boolean = false,
  orderByValue: string = "hotel_Starting_Price",
): Promise<any> => {
  let chk = lastDoc === 1 ? true : false;

  const hotelCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  );

  if (lastDoc === 1) {
    let lastDocVal = await getDocs(
      query(
        hotelCollectionRef,
        orderBy(orderByValue, asc ? "asc" : "desc"),
        limit(1),
      ),
    );
    lastDoc = lastDocVal.docs[0];
  }
  if (!lastDoc) {
    return {
      lastDoc: null,
      list: [],
    };
  }

  const hotelCollectionQuery = await getDocs(
    query(
      hotelCollectionRef,
      orderBy(orderByValue, asc ? "asc" : "desc"),
      chk ? startAt(lastDoc) : startAfter(lastDoc),
      limit(limitSize),
    ),
  );

  let hotelList: any[] = [];

  for (let hotel of hotelCollectionQuery.docs) {
    let hotelTab = await getHotelCardTabDetails(hotel.id);
    hotelList.push(hotelTab);
  }

  lastDoc = hotelCollectionQuery.docs[hotelCollectionQuery.docs.length - 1];

  if (hotelCollectionQuery.empty) {
    return {
      lastDoc: null,
      list: hotelList,
    };
  }

  return {
    lastDoc: lastDoc,
    list: hotelList,
  };
};

export const getNearbyHotels = async (
  hotelCitySlug: string,
  lastDocValue: any = null,
  queryLimitSize: number = 6,
  eliminateHotelSlug: string,
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const docSnapshot = await getDocs(
    query(
      docRef,
      and(
        where("hotel_City_Slug", "==", hotelCitySlug),
        where("hotel_Slug_Name", "!=", eliminateHotelSlug),
      ),
      orderBy("hotel_Slug_Name", "asc"),
      ...(lastDocValue ? [startAfter(lastDocValue)] : []),
      limit(queryLimitSize),
    ),
  );

  let result: any[] = [];
  let lastDocument: any = null;

  for (const doc of docSnapshot.docs) {
    let hotel_slug_name = doc.data()?.hotel_Slug_Name;

    let info = new HotelInformationDetails();
    info.hotel_City_Slug = doc.data()?.hotel_City_Slug;
    info.hotel_Slug_Name = hotel_slug_name;
    info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
    info.hotel_Name = doc.data()?.hotel_Name;
    info.hotel_Landmark = doc.data()?.hotel_Landmark;
    info.hotel_Address = doc.data()?.hotel_Address;
    info.hotel_City = doc.data()?.hotel_City;
    info.hotel_State = doc.data()?.hotel_State;
    info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
    info.hotel_Near_Railway_Station = doc.data()?.hotel_Near_Railway_Station;
    info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
    info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
    info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
    info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
      hotel_slug_name,
      100,
    );
    info.hotel_Description = doc.data()?.hotel_Description;
    result.push(info);
    lastDocument = doc.data()?.hotel_Slug_Name;
  }

  return { result, lastDocument };
};

export const filterHotelsPaginated = async (
  slug_name: string,
  ratingArray: any[],
  regionsArray: any[],
  amenityArray: any[],
  priceArray: any[],
  limitSize: number = 4,
  lastDoc: any = null,
  excludeHotelSlug: any = null,
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
): Promise<any> => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const orFilterConditions: any[] = [];
  const andFilterCondition: any[] = [];

  let slugCondtion = where("hotel_City_Slug", "==", slug_name);

  let ratingCondition =
    ratingArray.length > 0
      ? where("hotel_Star_Rating", "in", ratingArray)
      : null;

  regionsArray.forEach((item) => {
    andFilterCondition.push(
      where("hotel_Region_Slug_List", "array-contains", item),
    );
  });

  const priceConditions: any[] = [];

  let excludeHotelCondition;
  if (excludeHotelSlug)
    excludeHotelCondition = where("hotel_Slug_Name", "!=", excludeHotelSlug);

  for (const priceIndex of priceArray) {
    const [minPrice, maxPrice] = getPriceRange(priceIndex);

    if (maxPrice !== Infinity) {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", maxPrice),
      );
      priceConditions.push(condition);
    } else {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", 1000000),
      );
      priceConditions.push(condition);
    }
  }

  if (ratingCondition != null) andFilterCondition.push(ratingCondition);
  if (priceArray.length > 0) orFilterConditions.push(...priceConditions);
  if (excludeHotelCondition) andFilterCondition.push(excludeHotelCondition);

  let inequality_order_condition;

  // firestore do not allows two inequality condition with pagination, creating condition for startAfter condition field
  if (excludeHotelSlug && lastDoc) {
    inequality_order_condition = startAfter(lastDoc.data().hotel_Slug_Name);
  } else if (!excludeHotelSlug && lastDoc) {
    inequality_order_condition = startAfter(
      lastDoc.data().hotel_Starting_Price,
    );
  }

  const docSnapshot = await getDocs(
    query(
      docRef,
      and(slugCondtion, or(...priceConditions), ...andFilterCondition),
      ...(excludeHotelSlug
        ? [orderBy("hotel_Slug_Name", "asc")]
        : [orderBy("hotel_Starting_Price", "asc")]),
      ...(lastDoc ? [inequality_order_condition] : []),
      limit(limitSize),
    ),
  );

  let result: any[] = [];
  let lastDocument: any = null;

  for (const doc of docSnapshot.docs) {
    if (amenityArray.length > 0) {
      const amenitiesRef = collection(
        docRef,
        doc.id,
        HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
      );

      const amenitiesSnapshot = await getDocs(amenitiesRef);

      const amenitiesMatch = amenityArray.every((amenity) =>
        amenitiesSnapshot.docs.some(
          (amenityDoc) => amenityDoc.data().amenity_Name === amenity,
        ),
      );

      if (amenitiesMatch) {
        let hotel_slug_name = doc.data()?.hotel_Slug_Name;

        let info = new HotelInformationDetails();

        info.hotel_Slug_Name = hotel_slug_name;
        info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
        info.hotel_Name = doc.data()?.hotel_Name;
        info.hotel_Landmark = doc.data()?.hotel_Landmark;
        info.hotel_Address = doc.data()?.hotel_Address;
        info.hotel_City = doc.data()?.hotel_City;
        info.hotel_State = doc.data()?.hotel_State;
        info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
        info.hotel_Near_Railway_Station =
          doc.data()?.hotel_Near_Railway_Station;
        info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
        info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
        info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
        info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
          hotel_slug_name,
          100,
        );
        info.hotel_Starting_PlanPackage = await fetchHotelStartingDatePrice(
          hotel_slug_name,
          startDate,
          endDate,
        );
        info.hotel_Description = doc.data()?.hotel_Description;
        result.push(info);
      }
    } else {
      let hotel_slug_name = doc.data()?.hotel_Slug_Name;

      let info = new HotelInformationDetails();

      info.hotel_Slug_Name = hotel_slug_name;
      info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
      info.hotel_Name = doc.data()?.hotel_Name;
      info.hotel_Landmark = doc.data()?.hotel_Landmark;
      info.hotel_Address = doc.data()?.hotel_Address;
      info.hotel_City = doc.data()?.hotel_City;
      info.hotel_State = doc.data()?.hotel_State;
      info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
      info.hotel_Near_Railway_Station = doc.data()?.hotel_Near_Railway_Station;
      info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
      info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
      info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
      info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
        hotel_slug_name,
        100,
      );
      info.hotel_Starting_PlanPackage = await fetchHotelStartingDatePrice(
        hotel_slug_name,
        startDate,
        endDate,
      );
      info.hotel_Description = doc.data()?.hotel_Description;
      result.push(info);
    }
  }

  lastDocument = docSnapshot.docs[docSnapshot.docs.length - 1] || null;

  return { result, lastDocument };
};

export const filterHotelsWithRegionPaginated = async (
  city_slug_name: string,
  region_slug: string,
  ratingArray: any[],
  regionsArray: any[],
  amenityArray: any[],
  priceArray: any[],
  limitSize: number = 4,
  lastDoc: any = null,
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
): Promise<any> => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  let ratingCondition =
    ratingArray.length > 0
      ? where("hotel_Star_Rating", "in", ratingArray)
      : null;

  let regionsCondition =
    regionsArray.length > 0
      ? where("hotel_Region_Slug_Name", "in", regionsArray)
      : null;

  let city_slug_condition = where("hotel_City_Slug", "==", city_slug_name);

  const priceConditions: any[] = [];

  //creating array of conditions with price array where each value represents
  // {1 = { 0-2000 } , 2 =  {2000-4000} , 3 = {4000- 6000} , 4 = {6000-8000} , 5= {8000- infiny}}

  for (const priceIndex of priceArray) {
    const [minPrice, maxPrice] = getPriceRange(priceIndex);

    if (maxPrice !== Infinity) {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", maxPrice),
      );
      priceConditions.push(condition);
    } else {
      let condition = and(
        where("hotel_Starting_Price", ">=", minPrice),
        where("hotel_Starting_Price", "<=", 1000000),
      );
      priceConditions.push(condition);
    }
  }

  const orFilterConditions: any[] = [];
  const andFilterCondition: any[] = [];

  let city_region_condition = where(
    "hotel_Region_Slug_List",
    "array-contains",
    city_slug_name + "-|-" + region_slug,
  );

  andFilterCondition.push(city_region_condition);

  if (ratingCondition != null) andFilterCondition.push(ratingCondition);
  if (regionsCondition != null) andFilterCondition.push(regionsCondition);
  if (priceArray.length > 0) orFilterConditions.push(...priceConditions);

  const docSnapshot = await getDocs(
    query(
      docRef,
      and(city_slug_condition, or(...priceConditions), ...andFilterCondition),
      orderBy("hotel_Starting_Price", "asc"),
      ...(lastDoc ? [startAfter(lastDoc.data().hotel_Starting_Price)] : []),
      limit(limitSize),
    ),
  );

  let result: any[] = [];
  let lastDocument: any = null;

  for (const doc of docSnapshot.docs) {
    if (amenityArray.length > 0) {
      const amenitiesRef = collection(
        docRef,
        doc.id,
        HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
      );

      const amenitiesSnapshot = await getDocs(amenitiesRef);

      const amenitiesMatch = amenityArray.every((amenity) =>
        amenitiesSnapshot.docs.some(
          (amenityDoc) => amenityDoc.data().amenity_Name === amenity,
        ),
      );

      if (amenitiesMatch) {
        let hotel_slug_name = doc.data()?.hotel_Slug_Name;

        let info = new HotelInformationDetails();

        info.hotel_Slug_Name = hotel_slug_name;
        info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
        info.hotel_Name = doc.data()?.hotel_Name;
        info.hotel_Landmark = doc.data()?.hotel_Landmark;
        info.hotel_Address = doc.data()?.hotel_Address;
        info.hotel_City = doc.data()?.hotel_City;
        info.hotel_State = doc.data()?.hotel_State;
        info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
        info.hotel_Near_Railway_Station =
          doc.data()?.hotel_Near_Railway_Station;
        info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
        info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
        info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
        info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
          hotel_slug_name,
          100,
        );
        info.hotel_Starting_PlanPackage = await fetchHotelStartingDatePrice(
          hotel_slug_name,
          startDate,
          endDate,
        );
        info.hotel_Description = doc.data()?.hotel_Description;
        result.push(info);
      }
    } else {
      let hotel_slug_name = doc.data()?.hotel_Slug_Name;

      let info = new HotelInformationDetails();

      info.hotel_Slug_Name = hotel_slug_name;
      info.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
      info.hotel_Name = doc.data()?.hotel_Name;
      info.hotel_Landmark = doc.data()?.hotel_Landmark;
      info.hotel_Address = doc.data()?.hotel_Address;
      info.hotel_City = doc.data()?.hotel_City;
      info.hotel_State = doc.data()?.hotel_State;
      info.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
      info.hotel_Near_Railway_Station = doc.data()?.hotel_Near_Railway_Station;
      info.hotel_Image_Url = doc.data()?.hotel_Image_Url;
      info.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
      info.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
      info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
        hotel_slug_name,
        100,
      );
      info.hotel_Starting_PlanPackage = await fetchHotelStartingDatePrice(
        hotel_slug_name,
        startDate,
        endDate,
      );
      info.hotel_Description = doc.data()?.hotel_Description;
      result.push(info);
    }
  }

  lastDocument = docSnapshot.docs[docSnapshot.docs.length - 1] || null;

  return { result, lastDocument };
};

export const getHotelInfoForCard = async (hotel_slug: string): Promise<any> => {
  const docRef = doc(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME, hotel_slug);
  const hotelInfoSnapshot = await getDoc(docRef);

  let info = new HotelInformationDetails();

  info.hotel_Slug_Name = hotel_slug;
  info.hotel_Firebase_Id = hotelInfoSnapshot.data()?.hotel_Firebase_Id;
  info.hotel_Name = hotelInfoSnapshot.data()?.hotel_Name;
  info.hotel_Landmark = hotelInfoSnapshot.data()?.hotel_Landmark;
  info.hotel_Address = hotelInfoSnapshot.data()?.hotel_Address;
  info.hotel_City = hotelInfoSnapshot.data()?.hotel_City;
  info.hotel_State = hotelInfoSnapshot.data()?.hotel_State;
  info.hotel_Star_Rating = hotelInfoSnapshot.data()?.hotel_Star_Rating;
  info.hotel_Near_Railway_Station =
    hotelInfoSnapshot.data()?.hotel_Near_Railway_Station;
  info.hotel_Image_Url = hotelInfoSnapshot.data()?.hotel_Image_Url;
  info.hotel_Starting_Price = hotelInfoSnapshot.data()?.hotel_Starting_Price;
  info.hotel_Region_Slug_Name =
    hotelInfoSnapshot.data()?.hotel_Region_Slug_Name;
  info.hotel_Starting_PlanPackage = await fetchHotelStartingDatePrice(
    hotel_slug,
    new Date(),
    addDays(new Date(), 1),
  );
  info.hotel_Description = hotelInfoSnapshot.data()?.hotel_Description;
  return info;
};

export const get_all_hotels_in_a_city_for_local_business_schema = async (
  city_slug: string,
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const docSnapshot = await getDocs(
    query(docRef, where("hotel_City_Slug", "==", city_slug)),
  );

  let result: any[] = [];

  for (let hotel of docSnapshot.docs) {
    let hotel_slug_name = hotel.data()?.hotel_Slug_Name;

    let info = {
      hotel_Slug_Name: "",
      hotel_Name: "",
      hotel_City: "",
      hotel_State: "",
      hotel_Star_Rating: "",
      hotel_Pincode: 0,
      meta_title: LOCAL_BUSINESS_HOTEL_META_TITLE,
      meta_description: LOCAL_BUSINESS_HOTEL_META_DESCRIPTION,
      meta_image_url: LOCAL_BUSINESS_HOTEL_META_IMAGE_URL,
      hotel_address: "",
      hotel_Starting_Price: 0,
    };

    info.hotel_Slug_Name = hotel_slug_name;
    info.hotel_Name = hotel.data()?.hotel_Name;
    info.hotel_City = hotel.data()?.hotel_City;
    info.hotel_State = hotel.data()?.hotel_State;
    info.hotel_Star_Rating = hotel.data()?.hotel_Star_Rating;
    info.hotel_address = hotel.data()?.hotel_Address;
    info.hotel_Pincode = hotel.data()?.hotel_Pincode;
    info.hotel_Starting_Price = hotel.data()?.hotel_Starting_Price;

    result.push(info);
  }
  return result;
};

// export const getNearbyHotels;
export const fetchHotelStartingDatePrice = async (
  hotelSlugName: string,
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
): Promise<PlanPackageDetails> => {
  let planPkg = new PlanPackageDetails();

  try {
    const hotel_room_col_ref = collection(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelSlugName,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    );
    const hotel_room_col = await getDocs(
      query(hotel_room_col_ref, orderBy("hotelRoom_Starting_Price", "asc")),
    );

    let checkInDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );
    let inventory_available = false;
    for (let room of hotel_room_col.docs) {
      let sd = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
      let ed = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
      );

      let num_Nights = getDateDifference(sd, ed);
      if (num_Nights > 0) {
        ed = addDays(sd, num_Nights - 1);
      }

      let room_inv_avail = true;
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
          hotelSlugName,
          HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
          room.id,
          YEAR_PLANNER_COLLECTION_NAME,
          `${yearVal}`,
          MONTH_PLANNER_COLLECTION_NAME,
          `MONTH-${monthVal}`,
          DAY_PLANNER_COLLECTION_NAME,
          `DAY-${dayVal}`,
        );
        const inventoryInfo = await getDoc(docRef);

        if (!inventoryInfo.exists()) {
          continue;
        } else {
          if (inventoryInfo.data()?.hotelRoom_Count > 0) continue;
          else {
            room_inv_avail = false;
            break;
          }
        }
      }

      if (!room_inv_avail) continue;
      const hotel_room_plan_col_ref = collection(
        db,
        HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
        hotelSlugName,
        HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
        room.id,
        HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
      );
      const hotel_room_plan_col = await getDocs(
        query(
          hotel_room_plan_col_ref,
          limit(1),
          orderBy("roomPlan_Price", "asc"),
        ),
      );

      for (let plan of hotel_room_plan_col.docs) {
        planPkg = await getHotelRoomPlanPriceDetails(
          hotelSlugName,
          room.id,
          plan.id,
          -1,
          1200,
          10,
          checkInDate,
        );
        inventory_available = true;

        if (planPkg.plan_Base_Price === -1) {
          const plan_doc_ref = doc(
            db,
            HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
            hotelSlugName,
            HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
            room.id,
            HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
            plan.id,
          );
          const plan_doc = await getDoc(plan_doc_ref);
          planPkg.plan_Base_Price = Number(+plan_doc.data()?.roomPlan_Price);
        }
        break;
      }

      if (inventory_available) break;
    }
  } catch (error) {
    planPkg.plan_Base_Price = 1200;
  }

  return planPkg;
};

export const getHotelFAQsListForGoogleSchema = async (
  hotelId: string,
  listSize: number = 10,
): Promise<any> => {
  const firestore = getFirestore();

  const hotelFaqsCollectionRef = collection(
    firestore,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_FAQ_INFORMATION_COLLECION_NAME,
  );
  const hotelFaqsQuerySnapshotCollectionRef = query(
    hotelFaqsCollectionRef,
    limit(listSize),
  );
  const hotelFaqsQuerySnapshot = await getDocs(
    hotelFaqsQuerySnapshotCollectionRef,
  );

  let faqList: any[] = [];
  let schemaList: any[] = [];
  for (let faq of hotelFaqsQuerySnapshot.docs) {
    let faqObj = { ...faq.data() };
    let schemaObj = {
      "@type": "Question",
      name: `${faq.data().faq_Question}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${faq.data().faq_Answer}`,
      },
    };
    faqList.push(faqObj);
    schemaList.push(schemaObj);
  }

  return { faqList, schemaList };
};

// paginated Data
export const fetchHotelReviewPaginated = async (
  hotel_Id: any,
  page: any = 1,
  limitPerPage: any = 10,
) => {
  try {
    const hotelDocRef = doc(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotel_Id,
    );
    const reviewsCollectionRef = collection(
      hotelDocRef,
      "HOTEL-GOOGLE-REVIEWS-INFORMATION",
    );

    // Fetch all reviews to calculate total number of reviews
    const totalReviewsSnapshot = await getDocs(reviewsCollectionRef);
    const totalReviews = totalReviewsSnapshot.size;
    const totalPages = Math.ceil(totalReviews / limitPerPage);

    // Pagination logic
    let paginatedQuery = query(
      reviewsCollectionRef,
      orderBy("review_posting_time"),
      limit(limitPerPage),
    );
    if (page > 1) {
      const startAtIndex = (page - 1) * limitPerPage;
      const startAtSnapshot = await getDocs(
        query(
          reviewsCollectionRef,
          orderBy("review_posting_time"),
          limit(startAtIndex),
        ),
      );
      const startAtDoc = startAtSnapshot.docs[startAtSnapshot.docs.length - 1];
      paginatedQuery = query(
        reviewsCollectionRef,
        orderBy("review_posting_time"),
        startAfter(startAtDoc),
        limit(limitPerPage),
      );
    }

    // Fetch paginated reviews
    const reviewsSnapshot = await getDocs(paginatedQuery);
    const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

    return {
      page,
      totalPages,
      reviews,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const fetchHotelData = async (hotel_Id: string) => {
  const hotelDoc = doc(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME, hotel_Id);
  const hotelData = await getDoc(hotelDoc);

  const hotelInfo = hotelData.data();
  let hotelDetails = { ...hotelInfo };
  hotelDetails["hotel_Images_Object_List"] = [];

  return hotelDetails;
};

export const fetchOverviewHotelData = async (hotel_Id: string) => {
  const hotelDoc = doc(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME, hotel_Id);
  const hotelData = await getDoc(hotelDoc);

  const hotelInfo = hotelData.data();

  let obj = {
    hotel_Name: hotelInfo?.hotel_Name,
    hotel_City: hotelInfo?.hotel_City,
    hotel_Image_Url: hotelInfo?.hotel_Image_Url,
    hotel_State_Slug: hotelInfo?.hotel_State_Slug,
    hotel_Landmark: hotelInfo?.hotel_Landmark,
    hotel_Google_Rating: hotelInfo?.hotel_Google_Rating,
    hotel_Ratings_Count: hotelInfo?.hotel_Ratings_Count,
    hotel_Rating_Distribution: hotelInfo?.hotel_Rating_Distribution,
    hotel_star: hotelInfo?.hotel_Star_Rating,
  };

  let hotelDetails = { ...obj };

  return hotelDetails;
};

export const fetchReviewHotelData = async (hotel_Id: string) => {
  let [hotelData, reviewData] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    fetchHotelReviewPaginated(hotel_Id, 1),
  ]);

  return { hotelData, reviewData };
};

export const fetchFaqHotelData = async (hotel_Id: string) => {
  let [hotelData, faq] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    getHotelFAQsList(hotel_Id),
  ]);

  return { hotelData, faq };
};

export const fetchRoomHotelData = async (hotel_Id: string) => {
  let [hotelData, roomsList] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    getHotelRoomDetailsList(hotel_Id, true, 10),
  ]);

  return { hotelData, roomsList };
};

export const fetchAmenitiesHotelData = async (hotel_Id: string) => {
  let [hotelData, amenities] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    getHotelAmenitiesList(hotel_Id),
  ]);

  return { hotelData, amenities };
};

export const fetchNearbyPlaceHotelData = async (hotel_Id: string) => {
  let [hotelData, nearby] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    getHotelNearByPlacesList(hotel_Id),
  ]);

  return { hotelData, nearby };
};

export const fetchPhotoHotelData = async (hotel_Id: string) => {
  const [hotelData, imagesList, roomsList] = await Promise.all([
    fetchOverviewHotelData(hotel_Id),
    getHotelImageObjectList(hotel_Id, 10),
    getHotelRoomDetailsList(hotel_Id, true, 10),
  ]);

  return { hotelData, imagesList, roomsList };
};

export const fetchHotelRoomsList = async (hotel_Id: string) => {
  const hotelRoomCol = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotel_Id,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const hotelRoomsQuerySnapshot = await getDocs(hotelRoomCol);

  let hotelRoomsList: any[] = hotelRoomsQuerySnapshot.docs.map(
    (roomInfo: any) => {
      let roomData = { ...roomInfo.data() };
      return roomData;
    },
  );

  return hotelRoomsList;
};

export const fetchHotelInfoPageHandler = async (hotelSlugName: string) => {
  const [hotelDetails, { faqList, schemaList }, hotel_Images_Object_List] =
    await Promise.all([
      fetchHotelData(hotelSlugName),
      getHotelFAQsListForGoogleSchema(hotelSlugName, 1000),
      getHotelImageObjectList(hotelSlugName, 3),
    ]);

  hotelDetails.hotel_FAQ_Schema_List = schemaList;
  hotelDetails.hotel_Images_Object_List = hotel_Images_Object_List;

  return hotelDetails;
};

export const fetchHotelInfoAllPageHandler = async (hotelSlugName: string) => {
  const [
    hotelDetails,
    roomsList,
    { faqList, schemaList },
    hotel_Images_Object_List,
    amenityList,
    nearbyPlacesList,
    reviewList,
  ] = await Promise.all([
    fetchHotelData(hotelSlugName),
    getHotelRoomDetailsList(hotelSlugName, true, 12),
    getHotelFAQsListForGoogleSchema(hotelSlugName, 100),
    getHotelImageObjectList(hotelSlugName, 24),
    getHotelAmenitiesList(hotelSlugName),
    getHotelNearByPlacesList(hotelSlugName),
    fetchHotelReviews(hotelSlugName, 50),
  ]);

  hotelDetails.hotel_Rooms_List = roomsList;
  hotelDetails.hotel_FAQ_Schema_List = schemaList;
  hotelDetails.hotel_Images_Object_List = hotel_Images_Object_List;
  hotelDetails.hotel_Available_Amenities_List = amenityList;
  hotelDetails.hotel_Nearby_Places_List = nearbyPlacesList;
  hotelDetails.hotel_Review_List = reviewList;

  return hotelDetails;
};

export const fetchAllHotelsData = async () => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const querySnapshots = await getDocs(docRef);
  let results: any[] = [];
  querySnapshots.forEach((data) => {
    results.push(data.id);
  });

  return results;
};

export const showMessage = (message) => {
  return message;
};

export const fetchHotelReviews = async (
  hotel_Id: string,
  max: number = 50,
  order_by: string = "review_posting_time",
  order_asc: boolean = true,
) => {
  try {
    const hotelDocRef = collection(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotel_Id,
      HOTEL_GOOGLE_REVIEWS_INFORMATION,
    );

    // Query reviews with the specified limit
    const querySnapshot = await getDocs(
      query(
        hotelDocRef,
        orderBy(order_by, order_asc ? "asc" : "desc"),
        limit(max),
      ),
    );

    // Extract review data from snapshot
    const reviews = querySnapshot.docs.map((doc) => doc.data());

    return reviews;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const fetchAllRegions = async () => {
  //here we're storing all regions in an object where they key will be city and value will be array of regions
  let regions = {};
  try {
    const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      let region = doc.data().hotel_Region_Slug_List;
      let city = doc.data().hotel_City.toLowerCase();
      if (city in regions) {
      } else {
        regions[city] = [region];
      }
    });
    if (!regions) {
      return {
        status: "FAILED",
        data: {},
        message: "No regions found",
      };
    }
    return {
      status: "SUCCESS",
      data: regions,
      message: "Regions fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "FAILED",
      data: {},
      message: "Failed to fetch regions",
    };
  }
};
