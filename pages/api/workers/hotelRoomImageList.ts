import {
  getHotelImageObjectList,
  getHotelRoomObjectImageList,
} from "@/lib/firebase/hotelHandler";

export default async function handler(req: any, res: any) {
  // extract hotelSlug from req body
  const hotelSlug = req.body;

  try {
    const [hotelImageList, hotelRoomObjectImageList] = await Promise.all([
      getHotelImageObjectList(hotelSlug),
      getHotelRoomObjectImageList(hotelSlug),
    ]);

    res.status(200).json({
      hotelImageList,
      hotelRoomObjectImageList,
    });
  } catch (error: any) {
    console.error(
      "Error fetching hotel and rooms image list:",
      error?.message || error,
    );
    res
      .status(500)
      .json({ error: "Failed to hotel and room images list data" });
  }
}
