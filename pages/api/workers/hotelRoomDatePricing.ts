import { getHotelRoomListWithDateRange } from "@/lib/firebase/hotelRoomHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const { hotelSlugName, checkin, checkout } = req.body;

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  try {
    // call the lib functions to get the data from the database

    const roomsList = await getHotelRoomListWithDateRange(
      hotelSlugName,
      checkinDate,
      checkoutDate,
    );

    // return the data from the api response
    res.status(200).json({
      roomsList,
    });
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
