import { hotelCityData } from "@/hotels";

//Getting error in generating xml because of special characters so here I'm removing those
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}

function generateUrlSet(cities) {
  return cities
    .map(
      (id) => `
    <url>
      <loc>https://staybook.in/${escapeXml(id)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`,
    )
    .join("");
}

export default function CityPagesSiteMap() {}

export async function getServerSideProps({ res }) {
  let urlSet = '';

  // Add additional URLs based on hotelCityData
  Object.keys(hotelCityData).forEach((cityKey) => {
    const obj = hotelCityData[cityKey];
    urlSet += generateUrlSet([cityKey]); // Generate the main city URL

    if (obj) {
      obj.forEach((val) => {
        // Check if the value includes "star" or "under" and generate the corresponding URL
        if (val.includes("star")) {
          urlSet += generateUrlSet([`${val}-${cityKey}`]);
        }
        if (val.includes("under")) {
          urlSet += generateUrlSet([`${cityKey}-${val}`]);
        }
      });
    }
  });

  // Generate the final sitemap with a single XML declaration
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlSet}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
