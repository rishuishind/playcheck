import { CityRegionSearchNavbar } from "@/components/navbar/CityRegionSearchNavbar";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { HotelCityInformation } from "@/lib/classModels/hotelRegions/HotelCityInfo";
import { resetBookingInfo, updateSearchedText } from "@/lib/redux/bookingSlice";
import { useSearchParams } from "next/navigation";
import CustomCityHead from "@/components/header/CustomCityHead";
import {
  // getAllHotelsListOfCity,
  // getCityInfo,
  // getHotelsListOfCity,
  getHotelsListOfCityWithPagination,
  // getHotelsPriceofSpecificRegion,
  // getHotelsSpecificAmount,
  // getHotelsSpecificStar,
  // getHotelsStarSpecificRegion,
  getPriceRange,
  getTopCitiesInCountry,
} from "@/lib/firebase/cityHandler";
import RegionsUiCard from "@/components/city/RegionsUiCard";
import DescriptionUiCard from "@/components/city/DescriptionUiCard";
import RatingCard from "@/components/city/filters/RatingCard";
import PriceCard from "@/components/city/filters/PriceCard";
import HotelCitySlugCard from "@/components/city/HotelCitySlugCard";
import dynamic from "next/dynamic";
import { fetchStaticData } from "@/lib/helper/fetchStaticData";
import HotelPageFooter from "@/components/footer/HotelPageFooter";
import { capitalize } from "instantsearch.js/es/lib/utils";
import { CityHotelcardInfo } from "@/lib/classModels/city/hotelCardInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import { HotelRegionSkeletons } from "@/components/skeleton/HotelTabSkeletonCard";
import AmenityCard from "@/components/city/filters/AmenityCard";
import PriceLink from "@/components/city/Links/PriceLink";
import RegionLink from "@/components/city/Links/RegionLink";
import HotelStarLink from "@/components/city/Links/HotelStarLink";
import { hotelCityData } from "@/hotels";
import { GetStaticPropsContext } from "next";
import {
  fetchAvailableHotels,
  fetchCityInfo,
  fetchGeneralHotelInfo,
  handlePriceConditionHotels,
  handleStarRatedHotels,
} from "@/lib/firebase/cityHandler";

const XCircleIcon = dynamic(
  () => import("@heroicons/react/solid/XCircleIcon"),
  { ssr: false },
);
const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});

type Props = {
  pageLoad: boolean;
  cityInfo: HotelCityInformation;
  hotelInfo: CityHotelcardInfo[];
  availableHotels: any;
  staticData: any;
};

const unDashifyStringWithCpitalise = (value: string) => {
  const wordsArray = value.split("-");
  const capitalisedArray = wordsArray.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const string = capitalisedArray.join(" ");
  return string;
};

export default function HotelCityPage(props: Props) {
  const cityInfo = props.cityInfo;
  let staticData = props.staticData;
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);

  // get the city slug from the query
  const queryCitySlug = router.query.citySlugName + "";
  const formattedCitySlug = unDashifyStringWithCpitalise(queryCitySlug);
  const firstBatchdocsLimit = 3;
  const nextbatchdocsLimit = 2;

  let cityName = "";
  if (queryCitySlug.includes("star")) {
    if (
      queryCitySlug.includes("under") ||
      queryCitySlug.includes("above") ||
      queryCitySlug.includes("between")
    ) {
      // If the slug has a star rating and a price range, split to get the part after "star-"
      cityName = queryCitySlug
        .split("star-")[1]
        .split("-under")[0]
        .split("-above")[0]
        .split("-between")[0];
    } else {
      // If the slug has a star rating but no price range, split to get the part after "star-"
      cityName = queryCitySlug.split("star-")[1];
    }
  } else {
    if (
      queryCitySlug.includes("under") ||
      queryCitySlug.includes("above") ||
      queryCitySlug.includes("between")
    ) {
      // If the slug has no star rating but has a price range, split to get the part before the price range
      cityName = queryCitySlug
        .split("-under")[0]
        .split("-above")[0]
        .split("-between")[0];
    } else {
      // If the slug has no star rating and no price range, use the slug as is
      cityName = queryCitySlug;
    }
  }
  const starRatings =
    hotelCityData[cityName]?.filter((item) => item.endsWith("star")) || [];
  const priceRanges =
    hotelCityData[cityName]?.filter((item) => item.startsWith("under")) || [];

  if (staticData && staticData.allCities) {
    staticData.allCities = staticData.allCities.filter(
      (city) => city.slug !== cityName,
    );
  }

  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageName, setPageName] = useState<string>(formattedCitySlug);
  const [showAllRegions, setShowAllRegions] = useState<boolean>(false);
  const [showExtraInfo, setShowExtraInfo] = useState<{
    [key: string]: boolean;
  }>({});

  const [showAllMobileRegions, setShowAllMobileRegions] =
    useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [showAllMobileAmenities, setShowAllMobileAmenities] =
    useState<boolean>(false);

  const [mobileFilterModel, setMobileFilterModel] = useState<boolean>(false);
  const [hotelsList, setHotelsList] = useState<any[]>([]);
  const [staticHotels, setStaticHotels] = useState<any[]>(props.hotelInfo);
  const [lastDoc, setLastDocId] = useState<string | null>(null);

  const [mostBookedHotelsLoading, setMostBookedHotelsLoading] =
    useState<boolean>(true);
  const [mostBookedHotels, setMostBookedHotels] = useState<any[]>([]);
  const [availableHotels, setAvailableHotels] = useState<any[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<any[]>([]);
  const [availableRegions, setAvailableRegions] = useState<any[]>([]);

  const [amenityFilters, setAmenityFilters] = useState<any[]>([]);
  const [priceFilters, setPriceFilters] = useState<any[]>([]);
  const [ratingFilters, setRatingFilters] = useState<any[]>([]);
  const [regionFilters, setRegionFilters] = useState<any[]>([]);
  const [totalSelectedFilters, setTotalSelectedFilters] = useState<any[]>([]);
  // const slideContainerRef = useRef<any>(null);

  const hasCheckinCheckout =
    router.query.hasOwnProperty("checkin") &&
    router.query.hasOwnProperty("checkout");
  // fetch the first batch of the cityHotels from the database
  // const handleInitialDataLoad = async () => {
  //   // setIsLoading(true);

  //   // get the data from url search params
  //   const ratingStringParams = searchParams.get("rating");
  //   const priceStringParams = searchParams.get("price");
  //   const regionsStringParams = searchParams.get("regions");
  //   const amenitiesStringParams = searchParams.get("amenityId");
  //   const searchedHotel = searchParams.get("hotelSlugFromSearch");

  //   let rating: Number[] = [];
  //   if (ratingStringParams) {
  //     rating = ratingStringParams.split(",").map(Number);
  //     setRatingFilters(rating);
  //   }

  //   let price: Number[] = [];
  //   if (priceStringParams) {
  //     price = priceStringParams.split(",").map(Number);
  //     setPriceFilters(price);
  //   }

  //   let regionsFromParamsArray: any = [];
  //   if (regionsStringParams) {
  //     regionsFromParamsArray = regionsStringParams.split(",").map(String);
  //     regionsFromParamsArray;
  //   }

  //   let amenitiesFromParamsArray: any = [];
  //   if (amenitiesStringParams) {
  //     amenitiesFromParamsArray = amenitiesStringParams.split(",").map(String);
  //     setAmenityFilters(amenitiesFromParamsArray);
  //   }

  //   try {
  //     // get all the hotels list of the current city for seo schema
  //     const hotelsListOfCityRes = await getAllHotelsListOfCity(queryCitySlug);
  //     if (
  //       hotelsListOfCityRes.status === "OK" &&
  //       hotelsListOfCityRes.error === null
  //     ) {
  //       setAvailableHotels(hotelsListOfCityRes.data);
  //     } else {
  //       console.error(hotelsListOfCityRes.error);
  //     }

  //     // feth the first batch of the htoels in the city
  //     const paginationRes = await getHotelsListOfCityWithPagination(
  //       hasCheckinCheckout,
  //       queryCitySlug,
  //       firstBatchdocsLimit,
  //       searchedHotel,
  //       lastDoc,
  //       searchedHotel,
  //       regionFilters,
  //       ratingFilters,
  //       priceFilters,
  //       [],
  //     );
  //     if (paginationRes.status === "OK" && paginationRes.error === null) {
  //       setHotelsList(paginationRes.hotels);
  //       setLastDocId(paginationRes.lastDocument);
  //       if (paginationRes.hotels.length >= firstBatchdocsLimit) {
  //         setHasMoreData(true);
  //       } else {
  //         setHasMoreData(false);
  //       }
  //     } else {
  //       console.error(paginationRes.error);
  //     }

  //     // // get the list of ameities from database to show in the filters
  //     // const amenityListRes = await getAllAmenitiesList();
  //     // if (amenityListRes.status === "OK" && amenityListRes.error === null) {
  //     //   setAvailableAmenities(amenityListRes.data);
  //     // } else {
  //     //   console.error(amenityListRes.error);
  //     // }

  //     // // get the list of regions for the current city to show in the filters
  //     // const regionListRes = await getAllRegionsList(queryCitySlug);
  //     // if (regionListRes.status === "OK" && regionListRes.error === null) {
  //     //   setAvailableRegions(regionListRes.data);
  //     // } else {
  //     //   console.error(regionListRes.error);
  //     // }
  //   } catch (error: any) {
  //     console.error(error?.message || error);
  //     // setIsLoading(false);
  //   }

  //   // setIsLoading(false);
  // };

  // handle paginated results in the current city
  const handleInfiniteScroll = async () => {
    const userSearchedHotel = searchParams.get("hotelSlugFromSearch");

    try {
      // stop fetching if ther are no more docuemnts
      if (!hasMoreData) return;

      if (lastDoc) {
        const res = await getHotelsListOfCityWithPagination(
          hasCheckinCheckout,
          queryCitySlug,
          nextbatchdocsLimit,
          null,
          lastDoc,
          userSearchedHotel,
          regionFilters,
          ratingFilters,
          priceFilters,
          [],
        );

        if (res.status === "OK") {
          setHotelsList((prevData) => [...prevData, ...res.hotels]);
          setLastDocId(res.lastDocument);

          if (res.lastDocument) {
            setHasMoreData(true);
          } else {
            setHasMoreData(false);
          }
        }
      }
    } catch (error: any) {
      console.error(error?.message || error);
    }
  };

  // get hotels list with filters
  const getHotelsListWithFilters = async () => {
    // setIsLoading(true);

    // add new queries in the existing queries
    const newQuery = { ...router.query };
    // newQuery.amenityId = amenityFilters.join(",");
    newQuery.price = priceFilters.join(",");
    newQuery.rating = ratingFilters.join(",");
    // newQuery.regions = regionFilters.join(",");

    // Update the URL query without refreshing the page
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    );

    try {
      const res = await getHotelsListOfCityWithPagination(
        hasCheckinCheckout,
        queryCitySlug,
        firstBatchdocsLimit,
        null,
        lastDoc,
        null,
        regionFilters,
        ratingFilters,
        priceFilters,
        [],
      );

      if (res.status === "OK") {
        setHotelsList([...res.hotels]);
        setLastDocId(res.lastDocument);

        if (res.hotels.length > 0) {
          setHasMoreData(true);
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error: any) {
      console.error(error?.message || error);
      // setIsLoading(false);
    }

    // setIsLoading(false);
  };

  // clear all the selected filter and fetch the first batch of the city hotels from database
  const handleClearFilters = async () => {
    // setIsLoading(true);

    setAmenityFilters([]);
    setPriceFilters([]);
    setRatingFilters([]);
    setRegionFilters([]);

    // remove the selected query from the url
    const newQuery = { ...router.query };
    // delete newQuery.amenityId;
    delete newQuery.price;
    delete newQuery.rating;
    // delete newQuery.regions;

    // Update the URL query without refreshing the page
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    );

    try {
      const res = await getHotelsListOfCityWithPagination(
        hasCheckinCheckout,
        queryCitySlug,
        firstBatchdocsLimit,
      );

      if (res.status === "OK") {
        setHotelsList(res.hotels);
        setLastDocId(res.lastDocument);
      }
    } catch (error: any) {
      console.error(error?.message || error);
      // setIsLoading(false);
    }

    // setIsLoading(false);
  };

  const changeHotelListAccordingToFilters = () => {
    const priceRanges = priceFilters.map((filter) => getPriceRange(filter));

    const filteredHotels = [...props.hotelInfo].filter((hotel) => {
      const matchesRatingFilter =
        ratingFilters.length === 0 ||
        ratingFilters.includes(hotel.hotel_Star_Rating);

      const matchesPriceFilter =
        priceRanges.length === 0 ||
        priceRanges.some(([minPrice, maxPrice]) => {
          return (
            hotel.hotel_Starting_Price >= minPrice &&
            hotel.hotel_Starting_Price <= maxPrice
          );
        });

      const matchesAmenityFilter =
        amenityFilters.length === 0 ||
        amenityFilters.every((amenity) => {
          return hotel.hotel_Amenities_List?.some(
            (amenityObj) => amenityObj.amenity_Name === amenity,
          );
        });

      return matchesRatingFilter && matchesPriceFilter && matchesAmenityFilter;
    });

    // Sorting to ensure hotels with matching ratings, prices, and amenities appear at the top
    filteredHotels.sort((a, b) => {
      const ratingA = ratingFilters.includes(a.hotel_Star_Rating) ? 1 : 0;
      const ratingB = ratingFilters.includes(b.hotel_Star_Rating) ? 1 : 0;

      const priceA = priceRanges.some(([minPrice, maxPrice]) => {
        return (
          a.hotel_Starting_Price >= minPrice &&
          a.hotel_Starting_Price <= maxPrice
        );
      })
        ? 1
        : 0;

      const priceB = priceRanges.some(([minPrice, maxPrice]) => {
        return (
          b.hotel_Starting_Price >= minPrice &&
          b.hotel_Starting_Price <= maxPrice
        );
      })
        ? 1
        : 0;

      const amenityA = amenityFilters.every((amenity) => {
        return a.hotel_Amenities_List?.some(
          (amenityObj) => amenityObj.amenity_Name === amenity,
        );
      })
        ? 1
        : 0;

      const amenityB = amenityFilters.every((amenity) => {
        return b.hotel_Amenities_List?.some(
          (amenityObj) => amenityObj.amenity_Name === amenity,
        );
      })
        ? 1
        : 0;

      return ratingB + priceB + amenityB - (ratingA + priceA + amenityA);
    });

    setStaticHotels(filteredHotels);
  };

  // remove rating filters function
  const handleRemoveRatingFilters = (item: any) => {
    // remove the selected rating from total selected filters
    setTotalSelectedFilters((prevData: any) =>
      prevData.filter((obj: any) => obj.title !== item.title),
    );

    // remove the selection rating from the ratingFilters array
    setRatingFilters((prevData: any) =>
      prevData.filter((data: any) => data !== item.value),
    );
  };

  // remove Price filters function
  const handleRemovePriceFilters = (item: any) => {
    // remove the selected price from total selected filters
    setTotalSelectedFilters((prevData: any) =>
      prevData.filter((obj: any) => obj.title !== item.title),
    );

    // remove the selection price from the ratingFilters array
    setPriceFilters((prevData: any) =>
      prevData.filter((data: any) => data !== item.value),
    );
  };

  // // remove price filters function
  const handleRemoveAmenityFilters = (item: any) => {
    // remove the selected rating from total selected filters
    setTotalSelectedFilters((prevData: any) =>
      prevData.filter((obj: any) => obj.title !== item.title),
    );

    // remove the selection rating from the ratingFilters array
    setAmenityFilters((prevData: any) =>
      prevData.filter((data: any) => data !== item.value),
    );
  };

  // // remove region filters function
  // const handleRemoveRegionFilters = (item: any) => {
  //   // remove the selected rating from total selected filters
  //   setTotalSelectedFilters((prevData: any) =>
  //     prevData.filter((obj: any) => obj.title !== item.title),
  //   );

  //   // remove the selection rating from the ratingFilters array
  //   setRegionFilters([]);
  // };

  // fetch initital data on page load
  // useEffect(() => {
  //   handleInitialDataLoad();
  // }, []);

  useEffect(() => {
    dispatch(resetBookingInfo());
    setPageName(formattedCitySlug);
    dispatch(updateSearchedText(cityInfo.hotelCity_Name));
    // handleInitialDataLoad();
  }, [router.query?.citySlugName]);

  // run the function when any of the filter changes
  useEffect(() => {
    if (!isInitialRender.current) {
      if (queryCitySlug) {
        if (hasCheckinCheckout) {
          getHotelsListWithFilters();
          changeHotelListAccordingToFilters();
        } else {
          changeHotelListAccordingToFilters();
        }
      }
    } else {
      isInitialRender.current = false;
    }
  }, [regionFilters, ratingFilters, amenityFilters, priceFilters]);

  // call the new instace of the worker inside the useEffect
  useEffect(() => {
    setMostBookedHotelsLoading(true);
    // initialize new worker instance
    const hotelInfoWorker = new Worker("/workers/cityPage.worker.js");

    // send the data to the worker
    hotelInfoWorker.postMessage(router.query?.citySlugName + "");

    // handle message from the worker
    hotelInfoWorker.onmessage = (event) => {
      const data = event.data;

      if (data.error) {
        console.error("Error from worker:", data.error);
        setMostBookedHotelsLoading(false);
      } else {
        // setMostBookedHotels(data.mostBookedHotels);
        setAvailableRegions(data.regionsList);
        setMostBookedHotelsLoading(false);
      }
    };

    // handle error case
    hotelInfoWorker.onerror = (error) => {
      console.error("Worker error:", error);
      setMostBookedHotelsLoading(false);
    };

    // cleanup function
    return () => {
      hotelInfoWorker.terminate();
    };
  }, []);

  // Insert UI elements based on index or other conditions
  const renderExtraUI = (index: number) => {
    if ((index + 1) % 6 === 0) {
      return (
        <RegionsUiCard
          margin={"mt-4"}
          heading={`Popular Regions in ${cityInfo.hotelCity_Name}`}
          regionsInfo={props.staticData.regionsSlugs}
        />
      );
    } else if (index + 1 === 4) {
      return (
        <DescriptionUiCard
          margin={"mt-4"}
          heading={`About ${cityInfo.hotelCity_Name}`}
          cityInfo={cityInfo}
        />
      );
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   const handleRun = async () => {
  //     setLoaded(true);
  //     const response = await getListOfMostBookedHotelsWithPagination(
  //       router.query?.citySlugName + "",
  //     );
  //     if (response.status === "OK") {
  //       setMostBookedHotels(response.data);
  //     }
  //     setLoaded(false);
  //   };
  //   handleRun();
  // }, []);

  // disable the body scrolling when the mobileFilterModel is true
  // useEffect(() => {
  //   if (mobileFilterModel) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [mobileFilterModel]);

  const handleToggle = (infoType: string) => {
    setShowExtraInfo((prevState) => ({
      ...prevState,
      [infoType]: !prevState[infoType],
    }));
  };

  // If router.query has hotelSlugFromSearch then show that particular hotel at the top of the list which is coming from props
  useEffect(() => {
    const fetchData = async () => {
      // Check if the checkIn or checkout date are present then fetch the hotels again with dates for altered prices
      if (router.query.checkin && router.query.checkout) {
        const res = await getHotelsListOfCityWithPagination(
          hasCheckinCheckout,
          queryCitySlug,
          firstBatchdocsLimit,
          router.query.hotelSlugFromSearch,
          lastDoc,
          router.query.hotelSlugFromSearch,
          regionFilters,
          ratingFilters,
          priceFilters,
          [],
        );

        if (res.status === "OK") {
          setHotelsList([...res.hotels]);
          setLastDocId(res.lastDocument);

          if (res.hotels.length > 0) {
            setHasMoreData(true);
          } else {
            setHasMoreData(false);
          }
        }
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <>
      <CustomCityHead
        metaShowTitle={cityInfo?.hotelCity_Meta_Title}
        metaDescription={cityInfo?.hotelCity_Meta_Description}
        metaImageUrl={cityInfo?.hotelCity_Image_Url}
        canonicalUrl={`https://staybook.in/${queryCitySlug}`}
        all_hotel_in_city={props.availableHotels || []}
        cityName={cityInfo?.hotelCity_Name}
      />
      <CityRegionSearchNavbar search_title={cityInfo?.hotelCity_Name || ""} />

      {mobileFilterModel && (
        <div className="fixed inset-0 z-40 flex h-auto min-h-screen w-full flex-col justify-between bg-white md:hidden">
          <div className="sticky top-0 flex items-center justify-between bg-secondary p-4">
            <div
              onClick={() => setMobileFilterModel(false)}
              className="flex items-center gap-2"
            >
              <XIcon className="h-7 w-7 fill-white" />
              <p className="text-xl font-bold text-white">Filter</p>
            </div>

            <button
              className="rounded bg-primary px-4 py-2 font-bold tracking-wide text-white"
              onClick={() => {
                setMobileFilterModel(false);
                handleClearFilters();
              }}
            >
              Clear filter
            </button>
          </div>

          <div className="bg-lightText h-full w-full overflow-y-scroll p-4 pb-16">
            {/* total selected filters */}
            {totalSelectedFilters.length > 0 && (
              <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-secondary">Selected Filters</p>
                </div>

                <div className="flex flex-wrap gap-2 p-2.5">
                  {(totalSelectedFilters || []).map((item, index) => {
                    let formattedTitle = "";

                    if (
                      typeof item.value === "string" &&
                      item.value.includes("|")
                    ) {
                      const parts = item.value.split("|");
                      if (parts.length > 1) {
                        let title = parts[1].trim();
                        formattedTitle = title
                          .split("-")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase(),
                          )
                          .join(" ");
                      }
                    }

                    return (
                      <div
                        key={index}
                        className="flex w-fit items-center justify-between gap-1.5 rounded-full bg-secondary py-0.5 pl-2.5 pr-0.5 text-sm text-white"
                      >
                        <p className="text-lightText text-nowrap leading-none">
                          {typeof item.value === "string" &&
                          item.value.includes("|")
                            ? formattedTitle
                            : item.title.replace("*", "star")}
                        </p>
                        <XCircleIcon
                          onClick={() => item.handleRemoveFilter(item)}
                          className="fill-lightText h-5 w-5 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* regions list */}
            {/* <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-primary">
                    Popular Regions in this City
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1.5 p-2.5">
                  {!showAllMobileRegions ? (
                    <>
                      {availableRegions
                        ?.slice(0, 5)
                        .map((region: any, index: number) => (
                          <RegionCard
                            key={index}
                            regionData={region}
                            regionSlug={region.hotelCityRegion_Slug_Name}
                            regionFilters={regionFilters}
                            setRegionFilters={setRegionFilters}
                            setTotalSelectedFilters={setTotalSelectedFilters}
                            handleRemoveRegionFilters={
                              handleRemoveRegionFilters
                            }
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      {availableRegions?.map((region: any, index: number) => (
                        <RegionCard
                          key={index}
                          regionData={region}
                          regionSlug={region.hotelCityRegion_Slug_Name}
                          regionFilters={regionFilters}
                          setRegionFilters={setRegionFilters}
                          setTotalSelectedFilters={setTotalSelectedFilters}
                          handleRemoveRegionFilters={handleRemoveRegionFilters}
                        />
                      ))}
                    </>
                  )}

                  <button
                    onClick={() => setShowAllMobileRegions((prev) => !prev)}
                    className="font-medium tracking-wide text-primary"
                  >
                    {showAllMobileRegions ? "See more -" : "See more +"}
                  </button>
                </div>
              </div> */}

            {/* rating list */}
            <div className="mt-4 w-full rounded-xl border-2">
              <div className="border-b-2 py-2 pl-3">
                <p className="font-bold text-secondary">Star Rating</p>
              </div>

              <div className="p-2.5">
                <RatingCard
                  rating={5}
                  setRatingState={setRatingFilters}
                  ratingState={ratingFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemoveRatingFilters={handleRemoveRatingFilters}
                />
                <RatingCard
                  rating={4}
                  setRatingState={setRatingFilters}
                  ratingState={ratingFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemoveRatingFilters={handleRemoveRatingFilters}
                />
                <RatingCard
                  rating={3}
                  setRatingState={setRatingFilters}
                  ratingState={ratingFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemoveRatingFilters={handleRemoveRatingFilters}
                />
                <RatingCard
                  rating={2}
                  setRatingState={setRatingFilters}
                  ratingState={ratingFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemoveRatingFilters={handleRemoveRatingFilters}
                />
                <RatingCard
                  rating={1}
                  setRatingState={setRatingFilters}
                  ratingState={ratingFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemoveRatingFilters={handleRemoveRatingFilters}
                />
              </div>
            </div>

            {/* price list */}
            <div className="mt-4 w-full rounded-xl border-2">
              <div className="border-b-2 py-2 pl-3">
                <p className="font-bold text-secondary">Price</p>
              </div>

              <div className="p-2.5">
                <PriceCard
                  priceIndex={1}
                  minPrice={2000}
                  maxPrice={0}
                  priceFilters={priceFilters}
                  setPriceFilters={setPriceFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemovePriceFilters={handleRemovePriceFilters}
                />
                <PriceCard
                  priceIndex={2}
                  minPrice={2000}
                  maxPrice={4000}
                  priceFilters={priceFilters}
                  setPriceFilters={setPriceFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemovePriceFilters={handleRemovePriceFilters}
                />
                <PriceCard
                  priceIndex={3}
                  minPrice={4000}
                  maxPrice={6000}
                  priceFilters={priceFilters}
                  setPriceFilters={setPriceFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemovePriceFilters={handleRemovePriceFilters}
                />
                <PriceCard
                  priceIndex={4}
                  minPrice={6000}
                  maxPrice={1}
                  priceFilters={priceFilters}
                  setPriceFilters={setPriceFilters}
                  setTotalSelectedFilters={setTotalSelectedFilters}
                  handleRemovePriceFilters={handleRemovePriceFilters}
                />
              </div>
            </div>

            <div className="mt-4 w-full rounded-xl border-2">
              <div className="border-b-2 py-2 pl-3">
                <p className="font-bold text-secondary">Amenities</p>
              </div>
              <div className="h-[20vh] overflow-y-scroll p-1 pl-3">
                {props.staticData &&
                  props.staticData.allAmenities &&
                  (props.staticData.allAmenities || []).map(
                    (amenity: string, index: number) => (
                      <AmenityCard
                        key={index}
                        amenityId={amenity.split(" ").join("-")}
                        amenityName={amenity}
                        handleRemoveAmenityFilters={handleRemoveAmenityFilters}
                        amenityFilters={amenityFilters}
                        setAmenityFilters={setAmenityFilters}
                        setTotalSelectedFilters={setTotalSelectedFilters}
                      />
                    ),
                  )}
              </div>
            </div>

            {/* amenities list */}
            {/* <div className="mt-4 w-full rounded-xl border-2">
              <div className="border-b-2 py-2 pl-3">
                <p className="font-bold text-primary">Amenities</p>
              </div>
              <div className="p-2.5">
                {showAllMobileAmenities ? (
                  <>
                    {availableAmenities?.map((item: any) => (
                      <AmenityCard
                        key={item.amenity_Id}
                        amenityId={item.amenity_Id}
                        amenityName={item.amenity_Name}
                        amenityFilters={amenityFilters}
                        setAmenityFilters={setAmenityFilters}
                        setTotalSelectedFilters={setTotalSelectedFilters}
                        handleRemoveAmenityFilters={handleRemoveAmenityFilters}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {availableAmenities
                      ?.slice(0, 7)
                      .map((item: any) => (
                        <AmenityCard
                          key={item.amenity_Id}
                          amenityId={item.amenity_Id}
                          amenityName={item.amenity_Name}
                          amenityFilters={amenityFilters}
                          setAmenityFilters={setAmenityFilters}
                          setTotalSelectedFilters={setTotalSelectedFilters}
                          handleRemoveAmenityFilters={
                            handleRemoveAmenityFilters
                          }
                        />
                      ))}
                  </>
                )}

                <button
                  onClick={() => setShowAllMobileAmenities((prev) => !prev)}
                  className="font-medium tracking-wide text-primary"
                >
                  {showAllMobileAmenities ? "see less -" : "see more +"}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}

      <section className="h-auto w-full">
        <div className="wrapper min-h-screen pt-4">
          <div className="h-full w-full md:flex md:items-stretch">
            {/* left side filter section */}
            <div className="hidden h-full w-[36%] md:block md:pr-3 lg:w-[32%] xl:w-[26%]">
              <button
                onClick={handleClearFilters}
                className="w-full rounded bg-secondary p-2.5 px-4 text-sm font-bold tracking-wider text-white"
              >
                Clear Filters
              </button>

              {/* all selected regions */}
              {totalSelectedFilters.length > 0 && (
                <div className="mt-4 w-full rounded-xl border-2">
                  <div className="border-b-2 py-2 pl-3">
                    <p className="font-bold text-secondary">Selected Filters</p>
                  </div>

                  <div className="flex flex-wrap gap-2 p-2.5">
                    {(totalSelectedFilters || []).map((item, index) => {
                      let formattedTitle = "";

                      if (
                        typeof item.value === "string" &&
                        item.value.includes("|")
                      ) {
                        const parts = item.value.split("|");
                        if (parts.length > 1) {
                          let title = parts[1].trim();
                          formattedTitle = title
                            .split("-")
                            .map(
                              (word: string) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase(),
                            )
                            .join(" ");
                        }
                      }

                      return (
                        <div
                          key={index}
                          className="flex w-fit items-center justify-between gap-1.5 rounded-full bg-secondary py-0.5 pl-2.5 pr-0.5 text-sm text-white"
                        >
                          <p className="text-lightText text-nowrap leading-none">
                            {typeof item.value === "string" &&
                            item.value.includes("|")
                              ? formattedTitle
                              : item.title.replace("*", "star")}
                          </p>
                          <XCircleIcon
                            onClick={() => item.handleRemoveFilter(item)}
                            className="fill-lightText h-5 w-5 cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* regions list */}
              {/* <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-primary">Popular Regions</p>
                </div>
                <div className="flex flex-col items-start gap-1.5 overflow-hidden p-2.5 transition-all">
                  {availableRegions.length === 0 && <FiltersSkeleton />}

                  {showAllRegions ? (
                    <>
                      {availableRegions?.map((region: any, index: number) => (
                        <RegionCard
                          key={index}
                          regionData={region}
                          regionSlug={region.hotelCityRegion_Slug_Name}
                          regionFilters={regionFilters}
                          setRegionFilters={setRegionFilters}
                          setTotalSelectedFilters={setTotalSelectedFilters}
                          handleRemoveRegionFilters={handleRemoveRegionFilters}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {availableRegions
                        ?.slice(0, 5)
                        .map((region: any, index: number) => (
                          <RegionCard
                            key={index}
                            regionData={region}
                            regionSlug={region.hotelCityRegion_Slug_Name}
                            regionFilters={regionFilters}
                            setRegionFilters={setRegionFilters}
                            setTotalSelectedFilters={setTotalSelectedFilters}
                            handleRemoveRegionFilters={
                              handleRemoveRegionFilters
                            }
                          />
                        ))}
                    </>
                  )}
                  <button
                    onClick={() => setShowAllRegions((prev) => !prev)}
                    className="font-medium tracking-wide text-primary"
                  >
                    {showAllRegions ? "see less -" : "see more +"}
                  </button>
                </div>
              </div> */}

              {/* rating list */}
              <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-secondary">Star Rating</p>
                </div>

                <div className="p-1 pl-3">
                  <RatingCard
                    rating={5}
                    setRatingState={setRatingFilters}
                    ratingState={ratingFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemoveRatingFilters={handleRemoveRatingFilters}
                  />
                  <RatingCard
                    rating={4}
                    setRatingState={setRatingFilters}
                    ratingState={ratingFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemoveRatingFilters={handleRemoveRatingFilters}
                  />
                  <RatingCard
                    rating={3}
                    setRatingState={setRatingFilters}
                    ratingState={ratingFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemoveRatingFilters={handleRemoveRatingFilters}
                  />
                  <RatingCard
                    rating={2}
                    setRatingState={setRatingFilters}
                    ratingState={ratingFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemoveRatingFilters={handleRemoveRatingFilters}
                  />
                  <RatingCard
                    rating={1}
                    setRatingState={setRatingFilters}
                    ratingState={ratingFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemoveRatingFilters={handleRemoveRatingFilters}
                  />
                </div>
              </div>

              {/* price list */}
              <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-secondary">Price</p>
                </div>

                <div className="p-1 pl-3">
                  <PriceCard
                    priceIndex={1}
                    minPrice={2000}
                    maxPrice={0}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemovePriceFilters={handleRemovePriceFilters}
                  />
                  <PriceCard
                    priceIndex={2}
                    minPrice={2000}
                    maxPrice={4000}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemovePriceFilters={handleRemovePriceFilters}
                  />
                  <PriceCard
                    priceIndex={3}
                    minPrice={4000}
                    maxPrice={6000}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemovePriceFilters={handleRemovePriceFilters}
                  />
                  <PriceCard
                    priceIndex={4}
                    minPrice={6000}
                    maxPrice={1}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    setTotalSelectedFilters={setTotalSelectedFilters}
                    handleRemovePriceFilters={handleRemovePriceFilters}
                  />
                </div>
              </div>

              {/* amenities list */}
              <div className="mt-4 w-full rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-secondary">Amenities</p>
                </div>
                <div className="h-[20vh] overflow-y-scroll p-1 pl-3">
                  {props.staticData &&
                    props.staticData.allAmenities &&
                    (props.staticData.allAmenities || []).map(
                      (amenity: string, index: number) => (
                        <AmenityCard
                          key={index}
                          amenityId={amenity.split(" ").join("-")}
                          amenityName={amenity}
                          handleRemoveAmenityFilters={
                            handleRemoveAmenityFilters
                          }
                          amenityFilters={amenityFilters}
                          setAmenityFilters={setAmenityFilters}
                          setTotalSelectedFilters={setTotalSelectedFilters}
                        />
                      ),
                    )}
                </div>
              </div>

              {/* amenities list */}
              {/* <div className="mt-4 rounded-xl border-2">
                <div className="border-b-2 py-2 pl-3">
                  <p className="font-bold text-primary">Amenities</p>
                </div>
                <div className="overflow-hidden p-1 pl-3">
                  {availableAmenities.length === 0 && <FiltersSkeleton />}

                  {showAllAmenities ? (
                    <>
                      {availableAmenities?.map((item: any) => (
                        <AmenityCard
                          key={item.amenity_Id}
                          amenityId={item.amenity_Id}
                          amenityName={item.amenity_Name}
                          amenityFilters={amenityFilters}
                          setAmenityFilters={setAmenityFilters}
                          setTotalSelectedFilters={setTotalSelectedFilters}
                          handleRemoveAmenityFilters={
                            handleRemoveAmenityFilters
                          }
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {availableAmenities
                        ?.slice(0, 7)
                        .map((item: any) => (
                          <AmenityCard
                            key={item.amenity_Id}
                            amenityId={item.amenity_Id}
                            amenityName={item.amenity_Name}
                            amenityFilters={amenityFilters}
                            setAmenityFilters={setAmenityFilters}
                            setTotalSelectedFilters={setTotalSelectedFilters}
                            handleRemoveAmenityFilters={
                              handleRemoveAmenityFilters
                            }
                          />
                        ))}
                    </>
                  )}
                  <button
                    onClick={() => setShowAllAmenities((prev) => !prev)}
                    className="font-medium tracking-wide text-primary"
                  >
                    {showAllAmenities ? "see less -" : "see more +"}
                  </button>
                </div>
              </div> */}
            </div>

            {/* right section div */}
            <div className="h-full w-full space-y-3 pb-7 md:w-[64%] md:pl-3 lg:w-[68%] xl:w-[74%]">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-lg font-bold text-secondary sm:text-2xl">
                    {`${router.query?.citySlugName?.includes("star") ? "Book" : router.query?.citySlugName?.includes("under") ? "" : "Best Budget"} ${pageName}`}
                  </h1>
                  <div className="relative overflow-hidden">
                    {
                      <>
                        {regionFilters.length > 0 ? (
                          <p>{staticHotels?.length} properties found</p>
                        ) : (
                          <p>{staticHotels?.length} properties found</p>
                        )}
                      </>
                    }
                  </div>
                </div>
                <div>
                  {(hotelsList.length > 2 || props.hotelInfo?.length > 2) && (
                    <div className="text-right md:hidden">
                      <button
                        onClick={() => setMobileFilterModel(true)}
                        className="rounded bg-primary p-2.5 px-5 text-sm font-bold leading-none tracking-wider text-white sm:text-base"
                      >
                        Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="mt-4">
                <p className="mb-2 text-lg font-bold tracking-wide">
                  Popular Hotels In this City
                </p>
                <div className="container-snap flex gap-4 overflow-x-scroll p-1">
                  {mostBookedHotelsLoading ? (
                    <>
                      <PopularHotels />
                      <PopularHotels />
                      <PopularHotels />
                    </>
                  ) : (
                    <>
                      {mostBookedHotels.map((hotel: CityHotelcardInfo) => (
                        <MostBookedHotelCard
                          key={hotel.hotel_Slug_Name}
                          hotel={hotel}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div> */}

              <div className="mt-2 h-full w-full">
                {hasCheckinCheckout ? (
                  <InfiniteScroll
                    dataLength={hotelsList.length}
                    next={handleInfiniteScroll}
                    hasMore={hasMoreData}
                    loader={<HotelRegionSkeletons />}
                    className="flex h-[800px] flex-col space-y-5 overflow-scroll p-1"
                    scrollThreshold={0.2}
                  >
                    {hotelsList.map((hotel: any, index: number) => (
                      <div key={index}>
                        <HotelCitySlugCard
                          hotelData={hotel}
                          showLivePrice={hasCheckinCheckout}
                        />
                        {renderExtraUI(index)}
                      </div>
                    ))}
                  </InfiniteScroll>
                ) : (
                  (staticHotels || []).map((hotel: any, index: number) => (
                    <div key={index}>
                      <HotelCitySlugCard
                        hotelData={hotel}
                        showLivePrice={hasCheckinCheckout}
                      />
                      {renderExtraUI(index)}
                    </div>
                  ))
                )}
              </div>

              {starRatings.length > 0 && (
                <HotelStarLink
                  queryCitySlug={queryCitySlug}
                  starRatings={starRatings}
                />
              )}
              {priceRanges.length > 0 && (
                <PriceLink
                  queryCitySlug={queryCitySlug}
                  priceRanges={priceRanges}
                />
              )}
              {staticData?.regionsSlugs?.length > 0 && (
                <RegionLink staticData={staticData} />
              )}

              {/* <div className="space-y-3 rounded-xl border">
                <Button
                  heading="Best Adventure Sports in Rishikesh"
                  infoType="adventure"
                  setShowExtraInfo={setShowExtraInfo}
                  handleToggle={handleToggle}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["adventure"] && (
                  <div>
                    <Adventures
                      heading="River Rafting"
                      index={1}
                      para="River rafting is one of the best adventure sports in Rishikesh,  also known as white water rafting. You can experience this adventure at multiple venues in Rishikesh"
                      img1={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      img2={`https://aquaterra.in/wp-content/uploads/2019/10/Brahmaputra-River-Rafting-Assam-31.jpg`}
                    />
                    <Adventures
                      heading="River Rafting"
                      index={2}
                      para="River rafting is one of the best adventure sports in Rishikesh,  also known as white water rafting. You can experience this adventure at multiple venues in Rishikesh"
                      img1="https://seaadventuretrips.com/wp-content/uploads/2022/03/2021-11-28-min-2.jpg"
                      img2="https://www.outdoorkeeda.com/explore-the-sky/images/outdoorkeeda-bungee-jumping-2.jpg"
                    />
                    <Adventures
                      heading="River Rafting"
                      index={3}
                      para="River rafting is one of the best adventure sports in Rishikesh,  also known as white water rafting. You can experience this adventure at multiple venues in Rishikesh"
                      img1="https://oklahomaskydiving.com/wp-content/uploads/10000pic1-600x400.jpg"
                      img2={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    />
                    <Adventures
                      heading="River Rafting"
                      index={4}
                      para="River rafting is one of the best adventure sports in Rishikesh,  also known as white water rafting. You can experience this adventure at multiple venues in Rishikesh"
                      img1={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      img2={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="Best Tourist Places in Rishikesh"
                  infoType="tourists"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["tourists"] && (
                  <div className="space-y-5">
                    <Attractions
                      img={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      description="Beatles ashram is also known as the Chaurasi Kutiya ashram this serene ashram is a hidden gem that found its worldwide fame and glory the Beatles band visited this ashram in the year 1968 to study meditation, after the ’90s this ashram was reclaimed by nature, giving it an ethereal and mysterious ambiance, the visitors also adore the graffiti on the walls of the ashram authorities have partially restored this ashram and reopened for the visitors"
                    />
                    <Attractions
                      img={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      description="Beatles ashram is also known as the Chaurasi Kutiya ashram this serene ashram is a hidden gem that found its worldwide fame and glory the Beatles band visited this ashram in the year 1968 to study meditation, after the ’90s this ashram was reclaimed by nature, giving it an ethereal and mysterious ambiance, the visitors also adore the graffiti on the walls of the ashram authorities have partially restored this ashram and reopened for the visitors"
                    />
                    <Attractions
                      img={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      description="Beatles ashram is also known as the Chaurasi Kutiya ashram this serene ashram is a hidden gem that found its worldwide fame and glory the Beatles band visited this ashram in the year 1968 to study meditation, after the ’90s this ashram was reclaimed by nature, giving it an ethereal and mysterious ambiance, the visitors also adore the graffiti on the walls of the ashram authorities have partially restored this ashram and reopened for the visitors"
                    />
                    <Attractions
                      img={`https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      description="Beatles ashram is also known as the Chaurasi Kutiya ashram this serene ashram is a hidden gem that found its worldwide fame and glory the Beatles band visited this ashram in the year 1968 to study meditation, after the ’90s this ashram was reclaimed by nature, giving it an ethereal and mysterious ambiance, the visitors also adore the graffiti on the walls of the ashram authorities have partially restored this ashram and reopened for the visitors"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="What @staybook.in is offering you in Rishikesh"
                  infoType="offering"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["offering"] && (
                  <div className="space-y-5">
                    <Attractions
                      img="https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      description="@staybook is a leading hotel booking website with 500+ hotels & resorts and other accommodations @staybook is committed to assuring you a pleasant and homely stay at your desired location in Rishikesh, we provide the best deals and hefty discounts on hotel booking from a wide range of hotels and resorts in Rishikesh 
Our team provides detailed descriptions, high-quality images, and genuine reviews. so the customers can make an informed choice of hotel booking for the Rishikesh trip. Our hotels & resorts are a testament to luxury, we offer a wide range of exquisite facilities, a swimming pool, fitness center, rejuvenating spas, and, a play zone for kids. we strive to offer unique experiences that create unforgettable memories. 

We aim for complete customer satisfaction, which includes luxury, comfort, and, unparalleled customer service. Hotel booking is easy, with staybook"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="Best places to do shopping in Rishikesh"
                  infoType="shopping"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["shopping"] && (
                  <div className="container-snap flex gap-x-5 overflow-x-scroll px-2 py-3">
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                    <ShoppingCard img="" />
                  </div>
                )}
              </div>
              <div className="rounded-xl border p-3">
                <span className="text-lg font-semibold">
                  Best Time to Visit
                </span>
                <div className="flex py-3">
                  <span className="text-sm-sub-heading font-semibold">
                    Best Overall Time:
                  </span>
                  <p>
                    October to February for pleasant weather and a variety of
                    activities.
                  </p>
                </div>
                <div className="flex py-3">
                  <span className="text-sm-sub-heading font-semibold">
                    For Yoga Enthusiasts:
                  </span>
                  <p>March, during the International Yoga Festival.</p>
                </div>
                <div className="flex py-3">
                  <span className="text-sm-sub-heading font-semibold">
                    For Adventure Seekers:
                  </span>
                  <p>March to June, especially for river rafting.</p>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="Let's know about Rishikesh"
                  infoType="knwoabout"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["knwoabout"] && (
                  <div className="space-y-3">
                    <Knowlege
                      heading="How Is The Weather In Rishikesh & What is the best time to visit Rishikesh?"
                      img=""
                      description="Rishikesh experiences a wide range of weather conditions throughout the year, rishikesh generally enjoys a moderate climate, and the best time to visit rishikesh is post-monsoon from october to february this is also the peak season in rishikesh. This is the right time to visit the tourist attractions in rishikesh when the temperature hovers between 12 degrees celsius and 30 degrees celsius. You can also visit rishikesh in monsoon, this season starts in july and can extend into late september, monsoon brings fair to heavy rainfall that rejuvenates the lush greenery of this town making it more scenic and relaxing, and temperature can avoid a rishikesh trip in monsoon when there is raining heavily as it can cause an occasional landslide & swollen river .
To avoid the crowd you can visit rishikesh from march to june this is the shoulder season in rishikesh.  the temperature is 35 degree celsius throughout the daytime and can dip below 20 degrees celsius at night, this is the best time to do adventure activities like river rafting, and, trekking in rishikesh."
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="Let's know about Rishikesh"
                  infoType="knwoabouthorizontal"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["knwoabouthorizontal"] && (
                  <div className="space-y-3">
                    <KnowlegeHorizontal
                      description="The yoga capital of the world Rishikesh, this serene town nestled in the “Dev Bhoomi” (land of god) Uttarakhand this harmonious town in the foothills of himalayan ranges, is heaven for thrill seeker adrenaline junkies, adventure activities such as river rafting in the rapid rivers, action-packed bungee jumping. You jump off a height connected with an elastic cord. Enjoy the picturesque views of the mountains and valleys, and take your fun to an extant by camping in the woods gazing upon the stars indulging in love with the living world & the nature symphony.

Rishikesh is a perfect blend of spirituality, a rich heritage of flora and fauna, and thrilling adventure. Show hospitality to folks around the globe, you can connect yourself to the calmness of nature and take a yoga session to relax your mind and body on the serene banks of rivers in rishikesh. In the list of attractions in rishikesh you see the Beatles ashram (Chaurasi Kutiya) on top. It is an abandoned ashram with graffiti art where the popular rock band of the 19s stayed in 1968.
You see Parmarth Niketan the largest ashram in rishikesh people come for meditation and yoga in the serene atmosphere of this ashram. 
"
                      img="https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <Button
                  heading="How to Reach Rishikesh"
                  infoType="howtoreach"
                  handleToggle={handleToggle}
                  setShowExtraInfo={setShowExtraInfo}
                  showExtrInfo={showExtraInfo}
                />
                {showExtraInfo["howtoreach"] && (
                  <div>
                    <Reach
                      airData="Rishikesh is well connected to the major cities with airways, trains, and roads through the capital city of Uttarakhand, Dehradun Rishikesh has no airport of its own, the nearest airport to Rishikesh is the Jolly Grant airport, tourists coming from abroad have to first reach to the Delhi, From Indira Gandhi International Airport you can take a Direct flight to Dehradun, IGI Airpot accommodates flights from all the major cities around the world."
                      img="https://plus.unsplash.com/premium_photo-1661895394542-34d5a1901d6e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      trainData="Rishikesh is well connected with roads and is an easy-to-access and most popular town among travelers coming to Rishikesh for meditation, yoga, adventure, or any other reason, Rishikesh doesn't have a railway station the nearest railway station is Haridwar railway station from there you can come to Rishikesh by private vehicles or rental taxis"
                      roadData="On a serene drive through the woods, you can admire the beauty of mother nature in a joyful ride with your family and friends, rishikesh is well-connected by roads one can come to rishikesh with their preferred vehicle buses, cars, or private taxi, etc."
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3 rounded-xl border">
                <div className="p-5">
                  <div className="py-3">
                    <span className="text-lg font-light">FAQs</span>
                  </div>
                  <div>
                    <Button
                      heading="Which Train is best from Delhi to travel to Rishikesh
"
                      handleToggle={handleToggle}
                      infoType="besttrain"
                      setShowExtraInfo={setShowExtraInfo}
                      showExtrInfo={showExtraInfo}
                    />
                    {showExtraInfo["besttrain"] && (
                      <div className="rounded-t-xl border p-5">
                        Yoga Express is the best train to visit Rishikesh from
                        Delhi. There are many train also available in this route
                        such as Yog Nagri Express, Ujjain Express, and Kalinga
                        Utkal Express.
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <HotelPageFooter
        cityInfo={
          typeof router.query?.citySlugName === "string"
            ? capitalize(
                router.query.citySlugName
                  .split("hotels-in-")[1]
                  .split("-under")[0]
                  .split("-")
                  .join(" "),
              )
            : "new-delhi"
        }
        staticData={staticData}
      />
    </>
  );
}

// export async function getStaticPaths(context: any) {
//   const citiesList = await getTopCitiesInCountry();
//   const paths = citiesList.data.map((city: any) => ({
//     params: { citySlugName: city.hotelCity_Slug_Name },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticPaths(context: any) {
//   const citiesList = await getTopCitiesInCountry();

//   // Generate paths based on hotelCityData
//   const paths = citiesList.data.flatMap((city: any) => {
//     const citySlugName = city.hotelCity_Slug_Name; // e.g., "hotels-in-new-delhi"
//     const ranges = hotelCityData[citySlugName] || [];

//     return [
//       { params: { citySlugName: citySlugName } }, // Path like /hotels-in-new-delhi
//       ...ranges.map((range: string) => ({
//         params: { citySlugName: `${range}-${citySlugName}` }, // Path like /hotels-in-new-delhi-under-3000
//       })),
//     ];
//   });

//   console.log("generatedStaticpaths", paths);

//   return {
//     paths,
//     fallback: true,
//   };
// }
export async function getStaticPaths(context: any) {
  const citiesList = await getTopCitiesInCountry();

  // Generate paths based on hotelCityData
  const paths = citiesList.data.flatMap((city: any) => {
    const citySlugName = city.hotelCity_Slug_Name; // e.g., "hotels-in-new-delhi"
    const ranges = hotelCityData[citySlugName] || [];

    return [
      // Base path for the city e.g., hotels-in-agra
      { params: { citySlugName: citySlugName } },

      // Paths with ranges e.g, 3-star-hotels-in-agra, hotels-in-agra-under-1000
      ...ranges.map((range: string) => {
        // conditionally form the url based on under and star
        const combinedSlug = range.startsWith("under" || "above")
          ? `${citySlugName}-${range}`
          : `${range}-${citySlugName}`;

        return { params: { citySlugName: combinedSlug } };
      }),
    ];
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const citySlug = params?.citySlugName as string;
  let cityName = "";
  if (citySlug.includes("star")) {
    if (
      citySlug.includes("under") ||
      citySlug.includes("above") ||
      citySlug.includes("between")
    ) {
      // If the slug has a star rating and a price range, split to get the part after "star-"
      cityName = citySlug
        .split("star-")[1]
        .split("-under")[0]
        .split("-above")[0]
        .split("-between")[0];
    } else {
      // If the slug has a star rating but no price range, split to get the part after "star-"
      cityName = citySlug.split("star-")[1];
    }
  } else {
    if (
      citySlug.includes("under") ||
      citySlug.includes("above") ||
      citySlug.includes("between")
    ) {
      // If the slug has no star rating but has a price range, split to get the part before the price range
      cityName = citySlug
        .split("-under")[0]
        .split("-above")[0]
        .split("-between")[0];
    } else {
      // If the slug has no star rating and no price range, use the slug as is
      cityName = citySlug;
    }
  }


  const serializedCityInfo = await fetchCityInfo(cityName);
  const serializedAvailableHotels = await fetchAvailableHotels(cityName);
  const staticData = await fetchStaticData(cityName?.split("hotels-in-")[1]);

  let hotelInfo: any = [];

  if (citySlug.includes("star")) {
    hotelInfo = await handleStarRatedHotels(citySlug);
  } else if (citySlug.includes("under") || citySlug.includes("above")) {
    hotelInfo = await handlePriceConditionHotels(citySlug);
  } else {
    hotelInfo = await fetchGeneralHotelInfo(citySlug);
  }

  if (hotelInfo.status === "FAILED") {
    return {
      notFound: true,
    };
  }

  // if hotelInfo.data.length is 0 then do not make static page for that city
  if (hotelInfo.status === "OK" && hotelInfo.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const serializedHotelInfo: any =
    hotelInfo.status === "OK" && hotelInfo.error === null
      ? JSON.stringify(hotelInfo.data)
      : {};

  return {
    props: {
      pageLoad: true,
      cityInfo: JSON.parse(serializedCityInfo),
      hotelInfo: JSON.parse(serializedHotelInfo),
      availableHotels: JSON.parse(serializedAvailableHotels),
      staticData: staticData,
    },
  };
}
