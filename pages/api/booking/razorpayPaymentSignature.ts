import crypto from "crypto";

export default async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    receivedData.response;

  if (req.method === "POST") {
    try {
      const sigVal = `${razorpay_order_id}|${razorpay_payment_id}`;
      const secret = process.env.NEXT_PUBLIC_RAZORPAY_SECRET || "";
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(sigVal.toString());
      const signature = hmac.digest("hex");

      if (signature === razorpay_signature) {
        console.log("Signature verified");
        res.status(201).json({
          status: true,
        });
      } else {
        console.log("Signature not verified");
        res.status(200).json({
          status: false,
          error: null,
        });
      }
    } catch (error) {
      console.log("Signature not verified");
      res.status(400).json({
        status: false,
        error: error,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}
