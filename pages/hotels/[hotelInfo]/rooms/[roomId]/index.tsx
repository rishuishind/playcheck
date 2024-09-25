import { useEffect, useState } from "react";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { getHotelRoomPageDetails } from "@/lib/firebase/hotelRoomHandler";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addFirstRoom,
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
  selectTotalGuestsOccupancy,
  selectTotalPayingAmount,
  selectTotalPrice,
  selectTotalRoomCost,
  selectTotalRoomsCount,
  selectTotalTax,
  updateBookingDateRange,
  updateHotelDetails,
  updateBookingCard,
} from "@/lib/redux/bookingSlice";
import { getHotelBookingPageDetails } from "@/lib/firebase/hotelHandler";
import { getDateDifference, hotelPageQueryHandler } from "@/lib/helper";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import {
  routerToAllRoomsPage,
  routerToHotelBookingPage,
} from "@/lib/handlers/pageHandler";
import BottomPriceCard from "@/components/widgets/BottomPriceCard";
import { Toaster } from "sonner";
import FullScreenImageGallery from "@/components/hotelsSlideView/FullScreenImageGallery";
import {
  createHotelBookingInfo,
  updateHotelInfo,
} from "@/lib/redux/bookingConfirmationSlice";
import RoomsSection from "@/components/hotel/hotelInfo/rooms/roomId/RoomsSection";
import dynamic from "next/dynamic";
import StickyBarSection from "@/components/hotel/hotelInfo/StickyBar";
import RoomInfoSection from "@/components/hotel/hotelInfo/rooms/roomId/RoomInfo";
import BookingErrorsModel from "@/components/hotel/BookingCard/BookingErrorsModel";
import HotelNavbar from "@/components/navbar/HotelNavbar";
import CustomHotelHead from "@/components/header/CustomHotelHead";
import { RoomIdfaqList } from "@/lib/constantData";
import { RoomPlanCard } from "@/components/skeleton/HotelSkeletons";
const generateUniqueId = require("generate-unique-id");
const shortid = require("shortid");

const DynamicAmentiesSection = dynamic(
  () => import("@/components/hotel/hotelInfo/rooms/roomId/AmentiesSection"),
  { ssr: false },
);
const DynamicBathAndToiletSection = dynamic(
  () =>
    import("@/components/hotel/hotelInfo/rooms/roomId/BathAndToiletSection"),
  { ssr: false },
);
const DynamicBedListSection = dynamic(
  () => import("@/components/hotel/hotelInfo/rooms/roomId/BedListSection"),
  { ssr: false },
);

type Props = {
  hotelDetails: HotelInformationDetails;
  roomDetails: HotelRoomInformation;
  checkin: any;
  checkout: any;
  num_nights: Number;
  num_rooms: Number;
  num_adults: Number;
  num_children: Number;
  num_guests: Number;
  child_age_list: any[];
};

export default function HotelRoomPage(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  // const [loadMainImage, setLoadMainImage] = useState<boolean>(false);
  const totalRoomCount = Math.floor(useSelector(selectTotalRoomsCount));
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchedRoomCount = useSelector(selectSearchedRoomsCount);
  const searchedGuestCount = useSelector(selectSearchedGuestsCount);
  const searchedAdultCount = useSelector(selectSearchedAdultsCount);
  const searchedChildrenCount = useSelector(selectSearchedChildrenCount);
  const roomsList = useSelector(selectRoomsList);
  const hotelSlugName = useSelector(selectHotelSlugName);
  const searchedRooms = useSelector(selectSearchedRoomsCount);
  const searchedChildren = useSelector(selectSearchedChildrenCount);
  const numGuests = useSelector(selectTotalGuestsCount);
  const numChildren = useSelector(selectTotalChildrenCount);
  const numNights = useSelector(selectNumberOfNights);
  const totalGuestOccupancy = useSelector(selectTotalGuestsOccupancy);
  const totalRoomCost = useSelector(selectTotalRoomCost);
  const totalPrice = useSelector(selectTotalPrice);
  const totalTax = useSelector(selectTotalTax);
  const totalDiscount = useSelector(selectTotalDiscount);
  const totalPayingAmount = useSelector(selectTotalPayingAmount);
  const roomMap = useSelector(selectRoomMapping);
  const roomPlanMap = useSelector(selectRoomPlanMapping);

  const [hotelAuthStatus, setHotelAuthStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingErrors, setBookingErrors] = useState<string>("");
  const [errorModel, setErrorModel] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  // useEffect(() => {
  //   removeBookingFromCache();
  // }, []);

  useEffect(() => {
    dispatch(
      updateHotelDetails({
        hotelSlugName: props.hotelDetails.hotel_Slug_Name,
        hotelId: props.hotelDetails.hotel_Firebase_Id,
        hotelName: props.hotelDetails.hotel_Name,
        hotelAddress: props.hotelDetails.hotel_Address,
        hotelStarRating: props.hotelDetails.hotel_Star_Rating,
      }),
    );
  }, [router.query.hotelInfo]);

  useEffect(() => {
    // Add event listeners for route change start and complete
    const handleRouteChangeStart = () => {
      setIsLoading(true); // Show loading skeleton
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false); // Hide loading skeleton
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    setIsLoading(false);

    // Cleanup listeners on unmount
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    dispatch(
      updateBookingCard({
        bookingCardLoading: true,
      }),
    );
    dispatch(
      updateBookingDateRange({
        checkInDate: new Date(props.checkin),
        checkOutDate: new Date(props.checkout),
        searchedRoomCount: Number(props.num_rooms),
        searchAdultCount: Number(props.num_adults),
        searchedChildrenCount: Number(props.num_children),
        searchGuestCount: Number(props.num_guests),
        searchedChildAgeList: props.child_age_list,
      }),
    );

    dispatch(
      updateHotelInfo({
        hotelInfo: props.hotelDetails,
      }),
    );

    if (
      totalRoomCount === 0 &&
      props.roomDetails.hotelRoom_Plans_List.length > 0
    ) {
      dispatch(
        addFirstRoom({
          roomInfo: props.roomDetails,
          planInfo: props.roomDetails.hotelRoom_Plans_List[0],
          roomCount: +props.num_rooms,
          guestCount: Number(props.num_guests),
          adultCount: Number(props.num_adults),
          childCount: Number(props.num_children),
          childAgeList: props.child_age_list,
        }),
      );
    } else if (props.roomDetails.hotelRoom_Plans_List.length === 0) {
      dispatch(resetBookingInfo());
    }
    dispatch(
      updateBookingCard({
        bookingCardLoading: false,
      }),
    );
  }, [router.query.hotelInfo, router.query.checkin, router.query.checkout]);

  const allHotelRoomPageHandler = () => {
    const params = new PageRouterQueryParams(router);
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = getDateDifference(checkInDate, checkOutDate);
    params.num_guests = searchedGuestCount;
    params.num_adults = searchedAdultCount;
    params.num_rooms = searchedRoomCount;
    params.num_children = searchedChildrenCount;

    if (router.query.webpage) {
      // routerToHotelDetailPage(params);
      routerToAllRoomsPage(params);
    } else {
      routerToAllRoomsPage(params);
    }
  };

  // nav hash links array
  const links = [
    {
      name: "Plans",
      hash: "plans",
    },
    // {
    //   name: "Room Info",
    //   hash: "room-info",
    // },
    {
      name: "Amenities",
      hash: "amenities",
    },
    {
      name: "Bath",
      hash: "bath-and-toilet",
    },
    {
      name: "Bed Sizes",
      hash: "bed-sizes",
    },
  ];

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

  // add a border to scrolling past section
  const [activeSection, setActiveSection] = useState<string>("");
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(".navLink");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + rect.height
        ) {
          setActiveSection(section.id || "");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  if (!props.roomDetails || !props.roomDetails.hotelRoom_Type) {
    refreshPage();
  }

  // state and function to show fullScreen gallery
  const [galleryView, setGalleryView] = useState<boolean>(false);
  const handlegalleryView = () => {
    setGalleryView((prev: any) => !prev);
  };

  const formHanlder = async () => {
    let params = new PageRouterQueryParams(router);
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = numNights;
    params.num_rooms = searchedRooms;
    params.num_adults = searchedAdultCount;
    params.num_children = searchedChildren;
    params.num_guests = searchedGuestCount;

    const hotelSlugName = router.query.hotelInfo + "";

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
    if (
      numGuests < searchedAdultCount ||
      numChildren < searchedChildren ||
      totalRoomCount < searchedRooms ||
      totalRoomCount <= 0 ||
      (numGuests >= totalGuestOccupancy
        ? numGuests < searchedAdultCount
        : totalGuestOccupancy < searchedAdultCount)
    ) {
      const error = `You have searched for ${numGuests < searchedAdultCount && `${searchedAdultCount + searchedChildren} Guests.`} But You have only selected rooms that fits ${numGuests + numChildren} Guests.`;

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
        metaShowTitle={props.roomDetails.hotelRoom_Meta_Title}
        metaDescription={props.roomDetails.hotelRoom_Meta_Description}
        metaKeywords={""}
        metaImageUrl={
          props.roomDetails.hotelRoom_Image_Url === ""
            ? props.hotelDetails.hotel_Image_Url
            : props.roomDetails.hotelRoom_Image_Url
        }
        canonicalUrl={`https://staybook.in/hotels/${router.query.hotelInfo}`}
        hotelName={props.hotelDetails.hotel_Name}
        hotelPincode={props.hotelDetails.hotel_Pincode}
        hotelAddress={props.hotelDetails.hotel_Address}
        hotelCity={props.hotelDetails.hotel_City}
        hotelState={props.hotelDetails.hotel_State}
        hotelRegion={props.hotelDetails.hotel_Region}
        hotelStartingPrice={props.hotelDetails.hotel_Starting_Price}
        hotelFaqList={RoomIdfaqList}
        hotelAverageRating={props.hotelDetails.hotel_Google_Rating}
        hotelTotalRating={props.hotelDetails.hotel_Ratings_Count}
        hotelRatingsCount={props.hotelDetails.hotel_Rating_Distribution}
      />

      <Toaster position="top-right" richColors duration={1500} />

      {/* hotel navbar */}
      <HotelNavbar roomsList={[props.roomDetails]} />

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
            imageList={
              Array.isArray(props.roomDetails.hotelRoom_Images_Object_List)
                ? Array.from(props.roomDetails.hotelRoom_Images_Object_List)
                : []
            }
            imageModel={galleryView}
            isHotelPage={false}
            handleClose={handlegalleryView}
          />
        </div>
      )}

      <section className="h-auto w-full">
        <div className="wrapper mx-auto h-full space-y-7 py-7 md:space-y-10 md:py-10">
          <RoomInfoSection
            hotelRoomType={props.roomDetails.hotelRoom_Type}
            hotelRoomInfo={props.roomDetails.hotelRoom_Info}
            allHotelRoomPageHandler={allHotelRoomPageHandler}
            hotelRoomImagesList={props.roomDetails.hotelRoom_Images_Object_List}
            handlegalleryView={handlegalleryView}
            hotelRoomImageUrl={props.roomDetails.hotelRoom_Image_Url}
          />

          {/* sticky hash navbar */}
          <StickyBarSection links={links} style={"top-[72px]"} />

          {/* Room plans */}
          {isLoading ? (
            <RoomPlanCard />
          ) : (
            <RoomsSection
              plansList={props.roomDetails.hotelRoom_Plans_List}
              roomDetails={props.roomDetails}
            />
          )}

          {/* About this property */}
          {/* <AboutSection
            roomType={props.roomDetails.hotelRoom_Type}
            roomInfo={props.roomDetails.hotelRoom_Info}
            roomDescription={props.roomDetails.hotelRoom_Description}
          /> */}

          {/* amenities info */}
          <DynamicAmentiesSection
            amenitiesList={props.roomDetails.hotelRoom_Amenities_List}
            setShowAllAmenities={setShowAllAmenities}
            showAllAmenities={showAllAmenities}
          />

          {/* bath and toilet */}
          <DynamicBathAndToiletSection
            bathAndToilet={props.roomDetails.hotelRoom_BathAndToilet}
          />

          {/* bed list */}
          <DynamicBedListSection
            bedsList={props.roomDetails.hotelRoom_Beds_List}
          />
        </div>
        <BottomPriceCard
          isScrolled={isScrolled}
          handleBooking={handleBookNowButtonClick}
        />
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
  } = hotelPageQueryHandler(query);

  const hotelSlugName = params?.hotelInfo;
  const roomId = params?.roomId;

  const hotelDetails: HotelInformationDetails =
    await getHotelBookingPageDetails(hotelSlugName + "");
  const roomDetails: HotelRoomInformation = await getHotelRoomPageDetails(
    hotelSlugName,
    roomId,
    checkin,
    checkout,
  );
  const serializedHotelDetails = JSON.stringify(hotelDetails);
  const serializedHotelRoomDetails = JSON.stringify(roomDetails);

  return {
    props: {
      hotelDetails: JSON.parse(serializedHotelDetails),
      roomDetails: JSON.parse(serializedHotelRoomDetails),
      checkin: String(checkin),
      checkout: String(checkout),
      num_nights: num_nights,
      num_rooms: num_rooms,
      num_adults: num_adults,
      num_children: num_children,
      num_guests: num_guests,
      child_age_list: childAgeList,
    },
  };
}
