import CustomHead from "@/components/header/CustomHead";
import { resetPassword } from "@/lib/firebase/passwordHandler";
import {
  LOGO_IMAGE_URL1,
  RESET_PASSWORD_PAGE_META_DESCRIPTION,
  RESET_PASSWORD_PAGE_TAB_TITLE,
  RESET_PASSWORD_URL,
} from "@/lib/helper";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function reset() {
    if (router.query.oobCode) {
      let response = await resetPassword(router.query.oobCode + "", password);
      if (response.status) {
        alert("password reset successful");
        router.push("/login");
        return;
      }
    }

    alert("failed to reset");
  }

  return (
    <>
      <CustomHead
        metaShowTitle={RESET_PASSWORD_PAGE_TAB_TITLE}
        metaDescription={RESET_PASSWORD_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${RESET_PASSWORD_URL}`}
      />
      <div className="mb-3 grid h-auto min-h-[60vh] w-full place-items-center">
        <div className="flex w-full max-w-sm flex-col">
          <label className="mb-2 text-center text-lg font-semibold tracking-wide">
            Enter your new password
          </label>

          <input
            type="text"
            className="h-12 w-full rounded-md border shadow-lg"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-4 rounded-md bg-secondary p-3 text-white"
            onClick={reset}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
}
