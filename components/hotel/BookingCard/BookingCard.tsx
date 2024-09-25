import { useState, useEffect, useRef } from "react";
import { Router, useRouter } from "next/router";
import BookingPriceCard from "./BookingPriceCard";
import {
  routerToHotelBookingPage,
  routerToHotelDetailPage,
  routerToRoomDetailPage,
} from "@/lib/handlers/pageHandler";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectNumberOfNights,
  selectTotalRoomCost,
  selectTotalTax,
  selectTotalPrice,
  selectHotelSlugName,
  selectRoomsList,
  selectSearchedGuestsCount,
  selectTotalRoomsCount,
  selectTotalGuestsCount,
  selectTotalDiscount,
  selectTotalPayingAmount,
  selectTotalChildrenCount,
  selectSearchedRoomsCount,
  selectSearchedChildrenCount,
  selectTotalGuestsOccupancy,
  selectRoomMapping,
  selectRoomPlanMapping,
  selectSearchedAdultsCount,
  selectBookingCardLoading,
} from "@/lib/redux/bookingSlice";
import { createHotelBookingInfo } from "@/lib/redux/bookingConfirmationSlice";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import { useDispatch, useSelector } from "react-redux";
import BookingErrorsModel from "./BookingErrorsModel";
import {
  selectBookingDetailsInfo,
  selectBookingId,
} from "@/lib/redux/bookingConfirmationSlice";
import RoomsBookingSkeleton from "@/components/skeleton/RoomsBookingSkeleton";
import {
  convertTimestampToDate,
  formatDateToCustomString,
} from "@/lib/helper/timestampToDate";
import { format } from "date-fns";

const generateUniqueId = require("generate-unique-id");
const shortid = require("shortid");

export default function BookingCard() {
  const dispatch = useDispatch();
  const router = useRouter();

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
  const totalRoomCount = useSelector(selectTotalRoomsCount);
  const totalGuestOccupancy = useSelector(selectTotalGuestsOccupancy);
  const totalRoomCost = useSelector(selectTotalRoomCost);
  const totalTax = useSelector(selectTotalTax);
  const totalPrice = useSelector(selectTotalPrice);
  const totalDiscount = useSelector(selectTotalDiscount);
  const totalPayingAmount = useSelector(selectTotalPayingAmount);
  const roomMap = useSelector(selectRoomMapping);
  const roomPlanMap = useSelector(selectRoomPlanMapping);
  const bookingCardLoading = useSelector(selectBookingCardLoading);

  const [hotelAuthStatus, setHotelAuthStatus] = useState<boolean>(true);
  const [dateRangePicker, setDateRangePicker] = useState<boolean>(false);
  const [checkin, setCheckin] = useState<Date>(checkInDate);
  const [checkout, setCheckout] = useState<Date>(checkOutDate);
  const [num_guests, setNum_guests] = useState<number>(searchedNumGuests);
  const [num_adults, setNum_adults] = useState<number>(searchedNumAdults);
  const [num_rooms, setNum_rooms] = useState<number>(searchedRooms);
  const [num_children, setNum_children] = useState<number>(searchedChildren);

  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const [priceLoadingSkeleton, setpriceLoadingSkeleton] = useState(true);
  const isInitialRender = useRef(true);
  const bInfo = useSelector(selectBookingDetailsInfo);
  const bId = useSelector(selectBookingId);

  useEffect(() => {
    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_guests(searchedNumGuests);
    setNum_rooms(searchedRooms);
    setNum_children(searchedChildren);
  }, []);

  const formHanlder = async () => {
    resetSearchTextHandler();

    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_guests(searchedNumGuests);
    setNum_rooms(searchedRooms);
    setNum_children(searchedChildren);

    let params = new PageRouterQueryParams(router);
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = numNights;
    params.num_guests = searchedNumGuests;
    params.num_rooms = searchedRooms;
    params.num_children = searchedChildren;

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
        formattedCheckinTime: convertTimestampToDate(
          params.checkin.toISOString(),
        ),
        formattedCheckoutTime: convertTimestampToDate(
          params.checkout.toISOString(),
        ),
      }),
    );

    // params.new_tab = true;
    routerToHotelBookingPage(params);
  };

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

  const resetSearchTextHandler = () => {
    setDateRangePicker(false);
    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_rooms(searchedRooms);
    setNum_adults(searchedNumAdults);
    setNum_children(searchedChildren);
    setNum_guests(searchedNumGuests);
  };

  // const searchHandler = () => {
  //   setDateRangePicker(false);
  //   let params = new PageRouterQueryParams(router);
  //   params.hotelSlugName = router.query.hotelInfo + "";
  //   params.checkin = checkin;
  //   params.checkout = checkout;
  //   params.num_nights = getDateDifference(checkin, checkout);
  //   params.num_guests = num_guests;
  //   params.num_rooms = num_rooms;
  //   params.num_children = num_children;
  //   dispatch(
  //     updateBookingDateRange({
  //       checkInDate: checkin,
  //       checkOutDate: checkout,
  //       searchedRoomCount: num_rooms,
  //       searchAdultCount: num_adults,
  //       searchedChildrenCount: num_children,
  //       searchGuestCount: num_guests,
  //     }),
  //   );
  //   let chk1 = compareDate(checkin, checkInDate);
  //   let chk2 = compareDate(checkout, checkOutDate);
  //   if (!chk1 || !chk2) {
  //     dispatch(resetBookingInfo());
  //   }
  //   if (router.query.roomId) {
  //     params.push = false;
  //     params.roomId = router.query.roomId + "";
  //     routerToRoomDetailPage(params);
  //   } else {
  //     params.push = true;
  //     routerToHotelDetailPage(params);
  //   }
  // };

  useEffect(() => {
    if (isInitialRender.current) {
      setpriceLoadingSkeleton(true);
      isInitialRender.current = false;
    } else {
      setpriceLoadingSkeleton(false);
    }
  }, [totalPrice]);

  function loadcomplete() {
    setpriceLoadingSkeleton(false);
  }

  Router.events.on("routeChangeComplete", loadcomplete);
  const [showBookingErrorsModel, setShowBookingErrorsModel] =
    useState<boolean>(false);
  const [bookingErrors, setBookingErrors] = useState<string>("");

  // function to call the booking handler if there are some errors
  const handleBookNowButtonClick = () => {
    if (!hotelAuthStatus) {
      alert("No Reservations Available");
      return;
    }
    if (roomsList.length <= 0) {
      const error = `You have searched for ${numGuests < searchedNumAdults && `${searchedRooms} ${searchedRooms <= 1 ? "Room" : "Rooms"} ${searchedNumAdults} Adults & ${searchedChildren} Children`}.<br />
      But You have selected ${totalRoomCount} ${totalRoomCount <= 1 ? "Room" : "Rooms"} ${numGuests} ${numGuests <= 1 ? "Adult" : "Adults"} & ${numChildren} ${numChildren <= 1 ? "Child" : "Children"}.<br />
      Please select. ${searchedRooms} ${searchedRooms <= 1 ? "Room" : "Rooms"} ${searchedNumAdults} Adults & ${searchedChildren} Children`;

      if (error.length > 0) {
        setBookingErrors(error);
        setShowBookingErrorsModel((prev: boolean) => !prev);
      }
      return;
    }

    // else call booking handler
    formHanlder();
  };

  return (
    <>
      {showBookingErrorsModel && (
        <BookingErrorsModel
          modelState={showBookingErrorsModel}
          setModelState={setShowBookingErrorsModel}
          errors={bookingErrors}
          handleBookingWithErros={formHanlder}
        />
      )}

      {isLoading || bookingCardLoading ? (
        <RoomsBookingSkeleton />
      ) : (
        <div
          id="booking-card"
          className="relative mx-auto flex h-full w-full max-w-sm flex-col justify-between space-y-2.5 rounded-xl border-2 p-4 shadow-inner"
        >
          <div className="h-fit w-full">
            <div className="flex flex-col">
              {totalPrice == 0 && priceLoadingSkeleton ? (
                <p className="sr-only hidden" />
              ) : (
                <div className="relative mx-auto -mt-4 mb-2.5 h-10 w-[45%] bg-primary pt-2 text-center before:absolute before:-left-10 before:top-0 before:h-0 before:w-0 before:border-l-[40px] before:border-r-[0px] before:border-t-[40px] before:border-l-transparent before:border-r-transparent before:border-t-primary after:absolute after:-right-10 after:top-0 after:h-0 after:w-0 after:border-b-[0px] after:border-r-[40px] after:border-t-[40px] after:border-b-transparent after:border-r-transparent after:border-t-primary">
                  <p className="font-dream text-xl font-semibold tracking-wider">
                    &#8377; {Math.round(totalPrice)}
                  </p>
                </div>
              )}

              {/* price and guest detail */}
              <div
                className={`absolute inset-x-2 top-12  mb-2 rounded border-2 border-red-700 bg-rose-50 px-2 py-1
                            ${
                              searchedRooms - totalRoomCount > 0 ||
                              searchedNumAdults - numGuests > 0 ||
                              searchedChildren - numChildren > 0
                                ? "block"
                                : "hidden"
                            }
            `}
              >
                <p className="font-medium text-red-700">
                  Proceed your booking by adding
                </p>
                <p className="flex items-center gap-5 text-sm font-medium">
                  {searchedRooms - totalRoomCount > 0 && (
                    <span>
                      {totalRoomCount > 1 ? "rooms:" : "room:"}{" "}
                      <strong>{searchedRooms - totalRoomCount}</strong>
                    </span>
                  )}
                  {searchedNumAdults - numGuests > 0 && (
                    <span>
                      {searchedNumAdults - numGuests > 1 ? "adults:" : "adult:"}{" "}
                      <strong>{searchedNumAdults - numGuests}</strong>
                    </span>
                  )}
                  {searchedChildren - numChildren > 0 && (
                    <span>
                      {"child:"}{" "}
                      <strong>{searchedChildren - numChildren}</strong>
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <p className="font-bold tracking-wide">
                  {numGuests} {numGuests > 1 ? "Adults" : "Adult"}{" "}
                  <span
                    className={`${numChildren >= 1 ? "inline-block" : "hidden"}`}
                  >
                    /
                  </span>{" "}
                  {numChildren >= 1 && numChildren}{" "}
                  {numChildren > 1 ? "Children" : numChildren == 1 && "Child"}{" "}
                  <span
                    className={`${totalRoomCount ? "inline-block" : "hidden"}`}
                  >
                    /
                  </span>{" "}
                  {totalRoomCount} {totalRoomCount > 1 ? "Rooms" : "Room"}
                </p>
              </div>

              {/* date and night detail */}
              <div className="mt-1">
                <div className="flex items-center gap-x-0.5">
                  <span>
                    {checkInDate.toString().includes("GMT+")
                      ? format(checkInDate, "MMM dd, yyyy")
                      : formatDateToCustomString(checkInDate.toISOString())}
                  </span>
                  <span>-</span>
                  <span>
                    {checkOutDate.toString().includes("GMT+")
                      ? format(checkOutDate, "MMM dd, yyyy")
                      : formatDateToCustomString(checkOutDate.toISOString())}
                  </span>
                  <span className="ml-2 font-bold">
                    {numNights} {numNights > 1 ? "Nights" : "Night"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col justify-between"> */}
          <div
            className={`${totalPrice === 0 ? "h-[15vh] sm:h-full" : "h-full"} w-full overflow-hidden`}
          >
            <p className="mb-2 font-bold tracking-wide">
              {totalPrice > 0 ? "Selected plans" : "No Plan Selected"}
            </p>
            {totalPrice > 0 && (
              <div
                className={`container-snap ${totalPrice === 0 ? "h-full" : "h-[20vh] md:h-[15vh] lg:h-[28vh] xl:h-[30vh]"}  w-full space-y-1 overflow-y-scroll`}
              >
                {roomsList.map((planInfo: RoomDetails, index: number) => (
                  <BookingPriceCard
                    key={index}
                    planIndex={index}
                    planInfo={planInfo}
                  />
                ))}
              </div>
            )}
          </div>

          {/* </div> */}
          <button
            onClick={handleBookNowButtonClick}
            className={`${
              hotelAuthStatus &&
              // numGuests >= searchedNumAdults &&
              roomsList.length > 0
                ? "bg-primary"
                : "bg-red-500"
            } w-full rounded border-0 p-2.5 text-center font-bold tracking-wide outline-none`}
          >
            Book Now
          </button>
        </div>
      )}
    </>
  );
}
