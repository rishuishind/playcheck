import CustomHead from "@/components/header/CustomHead";
import {
  termandConditonBooking,
  termandConditonCheckInCheckOut,
  termandConditonGuarentees,
  termandConditonPetPolicy,
  termandConditonRatesAndPayments,
} from "@/lib/constantData";
import {
  LOGO_IMAGE_URL1,
  TERMS_AND_CONDITION_PAGE_META_DESCRIPTION,
  TERMS_AND_CONDITION_PAGE_TAB_TITLE,
  TERMS_AND_CONDITIONS_URL,
} from "@/lib/helper";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TermsAndConditionsPage() {
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
        metaShowTitle={TERMS_AND_CONDITION_PAGE_TAB_TITLE}
        metaDescription={TERMS_AND_CONDITION_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${TERMS_AND_CONDITIONS_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                title="banner_Image"
                alt={"banner_Image"}
                src={
                  "https://images.staybook.in/pexels-markus-winkler%20(1).jpg"
                }
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
                priority
                unoptimized
              />
            )}
          </div>
          <div className="relative grid h-full w-full place-items-center p-4  text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                Terms and Condition
              </h1>
              <p className="hidden text-sm font-medium md:block md:text-base">
                Check out our Terms & Conditions for a hassle-free experience
              </p>
              <p className="text-sm font-medium md:hidden md:text-base">
                Check out our hassle-free experience
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full">
          <div className="my-4">
            <h2 className="mb-1 flex items-center gap-4 text-lg font-bold text-secondary">
              <span className="flex items-center gap-1">
                <Image
                  alt="checkin"
                  src={"/t&c/checkIn.webp"}
                  width={28}
                  height={28}
                  className="h-10 w-10"
                  priority
                  unoptimized
                />
                Check In
              </span>
              <span className="flex items-center gap-1">
                <Image
                  alt="checkin"
                  src={"/t&c/checkOut.webp"}
                  width={28}
                  height={28}
                  className="h-10 w-10"
                  priority
                  unoptimized
                />
                Check Out
              </span>
            </h2>
            {termandConditonCheckInCheckOut.map(
              (policy: string, index: number) => (
                <p key={index} className="py-1 text-sm md:text-base">
                  &bull; {policy}
                </p>
              ),
            )}
          </div>
          <div className="my-4">
            <h2 className="mb-1 flex items-center gap-1 text-lg font-bold text-secondary">
              <Image
                alt="checkin"
                src={"/t&c/currency.webp"}
                width={28}
                height={28}
                className="h-10 w-10"
                priority
                unoptimized
              />
              Rates and Payment
            </h2>
            {termandConditonRatesAndPayments.map(
              (policy: string, index: number) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: "&bull; " + policy }}
                  className="py-1 text-sm md:text-base"
                />
              ),
            )}
          </div>
          <div className="my-4">
            <h2 className="mb-1 flex items-center gap-1 text-lg font-bold text-secondary">
              <Image
                alt="checkin"
                src={"/t&c/gst.webp"}
                width={24}
                height={24}
                className="h-10 w-10"
                priority
                unoptimized
              />
              Booking
            </h2>
            {termandConditonBooking.map((policy: string, index: number) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: "&bull; " + policy }}
                className="py-1 text-sm md:text-base"
              />
            ))}
          </div>
          <div className="my-4">
            <h2 className="mb-1 flex items-center gap-1 text-lg font-bold text-secondary">
              <Image
                title="checkin"
                alt="checkin"
                src={"/t&c/petFriendly.webp"}
                width={24}
                height={24}
                className="h-10 w-10"
                priority
                unoptimized
              />
              Pet policies
            </h2>
            {termandConditonPetPolicy.map((policy: string, index: number) => (
              <p key={index} className="py-1 text-sm md:text-base">
                &bull; {policy}
              </p>
            ))}
          </div>
          <div className="my-4">
            <h2 className="mb-1 flex items-center gap-1 text-lg font-bold text-secondary">
              <Image
                title="checkin"
                alt="checkin"
                src={"/t&c/guaranteed.webp"}
                width={24}
                height={24}
                className="h-10 w-10"
                priority
                unoptimized
              />
              Guarantee
            </h2>
            {termandConditonGuarentees.map((policy: string, index: number) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: "&bull; " + policy }}
                className="py-1 text-sm md:text-base"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
