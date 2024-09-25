import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
} from "@/lib/redux/bookingSlice";
import { fetchAllHotelsNameSearchHandler } from "@/lib/firebase/hotelHandler";
import { addDays } from "date-fns";
import MobileSearchbar from "@/components/navbar/MobileSearchbar";
import { compareDate, convertChildArrayOfObjectsIntoArrayOfNumbers, getDateDifference } from "@/lib/helper";
import DesktopSearchbar from "@/components/navbar/DesktopSearchbar";
import { searchHotelsWithCityNameOrHotelName } from "@/lib/handlers/searchHandler";
import { useRouter } from "next/router";
import Image from "next/image";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToHotelCityPage } from "@/lib/handlers/pageHandler";
import { SearchSkelleton } from "@/components/skeleton/HotelSkeletons";
import dynamic from "next/dynamic";
import MobileCalendar from "@/components/calendar/MobileCalendar";
import { toast, Toaster } from "sonner";
import MobileGuestSelection from "@/components/navbar/MobileGuestSelection";

type Search = {
  hotelName: string;
  checkIn: number;
  checkOut: number;
};

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});
const ArrowLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ArrowLeftIcon"),
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

export default function LandingSection() {
  const router = useRouter();
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchRoomsCount = useSelector(selectSearchedRoomsCount);
  const searchedGuestCount = useSelector(selectSearchedGuestsCount);
  const searchedAdultCount = useSelector(selectSearchedAdultsCount);
  const searchChildrenCount = useSelector(selectSearchedChildrenCount);
  const [checkin, setCheckin] = useState<Date>(new Date());
  const [checkout, setCheckout] = useState<Date>(addDays(new Date(), 1));
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [numGuests, setNumGuests] = useState<number>(2);
  const [numAdults, setNumAdults] = useState<number>(2);
  const [numRooms, setNumRooms] = useState<number>(1);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [child_age, setChild_age] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState<string>("");
  const LocalStorageKey = "recentSearches";
  const [recentSearches, setRecentSearches] = useState<Search[]>([]);
  const [algoliaCitySearchResults, setalgoliaCitySearchResults] = useState<
    any[]
  >([]);
  const [algoliaRegionSearchResults, setalgoliaRegionSearchResults] = useState<
    any[]
  >([]); // region part state
  const [fetchHotelNameLoading, setFetchHotelNameLoading] =
    useState<boolean>(false);
  const [showRecommendationList, setShowRecommendationList] =
    useState<boolean>(false);
  const [matchingList, setMatchingList] = useState<any[]>([]);
  const [hotelsNamesList, setHotelNamesList] = useState<any[]>([]);
  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string>("");
  const [searchInputMobile, setsearchInputMobile] = useState("");
  const [algoliaSearchResults, setAlgoliaSearchResults] = useState<any[]>([]);
  const [selectedHotel, setselectedHotel] = useState(
    "Search Hotel / City / Region",
  );
  const [selectedHotelCitySlug, setselectedHotelCitySlug] = useState("");
  const [selectedHotelRegionName, setselectedHotelRegionName] = useState("");
  const [searchLoadingModel, setsearchLoadingModel] = useState(false);

  // handle hotel model in mobile
  const [mobileHotelModel, setMobileHotelModel] = useState<boolean>(false);
  const handleMobileHotelModel = () => {
    setMobileHotelModel((prev: any) => !prev);
  };
  // handle calender model in mobile
  const [mobileCalenderModel, setMobileCalenderModel] =
    useState<boolean>(false);
  const handleMobileCalenderModel = () => {
    setMobileCalenderModel((prev: any) => !prev);
  };
  // handle guest model in mobile
  const [mobileGuestModel, setMobileGuestModel] = useState<boolean>(false);
  const handleMobileGuestModel = () => {
    setMobileGuestModel((prev: any) => !prev);
  };

  // handle calender model in desktop
  const [desktopCalenderModel, setDesktopCalenderModel] =
    useState<boolean>(false);
  const handleDesktopCalenderModel = (setState: boolean = false) => {
    setDesktopCalenderModel(setState);
    // setDesktopCalenderModel((prev: any) => !prev);
  };
  // handle guest model in desktop
  const [desktopGuestModel, setDesktopGuestModel] = useState<boolean>(false);
  const handleDesktopGuestModel = () => {
    setDesktopGuestModel((prev: any) => !prev);
  };

  // handle room count
  const handleRoomCount = (type: number) => {
    const totalGuests = numAdults + numChildren;

    if (type === 1) {
      // Increase the room count
      if (numRooms < 30) setNumRooms(numRooms + 1);
    } else {
      // Decrease the room count
      if (numRooms > 1) {
        const newRoomCount = numRooms - 1;
        const maxCapacity = newRoomCount * 4;

        if (totalGuests > maxCapacity) {
          const excessGuests = totalGuests - maxCapacity;
          const newAdultCount = Math.max(numAdults - excessGuests, 1); // Ensure at least 1 adult remains
          setNumAdults(newAdultCount);
        }
        setNumRooms(newRoomCount);
      }
    }
  };

  // handle guest count
  const handleAdultCount = (type: number) => {
    if (type === 1) {
      if (
        (numAdults + numChildren + 1) % (4 * numRooms) >= 1 &&
        numChildren + numAdults + 1 >= 4 * numRooms
      ) {
        setNumRooms(numRooms + 1);
      }
      if (numAdults < 30) setNumAdults(numAdults + 1);
    } else {
      if (
        numAdults + numChildren - 1 <= (numRooms - 1) * 4 &&
        numRooms > 1 &&
        numAdults > 1
      ) {
        setNumRooms(numRooms - 1);
      }
      if (numAdults > 1) setNumAdults(numAdults - 1);
    }
  };

  // hanlde children count
  const handleChildrenCount = (type: number) => {
    if (type === 1) {
      if (
        (numAdults + numChildren + 1) % (4 * numRooms) >= 1 &&
        numChildren + numAdults + 1 >= 4 * numRooms
      ) {
        setNumRooms(numRooms + 1);
      }
      if (numChildren < 8) setNumChildren(numChildren + 1);
    } else {
      if (
        numAdults + numChildren - 1 <= (numRooms - 1) * 4 &&
        numRooms > 1 &&
        numChildren > 0
      ) {
        setNumRooms(numRooms - 1);
      }
      if (numChildren > 0) setNumChildren(numChildren - 1);
    }
  };

  // const handleChildCount = (type: number) => {
  //   if (type === 1) {
  //     // Add child and age to array
  //     if (numChildren < 8) {
  //       setChild_age([...child_age, 0]); // Add initial age of 0 for new child
  //       handleChildrenCount(type);
  //     }
  //   } else {
  //     if (numChildren > 0) {
  //       child_age.splice(numChildren - 1, 1); // Remove last child's age
  //       setChild_age([...child_age]); // Update state with modified array
  //       handleChildrenCount(type);
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
      if (numChildren < 8) {
        setChild_age((prev) => [
          ...prev,
          { idx: index, age: 0, price: 0, status: true },
        ]);
        handleChildrenCount(type);
      }
    } else {
      if (numChildren > 0) {
        child_age.splice(numChildren - 1, 1);
        setChild_age([...child_age]);
        handleChildrenCount(type);
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

  // lcocal storage getItem
  useEffect(() => {
    const storedSearches = localStorage.getItem(LocalStorageKey);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // local storage setItem
  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // search handler
  const handleSearch = (query: string) => {
    setRecentSearches((prevSearches: any) => {
      const newSearches = [
        ...prevSearches,
        { query, checkIn: checkin, checkOut: checkout },
      ];
      return newSearches.slice(-3);
    });
  };

  const handleLocationChange = async (event: any) => {
    setSelectedHotelSlug("");
    const searchValue = event.target.value.toString().toLowerCase().trim();
    if (searchValue !== "") {
      setTimeout(async () => {
        let result = await searchHotelsWithCityNameOrHotelName(searchValue);
      }, 1000);

      const matchingHotels = hotelsNamesList.filter(
        ({ hotel_Name, hotel_Slug_Name }) =>
          hotel_Name.toLowerCase().includes(searchValue) ||
          hotel_Slug_Name.toLowerCase().includes(searchValue),
      );

      if (matchingHotels.length > 0) {
        setMatchingList(matchingHotels);
        setShowRecommendationList(true);
      } else {
        setMatchingList([]);
        setShowRecommendationList(false);
      }
    } else {
      setMatchingList([]);
      setShowRecommendationList(false);
    }
  };

  const handleLocationOnclick = async () => {
    setFetchHotelNameLoading(true);
    setMatchingList(hotelsNamesList);

    if (hotelsNamesList.length === 0) {
      let hotelsList = await fetchAllHotelsNameSearchHandler();
      setMatchingList(hotelsList);
      setHotelNamesList(hotelsList);
    }

    setFetchHotelNameLoading(false);
  };

  // handle list item click
  const handleMobileHotelNameListClick = (
    hotelName: string,
    hotelSlugName: string,
  ) => {
    setSearchInput(hotelName);
    setSelectedHotelSlug(hotelSlugName);
  };
  // handle desktop list item click
  const handleDesktopHotelNameListClick = (
    hotelName: string,
    hotelSlugName: string,
  ) => {
    setSearchInput(hotelName);
    setSelectedHotelSlug(hotelSlugName);
    setShowRecommendationList(false);
    handleDesktopCalenderModel(true);
  };

  // handle initial data when the page loads
  useEffect(() => {
    setCheckin(checkInDate);
    setCheckout(checkOutDate);
    setNumRooms(searchRoomsCount);
    setNumAdults(searchedAdultCount);
    setNumChildren(searchChildrenCount);
    setNumGuests(searchedGuestCount);
  }, [
    checkInDate,
    checkOutDate,
    searchRoomsCount,
    searchedAdultCount,
    searchChildrenCount,
    searchedGuestCount,
  ]);

  // ramge constant
  const dateSelectionRange = {
    startDate: checkin,
    endDate: checkout,
    key: "selection",
  };

  // handle calender range checkIn and checkOut date
  const rangeHandler = (startDate, endDate) => {
    const chk = compareDate(startDate, endDate);
    if (chk) {
      setCheckin(startDate);
      setCheckout(addDays(endDate, 1));
    } else if (getDateDifference(startDate, endDate) > 31) {
      setCheckin(startDate);
      setCheckout(addDays(startDate, 31));
      setDesktopCalenderModel(false);
      setMobileCalenderModel(false);
      setMobileGuestModel(true);
      setDesktopGuestModel(true);
    } else {
      setCheckin(startDate);
      setCheckout(endDate);
      setDesktopCalenderModel(false);
      setMobileCalenderModel(false);
      setMobileGuestModel(true);
      setDesktopGuestModel(true);
    }
  };

  const searchHandler = () => {
    if (!checkin || !checkout) {
      toast.error("Please select checkin and checkout date");
      return;
    }

    let params = new PageRouterQueryParams(router);
    params.checkin = checkin;
    params.checkout = checkout;
    params.num_nights = getDateDifference(checkin, checkout);
    params.num_guests = numGuests;
    params.num_adults = numAdults;
    params.num_rooms = numRooms;
    params.num_children = numChildren;
    params.hotelSlugFromSearch = selectedHotelSlug;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

    // to get splited region slug which in the form of hotels-in-ranthambore-|-sawai-madhopur
    if (selectedHotelCitySlug == "") {
      toast.warning("please select property/city/region name");
      return;
    } else {
      let str = selectedHotelRegionName;
      let parts = str?.split("|-");
      let regionSplitSlugName = parts?.[1]?.trim();
      routerToHotelCityPage(
        selectedHotelCitySlug,
        regionSplitSlugName === undefined ? "" : regionSplitSlugName,
        params,
      );
    }
  };

  async function algolia_hotel_search_index(query: string) {
    if (query == "") {
      setAlgoliaSearchResults([]);
      return;
    }
    setsearchLoadingModel(true);
    fetch(`/api/search/hotels?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAlgoliaSearchResults(data.hits);
      });
  }
  //  region part api fetch
  async function algolia_Region_search_index(query: string) {
    if (query == "") {
      setalgoliaRegionSearchResults([]);
      return;
    }
    setsearchLoadingModel(true);
    fetch(`/api/search/region?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setalgoliaRegionSearchResults(data.hits);
      });
  }

  //only run search api after 500ms when user stops typing
  useEffect(() => {
    if (searchInputMobile != "") {
      setAlgoliaSearchResults([]);
      setalgoliaCitySearchResults([]);
      setsearchLoadingModel(true);
    }

    const timeoutId = setTimeout(() => {
      algolia_hotel_search_index(searchInputMobile);
      algolia_Region_search_index(searchInputMobile);
      setsearchLoadingModel(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInputMobile]);

  useEffect(() => {
    const handleOverflow = () => {
      const isMobileScreen = window.matchMedia("(max-width: 1024px)").matches;
      if (
        isMobileScreen &&
        (mobileHotelModel || mobileCalenderModel || mobileGuestModel)
      ) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleOverflow();

    window.addEventListener("resize", handleOverflow);
    return () => {
      window.removeEventListener("resize", handleOverflow);
      document.body.style.overflow = "auto";
    };
  }, [mobileHotelModel, mobileCalenderModel, mobileGuestModel]);

  useEffect(() => {
    const uniqueHotelsMap = new Map();
    const uniqueCities = algoliaSearchResults.filter((element) => {
      if (element.hotel_City_Slug) {
        if (!uniqueHotelsMap.has(element.hotel_City_Slug)) {
          uniqueHotelsMap.set(element.hotel_City_Slug, true);
          return true;
        }
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

  const result: any = findMatchingKeyValue(array, searchInputMobile);

  return (
    <div className="relative mb-32 h-[470px] w-full lg:mb-[0px] lg:h-[570px]">
      <Toaster position="top-center" />

      {mobileHotelModel && (
        <div className="fixed inset-0 z-50 h-full w-full bg-gray-100 p-4">
          <div className="fixed inset-x-0 top-0 bg-secondary p-4">
            <div className="flex items-center gap-x-2 overflow-hidden rounded bg-white px-2">
              <ArrowLeftIcon
                onClick={handleMobileHotelModel}
                className="h-5 w-5 fill-secondary"
              />
              <input
                type="text"
                autoFocus
                placeholder={selectedHotel}
                className="w-full border-0 px-2 outline-none placeholder:text-black"
                onChange={(e: any) => {
                  setsearchInputMobile(e.target.value);
                }}
                value={searchInputMobile}
              />
            </div>
          </div>

          <div className="relative mt-20 h-full overflow-y-scroll bg-white">
            {searchLoadingModel && <SearchSkelleton />}

            {result.matched !== undefined &&
            Object.keys(result.matched)?.[0] == "hotel_City" ? (
              <div
                onClick={() => {
                  setselectedHotel(result.matched.hotel_City.hotel_City);
                  setAlgoliaSearchResults([]);
                  setalgoliaCitySearchResults([]);
                  setselectedHotelCitySlug(
                    result.matched.hotel_City.hotel_City_Slug,
                  );
                  setsearchInputMobile("");
                  setalgoliaRegionSearchResults([]);
                  setMobileHotelModel(false);
                  setMobileCalenderModel(true);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base`}
              >
                <p className="flex items-center gap-1 font-medium text-black">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {result.matched?.hotel_City?.hotel_City}
                </p>
                <p className="text-sm font-medium">City </p>
              </div>
            ) : result.matched !== undefined &&
              Object.keys(result.matched)?.[0] === "hotel_Name" ? (
              <div
                onClick={() => {
                  setSelectedHotelSlug(result?.matched?.hotel_Name?.objectID);
                  setselectedHotel(
                    result?.matched?.hotel_Name?.hotel_Name +
                      ", " +
                      result?.matched?.hotel_Name?.hotel_City +
                      ", " +
                      result?.matched?.hotel_Name?.hotel_State,
                  );
                  setsearchInputMobile("");
                  setAlgoliaSearchResults([]);
                  setselectedHotelCitySlug(
                    result?.matched?.hotel_Name?.hotel_City_Slug,
                  );
                  setMobileHotelModel(false);
                }}
                className="w-full cursor-pointer border-b bg-white p-4 hover:bg-primary"
              >
                <p className="whitespace-nowrap font-medium">
                  {result?.matched?.hotel_Name?.hotel_Name}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <p>
                    {result?.matched?.hotel_Name?.hotel_City},{" "}
                    {result?.matched?.hotel_Name?.hotel_State}
                  </p>
                  <p className="pb-3 text-sm font-medium">Hotel</p>
                </div>
              </div>
            ) : result.matched !== undefined &&
              Object.keys(result.matched)?.[0] === "hotelCityRegion_Name" ? (
              <div
                onClick={() => {
                  result?.matched?.hotelCityRegion_Name?.hotelCityRegion_Name;
                  setselectedHotel(
                    result?.matched?.hotelCityRegion_Name?.hotelCityRegion_Name,
                  );
                  setAlgoliaSearchResults([]);
                  setalgoliaCitySearchResults([]);
                  setselectedHotelCitySlug(
                    result?.matched?.hotelCityRegion_Name?.hotelCity_Slug_Name,
                  );
                  setselectedHotelRegionName(
                    result?.matched?.hotelCityRegion_Name
                      ?.hotelCityRegion_Slug_Name,
                  );
                  setsearchInputMobile("");
                  setMobileHotelModel(false);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base `}
              >
                <p className="flex items-center gap-1 font-medium text-black">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {result?.matched?.hotelCityRegion_Name?.hotelCityRegion_Name}
                </p>
                <p className="text-sm font-medium">Region </p>
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
                  setselectedHotelCitySlug(item.hotel_City_Slug);
                  setsearchInputMobile("");
                  setalgoliaRegionSearchResults([]);
                  setMobileHotelModel(false);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                  index === algoliaCitySearchResults.length - 1
                    ? ""
                    : "border-b-2"
                }`}
              >
                <p className="flex items-center gap-1 font-medium">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {item.hotel_City}
                </p>
                <p className="text-sm font-medium">City </p>
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
                  setselectedHotelRegionName(item.hotelCityRegion_Slug_Name);
                  setsearchInputMobile("");
                  setMobileHotelModel(false);
                  setMobileCalenderModel(true);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-4 text-sm text-gray-600 hover:bg-primary sm:text-base ${
                  index === algoliaRegionSearchResults.length - 1
                    ? ""
                    : "border-b-2"
                }`}
              >
                <p className="flex items-center gap-1 font-medium">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {item.hotelCityRegion_Name}
                </p>
                <p className="text-sm font-medium">Region </p>
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
                  setsearchInputMobile("");
                  setAlgoliaSearchResults([]);
                  setselectedHotelCitySlug(item.hotel_City_Slug);
                  setMobileHotelModel(false);
                  setMobileCalenderModel(true);
                }}
                className="w-full cursor-pointer border-b bg-white p-4 hover:bg-primary"
              >
                <p className="whitespace-nowrap font-medium">
                  {item.hotel_Name}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <p>
                    {item.hotel_City}, {item.hotel_State}
                  </p>
                  <p className="pb-3 text-sm font-medium">Hotel</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            <button
              onClick={() => setMobileHotelModel(false)}
              className="h-12 w-full rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button>
          </div> */}
        </div>
      )}
      {mobileCalenderModel && (
        <div className="fixed inset-0 z-50 h-full w-full bg-gray-100 p-4 lg:hidden">
          <div className="mt-4 grid w-full place-items-center rounded-lg bg-white">
            <div className="relative h-[550px] w-[280px] overflow-hidden">
              <MobileCalendar
                checkInDate={checkin}
                checkOutDate={checkout}
                setCheckIn={setCheckin}
                setCheckOut={setCheckout}
                isDateSelected={isDateSelected}
                setIsDateSelected={setIsDateSelected}
                mobileCalendar={mobileCalenderModel}
                primaryColor="005250"
                spanText="Book Now with Staybook.in"
                setBookingDate={rangeHandler}
                setMobileCalendar={setMobileCalenderModel}
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            <button
              onClick={handleMobileCalenderModel}
              className="h-12 w-full rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button>
          </div>
        </div>
      )}
      {mobileGuestModel && (
        <div className="fixed inset-0 z-50 h-full w-full bg-gray-100 p-4 lg:hidden">
          <div
            onClick={handleMobileGuestModel}
            className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between gap-x-4 bg-secondary p-3 text-xl font-medium text-white"
          >
            <p>Select guests</p>
            <XIcon className="h-6 w-6" />
          </div>

          <div className="mt-16 rounded-lg bg-white p-4">
            <MobileGuestSelection
              adults={numAdults}
              rooms={numRooms}
              child={numChildren}
              childAges={child_age}
              handleChildAgeChange={handleChildAgeChange}
              handleAdults={handleAdultCount}
              handleRooms={handleRoomCount}
              handleChild={handleChildCount}
              handleSearch={searchHandler}
              onClose={handleMobileGuestModel}
              isSearchButtonDisabled={isSearchButtonDisabled}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
            {/* <button
              onClick={handleMobileGuestModel}
              className="absolute bottom-3 left-4 right-4 h-12 rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
            >
              Update
            </button> */}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 h-[320px] bg-secondary  bg-gradient-to-b font-bold lg:h-[400px]"></div>

      <div className="wrapper relative mx-auto pt-36 ">
        <div className="text-center text-white sm:text-left lg:p-0">
          <div>
            <h1 className="relative mb-1 text-center font-dream text-4xl text-white sm:text-5xl lg:text-left lg:text-6xl">
              {router.pathname.startsWith("/hotels")
                ? "Explore Hotels"
                : "Book your stay from Staybook"}
            </h1>
          </div>

          <p className="lazy-heading text-sm tracking-wide text-white sm:text-xl">
            Where Every Stay Tells a Story. Premium Hotels, Travel Packages,
            Your Chapter of Luxury
          </p>
        </div>

        {/* Desktop searchbar */}
        <DesktopSearchbar
          searchedText={searchInput}
          selectedHotelSlug={selectedHotelSlug}
          setSelectedHotelSlug={setSelectedHotelSlug}
          checkIn={checkin}
          checkOut={checkout}
          setCheckin={setCheckin}
          setCheckout={setCheckout}
          noOfAdults={numAdults}
          noOfRooms={numRooms}
          noOfChildren={numChildren}
          childAges={child_age}
          setChildAges={setChild_age}
          handleChildAgeChange={handleChildAgeChange}
          isSearchButtonDisabled={isSearchButtonDisabled}
          showCalenderModel={handleDesktopCalenderModel}
          calenderState={desktopCalenderModel}
          rangeHandler={rangeHandler}
          dateSelectionObject={dateSelectionRange}
          showGuestModel={handleDesktopGuestModel}
          guestState={desktopGuestModel}
          handleSearch={handleSearch}
          showRecommendationList={showRecommendationList}
          matchingList={matchingList}
          isDateSelected={isDateSelected}
          setIsDateSelected={setIsDateSelected}
          handleListClick={handleDesktopHotelNameListClick}
          handleLocationChange={handleLocationChange}
          handleLocationOnclick={handleLocationOnclick}
          searchInput={searchInput}
          handleRoomCount={handleRoomCount}
          handleGuestCount={handleAdultCount}
          handleChildrenCount={handleChildCount}
        />

        {/* mobile searchbar */}
        <MobileSearchbar
          searchedText={searchInput}
          selectedHotelSlug={selectedHotelSlug}
          setSelectedHotelSlug={setSelectedHotelSlug}
          checkIn={checkin}
          checkOut={checkout}
          noOfAdults={numAdults}
          noOfRooms={numRooms}
          noOfChildren={numChildren}
          showHotelModel={handleMobileHotelModel}
          showCalenderModel={handleMobileCalenderModel}
          showGuestModel={handleMobileGuestModel}
          handleSearch={searchHandler}
          isDateSelected={isDateSelected}
          showRecommendationList={showRecommendationList}
          matchingList={matchingList}
          handleListClick={handleMobileHotelNameListClick}
          handleLocationChange={handleLocationChange}
          handleLocationOnclick={handleLocationOnclick}
          searchInput={searchInput}
          selectedItemFromSearch={selectedHotel}
          isSearchButtonDisabled={isSearchButtonDisabled}
        />
      </div>
    </div>
  );
}
