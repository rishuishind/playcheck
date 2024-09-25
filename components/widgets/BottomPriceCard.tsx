import {
  selectNumberOfNights,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
  selectRoomsList,
  selectTotalChildrenCount,
  selectTotalGuestsCount,
  selectTotalGuestsOccupancy,
  selectTotalRoomCost,
  selectTotalRoomsCount,
  selectTotalTax,
  selectBookingCardLoading,
} from "@/lib/redux/bookingSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import RoomsFooterSkeleton from "../skeleton/RoomsFooterSkeleton";
import { Router } from "next/router";

type Props = {
  isScrolled: boolean;
  handleBooking: any;
};

export default function BottomPriceCard({ isScrolled, handleBooking }: Props) {
  const totalPrice = useSelector(selectTotalRoomCost);
  const totalTax = useSelector(selectTotalTax);
  const numOfNights = useSelector(selectNumberOfNights);
  const totalRoomCount = useSelector(selectTotalRoomsCount);
  const roomsList = useSelector(selectRoomsList);
  const searchedNumAdults = useSelector(selectSearchedAdultsCount);
  const searchedChildren = useSelector(selectSearchedChildrenCount);
  const numGuests = useSelector(selectTotalGuestsCount);
  const numChildren = useSelector(selectTotalChildrenCount);
  const bookingCardLoading = useSelector(selectBookingCardLoading);

  const [isLoading, setIsLoading] = useState(false);

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

    // Cleanup listeners on unmount
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);
  const hotelAuthStatus = true;

  return isLoading || bookingCardLoading ? (
    <div className="sticky inset-x-0 bottom-0 z-20 w-full bg-white shadow-[0px_0px_18px_rgba(0,0,0,0.2)]">
      <RoomsFooterSkeleton />
    </div>
  ) : (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={isScrolled ? "visible" : "hidden"}
      transition={{ duration: 0.4 }}
      className="sticky inset-x-0 bottom-0 z-20 w-full bg-white shadow-[0px_0px_18px_rgba(0,0,0,0.2)]"
    >
      <div className="w-full bg-primary text-xs md:hidden">
        <div className="wrapper py-1.5">
          <div className="flex items-center gap-1">
            <p className="text-lightText">
              <strong className="text-inherit">{totalRoomCount}</strong>{" "}
              {totalRoomCount > 1 ? "rooms" : "room"}
            </p>
            <p className="text-lightText">|</p>
            <p className="text-lightText">
              Fits
              <strong className="text-inherit"> {numGuests} </strong>
              {numGuests > 1 ? "adults " : "adult "}
              {numChildren > 0 && (
                <>
                  and
                  <strong className="text-inherit"> {numChildren}</strong> child
                  <span> </span>
                </>
              )}
              out of{" "}
              <strong className="text-inherit">{searchedNumAdults}</strong>{" "}
              {searchedNumAdults > 1 ? "adults " : "adult "}
              {searchedChildren > 0 && (
                <>
                  and
                  <strong className="text-inherit">
                    {" "}
                    {searchedChildren}
                  </strong>{" "}
                  child
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="flex w-full items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <p className="text-lg font-semibold tracking-wide text-secondary">
                ₹ {Math.round(totalPrice)}
              </p>
              <p className="text-sm font-medium text-gray-700">
                + ₹{Math.round(totalTax)} <span>Taxes</span>
              </p>
            </div>
            <p className="text-sm font-medium md:hidden">
              <strong>{totalRoomCount}</strong>{" "}
              {totalRoomCount > 1 ? "Rooms " : "Room "}
              for
              <strong> {numOfNights} </strong>
              {numOfNights > 1 ? "Nights" : "Night"}
            </p>

            <div className="hidden items-center gap-1 text-sm md:flex">
              <p>
                <strong>{totalRoomCount}</strong>{" "}
                {totalRoomCount > 1 ? "Rooms " : "Room "}
                for
                <strong> {numOfNights} </strong>
                {numOfNights > 1 ? "Nights" : "Night"}
              </p>
              <p>|</p>
              <p>
                Fits
                <strong> {numGuests} </strong>
                {numGuests > 1 ? "adults " : "adult "}
                {numChildren > 0 && (
                  <>
                    and
                    <strong> {numChildren}</strong> child
                    <span> </span>
                  </>
                )}
                out of <strong>{searchedNumAdults}</strong>{" "}
                {searchedNumAdults > 1 ? "adults " : "adult "}
                {searchedChildren > 0 && (
                  <>
                    and
                    <strong> {searchedChildren}</strong> child
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className={`${
              hotelAuthStatus && roomsList.length > 0
                ? "bg-primary hover:bg-primary/80"
                : "bg-red-500"
            } text-lightText rounded-md p-2 px-4 font-semibold tracking-wide`}
          >
            Reserve
          </button>
          {/* <Link
            href="#booking-card"
            // className={`${
            //   hotelAuthStatus &&
            //   (numGuests >= totalGuestOccupancy
            //     ? numGuests >= searchedNumAdults
            //     : totalGuestOccupancy >= searchedNumAdults) &&
            //   numChildren >= searchedChildren &&
            //   totalRoomCount >= searchedRooms &&
            //   totalRoomCount > 0
            //     ? "bg-primary hover:bg-primary/80"
            //     : "bg-red-500"
            // } text-lightText rounded-md p-2 px-4 font-semibold tracking-wide`}
            className="rounded-md p-2 px-4 font-semibold tracking-wide text-black bg-primary"
          >
            Reserve
          </Link> */}
        </div>
      </div>
    </motion.div>
  );
}
