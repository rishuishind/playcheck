import CustomHead from "@/components/header/CustomHead";
import {
  LOGO_IMAGE_URL1,
  PRIVACY_POLICY_PAGE_META_DESCRIPTION,
  PRIVACY_POLICY_PAGE_TAB_TITLE,
  PRIVACY_POLICY_URL,
} from "@/lib/helper";
import Image from "next/image";
import dynamic from "next/dynamic";
import { privacyPhishing, privacyPolicy } from "@/lib/constantData";
import { useEffect, useState } from "react";

const MailOpenIcon = dynamic(
  () => import("@heroicons/react/solid/MailOpenIcon"),
  { ssr: false },
);
const PhoneIcon = dynamic(() => import("@heroicons/react/solid/PhoneIcon"), {
  ssr: false,
});

export default function PrivacyPolicyPage() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <>
      <CustomHead
        metaShowTitle={PRIVACY_POLICY_PAGE_TAB_TITLE}
        metaDescription={PRIVACY_POLICY_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${PRIVACY_POLICY_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={"https://images.staybook.in/pexels-markus-winkler.jpg"}
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <div className="relative grid h-full w-full place-items-center p-4  text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="text-sm font-medium md:text-base">
                Your Privacy, Our Priority
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          <div>
            <h2 className="text-lg font-bold text-secondary">
              Different type of personal information is collected by us
              mentioned below.
            </h2>
            {privacyPolicy.map((policy: string, index: number) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: "&bull; " + policy }}
                className="py-1 text-sm md:text-base"
              />
            ))}
          </div>

          <div className="my-4">
            <h2 className="text-lg font-bold text-secondary">Phishing</h2>
            <div>
              {privacyPhishing.map((policy: string, index: number) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: "&bull; " + policy }}
                  className="py-1 text-sm md:text-base"
                />
              ))}
            </div>
          </div>

          <div className="md:text-center">
            <h2 className="text-lg font-bold text-secondary">Contact us</h2>
            <p className="mb-2">
              Guest can feel free to contact us 24*7 at our customer service
              number or mail us their querys.
            </p>
            <div className="md:flex md:items-center md:justify-center md:gap-7">
              <a
                href="mailto: booking@staybook.in"
                className="flex items-center gap-1 border-secondary py-1 md:h-12 md:rounded-full md:border-2 md:px-4 lg:h-16 lg:px-7"
              >
                <MailOpenIcon className="h-7 w-7 fill-secondary" />
                Booking@Staybook.in
              </a>

              <a
                href="Tel: +91-9910613040"
                className="flex items-center gap-1 border-secondary py-1 md:h-12 md:rounded-full md:border-2 md:px-4 lg:h-16 lg:px-7"
              >
                <PhoneIcon className="h-6 w-6 fill-secondary" />
                +91-9910613040
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
