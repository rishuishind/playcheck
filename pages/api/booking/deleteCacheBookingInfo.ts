import cookie from "cookie"; // server side cookie only https and available on the server side
var Cors = require("cors");
import { CACHED_BOOKING_TOKEN, extractJWTValues } from "@/lib/helper";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST"],
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors middleware
  // await cors(req, res);

  // try {
  //   res.setHeader(
  //     "Set-Cookie",
  //     cookie.serialize(CACHED_BOOKING_TOKEN, "", {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV !== "development",
  //       expires: new Date(0),
  //       sameSite: "strict",
  //       path: "/",
  //     })
  //   );
  //   res.status(201).json({ status: true });
  // } catch (error) {
  //   res.status(422).json({ status: false });
  // }
  try {
    try {
      const cookies = parse(req.headers.cookie || "");
      const cookieMap = new Map(Object.entries(cookies));

      for (let mapKey of cookieMap.keys()) {
        if (mapKey.startsWith("rm-")) {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize(mapKey, "", {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              expires: new Date(0),
              sameSite: "strict",
              path: "/",
            }),
          );
        }
      }
      // const bookingDetailsToken = cookies[CACHED_BOOKING_TOKEN];
      // let cacheBookingDetails: any = await extractJWTValues(
      //   bookingDetailsToken
      // );

      // for (let roomCacheId of cacheBookingDetails.bookedRoomIdList) {
      //   res.setHeader(
      //     "Set-Cookie",
      //     cookie.serialize(roomCacheId, "", {
      //       httpOnly: true,
      //       secure: process.env.NODE_ENV !== "development",
      //       expires: new Date(0),
      //       sameSite: "strict",
      //       path: "/",
      //     })
      //   );
      // }
    } catch (err7) {}

    try {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(CACHED_BOOKING_TOKEN, "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      );
    } catch (err8) {}

    res.status(201).json({ status: true });
  } catch (err) {
    res.status(422).json({ status: false });
  }
}

export default handler;
