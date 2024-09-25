import Head from "next/head";

type Props = {
  metaShowTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaImageUrl: string;
  canonicalUrl: string;
  hotelName: string;
  hotelPincode: number;
  hotelAddress: string;
  hotelCity: any;
  hotelState: any;
  hotelRegion: string;
  hotelStartingPrice: number;
  hotelFaqList: any[];
  hotelAverageRating: number;
  hotelTotalRating: number;
  hotelRatingsCount: any;
};

export default function CustomHotelRoomsHead(props: Props) {
  const hotelKeywords = `
  ${props.hotelName} ${props.hotelState} ${props.hotelCity},
  ${props.hotelName} ${props.hotelState} ${props.hotelCity} Deals,
  ${props.hotelName} ${props.hotelState} ${props.hotelCity} Price,
  ${props.hotelName} ${props.hotelState} Room Rates,
  ${props.hotelStartingPrice > 5000 ? "Luxury" : "Budget"} Stays at ${
    props.hotelCity
  },
  ${props.hotelName} ${props.hotelState} Reservation,
  ${props.hotelName} Contact Number,
  ${props.hotelName} Restaurant,
  ${props.hotelName} ${props.hotelCity} Address,
  ${props.hotelName} ${props.hotelState} Hotel Reviews,
  ${props.hotelName} ${props.hotelState} Maps,
  ${props.hotelName} ${props.hotelState} Booking,
  Book ${props.hotelName} ${props.hotelState} in ${props.hotelCity},
  ${props.hotelName} ${props.hotelState} Online Booking,
  ${props.hotelName} ${props.hotelState} Starting Price,
  ${props.hotelName} ${props.hotelState} Images,
  ${props.hotelName}  ${props.hotelCity} Hotels,
  ${props.hotelCity} Hotels Near ${props.hotelState} ,
  Independent Hotels in ${props.hotelCity} Near ${props.hotelState} ,
  ${props.hotelStartingPrice > 5000 ? "Luxury" : "Budget"} Stays at ${
    props.hotelName
  } ${props.hotelCity} ${props.hotelState},
  Luxury Stays at ${props.hotelName} ${props.hotelState}  ${props.hotelCity},
  Exclusive Deals at ${props.hotelName} ${props.hotelState}  ${props.hotelCity},
  Comfortable Rooms in ${props.hotelName} ${props.hotelState}  ${
    props.hotelCity
  }
`;

  return (
    <Head>
      <title>{props.metaShowTitle}</title>
      <meta name="description" content={props.metaDescription} />
      <meta name="p:domain_verify" content="6e37e759b2d516cf78ff4050eb06a2ff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content={props.metaKeywords ? props.metaKeywords : hotelKeywords}
      />
      <meta name="author" content="Staybook" />
      <meta name="publisher" content="Staybook" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {props.canonicalUrl && (
        <link rel="canonical" title="canonical" href={props.canonicalUrl} />
      )}

      {/* inmage link source */}
      <link rel="image_src" title="image_src" href={props.metaImageUrl} />
      {/* Opengraph tags */}
      <meta property="og:type" content="Hotel" className="SEO" />
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
      <meta name="twitter:site" content={props.canonicalUrl} className="SEO" />
      <meta
        name="twitter:description"
        content={props.metaDescription}
        className="SEO"
      />
      <meta name="twitter:url" content={props.canonicalUrl} className="SEO" />
      <meta name="twitter:image" content={props.metaImageUrl} className="SEO" />
      <meta name="twitter:creator" content={"Kausar Qadri"} className="SEO" />

      {/* localbusineesSchema */}
      <script
        id="localBusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "Hotel",
            "@context": "http://schema.org",
            url: `${props.canonicalUrl}`,
            image: `${props.metaImageUrl}`,
            description: `${props.metaDescription}`,
            name: `${props.hotelName}`,
            priceRange: `starting price ${props.hotelStartingPrice} + ${
              props.hotelStartingPrice > 7500 ? "18% GST" : "12% GST"
            }`,
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
              postalCode: `${props.hotelPincode}`,
              streetAddress: `${props.hotelAddress}`,
              addressRegion: `${props.hotelState}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              reviewCount: `${props.hotelTotalRating}`,
              bestRating: "5",
              ratingValue: `${props.hotelAverageRating}`,
            },
          }),
        }}
      />

      {/* faq schema */}
      <script
        id="Faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: props.hotelFaqList,
          }),
        }}
      />
    </Head>
  );
}
