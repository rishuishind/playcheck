import {
  getHotelAmenitiesList,
  getHotelFAQsListForGoogleSchema,
  getHotelImageObjectList,
  getHotelNearByPlacesList,
} from "@/lib/firebase/hotelHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
    // call the lib functions to get the data from the database
    const [imagesList, amenitiesList, nearbyPlaces, { faqList, schemaList }] =
      await Promise.all([
        getHotelImageObjectList(hotelSlug, 10),
        getHotelAmenitiesList(hotelSlug, 1000),
        getHotelNearByPlacesList(hotelSlug),
        getHotelFAQsListForGoogleSchema(hotelSlug, 1000),
      ]);

    // return the data from the api response
    res.status(200).json({
      imagesList,
      amenitiesList,
      nearbyPlaces,
      schemaList,
    });
  } catch (error: any) {
    console.error("Error fetching hotel rooms data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel rooms data" });
  }
}
