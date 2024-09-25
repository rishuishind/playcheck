function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://staybook.in/</loc>
        </url>

        <url>
          <loc>https://staybook.in/hotels</loc>
        </url>

        <url>
          <loc>https://staybook.in/indian-e-visa</loc>
        </url>  

        <url>
          <loc>https://staybook.in/login</loc>
        </url>

        <url>
          <loc>https://staybook.in/contactUs</loc>
        </url>

        <url>
          <loc>https://staybook.in/aboutus</loc>
        </url>

        <url>
          <loc>https://staybook.in/termscondition</loc>
        </url>

        <url>
          <loc>https://staybook.in/privacypolicy</loc>
        </url>

        <url>
          <loc>https://staybook.in/refundpolicy</loc>
        </url>

        <url>
          <loc>https://staybook.in/generalpolicy</loc>
        </url>
      </urlset>
    `;
}


 function ConstantSiteMap() {}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default ConstantSiteMap