import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from ".";
import {
  DAY_PLANNER_COLLECTION_NAME,
  HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  HOTEL_CITY_COLLECTION_NAME,
  HOTEL_CITY_REGION_COLLECTION_NAME,
  HOTEL_CONTROL_CENTER_COLLECTION_NAME,
  HOTEL_COUNTRY_COLLECTION_NAME,
  HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
  HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
  HOTEL_INVENTORY_PLANNER_COLLECTION_NAME,
  HOTEL_PRICE_PLANNER_COLLECTION_NAME,
  HOTEL_REGION_COLLECTION_NAME,
  HOTEL_ROOMS_INFORMATION_COLLECTION_NAME,
  HOTEL_ROOM_PLANS_INFORMATION_COLLECTION_NAME,
  LOCAL_BUSINESS_HOTEL_META_DESCRIPTION,
  LOCAL_BUSINESS_HOTEL_META_IMAGE_URL,
  LOCAL_BUSINESS_HOTEL_META_TITLE,
  LOGO_IMAGE_URL1,
  MONTH_PLANNER_COLLECTION_NAME,
  STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
  YEAR_PLANNER_COLLECTION_NAME,
  getDateDifference,
} from "../helper";
import { CityHotelcardInfo } from "../classModels/city/hotelCardInfo";
import { addDays } from "date-fns";
import { PlanPackageDetails } from "../classModels/calendar/planPackageDetails";
import {
  HotelCityInformation,
  RegionInformation,
} from "../classModels/hotelRegions/HotelCityInfo";
import { CityInfo } from "../classModels/city/cityInfo";

// Cache object to store hotel data by citySlug
const hotelCache = {};

export const get_gallery_cities = async (
  start_after_doc_value: any = null,
  query_limit: number = 6,
) => {
  const doc_ref = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    "hotels-in-IN",
    HOTEL_CITY_COLLECTION_NAME,
  );

  let bookingsQuerySnapshot;

  if (start_after_doc_value) {
    bookingsQuerySnapshot = await getDocs(
      query(
        doc_ref,
        orderBy("hotelCity_Slug_Name", "asc"),
        startAfter(start_after_doc_value),
        limit(query_limit),
      ),
    );
  } else {
    bookingsQuerySnapshot = await getDocs(
      query(doc_ref, orderBy("hotelCity_Slug_Name", "asc"), limit(query_limit)),
    );
  }

  let results: any[] = [];
  let new_last_doc_value;

  for (const doc of bookingsQuerySnapshot.docs) {
    results.push({
      imageUrl: doc.data().hotelCity_Image_Url,
      cityName: doc.data().hotelCity_Name,
      id: doc.data().hotelCity_Slug_Name,
      linkUrl: `/${doc.data().hotelCity_Slug_Name}`,
      cityInfo: doc.data().hotelCity_Info,
      cityDescription: doc.data().hotelCity_Meta_Description,
    });

    new_last_doc_value = doc.data().hotelCity_Slug_Name;
  }

  return {
    results: results,
    last_doc_value: new_last_doc_value,
  };
};

// get hotel starting price
export const getHotelBasePrice = async (
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

// get room base category ep plan price
export const getHotelRoomPlanPriceDetails = async (
  hotelId: string,
  roomId: string,
  planId: string,
  basePrice: number,
  planDate: Date,
): Promise<PlanPackageDetails> => {
  let sd = new Date(
    planDate.getFullYear(),
    planDate.getMonth(),
    planDate.getDate(),
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
    `DAY-${dayVal}`,
  );
  const planInfo = await getDoc(docRef);

  let planObj = new PlanPackageDetails();
  if (planInfo.exists()) {
    planObj.plan_Base_Price = +planInfo.data().plan_Base_Price;
    // planObj.plan_Promotion_Price = +planInfo.data().plan_Promotion_Price;
    // planObj.plan_Child_Price = +planInfo.data().plan_Child_Price;
  } else {
    planObj.plan_Base_Price = +basePrice;
  }
  return planObj;
};

// paginated most booked hotels list
export const getListOfMostBookedHotelsWithPagination = async (
  citySlug: string,
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
) => {
  const hotelDetailsRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
  );
  let results: CityHotelcardInfo[] = [];

  try {
    // filter hotels by citySlug from hotelDetails collection
    const hotelDatilsQuery = query(
      hotelDetailsRef,
      where("hotel_City_Slug", "==", citySlug),
    );

    const hotelDetailsQuerySnapshot = await getDocs(hotelDatilsQuery);

    if (hotelDetailsQuerySnapshot.empty) {
      return {
        status: "FAILED",
        data: [],
        error: "No Hotels Found in this city.",
      };
    }

    // fetch booking count from filtered hotels
    // Google Hotel Center Collection get the data of Hotel Bookings Information of the filtered Hotels
    for (const hotelDoc of hotelDetailsQuerySnapshot.docs) {
      const hotelSlug = hotelDoc.id;

      // get the hotels data from Google Hotel Center Collection
      const googleCenterRef = doc(
        db,
        HOTEL_CONTROL_CENTER_COLLECTION_NAME,
        hotelSlug,
      );
      const googleCenterDoc = await getDoc(googleCenterRef);

      // if no document found in the collection then return and error
      if (!googleCenterDoc.exists()) {
        return {
          status: "FAILED",
          data: [],
          error:
            "No Hotel Found with the hotelSlug in Google Center Collection.",
        };
      }

      const hotelBookingRef = collection(
        db,
        HOTEL_CONTROL_CENTER_COLLECTION_NAME,
        hotelSlug,
        "HOTEL-BOOKINGS-INFORMATION",
      );
      const hotelBookingsSnapshot = await getDocs(hotelBookingRef);
      const totalBookings = hotelBookingsSnapshot.size;

      // create a new instance of the cityHotelCard and add the values in it then push it in the results
      let obj = new CityHotelcardInfo();
      obj.hotel_Slug_Name = hotelDoc.data()?.hotel_Slug_Name;
      obj.hotel_Firebase_Id = hotelDoc.data()?.hotel_Firebase_Id;
      obj.hotel_Name = hotelDoc.data()?.hotel_Name;
      obj.hotel_Landmark = hotelDoc.data()?.hotel_Landmark;
      obj.hotel_Address = hotelDoc.data()?.hotel_Address;
      obj.hotel_City = hotelDoc.data()?.hotel_City;
      obj.hotel_State = hotelDoc.data()?.hotel_State;
      obj.hotel_Star_Rating = hotelDoc.data()?.hotel_Star_Rating;
      obj.hotel_Image_Url = hotelDoc.data()?.hotel_Image_Url;
      obj.hotel_Starting_Price = hotelDoc.data()?.hotel_Starting_Price;
      obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
        hotelDoc.data()?.hotel_Slug_Name,
        startDate,
        endDate,
      );
      obj.hotel_Google_Rating = hotelDoc.data()?.hotel_Google_Rating || 0;
      obj.hotel_Ratings_Count = hotelDoc.data()?.hotel_Ratings_Count || 0;
      obj.hotel_Bookings_Count = totalBookings;

      results.push(obj);
    }

    // sort hotels by booking count in descending order
    results.sort(
      (a: any, b: any) => b.hotel_Bookings_Count - a.hotel_Bookings_Count,
    );
    const fewData = results.slice(0, Math.min(7, results.length - 1));

    return {
      status: "OK",
      data: fewData,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// function to get all the hotels list for schema on city page
export const getAllHotelsListOfCity = async (citySlug: string) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  try {
    const q = query(docRef, where("hotel_City_Slug", "==", citySlug));
    const docSnapshot = await getDocs(q);

    let hoetlsList: any[] = [];

    docSnapshot.forEach((doc) => {
      let obj = {
        meta_title: LOCAL_BUSINESS_HOTEL_META_TITLE,
        meta_description: LOCAL_BUSINESS_HOTEL_META_DESCRIPTION,
        meta_image_url: doc.data()?.hotel_Image_Url,
        hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
        hotel_Name: doc.data()?.hotel_Name,
        hotel_City: doc.data()?.hotel_City,
        hotel_State: doc.data()?.hotel_State,
        hotel_Star_Rating: doc.data()?.hotel_Star_Rating,
        hotel_Pincode: doc.data()?.hotel_Pincode,
        hotel_address: doc.data()?.hotel_Address,
        hotel_Starting_Price: doc.data()?.hotel_Starting_Price,
      };

      hoetlsList.push(obj);
    });

    // if the length of the hoetlsList in 0 then return an array
    if (hoetlsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `No hotels found for ${citySlug} slug`,
      };
    }

    // return the hoetlsList to the client
    return {
      status: "OK",
      data: hoetlsList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get price index of the plan
export const getPriceRange = (idx: any): any => {
  switch (idx) {
    case 1:
      return [0, 2000];
    case 2:
      return [2000, 4000];
    case 3:
      return [4000, 6000];
    case 4:
      return [6000, Infinity];
    default:
      return [0, Infinity];
  }
};

// function to get paginated results from the database  batch at a time
export const getHotelsListOfCityWithPagination = async (
  withPrice: boolean,
  citySlug: string,
  docLimit: number,
  searchedHotelId: any | null = null,
  lastDocument: any | null = null,
  excludedHotelSlug: any | null = null,
  regionList: any[] = [],
  ratingList: any[] = [],
  priceList: any[] = [],
  amenityList: any[] = [],
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
) => {
  // collection reference
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
  let results: CityHotelcardInfo[] = [];
  let lastDoc: any | null = null;
  try {
    // If a searched hotel slug is provided, fetch it first
    if (searchedHotelId) {
      const searchedHotelRef = doc(
        db,
        HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
        searchedHotelId,
      );
      const searchedHotelDoc = await getDoc(searchedHotelRef);

      if (searchedHotelDoc.exists()) {
        let obj = new CityHotelcardInfo();
        obj.hotel_Slug_Name = searchedHotelDoc.data()?.hotel_Slug_Name;
        obj.hotel_Firebase_Id = searchedHotelDoc.data()?.hotel_Firebase_Id;
        obj.hotel_Name = searchedHotelDoc.data()?.hotel_Name;
        obj.hotel_Landmark = searchedHotelDoc.data()?.hotel_Landmark;
        obj.hotel_Address = searchedHotelDoc.data()?.hotel_Address;
        obj.hotel_City = searchedHotelDoc.data()?.hotel_City;
        obj.hotel_State = searchedHotelDoc.data()?.hotel_State;
        obj.hotel_Star_Rating = searchedHotelDoc.data()?.hotel_Star_Rating;
        obj.hotel_Image_Url = searchedHotelDoc.data()?.hotel_Image_Url;
        obj.hotel_Starting_Price =
          searchedHotelDoc.data()?.hotel_Starting_Price;
        obj.hotel_Region_Slug_Name =
          searchedHotelDoc.data()?.hotel_Region_Slug_Name;
        obj.hotel_Images_List = [];
        obj.hotel_Google_Rating =
          searchedHotelDoc.data()?.hotel_Google_Rating || 0;
        obj.hotel_Ratings_Count =
          searchedHotelDoc.data()?.hotel_Ratings_Count || 0;

        if (withPrice) {
          obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
            searchedHotelDoc.data()?.hotel_Slug_Name,
            startDate,
            endDate,
          );
        }

        results.push(obj);
      } else {
        console.error(`No hotel found with id: ${searchedHotelId}`);
      }
    }

    // Function to create price conditions
    const createPriceConditions = (priceList: any) => {
      return priceList.map((priceIndex: any) => {
        const [minPrice, maxPrice] = getPriceRange(priceIndex);
        return maxPrice !== Infinity
          ? and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", maxPrice),
            )
          : and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", 1000000),
            );
      });
    };

    // store or and and filters
    const andFilterConditions: any[] = [];

    // city slug condition
    const citySlugCondition = where("hotel_City_Slug", "==", citySlug);

    // rating condition
    if (ratingList.length > 0) {
      andFilterConditions.push(where("hotel_Star_Rating", "in", ratingList));
    }

    // cityRegion condition
    regionList.forEach((region) => {
      andFilterConditions.push(
        where("hotel_Region_Slug_List", "array-contains", region),
      );
    });

    // price condition
    const priceConditions = createPriceConditions(priceList);
    // console.warn("priceConditions>>", priceConditions);

    // orderby condition
    const orderCondition = orderBy("hotel_Starting_Price", "asc");

    const querySnapshot = await getDocs(
      query(
        docRef,
        and(citySlugCondition, or(...priceConditions), ...andFilterConditions),
        orderCondition,
        ...(lastDocument ? [startAfter(lastDocument)] : []),
        limit(docLimit),
      ),
    );

    for (const doc of querySnapshot.docs) {
      if (doc.id !== excludedHotelSlug) {
        const ImageRef = collection(
          db,
          HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
          doc.id,
          HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME,
        );
        const imageSnapshot = await getDocs(ImageRef);

        let imagesList: any[] = [];

        for (let imageDoc of imageSnapshot.docs) {
          let obj = {
            image_Id: imageDoc.data()?.image_Id,
            image_Description: imageDoc.data()?.image_Description,
            image_Url: imageDoc.data()?.image_Url,
          };
          imagesList.push(obj);
        }

        if (amenityList.length > 0) {
          const amenitiesRef = collection(
            docRef,
            doc.id,
            HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
          );
          const amenitiesSnapshot = await getDocs(amenitiesRef);

          const amenitiesMatch = amenityList.every((amenity) =>
            amenitiesSnapshot.docs.some(
              (amenityDoc) => amenityDoc.data().amenity_Name === amenity,
            ),
          );

          if (amenitiesMatch) {
            let obj = new CityHotelcardInfo();
            obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
            obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
            obj.hotel_Name = doc.data()?.hotel_Name;
            obj.hotel_Landmark = doc.data()?.hotel_Landmark;
            obj.hotel_Address = doc.data()?.hotel_Address;
            obj.hotel_City = doc.data()?.hotel_City;
            obj.hotel_State = doc.data()?.hotel_State;
            obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
            obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
            obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
            obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
            obj.hotel_Images_List = imagesList;
            obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
            obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;

            if (withPrice) {
              obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
                doc.data()?.hotel_Slug_Name,
                startDate,
                endDate,
              );
            }

            results.push(obj);
            lastDoc = doc.id;
          }
        } else {
          let obj = new CityHotelcardInfo();
          obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
          obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
          obj.hotel_Name = doc.data()?.hotel_Name;
          obj.hotel_Landmark = doc.data()?.hotel_Landmark;
          obj.hotel_Address = doc.data()?.hotel_Address;
          obj.hotel_City = doc.data()?.hotel_City;
          obj.hotel_State = doc.data()?.hotel_State;
          obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
          obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
          obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
          obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
          obj.hotel_Images_List = imagesList;
          obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
          obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;

          if (withPrice) {
            obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
              doc.data()?.hotel_Slug_Name,
              startDate,
              endDate,
            );
          }

          results.push({ ...obj });
        }
      } else {
        console.error(`Duplicate hotel found with id: ${excludedHotelSlug}`);
      }
    }

    // add last document from the querySnapshot
    lastDoc =
      querySnapshot.size > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return {
      status: "OK",
      hotels: results,
      lastDocument: lastDoc,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      hotels: [],
      lastDocument: null,
      error: error?.message || error,
    };
  }
};

// get all the hotels with it's information
export const getHotelsListOfCity = async (citySlug: string) => {
  // collection reference
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
  let results: CityHotelcardInfo[] = [];

  try {
    // Fetch all hotels that match the city slug
    const querySnapshot = await getDocs(
      query(docRef, where("hotel_City_Slug", "==", citySlug)),
    );

    for (const doc of querySnapshot.docs) {
      let obj = new CityHotelcardInfo();
      obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
      obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
      obj.hotel_Name = doc.data()?.hotel_Name;
      obj.hotel_Landmark = doc.data()?.hotel_Landmark;
      obj.hotel_Address = doc.data()?.hotel_Address;
      obj.hotel_City = doc.data()?.hotel_City;
      obj.hotel_State = doc.data()?.hotel_State;
      obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
      obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
      obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
      obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
      obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
      obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;
      // Now we will Fetch the amenities of this hotel which is stored in a sub collection
      const amenitiesRef = collection(
        docRef,
        doc.id,
        HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
      );
      const amenitiesSnapshot = await getDocs(amenitiesRef);
      // Now store these amenties in the obj

      let amenitiesList: any[] = [];
      for (let amenityDoc of amenitiesSnapshot.docs) {
        let amenityObj = {
          amenity_Name: amenityDoc.data()?.amenity_Name,
          amenity_Description: amenityDoc.data()?.amenity_Description,
        };
        amenitiesList.push(amenityObj);
      }
      obj.hotel_Amenities_List = amenitiesList;

      results.push(obj);
    }

    return {
      status: "OK",
      data: results,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get all the amenities list from the database
export const getAllAmenitiesList = async () => {
  const amenitiesCollection = collection(
    db,
    HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  );

  try {
    const amenitiesSnapshot = await getDocs(amenitiesCollection);

    let amenitiesList: any[] = [];

    amenitiesSnapshot.forEach((doc) => {
      amenitiesList.push(doc.data());
    });

    if (amenitiesList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `Amenities list is empty`,
      };
    }

    return {
      status: "OK",
      data: amenitiesList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};
// get all the amenities name only from the database
export const getAllAmenitiesListName = async () => {
  const amenitiesCollection = collection(
    db,
    HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
  );

  try {
    const amenitiesSnapshot = await getDocs(amenitiesCollection);

    let amenitiesList: any[] = [];

    amenitiesSnapshot.forEach((doc) => {
      amenitiesList.push(doc.data().amenity_Name);
    });

    if (amenitiesList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `Amenities list is empty`,
      };
    }

    return {
      status: "OK",
      data: amenitiesList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get all the regions list from the database
export const getAllRegionsList = async (citySlug: string) => {
  const regionsRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
    citySlug,
    HOTEL_CITY_REGION_COLLECTION_NAME,
  );

  try {
    const regionsSnapshot = await getDocs(regionsRef);

    let regionsList: any = [];

    regionsSnapshot.forEach((doc) => {
      regionsList.push(doc.data());
    });

    if (regionsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `Regions list is empty`,
      };
    }

    return {
      status: "OK",
      data: regionsList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get hotel city information
export const getCityInfo = async (citySlugCondition: string) => {
  const cityDocRef = doc(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
    citySlugCondition,
  );

  try {
    const doc = await getDoc(cityDocRef);
    if (doc.exists()) {
      const city: HotelCityInformation = {
        hotelCity_Id: doc.data()?.hotelCity_Id,
        hotelCity_Slug_Name: citySlugCondition,
        hotelCity_Name: doc.data().hotelCity_Name,
        hotelCity_Info: doc.data().hotelCity_Info,
        hotelCity_Description: doc.data().hotelCity_Description,
        hotelCity_Meta_Title: doc.data().hotelCity_Meta_Title,
        hotelCity_Meta_Description: doc.data().hotelCity_Meta_Description,
        hotelCity_Authorization: false,
        hotelCity_Image_Url: doc.data()?.hotelCity_Image_Url || LOGO_IMAGE_URL1,
        hotelCity_City_Slug_Name: "",
        hotelCity_State_Code: "",
        hotelCity_State_TIN: "",
        hotelCity_Image_Url_List: [],
        hotelCity_Hotel_Slug_List: [],
      };

      return {
        status: "OK",
        data: city,
        error: null,
      };
    } else {
      return {
        status: "FAILED",
        data: [],
        error: "Document does not exist",
      };
    }
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get hotel city information
export const getRegionInfo = async (regionSlug: string) => {
  const cityDocRef = doc(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_REGION_COLLECTION_NAME,
    regionSlug,
  );

  try {
    const doc = await getDoc(cityDocRef);
    if (doc.exists()) {
      const region: RegionInformation = {
        hotelCityRegion_Authorization:
          doc.data()?.hotelCityRegion_Authorization,
        hotelCityRegion_Id: doc.data()?.hotelCityRegion_Id,
        hotelCity_Slug_Name: doc.data()?.hotelCity_Slug_Name,
        hotelCityRegion_Slug_Name: doc.data()?.hotelCityRegion_Slug_Name,
        hotelCityRegion_Name: doc.data()?.hotelCityRegion_Name,
        hotelCityRegion_Info: doc.data()?.hotelCityRegion_Info,
        hotelCityRegion_Description: doc.data()?.hotelCityRegion_Description,
        hotelCityRegion_Display_Image_Url: "",
        hotelCityRegion_Image_Url_List: [],
        hotelCityRegion_Meta_Title: doc.data()?.hotelCityRegion_Meta_Title,
        hotelCityRegion_Meta_Description:
          doc.data()?.hotelCityRegion_Meta_Description,
      };

      return {
        status: "OK",
        data: region,
        error: null,
      };
    } else {
      return {
        status: "FAILED",
        data: [],
        error: "Document does not exist",
      };
    }
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get hotels list of the sub region with pagination using documentLimit
export const getHotelsListOfCityRegionWithPagination = async (
  citySlug: string,
  regionSlug: string,
  docLimit: number,
  lastDocument: any | null = null,
  regionList: any[] = [],
  ratingList: any[] = [],
  priceList: any[] = [],
  amenityList: any[] = [],
  startDate: Date = new Date(),
  endDate: Date = addDays(new Date(), 1),
) => {
  // collection reference
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
  let results: CityHotelcardInfo[] = [];
  let lastDoc: any | null = null;

  try {
    // Function to create price conditions
    const createPriceConditions = (priceList: any) => {
      return priceList.map((priceIndex: any) => {
        const [minPrice, maxPrice] = getPriceRange(priceIndex);
        return maxPrice !== Infinity
          ? and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", maxPrice),
            )
          : and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", 1000000),
            );
      });
    };

    // store or and and filters
    const andFilterConditions: any[] = [];

    // city slug condition
    const citySlugCondition = where("hotel_City_Slug", "==", citySlug);

    // city region slug condition
    const cityRegionSlugCondition = where(
      "hotel_Region_Slug_List",
      "array-contains",
      citySlug + "-|-" + regionSlug,
    );
    andFilterConditions.push(cityRegionSlugCondition);

    // rating condition
    if (ratingList.length > 0) {
      andFilterConditions.push(where("hotel_Star_Rating", "in", ratingList));
    }

    // cityRegion condition
    regionList.forEach((region) => {
      andFilterConditions.push(where("hotel_Region_Slug_Name", "in", region));
    });

    // price condition
    const priceConditions = createPriceConditions(priceList);
    // console.warn("priceConditions>>", priceConditions);

    // orderby condition
    const orderCondition = orderBy("hotel_Starting_Price", "asc");

    const querySnapshot = await getDocs(
      query(
        docRef,
        and(citySlugCondition, or(...priceConditions), ...andFilterConditions),
        orderCondition,
        ...(lastDocument ? [startAfter(lastDocument)] : []),
        limit(docLimit),
      ),
    );

    for (const doc of querySnapshot.docs) {
      if (amenityList.length > 0) {
        const amenitiesRef = collection(
          docRef,
          doc.id,
          HOTEL_AMENITIES_INFORMATION_COLLECION_NAME,
        );
        const amenitiesSnapshot = await getDocs(amenitiesRef);

        const amenitiesMatch = amenityList.every((amenity) =>
          amenitiesSnapshot.docs.some(
            (amenityDoc) => amenityDoc.data().amenity_Name === amenity,
          ),
        );

        if (amenitiesMatch) {
          let obj = new CityHotelcardInfo();
          obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
          obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
          obj.hotel_Name = doc.data()?.hotel_Name;
          obj.hotel_Landmark = doc.data()?.hotel_Landmark;
          obj.hotel_Address = doc.data()?.hotel_Address;
          obj.hotel_City = doc.data()?.hotel_City;
          obj.hotel_State = doc.data()?.hotel_State;
          obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
          obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
          obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
          obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
          obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
            doc.data()?.hotel_Slug_Name,
            startDate,
            endDate,
          );
          obj.hotel_Images_List = [];
          obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
          obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;

          results.push(obj);
          lastDoc = doc.id;
        }
      } else {
        let obj = new CityHotelcardInfo();
        obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
        obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
        obj.hotel_Name = doc.data()?.hotel_Name;
        obj.hotel_Landmark = doc.data()?.hotel_Landmark;
        obj.hotel_Address = doc.data()?.hotel_Address;
        obj.hotel_City = doc.data()?.hotel_City;
        obj.hotel_State = doc.data()?.hotel_State;
        obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
        obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
        obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
        obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
        obj.hotel_Starting_Price_Obj = await getHotelBasePrice(
          doc.data()?.hotel_Slug_Name,
          startDate,
          endDate,
        );
        obj.hotel_Images_List = [];
        obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
        obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;

        results.push({ ...obj });
      }
    }

    // add last document from the querySnapshot
    lastDoc =
      querySnapshot.size > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return {
      status: "OK",
      hotels: results,
      lastDocument: lastDoc,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      hotels: [],
      lastDocument: null,
      error: error?.message || error,
    };
  }
};

// get all hotels in a region of a city with for static pages generation

export const getHotelsListOfCityRegion = async (
  citySlug: string,
  regionSlug: string,
) => {
  // Collection reference
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
  let results: CityHotelcardInfo[] = [];

  try {
    // Query to get all hotels for the specified city and region
    const querySnapshot = await getDocs(
      query(
        docRef,
        where("hotel_City_Slug", "==", citySlug),
        where(
          "hotel_Region_Slug_List",
          "array-contains",
          citySlug + "-|-" + regionSlug,
        ),
      ),
    );

    for (const doc of querySnapshot.docs) {
      let obj = new CityHotelcardInfo();
      obj.hotel_Slug_Name = doc.data()?.hotel_Slug_Name;
      obj.hotel_Firebase_Id = doc.data()?.hotel_Firebase_Id;
      obj.hotel_Name = doc.data()?.hotel_Name;
      obj.hotel_Landmark = doc.data()?.hotel_Landmark;
      obj.hotel_Address = doc.data()?.hotel_Address;
      obj.hotel_City = doc.data()?.hotel_City;
      obj.hotel_State = doc.data()?.hotel_State;
      obj.hotel_Star_Rating = doc.data()?.hotel_Star_Rating;
      obj.hotel_Image_Url = doc.data()?.hotel_Image_Url;
      obj.hotel_Starting_Price = doc.data()?.hotel_Starting_Price;
      obj.hotel_Region_Slug_Name = doc.data()?.hotel_Region_Slug_Name;
      obj.hotel_Images_List = [];
      obj.hotel_Google_Rating = doc.data()?.hotel_Google_Rating || 0;
      obj.hotel_Ratings_Count = doc.data()?.hotel_Ratings_Count || 0;

      results.push(obj);
    }

    return {
      status: "OK",
      hotels: results,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      hotels: [],
      error: error?.message || error,
    };
  }
};

// get the list of regions in the hotel sub-region
export const getRegionsOfCity = async (citySlug: string) => {
  const cityDocRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    "hotels-in-IN",
    HOTEL_CITY_COLLECTION_NAME,
    citySlug,
    HOTEL_CITY_REGION_COLLECTION_NAME,
  );
  let results: any = [];

  try {
    const querySnapshot = await getDocs(cityDocRef);

    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return {
      status: "OK",
      data: results,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get the lis of all the cities available in staybook
export const getAllCitiesOfCountry = async () => {
  const docRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
  );

  try {
    const docSnapshot = await getDocs(docRef);
    let results: CityInfo[] = [];

    docSnapshot.forEach((doc) => {
      let obj = {
        hotelCity_Id: doc.data()?.hotelCity_Id,
        hotelCity_Name: doc.data()?.hotelCity_Name,
        hotelCity_Slug_Name: doc.data()?.hotelCity_Slug_Name,
      };
      results.push(obj);
    });

    if (results.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: "No city information found.",
      };
    }

    return {
      status: "OK",
      data: results,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get all the city slugs
export const getAllCitySlugs = async () => {
  const docRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
  );
  let results: string[] = [];

  try {
    const docSnapshot = await getDocs(docRef);
    docSnapshot.forEach((doc) => {
      results.push(doc.id);
    });

    return {
      satus: "OK",
      data: results,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

export const getTopHotels = async (
  citySlug: string,
  startAfterDoc: any | null = null,
  docsCount: number = 3,
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  try {
    let q = query(
      docRef,
      where("hotel_City_Slug", "==", citySlug),
      orderBy("hotel_Google_Rating", "desc"),
      limit(docsCount),
    );

    if (startAfterDoc) {
      q = query(
        docRef,
        where("hotel_City_Slug", "==", citySlug),
        orderBy("hotel_Google_Rating", "desc"),
        startAfter(startAfterDoc),
        limit(docsCount),
      );
    }

    const querySnapshot = await getDocs(q);

    let lastDoc: any;
    let hoetlsList: any[] = [];

    querySnapshot.forEach((doc) => {
      let obj = {
        hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
        hotel_Name: doc.data()?.hotel_Name,
        hotel_City: doc.data()?.hotel_City,
        hotel_State: doc.data()?.hotel_State,
        hotel_Star_Rating: doc.data()?.hotel_Star_Rating,
        hotel_Image_Url: doc.data()?.hotel_Image_Url,
        hotel_Pincode: doc.data()?.hotel_Pincode,
        hotel_address: doc.data()?.hotel_Address,
        hotel_Starting_Price: doc.data()?.hotel_Starting_Price,
        hotel_Google_Rating: doc.data()?.hotel_Google_Rating || 0,
      };

      hoetlsList.push(obj);
    });

    // add last document from the querySnapshot
    lastDoc =
      querySnapshot.size > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    // if the length of the hoetlsList in 0 then return an array
    if (hoetlsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        lastDoc: null,
        error: `No hotels found for ${citySlug} slug`,
      };
    }

    // return the hoetlsList to the client
    return {
      status: "OK",
      data: hoetlsList,
      lastDoc,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      lastDoc: null,
      error: error?.message || error,
    };
  }
};

export const getFamousHotelsInCity = async (citySlug: string) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const fetchHotels = async (
    ratingCondition: number,
    ratingCountCondition: number,
  ) => {
    try {
      const q = query(
        docRef,
        where("hotel_City_Slug", "==", citySlug),
        where("hotel_Google_Rating", ">=", ratingCondition),
      );
      const docSnapshot = await getDocs(q);
      const hotelList: any[] = [];
      docSnapshot.forEach((doc) => {
        if (doc.data()?.hotel_Ratings_Count > ratingCountCondition) {
          let obj = {
            hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
            hotel_Name: doc.data()?.hotel_Name,
          };
          hotelList.push(obj);
        }
      });
      return hotelList;
    } catch (error: any) {
      throw new Error(error?.message || error);
    }
  };

  try {
    let hotelList = await fetchHotels(4, 1000);
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(4, 500);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(4, 0);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(3, 1000);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(3, 500);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(3, 0);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(0, 1000);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(0, 500);
    }
    if (hotelList.length === 0) {
      hotelList = await fetchHotels(0, 0);
    }

    if (hotelList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `No hotels found for ${citySlug} slug`,
      };
    }

    return {
      status: "OK",
      data: hotelList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error.message,
    };
  }
};

export const getTopCitiesInCountry = async (docsCount: number = 100) => {
  const docRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
  );
  try {
    const q = query(docRef);
    const docSnapshot = await getDocs(q);
    let citiesList: any[] = [];
    docSnapshot.forEach((doc) => {
      let obj = {
        hotelCity_Name: doc.data()?.hotelCity_Name,
        hotelCity_Slug_Name: doc.data()?.hotelCity_Slug_Name,
      };
      citiesList.push(obj);
    });
    if (citiesList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `No cities found`,
      };
    }
    return {
      status: "OK",
      data: citiesList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

export const getRegionsInCity = async (
  citySlug: string,
  docsCount: number = 10,
) => {
  const docRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
    citySlug,
    HOTEL_CITY_REGION_COLLECTION_NAME,
  );
  try {
    const q = query(docRef, limit(docsCount));
    const docSnapshot = await getDocs(q);
    let regionsList: any[] = [];
    docSnapshot.forEach((doc) => {
      const hotelRegionArray = doc
        .data()
        ?.hotelCityRegion_Slug_Name.split("-|-")[1];
      const hotelRegionSlugName =
        doc.data()?.hotelCity_Slug_Name + "/" + hotelRegionArray;
      let obj = {
        hotelCityRegion_Name: doc.data()?.hotelCityRegion_Name,
        hotelCity_Slug_Name: doc.data()?.hotelCity_Slug_Name,
        hotelCityRegion_Slug_Name: hotelRegionSlugName,
      };
      regionsList.push(obj);
    });
    if (regionsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `No regions found for ${citySlug} city`,
      };
    }
    return {
      status: "OK",
      data: regionsList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

export const getLimitedHotelsInCity = async (
  citySlug: string,
  docsCount: number = 100,
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
  try {
    const q = query(
      docRef,
      where("hotel_City_Slug", "==", citySlug),
      limit(docsCount),
    );
    const docSnapshot = await getDocs(q);
    let hoetlsList: any[] = [];
    docSnapshot.forEach((doc) => {
      let obj = {
        hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
        hotel_Name: doc.data()?.hotel_Name,
        hotel_Image_Url: doc.data()?.hotel_Image_Url,
      };
      hoetlsList.push(obj);
    });
    if (hoetlsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        error: `No hotels found for ${citySlug} slug`,
      };
    }
    return {
      status: "OK",
      data: hoetlsList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

// get hotels for particular star
export const getHotelsSpecificStar = async (
  citySlug: string,
  hotelStar: string,
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  try {
    let q = query(
      docRef,
      where("hotel_City_Slug", "==", `hotels-in-${citySlug}`),
      where("hotel_Star_Rating", "in", [+hotelStar]),
      orderBy("hotel_Google_Rating", "desc"),
    );

    const querySnapshot = await getDocs(q);

    let hoetlsList: any[] = [];

    querySnapshot.forEach((doc) => {
      let obj = {
        hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
        hotel_Name: doc.data()?.hotel_Name,
        hotel_Address: doc.data()?.hotel_Address,
        hotel_Landmark: doc.data()?.hotel_Landmark,
        hotel_City: doc.data()?.hotel_City,
        hotel_State: doc.data()?.hotel_State,
        hotel_Star_Rating: doc.data()?.hotel_Star_Rating,
        hotel_Image_Url: doc.data()?.hotel_Image_Url,
        hotel_Pincode: doc.data()?.hotel_Pincode,
        hotel_address: doc.data()?.hotel_Address,
        hotel_Firebase_Id: doc.data()?.hotel_Firebase_Id,
        hotel_Starting_Price: doc.data()?.hotel_Starting_Price,
        hotel_Region_Slug_Name: doc.data()?.hotel_Region_Slug_Name,
        hotel_Google_Rating: doc.data()?.hotel_Google_Rating || 0,
        hotel_Ratings_Count: doc.data()?.hotel_Ratings_Count || 0,
      };

      hoetlsList.push(obj);
    });

    // if the length of the hoetlsList in 0 then return an array
    if (hoetlsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        lastDoc: null,
        error: `No hotels found for ${citySlug} slug`,
      };
    }

    // return the hoetlsList to the client

    return {
      status: "OK",
      data: hoetlsList,

      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

export const getPrice = (idx: any): any => {
  switch (idx) {
    case 1000:
      return [0, 1000];
    case 2000:
      return [0, 2000];
    case 3000:
      return [0, 3000];
    case 4000:
      return [0, 4000];
    case 5000:
      return [0, 5000];
    case 6000:
      return [5000, Infinity];
    default:
      return [0, Infinity];
  }
};

// get all hotels for particular price
export const getHotelsSpecificAmount = async (
  citySlug: string,
  priceList: any[] = [],
) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  try {
    // Function to create price conditions
    const createPriceConditions = (priceList: any) => {
      return priceList.map((priceIndex: any) => {
        const [minPrice, maxPrice] = getPrice(priceIndex);
        return maxPrice !== Infinity
          ? and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", maxPrice),
            )
          : and(
              where("hotel_Starting_Price", ">=", minPrice),
              where("hotel_Starting_Price", "<=", 1000000),
            );
      });
    };

    // price condition
    const priceConditions = createPriceConditions(priceList);

    const citySlugCondition = where("hotel_City_Slug", "==", citySlug);

    const querySnapshot = await getDocs(
      query(docRef, and(citySlugCondition, or(...priceConditions))),
    );

    let hoetlsList: any[] = [];

    querySnapshot.forEach((doc) => {
      let obj = {
        hotel_Slug_Name: doc.data()?.hotel_Slug_Name,
        hotel_Name: doc.data()?.hotel_Name,
        hotel_Address: doc.data()?.hotel_Address,
        hotel_Landmark: doc.data()?.hotel_Landmark,
        hotel_City: doc.data()?.hotel_City,
        hotel_State: doc.data()?.hotel_State,
        hotel_Star_Rating: doc.data()?.hotel_Star_Rating,
        hotel_Image_Url: doc.data()?.hotel_Image_Url,
        hotel_Pincode: doc.data()?.hotel_Pincode,
        hotel_address: doc.data()?.hotel_Address,
        hotel_Firebase_Id: doc.data()?.hotel_Firebase_Id,
        hotel_Starting_Price: doc.data()?.hotel_Starting_Price,
        hotel_Region_Slug_Name: doc.data()?.hotel_Region_Slug_Name,
        hotel_Google_Rating: doc.data()?.hotel_Google_Rating || 0,
        hotel_Ratings_Count: doc.data()?.hotel_Ratings_Count || 0,
      };

      hoetlsList.push(obj);
    });

    if (hoetlsList.length === 0) {
      return {
        status: "FAILED",
        data: [],
        lastDoc: null,
        error: `No hotels found for ${citySlug} slug`,
      };
    }

    return {
      status: "OK",
      data: hoetlsList,
      error: null,
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: [],
      error: error?.message || error,
    };
  }
};

export async function fetchAvailableHotels(citySlug: string) {
  const availableHotels = await getAllHotelsListOfCity(citySlug);
  return JSON.stringify(availableHotels.data);
}

// Utility function to fetch city information
export async function fetchCityInfo(citySlug: string) {
  const cityInfo = await getCityInfo(citySlug);
  return cityInfo?.status === "OK" && cityInfo.error === null
    ? JSON.stringify(cityInfo.data)
    : JSON.stringify(new HotelCityInformation());
}

// Utility function to fetch general hotel information
export async function fetchGeneralHotelInfo(citySlug: string) {
  const hotelInfo = await getHotelsListOfCity(citySlug);
  return hotelInfo;
}

// Utility function to handle star-rated hotels
export async function handleStarRatedHotels(citySlug: string) {
  const match = citySlug.match(/(\d+)-star-hotels-in-(.*)/);
  let location: string;
  let star: string;
  if (match) {
    location = match[2];
    star = match[1];

    const hotelInfo = await getHotelsSpecificStar(location, star);
    return {
      status: "OK",
      data: hotelInfo.data,
      error: null,
    };
  }
  return {
    status: "FAILED",
    data: [],
    error: "Failed due to some error on the database",
  };
}

// Utility function to handle price conditions
export async function handlePriceConditionHotels(citySlug: string) {
  const slugString = Array.isArray(citySlug) ? citySlug[0] : citySlug;
  const regex = /^(hotels-in-[\w-]+)-(under-\d+|between-\d+-to-\d+|above-\d+)$/;
  const match = slugString.match(regex);
  const location = match ? match[1] : "";
  const priceCondition = match ? match[2] : "";

  let hotelInfo;
  if (priceCondition.includes("above")) {
    hotelInfo = await getHotelsSpecificAmount(location, [6000]);
  } else {
    hotelInfo = await getHotelsSpecificAmount(location, [
      parseInt(priceCondition.split("-")[1], 10),
    ]);
  }

  return hotelInfo;
}
