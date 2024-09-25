// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { fetchReviewHotelData } from "@/lib/firebase/hotelHandler";
// import dynamic from "next/dynamic";
// import CustomOverviewHead from "@/components/header/CustomOverviewHead";
// import { ReviewNavbar } from "@/components/navbar/ReviewNavbar";
// import Star from "@/components/visa/popularPackages/star";
// import { fetchStaticData } from "@/lib/helper/fetchStaticData";
// import HotelPageFooter from "@/components/footer/HotelPageFooter";
// import { capitalize } from "instantsearch.js/es/lib/utils";
// import Link from "next/link";

// const DynamicReviewCompSection = dynamic(
//   () => import("@/components/hotel/review/ReviewComp"),
//   { ssr: true },
// );

// const DynamicTabBarSection = dynamic(
//   () => import("@/components/hotel/review/TabBar"),
//   { ssr: true },
// );

// const Review = (props: any) => {
//   const router = useRouter();
//   const [page, setPage] = useState<number>(Number(router.query?.page) || 1);
//   const [reviews, setReviews] = useState<any>(
//     props.hotelInfoDetails?.reviewData,
//   );
//   const [nearbyHotel, setNearbyHotel] = useState<any>([]);
//   const { hotelInfo } = router.query;
//   const [city, setCity] = useState(props.hotelInfoDetails?.hotel_City_Slug);
//   const routename = router.pathname.split("/")[3];
//   const handlePagination = (page: number) => {
//     setPage(page);
//     router.push(`/hotels/${router.query?.hotelInfo}/${routename}?page=${page}`);
//   };
//   useEffect(() => {
//     const hotelReviewWorker = new Worker("/workers/hotelReview.work.js");

//     const message = { hotelInfo, page: page || 1, city };

//     hotelReviewWorker.postMessage(message);

//     hotelReviewWorker.onmessage = (event) => {
//       const data = event.data;

//       if (data.error) {
//         console.error("Error from worker:", data.error);
//       } else {
//         setReviews(data.review);
//         setNearbyHotel(data.nearbyHotels);
//       }
//     };

//     hotelReviewWorker.onerror = (error) => {
//       console.error("Worker error:", error);
//     };

//     return () => {
//       hotelReviewWorker.terminate();
//     };
//   }, [page]);

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
//         metaTitle={`Reviews of ${props.hotelInfoDetails?.hotelData?.hotel_Name} - ${props.hotelInfoDetails?.hotelData?.hotel_City} Hotel Booking`}
//         metaDescription={`See all Reviews before booking of ${props.hotelInfoDetails?.hotelData?.hotel_Name}. 100% Satisfaction Guaranteed with best price. Book your room with Free Breakfast included & Early Check-In, Late Check-Out.`}
//         metaImageUrl={props.hotelInfoDetails.hotel_Image_Url}
//         canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}/${routename}`}
//       />
//       <ReviewNavbar
//         search_title={props.hotelInfoDetails?.hotelData?.hotel_Name || ""}
//       />
//       <section className="h-auto min-h-screen ">
//         <div className="wrapper mx-auto  mt-11 h-full w-full  border-red-500">
//           <div className="flex justify-between pl-4 pr-4 md:pl-0 md:pr-0">
//             <div className="flex flex-col">
//               <h1 className="font-bold md:text-xl">
//                 {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                   <Skeleton width={200} />
//                 ) : (
//                   `Reviews of ${props.hotelInfoDetails?.hotelData?.hotel_Name}`
//                 )}
//               </h1>
//               <h3 className="mt-1">
//                 {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                   <Skeleton width={150} />
//                 ) : (
//                   props.hotelInfoDetails?.hotelData?.hotelhotel_Landmark
//                 )}
//               </h3>
//               <h3 className="mt-3 flex">
//                 {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                   <Skeleton width={100} height={24} count={1} />
//                 ) : (
//                   <Star count={props.hotelInfoDetails.hotelData.hotel_star} />
//                 )}
//               </h3>
//               <Link
//                 className={`mt-4 flex w-32 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-white md:w-40`}
//                 href={`/hotels/${router.query?.hotelInfo}`}
//                 target="__blank"
//               >
//                 {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                   <Skeleton width={80} height={24} />
//                 ) : (
//                   "See the Hotel"
//                 )}
//               </Link>
//             </div>

//             <div className="flex gap-2">
//               <div className="h-20 w-24 items-center  justify-center rounded-md border-2 px-2 py-5 md:h-24 md:w-32">
//                 <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:text-base">
//                   {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                     <Skeleton width={80} />
//                   ) : (
//                     `${props.hotelInfoDetails.hotelData.hotel_Ratings_Count} Ratings`
//                   )}
//                 </p>
//                 <h2 className="justify-center  overflow-hidden overflow-ellipsis whitespace-nowrap pl-4 text-sm font-bold md:text-xl">
//                   {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//                     <Skeleton width={50} />
//                   ) : (
//                     `${props.hotelInfoDetails?.hotelData.hotel_Google_Rating}/5`
//                   )}
//                 </h2>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             {!props.hotelInfoDetails.hotelData.hotel_State_Slug ? (
//               <Skeleton width="100%" height={50} />
//             ) : (
//               <DynamicTabBarSection links={links} />
//             )}
//           </div>

//           <DynamicReviewCompSection
//             hotelReview={props.hotelInfoDetails.hotelData}
//             reviews={reviews}
//             page={page}
//             handlePagination={handlePagination}
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

// export default Review;

// export async function getServerSideProps(context: any) {
//   const { params, query, req, res } = await context;

//   const hotel_slug = params?.hotelInfo;

//   const hotelDetails = await fetchReviewHotelData(hotel_slug);

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