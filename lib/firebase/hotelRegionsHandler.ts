import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
import {
  HOTEL_CITY_COLLECTION_NAME,
  HOTEL_CITY_REGION_COLLECTION_NAME,
  HOTEL_COUNTRY_COLLECTION_NAME,
  HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
  HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
} from "../helper";
import { HotelInformationDetails } from "../classModels/hotels/hotelInfo";
import { getHotelAmenitiesList, getHotelImageObjectList } from "./hotelHandler";
import { HotelCityInformation } from "../classModels/hotelRegions/HotelCityInfo";

export const getRegionsInACity = async (hotel_slug_name: string) => {
  const cityDocRef = collection(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    "hotels-in-IN",
    HOTEL_CITY_COLLECTION_NAME,
    hotel_slug_name,
    HOTEL_CITY_REGION_COLLECTION_NAME
  );

  const querySnapshot = await getDocs(cityDocRef);

  let result: any = [];

  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
};

export const get_region_info = async (
  city_slug: string,
  region_slug: string
) => {
  const cityDocRef = doc(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    "hotels-in-IN",
    HOTEL_CITY_COLLECTION_NAME,
    city_slug,
    HOTEL_CITY_REGION_COLLECTION_NAME,
    city_slug + "-|-" + region_slug
  );

  const querySnapshot = await getDoc(cityDocRef);
  return querySnapshot.data();
};

export const getHotelCityInfo = async (hotel_slug_name: string) => {
  const cityDocRef = doc(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
    hotel_slug_name
  );

  let cityInfo = new HotelCityInformation();

  const documentSnapshot = await getDoc(cityDocRef);

  if (documentSnapshot.exists()) {
    cityInfo.hotelCity_Slug_Name = hotel_slug_name;
    cityInfo.hotelCity_Name = documentSnapshot.data().hotelCity_Name;
    cityInfo.hotelCity_Image_Url = documentSnapshot.data().hotelCity_Image_Url;
    cityInfo.hotelCity_Meta_Title =
      documentSnapshot.data().hotelCity_Meta_Title;
    cityInfo.hotelCity_Meta_Description =
      documentSnapshot.data().hotelCity_Meta_Description;
    cityInfo.hotelCity_Info = documentSnapshot.data().hotelCity_Info;
    cityInfo.hotelCity_Description =
      documentSnapshot.data().hotelCity_Description;
  }

  return cityInfo;
};

export const getRegionInfo = async (hotel_slug_name: string) => {
  const cityDocRef = doc(
    db,
    HOTEL_COUNTRY_COLLECTION_NAME,
    HOTEL_COUNTRY_INDIA_DOCUMENT_NAME,
    HOTEL_CITY_COLLECTION_NAME,
    hotel_slug_name
  );

  let cityInfo = new HotelCityInformation();

  const documentSnapshot = await getDoc(cityDocRef);

  if (documentSnapshot.exists()) {
    cityInfo.hotelCity_Slug_Name = hotel_slug_name;
    cityInfo.hotelCity_Name = documentSnapshot.data().hotelCity_Name;
    cityInfo.hotelCity_Image_Url = documentSnapshot.data().hotelCity_Image_Url;
    cityInfo.hotelCity_Meta_Title =
      documentSnapshot.data().hotelCity_Meta_Title;
    cityInfo.hotelCity_Meta_Description =
      documentSnapshot.data().hotelCity_Meta_Description;
    cityInfo.hotelCity_Info = documentSnapshot.data().hotelCity_Info;
    cityInfo.hotelCity_Description =
      documentSnapshot.data().hotelCity_Description;
  }

  return cityInfo;
};

export const getHotelsWithMatchingSlug = async (slug_name: string) => {
  const docRef = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);

  const docSnapshot = await getDocs(
    query(docRef, where("hotel_City_Slug", "==", slug_name))
  );

  let result: HotelInformationDetails[] = [];

  for (let hotel of docSnapshot.docs) {
    let hotel_slug_name = hotel.data()?.hotel_Slug_Name;

    let info = new HotelInformationDetails();

    info.hotel_Slug_Name = hotel_slug_name;
    info.hotel_Firebase_Id = hotel.data()?.hotel_Firebase_Id;
    info.hotel_Name = hotel.data()?.hotel_Name;
    info.hotel_Landmark = hotel.data()?.hotel_Landmark;
    info.hotel_Address = hotel.data()?.hotel_Address;
    info.hotel_City = hotel.data()?.hotel_City;
    info.hotel_State = hotel.data()?.hotel_State;
    info.hotel_Star_Rating = hotel.data()?.hotel_Star_Rating;
    info.hotel_Near_Railway_Station = hotel.data()?.hotel_Near_Railway_Station;
    info.hotel_Image_Url = hotel.data()?.hotel_Image_Url;
    info.hotel_Starting_Price = hotel.data()?.hotel_Starting_Price;
    info.hotel_Region_Slug_Name = hotel.data()?.hotel_Region_Slug_Name;
    info.hotel_Available_Amenities_List = await getHotelAmenitiesList(
      hotel_slug_name,
      100
    );
    info.hotel_Description = hotel.data()?.hotel_Description;

    result.push(info);
  }
  return result;
};
