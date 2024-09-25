import cookie from "cookie"; // server side cookie only https and available on the server side
const jwt = require("jsonwebtoken");
import { parse } from "cookie";

import {
  CACHED_BOOKING_EXPIRATOIN_TIME,
  CACHED_BOOKING_TOKEN,
  extractJWTValues,
} from "@/lib/helper";

async function handler(req: any, res: any) {
  const bookingData = req.body;
  const { bookingDetails } = bookingData;
  const currentTime = new Date().toISOString();

  try {
    const cookies = parse(req.headers.cookie || "");
    // console.log(cookies);
    const cookieMap = new Map(Object.entries(cookies));
    // console.log("Keys: ",cookies.keys());
    // const bookingDetailsToken = cookies[CACHED_BOOKING_TOKEN];
    // console.log(bookingDetailsToken);
    // let cacheBookingDetails: any = await extractJWTValues(bookingDetailsToken);
    // console.log(cacheBookingDetails);

    for (let mapKey of cookieMap.keys()) {
      const chk = bookingDetails.bookedRoomIdList.includes(mapKey);
      if (mapKey.startsWith("rm-") && !chk) {
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
      }),
    );
  } catch (err8) {}

  // const encodeSecret = process.env.NEXT_PUBLIC_CACHE_SECRET;
  const encodeSecret = "llzs-atnf-rmyl-wprb";
  const bookingToken = jwt.sign(bookingDetails, encodeSecret, {
    expiresIn: `${CACHED_BOOKING_EXPIRATOIN_TIME}s`,
  });

  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(CACHED_BOOKING_TOKEN, bookingToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: CACHED_BOOKING_EXPIRATOIN_TIME,
        sameSite: "strict",
        path: "/",
      }),
    );

    res.status(201).json({ status: true });
  } catch (error) {
    res.status(422).json({ status: false });
  }

  // res.status(201).json({ message: queryOutput });
  return;
}

export default handler;
