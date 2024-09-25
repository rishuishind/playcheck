import {
  collection,
  getDocs,
  limit,
  orderBy,
  startAfter,
  startAt,
  query,
} from "firebase/firestore";
import { HOTEL_DETAILS_INFORMATION_COLLECTION_NAME } from "@/lib/helper";
import { db } from "@/lib/firebase";
import { getHotelCardTabDetails } from "../firebase/hotelHandler";

export const fetchHotelTabsInfinite = async (
  lastDoc: any = 1,
  limitSize: number = 5,
  asc: boolean = false,
  orderByValue: string = "hotel_Starting_Price"
): Promise<any> => {


  let chk = lastDoc === 1 ? true : false;

  const hotelCollectionRef = collection(
    db,
    HOTEL_DETAILS_INFORMATION_COLLECTION_NAME
  );

    
  if (lastDoc === 1) {
    let lastDocVal = await getDocs(
      query(
        hotelCollectionRef,
        orderBy(orderByValue, asc ? "asc" : "desc"),
        limit(1)
      )
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
      limit(limitSize)
    )

    )

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
