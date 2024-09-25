// fetchHotelData;

import { getListOfMostBookedHotelsWithPagination } from "@/lib/firebase/cityHandler";
import {
  fetchHotelData,
  fetchHotelReviewPaginated,
} from "@/lib/firebase/hotelHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body

  const { hotelSlug, page, city } = req.body;

  try {
    const [review] = await Promise.all([
      fetchHotelReviewPaginated(hotelSlug, page),
      // getListOfMostBookedHotelsWithPagination(city),
    ]);
    // return the data from the api response
    res.status(200).json({ review });
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
