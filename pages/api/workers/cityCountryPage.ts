import { getTopHotels } from "@/lib/firebase/cityHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const { citySlug, lastDoc } = req.body;

  try {
    // get the list of regions for the current city to show in the filters
    const topHotles = await getTopHotels(citySlug, lastDoc);

    if (topHotles.status === "OK" && topHotles.error === null) {
      res.status(200).json({
        data: topHotles.data,
        lastDoc: topHotles.lastDoc,
      });
    }
  } catch (error: any) {
    console.error(
      "Error fetching city page hotels data:",
      error?.message || error,
    );
    res
      .status(500)
      .json({ error: "Failed to fetch city page mostbooked hotels data" });
  }
}
