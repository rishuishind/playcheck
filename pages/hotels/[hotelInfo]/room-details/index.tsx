import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { fetchRoomHotelData } from "@/lib/firebase/hotelHandler";
import dynamic from "next/dynamic";
import { ReviewNavbar } from "@/components/navbar/ReviewNavbar";
import CustomOverviewHead from "@/components/header/CustomOverviewHead";
import Star from "@/components/visa/popularPackages/star";

const DynamicRoomInfoSection = dynamic(
  () => import("@/components/hotel/hotelInfo/RoomInfo"),
  { ssr: false },
);

const DynamicTabBarSection = dynamic(
  () => import("@/components/hotel/review/TabBar"),
  { ssr: false },
);

const RoomDetail = (props: any) => {
  const router = useRouter();
  const { hotelInfo } = router.query;
  const [hotelRoomList, setHotelRoomList] = useState<any>([]);
  const routename = router.pathname.split("/")[3];

  // useEffect(() => {
  //   const hotelLocationWorker = new Worker("/workers/hotelRoom-worker.js");

  //   hotelLocationWorker.postMessage(hotelInfo);

  //   hotelLocationWorker.onmessage = (event) => {
  //     const data = event.data;

  //     if (data.error) {
  //       console.error("Error from worker:", data.error);
  //     } else {
  //       setHotelRoomList(data);
  //     }
  //   };

  //   hotelLocationWorker.onerror = (error) => {
  //     console.error("Worker error:", error);
  //   };

  //   return () => {
  //     hotelLocationWorker.terminate();
  //   };
  // }, []);

  const links = [
    { name: "Overview", hash: "rooms" },
    { name: "Reviews", hash: "reviews" },
    { name: "Amenities", hash: "amenities" },
    { name: "FAQs", hash: "faqs" },
    { name: "Location", hash: "location" },
    { name: "Nearby Places", hash: "nearby-places" },
    { name: "Photos", hash: "photos" },
    { name: "Room Details", hash: "room-details" },
  ];

  return (
    <>
      <CustomOverviewHead
        metaTitle={`Rooms of ${props.hotelInfoDetails?.hotel_Name} - ${props.hotelInfoDetails?.hotel_City} Hotel Booking`}
        metaDescription={`Choose a wide range of rooms at ${props.hotelInfoDetails?.hotel_Name} with free breakfast, lunch & dinner. Risk-Free Booking, 100% Money Back Guarantee*`}
        metaImageUrl={props.hotelInfoDetails.hotel_Image_Url}
        canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}/${routename}`}
      />
      <ReviewNavbar search_title={props.hotelInfoDetails?.hotel_Name || ""} />
      <section className="h-auto min-h-screen w-full">
        <div className="wrapper mx-auto mt-11 w-full border-red-500">
          <div className="flex justify-between pl-4 pr-4 md:pl-0 md:pr-0">
            <div className="flex flex-col">
              <h1 className="font-bold md:text-xl">
                {!props.hotelInfoDetails.hotel_State_Slug ? (
                  <Skeleton width={200} />
                ) : (
                  `Room Details of ${props.hotelInfoDetails?.hotel_Name}`
                )}
              </h1>
              <h3 className="mt-1">
                {!props.hotelInfoDetails.hotel_State_Slug ? (
                  <Skeleton width={150} />
                ) : (
                  props.hotelInfoDetails?.hotel_Landmark
                )}
              </h3>
              <h3 className="mt-3 flex">
                {!props.hotelInfoDetails.hotel_State_Slug ? (
                  <Skeleton width={100} height={24} count={1} />
                ) : (
                  <Star count={props.hotelInfoDetails.hotel_star} />
                )}
              </h3>
              <button
                className={`mt-4 flex w-32 items-center  justify-center whitespace-nowrap rounded-lg px-4 py-2 font-medium text-white md:w-40 ${!props.hotelInfoDetails.hotel_State_Slug ? "bg-gray-300" : "bg-primary"}`}
                disabled={!props.hotelInfoDetails.hotel_State_Slug}
                onClick={() =>
                  router.push(`/hotels/${router.query?.hotelInfo}`)
                }
              >
                {!props.hotelInfoDetails.hotel_State_Slug ? (
                  <Skeleton width={80} height={24} />
                ) : (
                  "See the Hotel"
                )}
              </button>
            </div>

            <div className="flex gap-2">
              <div className="h-20 w-24 items-center  justify-center rounded-md border-2 px-2 py-5 md:h-24 md:w-32">
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:text-base">
                  {!props.hotelInfoDetails.hotel_State_Slug ? (
                    <Skeleton width={80} />
                  ) : (
                    `${props.hotelInfoDetails.hotel_Ratings_Count} Ratings`
                  )}
                </p>
                <h2 className="justify-center overflow-hidden overflow-ellipsis whitespace-nowrap pl-4 text-sm font-bold md:text-xl">
                  {!props.hotelInfoDetails.hotel_State_Slug ? (
                    <Skeleton width={50} />
                  ) : (
                    `${props.hotelInfoDetails?.hotel_Google_Rating}/5`
                  )}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {!props.hotelInfoDetails.hotel_State_Slug ? (
              <Skeleton width="100%" height={50} />
            ) : (
              <DynamicTabBarSection links={links} />
            )}
          </div>
          <DynamicRoomInfoSection
            roomsList={props?.roomsList}
            hotelName={props.hotelInfoDetails?.hotel_Name}
          />
        </div>
      </section>
    </>
  );
};

export default RoomDetail;

export async function getServerSideProps(context: any) {
  const { params } = await context;

  const hotel_slug = params?.hotelInfo;

  const { hotelData, roomsList } = await fetchRoomHotelData(hotel_slug);
  const serializedHotelInfoDetails = JSON.stringify(hotelData);
  const serializedHotelRoomsList = JSON.stringify(roomsList);


  return {
    props: {
      hotelInfoDetails: JSON.parse(serializedHotelInfoDetails),
      roomsList: JSON.parse(serializedHotelRoomsList),
    },
  };
}