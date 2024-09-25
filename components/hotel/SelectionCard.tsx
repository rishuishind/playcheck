import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import dynamic from "next/dynamic";
import DesktopGuestSelection from "../navbar/DesktopGuestSelection";
const BadgeCheckIcon = dynamic(
  () => import("@heroicons/react/solid/BadgeCheckIcon"),
  { ssr: false },
);
const LockClosedIcon = dynamic(
  () => import("@heroicons/react/solid/LockClosedIcon"),
  { ssr: false },
);
// const MinusIcon = dynamic(() => import("@heroicons/react/solid/MinusIcon"), {
//   ssr: false,
// });
// const PlusIcon = dynamic(() => import("@heroicons/react/solid/PlusIcon"), {
//   ssr: false,
// });

type Props = {
  checkinDate: Date;
  checkoutDate: Date;
  guestCount: number;
  childCount: number;
  roomCount: number;
  setDesktopCalender: Function;
  desktopCalender: boolean;
  setDesktopGuests: Function;
  desktopGuests: boolean;
  setRoomCount: any;
  setGuestCount: any;
  setChildrenCount: any;
  dateRangeHandler: any;
  handlePriceSearch: (s, e) => void;
  guestCountHandler: any;
  childCountHandler: any;
  roomCountHandler: any;
  childAges: number[];
  handleChildAgeChange: Function;
  isSearchButtonDisabled: boolean;
};

export default function SelectionCard({
  checkinDate,
  checkoutDate,
  guestCount,
  childCount,
  roomCount,
  setDesktopCalender,
  desktopCalender,
  setDesktopGuests,
  desktopGuests,
  setRoomCount,
  setGuestCount,
  setChildrenCount,
  dateRangeHandler,
  handlePriceSearch,
  guestCountHandler,
  childCountHandler,
  roomCountHandler,
  childAges,
  handleChildAgeChange,
  isSearchButtonDisabled,
}: Props) {
  const [checkIn, setCheckIn] = useState<Date>(checkinDate);
  const [checkOut, setCheckOut] = useState<Date>(checkoutDate);
  const [isDateSelected, setIsDateSelected] = useState(false);

  useEffect(() => {
    setCheckIn(checkinDate);
    setCheckOut(checkoutDate);
  }, [checkinDate, checkoutDate]);

  const setBookingDate = (checkIn: Date, checkOut: Date) => {
    if (checkIn == checkOut) {
      setCheckOut(addDays(checkOut, 1));
    } else {
      setCheckOut(checkOut);
    }
    setCheckIn(checkIn);
    dateRangeHandler(checkIn, checkOut);
    setDesktopGuests(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="hidden h-fit w-full flex-col justify-between gap-4 rounded-md bg-secondary p-3 md:flex">
          <div className="space-y-3">
            <div className="relative space-y-3 rounded-md">
              <div className="relative">
                <div className="flex divide-x-2 overflow-hidden rounded-md border-2">
                  <div>
                    <label htmlFor="checkin" className="sr-only">
                      Chekin date
                    </label>
                    <input
                      type="text"
                      autoFocus={checkIn === null}
                      readOnly
                      value={
                        checkoutDate > new Date() && checkIn !== null
                          ? format(checkIn, "yyyy-MM-dd")
                          : ""
                      }
                      placeholder="Checkin Date"
                      onClick={() => setDesktopCalender(true)}
                      className="h-12 w-full cursor-pointer border-none placeholder:text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout" className="sr-only">
                      Checkout date
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={
                        checkoutDate > new Date() && checkOut !== null
                          ? format(checkOut, "yyyy-MM-dd")
                          : ""
                      }
                      placeholder="Checkout Date"
                      onClick={() => setDesktopCalender(true)}
                      className="h-12 w-full cursor-pointer border-none placeholder:text-gray-700"
                    />
                  </div>
                </div>
                {desktopCalender && (
                  <div className="absolute right-0 top-[50px] z-50 overflow-hidden rounded-lg border-2 bg-white shadow-2xl">
                    {/* backdrop */}
                    <div
                      onClick={() => setDesktopCalender(false)}
                      className="fixed inset-0"
                    />

                    <div className="relative w-[640px] overflow-hidden bg-white">
                      <Calendar
                        checkInDate={checkIn}
                        checkOutDate={checkOut}
                        setCheckIn={setCheckIn}
                        setCheckOut={setCheckOut}
                        setBookingDate={setBookingDate}
                        desktopCalendar={desktopCalender}
                        isDateSelected={isDateSelected}
                        setIsDateSelected={setIsDateSelected}
                        primaryColor="005250"
                        spanText="Hello"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="rounded-md border-2 overflow-hidden">
                  <label htmlFor="guests" className="sr-only">
                    Select guests
                  </label>
                  <input
                    onClick={() => setDesktopGuests(!desktopGuests)}
                    name="guests"
                    type="text"
                    readOnly
                    value={`${guestCount} Adults, ${childCount} child, ${roomCount} ${roomCount > 1 ? "rooms" : "room"}`}
                    placeholder="Select Guests"
                    className="h-12 w-full cursor-pointer border-none px-4 focus:outline-none"
                  />
                </div>
                {desktopGuests && (
                  <div className="absolute right-0 z-30 h-fit rounded-md bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.1)]">
                    {/* backdrop */}
                    <div
                      onClick={() => setDesktopGuests(false)}
                      className="fixed inset-0"
                    />

                    {/* <div className="flex items-center justify-between">
                      <p className="font-medium text-black">Rooms</p>
                      <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 text-light">
                        <MinusIcon
                          onClick={() =>
                            roomCountHandler(-1, roomCount, setRoomCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                        <p className="grid w-5 place-items-center">
                          {roomCount}
                        </p>
                        <PlusIcon
                          onClick={() =>
                            roomCountHandler(1, roomCount, setRoomCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-black">Adults</p>
                      <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 text-light">
                        <MinusIcon
                          onClick={() =>
                            guestCountHandler(-1, guestCount, setGuestCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                        <p className="grid w-5 place-items-center">
                          {guestCount}
                        </p>
                        <PlusIcon
                          onClick={() =>
                            guestCountHandler(1, guestCount, setGuestCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-black">Childrens</p>
                      <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 text-light">
                        <MinusIcon
                          onClick={() =>
                            childCountHandler(-1, childCount, setChildrenCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                        <p className="grid w-5 place-items-center">
                          {childCount}
                        </p>
                        <PlusIcon
                          onClick={() =>
                            childCountHandler(1, childCount, setChildrenCount)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDesktopGuests(false);
                        handlePriceSearch(checkIn, checkOut);
                      }}
                      className="w-full rounded-md bg-secondary p-2 px-4 font-medium text-light"
                    >
                      Done
                    </button> */}

                    <DesktopGuestSelection
                      adults={guestCount}
                      rooms={roomCount}
                      child={childCount}
                      childAges={childAges}
                      handleChildAgeChange={handleChildAgeChange}
                      handleAdults={guestCountHandler}
                      handleRooms={roomCountHandler}
                      handleChild={childCountHandler}
                      handleSearch={() =>
                        handlePriceSearch(checkinDate, checkoutDate)
                      }
                      onClose={() => setDesktopGuests(false)}
                      isSearchButtonDisabled={isSearchButtonDisabled}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <p
            className={`lading-none -my-2 text-sm font-medium tracking-wide text-red-500 ${!isSearchButtonDisabled ? "block" : "hidden"}`}
          >
            Select child age
          </p>

          <button
            disabled={!isSearchButtonDisabled}
            onClick={() => handlePriceSearch(checkIn, checkOut)}
            className="rounded-md bg-primary p-3 font-medium tracking-wide text-light hover:bg-primary/95 disabled:bg-gray-400"
          >
            Show Prices
          </button>
        </div>

        <div className="flex w-full items-center gap-2 rounded-md border-2 border-secondary bg-green-100 p-3">
          <div className="h-7 w-7">
            <BadgeCheckIcon className="h-7 w-7 animate-bounce fill-green-600" />
          </div>
          <p className="text-sm font-semibold leading-none text-secondary">
            Lowest Price Guarantee
          </p>
        </div>

        <div className="hidden w-full items-center gap-2 rounded-md border-2 border-secondary bg-green-100 p-4 lg:flex">
          <div className="h-7 w-7">
            <LockClosedIcon className="h-7 w-7 fill-green-600" />
          </div>
          <p className="text-sm font-semibold leading-none text-secondary">
            Your details are secured with us
          </p>
        </div>
      </div>
    </>
  );
}
