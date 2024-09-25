import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Toaster } from "sonner";
const OverlayForm = dynamic(() => import("@/components/visa/overlayForm"), {
  ssr: false,
});
import Evisa2 from "@/components/visa/evisa2";
import Form from "@/components/visa/form";
import Details from "@/components/visa/details";
import Navbar from "@/components/navbar/Navbar";
import FaqSection from "@/components/visa/faqSection";
const VisaHead = dynamic(() => import("@/components/header/VisaHead"), {
  ssr: false,
});
const { LOGO_IMAGE_URL1 } = require("@/lib/helper");
import { countriesData } from "@/lib/helper/countriesData";
import Link from "next/link";
import { EVISA_URL } from "@/lib/helper";
import Head from "next/head";
import { GetServerSideProps } from "next";

// Page Component
const VisaDetails = ({ country, date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(true);
  };

  // Generate breadcrumb based on static paths if possible
  const breadcrumb = router.asPath.split("/").filter((link) => link !== "");
  breadcrumb.unshift("home");

  return (
    <>
      <VisaHead
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${EVISA_URL}/${router.query?.country}`}
        metaTitle={`Apply Indian e-Visa Online For ${country.label} Citizens`}
        metaDescription={`Step by step process to apply for Indian Visa Application from ${country.value} and Indian e-Visa for ${country.label} citizens. Do not have to visit Indian Embassy.`}
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Toaster />

      <Navbar />
      <OverlayForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        date={date}
        selectedCountry={country}
      />

      <div
        className="overlay-form pb-10"
        style={{ backgroundColor: "#f0f1f5" }}
      >
        <div className="relative w-full overflow-hidden pb-2">
          <div className="inset-0 flex w-full before:absolute before:inset-0">
            <Image
              src="https://images.staybook.in/Staybook-Holidays/Banners/visa-details-landing.webp"
              alt="visa-country"
              title={`visa country banner image`}
              className="h-[15rem] w-full md:h-[20.2rem]"
              priority
              height={1920}
              width={1280}
            />
            <div className="wrapper absolute inset-x-0 flex w-full flex-col items-center justify-center gap-4 md:mt-8">
              <p
                className="mt-5 text-7xl md:text-9xl"
                style={{ fontFamily: "Noto Color Emoji" }}
              >
                {country.flag}
              </p>
              <h1 className="leading-0 text-2xl font-semibold text-white lg:text-4xl">
                {`Indian eVisa from ${country.value}`}
              </h1>
            </div>
          </div>
        </div>
        <div
          className="wrapper flex flex-col xl:flex-row"
          style={{ backgroundColor: "#f0f1f5" }}
        >
          <div className="mt-2 h-full lg:mx-0 xl:mr-5">
            <Evisa2 handleClick={handleClick} />
            <Details country={country} />
            <FaqSection country={country} />
          </div>
          {!isOpen && (
            <Form
              date={date}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              selectedCountry={country}
            />
          )}
        </div>
        <div className="wrapper flex items-center gap-1 overflow-auto">
          {breadcrumb.map((link, index) => (
            <div key={link} className="whitespace-nowrap font-medium">
              <Link
                href={
                  link === "home"
                    ? "/"
                    : `/${breadcrumb.slice(1, index + 1).join("/")}`
                }
                title={`breadcrumbs link`}
                className="text-blue-700 hover:text-primary"
              >
                {link.split("%20").join("-")}
              </Link>
              {index < breadcrumb.length - 1 && <span> &gt;</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Server-side Data Fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country } = context.params || {};

  const selectedCountry = countriesData.find(
    (c) => `indian-e-visa-eligibility-for-${c.link}-citizens` === country,
  );

  if (!selectedCountry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country: selectedCountry,
      date: context.query.date || null,
    },
  };
};

export default VisaDetails;
