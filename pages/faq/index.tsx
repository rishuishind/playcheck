import CustomHead from "@/components/header/CustomHead";
import {
  FAQ_PAGE_META_DESCRIPTION,
  FAQ_PAGE_TAB_TITLE,
  FREQUENTLY_ASKED_QUESTIONS_URL,
  LOGO_IMAGE_URL1,
} from "@/lib/helper";
import Image from "next/image";
import { faqData } from "@/lib/constantData";
import { useEffect, useState } from "react";

export default function FAQPage() {
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
        metaShowTitle={FAQ_PAGE_TAB_TITLE}
        metaDescription={FAQ_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${FREQUENTLY_ASKED_QUESTIONS_URL}`}
      />
      <section className="relative h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={"https://images.staybook.in/pexels-leeloo-thefirst.jpg"}
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
                F.A.Q
              </h1>
              <p className="hidden text-sm font-medium md:block md:text-base">
                Let&#39;s ask some question, we are here to help you
              </p>
              <p className="text-sm font-medium md:hidden md:text-base">
                We are here to help you
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          {faqData.map((item, index) => (
            <div key={index} className="mb-4 space-y-1 text-sm md:text-base">
              <div className="flex items-start gap-1 font-medium text-secondary">
                <span>Q.</span>
                <h2>{item.question}</h2>
              </div>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
