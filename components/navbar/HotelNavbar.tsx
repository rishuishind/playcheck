import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBookingInfo,
  selectCheckInDate,
  selectCheckOutDate,
  selectHotelName,
  selectNumberOfNights,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
  updateBookingDateRange,
} from "@/lib/redux/bookingSlice";
import { useRouter } from "next/router";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import {
  routerToHotelDetailPage,
  routerToAllRoomsPage,
} from "@/lib/handlers/pageHandler";
import {
  compareDate,
  convertChildArrayOfObjectsIntoArrayOfNumbers,
  convertChildUrlQueryIntoArrayOfObjects,
  getDateDifference,
} from "@/lib/helper";
import { fetchAllHotelsNameSearchHandler } from "@/lib/firebase/hotelHandler";
import dynamic from "next/dynamic";
import MobileCalendar from "../calendar/MobileCalendar";
import Calendar from "../calendar/Calendar";
import { formatDateToCustomString } from "@/lib/helper/timestampToDate";
import MobileGuestSelection from "./MobileGuestSelection";
import DesktopGuestSelection from "./DesktopGuestSelection";

const ArrowLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ArrowLeftIcon"),
  { ssr: false },
);
const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
  { ssr: false },
);
const MinusCircleIcon = dynamic(
  () => import("@heroicons/react/solid/MinusCircleIcon"),
  { ssr: false },
);
const PlusCircleIcon = dynamic(
  () => import("@heroicons/react/solid/PlusCircleIcon"),
  { ssr: false },
);
const SearchIcon = dynamic(() => import("@heroicons/react/solid/SearchIcon"), {
  ssr: false,
});
const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});

type Props = {
  roomsList: any[];
};

export default function HotelNavbar({ roomsList }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mobileEditOptions, setMobileEditOptions] = useState<boolean>(false);
  const handleEdit = () => {
    setMobileEditOptions((prev: any) => !prev);
  };

  const [showMobileCalenderModel, setShowMobileCalenderModel] =
    useState<boolean>(false);
  const handleMobileCalenderModel = () => {
    setShowMobileCalenderModel((prev: any) => !prev);
  };

  const [showMobileGuestModel, setShowMobileGuestModel] =
    useState<boolean>(false);
  const handleMobileGuestModel = () => {
    setShowMobileGuestModel((prev: any) => !prev);
  };

  const [showMobileHotelModel, setShowMobileHotelModel] =
    useState<boolean>(false);
  const [fetchHotelNameLoading, setFetchHotelNameLoading] =
    useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showRecommendationList, setShowRecommendationList] =
    useState<boolean>(false);
  const [matchingList, setMatchingList] = useState<any[]>([]);
  const [hotelsNamesList, setHotelNamesList] = useState<any[]>([]);
  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string>("");
  const [showCalenderModel, setShowCalenderModel] = useState<boolean>(false);
  const [guestModel, setGuestModel] = useState<boolean>(false);
  const [recommendationList, setRecommendationList] = useState<boolean>(false);

  const hotelName = useSelector(selectHotelName);
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const numOfNights = useSelector(selectNumberOfNights);
  const searchRoomsCount = useSelector(selectSearchedRoomsCount);
  const searchAdults = useSelector(selectSearchedAdultsCount);
  const searchChildrenCount = useSelector(selectSearchedChildrenCount);
  const searchGuests = useSelector(selectSearchedGuestsCount);

  const [checkin, setCheckin] = useState<Date>(checkInDate);
  const [checkout, setCheckout] = useState<Date>(checkOutDate);
  const [num_adults, setNum_adults] = useState<number>(searchAdults);
  const [num_guests, setNum_guests] = useState<number>(searchGuests);
  const [num_rooms, setNum_rooms] = useState<number>(searchRoomsCount);
  const [num_children, setNum_children] = useState<number>(searchChildrenCount);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(
    router.query?.checkin ? true : false,
  );

  // extract childAges from the router query
  const [child_age, setChild_age] = useState<any[]>(
    router.query?.child_age != ""
      ? convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[])
      : [],
  );

  useEffect(() => {
    setSearchInput(hotelName);
    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNum_adults(searchAdults);
    setNum_guests(searchAdults + searchChildrenCount);
    setNum_rooms(searchRoomsCount);
    setNum_children(searchChildrenCount);
  }, [
    checkInDate,
    checkOutDate,
    searchRoomsCount,
    searchAdults,
    searchChildrenCount,
    searchGuests,
    hotelName,
  ]);

  useEffect(() => {
    setChild_age(
      convertChildUrlQueryIntoArrayOfObjects(
        router.query?.child_age as any[],
      ),
    );
  }, [router.query]);

  const handleHotelModel = async () => {
    setShowRecommendationList(true);
    if (!showMobileHotelModel && hotelsNamesList.length === 0) {
      setShowMobileHotelModel(true);
      setFetchHotelNameLoading(true);
      let hotelsList = await fetchAllHotelsNameSearchHandler();
      setMatchingList(hotelsList);
      setHotelNamesList(hotelsList);
      setFetchHotelNameLoading(false);
    } else {
      setShowMobileHotelModel((prev: any) => !prev);
    }
    setShowRecommendationList(false);
  };

  // const handleHotelNameChange = (event: any) => {
  //   setSelectedHotelSlug("");
  //   setSearchInput(event.target.value);
  //   const searchValue = event.target.value.toString().toLowerCase().trim();

  //   if (searchValue !== "") {
  //     const matchingHotels = hotelsNamesList.filter(
  //       ({ hotel_Name, hotel_Slug_Name, hotel_City }) =>
  //         hotel_Name.toLowerCase().includes(searchValue) ||
  //         hotel_Slug_Name.toLowerCase().includes(searchValue) ||
  //         hotel_City.toLowerCase().includes(searchValue),
  //     );

  //     if (matchingHotels.length > 0) {
  //       setMatchingList(matchingHotels);
  //       setShowRecommendationList(true);
  //     } else {
  //       setMatchingList([]);
  //       setShowRecommendationList(false);
  //     }
  //   } else {
  //     setMatchingList([]);
  //     setShowRecommendationList(false);
  //   }
  // };

  const dateRangeHandler = (startDate: Date, endDate: Date) => {
    setShowCalenderModel(false);
    setShowMobileCalenderModel(false);
    setGuestModel(true);
    let chk = compareDate(startDate, endDate);
    if (chk) {
      setCheckin(startDate);
      setCheckout(addDays(endDate, 1));
    } else if (getDateDifference(startDate, endDate) > 31) {
      setCheckin(startDate);
      setCheckout(addDays(startDate, 31));
    } else {
      setCheckin(startDate);
      setCheckout(endDate);
    }
    // dispatch(
    //   updateBookingDateRange({
    //     checkInDate: startDate,
    //     checkOutDate: endDate,
    //     searchGuestCount: num_guests,
    //     searchedRoomCount: num_rooms,
    //     searchedChildrenCount: num_children,
    //   }),
    // );
    setGuestModel(true);
  };

  const searchHandler = () => {
    setShowCalenderModel(false);
    setShowMobileCalenderModel(false);
    setGuestModel(false);
    setMobileEditOptions(false);

    let params = new PageRouterQueryParams(router);
    params.isWebpage = router.query.isWebpage
      ? router.query.isWebpage + "" === "true"
        ? true
        : false
      : false;
    params.hotelSlugName = router.query.hotelInfo + "";
    params.checkin = checkin;
    params.checkout = checkout;
    params.num_nights = getDateDifference(checkin, checkout);
    params.num_rooms = num_rooms;
    params.num_adults = num_adults;
    params.num_children = num_children;
    params.num_guests = num_adults + num_children;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

    dispatch(
      updateBookingDateRange({
        checkInDate: checkin,
        checkOutDate: checkout,
        searchedRoomCount: num_rooms,
        searchAdultCount: num_adults,
        searchedChildrenCount: num_children,
        searchGuestCount: num_guests,
        searchedChildAgeList: child_age,
      }),
    );
    // let chk1 = compareDate(checkin, checkInDate);
    // let chk2 = compareDate(checkout, checkOutDate);
    // if (!chk1 || !chk2) {
    //   dispatch(resetBookingInfo());
    // }
    dispatch(resetBookingInfo());

    if (selectedHotelSlug !== "") {
      params.hotelSlugName = selectedHotelSlug;
      routerToHotelDetailPage(params);
    }
    // else if (
    //   router.pathname.includes("/rooms/")
    // ) {
    //   params.push = false;
    //   params.roomId = router.query.roomId + "";
    //   routerToRoomDetailPage(params);
    // }
    else if (router.pathname.includes("/rooms")) {
      routerToAllRoomsPage(params);
    } else {
      params.push = true;
      routerToHotelDetailPage(params);
    }
  };

  // find the max child number and max guest number from room List
  const getMaxAdultAndChildCountOfHotel = (rooms: any[]): number => {
    if (!rooms.length) return 4;

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
  const maxTotalOccupencyOfHotel = getMaxAdultAndChildCountOfHotel(roomsList);

  const adultCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (num_adults + num_children + 1) %
          (maxTotalOccupencyOfHotel * num_rooms) >=
          1 &&
        num_children + num_adults + 1 >= maxTotalOccupencyOfHotel * num_rooms
      ) {
        setNum_rooms(num_rooms + 1);
      }
      if (num_adults < 30) setNum_adults(num_adults + 1);
    } else {
      if (
        num_adults + num_children - 1 <=
          (num_rooms - 1) * maxTotalOccupencyOfHotel &&
        num_rooms > 1 &&
        num_adults > 1
      ) {
        setNum_rooms(num_rooms - 1);
      }
      if (num_adults > 1) setNum_adults(num_adults - 1);
    }
  };

  const roomCountHandler = (type: number) => {
    const totalGuests = num_adults + num_children;

    if (type === 1) {
      // Increase the room count
      if (num_rooms < 30) setNum_rooms(num_rooms + 1);
    } else {
      // Decrease the room count
      if (num_rooms > 1) {
        const newRoomCount = num_rooms - 1;
        const maxCapacity = newRoomCount * maxTotalOccupencyOfHotel;

        if (totalGuests > maxCapacity) {
          const excessGuests = totalGuests - maxCapacity;
          const newAdultCount = Math.max(num_adults - excessGuests, 1); // Ensure at least 1 adult remains
          setNum_adults(newAdultCount);
        }
        setNum_rooms(newRoomCount);
      }
    }
  };

  const childrenCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (num_adults + num_children + 1) %
          (maxTotalOccupencyOfHotel * num_rooms) >=
          1 &&
        num_children + num_adults + 1 >= maxTotalOccupencyOfHotel * num_rooms
      ) {
        setNum_rooms(num_rooms + 1);
      }
      if (num_children < 8) setNum_children(num_children + 1);
    } else {
      if (
        num_adults + num_children - 1 <=
          (num_rooms - 1) * maxTotalOccupencyOfHotel &&
        num_rooms > 1 &&
        num_children > 0
      ) {
        setNum_rooms(num_rooms - 1);
      }
      if (num_children > 0) setNum_children(num_children - 1);
    }
  };

  // // handle child count and age count
  // const handleChildCount = (type: number) => {
  //   if (type === 1) {
  //     // Add child and age to array
  //     if (num_children < 8) {
  //       setChild_age([...child_age, 0]); // Add initial age of 0 for new child
  //       childrenCountHandler(type);
  //     }
  //   } else {
  //     if (num_children > 0) {
  //       child_age.splice(num_children - 1, 1); // Remove last child's age
  //       setChild_age([...child_age]); // Update state with modified array
  //       childrenCountHandler(type);
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
      if (num_children < 8) {
        setChild_age((prev) => [
          ...prev,
          { idx: index, age: 0, price: 0, status: true },
        ]);
        childrenCountHandler(type);
      }
    } else {
      if (num_children > 0) {
        child_age.splice(num_children - 1, 1);
        setChild_age([...child_age]);
        childrenCountHandler(type);
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
  const isSearchButtonDisabled = child_age.every((age) => age !== 0);

  useEffect(() => {
    if (showMobileCalenderModel || showMobileGuestModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileCalenderModel, showMobileGuestModel]);

  return (
    <>
      {/* Mobile Calendar Range */}
      {showMobileCalenderModel && (
        <div className="fixed inset-0 z-40 h-full w-full bg-gray-100 p-4">
          <div
            onClick={handleMobileCalenderModel}
            className="fixed left-0 right-0 top-0 flex h-16 items-center gap-x-4 bg-secondary p-2 text-xl font-medium text-white"
          >
            <XIcon className="h-6 w-6" />
            <p>Select Dates</p>
          </div>
          <div className="itmes-center mt-16 flex justify-between rounded bg-white p-4">
            <p>{formatDateToCustomString(checkin.toISOString())}</p>
            <p className="rounded-full bg-primary px-3">{`${getDateDifference(
              checkin,
              checkout,
            )} Nights`}</p>
            <p>{formatDateToCustomString(checkout.toISOString())}</p>
          </div>

          <div className="mt-4 grid w-full place-items-center rounded-lg bg-white">
            <div className="relative h-[550px] w-[280px] overflow-hidden">
              <MobileCalendar
                checkInDate={checkin}
                checkOutDate={checkout}
                setBookingDate={dateRangeHandler}
                isDateSelected={isDateSelected}
                setIsDateSelected={setIsDateSelected}
                mobileCalendar={showMobileCalenderModel}
                primaryColor="005250"
                spanText="Book Hotel with Staybook.in"
                setMobileCalendar={setShowMobileCalenderModel}
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            <button
              onClick={() => {
                handleEdit();
                handleMobileCalenderModel();
                searchHandler();
              }}
              className="h-12 w-full rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Mobile Guest Modal */}
      {showMobileGuestModel && (
        <div className="fixed inset-0 z-40 h-full w-full bg-gray-100 p-2">
          <div
            onClick={handleMobileGuestModel}
            className="fixed left-0 right-0 top-0 flex h-16 items-center gap-x-4 bg-secondary p-2 text-xl font-medium text-white"
          >
            <XIcon className="h-6 w-6" />
            <p>Select guests</p>
          </div>

          {/* <div className="mt-20 rounded-lg bg-white p-4">
            <div className="mx-4 flex items-center gap-x-5 p-4">
              <p className="w-1/2 text-lg font-medium text-secondary">Adults</p>
              <div className="flex items-center gap-x-4">
                <MinusCircleIcon
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                  onClick={() => {
                    adultCountHandler(-1);
                  }}
                />
                <p className="w-4 font-medium text-secondary">{num_adults}</p>
                <PlusCircleIcon
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                  onClick={() => {
                    adultCountHandler(1);
                  }}
                />
              </div>
            </div>
            <div className="mx-4 flex items-center gap-x-5 p-4">
              <p className="w-1/2 text-lg font-medium text-secondary">
                Children
              </p>
              <div className="flex items-center gap-x-4">
                <MinusCircleIcon
                  onClick={() => {
                    childrenCountHandler(-1);
                  }}
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                />
                <p className="w-4 font-medium text-secondary">{num_children}</p>
                <PlusCircleIcon
                  onClick={() => {
                    childrenCountHandler(1);
                  }}
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                />
              </div>
            </div>
            <div className="mx-4 flex items-center gap-x-5 p-4">
              <p className="w-1/2 text-lg font-medium text-secondary">Rooms</p>
              <div className="flex items-center gap-x-4">
                <MinusCircleIcon
                  onClick={() => {
                    roomCountHandler(-1);
                  }}
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                />
                <p className="w-4 font-medium text-secondary">{num_rooms}</p>
                <PlusCircleIcon
                  onClick={() => {
                    roomCountHandler(1);
                  }}
                  className="h-7 w-7 cursor-pointer fill-primary/75"
                />
              </div>
            </div>
          </div> */}

          <div className="mt-16 rounded-lg bg-white p-4">
            <MobileGuestSelection
              adults={num_adults}
              rooms={num_rooms}
              child={num_children}
              childAges={child_age}
              handleChildAgeChange={handleChildAgeChange}
              handleAdults={adultCountHandler}
              handleRooms={roomCountHandler}
              handleChild={handleChildCount}
              handleSearch={searchHandler}
              onClose={() => {
                handleEdit();
                handleMobileGuestModel();
                searchHandler();
              }}
              isSearchButtonDisabled={isSearchButtonDisabled}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            {/* <button
              onClick={() => {
                handleEdit();
                handleMobileGuestModel();
                searchHandler();
              }}
              className="absolute bottom-3 left-4 right-4 h-12 rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button> */}
          </div>
        </div>
      )}

      {/* Mobile Hotel Model */}
      {showMobileHotelModel && (
        <div className="fixed inset-0 z-40 h-full w-full bg-gray-100 p-4">
          <div className="fixed left-0 right-0 top-0 bg-secondary p-4">
            <label className="flex items-center gap-x-2 overflow-hidden rounded bg-white px-2">
              <ArrowLeftIcon
                onClick={() => {
                  handleHotelModel();
                  setSearchInput(hotelName);
                  setSelectedHotelSlug("");
                }}
                className="h-5 w-5 fill-secondary"
              />
              <input
                type="text"
                className="h-12 w-full border-0 font-medium text-black outline-none"
                placeholder="Where you want to go"
                disabled={false}
                value={searchInput}
                readOnly
                // onChange={handleHotelNameChange}
              />
            </label>
          </div>
          <div className="relative mt-20 h-full overflow-y-scroll">
            <p className="sticky inset-x-0 top-0 bg-white p-4 text-lg font-medium">
              Our Hotels
            </p>
            {fetchHotelNameLoading && (
              <div
                className={`flex h-full w-full flex-col items-center justify-center overflow-y-scroll align-middle`}
              >
                <Image
                  alt="loading"
                  src={`/gifs/loading.gif`}
                  className={`mx-auto my-auto h-10 w-10`}
                  width={10}
                  height={10}
                />
              </div>
            )}
            {!fetchHotelNameLoading && (
              <div className="mb-1 flex flex-col pb-36">
                {matchingList.map(
                  (
                    {
                      hotel_Name,
                      hotel_Slug_Name,
                      hotel_City,
                      hotel_Star_Rating,
                    },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedHotelSlug(hotel_Slug_Name);
                        setSearchInput(hotel_Name);
                      }}
                      className="w-full border-b bg-white p-4"
                    >
                      <p className="whitespace-nowrap font-medium">
                        {hotel_Name}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <p>{`${hotel_Star_Rating} Star`}</p>
                        <p>{hotel_City}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            <button
              onClick={() => {
                handleEdit();
                handleHotelModel();
                searchHandler();
              }}
              className="h-12 w-full rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button>
          </div>
        </div>
      )}

      <div
        id="NavBar"
        className="hotelNav sticky top-0 z-30 flex h-auto min-h-fit w-full items-center justify-center bg-secondary"
      >
        <div className="wrapper h-full">
          {/* mobile hotelNav View */}
          <MobileNav
            hotelName={searchInput}
            checkIn={checkin}
            checkOut={checkout}
            NoOfAdults={num_adults}
            NoOfChild={num_children}
            NoOfRooms={num_rooms}
            handleEdit={handleEdit}
            mobileEditState={mobileEditOptions}
            showHotelModel={handleHotelModel}
            showCalenderModel={handleMobileCalenderModel}
            showGuestModel={handleMobileGuestModel}
            handleSearch={searchHandler}
            isSearchButtonDisabled={isSearchButtonDisabled}
          />

          {/* tab and above screen hotelNav View */}
          <div className="hotelNav hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <div className="flex w-full flex-col space-y-1">
                  <span className="w-full whitespace-nowrap text-left text-xs font-medium text-white">
                    PROPERTY NAME
                  </span>
                  <input
                    className="w-56 whitespace-nowrap rounded-lg border-0 bg-black/25 px-4 py-2 font-medium text-white outline-none xl:w-72"
                    disabled={true}
                    value={searchInput}
                    readOnly
                    // onChange={handleHotelNameChange}
                    placeholder={`Enter the name of the property`}
                  />
                </div>
                {/* {recommendationList && (
                  <div className="container-snap font-medium absolute top-20 -mt-3 left-0 overflow-y-scroll h-[370px] w-[288px] bg-primary p-2 rounded-lg z-40">
                    <div
                      onClick={() => setRecommendationList(false)}
                      className="fixed inset-0"
                    />

                    <ul className="relative w-full space-y-2 whitespace-normal">
                      {matchingList.map(
                        (recommendation: string, index: number) => (
                          <li
                            onClick={() => {
                              setSearchInput(recommendation);
                              setRecommendationList(false);
                            }}
                            key={index}
                            className="text-gray-600 cursor-pointer p-4 rounded-md hover:bg-white"
                          >
                            {recommendation}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )} */}
              </div>

              <div className="relative flex items-center gap-x-4">
                <button
                  className="flex w-full flex-col space-y-1"
                  onClick={() => setShowCalenderModel(true)}
                >
                  <span className="whitespace-nowrap text-left text-xs font-medium text-white">
                    CHECKIN - CHECKOUT
                  </span>
                  <span className="space-x-1 rounded-lg bg-black/25 px-4 py-2 text-light">
                    <span className="whitespace-nowrap font-medium text-white">
                      {checkin.toString().includes("GMT+")
                        ? format(checkin, "MMM dd, yyyy")
                        : formatDateToCustomString(checkin.toISOString())}
                    </span>
                    <span>-</span>
                    <span className="whitespace-nowrap font-medium text-white">
                      {checkout.toString().includes("GMT+")
                        ? format(checkout, "MMM dd, yyyy")
                        : formatDateToCustomString(checkout.toISOString())}
                    </span>
                  </span>
                </button>

                {showCalenderModel && (
                  <div className="absolute left-0 top-20 -mt-3 rounded-lg bg-white px-2 shadow-2xl lg:-left-1/2">
                    {/* backdrop */}
                    <div
                      onClick={() => setShowCalenderModel(false)}
                      className="fixed inset-0"
                    />

                    <div className="relative w-[680px] overflow-hidden rounded-2xl bg-white">
                      <Calendar
                        checkInDate={checkin}
                        checkOutDate={checkout}
                        setBookingDate={dateRangeHandler}
                        isDateSelected={isDateSelected}
                        setIsDateSelected={setIsDateSelected}
                        primaryColor="005250"
                        spanText="Book Hotel with Staybook.in"
                        desktopCalendar={showCalenderModel}
                        setShowDesktopCalendar={setShowCalenderModel}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setGuestModel(true)}
                  className="flex flex-col gap-y-1"
                >
                  <span className="text-xs font-medium text-white">GUESTS</span>
                  <span className="w-full whitespace-nowrap rounded-lg bg-black/25 px-4 py-2 font-medium text-white">
                    {`${num_adults} Adults . ${num_children} Child . ${num_rooms} Rooms`}
                  </span>
                </button>

                {guestModel && (
                  <div className="absolute left-0 top-20 -mt-3 rounded-lg bg-white shadow-lg">
                    {/* backdrop */}
                    <div
                      onClick={() => setGuestModel(false)}
                      className="fixed inset-0"
                    />

                    {/* <div className="relative flex w-full flex-col space-y-2">
                      <div className="flex items-center gap-x-5">
                        <p className="w-1/2 font-medium text-secondary">
                          Adults
                        </p>
                        <div className="flex items-center gap-x-4">
                          <MinusCircleIcon
                            onClick={() => {
                              adultCountHandler(-1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                          <button className="w-4 border-0 font-medium text-secondary outline-none">
                            {num_adults}
                          </button>
                          <PlusCircleIcon
                            onClick={() => {
                              adultCountHandler(1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-5">
                        <p className="w-1/2 font-medium text-secondary">
                          Children
                        </p>
                        <div className="flex items-center gap-x-4">
                          <MinusCircleIcon
                            onClick={() => {
                              childrenCountHandler(-1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                          <button className="w-4 border-0 font-medium text-secondary outline-none">
                            {num_children}
                          </button>
                          <PlusCircleIcon
                            onClick={() => {
                              childrenCountHandler(1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-5">
                        <p className="w-1/2 font-medium text-secondary">
                          Rooms
                        </p>
                        <div className="flex items-center gap-x-4">
                          <MinusCircleIcon
                            onClick={() => {
                              roomCountHandler(-1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                          <button className="w-4 border-0 font-medium text-secondary outline-none">
                            {num_rooms}
                          </button>
                          <PlusCircleIcon
                            onClick={() => {
                              roomCountHandler(1);
                            }}
                            className="h-7 w-7 cursor-pointer fill-primary/75"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={searchHandler}
                          className="rounded-lg bg-[#EFBA03] px-5 py-2 text-white"
                        >
                          Done
                        </button>
                      </div>
                    </div> */}
                    <DesktopGuestSelection
                      adults={num_adults}
                      rooms={num_rooms}
                      child={num_children}
                      childAges={child_age}
                      handleChildAgeChange={handleChildAgeChange}
                      handleAdults={adultCountHandler}
                      handleRooms={roomCountHandler}
                      handleChild={handleChildCount}
                      handleSearch={searchHandler}
                      onClose={() => setGuestModel(false)}
                      isSearchButtonDisabled={isSearchButtonDisabled}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={!isSearchButtonDisabled}
              onClick={searchHandler}
              className="mt-auto whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-bold text-white disabled:bg-gray-400"
            >
              Update Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const MobileNav: React.FC<{
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  NoOfAdults: number;
  NoOfChild: number;
  NoOfRooms: number;
  handleEdit: () => void;
  mobileEditState: boolean;
  showHotelModel: () => void;
  showCalenderModel: () => void;
  showGuestModel: () => void;
  handleSearch: () => void;
  isSearchButtonDisabled: boolean;
}> = ({
  hotelName,
  checkIn,
  checkOut,
  NoOfAdults,
  NoOfChild,
  NoOfRooms,
  handleEdit,
  mobileEditState,
  showHotelModel,
  showCalenderModel,
  showGuestModel,
  handleSearch,
  isSearchButtonDisabled,
}) => {
  return (
    <div className="sticky top-0 h-full w-full lg:hidden">
      <p className="line-clamp-1 text-lg font-medium text-white">{hotelName}</p>
      <div className="flex items-center justify-between gap-x-4 py-1 text-white">
        <div className="flex items-center gap-x-1 text-xs sm:text-sm">
          <p>
            {checkIn.toString().includes("GMT+")
              ? format(checkIn, "MMM dd, yyyy")
              : formatDateToCustomString(checkIn.toISOString())}
          </p>
          <p>-</p>
          <p>
            {checkOut.toString().includes("GMT+")
              ? format(checkOut, "MMM dd, yyyy")
              : formatDateToCustomString(checkOut.toISOString())}
            ,
          </p>
          <p>
            {NoOfRooms} {NoOfRooms > 1 ? "rooms," : "room,"}
          </p>
          <p>{NoOfAdults} Adults</p>
          {NoOfChild > 0 && <p>, {NoOfChild} Child</p>}
        </div>
        <button
          className="flex items-center gap-x-1 rounded-full border p-1 px-3 text-sm leading-none tracking-wider"
          onClick={handleEdit}
        >
          Edit
          <ChevronDownIcon
            className={`${
              !mobileEditState ? "rotate-180" : ""
            } h-4 w-4 rounded-full transition-all duration-200`}
          />
        </button>
      </div>

      {mobileEditState && (
        <div className="my-3 w-full rounded-lg">
          <div>
            <div className="rounded bg-black/25 px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-primary">Property</p>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <div className="flex w-full items-start gap-x-2 overflow-hidden text-lg font-medium">
                <SearchIcon className="mt-1.5 h-4 w-4" />
                <p className={`relative w-full overflow-hidden`}>{hotelName}</p>
              </div>
            </div>
          </div>

          <div
            onClick={showCalenderModel}
            className="my-4 flex items-center gap-x-4"
          >
            <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-primary">Check-in</p>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <p className="flex items-center gap-x-2 text-lg font-medium">
                {format(checkIn, "MMM dd, yyyy")}
              </p>
            </div>
            <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-primary">Check-out</p>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <p className="flex items-center gap-x-2 text-lg font-medium">
                {format(checkOut, "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div
            onClick={showGuestModel}
            className="my-4 flex items-center gap-x-4"
          >
            <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-primary">
                  Adults & child
                </p>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <p className="flex items-center gap-x-2 text-lg font-medium">
                {NoOfAdults} Adults {NoOfChild > 0 && <>, {NoOfChild} Child</>}
              </p>
            </div>
            <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-primary">Rooms</p>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <p className="flex items-center gap-x-2 text-lg font-medium">
                {NoOfRooms} {NoOfRooms > 1 ? "Rooms" : "Room"}
              </p>
            </div>
          </div>

          <p
            className={`text-center text-sm font-medium tracking-wide text-red-500 ${!isSearchButtonDisabled ? "block" : "hidden"}`}
          >
            Select child age
          </p>

          <button
            disabled={!isSearchButtonDisabled}
            onClick={handleSearch}
            className="w-full rounded border-0 bg-primary px-2 py-3 text-lg font-bold tracking-wide outline-none disabled:bg-gray-400"
          >
            Update Search
          </button>
        </div>
      )}
    </div>
  );
};
