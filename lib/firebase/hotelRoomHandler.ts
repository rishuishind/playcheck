import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  AgeInfo,
  HotelRoomInformation,
} from "../classModels/hotels/hotelRoomInfo";
import { db } from ".";
import {
  HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_AMENITIES_INFORMATION_COLLECION_NAME,
  HOTEL_ROOM_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
} from "../helper";
import { HotelImageDetails } from "../classModels/images/hotelImageDetails";
import { HotelAmenityInformation } from "../classModels/hotels/hotelAmenityInfo";
import {
  checkHotelRoomInventoryAvailability,
  getHotelRoomPlanPriceDateRangeList,
  getHotelRoomPlanPriceDateRangeMap,
  getHotelRoomPlanPriceDetails,
} from "../handlers/calendarHandler";
import { HotelRoomPlanInformation } from "../classModels/hotels/hotelRoomPlanInfo";
import {
  getHotelRoomPlanTab,
  getRoomPlanListWithDateRangeInfo,
} from "./hotelRoomPlanHandler";

export const getHotelRoomImageInfoList = async (
  hotelId: string,
  roomId: string,
  imageCount: number = 10,
  colName: string = HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
) => {
  const hotelCollectionRef = collection(
    db,
    colName,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelImagesQuerySnapshot = await getDocs(
    query(hotelCollectionRef, limit(imageCount)),
  );

  let list: any[] = hotelImagesQuerySnapshot.docs.map((image: any) => {
    let obj = { ...image.data() };
    return obj;
  });

  return list;
};

// Hotel Room Image Details
export const getHotelRoomImageDetails = async (
  hotelId: string,
  roomId: string,
  imageId: string,
  isTitle: boolean = false,
  isDes: boolean = false,
  isType: boolean = false,
  isMTitle: boolean = false,
  isMDes: boolean = false,
  isMDesList: boolean = false,
): Promise<HotelImageDetails> => {
  const roomImage = await getDoc(
    doc(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelId,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
      HOTEL_ROOM_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
      imageId,
    ),
  );

  // let imageInfo = new HotelImageDetails();
  // imageInfo.image_Id = roomImage.id;
  // imageInfo.image_Url = roomImage.data()?.image_Url;
  // imageInfo.image_Title = isTitle ? roomImage.data()?.image_Title : "";
  // imageInfo.image_Description = isDes
  //   ? roomImage.data()?.image_Description
  //   : "";
  // imageInfo.image_Type = isType ? roomImage.data()?.image_Type : "";
  // imageInfo.image_Meta_Title = isMTitle
  //   ? roomImage.data()?.image_Meta_Title
  //   : "";
  // imageInfo.image_Meta_Description = isMDes
  //   ? roomImage.data()?.image_Meta_Description
  //   : "";
  // imageInfo.image_Description_List = isMDesList
  //   ? roomImage.data()?.image_Description_List
  //   : [];
  let imageInfo = { ...roomImage.data() };
  imageInfo.image_Url = roomImage.data()?.image_Url;

  return imageInfo as HotelImageDetails;
};

// Hotel Room Images Details List
export const getHotelRoomImageObjectList = async (
  hotelId: string,
  roomId: string,
  imageCount: number = 1000,
  isTitle: boolean = false,
  isDes: boolean = false,
  isType: boolean = false,
  isMTitle: boolean = false,
  isMDes: boolean = false,
  isMDesList: boolean = false,
): Promise<HotelImageDetails[]> => {
  const hotelCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
    roomId,
    HOTEL_ROOM_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  const hotelImagesQuerySnapshot = await getDocs(
    query(hotelCollectionRef, limit(imageCount)),
  );

  let list: HotelImageDetails[] = await Promise.all(
    hotelImagesQuerySnapshot.docs.map(async (roomImage: any) => {
      const obj = await getHotelRoomImageDetails(
        hotelId,
        roomId,
        roomImage.id,
        isTitle,
        isDes,
        isType,
        isMTitle,
        isMDes,
        isMDesList,
      );

      return obj;
    }),
  );

  return list;
};

// Amenity Details
export const getHotelRoomAmenityDetails = async (
  hotelSlugName: string,
  roomId: string,
  amenityId: string,
): Promise<HotelAmenityInformation> => {
  let amenityDetails = new HotelAmenityInformation();
  const amenityInfo = await getDoc(
    doc(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelSlugName,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
      HOTEL_ROOM_AMENITIES_INFORMATION_COLLECION_NAME,
      amenityId,
    ),
  );

  let obj = { ...amenityInfo.data() } as HotelAmenityInformation;
  obj.amenity_Id = amenityInfo.id;
  return obj;
};

// Amenity Details List
export const getHotelRoomAmenityObjectList = async (
  hotelSlugName: string,
  roomId: string,
  limitSize: number = 100,
): Promise<HotelAmenityInformation[]> => {
  const amenityQuery = await getDocs(
    query(
      collection(
        db,
        HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
        hotelSlugName,
        HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
        roomId,
        HOTEL_ROOM_AMENITIES_INFORMATION_COLLECION_NAME,
      ),
      limit(limitSize),
    ),
  );

  let amenityList: HotelAmenityInformation[] = await Promise.all(
    amenityQuery.docs.map(async (amenity: any) => {
      let amenityObj = await getHotelRoomAmenityDetails(
        hotelSlugName,
        roomId,
        amenity.id,
      );
      return amenityObj;
    }),
  );

  return amenityList;
};

// Hotel Room Details
export const getHotelRoomDetails = async (
  hotelSlugName: string,
  roomId: string,
  isImageList: boolean = false,
  imageListSize: number = 5,
  isAmenitiesList: boolean = false,
  amenitiesListSize: number = 5,
): Promise<HotelRoomInformation> => {
  let roomDetails = new HotelRoomInformation();
  let roomInfo = await getDoc(
    doc(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelSlugName,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
    ),
  );
  if (!roomInfo.exists()) return roomDetails;
  roomDetails = { ...roomDetails, ...roomInfo.data() };

  roomDetails.hotelRoom_Guest_Count = Number(
    roomInfo.data()?.hotelRoom_Guest_Count,
  );
  roomDetails.hotelRoom_Guest_Price = Number(
    roomInfo.data()?.hotelRoom_Guest_Price,
  );
  roomDetails.hotelRoom_Guest_Price_Percentage = Number(
    roomInfo.data()?.hotelRoom_Guest_Price_Percentage,
  );
  roomDetails.hotelRoom_Children_Count =
    +roomInfo.data()?.hotelRoom_Children_Count;
  roomDetails.hotelRoom_Children_Age_Limit = Number(
    roomInfo.data()?.hotelRoom_Children_Age_Limit,
  );
  roomDetails.hotelRoom_Min_Children_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Min_Children_Occupancy,
  );
  roomDetails.hotelRoom_Max_Children_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Max_Children_Occupancy,
  );
  roomDetails.hotelRoom_Children_Price = Number(
    roomInfo.data()?.hotelRoom_Children_Price,
  );
  roomDetails.hotelRoom_Min_Guest_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Min_Guest_Occupancy,
  );
  roomDetails.hotelRoom_Max_Guest_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Max_Guest_Occupancy,
  );
  roomDetails.hotelRoom_Max_Age_List = roomInfo.data()?.hotelRoom_Max_Age_List
    ? roomInfo
        .data()
        ?.hotelRoom_Max_Age_List.sort(
          (a: AgeInfo, b: AgeInfo) => a.max_age - b.max_age,
        )
    : [
        {
          amount: 0,
          counts_as_base_occupant: "never",
          exclude_from_capacity: true,
          max_age: 5,
          percentage: 0,
        },
      ];

  if (isImageList && isAmenitiesList) {
    const [imageList, amenityList] = await Promise.all([
      getHotelRoomImageObjectList(hotelSlugName, roomId, imageListSize),
      getHotelRoomAmenityObjectList(hotelSlugName, roomId, amenitiesListSize),
    ]);

    roomDetails.hotelRoom_Images_Object_List = imageList;
    roomDetails.hotelRoom_Amenities_List = amenityList;
  } else {
    if (isImageList) {
      roomDetails.hotelRoom_Images_Object_List =
        await getHotelRoomImageObjectList(hotelSlugName, roomId, imageListSize);
    }
    if (isAmenitiesList) {
      roomDetails.hotelRoom_Amenities_List =
        await getHotelRoomAmenityObjectList(
          hotelSlugName,
          roomId,
          amenitiesListSize,
        );
    }
  }

  return roomDetails;
};

export const getHotelRoomDetailsList = async (
  hotel_Id: string,
  isImageList: boolean = false,
  imageListSize: number = 5,
  isAmenitiesList: boolean = false,
  amenitiesListSize: number = 5,
): Promise<HotelRoomInformation[]> => {
  const roomCol = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotel_Id,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );

  const roomColRef = await getDocs(
    query(roomCol, orderBy("hotelRoom_Starting_Price", "asc")),
  );

  let roomsList: HotelRoomInformation[] = await Promise.all(
    roomColRef.docs.map(async (room: any) => {
      return await getHotelRoomDetails(
        hotel_Id,
        room.id,
        isImageList,
        imageListSize,
        isAmenitiesList,
        amenitiesListSize,
      );
    }),
  );

  return roomsList;
};

// Hotel Room Tab Info
export const getHotelRoomTab = async (
  hotelSlugName: string,
  roomId: string,
): Promise<HotelRoomInformation> => {
  let roomDetails = new HotelRoomInformation();

  let roomInfo = await getDoc(
    doc(
      db,
      HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      hotelSlugName,
      HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
      roomId,
    ),
  );
  if (!roomInfo.exists()) return roomDetails;

  roomDetails.hotelRoom_Id = roomInfo.id;
  roomDetails.hotelRoom_Type = roomInfo.data()?.hotelRoom_Type;
  roomDetails.hotelRoom_Info = roomInfo.data()?.hotelRoom_Info;
  roomDetails.hotelRoom_Image_Url = roomInfo.data()?.hotelRoom_Image_Url;
  roomDetails.hotelRoom_Count = roomInfo.data()?.hotelRoom_Count
    ? roomInfo.data()?.hotelRoom_Count
    : 1;
  roomDetails.hotelRoom_Guest_Count = Number(
    roomInfo.data()?.hotelRoom_Guest_Count,
  );
  roomDetails.hotelRoom_Starting_Price = Number(
    roomInfo.data()?.hotelRoom_Starting_Price,
  );

  roomDetails.hotelRoom_Children_Age_Limit = Number(
    roomInfo.data()?.hotelRoom_Children_Age_Limit,
  );
  roomDetails.hotelRoom_Min_Children_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Min_Children_Occupancy,
  );
  roomDetails.hotelRoom_Max_Children_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Max_Children_Occupancy,
  );
  roomDetails.hotelRoom_Children_Price = Number(
    roomInfo.data()?.hotelRoom_Children_Price,
  );
  roomDetails.hotelRoom_Min_Guest_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Min_Guest_Occupancy,
  );
  roomDetails.hotelRoom_Max_Guest_Occupancy = Number(
    roomInfo.data()?.hotelRoom_Max_Guest_Occupancy,
  );
  roomDetails.hotelRoom_Guest_Price = Number(
    roomInfo.data()?.hotelRoom_Guest_Price,
  );
  roomDetails.hotelRoom_Guest_Price_Percentage = Number(
    roomInfo.data()?.hotelRoom_Guest_Price_Percentage,
  );
  roomDetails.hotelRoom_Max_Age_List = roomInfo.data()?.hotelRoom_Max_Age_List
    ? roomInfo
        .data()
        ?.hotelRoom_Max_Age_List.sort(
          (a: AgeInfo, b: AgeInfo) => a.max_age - b.max_age,
        )
    : [
        {
          amount: 0,
          counts_as_base_occupant: "never",
          exclude_from_capacity: true,
          max_age: 5,
          percentage: 0,
        },
      ];
  // roomDetails.hotelRoom_Images_Object_List = [
  //   new HotelImageDetails(roomDetails.hotelRoom_Image_Url),
  // ];

  roomDetails.hotelRoom_Images_Object_List = await getHotelRoomImageObjectList(
    hotelSlugName,
    roomId,
    10,
  );
  // roomDetails.hotelRoom_Amenities_List = await getHotelRoomAmenityObjectList(
  //   hotelSlugName,
  //   roomId,
  //   5
  // );
  if (roomDetails.hotelRoom_Images_Object_List.length === 0) {
    roomDetails.hotelRoom_Images_Object_List = [
      new HotelImageDetails(roomDetails.hotelRoom_Image_Url),
    ];
  }
  return roomDetails;
};

export const getHotelRoomTabList = async (
  hotelSlugName: string,
  ascOrder: boolean = true,
): Promise<HotelRoomInformation[]> => {
  let roomsList: HotelRoomInformation[] = [];

  const roomCol = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const roomQuery = await getDocs(query(roomCol));

  for (let room of roomQuery.docs) {
    let roomTab = await getHotelRoomTab(hotelSlugName, room.id);
    roomsList.push(roomTab);
  }

  if (ascOrder) {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return a.hotelRoom_Starting_Price - b.hotelRoom_Starting_Price;
    });
  } else {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return b.hotelRoom_Starting_Price - a.hotelRoom_Starting_Price;
    });
  }

  return roomsList;
};

export const getHotelRoomListWithDateRange = async (
  hotelSlugName: string,
  checkInDate: Date,
  checkOutDate: Date,
  ascOrder: boolean = true,
): Promise<HotelRoomInformation[]> => {
  let roomsList: HotelRoomInformation[] = [];

  const roomCol = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const roomQuery = await getDocs(query(roomCol));

  for (let room of roomQuery.docs) {
    let checkAvailability = await checkHotelRoomInventoryAvailability(
      hotelSlugName,
      room.id,
      checkInDate,
      checkOutDate,
    );
    if (checkAvailability) {
      let roomTab: HotelRoomInformation = await getHotelRoomTab(
        hotelSlugName,
        room.id,
      );
      roomTab.hotelRoom_Plans_List = await getRoomPlanListWithDateRangeInfo(
        hotelSlugName,
        room.id,
        roomTab,
        checkInDate,
        checkOutDate,
      );
      roomsList.push(roomTab);
    }
  }

  if (ascOrder) {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return a.hotelRoom_Starting_Price - b.hotelRoom_Starting_Price;
    });
  } else {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return b.hotelRoom_Starting_Price - a.hotelRoom_Starting_Price;
    });
  }

  return roomsList;
};

export const getHotelRoomsList = async (
  hotelId: string,
  num_guests: number,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<HotelRoomInformation[]> => {
  const hotelRoomInfoCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );

  const hotelRoomInfoGuestNumQuerySnapshot = await getDocs(
    query(
      hotelRoomInfoCollectionRef,
      where("hotelRoom_Guest_Count", "==", num_guests),
    ),
  );

  let list: HotelRoomInformation[] = [];
  const hotelRoomInfoQuerySnapshot = await getDocs(hotelRoomInfoCollectionRef);
  for (let room of hotelRoomInfoQuerySnapshot.docs) {
    let check = await checkHotelRoomInventoryAvailability(
      hotelId,
      room.id,
      checkInDate,
      checkOutDate,
    );
    if (!check) {
      return [];
    }
    if (true) {
      let roomDetails = new HotelRoomInformation();
      roomDetails.hotelRoom_Id = room.data().hotelRoom_Id;
      roomDetails.hotelRoom_Type = room.data().hotelRoom_Type;
      roomDetails.hotelRoom_Info = room.data().hotelRoom_Info;
      roomDetails.hotelRoom_Guest_Count = Number(
        room.data().hotelRoom_Guest_Count,
      );
      roomDetails.hotelRoom_Guest_Price = Number(
        room.data().hotelRoom_Guest_Price,
      );
      roomDetails.hotelRoom_Guest_Price_Percentage = Number(
        room.data().hotelRoom_Guest_Price_Percentage,
      );
      // roomDetails.hotelRoom_Images_List = room.data().hotelRoom_Images_List;
      roomDetails.hotelRoom_Images_Object_List =
        await getHotelRoomImageObjectList(hotelId, room.id);
      roomDetails.hotelRoom_Amenities_List =
        room.data().hotelRoom_Amenities_List;
      roomDetails.hotelRoom_Features_List = room.data().hotelRoom_Features_List;

      const hotelRoomPlanCollectionRef = collection(
        db,
        HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
        hotelId,
        HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
        room.id,
        HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
      );

      const hotelRoomPlanQuerySnapshot = await getDocs(
        query(hotelRoomPlanCollectionRef, orderBy("roomPlan_Price", "asc")),
      );

      for (let roomPlan of hotelRoomPlanQuerySnapshot.docs) {
        let planDetails = new HotelRoomPlanInformation();
        planDetails.roomPlan_Id = roomPlan.data().roomPlan_Id;
        planDetails.roomPlan_Name = roomPlan.data().roomPlan_Name;
        planDetails.roomPlan_Info = roomPlan.data().roomPlan_Info;
        planDetails.roomPlan_Price = roomPlan.data().roomPlan_Price;
        planDetails.roomPlan_Features_List =
          roomPlan.data().roomPlan_Features_List;
        planDetails.roomPLan_Date_Price_Map =
          await getHotelRoomPlanPriceDateRangeMap(
            hotelId,
            room.id,
            roomPlan.id,
            roomPlan.data().roomPlan_Price,
            roomDetails.hotelRoom_Guest_Price,
            roomDetails.hotelRoom_Guest_Price_Percentage,
            checkInDate,
            checkOutDate,
          );

        planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
          hotelId,
          room.id,
          roomPlan.id,
          roomPlan.data().roomPlan_Price,
          roomDetails.hotelRoom_Guest_Price,
          roomDetails.hotelRoom_Guest_Price_Percentage,
          checkInDate,
        );

        roomDetails.hotelRoom_Plans_List.push(planDetails);
      }

      list.push(roomDetails);
    }
  }

  if (list[0].hotelRoom_Plans_List.length > 0) {
    list.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return (
        a.hotelRoom_Plans_List[0].roomPlan_Price -
        b.hotelRoom_Plans_List[0].roomPlan_Price
      );
    });
  }

  return list;
};

export const getHotelRoomsPageList = async (
  hotelId: string,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<HotelRoomInformation[]> => {
  let list: HotelRoomInformation[] = [];
  const hotelRoomInfoCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelId,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const hotelRoomInfoQuerySnapshot = await getDocs(hotelRoomInfoCollectionRef);
  for (let room of hotelRoomInfoQuerySnapshot.docs) {
    let check = await checkHotelRoomInventoryAvailability(
      hotelId,
      room.id,
      checkInDate,
      checkOutDate,
    );
    if (!check) continue;

    let roomDetails: HotelRoomInformation = await getHotelRoomDetails(
      hotelId,
      room.id,
      true,
      10,
      true,
      10,
    );

    const hotelRoomPlanQuerySnapshot = await getDocs(
      query(
        collection(
          db,
          HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
          hotelId,
          HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
          room.id,
          HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
        ),
        orderBy("roomPlan_Price", "asc"),
      ),
    );

    for (let roomPlan of hotelRoomPlanQuerySnapshot.docs) {
      let planDetails = await getHotelRoomPlanTab(
        hotelId,
        room.id,
        roomPlan.id,
      );

      planDetails.roomPLan_Date_Price_Map =
        await getHotelRoomPlanPriceDateRangeMap(
          hotelId,
          room.id,
          roomPlan.id,
          roomPlan.data().roomPlan_Price,
          roomDetails.hotelRoom_Guest_Price,
          roomDetails.hotelRoom_Guest_Price_Percentage,
          checkInDate,
          checkOutDate,
        );

      planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
        hotelId,
        room.id,
        roomPlan.id,
        roomPlan.data().roomPlan_Price,
        roomDetails.hotelRoom_Guest_Price,
        roomDetails.hotelRoom_Guest_Price_Percentage,
        checkInDate,
      );

      roomDetails.hotelRoom_Plans_List.push(planDetails);
    }

    list.push(roomDetails);
  }

  return list;
};

export const getHotelRoomPageDetails = async (
  hotelId: string,
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<HotelRoomInformation> => {
  let hotelRoomDetails: any = await getHotelRoomDetails(
    hotelId,
    roomId,
    true,
    10,
    true,
    10,
  );
  hotelRoomDetails["hotelRoom_Plans_List"] = [];

  let checkAvailability = await checkHotelRoomInventoryAvailability(
    hotelId,
    roomId,
    checkInDate,
    checkOutDate,
  );

  if (checkAvailability) {
    const hotelRoomPlanQuerySnapshot = await getDocs(
      query(
        collection(
          db,
          HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
          hotelId,
          HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
          roomId,
          HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
        ),
        orderBy("roomPlan_Price", "asc"),
      ),
    );
    let result: any[] = [];

    for (let roomPlan of hotelRoomPlanQuerySnapshot.docs) {
      let planDetails = await getHotelRoomPlanTab(hotelId, roomId, roomPlan.id);

      planDetails.roomPlan_Date_Price_List =
        await getHotelRoomPlanPriceDateRangeList(
          hotelId,
          roomId,
          roomPlan.id,
          roomPlan.data().roomPlan_Price,
          hotelRoomDetails.hotelRoom_Guest_Price,
          hotelRoomDetails.hotelRoom_Guest_Price_Percentage,
          checkInDate,
          checkOutDate,
        );

      planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
        hotelId,
        roomId,
        roomPlan.id,
        roomPlan.data().roomPlan_Price,
        hotelRoomDetails.hotelRoom_Guest_Price,
        hotelRoomDetails.hotelRoom_Guest_Price_Percentage,
        checkInDate,
      );

      hotelRoomDetails.hotelRoom_Plans_List.push(planDetails);
    }
  }

  return hotelRoomDetails;
};

export const getHotelRoomTabDateRangeList = async (
  hotelSlugName: string,
  checkInDate: Date,
  checkOutDate: Date,
  perExtraAdultPrice: number,
  perAdultPricePercentage: number,
  fetchPriceList: boolean = true,
  ascOrder: boolean = true,
): Promise<HotelRoomInformation[]> => {
  let roomsList: HotelRoomInformation[] = [];

  const roomCol = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
    hotelSlugName,
    HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  );
  const roomQuery = await getDocs(query(roomCol));

  for (let room of roomQuery.docs) {
    let roomTab: HotelRoomInformation = await getHotelRoomTab(
      hotelSlugName,
      room.id,
    );

    const hotelRoomPlanQuerySnapshot = await getDocs(
      query(
        collection(
          db,
          HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
          hotelSlugName,
          HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
          room.id,
          HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
        ),
        orderBy("roomPlan_Price", "asc"),
      ),
    );

    for (let roomPlan of hotelRoomPlanQuerySnapshot.docs) {
      let planDetails = await getHotelRoomPlanTab(
        hotelSlugName,
        room.id,
        roomPlan.id,
      );

      if (fetchPriceList) {
        planDetails.roomPlan_Date_Price_List =
          await getHotelRoomPlanPriceDateRangeList(
            hotelSlugName,
            room.id,
            roomPlan.id,
            roomPlan.data().roomPlan_Price,
            perExtraAdultPrice,
            perAdultPricePercentage,
            checkInDate,
            checkOutDate,
          );
      }

      planDetails.roomPlan_Price_Group = await getHotelRoomPlanPriceDetails(
        hotelSlugName,
        room.id,
        roomPlan.id,
        roomPlan.data().roomPlan_Price,
        roomTab.hotelRoom_Guest_Price,
        roomTab.hotelRoom_Guest_Price_Percentage,
        checkInDate,
      );

      // let mapList: any[] = Array.from(planDetails.roomPLan_Date_Price_Map.entries());
      roomTab.hotelRoom_Plans_List.push(planDetails);
    }

    roomsList.push(roomTab);
  }

  if (ascOrder) {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return a.hotelRoom_Starting_Price - b.hotelRoom_Starting_Price;
    });
  } else {
    roomsList.sort(function (a: HotelRoomInformation, b: HotelRoomInformation) {
      return b.hotelRoom_Starting_Price - a.hotelRoom_Starting_Price;
    });
  }

  return roomsList;
};
