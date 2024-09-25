import { parse } from "cookie";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  USER_ACCESS_TOKEN,
  USER_COLLECTION_NAME,
  extractJWTValues,
} from "@/lib/helper";

async function handler(req: any, res: any) {
  const receivedData = req.body;

  try {
    const cookies = parse(req.headers.cookie || "");
    const userAccessToken = cookies[USER_ACCESS_TOKEN];
    const userObj = await extractJWTValues(userAccessToken);
    const userData: { user_id: string } = userObj as { user_id: string };
    const user_Id = userData.user_id;    
    const { headerValue1, textValue1 } = receivedData;
    const docRef = doc(db, USER_COLLECTION_NAME, user_Id);
    const response = await setDoc(
      docRef,
      { [headerValue1]: textValue1 },
      { merge: true }
    );
    res.status(201).json({
      userCredentials: response,
      error: null,
      message: "operation success",
    });
  } catch (error) {
    res.status(400).json({
      error: "something went wrong", 
    });
  }
}

export default handler;
