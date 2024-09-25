import {
  HOTEL_CITY_REGION_COLLECTION_NAME,
  HOTEL_COUNTRY_COLLECTION_NAME,
} from "@/lib/helper";
import { getFirestore, getDocs, collection } from "firebase/firestore";

async function generateSiteMap(cities) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${cities
     .map((region) => {
       let arr = region.split("-|-");
       return `
        <url>
          <loc>https://staybook.in/${arr[0]}/${arr[1]}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`;
     })
     .join("")}
  </urlset>`;

  return xml;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  let cities = [];
  const db = getFirestore();
  const docsSnap = await getDocs(
    collection(
      db,
      HOTEL_COUNTRY_COLLECTION_NAME,
      "hotels-in-IN",
      HOTEL_CITY_REGION_COLLECTION_NAME,
    ),
  );

  for (let city of docsSnap.docs) {
    cities.push(city.id);
  }

  const sitemap = await generateSiteMap(cities);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
