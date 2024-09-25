import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CONTACT_US_URL,
  FREQUENTLY_ASKED_QUESTIONS_URL,
  TERMS_AND_CONDITIONS_URL,
  PRIVACY_POLICY_URL,
  REFUND_POLICY_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TWITTER_URL,
  ABOUT_US_URL,
  CANCELLATION_POLICY_URL,
} from "@/lib/helper";

export default function Footer() {
  // const router = useRouter();

  // const hotelRegionUrlHandler = (hotelRegionSlugName: string) => {
  //   routerToHotelRegionPage(router, true, hotelRegionSlugName);
  // };

  // const regionData = [
  //   {
  //     name: "Hotels in Paharganj",
  //     hotelRegionSlugName: `hotels-in-paharganj`,
  //   },
  //   {
  //     name: "Hotels New Delhi Railway Station",
  //     hotelRegionSlugName: `hotels-in-paharganj`,
  //   },
  //   {
  //     name: "Hotels in South Delhi",
  //     hotelRegionSlugName: `hotels-in-south-delhi`,
  //   },
  //   {
  //     name: "Hotels in Manali",
  //     hotelRegionSlugName: `hotels-in-manali`,
  //   },
  //   {
  //     name: "Hotels in Mussoorie",
  //     hotelRegionSlugName: `hotels-in-munsoori`,
  //   },
  // ];

  const company = [
    {
      name: "FAQ",
      title: "faq link",
      link: FREQUENTLY_ASKED_QUESTIONS_URL,
    },
    {
      name: "About Us",
      title: "aboutus link",
      link: ABOUT_US_URL,
    },
    {
      name: "Contact Us",
      title: "contactus link",
      link: CONTACT_US_URL,
    },
  ];

  const support = [
    {
      name: "Privacy Policy",
      title: "privacy policy link",
      link: PRIVACY_POLICY_URL,
    },
    {
      name: "Refund Policy",
      title: "refund policy link",
      link: REFUND_POLICY_URL,
    },
    {
      name: "Cancellation Policy",
      title: "pancellation policy link",
      link: CANCELLATION_POLICY_URL,
    },
    {
      name: "Terms and Conditions",
      title: "terms and conditions link",
      link: TERMS_AND_CONDITIONS_URL,
    },
  ];

  const social = [
    {
      name: "Facebook",
      link: FACEBOOK_URL,
      src: "/footer/facebook.svg",
      alt: "facebook",
    },
    {
      name: "Instagram",
      link: INSTAGRAM_URL,
      src: "/footer/instagram.svg",
      alt: "instagram",
    },
    {
      name: "Twitter",
      link: TWITTER_URL,
      src: "/footer/twitter.svg",
      alt: "twitter",
    },
  ];

  return (
    <>
      <footer className="h-auto w-full bg-secondary text-white">
        <div className="wrapper relative h-full">
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              title="home page link"
              className="relative flex w-fit items-center gap-x-4 p-4 sm:col-span-2 lg:col-auto lg:flex-col lg:gap-y-4"
            >
              <Image
                src="/footer/brand_logo.svg"
                alt="Staybook Logo"
                title="Staybook Logo"
                width={90}
                height={90}
              />
              <span className="font-dream text-3xl font-semibold tracking-wider">
                Staybook
              </span>
            </Link>

            {/* regions list */}
            {/* <div className="p-4">
              <p className="text-xl font-medium my-4">Regions</p>
              {regionData.map((hotel: any, index: number) => (
                <div
                  key={index}
                  onClick={hotelRegionUrlHandler.bind(
                    null,
                    hotel.hotelRegionSlugName
                  )}
                  className="py-1"
                >
                  {hotel.name}
                </div>
              ))}
            </div> */}

            {/* about the company */}
            <div className="p-4">
              <p className="my-4 text-xl font-medium">Company</p>
              {company.map((item: any, index: number) => (
                <div key={index} className="py-1">
                  <Link href={item.link} title={item.title}>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* support links */}
            <div className="p-4">
              <p className="my-4 text-xl font-medium">Support</p>
              {support.map((item: any, index: number) => (
                <div key={index} className="py-1">
                  <Link href={item.link} title={item.title}>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* social links */}
            <div className="p-4">
              <p className="my-4 text-xl font-medium">Social</p>
              <div className="flex gap-x-2">
                {social.map((item: any, index: number) => (
                  <div key={index} className="py-1">
                    <Link href={item.link} target="_blank" title={`${item.alt} link`}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        title={`${item.alt} logo`}
                        width={36}
                        height={36}
                        priority
                        className={`object-cover ${index === 2 ? "p-2" : ""}`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-xs tracking-wide text-white/60">
            Copyright &copy; 2023 Staybook<sup>&trade;</sup>, All right
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
