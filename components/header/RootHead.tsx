import Head from "next/head";
import {
  root_page_title,
  root_page_description_content,
  root_page_keywords_content,
  root_page_property_title_content,
  root_page_property_description_content,
  root_page_twitter_card_title_content,
  root_page_twitter_card_description_content,
  root_page_faq_list,
} from "@/lib/helper/pageData";

export default function RootHead() {
  return (
    <Head>
      <title>{root_page_title}</title>
      <meta name="description" content={root_page_description_content} />
      <meta name="p:domain_verify" content="6e37e759b2d516cf78ff4050eb06a2ff" />
      <meta
        name="keywords"
        content={root_page_keywords_content}
      />
      <meta name="author" content="Staybook" />
      <meta name="publisher" content="Staybook" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" title="canonical" href="https://staybook.in/" />

      {/* inmage link source */}
      <link
        rel="image_src"
        title="image_src"
        href="https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/india-logo.webp"
      />

      {/* Opengraph tags */}
      <meta property="og:type" content="Website" className="SEO" />
      <meta
        property="og:title"
        content={root_page_property_title_content}
        className="SEO"
      />
      <meta
        property="og:description"
        content={root_page_property_description_content}
        className="SEO"
      />
      <meta
        property="og:image"
        content="https://images.staybook.in/Frame%201162.jpg"
        className="SEO"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="https://staybook.in/" className="SEO" />
      <meta
        property="og:site_name"
        content="https://staybook.in/"
        className="SEO"
      />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={root_page_twitter_card_title_content}
        className="SEO"
      />
      <meta
        name="twitter:description"
        content={root_page_twitter_card_description_content}
        className="SEO"
      />
      <meta
        name="twitter:image"
        content="https://images.staybook.in/Frame%201162.jpg"
        className="SEO"
      />
      <meta name="twitter:image:alt" content="Staybook Logo" />
      <meta
        name="twitter:site"
        content="https://staybook.in/"
        className="SEO"
      />
      <meta name="twitter:url" content="https://staybook.in/" className="SEO" />
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
            "url": "https://staybook.in/",
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
            "url": "https://staybook.in/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://staybook.in/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* satybook faq */}
      <script
        type="application/ld+json"
        id="main_webiste_faq"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": root_page_faq_list,
          }),
        }}
      />
    </Head>
  );
}
