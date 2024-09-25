import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  fetchAllHotelsData,
  fetchHotelInfoAllPageHandler,
} from "@/lib/firebase/hotelHandler";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import { useSelector, useDispatch } from "react-redux";
import {
  resetBookingInfo,
  selectCheckInDate,
  selectCheckOutDate,
  updateBookingDateRange,
} from "@/lib/redux/bookingSlice";
import CustomHotelHead from "@/components/header/CustomHotelHead";
import {
  HOTEL_SELECTION_CARD_ID,
  compareDate,
  convertChildArrayOfObjectsIntoArrayOfNumbers,
  convertChildUrlQueryIntoArrayOfObjects,
} from "@/lib/helper";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToAllRoomsPage } from "@/lib/handlers/pageHandler";
import HotelInfo from "@/components/hotel/hotelInfo/HotelInfo";
import SelectionCard from "@/components/hotel/SelectionCard";
import MobileCalendar from "@/components/calendar/MobileCalendar";
import MobileSelectionCard from "@/components/hotel/hotelInfo/MobileSelectionCard";
import { differenceInDays } from "date-fns";
import FullScreenImageGallery from "@/components/hotelsSlideView/FullScreenImageGallery";
import AlertModelSection from "@/components/hotel/hotelInfo/AlertModel";
import MobileGuestSection from "@/components/hotel/hotelInfo/MobileGuestSection";
import StickyBarSection from "@/components/hotel/hotelInfo/StickyBar";
import AboutSection from "@/components/hotel/hotelInfo/About";
import RoomsViewInfo from "@/components/hotel/hotelInfo/RoomsViewInfo";
import AmenitiesSection from "@/components/hotel/hotelInfo/Amenities";
import NearbyPlacesSection from "@/components/hotel/hotelInfo/NearbyPlaces";
import FaqSection from "@/components/hotel/hotelInfo/Faq";
import PoliciesSection from "@/components/hotel/hotelInfo/Policies";
import { fetchStaticData } from "@/lib/helper/fetchStaticData";
import HotelPageFooter from "@/components/footer/HotelPageFooter";
import { capitalize } from "instantsearch.js/es/lib/utils";
import dynamic from "next/dynamic";
import NearbyHotels from "@/components/hotel/hotelInfo/NearbyHotels";
import { NearbyHotelsSkeleton } from "@/components/skeleton/HotelSkeletons";
import { toast, Toaster } from "sonner";
import LocationSection from "@/components/hotel/hotelInfo/Location";
const DynamicReviewSection = dynamic(
  () => import("@/components/hotel/hotelInfo/Reviews"),
  { ssr: false },
);
import HotelDetailedData from "@/components/hotel/hotelInfo/HotelDetailedData";

type Props = {
  hotelInfoDetails: HotelInformationDetails;
  staticData: any;
  // citiesSlugList: any[];
  // famousHotels: any[];
  // regionsSlugList: any[];
  // hotelsInCity: any[];
};

export default function HotelInformation(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const slideContainerRef = useRef<any>(null);
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [galleryView, setGalleryView] = useState<boolean>(false);
  const [fullScreenGallery, setFullScreenGallery] = useState<boolean>(false);
  const handlegalleryView = () => {
    setGalleryView((prev: any) => !prev);
    setFullScreenGallery((prev: any) => !prev);
  };

  const hotelList = props.staticData.hotelList.filter(
    (hotel) => hotel.slug !== router.query.hotelInfo,
  );

  // nav hash links array
  const links = [
    {
      name: "Hotel Info",
      hash: "hotel-info",
    },
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
    // {
    //   name: "Location",
    //   hash: "location",
    // },
    {
      name: "Nearby Places",
      hash: "nearby-places",
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

  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(false);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  const [mobileCalender, setMobileCalender] = useState<boolean>(false);
  const [mobileGuests, setMobileGuests] = useState<boolean>(false);
  const [desktopCalender, setDesktopCalender] = useState<boolean>(false);
  const [desktopGuests, setDesktopGuests] = useState<boolean>(false);

  const [checkinDate, setCheckinDate] = useState<Date>(new Date());
  const [checkoutDate, setCheckoutDate] = useState<Date>(new Date());
  const [guestCount, setGuestCount] = useState<number>(2);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [roomCount, setRoomCount] = useState<number>(1);

  const [checkinDateSelected, setCheckinDateSelected] =
    useState<boolean>(false);
  const routename = router.pathname.split("/")[3];

  const [loading, setLoading] = useState<boolean>(false);

  const cityArray =
    typeof router.query?.hotelInfo === "string"
      ? router.query.hotelInfo.split("-")
      : [];

  const cityName: any = cityArray
    ? capitalize(cityArray[cityArray.length - 1])
    : "New Delhi";

  // extract child_age from the router query
  const [child_age, setChild_age] = useState<any[]>(
    router.query?.child_age != ""
      ? convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[])
      : [],
  );

  useEffect(() => {
    setChild_age(
      convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[]),
    );
  }, [router.query]);

  // find the max child number and max guest number from room List
  const getMaxAdultAndChildCountOfHotel = (rooms: any[]): number => {
    let maxGuestLimit = rooms[0].hotelRoom_Max_Guest_Occupancy;
    // let maxChildLimit = rooms[0].hotelRoom_Max_Children_Occupancy;

    for (let i = 0; i < rooms.length; i++) {
      if (maxGuestLimit < rooms[i].hotelRoom_Max_Guest_Occupancy) {
        maxGuestLimit = rooms[i].hotelRoom_Max_Guest_Occupancy;
      }
      // if (maxChildLimit < rooms[i].hotelRoom_Max_Children_Occupancy) {
      //   maxChildLimit = rooms[i].hotelRoom_Max_Children_Occupancy;
      // }
    }

    return maxGuestLimit;
  };

  // extract the data from
  const maxTotalOccupencyOfHotel = getMaxAdultAndChildCountOfHotel(
    props.hotelInfoDetails.hotel_Rooms_List,
  );

  const adultCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (adultCount + childCount + 1) %
          (maxTotalOccupencyOfHotel * roomCount) >=
          1 &&
        childCount + adultCount + 1 >= maxTotalOccupencyOfHotel * roomCount
      ) {
        setRoomCount(roomCount + 1);
      }
      if (adultCount < 30) setAdultCount(adultCount + 1);
    } else {
      if (
        adultCount + childCount - 1 <=
          (roomCount - 1) * maxTotalOccupencyOfHotel &&
        roomCount > 1 &&
        adultCount > 1
      ) {
        setRoomCount(roomCount - 1);
      }
      if (adultCount > 1) setAdultCount(adultCount - 1);
    }
  };

  const roomCountHandler = (type: number) => {
    const totalGuests = adultCount + childCount;

    if (type === 1) {
      // Increase the room count
      if (roomCount < 30) setRoomCount(roomCount + 1);
    } else {
      // Decrease the room count
      if (roomCount > 1) {
        const newRoomCount = roomCount - 1;
        const maxCapacity = newRoomCount * maxTotalOccupencyOfHotel;

        if (totalGuests > maxCapacity) {
          const excessGuests = totalGuests - maxCapacity;
          const newAdultCount = Math.max(adultCount - excessGuests, 1); // Ensure at least 1 adult remains
          setAdultCount(newAdultCount);
        }
        setRoomCount(newRoomCount);
      }
    }
  };

  const childCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (adultCount + childCount + 1) %
          (maxTotalOccupencyOfHotel * roomCount) >=
          1 &&
        childCount + adultCount + 1 >= maxTotalOccupencyOfHotel * roomCount
      ) {
        setRoomCount(roomCount + 1);
      }
      if (childCount < 8) setChildCount(childCount + 1);
    } else {
      if (
        adultCount + childCount - 1 <=
          (roomCount - 1) * maxTotalOccupencyOfHotel &&
        roomCount > 1 &&
        childCount > 0
      ) {
        setRoomCount(roomCount - 1);
      }
      if (childCount > 0) setChildCount(childCount - 1);
    }
  };

  // const handleChildCount = (type: number) => {
  //   if (type === 1) {
  //     // Add child and age to array
  //     if (childCount < 8) {
  //       setChild_age([...child_age, 0]); // Add initial age of 0 for new child
  //       childCountHandler(type);
  //     }
  //   } else {
  //     if (childCount > 0) {
  //       child_age.splice(childCount - 1, 1); // Remove last child's age
  //       setChild_age([...child_age]); // Update state with modified array
  //       childCountHandler(type);
  //     }
  //   }
  // };

  // // handle the child update function
  // const handleChildAgeChange = (newValue: number, index: number) => {
  //   const updatedAges = [...child_age];
  //   updatedAges[index] = newValue;
  //   setChild_age(updatedAges);
  // };

  const handleChildCount = (type: number) => {
    let index = child_age.length;
    if (type === 1) {
      // Add child and age to array
      if (childCount < 8) {
        setChild_age((prev) => [
          ...prev,
          { idx: index, age: 0, price: 0, status: true },
        ]);
        childCountHandler(type);
      }
    } else {
      if (childCount > 0) {
        child_age.splice(childCount - 1, 1);
        setChild_age([...child_age]);
        childCountHandler(type);
      }
    }
  };

  // handle the child update function
  const handleChildAgeChange = (newValue: number, index: number) => {
    const updatedAges = [...child_age];
    updatedAges[index].age = newValue;
    setChild_age(updatedAges);
  };

  // handle if the age number are not a falsy value
  const isSearchButtonDisabled = child_age && child_age.every((age) => age !== 0);

  const prevSlide = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  const handleDateSelection = (startDate: Date, endDate: Date) => {
    setCheckinDate(startDate);
    setCheckoutDate(endDate);
    setDesktopCalender(false);
    setMobileCalender(false);
    if (mobileCalender) {
      setMobileGuests(true);
    }
  };

  useEffect(() => {
    setCheckinDate(checkinDate);
    setCheckoutDate(checkoutDate);
  }, [checkinDate, checkoutDate]);

  function handlePriceSearch(checkinDate: Date, checkoutDate: Date) {
    setDesktopCalender(false);
    setDesktopGuests(false);

    let params = new PageRouterQueryParams(router);
    params.isWebpage = router.query.isWebpage
      ? router.query.isWebpage + "" === "true"
        ? true
        : false
      : false;
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkinDate;
    params.checkout = checkoutDate;
    params.num_nights = differenceInDays(checkoutDate, checkinDate);
    params.num_rooms = roomCount;
    params.num_adults = adultCount;
    params.num_children = childCount;
    params.num_guests = adultCount + childCount;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);
    params.push = false;

    dispatch(
      updateBookingDateRange({
        checkInDate: checkinDate,
        checkOutDate: checkoutDate,
        searchedRoomCount: roomCount,
        searchAdultCount: adultCount,
        searchedChildrenCount: childCount,
        searchGuestCount: adultCount + childCount,
        searchedChildAgeList: child_age,
      }),
    );

    let chk1 = compareDate(checkinDate, checkInDate);
    let chk2 = compareDate(checkoutDate, checkOutDate);
    if (!chk1 || !chk2) {
      dispatch(resetBookingInfo());
    }

    if (checkoutDate <= new Date()) {
      toast.warning(`Please Select the checkin Date and checkout Dates`);
      return;
    } else {
      // params.new_tab = true;
      routerToAllRoomsPage(params);
    }
  }

  const [alertModel, setAlertModel] = useState<boolean>(false);
  useEffect(() => {
    const routerPathArray = router.asPath.split("#");

    if (routerPathArray[1] === HOTEL_SELECTION_CARD_ID) {
      setDesktopCalender(true);
    }
  }, [router.asPath]);

  const handleOpenCalender = () => {
    setAlertModel(false);
    setMobileCalender(true);
  };

  const openAlertModel = () => {
    if (checkoutDate <= new Date()) {
      setAlertModel(true);
    } else {
      handlePriceSearch(checkInDate, checkOutDate);
    }
  };

  // hide the scrollbar from the body if mobileCalender or mobilesGuest model is enabled
  useEffect(() => {
    if (mobileCalender || mobileGuests) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileCalender, mobileGuests]);

  return (
    <>
      <CustomHotelHead
        metaShowTitle={`Book ${props.hotelInfoDetails.hotel_Meta_Object_Details.meta_Title} Hotel in ${props.hotelInfoDetails.hotel_City} - Price, Rooms, Photos, Amenities, Reviews & Offer`}
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
        hotelFaqList={props.hotelInfoDetails.hotel_FAQ_Schema_List}
        hotelAverageRating={props.hotelInfoDetails.hotel_Google_Rating}
        hotelTotalRating={props.hotelInfoDetails.hotel_Ratings_Count}
        hotelRatingsCount={props.hotelInfoDetails.hotel_Rating_Distribution}
      />

      <Toaster position="top-center" richColors />

      {galleryView && (
        <div className={`${galleryView ? "container-snap block" : "hidden"}`}>
          <FullScreenImageGallery
            imageList={props.hotelInfoDetails.hotel_Images_Object_List}
            imageModel={fullScreenGallery}
            roomList={props.hotelInfoDetails.hotel_Rooms_List}
            isHotelPage={true}
            handleClose={handlegalleryView}
          />
        </div>
      )}

      {alertModel && (
        <AlertModelSection
          setAlertModel={setAlertModel}
          handleOpenCalender={handleOpenCalender}
        />
      )}

      {mobileCalender && (
        <MobileCalendar
          checkInDate={checkinDate}
          checkOutDate={checkoutDate}
          mobileCalendar={mobileCalender}
          setMobileCalendar={setMobileCalender}
          setBookingDate={handleDateSelection}
          spanText="Hotels are available here!!"
          primaryColor="005250"
        />
      )}
      {mobileGuests && (
        <MobileGuestSection
          setMobileGuests={setMobileGuests}
          guestCount={adultCount}
          setGuestCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          childAges={child_age}
          roomCount={roomCount}
          setRoomCount={setRoomCount}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          guestCountHandler={adultCountHandler}
          childCountHandler={handleChildCount}
          roomCountHandler={roomCountHandler}
          handlePriceSearch={handlePriceSearch}
          handleChildAgeChange={handleChildAgeChange}
          isSearchButtonDisabled={isSearchButtonDisabled}
        />
      )}

      <section className="relative h-auto w-full">
        {/* hotel details */}
        <div className="wrapper relative flex w-full flex-col gap-4 md:h-[40vh] md:flex-row md:py-2.5 lg:h-[52vh] lg:py-4 xl:h-[62vh]">
          <HotelInfo
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelLandmark={props.hotelInfoDetails.hotel_Landmark}
            hotelStarRating={props.hotelInfoDetails.hotel_Star_Rating}
            hotelGoogleRating={props.hotelInfoDetails.hotel_Google_Rating}
            hotelRatingCount={props.hotelInfoDetails.hotel_Ratings_Count}
            hotelImageObjectList={
              props.hotelInfoDetails.hotel_Images_Object_List
            }
            handleGalleryView={handlegalleryView}
            imageUrl={props.hotelInfoDetails.hotel_Image_Url}
            setLoadData={() => {}}
          />

          {/* Selection card */}
          <div
            id={HOTEL_SELECTION_CARD_ID}
            className="hidden w-full justify-center md:block md:w-[40%] xl:w-[30%]"
          >
            <SelectionCard
              checkinDate={checkinDate}
              checkoutDate={checkoutDate}
              guestCount={adultCount}
              childCount={childCount}
              roomCount={roomCount}
              setRoomCount={setRoomCount}
              setGuestCount={setAdultCount}
              setChildrenCount={setChildCount}
              setDesktopCalender={setDesktopCalender}
              desktopCalender={desktopCalender}
              setDesktopGuests={setDesktopGuests}
              desktopGuests={desktopGuests}
              dateRangeHandler={handleDateSelection}
              handlePriceSearch={handlePriceSearch}
              guestCountHandler={adultCountHandler}
              childCountHandler={handleChildCount}
              roomCountHandler={roomCountHandler}
              childAges={child_age}
              handleChildAgeChange={handleChildAgeChange}
              isSearchButtonDisabled={isSearchButtonDisabled}
            />
          </div>

          <MobileSelectionCard
            setMobileCalender={setMobileCalender}
            checkinDateSelected={checkinDateSelected}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
            setMobileGuests={setMobileGuests}
            guestCount={adultCount}
            childCount={childCount}
            roomCount={roomCount}
            handlePriceSearch={handlePriceSearch}
          />
        </div>

        {/* sticky hash navbar */}
        <StickyBarSection links={links} style={"top-0"} />

        <div className="wrapper relative flex h-full flex-col space-y-7 py-7 md:space-y-10 md:py-10">
          {/* hotel Info */}
          <AboutSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            hotelDescription={props.hotelInfoDetails.hotel_Description}
            showAllInfo={true}
            setShowAllInfo={() => {}}
            roomsPage={false}
          />

          {/* Room plans */}
          <RoomsViewInfo
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            roomsList={props.hotelInfoDetails.hotel_Rooms_List}
            openAlertModel={openAlertModel}
          />

          {/* reviews list */}
          <DynamicReviewSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            googleReviewsList={props.hotelInfoDetails?.hotel_Review_List || []}
            googleRating={props.hotelInfoDetails.hotel_Google_Rating}
            googleRatingCount={props.hotelInfoDetails.hotel_Ratings_Count}
            googleRatingDistribution={
              props.hotelInfoDetails.hotel_Rating_Distribution
            }
            showAllReviews={showAllReviews}
            setShowAllReviews={setShowAllReviews}
          />

          {/* Hotel location details */}
          <LocationSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            hotelAddress={props.hotelInfoDetails.hotel_Address}
            hotelNearBusStation={props.hotelInfoDetails.hotel_Near_Bus_Station}
            hotelNearRailwayStation={
              props.hotelInfoDetails.hotel_Near_Railway_Station
            }
            hotelNearAirport={props.hotelInfoDetails.hotel_Near_Airport}
          />

          {/* hotel amenities */}
          <AmenitiesSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            amenitiesList={
              props.hotelInfoDetails.hotel_Available_Amenities_List
            }
            showAllAmenities={showAllAmenities}
            setShowAllAmenities={setShowAllAmenities}
          />

          {/* Hotel nearby places */}
          <NearbyPlacesSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            nearbyPlacesList={
              props.hotelInfoDetails.hotel_Nearby_Places_List || []
            }
            showAllPlaces={showAllPlaces}
            setShowAllPlaces={setShowAllPlaces}
          />

          {/* Hotel Faqs */}
          <FaqSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            faqList={props.hotelInfoDetails.hotel_FAQ_Schema_List || []}
            showAllFaqs={showAllFaqs}
            setShowAllFaqs={setShowAllFaqs}
          />

          {/* hotel more details */}
          <HotelDetailedData
            hotelMainImage={props.hotelInfoDetails.hotel_Image_Url}
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelDescription={
              props.hotelInfoDetails.hotel_Detailed_Description ||
              "Data is being written by our content writers and will be uploaded soon!"
            }
          />

          {/* nearby hotels list */}
          {loading ? (
            <NearbyHotelsSkeleton />
          ) : (
            <NearbyHotels
              data={hotelList}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              currentHotelData={props.hotelInfoDetails}
              slideRef={slideContainerRef}
            />
          )}

          {/* hotel pilicies */}
          <PoliciesSection
            hotelName={props.hotelInfoDetails.hotel_Name}
            hotelCity={props.hotelInfoDetails.hotel_City}
            policies={props.hotelInfoDetails.hotel_General_Policy.description}
            showAllPolicy={false}
            setShowAllPolicy={() => {}}
            roomsPage={false}
          />
        </div>
      </section>
      <HotelPageFooter cityInfo={cityName} staticData={props.staticData} />
    </>
  );
}
export async function getStaticPaths(context: any) {
  const res = await fetchAllHotelsData();
  const paths: any = res.map((hotel: any) => {
    return {
      params: {
        hotelInfo: hotel,
      },
    };
  });

  // Fetching all the cities from our database
  // const citiesSlugList = await getTopCitiesInCountry();

  // // Initialize the cityData object
  // let cityData: any = {};
  // for (let citySlug of citiesSlugList.data) {
  //   const regionsSlugList = await getRegionsInCity(
  //     citySlug.hotelCity_Slug_Name,
  //   );
  //   const hotelsInCity = await getLimitedHotelsInCity(
  //     citySlug.hotelCity_Slug_Name,
  //   );
  //   const famousHotelsInCity = await getFamousHotelsInCity(
  //     citySlug.hotelCity_Slug_Name,
  //   );

  //   // Ensure the regionsSlugList is valid
  //   const uniqueRegions =
  //     regionsSlugList.status === "OK" && regionsSlugList.error === null
  //       ? Array.from(
  //           new Set(
  //             regionsSlugList.data.map(
  //               (item: any) => item.hotelCityRegion_Slug_Name,
  //             ),
  //           ),
  //         )
  //       : [];

  //   // Ensure the hotelsInCity is valid and transform to required structure
  //   const hotels =
  //     hotelsInCity.status === "OK" && hotelsInCity.error === null
  //       ? hotelsInCity.data.map((hotel: any) => ({
  //           slug: hotel.hotel_Slug_Name,
  //           imageUrl: hotel.hotel_Image_Url, // Adding the image URL for each hotel
  //         }))
  //       : [];

  //   // Ensure the famousHotelsInCity is valid and transform to required structure
  //   const trendingHotels =
  //     famousHotelsInCity.status === "OK" && famousHotelsInCity.error === null
  //       ? famousHotelsInCity.data.map((hotel: any) => ({
  //           slug: hotel.hotel_Slug_Name,
  //           imageUrl: hotel.hotel_Image_Url, // Adding the image URL for each famous hotel
  //         }))
  //       : [];

  //   // Add regions, hotels (with image URLs), and trendingHotels (with image URLs) to the cityData object
  //   cityData[citySlug.hotelCity_Slug_Name] = {
  //     cityName: citySlug.hotelCity_Name,
  //     regions: uniqueRegions,
  //     hotels: hotels,
  //     trendingHotels: trendingHotels,
  //   };
  // }

  // const filePath = path.join(process.cwd(), "data.js");

  // // Create the content for data.js
  // const fileContent = `export const hotelPaths = ${JSON.stringify(cityData, null, 2)};`;

  // // Write the file
  // fs.writeFileSync(filePath, fileContent, "utf8");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params, req } = await context;
  const hotel_slug = params?.hotelInfo;

  // const citiesSlugList = await getTopCitiesInCountry();
  // const serializedCitiesSlugList =
  //   citiesSlugList.status === "OK" && citiesSlugList.error === null
  //     ? JSON.stringify(citiesSlugList.data)
  //     : citiesSlugList.error;

  const citySlugArray: [] = params?.hotelInfo.split("-");
  let citySlug: string = citySlugArray[citySlugArray.length - 1];
  if (citySlug === "delhi") {
    citySlug = "new-delhi";
  }
  // const famousHotels = await getFamousHotelsInCity(`hotels-in-${citySlug}`);
  // const serializedFamousHotels = JSON.stringify(famousHotels.data);

  // const regionsSlugList = await getRegionsInCity(`hotels-in-${citySlug}`);
  // const serializedRegionsSlugList = JSON.stringify(regionsSlugList.data);

  // const hotelsInCity = await getLimitedHotelsInCity(`hotels-in-${citySlug}`);
  // const serializedHotelsInCity = JSON.stringify(hotelsInCity.data);

  const hotelDetails = await fetchHotelInfoAllPageHandler(hotel_slug);
  const staticData = await fetchStaticData(citySlug);

  return {
    props: {
      hotelInfoDetails: hotelDetails,
      staticData: staticData,

      // citiesSlugList: JSON.parse(serializedCitiesSlugList),
      // famousHotels: JSON.parse(serializedFamousHotels),
      // regionsSlugList: JSON.parse(serializedRegionsSlugList),
      // hotelsInCity: JSON.parse(serializedHotelsInCity),
    },
    revalidate: 10,
  };
}
