import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  convertChildArrayOfObjectsIntoArrayOfNumbers,
  convertChildUrlQueryIntoArrayOfObjects,
  hotelPageQueryHandler,
} from "@/lib/helper";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import {
  getHotelInformationDetails,
  getNearByHotels,
} from "@/lib/firebase/hotelHandler";
import { FetchHotelDetailsQueryParams } from "@/lib/classModels/queryParams/FetchHotelDetailsQueryParams";
import { useSelector, useDispatch } from "react-redux";
const generateUniqueId = require("generate-unique-id");
import {
  addFirstRoom,
  addMultipleRooms,
  resetBookingInfo,
  selectCheckInDate,
  selectCheckOutDate,
  selectHotelSlugName,
  selectNumberOfNights,
  selectRoomMapping,
  selectRoomPlanMapping,
  selectRoomsList,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
  selectTotalChildrenCount,
  selectTotalDiscount,
  selectTotalGuestsCount,
  selectTotalPayingAmount,
  selectTotalPrice,
  selectTotalRoomCost,
  selectTotalRoomsCount,
  selectTotalTax,
  updateBookingDateRange,
  updateHotelDetails,
  updateBookingCard,
  selectBookingCardLoading,
} from "@/lib/redux/bookingSlice";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import { Toaster } from "sonner";
import FullScreenImageGallery from "@/components/hotelsSlideView/FullScreenImageGallery";
import {
  createHotelBookingInfo,
  updateHotelInfo,
} from "@/lib/redux/bookingConfirmationSlice";
import dynamic from "next/dynamic";
import StickyBarSection from "@/components/hotel/hotelInfo/StickyBar";
import HotelGallerySection from "@/components/hotel/hotelInfo/rooms/hotelGallerySection";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToHotelBookingPage } from "@/lib/handlers/pageHandler";
import BookingErrorsModel from "@/components/hotel/BookingCard/BookingErrorsModel";
import HotelNavbar from "@/components/navbar/HotelNavbar";
import CustomHotelHead from "@/components/header/CustomHotelHead";
import {
  AmenitiesSkeleton,
  FaqSkeleton,
  NearbyPlacesSkeleton,
  ReviewsAndRatingSkeleton,
} from "@/components/skeleton/HotelSkeletons";
import { RoomPlanCard } from "@/components/skeleton/HotelSkeletons";
import HotelDetailedData from "@/components/hotel/hotelInfo/HotelDetailedData";
const shortid = require("shortid");

const DynamicRoomsSection = dynamic(
  () => import("@/components/hotel/hotelInfo/rooms/RoomsSection"),
  { ssr: false },
);
const DynamicReviewsSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Reviews"),
  { ssr: false },
);
const DynamicAmenitiesSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Amenities"),
  { ssr: false },
);
const DynamicLocationSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Location"),
  { ssr: false },
);
const DynamicNearbyPlacesSection = dynamic(
  () => import("@/components/hotel/hotelInfo/NearbyPlaces"),
  { ssr: false },
);

const DynamicHotelInfoSection = dynamic(
  () => import("@/components/hotel/hotelInfo/About"),
  { ssr: false },
);
const DynamicFaqSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Faq"),
  { ssr: false },
);
const DynamicPoliciesSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Policies"),
  { ssr: false },
);
const DynamicBottomPriceCard = dynamic(
  () => import("@/components/widgets/BottomPriceCard"),
  { ssr: false },
);

type Props = {
  hotelInfoDetails: HotelInformationDetails;
  roomDetails: HotelRoomInformation;
  planDetails: HotelRoomPlanInformation;
  nearByHotel: any;
  planStatus: boolean;
  checkin: any;
  checkout: any;
  num_nights: any;
  num_guests: any;
  num_adults: any;
  num_rooms: any;
  num_children: any;
  child_age_list: any[];
};

export default function HotelInformation(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  // redux store values
  const totalRoomCount = Math.floor(useSelector(selectTotalRoomsCount));
  const roomsList = useSelector(selectRoomsList);
  const hotelSlugName = useSelector(selectHotelSlugName);
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchedNumGuests = useSelector(selectSearchedGuestsCount);
  const searchedNumAdults = useSelector(selectSearchedAdultsCount);
  const searchedRooms = useSelector(selectSearchedRoomsCount);
  const searchedChildren = useSelector(selectSearchedChildrenCount);
  const numGuests = useSelector(selectTotalGuestsCount);
  const numChildren = useSelector(selectTotalChildrenCount);
  const numNights = useSelector(selectNumberOfNights);
  const totalRoomCost = useSelector(selectTotalRoomCost);
  const totalPrice = useSelector(selectTotalPrice);
  const totalTax = useSelector(selectTotalTax);
  const totalDiscount = useSelector(selectTotalDiscount);
  const roomMap = useSelector(selectRoomMapping);
  const roomPlanMap = useSelector(selectRoomPlanMapping);
  const totalPayingAmount = useSelector(selectTotalPayingAmount);
  const [hotelAuthStatus, setHotelAuthStatus] = useState<boolean>(true);
  const [bookingErrors, setBookingErrors] = useState<string>("");
  const [errorModel, setErrorModel] = useState<boolean>(false);
  const [clientRoomFetch, setClientRoomFetch] = useState<boolean>(true);

  // extract child_age from the router query
  const [child_age, setChild_age] = useState<any[]>(
    router.query?.child_age != ""
      ? convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[])
      : props.child_age_list,
  );

  function refreshPage() {
    window.location.reload();
  }

  if (!props.hotelInfoDetails || !props.hotelInfoDetails.hotel_Name) {
    refreshPage();
  }

  // useEffect(() => {
  //   removeBookingFromCache();
  // }, []);

  useEffect(() => {
    dispatch(
      updateHotelDetails({
        hotelSlugName: props.hotelInfoDetails.hotel_Slug_Name,
        hotelId: props.hotelInfoDetails.hotel_Firebase_Id,
        hotelName: props.hotelInfoDetails.hotel_Name,
        hotelAddress: props.hotelInfoDetails.hotel_Address,
        hotelStarRating: props.hotelInfoDetails.hotel_Star_Rating,
      }),
    );

    dispatch(
      updateHotelInfo({
        hotelInfo: props.hotelInfoDetails,
      }),
    );
  }, [router.query.hotelInfo]);

  useEffect(() => {
    const checkinDateUTC = new Date(props.checkin); // This will keep it in UTC
    const checkoutDateUTC = new Date(props.checkout); // This will keep it in UTC
    dispatch(
      updateBookingDateRange({
        checkInDate: checkinDateUTC,
        checkOutDate: checkoutDateUTC,
        searchedRoomCount: Number(props.num_rooms),
        searchAdultCount: Number(props.num_adults),
        searchedChildrenCount: Number(props.num_children),
        searchGuestCount: Number(props.num_guests),
        searchedChildAgeList: props.child_age_list,
      }),
    );

    if (
      totalRoomCount === 0 &&
      props.planStatus &&
      router.query.roomId &&
      router.query.planId
    ) {
      dispatch(
        addFirstRoom({
          roomInfo: props.roomDetails,
          planInfo: props.planDetails,
          roomCount: props.num_rooms,
          guestCount: Number(props.num_guests),
          adultCount: Number(props.num_adults),
          childCount: Number(props.num_children),
          childAgeList: props.child_age_list,
        }),
      );

      setClientRoomFetch(false);

      dispatch(
        updateBookingCard({
          bookingCardLoading: false,
        }),
      );
    }

    setChild_age(
      convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[]),
    );
  }, [
    router.query.hotelInfo,
    router.query.checkin,
    router.query.checkout,
    router.query.num_guests,
    router.query.num_adults,
    router.query.num_children,
    router.query.num_rooms,
    router.query,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadRooms, setLoadRooms] = useState<boolean>(true);

  const [availableImages, setAvailableImages] = useState<any[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<any[]>([]);
  const [availableNearbyPlaces, setAvailableNearbyPlaces] = useState<any[]>([]);
  const [availableFaqs, setAvailableFaqs] = useState<any[]>([]);
  const [availableReviews, setAvailableReviews] = useState<any[]>([]);
  const [availableRoomsList, setAvailableRoomsList] = useState<
    HotelRoomInformation[]
  >([]);

  const [mainImageLoaded, setMainImageLoaded] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(false);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);
  const [showAllPolicy, setShowAllPolicy] = useState<boolean>(false);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [showAllInfo, setShowAllInfo] = useState<boolean>(false);

  const [checkin, setCheckin] = useState<Date>(checkInDate);
  const [checkout, setCheckout] = useState<Date>(checkOutDate);
  const [num_rooms, setNum_rooms] = useState<number>(searchedRooms);
  const [num_guests, setNum_guests] = useState<number>(searchedNumGuests);
  const [num_adults, setNum_adults] = useState<number>(searchedNumAdults);
  const [num_children, setNum_children] = useState<number>(searchedChildren);

  // handle scroll navbar and bottom bar reveal
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // state and function to show fullScreen gallery
  const [galleryView, setGalleryView] = useState<boolean>(false);
  const [fullScreenImageGallery, setFullScreenImageGallery] =
    useState<boolean>(false);
  const handleGalleryView = () => {
    setGalleryView((prev: any) => !prev);
    setFullScreenImageGallery((prev: any) => !prev);
  };

  // nav hash links array
  const links = [
    {
      name: "Room Plans",
      hash: "room-plans",
    },
    {
      name: "Reviews",
      hash: "reviews",
    },
    {
      name: "Amenities",
      hash: "amenities",
    },
    {
      name: "Location",
      hash: "location",
    },
    {
      name: "Nearby Places",
      hash: "nearby-places",
    },
    {
      name: "Hotel Info",
      hash: "hotel-info",
    },
    {
      name: "FAQs",
      hash: "faqs",
    },
    {
      name: "Hotel Policies",
      hash: "hotel-policies",
    },
  ];

  // call the new instace of the worker to update other things
  useEffect(() => {
    // initialize new worker instance
    const hotelRoomWorker = new Worker("/workers/hotelInfo.worker.js");

    // send the data to the worker
    const dataObj = {
      hotelSlugName: router.query?.hotelInfo + "",
      checkin: props.checkin,
      checkout: props.checkout,
    };
    hotelRoomWorker.postMessage(dataObj);

    // handle message from the worker
    hotelRoomWorker.onmessage = (event) => {
      const data = event.data;

      if (data.error) {
        console.error("Error from worker:", data.error);
      } else {
        setAvailableImages(data.imagesList);
        setAvailableAmenities(data.amenitiesList);
        setAvailableNearbyPlaces(data.nearbyPlaces);
        setAvailableFaqs(data.schemaList);
        setAvailableReviews(data.reviewsList);
      }

      // set the laoding to false after the data is loaded
      // setLoadRooms(false);
      setIsLoading(false);
    };

    // handle error case
    hotelRoomWorker.onerror = (error) => {
      console.error("Worker error:", error);
      setIsLoading(false);
      // setLoadRooms(false);
    };

    // cleanup function
    return () => {
      hotelRoomWorker.terminate();
    };
  }, [router.query.hotelInfo]);

  // call the new instace of the worker to update booking card
  useEffect(() => {
    if (!props.planStatus) {
      setClientRoomFetch(true);
      dispatch(
        updateBookingCard({
          bookingCardLoading: true,
        }),
      );
    }
    // initialize new worker instance
    const hotelRoomWorker = new Worker(
      "/workers/hotelRoomsDatePricing.worker.js",
    );

    // send the data to the worker
    const dataObj = {
      hotelSlugName: router.query?.hotelInfo + "",
      checkin: props.checkin,
      checkout: props.checkout,
    };
    hotelRoomWorker.postMessage(dataObj);

    // handle message from the worker
    hotelRoomWorker.onmessage = (event) => {
      const data = event.data;

      if (data.error) {
        console.error("Error from worker:", data.error);
        if (!props.planStatus) {
          dispatch(
            updateBookingCard({
              bookingCardLoading: false,
            }),
          );
          setClientRoomFetch(false);
        }
      } else {
        setAvailableRoomsList(data.roomsList);

        if (
          (String(router.query.roomId) !== "" ||
            String(router.query.planId) != "") &&
          totalRoomCount === 0 &&
          !props.planStatus &&
          data.roomsList.length > 0 &&
          data.roomsList[0].hotelRoom_Plans_List.length > 0
        ) {
          dispatch(
            addMultipleRooms({
              roomInfoList: data.roomsList,
              roomCount: +props.num_rooms,
              guestCount: Number(props.num_guests),
              adultCount: Number(props.num_adults),
              childCount: Number(props.num_children),
            }),
          );
        } else if (
          data.roomsList.length === 0 ||
          data.roomsList[0].hotelRoom_Plans_List.length === 0
        ) {
          dispatch(resetBookingInfo());
        }

        if (!props.planStatus) {
          dispatch(
            updateBookingCard({
              bookingCardLoading: false,
            }),
          );
          setClientRoomFetch(false);
        }
      }

      // set the laoding to false after the data is loaded
      setLoadRooms(false);
      // setIsLoading(false);
    };

    // handle error case
    hotelRoomWorker.onerror = (error) => {
      console.error("Worker error:", error);
      if (!props.planStatus) {
        dispatch(
          updateBookingCard({
            bookingCardLoading: false,
          }),
        );
        setClientRoomFetch(false);
      }
      setLoadRooms(false);
    };

    // cleanup function
    return () => {
      hotelRoomWorker.terminate();
    };
  }, [router.query.hotelInfo, router.query.checkin, router.query.checkout]);

  useEffect(() => {
    if (!props.planStatus) {
      if (
        (String(router.query.roomId) !== "" ||
          String(router.query.planId) != "") &&
        totalRoomCount === 0 &&
        !props.planStatus &&
        availableRoomsList.length > 0 &&
        availableRoomsList[0].hotelRoom_Plans_List.length > 0
      ) {
        dispatch(
          addMultipleRooms({
            roomInfoList: availableRoomsList,
            roomCount: +props.num_rooms,
            guestCount: Number(props.num_guests),
            adultCount: Number(props.num_adults),
            childCount: Number(props.num_children),
          }),
        );
      } else if (
        availableRoomsList.length === 0 ||
        availableRoomsList[0].hotelRoom_Plans_List.length === 0
      ) {
        dispatch(resetBookingInfo());
      }
    }
  }, [
    router.query.num_rooms,
    router.query.num_guests,
    router.query.num_adults,
    router.query.num_children,
  ]);

  const resetSearchTextHandler = () => {
    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_rooms(searchedRooms);
    setNum_adults(searchedNumAdults);
    setNum_children(searchedChildren);
    setNum_guests(searchedNumGuests);
  };

  const formHanlder = async () => {
    resetSearchTextHandler();

    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_guests(searchedNumGuests);
    setNum_adults(searchedNumAdults);
    setNum_rooms(searchedRooms);
    setNum_children(searchedChildren);

    let params = new PageRouterQueryParams(router);
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = numNights;
    params.num_rooms = searchedRooms;
    params.num_adults = searchedNumAdults;
    params.num_children = searchedChildren;
    params.num_guests = searchedNumGuests;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

    dispatch(
      createHotelBookingInfo({
        roomsList: roomsList,
        userName: "",
        userId: "",
        userImageUrl: "",
        userEmailId: "",
        hotelSlugName: hotelSlugName,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numGuests: numGuests,
        numChildren: numChildren,
        numNights: numNights,
        totalRoomCount: totalRoomCount,
        totalRoomCost: totalRoomCost,
        totalTax: totalTax,
        totalPrice: totalPrice,
        totalDiscount: totalDiscount,
        totalPayingAmount: totalPayingAmount,
        roomMap: roomMap,
        roomPlanMap: roomPlanMap,
        bookingId: generateUniqueId(),
        receiptId: shortid.generate(),
        formattedCheckinTime: checkInDate.toISOString(),
        formattedCheckoutTime: checkOutDate.toISOString(),
      }),
    );

    // params.new_tab = true;
    routerToHotelBookingPage(params);
  };

  const handleBookNowButtonClick = async () => {
    if (!hotelAuthStatus) {
      alert("No Reservations Available");
      return;
    }
    if (roomsList.length <= 0) {
      const error = `You have searched for ${searchedRooms} rooms ${numGuests < searchedNumAdults && `${searchedNumAdults + searchedChildren} Adults.`} But You have only selected rooms that fits ${numGuests + numChildren} Adults.`;

      if (error.length > 0) {
        setBookingErrors(error);
        setErrorModel(true);
        // setShowBookingErrorsModel((prev: boolean) => !prev);
      }
      return;
    }

    // else call booking handler
    formHanlder();
  };

  return (
    <>
      <CustomHotelHead
        metaShowTitle={
          props.hotelInfoDetails.hotel_Meta_Object_Details.meta_Title
        }
        metaDescription={
          props.hotelInfoDetails.hotel_Meta_Object_Details.meta_Description
        }
        metaKeywords={
          props.hotelInfoDetails.hotel_Meta_Object_Details.meta_Keywords
        }
        metaImageUrl={props.hotelInfoDetails.hotel_Image_Url}
        canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}`}
        hotelName={props.hotelInfoDetails.hotel_Name}
        hotelPincode={props.hotelInfoDetails.hotel_Pincode}
        hotelAddress={props.hotelInfoDetails.hotel_Address}
        hotelCity={props.hotelInfoDetails.hotel_City}
        hotelState={props.hotelInfoDetails.hotel_State}
        hotelRegion={props.hotelInfoDetails.hotel_Region}
        hotelStartingPrice={props.hotelInfoDetails.hotel_Starting_Price}
        hotelFaqList={availableFaqs}
        hotelAverageRating={props.hotelInfoDetails.hotel_Google_Rating}
        hotelTotalRating={props.hotelInfoDetails.hotel_Ratings_Count}
        hotelRatingsCount={props.hotelInfoDetails.hotel_Rating_Distribution}
      />

      <Toaster position="top-right" richColors duration={1500} />

      {/* hotel navbar */}
      <HotelNavbar roomsList={availableRoomsList || []} />

      {errorModel && (
        <BookingErrorsModel
          modelState={errorModel}
          setModelState={setErrorModel}
          errors={bookingErrors}
          handleBookingWithErros={formHanlder}
        />
      )}

      {galleryView && (
        <div className={`${galleryView ? "block" : "hidden"}`}>
          <FullScreenImageGallery
            imageList={availableImages}
            imageModel={fullScreenImageGallery}
            roomList={availableRoomsList}
            isHotelPage={true}
            handleClose={handleGalleryView}
          />
        </div>
      )}

      <section className="relative h-auto w-full">
        {/* hotel details */}
        <HotelGallerySection
          hotelName={props.hotelInfoDetails.hotel_Name}
          hotelLandmark={props.hotelInfoDetails.hotel_Landmark}
          hotelStarRating={props.hotelInfoDetails.hotel_Star_Rating}
          hotelGoogleRating={props.hotelInfoDetails.hotel_Google_Rating}
          hotelGoogelRatingsCount={props.hotelInfoDetails.hotel_Ratings_Count}
          hotelImageObjectList={availableImages}
          handleGalleryView={handleGalleryView}
          hotelImageUrl={props.hotelInfoDetails.hotel_Image_Url}
          setMainImageLoaded={setMainImageLoaded}
        />

        {/* sticky bar */}
        <StickyBarSection links={links} style={"top-[76px]"} />

        {/* <div className="wrapper mx-auto h-full w-full"> */}
        <div className="wrapper relative flex h-full flex-col space-y-7 py-7 md:space-y-10 md:py-10">
          {mainImageLoaded && (
            <>
              {/* Room plans */}
              {loadRooms ? (
                <RoomPlanCard />
              ) : (
                <DynamicRoomsSection
                  hotelName={props.hotelInfoDetails.hotel_Name}
                  hotelCity={props.hotelInfoDetails.hotel_City}
                  roomsList={availableRoomsList}
                  amentiesList={availableAmenities}
                  nearByHotel={props.nearByHotel}
                  hotelSlugName={props.hotelInfoDetails.hotel_Name}
                />
              )}

              {/* reviews list */}
              {isLoading ? (
                <ReviewsAndRatingSkeleton />
              ) : (
                <DynamicReviewsSection
                  hotelName={props.hotelInfoDetails.hotel_Name}
                  hotelCity={props.hotelInfoDetails.hotel_City}
                  googleReviewsList={availableReviews}
                  googleRating={props.hotelInfoDetails.hotel_Google_Rating}
                  googleRatingCount={props.hotelInfoDetails.hotel_Ratings_Count}
                  googleRatingDistribution={
                    props.hotelInfoDetails.hotel_Rating_Distribution
                  }
                  showAllReviews={showAllReviews}
                  setShowAllReviews={setShowAllReviews}
                />
              )}

              {/* hotel amenities */}
              {isLoading ? (
                <div className="mt-4">
                  <AmenitiesSkeleton />
                </div>
              ) : (
                <DynamicAmenitiesSection
                  hotelName={props.hotelInfoDetails.hotel_Name}
                  hotelCity={props.hotelInfoDetails.hotel_City}
                  amenitiesList={availableAmenities}
                  setShowAllAmenities={setShowAllAmenities}
                  showAllAmenities={showAllAmenities}
                />
              )}

              {/* Hotel location details */}
              <DynamicLocationSection
                hotelName={props.hotelInfoDetails.hotel_Name}
                hotelCity={props.hotelInfoDetails.hotel_City}
                hotelAddress={props.hotelInfoDetails.hotel_Address}
                hotelNearAirport={props.hotelInfoDetails.hotel_Near_Airport}
                hotelNearBusStation={
                  props.hotelInfoDetails.hotel_Near_Bus_Station
                }
                hotelNearRailwayStation={
                  props.hotelInfoDetails.hotel_Near_Railway_Station
                }
              />

              {/* Hotel nearby places */}
              {isLoading ? (
                <NearbyPlacesSkeleton />
              ) : (
                <DynamicNearbyPlacesSection
                  hotelName={props.hotelInfoDetails.hotel_Name}
                  hotelCity={props.hotelInfoDetails.hotel_City}
                  nearbyPlacesList={availableNearbyPlaces}
                  setShowAllPlaces={setShowAllPlaces}
                  showAllPlaces={showAllPlaces}
                />
              )}

              {/* hotel info */}
              <DynamicHotelInfoSection
                hotelName={props.hotelInfoDetails.hotel_Name}
                hotelCity={props.hotelInfoDetails.hotel_City}
                hotelDescription={props.hotelInfoDetails.hotel_Description}
                showAllInfo={showAllInfo}
                setShowAllInfo={setShowAllInfo}
                roomsPage={true}
              />

              {/* Hotel Faqs */}
              {isLoading ? (
                <FaqSkeleton />
              ) : (
                <DynamicFaqSection
                  hotelName={props.hotelInfoDetails.hotel_Name}
                  hotelCity={props.hotelInfoDetails.hotel_City}
                  faqList={availableFaqs}
                  setShowAllFaqs={setShowAllFaqs}
                  showAllFaqs={showAllFaqs}
                />
              )}

              {/* hotel more details */}
              <HotelDetailedData
                hotelMainImage={props.hotelInfoDetails.hotel_Image_Url}
                hotelName={props.hotelInfoDetails.hotel_Name}
                hotelDescription={
                  props.hotelInfoDetails.hotel_Detailed_Description ||
                  "Data is being written by our content writers and will be uploaded soon!"
                }
                isExpanded={true}
              />

              {/* hotel pilicies */}
              <DynamicPoliciesSection
                hotelName={props.hotelInfoDetails.hotel_Name}
                hotelCity={props.hotelInfoDetails.hotel_City}
                policies={
                  props.hotelInfoDetails.hotel_General_Policy.description
                }
                setShowAllPolicy={setShowAllPolicy}
                showAllPolicy={showAllPolicy}
                roomsPage={true}
              />
            </>
          )}
        </div>

        {isScrolled && (
          <DynamicBottomPriceCard
            isScrolled={isScrolled}
            handleBooking={handleBookNowButtonClick}
          />
        )}
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params, query, req, res } = await context;

  const {
    checkin,
    checkout,
    num_nights,
    num_guests,
    num_adults,
    num_children,
    childAgeList,
    num_rooms,
    roomId,
    planId,
  } = hotelPageQueryHandler(query);

  const hotel_slug = params?.hotelInfo;
  let fetchHotelParams = new FetchHotelDetailsQueryParams();
  fetchHotelParams.hotelSlugName = hotel_slug;
  fetchHotelParams.roomId = roomId;
  fetchHotelParams.planId = planId;
  fetchHotelParams.numGuests = Number(num_adults);
  fetchHotelParams.checkInDate = checkin;
  fetchHotelParams.checkOutDate = checkout;
  fetchHotelParams.childAgeList = childAgeList;
  fetchHotelParams.fetchHotelAmenityList = false;
  fetchHotelParams.fetchHotelFAQList = false;
  fetchHotelParams.fetchHotelNearbyPlacesList = false;
  fetchHotelParams.fetchHotelNearbyHotelsList = false;
  fetchHotelParams.fetchHotelRoomsList = true;
  fetchHotelParams.fetchAllHotelRoomsList = true;

  const { hotelDetails, roomDetails, planDetails, planStatus } =
    await getHotelInformationDetails(fetchHotelParams);
  const nearHotel = await getNearByHotels(hotel_slug);
  const seariledNearHotel = JSON.stringify(nearHotel);
  const serializedHotelInfoDetails = JSON.stringify(hotelDetails);
  const serializedHotelRoomDetails = JSON.stringify(roomDetails);
  const serializedHotelRoomPlanDetails = JSON.stringify(planDetails);

  return {
    props: {
      hotelInfoDetails: JSON.parse(serializedHotelInfoDetails),
      roomDetails: JSON.parse(serializedHotelRoomDetails),
      planDetails: JSON.parse(serializedHotelRoomPlanDetails),
      nearByHotel: JSON.parse(seariledNearHotel),
      planStatus: planStatus,
      checkin: String(checkin.toISOString()),
      checkout: String(checkout.toISOString()),
      num_nights: num_nights,
      num_guests: num_guests,
      num_adults: num_adults,
      num_rooms: num_rooms,
      num_children: num_children,
      child_age_list: childAgeList,
    },
  };
}
