import { auth } from "@/lib/firebase";
import cookie from "cookie"; // server side cookie only https and available on the server side
import {
  EMAIL_SIGNUP,
  USER_ACCESS_TOKEN,
  COOKIE_EXPIRATOIN_TIME
} from "@/lib/helper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { createUserAccount } from "@/lib/firebase/userHandler";

async function handler(req: any, res: any) {
  // req.body.token
  // const serverResponse = NextResponse.next();
  const data = req.body;

  const { authType, userEmail, userPassword } = data;

  if (
    !userEmail ||
    !userEmail.includes("@") ||
    !userEmail.includes(".") ||
    !userPassword ||
    userPassword.trim().length < 7 ||
    userPassword.includes(" ")
  ) {
    res.status(422).json({
      userCredentials: null,
      error: null,
      message: "Invalid input - password must be at least 7 characters",
    });
    return;
  }

  try {
    if (authType === EMAIL_SIGNUP) {
      const response = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const userAccessToken = await response.user.getIdToken();
      const userId = response.user.uid;
      const displayName = userEmail.split("@")[0];
      await createUserAccount(userAccessToken, userId, userEmail, "", "email", displayName);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(USER_ACCESS_TOKEN, userAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: COOKIE_EXPIRATOIN_TIME,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(201).json(response);
    } 
    // else if (authType === EMAIL_LOGIN) {
    else {
      const response = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const userAccessToken = await response.user.getIdToken();
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(USER_ACCESS_TOKEN, userAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: COOKIE_EXPIRATOIN_TIME,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(422).json({
      userCredentials: null,
      error,
      message: "Error occoured",
    });
  }

  // res.status(201).json({ message: queryOutput });
  return;
}

export default handler;
