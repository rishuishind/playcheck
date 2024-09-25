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
import { capitalizeWords } from "@/lib/helper/helpingFunctions";

type HotelItem = {
  slug: string;
  name: string;
};

type HotelPageFooterProps = {
  cityInfo: any; // Adjust this type according to the actual structure of cityInfo
  staticData: {
    allCities: { name: string; slug: string }[];
    hotelList: HotelItem[];
    trendingHotels: HotelItem[];
    regionsSlugs: HotelItem[];
  };
};

export default function HotelPageFooter({
  cityInfo,
  staticData,
}: HotelPageFooterProps) {
  // Inside HotelPageFooter component
  const {
    allCities = [], // Fallback to an empty array if undefined
    hotelList = [],
    trendingHotels = [],
    regionsSlugs = [],
  } = staticData || {}; // Fallback to an empty object if staticData is undefined

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
      title: "cancellation policy link",
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

          {/* about the company */}
          <div className="p-4">
            <p className="text-md my-4 font-semibold">Company</p>
            {company.map((item, index) => (
              <div key={index} className="py-1 text-sm">
                <Link href={item.link} title={item.title} target="_blank">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* support links */}
          <div className="p-4">
            <p className="text-md my-4 font-semibold">Support</p>
            {support.map((item, index) => (
              <div key={index} className="py-1 text-sm">
                <Link href={item.link} title={item.title} target="_blank">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* social links */}
          <div className="p-4">
            <p className="text-md my-4 font-semibold">Social</p>
            <div className="flex gap-x-2">
              {social.map((item, index) => (
                <div key={index} className="py-1">
                  <Link
                    href={item.link}
                    target="_blank"
                    title={`${item.alt} link`}
                  >
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
        <div className="my-4 h-[0.8px] w-full bg-white"></div>
        {allCities.length > 0 && (
          <div className="my-2 flex flex-wrap items-center gap-x-2">
            <p className="text-md  font-medium lg:block">
              Other Cities In India:
            </p>
            {(allCities || []).map(
              (city, index) =>
                city.name !== "Allamenities" && (
                  <div key={index} className="py-1 text-xs">
                    <Link
                      className="hover:text-blue-600"
                      href={`/${city.slug}`}
                      target="_blank"
                      title={city.name}
                    >
                      {city.name}
                    </Link>
                  </div>
                ),
            )}
          </div>
        )}
        {hotelList.length > 0 && (
          <div className="my-2 flex flex-wrap items-center gap-x-2">
            <p className="text-md  font-medium lg:block">
              Hotels In {cityInfo}:
            </p>
            {hotelList.map((hotel, index) => (
              <div key={index} className="py-1 text-xs">
                <Link
                  className="hover:text-blue-600"
                  href={`/hotels/${hotel.slug}`}
                  title={hotel.name}
                  target="_blank"
                >
                  {hotel.name}
                </Link>
              </div>
            ))}
          </div>
        )}
        {trendingHotels.length > 0 && (
          <div className="my-2 flex flex-wrap items-center gap-x-2">
            <p className="text-md  font-medium lg:block">
              Trending Hotels In {cityInfo}:
            </p>
            {trendingHotels.map((hotel, index) => (
              <div key={index} className="py-1 text-xs">
                <Link
                  className="hover:text-blue-600"
                  href={`/hotels/${hotel.slug}`}
                  title={hotel.name}
                  target="_blank"
                >
                  {hotel.name}
                </Link>
              </div>
            ))}
          </div>
        )}
        {regionsSlugs.length > 0 && (
          <div className="my-2 flex flex-wrap items-center gap-x-2">
            <p className="text-md  font-medium lg:block">
              Regions in {cityInfo}:
            </p>
            {regionsSlugs.map((region, index) => (
              <div key={index} className="py-1 text-xs">
                <Link
                  className="hover:text-blue-600"
                  href={`/${region.slug}`}
                  title={region.name}
                  target="_blank"
                >
                  {region.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
