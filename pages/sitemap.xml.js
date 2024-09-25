function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
		<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<sitemap>
				<loc>https://staybook.in/constant.xml</loc>
			</sitemap>
			
			<sitemap>
				<loc>https://staybook.in/cityPages.xml</loc>
			</sitemap>
			
			<sitemap>
				<loc>https://staybook.in/hotels.xml</loc>
			</sitemap>
			
			<sitemap>
				<loc>https://staybook.in/cityRegionPages.xml</loc>
			</sitemap>

			<sitemap>
				<loc>https://staybook.in/indianEVisa.xml</loc>
			</sitemap>
		</sitemapindex>
	`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
