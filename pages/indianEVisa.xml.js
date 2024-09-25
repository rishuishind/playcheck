import { countriesData } from "@/lib/helper/countriesData";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${countriesData
        .map(
          (country) => `
        <url>
          <loc>https://staybook.in/indian-e-visa/indian-e-visa-eligibility-for-${country.link}-citizens</loc>
			    <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>
  `;
}

export default function IndianeVisaSiteMap() {}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
