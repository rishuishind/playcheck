import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { HOTEL_CITY_COLLECTION_NAME, HOTEL_COUNTRY_COLLECTION_NAME, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME } from "../helper";


export async function searchHotelsWithCityNameOrHotelName(searchText: string) {
  const collectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME
  );
  const docSnapshot = await getDocs(
    query(collectionRef, where("hotel_Name", "array-contains", searchText))
  );
  let result: any[] = [];
  for (const doc of docSnapshot.docs) {
    const docData = doc.data();
    result.push(docData);
  }
  return result;
}
