import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import { parse } from "cookie";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  CACHED_BOOKING_TOKEN,
  ariDateFormat,
  extractJWTValues,
} from "@/lib/helper";
import { useSelector } from "react-redux";
import { selectBookingDetailsInfo } from "@/lib/redux/bookingConfirmationSlice";
const shortid = require("shortid");
const md5 = require("md5");
const sha256 = require("sha256");

type Props = {
  // bookingDetails: any;
};
export default function SendToAirpayRedirectPage(props: Props) {
  const bookingCnfInfo = useSelector(selectBookingDetailsInfo);

  const alldata =
    bookingCnfInfo.user_Email_Id +
    bookingCnfInfo.user_First_Name +
    bookingCnfInfo.user_Last_Name +
    bookingCnfInfo.user_Address +
    "city" +
    bookingCnfInfo.user_State +
    "India" +
    `${bookingCnfInfo.paying_Amount}` +
    bookingCnfInfo.booking_Id;

  const AIRPAY_MERCHANT_ID = 303768;
  const AIRPAY_USERNAME = "xY6EJVRgJW";
  const AIRPAY_USERNAME_PASSWORD = "CR4q89pb";
  const AIRPAY_API_KEY = "fSuSZh245KqrTcxq";
  //   const AIRPAY_MERCHANT_ID = 21720;
  //   const AIRPAY_USERNAME = '7595201';
  //   const AIRPAY_USERNAME_PASSWORD = 'MgUFY5em';
  //   const AIRPAY_API_KEY = '6KeetYvu2TSdsegD';

  const udata = AIRPAY_USERNAME + ":|:" + AIRPAY_USERNAME_PASSWORD;
  const privatekey = sha256(AIRPAY_API_KEY + "@" + udata);
  const keySha256 = sha256(AIRPAY_USERNAME + "~:~" + AIRPAY_USERNAME_PASSWORD);
  const aldata = alldata + ariDateFormat(new Date());
  const checksum = sha256(keySha256 + "@" + aldata);

  useEffect(() => {
    const submitForm = () => {
      setTimeout(() => {
        const form = document.getElementById(
          "sendtoairpay",
        ) as HTMLFormElement | null;
        if (form) {
          form.submit();
        }
      }, 1000);
    };

    submitForm();
  }, []);

  return (
    <html>
      <head>
        <title>Redirecting to Airpay</title>
        <meta
          name="twitter:image"
          content={`redirect to airpay payment page`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://staybook.in" />
        <script
          id="googeltaglabel"
          dangerouslySetInnerHTML={{
            __html: `gtag('config', 'AW-11250327005');`,
          }}
        />
      </head>
      <body>
        <div className="main container">
          <div className="row">
            <div className="col-md-12">
              <table width="100%">
                <tbody>
                  <tr>
                    <td align="center" valign="middle">
                      <h1 className="display-4 m-b-2">
                        Do Not Refresh or Press Back
                      </h1>
                      <br />
                      Redirecting to Airpay
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Hidden form */}
              <form
                method="POST"
                action="https://payments.airpay.co.in/pay/index.php"
                id="sendtoairpay"
              >
                <input type="hidden" name="privatekey" value={privatekey} />
                <input
                  type="hidden"
                  name="buyerEmail"
                  value={bookingCnfInfo.user_Email_Id}
                />
                <input
                  type="hidden"
                  name="buyerPhone"
                  value={bookingCnfInfo.user_Phone_Number}
                />
                <input
                  type="hidden"
                  name="buyerFirstName"
                  value={bookingCnfInfo.user_First_Name}
                />
                <input
                  type="hidden"
                  name="buyerLastName"
                  value={bookingCnfInfo.user_Last_Name}
                />
                <input
                  type="hidden"
                  name="buyerAddress"
                  value={bookingCnfInfo.user_Address}
                />
                <input type="hidden" name="buyerCity" value={`city`} />
                <input
                  type="hidden"
                  name="buyerState"
                  value={bookingCnfInfo.user_State}
                />
                <input type="hidden" name="buyerCountry" value={`India`} />
                <input
                  type="hidden"
                  name="buyerPinCode"
                  value={bookingCnfInfo.user_Pincode}
                />
                <input
                  type="hidden"
                  name="orderid"
                  value={bookingCnfInfo.booking_Id}
                />
                <input
                  type="hidden"
                  name="amount"
                  value={bookingCnfInfo.paying_Amount}
                />
                <input type="hidden" name="mercid" value={AIRPAY_MERCHANT_ID} />
                <input type="hidden" name="currency" value="356" />
                <input type="hidden" name="isocurrency" value="INR" />
                <input type="hidden" name="checksum" value={checksum} />
              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

// export async function getServerSideProps(context: any) {
//   const { params, query, req, res } = await context;

//   const cookies = parse(req.headers.cookie || '');
//   const userAccessToken = cookies[CACHED_BOOKING_TOKEN];
//   const bookingDetails: any = await extractJWTValues(userAccessToken);

//   return {
//     props: {
//       bookingDetails: bookingDetails,
//     },
//   };
// }
