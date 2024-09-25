import crypto from "crypto";
const shortid = require("shortid");

export default async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userBooking } = receivedData;

  const transactionId = shortid.generate();
  if (req.method === "POST") {
    let tokenValue = `${process.env.NEXT_PUBLIC_WORLDLINE_MERCHANT_ID}|txnId|${userBooking.total_Price}|accountNo|consumerId|8373929299|staybookhost@gmail.com|debitStartDate|debitEndDate|maxAmount|amountType|frequency|cardNumber|expMonth|expYear|cvvCode|${process.env.NEXT_PUBLIC_WORLDLINE_ENCRYPTION_KEY}`;
    //consumerData.merchantId(✔️)|consumerData.txnId|totalamount(✔️)|consumerData.accountNo|consumerData.consumerId|consumerData.consumerMobileNo(✔️)|consumerData.consumerEmailId(✔️)|consumerData.debitStartDate|consumerData.debitEndDate|consumerData.maxAmount|consumerData.amountType|consumerData.frequency|consumerData.cardNumber|consumerData.expMonth|consumerData.expYear|consumerData.cvvCode|SALT(✔️)
    const generatedToken = crypto.createHmac("sha512", tokenValue);

    try {
      res.status(200).json({
        token: generatedToken,
        error: null
      });
    } catch (err) {
      res.status(400).json({
        token: "",
        error: err,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}
