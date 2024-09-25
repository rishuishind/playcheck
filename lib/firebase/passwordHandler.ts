import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth } from ".";

export const sendResetPasswordEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const resetPassword = async (oobCode: string, newPassword: string) => {
  try {
  
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
