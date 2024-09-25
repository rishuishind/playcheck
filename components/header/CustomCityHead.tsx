import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  metaShowTitle: string;
  metaDescription: string;
  metaImageUrl: string;
  canonicalUrl: string;
  all_hotel_in_city: any;
  cityName: string;
};

export default function CustomHead(props: Props) {
  const router = useRouter();
  let title = "";
  let description = "";
  function createMetaTitle() {
    if (
      router.query?.citySlugName?.includes("star") &&
      typeof router.query.citySlugName === "string"
    ) {
      const starRating = router.query.citySlugName.split("-star-")[0];
      title = `${starRating} Star Hotels in ${props.cityName} - Book ${props.cityName} ${starRating} star Hotels starting @₹1200`;
    } else if (
      router.query?.citySlugName?.includes("under") &&
      typeof router.query.citySlugName === "string"
    ) {
      const price = router.query.citySlugName.split("-under-")[1];
      title = `Hotels in ${props.cityName} under ${price} - Book Now`;
    } else {
      title = `Best Budget Hotels in ${props.cityName} - Price Starts from ₹1200`;
    }
  }
  function createMetaDescription() {
    if (
      router.query?.citySlugName?.includes("star") &&
      typeof router.query.citySlugName === "string"
    ) {
      const starRating = router.query.citySlugName.split("-star-")[0];
      description = `Book your ${starRating} star hotels in ${props.cityName} starting from just ₹1200. Compare price, reviews, room photos, amenities and many more.`;
    } else if (
      router.query?.citySlugName?.includes("under") &&
      typeof router.query.citySlugName === "string"
    ) {
      const price = router.query.citySlugName.split("-under-")[1];
      description = `Find top hotels in ${props.cityName} under ₹${price} for a luxurious stay without overspending. Enjoy premium amenities, comfort, and convenience at an affordable price with hotels in ${props.cityName} under ₹${price}. Book now!`;
    } else {
      description = `Find the best budget hotels in ${props.cityName} starting at just ₹1200. Enjoy a comfortable stay at an affordable price in ${props.cityName}. Book your room today!`;
    }
  }
  createMetaDescription();
  createMetaTitle();
  const listItems = (props.all_hotel_in_city || []).map(
    (item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Hotel",
        name: item.hotel_Name,
        url: `https://staybook.in/hotels/${item.hotel_Slug_Name}`,
        image: item.meta_image_url,
        priceRange: `${item.hotel_Starting_Price} - ${item.hotel_Starting_Price * 2}`,
        starRating: item.hotel_Star_Rating,
        address: {
          "@type": "PostalAddress",
          // "streetAddress": "Road Name",
          addressLocality: item.hotel_City,
          addressRegion: item.hotel_State,
          postalCode: item.hotel_Pincode,
          countryName: "India",
        },
      },
    }),
  );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="p:domain_verify" content="6e37e759b2d516cf78ff4050eb06a2ff" />
      <meta
        name="keywords"
        content="luxury hotels, hotel deals, Staybook, hotel booking, best price hotels, modern amenities, hotel comparison"
      />
      <meta name="author" content="Staybook" />
      <meta name="publisher" content="Staybook" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" title="canonical" href={props.canonicalUrl} />

      {/* inmage link source */}
      {/* <link rel="image_src" title="image_src" href={props.metaImageUrl} /> */}

      {/* Opengraph tags */}
      <meta property="og:type" content="Website" className="SEO" />
      <meta property="og:title" content={props.metaShowTitle} className="SEO" />
      <meta
        property="og:description"
        content={props.metaDescription}
        className="SEO"
      />
      <meta property="og:image" content={props.metaImageUrl} className="SEO" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={props.canonicalUrl} className="SEO" />
      <meta
        property="og:site_name"
        content={props.canonicalUrl}
        className="SEO"
      />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={props.metaShowTitle}
        className="SEO"
      />
      <meta
        name="twitter:description"
        content={props.metaDescription}
        className="SEO"
      />
      <meta name="twitter:image" content={props.metaImageUrl} className="SEO" />
      <meta name="twitter:image:alt" content={props.cityName} />
      <meta name="twitter:site" content={props.canonicalUrl} className="SEO" />
      <meta name="twitter:url" content={props.canonicalUrl} className="SEO" />
      <meta name="twitter:creator" content={"Kausar Qadri"} className="SEO" />

      <script
        id="listItem_schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            numberOfItems: listItems.length,
            name: "Staybook Hotels List",
            description: `List of hotels in ${props.cityName}`,
            itemListElement: listItems,
          }),
        }}
      />
    </Head>
  );
}
