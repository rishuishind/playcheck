import cookie from "cookie"; // server side cookie only https and available on the server side
const jwt = require("jsonwebtoken");
import { parse } from "cookie";

import {
  CACHED_BOOKING_EXPIRATOIN_TIME,
  CACHED_BOOKING_TOKEN,
} from "@/lib/helper";

const shortid = require("shortid");

async function handler(req: any, res: any) {
  const bookingData = req.body;
  const { roomsList } = bookingData;

  // try {
  //   const cookies = parse(req.headers.cookie || "");
  //   // console.log(cookies);
  //   const cookieMap = new Map(Object.entries(cookies));
  //   // console.log("Keys: ",cookies.keys());
  //   // const bookingDetailsToken = cookies[CACHED_BOOKING_TOKEN];
  //   // console.log(bookingDetailsToken);
  //   // let cacheBookingDetails: any = await extractJWTValues(bookingDetailsToken);
  //   // console.log(cacheBookingDetails);

  //   for (let mapKey of cookieMap.keys()) {
  //     const chk = roomsList.includes(mapKey);
  //     if (mapKey.startsWith("rm-") && !chk) {
  //       res.setHeader(
  //         "Set-Cookie",
  //         cookie.serialize(mapKey, "", {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV !== "development",
  //           expires: new Date(0),
  //           sameSite: "strict",
  //           path: "/",
  //         }),
  //       );
  //     }
  //   }
  // } catch (err1) {}

  // const encodeSecret = process.env.NEXT_PUBLIC_CACHE_SECRET;
  let bookedRoomIdList: string[] = [];

  try {
    for (let room of roomsList) {
      let cacheRoomId = `rm-${shortid.generate()}`;
      const encodeSecret = "llzs-atnf-rmyl-wprb";
      const bookedRoomToken = jwt.sign(room, encodeSecret, {
        expiresIn: `${CACHED_BOOKING_EXPIRATOIN_TIME}s`,
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(cacheRoomId, bookedRoomToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: CACHED_BOOKING_EXPIRATOIN_TIME,
          sameSite: "strict",
          path: "/",
        }),
      );

      bookedRoomIdList.push(cacheRoomId);
    }
  } catch (err2) {}

  try {
    res.status(201).json({ status: true, bookedRoomIdList: bookedRoomIdList });
  } catch (error) {
    res.status(422).json({ status: false, bookedRoomIdList: [] });
  }

  // res.status(201).json({ message: queryOutput });
  return;
}

export default handler;
