import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
  selectSearchedText,
  updateBookingDateRange,
} from "@/lib/redux/bookingSlice";
import { useRouter } from "next/router";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToAllRoomsPage } from "@/lib/handlers/pageHandler";
import {
  compareDate,
  getDateDifference,
  addDays,
  convertChildArrayOfObjectsIntoArrayOfNumbers,
  convertChildUrlQueryIntoArrayOfObjects,
} from "@/lib/helper";
import { fetchAllHotelsNameSearchHandler } from "@/lib/firebase/hotelHandler";
import Image from "next/image";
import { SearchSkelleton } from "../skeleton/HotelSkeletons";
import dynamic from "next/dynamic";
import MobileGuestSelection from "./MobileGuestSelection";
import DesktopGuestSelection from "./DesktopGuestSelection";

function customFormat(date, customFormatStr) {
  const padZero = (number, length = 2) => {
    return number.toString().padStart(length, "0");
  };

  const tokens = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear().toString().slice(-2),
    MMMM: date.toLocaleString("default", { month: "long" }),
    MMM: date.toLocaleString("default", { month: "short" }),
    MM: padZero(date.getMonth() + 1),
    M: date.getMonth() + 1,
    dd: padZero(date.getDate()),
    d: date.getDate(),
    HH: padZero(date.getHours()),
    H: date.getHours(),
    hh: padZero(date.getHours() % 12 || 12),
    h: date.getHours() % 12 || 12,
    mm: padZero(date.getMinutes()),
    m: date.getMinutes(),
    ss: padZero(date.getSeconds()),
    s: date.getSeconds(),
    a: date.getHours() < 12 ? "AM" : "PM",
  };

  return customFormatStr.replace(
    /yyyy|yy|MMMM|MMM|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s|a/g,
    (matched) => tokens[matched],
  );
}

let MobileCalendar;
let Calendar;
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
const OfficeBuildingIcon = dynamic(
  () => import("@heroicons/react/solid/OfficeBuildingIcon"),
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
  search_title: any;
};

export const ReviewNavbar = (props: Props) => {
  const router = useRouter();
  const [searchInputMobile, setsearchInputMobile] = useState("");
  const [selectedHotel, setselectedHotel] = useState(
    props.search_title != ""
      ? props.search_title
      : "Search Hotel / City / Region",
  );
  const [searchHotelInput, setSearchHotelInput] = useState("");
  const [algoliaSearchResults, setAlgoliaSearchResults] = useState<any[]>([]);
  const [selectedHotelCitySlug, setselectedHotelCitySlug] = useState<any>(
    router.query.citySlugName || "",
  );
  const dispatch = useDispatch();
  const [mobileEditOptions, setMobileEditOptions] = useState<boolean>(false);
  const handleEdit = () => {
    setMobileEditOptions((prev: any) => !prev);
  };
  const [showMobileCalenderModel, setShowMobileCalenderModel] =
    useState<boolean>(false);
  const handleMobileCalenderModel = () => {
    setShowMobileCalenderModel((prev: any) => !prev);
    MobileCalendar = dynamic(
      () => import("@/components/calendar/MobileCalendar"),
      {
        ssr: false,
      },
    );
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

  const calenderModelRef = useRef<HTMLDivElement>(null);
  const [showCalenderModel, setShowCalenderModel] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calenderModelRef.current &&
        !calenderModelRef.current.contains(event.target as Node)
      ) {
        setShowCalenderModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // guest part
  const guestModelRef = useRef<HTMLDivElement>(null);
  const [guestModel, setGuestModel] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestModelRef.current &&
        !guestModelRef.current.contains(event.target as Node)
      ) {
        setGuestModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //
  const recommendationListRef = useRef<HTMLDivElement>(null);
  const [recommendationList, setRecommendationList] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        recommendationListRef.current &&
        !recommendationListRef.current.contains(event.target as Node)
      ) {
        setRecommendationList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function stringToDate(dateString) {
    if (!dateString) return false;
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  const textSearched = useSelector(selectSearchedText);
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchGuests = useSelector(selectSearchedGuestsCount);
  const searchAudlts = useSelector(selectSearchedAdultsCount);
  const searchRoomsCount = useSelector(selectSearchedRoomsCount);
  const searchChildrenCount = useSelector(selectSearchedChildrenCount);

  const searchedCheckInDate = stringToDate(router.query.checkin) || checkInDate;
  const searchedCheckOutDate =
    stringToDate(router.query.checkout) || checkOutDate;
  const guestSearchedCount =
    (router.query.num_guests && Number(router.query.num_guests)) ||
    searchGuests;
  const adultSearchedCount =
    (router.query.num_adults && Number(router.query.num_adults)) ||
    searchAudlts;
  const childenSearchedCount =
    (router.query.num_children && Number(router.query.num_children)) ||
    searchChildrenCount;
  const roomSearchedCount =
    (router.query.num_rooms && Number(router.query.num_rooms)) ||
    searchRoomsCount;

  const [checkin, setCheckin] = useState<Date>(searchedCheckInDate);
  const [checkout, setCheckout] = useState<Date>(searchedCheckOutDate);
  const [num_rooms, setNum_rooms] = useState<number>(roomSearchedCount);
  const [num_adults, setNum_adults] = useState<number>(adultSearchedCount);
  const [num_children, setNum_children] =
    useState<number>(childenSearchedCount);
  const [num_guests, setNum_guests] = useState<number>(
    adultSearchedCount + childenSearchedCount,
  );
  const [SelectedHotelRegionSlug, setselectedHotelRegionSlug] =
    useState<string>("");
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
    setCheckin(searchedCheckInDate);
    setCheckout(searchedCheckOutDate);
    setNum_guests(adultSearchedCount);
    setNum_rooms(roomSearchedCount);
    setNum_children(childenSearchedCount);
    setChild_age(convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[]));
  }, [router.query]);

  const [algoliaCitySearchResults, setalgoliaCitySearchResults] = useState<
    any[]
  >([]);
  const [algoliaRegionSearchResults, setAlgoliaRegionSearchResults] = useState<
    any[]
  >([]);

  const dateRangeHandler = (startDate, endDate) => {
    setShowCalenderModel(false);

    let chk = compareDate(startDate, endDate);
    if (chk) {
      setCheckin(startDate);
      setCheckout(addDays(endDate, 1));
    } else if (getDateDifference(startDate, endDate) > 15) {
      setCheckin(startDate);
      setCheckout(addDays(startDate, 15));
    } else {
      setCheckin(startDate);
      setCheckout(endDate);
    }
  };

  // count handlerssss
  const adultCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (num_adults + num_children + 1) % (4 * num_rooms) >= 1 &&
        num_children + num_adults + 1 >= 4 * num_rooms
      ) {
        setNum_rooms(num_rooms + 1);
      }
      if (num_adults < 16) setNum_adults(num_adults + 1);
    } else {
      if (
        num_adults + num_children - 1 <= (num_rooms - 1) * 4 &&
        num_rooms > 1
      ) {
        setNum_rooms(num_rooms - 1);
      }
      if (num_adults > 1) setNum_adults(num_adults - 1);
    }
  };

  const roomCountHandler = (type: number) => {
    if (type === 1) {
      if (num_rooms < 8) setNum_rooms(num_rooms + 1);
    } else {
      if (num_rooms > 1) setNum_rooms(num_rooms - 1);
    }
  };

  const childrenCountHandler = (type: number) => {
    if (type === 1) {
      if (
        (num_adults + num_children + 1) % (4 * num_rooms) >= 1 &&
        num_children + num_adults + 1 >= 4 * num_rooms
      ) {
        setNum_rooms(num_rooms + 1);
      }
      if (num_children < 8) setNum_children(num_children + 1);
    } else {
      if (
        num_adults + num_children - 1 <= (num_rooms - 1) * 4 &&
        num_rooms > 1
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
  const isSearchButtonDisabled = child_age && child_age.every((age) => age !== 0);

  const [searchInput, setSearchInput] = useState<string>("");
  const [showRecommendationList, setShowRecommendationList] =
    useState<boolean>(false);
  const [matchingList, setMatchingList] = useState<any[]>([]);
  const [hotelsNamesList, setHotelNamesList] = useState<any[]>([]);
  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string>("");

  const [searchLoadingModel, setsearchLoadingModel] = useState(false);

  async function algolia_hotel_search_index(query: string) {
    if (query == "") {
      setAlgoliaSearchResults([]);
      return;
    }
    fetch(`/api/search/hotels?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAlgoliaSearchResults(data.hits);
        setsearchLoadingModel(false);
      });
  }

  async function algolia_city_search_index(query: string) {
    if (query == "") {
      setalgoliaCitySearchResults([]);
      return;
    }

    fetch(`/api/search/city?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setalgoliaCitySearchResults(data.hits);
      });
  }

  async function algolia_Region_search_index(query: string) {
    if (query == "") {
      setAlgoliaRegionSearchResults([]);
      return;
    }

    fetch(`/api/search/region?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAlgoliaRegionSearchResults(data.hits);
      });
  }

  useEffect(() => {
    if (searchHotelInput != "") {
      setsearchLoadingModel(true);
      setAlgoliaSearchResults([]);
      setalgoliaCitySearchResults([]);
    }
    const timeoutId = setTimeout(() => {
      // algolia_city_search_index(searchHotelInput);
      algolia_hotel_search_index(searchHotelInput);
      algolia_Region_search_index(searchHotelInput);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchHotelInput]);

  const searchHandler = () => {
    let params = new PageRouterQueryParams(router);
    params.checkin = checkin;
    params.checkout = checkout;
    params.num_nights = getDateDifference(checkin, checkout);
    params.num_rooms = num_rooms;
    params.num_adults = num_adults;
    params.num_children = num_children;
    params.num_guests = num_guests;
    params.hotelSlugName = String(router.query?.hotelInfo);
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

    dispatch(
      updateBookingDateRange({
        checkInDate: checkin,
        checkOutDate: checkout,
        searchedRoomCount: num_rooms,
        searchAdultCount: num_adults,
        searchedChildrenCount: num_children,
        searchGuestCount: num_guests,
        searchedChildAgeList: child_age
      }),
    );

    // let str = SelectedHotelRegionSlug;
    // let parts = str?.split("|-");
    // let regionSplitSlugName = parts?.[1]?.trim();
    // routerToHotelCityPageWindowObj(
    //   selectedHotelCitySlug,
    //   regionSplitSlugName === undefined ? "" : regionSplitSlugName,
    //   params,
    // );
    routerToAllRoomsPage(params);
  };

  useEffect(() => {
    const uniqueHotelsMap = new Map();

    const uniqueCities = algoliaSearchResults.filter((element) => {
      if (!uniqueHotelsMap.has(element.hotel_City_Slug)) {
        uniqueHotelsMap.set(element.hotel_City_Slug, true);
        return true;
      }
      return false;
    });

    setalgoliaCitySearchResults(uniqueCities);
  }, [algoliaSearchResults]);

  const array = {
    hotel_City: algoliaCitySearchResults,
    hotel_Name: algoliaSearchResults,
    hotelCityRegion_Name: algoliaRegionSearchResults,
  };

  let matchedObject;
  const remainingObjects = {};
  function findMatchingKeyValue(obj, searchValue) {
    const searchValueLower = searchValue.toLowerCase();
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        remainingObjects[key] = [];
        for (const item of obj[key]) {
          let found = false;
          for (const nestedKey in item) {
            if (
              nestedKey === key &&
              typeof item[nestedKey] === "string" &&
              item[nestedKey].toLowerCase().includes(searchValueLower)
            ) {
              if (!matchedObject) {
                matchedObject = { [key]: item };
              }
              found = true;
              break;
            }
          }
          if (!found || matchedObject[key] !== item) {
            remainingObjects[key].push(item);
          }
        }
      } else {
        remainingObjects[key] = obj[key];
      }
    }
    return {
      matched: matchedObject,
      remaining: remainingObjects,
    };
  }

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

  const result: any = findMatchingKeyValue(array, searchHotelInput);

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
            <p>{customFormat(checkin, "dd, MMM")}</p>
            <p className="rounded-full bg-primary px-3">{`${getDateDifference(
              checkin,
              checkout,
            )} Nights`}</p>
            <p>{customFormat(checkout, "dd, MMM")}</p>
          </div>

          <div className="mt-4 grid w-full place-items-center rounded-lg bg-white">
            <div className="relative h-[550px] w-[280px] overflow-hidden">
              <MobileCalendar
                checkInDate={checkin}
                checkOutDate={checkout}
                isDateSelected={isDateSelected}
                setIsDateSelected={setIsDateSelected}
                primaryColor="005250"
                spanText="Book hotel with Staybook.in"
                mobileCalendar={showMobileCalenderModel}
                setMobileCalendar={handleMobileCalenderModel}
                setBookingDate={dateRangeHandler}
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
                  setSearchInput(textSearched);
                  setSelectedHotelSlug("");
                }}
                className="h-5 w-5 fill-secondary"
              />

              <input
                type="text"
                className="h-12 w-full border-0 font-medium text-black outline-none placeholder:text-black"
                placeholder={selectedHotel}
                disabled={true}
                value={searchHotelInput}
                onChange={(e) => {
                  setSearchHotelInput(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="relative mt-20 h-full overflow-y-scroll bg-white">
            {searchLoadingModel && <SearchSkelleton />}

            <div className="mb-1 flex flex-col pb-36">
              {result.matched !== undefined &&
              Object.keys(result.matched)?.[0] === "hotel_City" ? (
                <div
                  onClick={() => {
                    setselectedHotel(result.matched.hotel_City.hotel_City);
                    setAlgoliaSearchResults([]);
                    setalgoliaCitySearchResults([]);
                    setAlgoliaRegionSearchResults([]);
                    setselectedHotelCitySlug(
                      result.matched.hotel_City.hotel_City_Slug,
                    );
                    setsearchInputMobile("");
                    setSearchHotelInput("");
                    setShowMobileHotelModel(false);
                  }}
                  className={`sm:text-base" } flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600
                  hover:bg-primary`}
                >
                  <p className="flex items-center gap-1 font-medium">
                    <Image
                      alt="map_icon"
                      src="/map.svg"
                      width={20}
                      height={20}
                    />
                    {result.matched.hotel_City.hotel_City}
                  </p>
                  <p className="text-sm font-medium">City</p>
                </div>
              ) : result.matched !== undefined &&
                Object.keys(result.matched)?.[0] === "hotel_Name" ? (
                <div
                  onClick={() => {
                    setSelectedHotelSlug(result.matched.hotel_Name.objectID);
                    setselectedHotel(
                      result.matched.hotel_Name.hotel_Name +
                        ", " +
                        result.matched.hotel_Name.hotel_City +
                        ", " +
                        result.matched.hotel_Name.hotel_State,
                    );
                    setSearchHotelInput("");
                    setAlgoliaSearchResults([]);
                    setselectedHotelCitySlug(
                      result.matched.hotel_Name.hotel_City_Slug,
                    );
                    setShowMobileHotelModel(false);
                  }}
                  className="w-full cursor-pointer border-b bg-white p-4 hover:bg-primary "
                >
                  <p className="whitespace-nowrap font-medium">
                    {result.matched.hotel_Name.hotel_Name}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p>
                      {result.matched.hotel_Name.hotel_City},{" "}
                      {result.matched.hotel_Name.hotel_State}
                    </p>
                    <p className="text-sm font-medium">Hotel</p>
                  </div>
                </div>
              ) : result.matched !== undefined &&
                Object.keys(result.matched)?.[0] === "hotelCityRegion_Name" ? (
                <div
                  onClick={() => {
                    setselectedHotel(
                      result.matched.hotelCityRegion_Name.hotelCityRegion_Name,
                    );
                    setAlgoliaSearchResults([]);
                    setalgoliaCitySearchResults([]);
                    setselectedHotelCitySlug(
                      result.matched.hotelCityRegion_Name.hotelCity_Slug_Name,
                    );
                    setselectedHotelRegionSlug(
                      result.matched.hotelCityRegion_Name
                        .hotelCityRegion_Slug_Name,
                    );
                    setsearchInputMobile("");
                    setSearchHotelInput("");
                    setShowMobileHotelModel(false);
                  }}
                  className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base`}
                >
                  <p className="flex items-center gap-1 font-medium">
                    <Image
                      alt="map_icon"
                      src="/map.svg"
                      width={20}
                      height={20}
                    />
                    {result.matched.hotelCityRegion_Name.hotelCityRegion_Name}
                  </p>
                  <p className="text-sm font-medium">Region</p>
                </div>
              ) : (
                <div></div>
              )}
              {result?.remaining?.hotel_City?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setselectedHotel(item.hotel_City);
                    setAlgoliaSearchResults([]);
                    setalgoliaCitySearchResults([]);
                    setAlgoliaRegionSearchResults([]);
                    setselectedHotelCitySlug(item.hotel_City_Slug);
                    setsearchInputMobile("");
                    setSearchHotelInput("");
                    setShowMobileHotelModel(false);
                  }}
                  className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                    index === algoliaCitySearchResults.length - 1
                      ? ""
                      : "border-b-2"
                  }`}
                >
                  <p className="flex items-center gap-1 font-medium">
                    <Image
                      alt="map_icon"
                      src="/map.svg"
                      width={20}
                      height={20}
                    />
                    {item.hotel_City}
                  </p>
                  <p className="text-sm font-medium">City</p>
                </div>
              ))}
              {result.remaining.hotelCityRegion_Name?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setselectedHotel(item.hotelCityRegion_Name);
                    setAlgoliaSearchResults([]);
                    setalgoliaCitySearchResults([]);
                    setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                    setselectedHotelRegionSlug(item.hotelCityRegion_Slug_Name);
                    setsearchInputMobile("");
                    setSearchHotelInput("");
                    setShowMobileHotelModel(false);
                  }}
                  className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                    index === algoliaRegionSearchResults.length - 1
                      ? ""
                      : "border-b-2"
                  }`}
                >
                  <p className="flex items-center gap-1 font-medium">
                    <Image
                      alt="map_icon"
                      src="/map.svg"
                      width={20}
                      height={20}
                    />
                    {item.hotelCityRegion_Name}
                  </p>
                  <p className="text-sm font-medium">Region</p>
                </div>
              ))}
              {result.remaining.hotel_Name.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedHotelSlug(item.objectID);
                    setselectedHotel(
                      item.hotel_Name +
                        ", " +
                        item.hotel_City +
                        ", " +
                        item.hotel_State,
                    );
                    setSearchHotelInput("");
                    setAlgoliaSearchResults([]);
                    setselectedHotelCitySlug(item.hotel_City_Slug);
                    setShowMobileHotelModel(false);
                  }}
                  className="w-full cursor-pointer border-b bg-white p-4 hover:bg-primary "
                >
                  <p className="whitespace-nowrap font-medium">
                    {item.hotel_Name}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p>
                      {item.hotel_City}, {item.hotel_State}
                    </p>
                    <p className="text-sm font-medium">Hotel</p>
                  </div>
                </div>
              ))}

              {/* {algoliaCitySearchResults.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-lg font-bold tracking-wide text-secondary">
                    City
                  </p>
                  {algoliaCitySearchResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setselectedHotel(item.hotel_City);
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setAlgoliaRegionSearchResults([]);
                        setselectedHotelCitySlug(item.hotel_City_Slug);
                        setsearchInputMobile("");
                        setSearchHotelInput("");
                        setShowMobileHotelModel(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                        index === algoliaCitySearchResults.length - 1
                          ? ""
                          : "border-b-2"
                      }`}
                    >
                      <p className="flex items-center gap-1 font-medium">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {item.hotel_City}
                      </p>
                      <p className="text-sm font-medium">City / Region</p>
                    </div>
                  ))}
                </div>
              )}

              {algoliaRegionSearchResults.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-lg font-bold tracking-wide text-secondary">
                    Regions
                  </p>
                  {algoliaRegionSearchResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setselectedHotel(item.hotelCityRegion_Name);
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                        setselectedHotelRegionSlug(
                          item.hotelCityRegion_Slug_Name,
                        );
                        setsearchInputMobile("");
                        setSearchHotelInput("");
                        setShowMobileHotelModel(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                        index === algoliaRegionSearchResults.length - 1
                          ? ""
                          : "border-b-2"
                      }`}
                    >
                      <p className="flex items-center gap-1 font-medium">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {item.hotelCityRegion_Name}
                      </p>
                      <p className="text-sm font-medium">Region</p>
                    </div>
                  ))}
                </div>
              )}

              {algoliaSearchResults.length > 0 && (
                <div>
                  <p className="sticky inset-x-0 top-0 px-4 py-2 text-lg font-medium tracking-wide">
                    Our Hotels
                  </p>
                  {algoliaSearchResults.map((item, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedHotelSlug(item.objectID);
                        setselectedHotel(
                          item.hotel_Name +
                            ", " +
                            item.hotel_City +
                            ", " +
                            item.hotel_State,
                        );
                        setSearchHotelInput("");
                        setAlgoliaSearchResults([]);
                        setselectedHotelCitySlug(item.hotel_City_Slug);
                        setShowMobileHotelModel(false);
                      }}
                      className="w-full cursor-pointer border-b bg-white p-4 hover:bg-primary "
                    >
                      <p className="whitespace-nowrap font-medium">
                        {item.hotel_Name}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <p>
                          {item.hotel_City}, {item.hotel_State}
                        </p>
                        <p className="text-sm font-medium">Hotel</p>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            <button
              onClick={() => {
                setShowMobileHotelModel(false);
              }}
              className="h-12 w-full rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button>
          </div> */}
        </div>
      )}

      <div
        id="NavBar"
        className="sticky top-0 z-30 flex h-auto min-h-fit w-full items-center justify-center bg-secondary"
      >
        <div className="wrapper h-full">
          {/* mobile hotelNav View */}
          <MobileNav
            hotelName={selectedHotel}
            checkIn={checkin}
            checkOut={checkout}
            isDateSelected={isDateSelected}
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
          <div className="hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <div className="flex w-full flex-col space-y-1">
                  <span className="w-full whitespace-nowrap text-left text-xs font-medium text-white">
                    AREA, LANDMARK OR PROPERTY NAME
                  </span>
                  <input
                    className="w-56 whitespace-nowrap rounded-lg border-0 bg-black/25 px-4 py-2 font-medium text-white outline-none placeholder:text-white xl:w-72"
                    disabled={true}
                    value={searchHotelInput}
                    onChange={(e) => {
                      setSearchHotelInput(e.target.value);
                    }}
                    placeholder={selectedHotel}
                  />
                </div>
                <div
                  className={`container-snap absolute left-0 top-[62px] z-40 h-auto max-h-[500px] w-[425px] overflow-y-scroll rounded-b-lg bg-white p-2 font-medium shadow-[0px_0px_7px_rgba(0,0,0,0.2)] ${
                    algoliaCitySearchResults.length > 0 ||
                    algoliaSearchResults.length > 0
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {searchLoadingModel && <SearchSkelleton />}

                  {result.matched !== undefined &&
                  Object.keys(result.matched)?.[0] === "hotel_City" ? (
                    <div
                      onClick={() => {
                        setselectedHotel(result.matched.hotel_City.hotel_City);
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setAlgoliaRegionSearchResults([]);
                        setselectedHotelCitySlug(
                          result.matched.hotel_City.hotel_City_Slug,
                        );
                        setsearchInputMobile("");
                        setSearchHotelInput("");
                      }}
                      className={`flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary`}
                    >
                      <p className="flex items-center gap-1">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {result.matched.hotel_City.hotel_City}
                      </p>
                      <p>City</p>
                    </div>
                  ) : result.matched !== undefined &&
                    Object.keys(result.matched)?.[0] === "hotel_Name" ? (
                    <div
                      onClick={() => {
                        setSelectedHotelSlug(
                          result.matched.hotel_Name.objectID,
                        );
                        setselectedHotel(
                          result.matched.hotel_Name.hotel_Name +
                            ", " +
                            result.matched.hotel_Name.hotel_City +
                            ", " +
                            result.matched.hotel_Name.hotel_State,
                        );
                        setSearchHotelInput("");
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setselectedHotelCitySlug(
                          result.matched.hotel_Name.hotel_City_Slug,
                        );
                      }}
                      className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary`}
                    >
                      <div className="flex items-center gap-1">
                        <div>
                          <OfficeBuildingIcon className="h-8 w-8" />
                        </div>
                        <p className="text-sm">
                          {result.matched.hotel_Name.hotel_Name},{" "}
                          {result.matched.hotel_Name.hotel_City},{" "}
                          {result.matched.hotel_Name.hotel_State}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-secondary">Hotel</p>
                    </div>
                  ) : result.matched !== undefined &&
                    Object.keys(result.matched)?.[0] ===
                      "hotelCityRegion_Name" ? (
                    <div
                      onClick={() => {
                        setselectedHotel(
                          result.matched.hotelCityRegion_Name
                            .hotelCityRegion_Name,
                        );
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setselectedHotelCitySlug(
                          result.matched.hotelCityRegion_Name
                            .hotelCity_Slug_Name,
                        );
                        setselectedHotelRegionSlug(
                          result.matched.hotelCityRegion_Name
                            .hotelCityRegion_Slug_Name,
                        );

                        setsearchInputMobile("");
                        setSearchHotelInput("");
                      }}
                      className={` flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary`}
                    >
                      <p className="flex items-center gap-1">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {
                          result.matched.hotelCityRegion_Name
                            .hotelCityRegion_Name
                        }
                      </p>
                      <p>Region</p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {result?.remaining?.hotel_City?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setselectedHotel(item.hotel_City);
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setAlgoliaRegionSearchResults([]);
                        setselectedHotelCitySlug(item.hotel_City_Slug);
                        setsearchInputMobile("");
                        setSearchHotelInput("");
                      }}
                      className={`flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary ${
                        index === algoliaCitySearchResults.length - 1
                          ? ""
                          : "border-b-2"
                      }`}
                    >
                      <p className="flex items-center gap-1">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {item.hotel_City}
                      </p>
                      <p>City</p>
                    </div>
                  ))}

                  {result.remaining.hotelCityRegion_Name?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setselectedHotel(item.hotelCityRegion_Name);
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                        setselectedHotelRegionSlug(
                          item.hotelCityRegion_Slug_Name,
                        );

                        setsearchInputMobile("");
                        setSearchHotelInput("");
                      }}
                      className={` flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary ${
                        index === algoliaRegionSearchResults.length - 1
                          ? ""
                          : "border-b-2"
                      }`}
                    >
                      <p className="flex items-center gap-1">
                        <Image
                          alt="map_icon"
                          src="/map.svg"
                          width={20}
                          height={20}
                        />
                        {item.hotelCityRegion_Name}
                      </p>
                      <p>Region</p>
                    </div>
                  ))}

                  {result.remaining.hotel_Name.map((item, index) => (
                    <div
                      onClick={() => {
                        setSelectedHotelSlug(item.objectID);
                        setselectedHotel(
                          item.hotel_Name +
                            ", " +
                            item.hotel_City +
                            ", " +
                            item.hotel_State,
                        );
                        setSearchHotelInput("");
                        setAlgoliaSearchResults([]);
                        setalgoliaCitySearchResults([]);
                        setselectedHotelCitySlug(item.hotel_City_Slug);
                      }}
                      key={index}
                      className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                        index === algoliaSearchResults.length - 1
                          ? ""
                          : "border-b-2"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <div>
                          <OfficeBuildingIcon className="h-8 w-8" />
                        </div>
                        <p className="text-sm">
                          {item.hotel_Name}, {item.hotel_City},{" "}
                          {item.hotel_State}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-secondary">Hotel</p>
                    </div>
                  ))}
                  {/* 
                  {algoliaCitySearchResults.length > 0 && (
                    <div className="bg-white">
                      <p className="pl-1 font-bold text-secondary">City</p>
                      {algoliaCitySearchResults.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setselectedHotel(item.hotel_City);
                            setAlgoliaSearchResults([]);
                            setalgoliaCitySearchResults([]);
                            setAlgoliaRegionSearchResults([]);
                            setselectedHotelCitySlug(item.hotel_City_Slug);
                            setsearchInputMobile("");
                            setSearchHotelInput("");
                          }}
                          className={`flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary ${
                            index === algoliaCitySearchResults.length - 1
                              ? ""
                              : "border-b-2"
                          }`}
                        >
                          <p className="flex items-center gap-1">
                            <Image
                              alt="map_icon"
                              src="/map.svg"
                              width={20}
                              height={20}
                            />
                            {item.hotel_City}
                          </p>
                          <p>City</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {algoliaRegionSearchResults.length > 0 && (
                    <div className="bg-white">
                      <p className="pl-1 font-bold text-secondary">Region</p>
                      {algoliaRegionSearchResults.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setselectedHotel(item.hotelCityRegion_Name);
                            setAlgoliaSearchResults([]);
                            setalgoliaCitySearchResults([]);
                            setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                            setselectedHotelRegionSlug(
                              item.hotelCityRegion_Slug_Name,
                            );

                            setsearchInputMobile("");
                            setSearchHotelInput("");
                          }}
                          className={` flex cursor-pointer justify-between text-ellipsis rounded p-2 py-3 text-sm text-gray-600 hover:bg-primary ${
                            index === algoliaRegionSearchResults.length - 1
                              ? ""
                              : "border-b-2"
                          }`}
                        >
                          <p className="flex items-center gap-1">
                            <Image
                              alt="map_icon"
                              src="/map.svg"
                              width={20}
                              height={20}
                            />
                            {item.hotelCityRegion_Name}
                          </p>
                          <p>Region</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {algoliaSearchResults.length > 0 && (
                    <div className="relative mt-1.5 w-full space-y-1">
                      <p className="pl-1 font-bold text-secondary">Hotels</p>
                      {algoliaSearchResults.map((item, index: number) => (
                        <div
                          onClick={() => {
                            setSelectedHotelSlug(item.objectID);
                            setselectedHotel(
                              item.hotel_Name +
                                ", " +
                                item.hotel_City +
                                ", " +
                                item.hotel_State,
                            );
                            setSearchHotelInput("");
                            setAlgoliaSearchResults([]);
                            setalgoliaCitySearchResults([]);
                            setselectedHotelCitySlug(item.hotel_City_Slug);
                          }}
                          key={index}
                          className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                            index === algoliaSearchResults.length - 1
                              ? ""
                              : "border-b-2"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <div>
                              <OfficeBuildingIcon className="h-8 w-8" />
                            </div>
                            <p className="text-sm">
                              {item.hotel_Name}, {item.hotel_City},{" "}
                              {item.hotel_State}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-secondary">
                            Hotel
                          </p>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              </div>

              <div className="relative flex items-center gap-x-4">
                <button
                  className="flex w-full flex-col space-y-1"
                  onClick={() => {
                    setShowCalenderModel(true);
                    Calendar = dynamic(
                      () => import("@/components/calendar/Calendar"),
                      { ssr: false },
                    );
                  }}
                >
                  <span className="whitespace-nowrap text-left text-xs font-medium text-white">
                    CHECKIN - CHECKOUT
                  </span>
                  <span className="space-x-1 rounded-lg bg-black/25 px-4 py-2 text-light">
                    <span className="whitespace-nowrap font-medium text-white">
                      {isDateSelected
                        ? checkin
                          ? customFormat(checkin, "MMM dd, yyyy")
                          : "Select Date Range"
                        : "Select Date Range"}
                    </span>
                    {isDateSelected && <span>-</span>}
                    <span className="whitespace-nowrap font-medium text-white">
                      {isDateSelected
                        ? checkout
                          ? customFormat(checkout, "MMM dd, yyyy")
                          : ""
                        : ""}
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
                        desktopCalendar={showCalenderModel}
                        setShowDesktopCalendar={setShowCalenderModel}
                        isDateSelected={isDateSelected}
                        setIsDateSelected={setIsDateSelected}
                        primaryColor="005250"
                        spanText="Book now with Staybook.in"
                        setBookingDate={dateRangeHandler}
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
              className="mt-auto flex items-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-white disabled:bg-gray-400"
            >
              Update Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileNav: React.FC<{
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  isDateSelected: boolean;
  NoOfAdults: number;
  NoOfChild: number;
  NoOfRooms: number;
  handleEdit: () => void;
  mobileEditState: boolean;
  showHotelModel: () => void;
  showCalenderModel: () => void;
  showGuestModel: () => void;
  handleSearch: any;
  isSearchButtonDisabled: boolean;
}> = ({
  hotelName,
  checkIn,
  checkOut,
  isDateSelected,
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
      <p className="line-clamp-1 text-xl font-medium text-white">{hotelName}</p>
      <div className="flex items-center justify-between gap-x-4 py-1 text-white">
        <div className="flex items-center gap-x-1">
          {isDateSelected && (
            <>
              <p>{customFormat(checkIn, "MMM dd")}</p>
              <p>-</p>
              <p>{customFormat(checkOut, "MMM dd")},</p>
            </>
          )}
          <p>{NoOfAdults} Adults</p>
          {NoOfChild > 0 && <p>{NoOfChild} Child</p>}
        </div>
        <button
          className="flex items-center gap-x-1 rounded-full border p-[1px] px-2 pl-3"
          onClick={handleEdit}
        >
          Edit
          <ChevronDownIcon
            className={`${
              !mobileEditState ? "rotate-180" : ""
            } h-6 w-6 rounded-full transition-all duration-200`}
          />
        </button>
      </div>

      {/*   Mobile search bar */}
      {mobileEditState && (
        <>
          <div className="mt-4 w-full rounded-lg">
            <div onClick={showHotelModel}>
              <div className="rounded bg-black/25 px-3 py-2 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-primary">Property</p>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
                <div className="flex w-full items-start gap-x-2 overflow-hidden text-lg font-medium">
                  <SearchIcon className="mt-1.5 h-4 w-4" />
                  <p className={`relative w-full overflow-hidden`}>
                    {hotelName}
                  </p>
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
                  {isDateSelected
                    ? checkIn
                      ? customFormat(checkIn, "MMM dd, yyyy")
                      : "Select Date"
                    : "Select Date"}
                </p>
              </div>
              <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-primary">Check-out</p>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
                <p className="flex items-center gap-x-2 text-lg font-medium">
                  {isDateSelected
                    ? checkOut
                      ? customFormat(checkOut, "MMM dd, yyyy")
                      : "Select Date"
                    : "Select Date"}
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
                  {NoOfAdults} Adults{" "}
                  {NoOfChild > 0 && <>, {NoOfChild} Child</>}
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
              className="mb-3 w-full rounded border-0 bg-primary px-2 py-2 text-lg font-medium text-secondary outline-none disabled:bg-gray-400"
            >
              <span className={`text-lg font-medium`}>Search</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
