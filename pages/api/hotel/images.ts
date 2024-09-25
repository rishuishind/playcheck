import { db } from "@/lib/firebase";
import { HOTEL_DETAILS_INFORMATION_COLLECTION_NAME } from "@/lib/helper";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

// get request for searching hotels with algolia
// query params { q:string }
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { q },
    method,
  }: any = request;
  if (method != "GET") {
    return response
      .status(500)
      .json({ error: "only get http method is allowed for this endpoint" });
  }
  try {
    let ref = collection(db, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME);
    let querySnapshot = await getDocs(query(ref, limit(2)));

    let result: any = [];

    querySnapshot.forEach(async (doc) => {
      let obj: any = {
        name: doc.data()?.hotel_Name || "",
        image_list: [],
      };

      //   const hotelCollectionRef = collection(
      //     db,
      //     HOTEL_DETAILS_INFORMATION_COLLECTION_NAME,
      //     doc.data().hotel_Slug_Name,
      //     HOTEL_IMAGES_DETAILS_INFORMATION_COLLECTION_NAME
      //   );

      //   const hotelImagesQuerySnapshot = await getDocs(
      //     query(hotelCollectionRef, limit(2))
      //   );

      //   let list: any = [];

      //     for (let roomImage of hotelImagesQuerySnapshot.docs) {

      //       let imageInfo = {
      //         image_url: ''
      //       };

      //       imageInfo.image_url = roomImage.data().image_Url || "";

      //     list.push(imageInfo);
      //   }

      result.push(obj);
    });

    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error: "something went wrong" });
  }
};
