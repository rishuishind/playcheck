import { getAllRegionsList } from "@/lib/firebase/cityHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const citySlug = req.body;

  try {
    // call the lib functions to get the data from the database
    // const mostBookedHotels =
    //   await getListOfMostBookedHotelsWithPagination(citySlug);

    // get the list of regions for the current city to show in the filters
    const regionListRes = await getAllRegionsList(citySlug);

    if (regionListRes.status === "OK" && regionListRes.error === null) {
      res.status(200).json({
        // mostBookedHotels: mostBookedHotels.data,
        regionsList: regionListRes.data,
      });
    }
  } catch (error: any) {
    console.error(
      "Error fetching city page mostbooked hotels data:",
      error?.message || error,
    );
    res
      .status(500)
      .json({ error: "Failed to fetch city page mostbooked hotels data" });
  }
}
