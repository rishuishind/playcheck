import { BookingDetails } from "../classModels/bookings/bookingDetails";
const shortid = require("shortid");

export const paymentSignatureConfirmation = async (
  userBooking: BookingDetails
) => {
  const response = await fetch("/api/booking/worldline", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  // if (data.status) {
  //   return true;
  // } else {
  //   return false;
  // }
};

export const initializeWorldLine = (
  userBooking: BookingDetails,
  returnPathUrl: string
) => {
  return new Promise((resolve) => {
    const jQueryScript = document.createElement("script");
    jQueryScript.src =
      "https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js";
    jQueryScript.type = "text/javascript";
    jQueryScript.async = false;
    document.body.appendChild(jQueryScript);

    const checkoutScript = document.createElement("script");
    checkoutScript.src =
      "https://www.paynimo.com/paynimocheckout/server/lib/checkout.js";
    checkoutScript.type = "text/javascript";
    checkoutScript.async = false;
    document.body.appendChild(checkoutScript);

    // Initialize Checkout
    jQueryScript.onload = () => {
      checkoutScript.onload = () => {
        $(document).ready(() => {
          function handleResponse(res: any) {
            if (res?.paymentMethod?.paymentTransaction?.statusCode === "0300") {
              console.log("Success");
            } else if (
              res?.paymentMethod?.paymentTransaction?.statusCode === "0398"
            ) {
              console.log("Block");
            } else {
              console.log("Else");
            }
          }

          const reqJson = {
            features: {
              enableAbortResponse: true,
              enableExpressPay: true,
              enableInstrumentDeRegistration: true,
              enableMerTxnDetails: true,
              enableNewWindowFlow: true, //for hybrid applications please disable this by passing false
            },
            consumerData: {
              deviceId: "WEBSH2", //possible values "WEBSH1" or "WEBSH2"
              // token: `${crypto.createHmac("sha512", Math.ceil(userBooking.total_Price).toString())}`,
              // returnUrl: returnPathUrl, //merchant response page URL
              responseHandler: handleResponse,
              paymentMode: "all",
              merchantLogoUrl: "/brand_logo.svg",
              merchantId: "T958529",
              currency: "INR",
              consumerId: shortid.generate(),
              consumerMobileNo: `8373929299`,
              consumerEmailId: `staybookhost@gmail.com`,
              txnId: "1697562030701", //Unique merchant transaction ID
              items: [
                {
                  itemId: "FIRST",
                  amount: `${Math.ceil(userBooking.total_Price)}`,
                  // amount: `10`,
                  comAmt: "0",
                },
              ],
              customStyle: {
                PRIMARY_COLOR_CODE: "#CF8F24", //merchant primary color code
                SECONDARY_COLOR_CODE: "#FFFFFF", //provide merchant's suitable color code
                BUTTON_COLOR_CODE_1: "#2d8c8c", //merchant's button background color code
                BUTTON_COLOR_CODE_2: "#FFFFFF", //provide merchant's suitable color code for button text
              },
            },
          };

          (window as any).$.pnCheckout(reqJson);
          if (reqJson.features.enableNewWindowFlow) {
            (window as any).pnCheckoutShared.openNewWindow();
          }
        });
      };
    };
  });
};
