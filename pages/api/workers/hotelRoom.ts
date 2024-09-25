import { getHotelRoomDetailsList } from "@/lib/firebase/hotelRoomHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
    // Fetch hotel room details list
    const roomsList = await getHotelRoomDetailsList(hotelSlug, true, 10);
  
    // Return the data from the API response
    res.status(200).json(roomsList);
  } catch (error: any) {
    console.error("Error fetching hotel data:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
