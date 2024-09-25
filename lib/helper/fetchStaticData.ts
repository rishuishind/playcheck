import { hotelPaths } from "@/data"; // Adjust the import according to your project structure
import { capitalizeWords } from "@/lib/helper/helpingFunctions";
import {
  ABOUT_US_URL,
  CANCELLATION_POLICY_URL,
  CONTACT_US_URL,
  FACEBOOK_URL,
  FREQUENTLY_ASKED_QUESTIONS_URL,
  INSTAGRAM_URL,
  PRIVACY_POLICY_URL,
  REFUND_POLICY_URL,
  TERMS_AND_CONDITIONS_URL,
  TWITTER_URL,
} from ".";

// Fetch or define static data for the footer
export async function fetchStaticData(city) {
  // Process data similar to the Footer component logic

  // Define or fetch any additional static data needed
  const staticData = {
    company: [
      { name: "FAQ", title: "faq link", link: FREQUENTLY_ASKED_QUESTIONS_URL },
      { name: "About Us", title: "aboutus link", link: ABOUT_US_URL },
      { name: "Contact Us", title: "contactus link", link: CONTACT_US_URL },
    ],
    support: [
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
    ],
    social: [
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
    ],
  };

  // Extract hotel slugs for cities
  const uniqueCitiesSet = new Set(
    Object.keys(hotelPaths).map((citySlug) => {
      // If citySlug is equals to allAmenities, then we will not add it to the list of cities and we skip it
      const cityName = citySlug.split("hotels-in-").pop()?.split("-").join(" ");
      return { cityName, citySlug };
    }),
  );

  const allCities = Array.from(uniqueCitiesSet).map(
    ({ cityName, citySlug }) => ({
      name: capitalizeWords(cityName?.toLowerCase() || ""),
      slug: citySlug,
    }),
  );

  // Process hotels data

  const cityKey = Object.keys(hotelPaths).find((key) => key.includes(city));
  const hotelListSlug = hotelPaths[`hotels-in-${city}`]?.hotels || [];
  const hotelList = hotelListSlug.map((hotel) => ({
    slug: hotel.slug,
    name: capitalizeWords(hotel.slug.split("-").join(" ")),
    imageUrl: hotel.imageUrl,
  }));

  const trendingList = hotelPaths[`hotels-in-${city}`]?.trendingHotels || [];
  const trendingHotels = trendingList.map((hotel) => ({
    slug: hotel.slug,
    name: capitalizeWords(hotel.slug.split("-").join(" ")),
  }));

  const regionsList = hotelPaths[`hotels-in-${city}`]?.regions || [];
  const regionsSlugs = regionsList.map((hotel: string) => ({
    slug: hotel,
    name: capitalizeWords(hotel.split("/").pop()?.split("-").join(" ") || ""),
  }));

  const allAmenities = Object.values(hotelPaths["allAmenities"] || {});

  return {
    allCities,
    hotelList,
    trendingHotels,
    regionsSlugs,
    allAmenities,
    ...staticData,
  };
}
