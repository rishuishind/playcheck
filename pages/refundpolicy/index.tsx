import CustomHead from "@/components/header/CustomHead";
import {
  LOGO_IMAGE_URL1,
  REFUND_POLICY_PAGE_META_DESCRIPTION,
  REFUND_POLICY_PAGE_TAB_TITLE,
  REFUND_POLICY_URL,
} from "@/lib/helper";
import Image from "next/image";
import { refundPolicy } from "@/lib/constantData";
import { useEffect, useState } from "react";

export default function RefundPolicyPage() {
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
        metaShowTitle={REFUND_POLICY_PAGE_TAB_TITLE}
        metaDescription={REFUND_POLICY_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${REFUND_POLICY_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={
                  "https://images.staybook.in/pexels-nataliya-vaitkevich.jpg"
                }
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
                Refund Policy
              </h1>
              <h2 className="hidden text-sm font-medium md:block md:text-base">
                Our Promise of Peace of Mind with Hassle-Free Refund Policy
              </h2>
              <p className="text-sm font-medium md:hidden md:text-base">
                Hassle-Free Refund Policy
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          <div className="flex flex-col items-center lg:flex-row-reverse">
            <Image
              alt="refund_Policy_icon"
              src={"https://images.staybook.in/refund%20(2).jpg"}
              width={412}
              height={288}
              className="p-4 lg:w-1/2"
              priority
            />
            <div className="lg:w-1/2">
              {refundPolicy.map((policy: string, index: number) => (
                <p key={index} className="py-1 text-sm md:text-base">
                  &bull; {policy}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
