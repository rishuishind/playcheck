export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
    // call the lib functions to get the data from the database
    // const [imagesList, amenitiesList, nearbyPlaces, { faqList, schemaList }] =
    //   await Promise.all([
    //     getHotelImageObjectList(hotelSlug, 10),
    //     getHotelAmenitiesList(hotelSlug, 10),
    //     getHotelNearByPlacesList(hotelSlug),
    //     getHotelFAQsListForGoogleSchema(hotelSlug),
    //   ]);

    // return the data from the api response
    // res.status(200).json({
    //   imagesList,
    //   amenitiesList,
    //   nearbyPlaces,
    //   schemaList,
    // });
    res.status(200).json({
      message: "Success",
      data: "",
    });
  } catch (error: any) {
    console.error("Error fetching hotel room id data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel room id data" });
  }
}
