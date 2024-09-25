import { parse } from "cookie";
import {
  extractJWTValues,
} from "@/lib/helper";

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { cookieTokenName } = receivedData;

  try {
    const cookies = parse(req.headers.cookie || "");
    const userAccessToken = await cookies[cookieTokenName];

    if (userAccessToken) {
      const userObj = await extractJWTValues(userAccessToken);

      res.status(201).json({
        credentials: userObj,
        error: null,
        message: "Cookie value generated!",
      });
    } else {
      res.status(201).json({
        credentials: null,
        error: null,
        message: "Unable to generate cookie.",
      });
    }
  } catch (error) {
    res.status(422).json({
      credentials: null,
      error,
      message: "Error occoured",
    });
  }
}

export default handler;
