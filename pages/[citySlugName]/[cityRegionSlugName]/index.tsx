import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { RegionInformation } from "@/lib/classModels/hotelRegions/HotelCityInfo";
import { HotelRegionSkeletons } from "@/components/skeleton/HotelTabSkeletonCard";
import { CityRegionSearchNavbar } from "@/components/navbar/CityRegionSearchNavbar";
import { useSearchParams } from "next/navigation";
import { XCircleIcon, XIcon } from "@heroicons/react/solid";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCityHead from "@/components/header/CustomCityHead";
// import RegionsUiCard from "@/components/city/RegionsUiCard";
import DescriptionUiCard from "@/components/city/DescriptionUiCard";
import {
  // getAllAmenitiesList,
  getHotelsListOfCityRegion,
  getHotelsListOfCityRegionWithPagination,
  getPriceRange,
  getRegionInfo,
  getRegionsOfCity,
  getTopCitiesInCountry,
} from "@/lib/firebase/cityHandler";
import RatingCard from "@/components/city/filters/RatingCard";
import PriceCard from "@/components/city/filters/PriceCard";
// import { PropertiesSkeleton } from "@/components/skeleton/skeletons";
import HotelCitySlugCard from "@/components/city/HotelCitySlugCard";
import { fetchStaticData } from "@/lib/helper/fetchStaticData";
import HotelPageFooter from "@/components/footer/HotelPageFooter";
import { capitalize } from "instantsearch.js/es/lib/utils";
import AmenityCard from "@/components/city/filters/AmenityCard";

type Props = {
  regionInfo: RegionInformation;
  hotelInfo: any;
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

export default function HotelCityRegionPage(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);

  // get the city slug from the query
  const queryCitySlug = router.query.citySlugName + "";
  const queryRegionSlug = router.query.cityRegionSlugName + "";
  // const formattedCitySlug = unDashifyStringWithCpitalise(queryCitySlug);
  const cityName = capitalize(
    typeof router.query.citySlugName === "string"
      ? router.query.citySlugName.split("hotels-in-").pop() ?? "New-Delhi"
      : "New-Delhi",
  )
    .split("-")
    .join(" ");
  const formattedCityRegionSlug = unDashifyStringWithCpitalise(queryRegionSlug);
  const firstBatchdocsLimit = 4;
  const nextbatchdocsLimit = 3;

  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageName, setPageName] = useState<string>(
    `Hotels in ${formattedCityRegionSlug}`,
  );
  // const [showAllRegions, setShowAllRegions] = useState<boolean>(false);
  // const [showAllMobileRegions, setShowAllMobileRegions] =
  //   useState<boolean>(false);
  // const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  // const [showAllMobileAmenities, setShowAllMobileAmenities] =
  //   useState<boolean>(false);

  const [mobileFilterModel, setMobileFilterModel] = useState<boolean>(false);
  const [hotelsList, setHotelsList] = useState<any[]>([]);
  const [staticHotels, setStaticHotels] = useState<any[]>(props.hotelInfo);

  const [lastDoc, setLastDocId] = useState<string | null>(null);

  const [availableHotels, setAvailableHotels] = useState<any[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<any[]>([]);
  const [availableRegions, setAvailableRegions] = useState<any[]>([]);

  const [amenityFilters, setAmenityFilters] = useState<any[]>([]);
  const [priceFilters, setPriceFilters] = useState<any[]>([]);
  const [ratingFilters, setRatingFilters] = useState<any[]>([]);
  const [regionFilters, setRegionFilters] = useState<any[]>([]);
  const [totalSelectedFilters, setTotalSelectedFilters] = useState<any[]>([]);
  const routename = router.pathname.split("/")[3];

  const hasCheckinCheckout =
    router.query.hasOwnProperty("checkin") &&
    router.query.hasOwnProperty("checkout");

  useEffect(() => {
    setStaticHotels(props.hotelInfo);
  }, [props.hotelInfo]);

  // get hotels list in the current city
  // const handleInitialDataLoad = async () => {
  //   // setIsLoading(true);

  //   // get the data from url search params
  //   const ratingStringParams = searchParams.get("rating");
  //   const priceStringParams = searchParams.get("price");
  //   const regionsStringParams = searchParams.get("regions");
  //   const amenitiesStringParams = searchParams.get("amenityId");

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
  //     // // get all the hotels list of the current city for seo schema
  //     // const hotelsListOfCityRes = await getAllHotelsListOfCity(queryCitySlug);
  //     // if (
  //     //   hotelsListOfCityRes.status === "OK" &&
  //     //   hotelsListOfCityRes.error === null
  //     // ) {
  //     //   setAvailableHotels(hotelsListOfCityRes.data);
  //     // } else {
  //     //   console.error(hotelsListOfCityRes.error);
  //     // }

  //     // ge the paginated results for the city hotels
  //     const paginationRes = await getHotelsListOfCityRegionWithPagination(
  //       queryCitySlug,
  //       queryRegionSlug,
  //       firstBatchdocsLimit,
  //       lastDoc,
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

  //     // get the list of ameities from database to show in the filters
  //     const amenityListRes = await getAllAmenitiesList();
  //     if (amenityListRes.status === "OK" && amenityListRes.error === null) {
  //       setAvailableAmenities(amenityListRes.data);
  //     } else {
  //       console.error(amenityListRes.error);
  //     }

  //     // get the list of regions for the current city to show in the filters
  //     const regionListRes = await getRegionsOfCity(queryCitySlug);
  //     if (regionListRes.status === "OK" && regionListRes.error === null) {
  //       const filteredRegions = regionListRes.data.filter(
  //         (region: any) =>
  //           region.hotelCityRegion_Slug_Name !==
  //           queryCitySlug + "-|-" + queryRegionSlug,
  //       );
  //       setAvailableRegions(filteredRegions);
  //     } else {
  //       console.error(regionListRes.error);
  //     }
  //   } catch (error: any) {
  //     console.error(error?.message || error);
  //     // setIsLoading(false);
  //   }

  //   // setIsLoading(false);
  // };

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

  // get hotels list with filters
  const getHotelsListWithFilters = async () => {
    // setIsLoading(true);

    // new query strings
    const newQueryString = {
      rating: ratingFilters.join(","),
      price: priceFilters.join(","),
      amenityId: amenityFilters.join(","),
      regions: regionFilters.join(","),
    };

    // Construct query string
    const queryString = new URLSearchParams(newQueryString).toString();
    const newUrl = `/${queryCitySlug}/${queryRegionSlug}?${queryString}`;

    // Update the URL without refreshing the page
    router.push(newUrl, undefined, { shallow: true });

    try {
      const res = await getHotelsListOfCityRegionWithPagination(
        queryCitySlug,
        queryRegionSlug,
        firstBatchdocsLimit,
        lastDoc,
        regionFilters,
        ratingFilters,
        priceFilters,
        [],
      );

      if (res.status === "OK" && res.error === null) {
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

  // handle paginated results in the current city
  const handleInfiniteScroll = async () => {
    try {
      // stop fetching if ther are no more docuemnts
      if (!hasMoreData) return;

      if (queryCitySlug && queryRegionSlug && lastDoc) {
        const res = await getHotelsListOfCityRegionWithPagination(
          queryCitySlug,
          queryRegionSlug,
          nextbatchdocsLimit,
          lastDoc,
          regionFilters,
          ratingFilters,
          priceFilters,
          [],
        );

        if (res.status === "OK" && res.error === null) {
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

  // clear all the selected filter
  const handleClearFilters = async () => {
    // setIsLoading(true);

    setAmenityFilters([]);
    setPriceFilters([]);
    setRatingFilters([]);
    setRegionFilters([]);
    router.push(`/${queryCitySlug}/${queryRegionSlug}`);

    try {
      const res = await getHotelsListOfCityRegionWithPagination(
        queryCitySlug,
        queryRegionSlug,
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
  useEffect(() => {
    setPageName(`Hotels in ${formattedCityRegionSlug}`);
    const fetchData = async () => {
      if (hasCheckinCheckout) {
        try {
          const res = await getHotelsListOfCityRegionWithPagination(
            queryCitySlug,
            queryRegionSlug,
            firstBatchdocsLimit,
            lastDoc,
            regionFilters,
            ratingFilters,
            priceFilters,
            [],
          );

          if (res.status === "OK" && res.error === null) {
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
      }
    };
    fetchData();
  }, [router.query]);

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

  const renderExtraUI = (index: number) => {
    // Insert UI elements based on index or other conditions
    // if (index === 0) {
    //   return (
    //     <RegionsUiCard
    //       margin={"mb-4"}
    //       heading={`Nearby Reagions of ${formattedCityRegionSlug}`}
    //       regionsInfo={availableRegions}
    //     />
    //   );
    // }
    if (index + 1 === 4 || index === hotelsList.length - 1) {
      return (
        <DescriptionUiCard
          margin={"mb-4"}
          heading={`About ${formattedCityRegionSlug}`}
          cityInfo={null}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <CustomCityHead
        metaShowTitle={props.regionInfo?.hotelCityRegion_Meta_Title}
        metaDescription={props.regionInfo?.hotelCityRegion_Meta_Description}
        metaImageUrl={props.regionInfo?.hotelCityRegion_Display_Image_Url}
        canonicalUrl={`https://staybook.in/${queryCitySlug}/${queryRegionSlug}`}
        all_hotel_in_city={[]}
        cityName={props.regionInfo?.hotelCityRegion_Name}
      />
      <CityRegionSearchNavbar
        search_title={
          typeof router.query.cityRegionSlugName === "string"
            ? router.query.cityRegionSlugName.replace(/-/g, " ")
            : ""
        }
      />
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
              className="rounded bg-white px-4 py-2 font-medium tracking-wide text-primary"
              onClick={() => {
                setMobileFilterModel(false);
                handleClearFilters();
              }}
            >
              Clear filter
            </button>
          </div>

          <div className="bg-lightText w-full overflow-y-scroll p-4">
            <div className="h-auto w-full pb-16">
              {/* total selected filters */}
              {totalSelectedFilters.length > 0 && (
                <div className="mt-4 w-full rounded-xl border-2">
                  <div className="border-b-2 py-2 pl-3">
                    <p className="font-bold text-primary">Selected Filters</p>
                  </div>

                  <div className="flex flex-wrap gap-2 p-2.5">
                    {totalSelectedFilters.map((item, index) => {
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
                          className="flex w-fit items-center justify-between gap-1.5 rounded-full bg-primary py-0.5 pl-2.5 pr-0.5 text-sm text-white"
                        >
                          <p className="text-nowrap text-lightText leading-none">
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
            </div>
          </div>
        </div>
      )}
      <div className="h-auto w-full">
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
                    {totalSelectedFilters.map((item, index) => {
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
                          <p className="text-nowrap text-lightText leading-none">
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
            </div>

            {/* right section div */}
            <div className="h-full w-full pb-7 md:w-[64%] md:pl-3 lg:w-[68%] xl:w-[74%]">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-lg font-bold text-secondary sm:text-2xl">
                    {pageName}, {cityName}
                  </h1>
                  <div className="relative overflow-hidden">
                    {<p>{staticHotels?.length} properties found</p>}
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

              {
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
              }
            </div>
          </div>
        </div>
      </div>
      <HotelPageFooter
        cityInfo={
          typeof router.query?.citySlugName === "string"
            ? capitalize(router.query.citySlugName.split("hotels-in-")[1])
            : "new-delhi"
        }
        staticData={props.staticData}
      />
    </>
  );
}
// Making these static pages by using getStaticPaths and getStaticProps

export async function getStaticPaths() {
  const citiesList = await getTopCitiesInCountry();

  // Initialize an empty array to hold all paths
  let paths: any = [];

  // Iterate over each city
  for (const city of citiesList.data) {
    // Fetch regions for the current city
    const regionsResult = await getRegionsOfCity(city.hotelCity_Slug_Name);
    if (regionsResult.status === "OK" && regionsResult.error === null) {
      // Iterate over each region and create a path for it
      for (const region of regionsResult.data) {
        const slug = `${city.hotelCity_Slug_Name}/${region.hotelCityRegion_Slug_Name.split("-|-").pop()}`;
        paths.push({
          params: {
            citySlugName: city.hotelCity_Slug_Name,
            cityRegionSlugName: slug,
            // fallback: false
          },
        });
      }
    }
  }

  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const regionInfo: any = await getRegionInfo(
    `${params.citySlugName}-|-${params.cityRegionSlugName.split("/").pop()}`,
  );
  const serializedRegionInfo = JSON.stringify(regionInfo.data);

  if (
    regionInfo.data.hotelCityRegion_Name === "" ||
    regionInfo.status === "FAILED"
  ) {
    return {
      notFound: true,
    };
  }

  const hotelInfo = await getHotelsListOfCityRegion(
    params.citySlugName,
    params.cityRegionSlugName.split("/").pop(),
  );

  if (hotelInfo.status === "FAILED") {
    return {
      notFound: true,
    };
  }

  const serailizedHotelInfo = JSON.stringify(hotelInfo.hotels);

  const staticData = await fetchStaticData(
    params.citySlugName.split("hotels-in-")[1],
  );

  return {
    props: {
      regionInfo: JSON.parse(serializedRegionInfo),
      hotelInfo: JSON.parse(serailizedHotelInfo),
      staticData: staticData,
    },
  };
}