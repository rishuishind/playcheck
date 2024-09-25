import { getFirestore, getDocs, collection } from "firebase/firestore";

function generateSiteMap(hotels) {
  return `<?xml version="1.0" encoding="UTF-8"?>

      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

		${hotels
      .map((id) => {
        return `
		        <url>
					<loc>https://staybook.in/hotels/${id}</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
			`;
      })
      .join("")}
	</urlset>
	`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  let hotels = [];
  const db = getFirestore();
  const docsSnap = await getDocs(collection(db, "HOTEL-DETAILS-INFORMATION"));

  for (let hotel of docsSnap.docs) {
    if (!hotel.id.includes("&") && hotel.data()?.hotel_Website_Listing) {
      hotels.push(hotel.id);
    }
  }

  const sitemap = generateSiteMap(hotels);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

/*
<url>
					<loc>https://staybook.in/hotels/${id}/amenities</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
					<loc>https://staybook.in/hotels/${id}/faqs</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
					<loc>https://staybook.in/hotels/${id}/location</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
					<loc>https://staybook.in/hotels/${id}/nearby-places</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
				 	<loc>https://staybook.in/hotels/${id}/photos</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
					<loc>https://staybook.in/hotels/${id}/reviews</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
				<url>
					<loc>https://staybook.in/hotels/${id}/room-details</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
*/
