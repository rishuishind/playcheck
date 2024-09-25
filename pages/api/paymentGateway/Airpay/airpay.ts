const shortid = require("shortid");
const md5 = require("md5");
const sha256 = require("sha256");

export default async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userBooking } = receivedData;

  const orderId = shortid.generate();
  const alldata =
    userBooking.user_Email_Id +
    userBooking.user_First_Name +
    userBooking.user_Last_Name +
    userBooking.user_Address +
    userBooking.user_City +
    userBooking.user_State +
    userBooking.user_Country +
    userBooking.paying_Amount +
    orderId;

  const udata = process.env.NEXT_PUBLIC_USERNAME + ":|:" + process.env.NEXT_PUBLIC_USERNAME_PASSWORD;
  const privatekey = sha256(process.env.NEXT_PUBLIC_API_KEY + "@" + udata);
  const keySha256 = sha256(process.env.NEXT_PUBLIC_USERNAME + "~:~" + process.env.NEXT_PUBLIC_USERNAME_PASSWORD);
  const aldata = alldata + "2024-02-17";
  const checksum = sha256(keySha256 + "@" + aldata); 
  const response = await fetch(`https://payments.airpay.co.in/pay/index.php`, {
    method: "POST",
    body: JSON.stringify({
      privatekey: process.env.NEXT_PUBLIC_API_KEY,
      mercid: process.env.NEXT_PUBLIC_MERCHANT_ID,
      orderid: orderId,
      currency: "INR",
      isocurrency: "INR",
      chmod: "",
      buyerEmail: userBooking.user_Email_Id,
      buyerPhone: userBooking.user_Phone_Number,
      buyerFirstName: userBooking.user_First_Name,
      buyerLastName: userBooking.user_Last_Name,
      buyerAddress: userBooking.user_Address,
      buyerCity: userBooking.user_City,
      buyerState: userBooking.user_State,
      buyerCountry: userBooking.user_Country,
      buyerPinCode: userBooking.user_Pincode,
      amount: userBooking.paying_Amount,
      checksum: checksum,
      txnsubtype: "",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.ok)

  res.status(201).json({
    id: response.ok,
    currency: "INR",
    amount: userBooking.paying_Amount,
    error: null,
  });

}
