const nodeCCAvenue = require("node-ccavenue");
const shortid = require("shortid");

export default async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userBooking } = receivedData;

  const { body } = req;
  const workingKey = "49206DB15CB8D0838E52DFD1DE796FDA"; // Put in the 32-Bit key shared by CCAvenues.
  const accessCode = "AVLS25KJ31CA17SLAC"; // Put in the Access Code shared by CCAvenues.

  //   const encRequest = encryptCCAvenue(body, workingKey);
  const ccav = new nodeCCAvenue.Configure({
    merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID,
    working_key: process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY,
  });

  const amount = Math.ceil(userBooking.paying_Amount);
  // const amount = Math.ceil(1);
  const currency = "INR";
  const orderParams = {
    merchant_id: 2908454,
    order_id: 123456,
    currency: "INR",
    amount: 1.0,
    redirect_url: "http%3A%2F%2F127.0.0.1%3A3001%2FccavResponseHandler",
    cancel_url: "http%3A%2F%2F127.0.0.1%3A3001%2FccavResponseHandler",
    language: "EN",
    billing_name: "Peter",
    billing_address: "Santacruz",
    billing_city: "Mumbai",
    billing_state: "MH",
    billing_zip: 400054,
    billing_country: "India",
    billing_tel: 9876543210,
    billing_email: "staybookhost%40gmail.com",
    delivery_name: "Sam",
    delivery_address: "Vile Parle",
    delivery_city: "Mumbai",
    delivery_state: "Maharashtra",
    delivery_zip: 400038,
    delivery_country: "India",
    delivery_tel: 123456789,
    merchant_param1: "additional+Info.",
    promo_code: 12,
    customer_identifier: 98765,
    // merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID,
    // order_id: shortid.generate(),
    // currency: currency,
    // amount: +amount,
    // redirect_url: encodeURIComponent(`URL`),
    // cancel_url: encodeURIComponent(`URL`),
    // language: "EN",
    // billing_name: userBooking.user_Name,
    // billing_address: userBooking.user_Address,
    // billing_state: userBooking.user_State,
    // billing_zip: userBooking.user_Pincode,
  };

  const encryptedOrderData = await ccav.getEncryptedOrder(orderParams);
  // //   const url = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction`;
  const url = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction`;

  const response = await fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify({
      formbody: encryptedOrderData,
    }),
    headers: {
      "Content-Type": "text/html",
    },
  });

  const data = await response.json();
  res.status(201).json(data);

  //   const formbody =
  //     `<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/>` +
  //     `<input type="hidden" id="encRequest" name="encRequest" value="${encryptedOrderData}">` +
  //     `<input type="hidden" name="access_code" id="access_code" value="${accessCode}">` +
  //     `<script language="javascript">document.redirect.submit();</script></form>`;

  //   res.setHeader("Content-Type", "text/html");
  //   res.status(200).send(formbody);

  //   if (req.method === "POST") {
  //     // Initialize ccAvenue object
  //     const ccav = new nodeCCAvenue.Configure({
  //       merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID,
  //       working_key: process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY,
  //     });

  //     const payment_capture = 1;
  //     const amount = Math.ceil(userBooking.paying_Amount);
  //     // const amount = Math.ceil(1);
  //     const currency = "INR";
  //     const orderParams = {
  //       merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID,
  //       order_id: shortid.generate(),
  //       currency: currency,
  //       amount: +amount,
  //       redirect_url: encodeURIComponent(`URL`),
  //       cancel_url: encodeURIComponent(`URL`),
  //       language: "EN",
  //       billing_name: userBooking.user_Name,
  //       billing_address: userBooking.user_Address,
  //       billing_state: userBooking.user_State,
  //       billing_zip: userBooking.user_Pincode,
  //     };

  //     try {
  //       const encryptedOrderData = await ccav.getEncryptedOrder(orderParams);
  //       console.log(encryptedOrderData);
  //       res.status(200).json({
  //         id: orderParams.order_id,
  //         currency: currency,
  //         amount: (+amount).toString(),
  //         error: null,
  //       });
  //     } catch (error: any) {
  //       console.log(error);
  //       res.status(400).json({
  //         id: null,
  //         curreny: null,
  //         amount: null,
  //         error: error,
  //       });
  //     }

  //     // // Create an order -> generate the OrderID -> Send it to the Front-end
  //     // const options = {
  //     //   amount: (amount * 100).toString(),
  //     //   currency,
  //     //   receipt: shortid.generate(),
  //     //   payment_capture,
  //     // };

  //     // try {
  //     //   const response = await razorpay.orders.create(options);
  //     //   res.status(200).json({
  //     //     id: response.id,
  //     //     currency: response.currency,
  //     //     amount: response.amount,
  //     //     error: null,
  //     //   });
  //     // } catch (err) {
  //     //   console.log(err);
  //     //   res.status(400).json({
  //     //     id: null,
  //     //     curreny: null,
  //     //     amount: null,
  //     //     error: err,
  //     //   });
  //     // }
  //   } else {
  //     // Handle any other HTTP method
  //   }
}
