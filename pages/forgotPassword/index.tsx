import CustomHead from "@/components/header/CustomHead";
import { sendResetPasswordEmail } from "@/lib/firebase/passwordHandler";
import {
  FORGOT_PASSWORD_PAGE_META_DESCRIPTION,
  FORGOT_PASSWORD_PAGE_TAB_TITLE,
  FORGOT_PASSWORD_URL,
  LOGO_IMAGE_URL1,
} from "@/lib/helper";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setemail] = useState<string>("");

  async function send() {
    let response = await sendResetPasswordEmail(email);
    if (response.status) {
      alert("We sent an email. Please check your inbox.");
      return;
    }
    alert("something went wrong");
  }

  return (
    <>
      <CustomHead
        metaShowTitle={FORGOT_PASSWORD_PAGE_TAB_TITLE}
        metaDescription={FORGOT_PASSWORD_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${FORGOT_PASSWORD_URL}`}
      />

      <div className="mb-3 grid h-[60vh] w-full place-items-center">
        <div className="flex w-full max-w-sm flex-col">
          <h1 className="mb-2 text-lg font-semibold tracking-wide">
            Enter your email to receive the password reset link.
          </h1>
          <input
            type="text"
            className="h-12 w-full rounded-md border shadow-xl"
            placeholder="enter your email..."
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <button
            className="mt-4 rounded-md bg-secondary p-3 text-white"
            onClick={send}
          >
            send reset password link
          </button>
        </div>
      </div>
    </>
  );
}
