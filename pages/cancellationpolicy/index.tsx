import CustomHead from "@/components/header/CustomHead";
import {
  CANCELLATION_POLICY_URL,
  LOGO_IMAGE_URL1,
  TERMS_AND_CONDITION_PAGE_META_DESCRIPTION,
  TERMS_AND_CONDITION_PAGE_TAB_TITLE,
} from "@/lib/helper";
import Image from "next/image";
import { cancellationPolicy } from "@/lib/constantData";
import { useEffect, useState } from "react";

export default function CancellationPolicyPage() {
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
        canonicalUrl={`https://staybook.in${CANCELLATION_POLICY_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={"https://images.staybook.in/pexels-mikhail-nilov-1.jpg"}
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <div className="relative grid h-full w-full place-items-center p-4 text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                Cancelation Policy
              </h1>
              <h2 className="hidden text-sm font-medium md:block md:text-base">
                Book confidently with our flexible cancellation policy
              </h2>
              <p className="text-sm font-medium md:hidden md:text-base">
                Flexible cancellation policy
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          <div className="flex flex-col items-center lg:flex-row-reverse lg:items-start">
            <Image
              alt="refund_Policy_icon"
              src={"/cancellation.jpg"}
              width={412}
              height={288}
              className="p-4 lg:w-1/3"
            />
            <div className="lg:w-2/3">
              {cancellationPolicy.map((policy: string, index: number) => (
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
