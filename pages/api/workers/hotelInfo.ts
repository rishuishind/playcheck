import {
  getHotelAmenitiesList,
  getHotelImageObjectList,
  getHotelNearByPlacesList,
  fetchHotelReviews,
  getHotelFAQsListForGoogleSchema,
} from "@/lib/firebase/hotelHandler";
// import { getHotelRoomListWithDateRange } from "@/lib/firebase/hotelRoomHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const {
    hotelSlugName, 
    checkin,
    checkout,
  } = req.body;

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  try {
    // call the lib functions to get the data from the database
    const [
      // roomsList,
      imagesList,
      amenitiesList,
      nearbyPlaces,
      reviewsList,
      { faqList, schemaList },
    ] = await Promise.all([
      // getHotelRoomListWithDateRange(hotelSlugName, checkinDate, checkoutDate),
      getHotelImageObjectList(hotelSlugName, 24),
      getHotelAmenitiesList(hotelSlugName),
      getHotelNearByPlacesList(hotelSlugName),
      fetchHotelReviews(hotelSlugName, 20, "user_rating", false),
      getHotelFAQsListForGoogleSchema(hotelSlugName, 30),
    ]);

    // return the data from the api response
    res.status(200).json({
      // roomsList,
      imagesList,
      amenitiesList,
      nearbyPlaces,
      reviewsList,
      schemaList,
    });
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
