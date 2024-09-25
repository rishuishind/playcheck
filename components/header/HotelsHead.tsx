import Head from "next/head";

export default function HotelsHead() {
  return (
    <Head>
      <title>Book The Luxury Hotels in The Best Price With Staybook</title>
      <meta name="description" content="Find the best hotel deals on Staybook. Compare prices from 100+ sites, book confidently, and enjoy modern amenities. get exclusive discount on hotel bookings" />
      <meta name="keywords" content="luxury hotels, hotel deals, Staybook, hotel booking, best price hotels, modern amenities, hotel comparison" />
      <meta name="author" content="Staybook" />
      <meta name="publisher" content="Staybook" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" title="canonical" href="https://staybook.in/hotels" />

      {/* inmage link source */}
      <link rel="image_src" title="image_src" href="https://images.staybook.in/Frame%201162.jpg" />

      {/* Opengraph tags */}
      <meta property="og:type" content="Website" className="SEO" />
      <meta property="og:title" content="Book The Luxury Hotels in The Best Price With Staybook" className="SEO" />
      <meta property="og:description" content="Find the best hotel deals on Staybook. Compare prices from 100+ sites, book confidently, and enjoy modern amenities. get exclusive discount on hotel bookings" className="SEO" />
      <meta property="og:image" content="https://images.staybook.in/Frame%201162.jpg" className="SEO" />
      <meta property="og:url" content="https://staybook.in/hotels" className="SEO" />
      <meta property="og:site_name" content="https://staybook.in/hotels" className="SEO" />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Book The Luxury Hotels in The Best Price With Staybook" className="SEO" />
      <meta name="twitter:description" content="Find the best hotel deals on Staybook. Compare prices from 100+ sites, book confidently, and enjoy modern amenities. get exclusive discount on hotel bookings" className="SEO" />
      <meta name="twitter:image" content="https://images.staybook.in/Frame%201162.jpg" className="SEO" />
      <meta name="twitter:site" content="https://staybook.in/hotels" className="SEO" />
      <meta name="twitter:url" content="https://staybook.in/hotels" className="SEO" />
      <meta name="twitter:creator" content={"Kausar Qadri"} className="SEO" />

      {/* organisation schema */}
      <script
        type="application/ld+json"
        id="organisation_Schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "Staybook",
            "url": "https://staybook.in/hotels",
            "logo": "https://images.staybook.in/Frame%201162.jpg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "8373929299",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "en",
            },
            "sameAs": "https://www.instagram.com/staybook_1/",
          }),
        }}
      />

      {/* website schema */}
      <script
        type="application/ld+json"
        id="website_Schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "Staybook",
            "url": "https://staybook.in/hotels",
            "potentialAction": {
              "@type": "SearchAction",
              "target":
                "https://staybook.in/hotels/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Head>
  );
}
