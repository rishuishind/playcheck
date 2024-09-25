import Head from "next/head";

type Props = {
  metaTitle: string;
  metaDescription: string;
  metaImageUrl: string;
  canonicalUrl: string;
};

export default function BookingHead(props: Props) {
  return (
    <Head>
      <title>{props.metaTitle}</title>
      <meta name="description" content={props.metaDescription} />
      <meta name="p:domain_verify" content="6e37e759b2d516cf78ff4050eb06a2ff" />
      <meta name="keywords" content="luxury hotels, hotel deals, Staybook, hotel booking, best price hotels, modern amenities, hotel comparison" />
      <meta name="author" content="Staybook" />
      <meta name="publisher" content="Staybook" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" title="canonical" href={props.canonicalUrl} />

      {/* inmage link source */}
      <link rel="image_src" title="image_src" href={props.metaImageUrl} />

      {/* Opengraph tags */}
      <meta property="og:type" content="Website" className="SEO" />
      <meta property="og:title" content={props.metaTitle} className="SEO" />
      <meta property="og:description" content={props.metaDescription} className="SEO" />
      <meta property="og:image" content={props.metaImageUrl} className="SEO" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={props.canonicalUrl} className="SEO" />
      <meta property="og:site_name" content={props.canonicalUrl} className="SEO" />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={props.metaTitle} className="SEO" />
      <meta name="twitter:description" content={props.metaDescription} className="SEO" />
      <meta name="twitter:image" content={props.metaImageUrl} className="SEO" />
      <meta name="twitter:site" content={props.canonicalUrl} className="SEO" />
      <meta name="twitter:url" content={props.canonicalUrl} className="SEO" />
      <meta name="twitter:creator" content={"Kausar Qadri"} className="SEO" />
    </Head>
  );
}
