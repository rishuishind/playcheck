// fetchHotelData;

import {
  fetchHotelData,
  getHotelAmenitiesList,
} from "@/lib/firebase/hotelHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
 
    const amenities = await getHotelAmenitiesList(hotelSlug);

    // return the data from the api response
    res.status(200).json({ amenities });
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
