import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";

export default async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userBooking, checkInDate, checkOutDate } = receivedData;

  let roomsInfo = "";
  userBooking.roomsList.forEach((room: RoomDetails) => {
    roomsInfo += `${room.room_Name} booked with room plan: ${room.plan_Info}, \n`;
  });

  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://graph.facebook.com/v16.0/113549444945607/messages/",
        {
          method: "POST",
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: userBooking.user_Phone_Number,
            type: "template",
            template: {
              name: "hotel_order",
              language: {
                code: "en",
              },
              components: [
                {
                  type: "body",
                  parameters: [
                    {
                      type: "text",
                      text: userBooking.hotel_Name,
                    },
                    {
                      type: "text",
                      text: `${checkInDate}`,
                    },
                    {
                      type: "text",
                      text: `${checkOutDate}`,
                    },
                    {
                      type: "text",
                      text: `${userBooking.total_Rooms_Count}`,
                    },
                    {
                      type: "text",
                      text: `${userBooking.total_Guests_Count}`,
                    },
                    {
                      type: "text",
                      text: "+919910613040",
                    },
                    {
                      type: "text",
                      text: `${userBooking.hotel_Address}`,
                    },
                    {
                      type: "text",
                      text: "Booking Confirmed!",
                    },
                    {
                      type: "text",
                      text: `${roomsInfo}`,
                    },
                  ],
                },
              ],
            },
          }),
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_META_BEARER}`,
            "Content-Type": "application/json",
          },
        },
      );

      res.status(200).json({
        status: response,
        error: null,
      });
    } catch (err) {
      res.status(400).json({
        status: null,
        error: err,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}
