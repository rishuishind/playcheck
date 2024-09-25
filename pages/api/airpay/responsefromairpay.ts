import cookie from "cookie";
const jwt = require("jsonwebtoken");
import {
  STAYBOOK_PAYMENT_STATUS,
  CACHED_BOOKING_EXPIRATOIN_TIME,
} from "@/lib/helper";

export default async function handler(req: any, res: any) {
  const receivedData = req.body;

  const {
    MERCID,
    TRANSACTIONID,
    APTRANSACTIONID,
    CHMOD,
    AMOUNT,
    BILLEDAMOUNT,
    MESSAGE,
    BANKRESPONSEMSG,
    CUSTOMER,
    CUSTOMERPHONE,
    CUSTOMEREMAIL,
    TRANSACTIONSTATUS,
    TRANSACTIONPAYMENTSTATUS,
  } = receivedData;

  try {
    if (
      (MESSAGE && MESSAGE.toLowerCase() === "success") ||
      (TRANSACTIONPAYMENTSTATUS &&
        TRANSACTIONPAYMENTSTATUS.toLowerCase() === "success") ||
      (BANKRESPONSEMSG && BANKRESPONSEMSG.toLowerCase() === "success")
    ) {
      const encodeSecret = "llzs-atnf-rmyl-wprb";
      const airpayPaymentStatusToken = jwt.sign(receivedData, encodeSecret, {
        expiresIn: `${CACHED_BOOKING_EXPIRATOIN_TIME}s`,
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(STAYBOOK_PAYMENT_STATUS, airpayPaymentStatusToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: CACHED_BOOKING_EXPIRATOIN_TIME,
          sameSite: "strict",
          path: "/",
        })
      );

      res.redirect(301, `/payment/airpayBillingResponse`);
    } else {
      res.redirect(301, `/payment`);
    }
  } catch (error) {
    res.redirect(301, `/payment`);
  }
}
