import {
  TRAVEL_DESTINATION_IMAGES_COLLECTION_NAME,
  TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
  VISITING_PLACES_DESTINATION_COLLECTION_NAME,
} from "@/lib/helper";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";

import { HotelImageDetails } from "@/lib/classModels/images/hotelImageDetails";
import { db } from ".";

export async function get_destination_information(
  destination_document_id: string,
) {
  try {
    const ref = doc(
      db,
      TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
      destination_document_id,
    );

    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    return data;
  } catch (error) {
    return {
      destination_info: {},
    };
  }
}

export async function get_destination_images_list(
  destination_document_id: string,
  response_limit: number = 20,
) {
  try {
    const ref = collection(
      db,
      TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
      destination_document_id,
      TRAVEL_DESTINATION_IMAGES_COLLECTION_NAME,
    );

    const snapshot = await getDocs(query(ref, limit(response_limit)));

    const result: HotelImageDetails[] = [];

    snapshot.forEach((element: any) => {
      result.push(element.data());
    });

    return {
      status: true,
      result,
    };
  } catch (error) {
    return {
      status: false,
      result: [],
    };
  }
}

export async function get_destination_visiting_places(
  destination_document_id: string,
  response_limit: number = 30,
) {
  try {
    const ref = collection(
      db,
      TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
      destination_document_id,
      VISITING_PLACES_DESTINATION_COLLECTION_NAME,
    );

    const snapshot = await getDocs(query(ref, limit(response_limit)));

    const result: any[] = [];

    snapshot.forEach((element: any) => {
      result.push(element.data());
    });

    return {
      status: true,
      result,
    };
  } catch (error) {
    return {
      status: false,
      result: [],
    };
  }
}

export async function get_destination_visiting_place(
  destination_document_id: string,
  visiting_place_document_id: string,
) {
  try {
    const ref = doc(
      db,
      TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
      destination_document_id,
      VISITING_PLACES_DESTINATION_COLLECTION_NAME,
      visiting_place_document_id,
    );

    const snapshot = await getDoc(ref);

    return {
      status: true,
      result: snapshot.data(),
    };
  } catch (error) {
    return {
      status: false,
      result: {},
    };
  }
}

export async function get_destinations() {
  try {
    const ref = collection(db, TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME);

    const snapshot = await getDocs(ref);
    let result: any[] = [];

    snapshot.forEach((item) => {
      result.push(item.data());
    });

    return {
      status: true,
      result: result,
    };
  } catch (error) {
    return {
      status: false,
      result: [],
    };
  }
}

export async function get_place_image_list(
  destination_doc_id: string,
  place_doc_id: string,
) {
  try {
    const ref = doc(
      db,
      TRAVEL_DESTINATION_LOCATION_COLLECTION_NAME,
      destination_doc_id,
      VISITING_PLACES_DESTINATION_COLLECTION_NAME,
      place_doc_id,
    );

    let data = await getDoc(ref);

    return {
      status: true,
      image_list: data.data()?.visitingPlace_Image_Url_List || [],
    };
  } catch (error) {
    return {
      status: false,
      image_list: [],
    };
  }
}
