// import { useRouter } from "next/router";
// import { fetchHotelData } from "@/lib/firebase/hotelHandler";
// import dynamic from "next/dynamic";
// import { ReviewNavbar } from "@/components/navbar/ReviewNavbar";
// import CustomOverviewHead from "@/components/header/CustomOverviewHead";
// import Star from "@/components/visa/popularPackages/star";
// import HotelPageFooter from "@/components/footer/HotelPageFooter";
// import { capitalize } from "instantsearch.js/es/lib/utils";
// import { fetchStaticData } from "@/lib/helper/fetchStaticData";
// import Link from "next/link";

// const DynamicLocationCompSection = dynamic(
//   () => import("@/components/hotel/Location/LocationComp"),
//   { ssr: true },
// );

// const DynamicTabBarSection = dynamic(
//   () => import("@/components/hotel/review/TabBar"),
//   { ssr: true },
// );

// const Location = (props: any) => {
//   const router = useRouter();
//   const routename = router.pathname.split("/")[3];

//   // useEffect(() => {
//   //   const hotelLocationWorker = new Worker("/workers/hotelLocation-worker.js");

//   //   hotelLocationWorker.postMessage(hotelInfo);

//   //   hotelLocationWorker.onmessage = (event) => {
//   //     const data = event.data;

//   //     if (data.error) {
//   //       console.error("Error from worker:", data.error);
//   //     } else {
//   //       setHotelData(data);
//   //     }
//   //   };

//   //   hotelLocationWorker.onerror = (error) => {
//   //     console.error("Worker error:", error);
//   //   };

//   //   return () => {
//   //     hotelLocationWorker.terminate();
//   //   };
//   // }, []);

//   const links = [
//     { name: "Overview", hash: "rooms" },
//     { name: "Reviews", hash: "reviews" },
//     { name: "Amenities", hash: "amenities" },
//     { name: "FAQs", hash: "faqs" },
//     { name: "Location", hash: "location" },
//     { name: "Nearby Places", hash: "nearby-places" },
//     { name: "Photos", hash: "photos" },
//     { name: "Room Details", hash: "room-details" },
//   ];

//   return (
//     <>
//       <CustomOverviewHead
//         metaTitle={`Location of ${props.hotelInfoDetails?.hotel_Name} - ${props.hotelInfoDetails?.hotel_City} Hotel Booking`}
//         metaDescription={`Find the location of ${props.hotelInfoDetails?.hotel_Name} for navigation. Book a standard room and get a Free Room Upgrade (subject to availability). Limited-Time Offer! Book Now`}
//         metaImageUrl={props.hotelInfoDetails.hotel_Image_Url}
//         canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}/${routename}`}
//       />
//       <ReviewNavbar search_title={props.hotelInfoDetails?.hotel_Name || ""} />
//       <section className="h-auto min-h-screen w-full">
//         <div className="wrapper mx-auto mt-11 w-full border-red-500">
//           <div className="flex justify-between pl-4 pr-4 md:pl-0 md:pr-0">
//             <div className="flex flex-col">
//               <h1 className="font-bold md:text-xl">
//                 {`Location of ${props.hotelInfoDetails?.hotel_Name}`}
//               </h1>
//               <h3 className="mt-1">{props.hotelInfoDetails?.hotel_Landmark}</h3>
//               <h3 className="mt-3 flex">
//                 {<Star count={props.hotelInfoDetails.hotel_Star_Rating} />}
//               </h3>
//               <Link
//                 className={`mt-4 flex w-32 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-white md:w-40`}
//                 href={`/hotels/${router.query?.hotelInfo}`}
//                 target="__blank"
//               >
//                 See the Hotel
//               </Link>
//             </div>

//             <div className="flex gap-2">
//               <div className="h-20 w-24 items-center  justify-center rounded-md border-2 px-2 py-5 md:h-24 md:w-32">
//                 <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:text-base">
//                   {`${props.hotelInfoDetails.hotel_Ratings_Count} Ratings`}
//                 </p>
//                 <h2 className="justify-center overflow-hidden overflow-ellipsis whitespace-nowrap pl-4 text-sm font-bold md:text-xl">
//                   {`${props.hotelInfoDetails?.hotel_Google_Rating}/5`}
//                 </h2>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">{<DynamicTabBarSection links={links} />}</div>

//           <DynamicLocationCompSection
//             hotelData={props.hotelInfoDetails}
//             hotelName={props.hotelInfoDetails?.hotel_Name}
//           />
//         </div>
//       </section>
//       <HotelPageFooter
//         cityInfo={
//           typeof router.query?.citySlugName === "string"
//             ? capitalize(router.query.citySlugName.split("hotels-in-")[1])
//             : "new-delhi"
//         }
//         staticData={props.staticData}
//       />
//     </>
//   );
// };

// export default Location;

// export async function getServerSideProps(context: any) {
//   const { params, query, req, res } = await context;

//   const hotel_slug = params?.hotelInfo;

//   const hotelDetails = await fetchHotelData(hotel_slug);
//   const citySlug = hotel_slug.split("-");
//   let cityName = citySlug[citySlug.length - 1];
//   if(cityName ==='delhi'){
//     cityName = 'new-delhi';
//   }

//   const staticData = await fetchStaticData(cityName);


//   return {
//     props: {
//       hotelInfoDetails: hotelDetails,
//       staticData: staticData,
//     },
//   };
// }

const index = () => {
  return null;
};

export default index;

export const getServerSideProps = async (context) => {
  return {
    redirect: {
      destination: `/hotels/${context.params.hotelInfo}`,
      permanent: true,
    },
  };
};