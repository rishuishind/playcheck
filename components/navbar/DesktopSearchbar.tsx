import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { convertChildArrayOfObjectsIntoArrayOfNumbers, convertChildArrayToString, getDateDifference } from "@/lib/helper";
import { useDispatch } from "react-redux";
import { updateBookingDateRange } from "@/lib/redux/bookingSlice";
import { routerToHotelCityPage } from "@/lib/handlers/pageHandler";
import Image from "next/image";
import { HotelSearchSkelleton } from "../skeleton/HotelSkeletons";
import dynamic from "next/dynamic";
import Calendar from "../calendar/Calendar";
import { toast } from "sonner";
import DesktopGuestSelection from "./DesktopGuestSelection";

const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
);
const LocationMarkerIcon = dynamic(
  () => import("@heroicons/react/solid/LocationMarkerIcon"),
);
const MinusIcon = dynamic(() => import("@heroicons/react/solid/MinusIcon"));
const OfficeBuildingIcon = dynamic(
  () => import("@heroicons/react/solid/OfficeBuildingIcon"),
);
const PlusIcon = dynamic(() => import("@heroicons/react/solid/PlusIcon"));
const SearchIcon = dynamic(() => import("@heroicons/react/solid/SearchIcon"));
const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));

type Props = {
  searchedText: string;
  selectedHotelSlug: string;
  setSelectedHotelSlug: Function;
  checkIn: Date;
  checkOut: Date;
  setCheckin: Function;
  setCheckout: Function;
  noOfAdults: number;
  noOfRooms: number;
  noOfChildren: number;
  childAges: number[];
  setChildAges: Function;
  isSearchButtonDisabled: boolean;
  handleChildAgeChange: Function;
  showCalenderModel: Function;
  isDateSelected: boolean;
  setIsDateSelected: Function;
  calenderState: boolean;
  rangeHandler: Function;
  dateSelectionObject: any;
  showGuestModel: Function;
  guestState: boolean;
  handleRoomCount: Function;
  handleGuestCount: Function;
  handleChildrenCount: Function;
  handleSearch: Function;
  showRecommendationList: any;
  matchingList: any;
  handleListClick: Function;
  handleLocationChange: Function;
  handleLocationOnclick: Function;
  searchInput: string;
};

export default function DesktopSearchbar(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchInput, setsearchInput] = useState(""); // hotel sreach state initial
  const [selectedHotel, setselectedHotel] = useState(
    "Search Hotel / City / Region",
  ); // placeholder value
  const [selectedHotelCitySlug, setselectedHotelCitySlug] = useState("");
  const [selectedHotelRegionName, setselectedHotelRegionName] = useState("");
  const [searchHotelLoading, setsearchHotelLoading] = useState(false); // loading purpose
  const [searchSelectedCityName, setsearchSelectedCityName] = useState("");
  const [algoliaHotelSearchResults, setAlgoliaHotelSearchResults] = useState<
    any[]
  >([]);
  const [algoliaCitySearchResults, setalgoliaCitySearchResults] = useState<
    any[]
  >([]);
  const [algoliaRegionSearchResults, setalgoliaRegionSearchResults] = useState<
    any[]
  >([]); // region search state

  const searchHandler = () => {
    if (!props.checkIn || !props.checkOut) {
      toast.error("Please select checkin and checkout date");
      return;
    }

    let params = new PageRouterQueryParams(router);
    params.checkin = props.checkIn;
    params.checkout = props.checkOut;
    params.num_nights = getDateDifference(props.checkIn, props.checkOut);
    params.num_rooms = props.noOfRooms;
    params.num_adults = props.noOfAdults;
    params.num_children = props.noOfChildren;
    params.num_guests = props.noOfAdults + props.noOfChildren;
    params.hotelSlugFromSearch = props.selectedHotelSlug;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(props.childAges);

    dispatch(
      updateBookingDateRange({
        checkInDate: props.checkIn,
        checkOutDate: props.checkOut,
        searchedRoomCount: props.noOfRooms,
        searchAdultCount: props.noOfAdults,
        searchedChildrenCount: props.noOfChildren,
        searchGuestCount: props.noOfAdults + props.noOfChildren,
        searchedChildAgeList: props.childAges, // pass the formatted childAge
      }),
    );

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

  // appi hotel data fetch
  async function algolia_hotel_search_index(query: string) {
    if (query == "") {
      setAlgoliaHotelSearchResults([]);
      return;
    }
    fetch(`/api/search/hotels?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAlgoliaHotelSearchResults(data.hits);
      });
  }
  // region api fetch data
  async function algolia_region_search_index(query: string) {
    if (query == "") {
      setalgoliaRegionSearchResults([]);
      return;
    }
    fetch(`/api/search/region?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setalgoliaRegionSearchResults(data.hits);
      });
  }

  // async function algolia_City_search_index(query: string) {
  //   if (query == "") {
  //     setalgoliaRegionSearchResults([]);
  //     return;
  //   }
  //   fetch(`/api/search/city?q=${query}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setalgoliaRegionSearchResults(data.hits);
  //     });
  // }

  //only run search api after 500ms when user stops typing
  useEffect(() => {
    if (searchInput != "") {
      setAlgoliaHotelSearchResults([]);
      setalgoliaCitySearchResults([]);
      setalgoliaRegionSearchResults([]);
      setsearchHotelLoading(true);
    }

    const timeoutId = setTimeout(() => {
      setsearchHotelLoading(false);
      algolia_hotel_search_index(searchInput);
      algolia_region_search_index(searchInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const uniqueHotelsMap = new Map();
    const uniqueCities = algoliaHotelSearchResults.filter((element) => {
      // hotel_slug != undefined then return else
      if (element.hotel_City_Slug) {
        if (!uniqueHotelsMap.has(element.hotel_City_Slug)) {
          uniqueHotelsMap.set(element.hotel_City_Slug, true);
          return true;
        }
      }
      return false;
    });

    setalgoliaCitySearchResults(uniqueCities);
  }, [algoliaHotelSearchResults]);

  const array = {
    hotel_City: algoliaCitySearchResults,
    hotel_Name: algoliaHotelSearchResults,
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

  const result: any = findMatchingKeyValue(array, searchInput);
  return (
    <div className="z-50 mt-[140px] hidden h-36 w-full items-center justify-between gap-7 rounded-xl bg-white px-4 shadow-[0px_0px_9px_rgba(0,0,0,0.25)] lg:flex">
      {/* Location */}
      <div className="relative w-full cursor-pointer space-y-2">
        <p className="font-bold tracking-wide lg:text-sm xl:text-base">
          AREA, LANDMARK OR PROPERTY NAME
        </p>
        <div
          onClick={() => {
            props.handleLocationOnclick();
          }}
          className="flex items-center justify-between border-b border-secondary pb-1 font-medium"
        >
          <input
            type="text"
            placeholder={selectedHotel}
            className="w-full border-0 px-2 outline-none placeholder:text-black"
            onChange={(e: any) => {
              setsearchInput(e.target.value);
            }}
            value={searchInput}
          />
          {props.selectedHotelSlug == "" ? (
            <ChevronDownIcon className="h-6 w-6" />
          ) : (
            <XIcon
              className="h-6 w-6"
              onClick={() => {
                props.setSelectedHotelSlug("");
                setselectedHotel("Search Hotel or City");
              }}
            />
          )}
        </div>
        <div className="container-snap absolute top-[70px] max-h-[200px] w-full overflow-y-scroll rounded-lg bg-white font-medium shadow-[0px_0px_18px_rgba(0,0,0,0.14)]">
          <ul className="relative w-full whitespace-normal">
            {result.matched !== undefined &&
            Object.keys(result.matched)?.[0] === "hotel_City" ? (
              <div
                onClick={() => {
                  setselectedHotel(result.matched.hotel_City.hotel_City);
                  setsearchSelectedCityName(
                    result.matched.hotel_City.hotel_City_Slug,
                  );
                  setsearchInput("");
                  setselectedHotelCitySlug(
                    result.matched.hotel_City.hotel_City_Slug,
                  );
                  props.showCalenderModel(true);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-2 text-sm text-gray-600 hover:bg-primary`}
              >
                <p className="flex items-center gap-1">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {result.matched.hotel_City.hotel_City}
                </p>
                <p className="text-xs">City</p>
              </div>
            ) : result.matched !== undefined &&
              Object.keys(result.matched)?.[0] === "hotel_Name" ? (
              <div
                onClick={() => {
                  props.setSelectedHotelSlug(
                    result.matched.hotel_Name.objectID,
                  );
                  setselectedHotel(
                    result.matched.hotel_Name.hotel_Name +
                      ", " +
                      result.matched.hotel_Name.hotel_City +
                      ", " +
                      result.matched.hotel_Name.hotel_State,
                  );
                  setsearchInput("");
                  setAlgoliaHotelSearchResults([]);
                  setalgoliaRegionSearchResults([]);
                  setalgoliaCitySearchResults([]);
                  setselectedHotelCitySlug(
                    result.matched.hotel_Name.hotel_City_Slug,
                  );
                  props.showCalenderModel(true);
                }}
                className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary `}
              >
                <div className="flex items-center gap-1">
                  <div>
                    <OfficeBuildingIcon className="h-6 w-6" />
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
              Object.keys(result.matched)?.[0] === "hotelCityRegion_Name" ? (
              <div
                onClick={() => {
                  setselectedHotel(
                    result.matched.hotelCityRegion_Name.hotelCityRegion_Name,
                  );
                  setsearchInput("");
                  setselectedHotelRegionName(
                    result.matched.hotelCityRegion_Name
                      .hotelCityRegion_Slug_Name,
                  );
                  setselectedHotelCitySlug(
                    result.matched.hotelCityRegion_Name.hotelCity_Slug_Name,
                  );
                  props.showCalenderModel(true);
                }}
                className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary`}
              >
                <div className="flex items-center gap-1">
                  <div>
                    <LocationMarkerIcon className="h-6 w-6" />
                  </div>
                  <p className="text-sm">
                    {result.matched.hotelCityRegion_Name.hotelCityRegion_Name}
                  </p>
                </div>
                <p className="text-xs">Region</p>
              </div>
            ) : (
              <div></div>
            )}
            {result?.remaining?.hotel_City?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setselectedHotel(item.hotel_City);
                  setsearchSelectedCityName(item.hotel_City_Slug);
                  setsearchInput("");
                  setselectedHotelCitySlug(item.hotel_City_Slug);
                  props.showCalenderModel(true);
                }}
                className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-2 text-sm text-gray-600 hover:bg-primary ${
                  index === algoliaCitySearchResults.length - 1
                    ? ""
                    : "border-b-2"
                }`}
              >
                <p className="flex items-center gap-1">
                  <Image
                    title="map_icon"
                    alt="map_icon"
                    src="/map.svg"
                    width={20}
                    height={20}
                  />
                  {item.hotel_City}
                </p>
                <p className="text-xs">City</p>
              </div>
            ))}

            {result.remaining.hotelCityRegion_Name?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setselectedHotel(item.hotelCityRegion_Name);
                    setsearchInput("");
                    setselectedHotelRegionName(item.hotelCityRegion_Slug_Name);
                    setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                    props.showCalenderModel(true);
                  }}
                  className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                    index === algoliaRegionSearchResults.length - 1
                      ? ""
                      : "border-b-2"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <div>
                      <LocationMarkerIcon className="h-6 w-6" />
                    </div>
                    <p className="text-sm">{item.hotelCityRegion_Name}</p>
                  </div>
                  <p className="text-xs">Region</p>
                </div>
              ),
            )}

            {result.remaining.hotel_Name.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  props.setSelectedHotelSlug(item.objectID);
                  setselectedHotel(
                    item.hotel_Name +
                      ", " +
                      item.hotel_City +
                      ", " +
                      item.hotel_State,
                  );
                  setsearchInput("");
                  setAlgoliaHotelSearchResults([]);
                  setalgoliaRegionSearchResults([]);
                  setalgoliaCitySearchResults([]);
                  setselectedHotelCitySlug(item.hotel_City_Slug);
                  props.showCalenderModel(true);
                }}
                className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                  index === algoliaHotelSearchResults.length - 1
                    ? ""
                    : "border-b-2"
                }`}
              >
                <div className="flex items-center gap-1">
                  <div>
                    <OfficeBuildingIcon className="h-6 w-6" />
                  </div>
                  <p className="text-sm">
                    {item.hotel_Name}, {item.hotel_City}, {item.hotel_State}
                  </p>
                </div>
                <p className="text-sm font-bold text-secondary">Hotel</p>
              </div>
            ))}

            {/* 
            {algoliaCitySearchResults.length > 0 && (
              <div className="p-2">
                <p className="pl-1 font-bold text-secondary">City</p>
                {algoliaCitySearchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setselectedHotel(item.hotel_City);
                      setsearchSelectedCityName(item.hotel_City_Slug);
                      setsearchInput("");
                      setselectedHotelCitySlug(item.hotel_City_Slug);
                      props.showCalenderModel(true);
                    }}
                    className={`flex cursor-pointer items-center justify-between text-ellipsis rounded p-2 text-sm text-gray-600 hover:bg-primary ${
                      index === algoliaCitySearchResults.length - 1
                        ? ""
                        : "border-b-2"
                    }`}
                  >
                    <p className="flex items-center gap-1">
                      <Image
                        title="map_icon"
                        alt="map_icon"
                        src="/map.svg"
                        width={20}
                        height={20}
                      />
                      {item.hotel_City}
                    </p>
                    <p className="text-xs">City</p>
                  </div>
                ))}
              </div>
            )}
            {algoliaRegionSearchResults?.length > 0 && (
              <div className="p-2">
                <p className="pl-1 font-bold text-secondary">Regions</p>
                {algoliaRegionSearchResults?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setselectedHotel(item.hotelCityRegion_Name);
                      setsearchInput("");
                      setselectedHotelRegionName(
                        item.hotelCityRegion_Slug_Name,
                      );
                      setselectedHotelCitySlug(item.hotelCity_Slug_Name);
                      props.showCalenderModel(true);
                    }}
                    className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                      index === algoliaRegionSearchResults.length - 1
                        ? ""
                        : "border-b-2"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <div>
                        <LocationMarkerIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm">{item.hotelCityRegion_Name}</p>
                    </div>
                    <p className="text-xs">Region</p>
                  </div>
                ))}
              </div>
            )}

            {algoliaHotelSearchResults.length > 0 && (
              <div className="p-2">
                <p className="pl-1 font-bold text-secondary">Hotels</p>
                {algoliaHotelSearchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      props.setSelectedHotelSlug(item.objectID);
                      setselectedHotel(
                        item.hotel_Name +
                          ", " +
                          item.hotel_City +
                          ", " +
                          item.hotel_State,
                      );
                      setsearchInput("");
                      setAlgoliaHotelSearchResults([]);
                      setalgoliaRegionSearchResults([]);
                      setalgoliaCitySearchResults([]);
                      setselectedHotelCitySlug(item.hotel_City_Slug);
                      props.showCalenderModel(true);
                    }}
                    className={`flex cursor-pointer justify-between gap-2 rounded p-3 text-gray-600 hover:bg-primary ${
                      index === algoliaHotelSearchResults.length - 1
                        ? ""
                        : "border-b-2"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <div>
                        <OfficeBuildingIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm">
                        {item.hotel_Name}, {item.hotel_City}, {item.hotel_State}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-secondary">Hotel</p>
                  </div>
                ))}
              </div>
            )} */}

            {searchHotelLoading && <HotelSearchSkelleton />}
          </ul>
        </div>
      </div>

      {/* check in and check out */}
      <div className="relative w-full cursor-pointer space-y-2">
        <p className="font-bold tracking-wide lg:text-sm xl:text-base">
          CHECK IN - CHECK OUT
        </p>
        <div
          onClick={() => {
            props.showCalenderModel(true);
          }}
          className="flex items-center justify-between border-b border-secondary pb-1 font-medium"
        >
          <input
            type="text"
            value={
              props.isDateSelected
                ? (props.checkIn
                    ? format(props.checkIn, "dd, MMM yyyy")
                    : "Select Checkin ") +
                  " - " +
                  (props.checkOut
                    ? format(props.checkOut, "dd, MMM yyyy")
                    : " Select Checkout")
                : "Select Dates"
            }
            readOnly
            className="w-full border-0 bg-transparent px-2 outline-none"
          />
          <ChevronDownIcon className="h-6 w-6" />
        </div>
        {props.calenderState && (
          <>
            <div
              onClick={() => {
                props.showCalenderModel();
              }}
              className="fixed inset-0 z-20"
            />
            <div className="absolute left-0 top-[70px] z-50 mx-auto w-fit rounded-2xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)] lg:left-1/2 lg:-translate-x-1/2">
              <div className="relative w-[680px] overflow-hidden rounded-2xl bg-white">
                <Calendar
                  checkInDate={props.checkIn}
                  checkOutDate={props.checkOut}
                  isDateSelected={props.isDateSelected}
                  setIsDateSelected={props.setIsDateSelected}
                  setCheckIn={props.setCheckin}
                  setCheckOut={props.setCheckout}
                  desktopCalendar={true}
                  primaryColor="005250"
                  spanText="Book hotels with Staybook.in"
                  setBookingDate={props.rangeHandler}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* guests */}
      <div className="relative w-2/3 cursor-pointer space-y-2">
        <p className="font-bold tracking-wide lg:text-sm xl:text-base">
          ADD GUESTS
        </p>
        <div
          onClick={() => {
            props.showGuestModel();
          }}
          className="flex items-center justify-between border-b border-secondary pb-1 font-medium"
        >
          <input
            type="text"
            placeholder="Select Guests"
            value={`${props.noOfRooms} ${
              props.noOfRooms > 1 ? "Rooms" : "Room"
            } | ${props.noOfAdults} ${
              props.noOfAdults > 1 ? "Adults" : "Adult"
            } | ${props.noOfChildren} ${
              props.noOfChildren > 1 ? "Childrens" : "Children"
            }`}
            readOnly
            className="w-full border-0 px-2 outline-none"
          />
          <ChevronDownIcon className="h-6 w-6" />
        </div>
        {props.guestState && (
          <div className="absolute right-0 top-[70px] z-20 w-fit rounded-xl shadow-[0px_0px_9px_rgba(0,0,0,0.25)]">
            {/* backdrop */}
            <div
              className="fixed inset-0"
              onClick={() => props.showGuestModel()}
            />

            {/*<div className="flex items-center justify-between">
              <p className="font-medium text-black">Rooms</p>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1">
                <MinusIcon
                  onClick={() => props.handleRoomCount(-1)}
                  className="h-4 w-4 fill-primary"
                />
                <p className="text-primary">{props.noOfRooms}</p>
                <PlusIcon
                  onClick={() => props.handleRoomCount(1)}
                  className="h-4 w-4 fill-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-black">Adults</p>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1">
                <MinusIcon
                  onClick={() => props.handleGuestCount(-1)}
                  className="h-4 w-4 fill-primary"
                />
                <p className="text-primary">{props.noOfAdults}</p>
                <PlusIcon
                  onClick={() => props.handleGuestCount(1)}
                  className="h-4 w-4 fill-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-black">Childrens</p>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1">
                <MinusIcon
                  onClick={() => props.handleChildrenCount(-1)}
                  className="h-4 w-4 fill-primary"
                />
                <p className="text-primary">{props.noOfChildren}</p>
                <PlusIcon
                  onClick={() => props.handleChildrenCount(1)}
                  className="h-4 w-4 fill-primary"
                />
              </div>
            </div>
            <button
              onClick={() => {
                props.showGuestModel();
                searchHandler();
              }}
              className="w-full rounded-full bg-primary p-2 px-4 font-medium"
            >
              Done
            </button> */}

            <DesktopGuestSelection
              adults={props.noOfAdults}
              rooms={props.noOfRooms}
              child={props.noOfChildren}
              childAges={props.childAges}
              handleChildAgeChange={props.handleChildAgeChange}
              handleAdults={props.handleGuestCount}
              handleRooms={props.handleRoomCount}
              handleChild={props.handleChildrenCount}
              handleSearch={searchHandler}
              onClose={props.showGuestModel}
              isSearchButtonDisabled={props.isSearchButtonDisabled}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => {
          props.showGuestModel();
          searchHandler();
        }}
        className="relative z-50 rounded-full bg-secondary text-white disabled:bg-gray-400"
        disabled={!props.isSearchButtonDisabled}
      >
        <SearchIcon className="h-14 w-14 cursor-pointer p-4" />
      </button>
    </div>
  );
}
