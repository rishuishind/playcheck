// import { ReviewNavbar } from "@/components/navbar/ReviewNavbar";
// import { fetchPhotoHotelData } from "@/lib/firebase/hotelHandler";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// import PhotoComp from "@/components/hotelsSlideView/PhotoComp";
// import CustomOverviewHead from "@/components/header/CustomOverviewHead";
// import Star from "@/components/visa/popularPackages/star";
// import HotelPageFooter from "@/components/footer/HotelPageFooter";
// import { capitalize } from "instantsearch.js/es/lib/utils";
// import { fetchStaticData } from "@/lib/helper/fetchStaticData";
// import Link from "next/link";

// const DynamicTabBarSection = dynamic(
//   () => import("@/components/hotel/review/TabBar"),
//   { ssr: false },
// );

// const Gallery = (props: any) => {
//   const [galleryView, setGalleryView] = useState<boolean>(false);
//   const [fullScreenImageGallery, setFullScreenImageGallery] =
//     useState<boolean>(false);

//   const handleGalleryView = () => {
//     setGalleryView((prev: any) => !prev);
//     setFullScreenImageGallery((prev: any) => !prev);
//   };

//   const router = useRouter();
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

//   // useEffect(() => {
//   //   const hotelReviewWorker = new Worker("/workers/hotelGallery-worker.js");

//   //   hotelReviewWorker.postMessage(hotelInfo);

//   //   hotelReviewWorker.onmessage = (event) => {
//   //     const data = event.data;

//   //     if (data.error) {
//   //       console.error("Error from worker:", data.error);
//   //     } else {
//   //       setHotelImage(data.imagesList);
//   //       setHotelRoomList(data.roomsList);
//   //     }
//   //   };

//   //   hotelReviewWorker.onerror = (error) => {
//   //     console.error("Worker error:", error);
//   //   };

//   //   return () => {
//   //     hotelReviewWorker.terminate();
//   //   };
//   // }, [hotelInfo]);

//   const isLoading = !props.hotelInfoDetails?.hotel_State_Slug;
//   const routename = router.pathname.split("/")[3];

//   return (
//     <>
//       <CustomOverviewHead
//         metaTitle={`Rooms of ${props.hotelInfoDetails?.hotel_Name} - ${props.hotelInfoDetails?.hotel_City} Hotel Booking`}
//         metaDescription={`Choose a wide range of rooms at ${props.hotelInfoDetails?.hotel_Name} with free breakfast, lunch & dinner. Risk-Free Booking, 100% Money Back Guarantee*`}
//         metaImageUrl={props.hotelInfoDetails.hotel_Image_Url}
//         canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}/${routename}`}
//       />
//       <ReviewNavbar search_title={props.hotelInfoDetails?.hotel_Name || ""} />
//       <section className="h-auto min-h-screen w-full">
//         <div className="wrapper mx-auto mt-11 w-full">
//           <div className="flex justify-between pl-4 pr-4 md:pl-0 md:pr-0">
//             <div className="flex flex-col">
//               <h1 className="font-bold md:text-xl">
//                 {`Gallery of ${props.hotelInfoDetails?.hotel_Name}`}
//               </h1>
//               <h3 className="mt-1">{props.hotelInfoDetails?.hotel_Landmark}</h3>
//               <h3 className="mt-3 flex">
//                 {<Star count={props.hotelInfoDetails.hotel_star} />}
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
//                 <p className="justify-center overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:text-base">
//                   {`${props.hotelInfoDetails.hotel_Ratings_Count} Ratings`}
//                 </p>
//                 <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap pl-4 text-sm font-bold md:text-xl">
//                   {`${props.hotelInfoDetails?.hotel_Google_Rating}/5`}
//                 </h2>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">{<DynamicTabBarSection links={links} />}</div>

//           <div>
//             <PhotoComp
//               imageList={props?.imagesList}
//               imageModel={fullScreenImageGallery}
//               roomList={props?.roomsList}
//               isHotelPage={true}
//               handleClose={handleGalleryView}
//               hotelName={props.hotelInfoDetails?.hotel_Name}
//             />
//           </div>
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

// export default Gallery;

// export async function getServerSideProps(context: any) {
//   const { params, query, req, res } = await context;

//   const hotel_slug = params?.hotelInfo;

//   const { hotelData, imagesList, roomsList } =
//     await fetchPhotoHotelData(hotel_slug);
//   const serializedHotelInfoDetails = JSON.stringify(hotelData);
//   const serializedHotelImageList = JSON.stringify(imagesList);
//   const serializedHotelRoomsList = JSON.stringify(roomsList);

//   const citySlug = hotel_slug.split("-");
//   let cityName = citySlug[citySlug.length - 1];
//   if (cityName === "delhi") {
//     cityName = "new-delhi";
//   }

//   const staticData = await fetchStaticData(cityName);

//   return {
//     props: {
//       hotelInfoDetails: JSON.parse(serializedHotelInfoDetails),
//       imagesList: JSON.parse(serializedHotelImageList),
//       roomsList: JSON.parse(serializedHotelRoomsList),
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