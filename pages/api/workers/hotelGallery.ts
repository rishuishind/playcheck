// getHotelNearByPlacesList;

import {
  fetchHotelData,
  getHotelFAQsList,
  getHotelImageObjectList,
} from "@/lib/firebase/hotelHandler";
import { getHotelRoomDetailsList } from "@/lib/firebase/hotelRoomHandler";

// fetchHotelData;

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
    // return the data from the api response
    const [imagesList, roomsList] = await Promise.all([
      getHotelImageObjectList(hotelSlug, 10),
      getHotelRoomDetailsList(hotelSlug, true, 10),
    ]);

    res.status(200).json({ imagesList, roomsList });
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
