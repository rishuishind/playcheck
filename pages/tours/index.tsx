// import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomHead from "@/components/header/CustomHead";
import { tourPackages } from "@/lib/constantData";
import { LOGO_IMAGE_URL1, TOUR_URL } from "@/lib/helper";

export default function ToursPage() {
  // const [value, setValue] = useState<string>("");
  // const [searchResults, setSearchResults] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const performSearch = async (query: string) => {
  //   if (query === "") return setSearchResults([]);
  //   setIsLoading(true);

  //   const hotelResponse = await fetch(`/api/search/hotels?q=${query}`);
  //   const cityResponse = await fetch(`/api/search/city?q=${query}`);
  //   const regionResponse = await fetch(`/api/search/region?q=${query}`);

  //   const [hotelData, cityData, regionData] = await Promise.all([
  //     hotelResponse.json(),
  //     cityResponse.json(),
  //     regionResponse.json(),
  //   ]);

  //   const formattedResults = [
  //     {
  //       label: "Hotels",
  //       data: hotelData.hits,
  //     },
  //     {
  //       label: "Cities",
  //       data: cityData.hits,
  //     },
  //     {
  //       label: "Regions",
  //       data: regionData.hits,
  //     },
  //   ];

  //   setSearchResults(formattedResults);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (value) {
  //       performSearch(value);
  //     } else {
  //       setSearchResults([]);
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [value]);

  return (
    <>
      <CustomHead
        metaShowTitle={"Staybook.in | All India Tour packages @70% off"}
        metaDescription={"Book Tour pakcages @70% off all over India"}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${TOUR_URL}`}
      />

      <section className="relative h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center bg-secondary">
          {/* <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40"></div> */}
          <div className="relative grid h-full w-full place-items-center p-4  text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                All India Tours Packages
              </h1>
              <p className="text-sm font-medium md:text-base">Tours @70% off</p>
            </div>
          </div>
        </div>

        {/* <div className="wrapper">
          <div className="w-full max-w-md">
            <p>Search Hotel</p>
            <input
              type="text"
              value={value}
              placeholder={"Search hotel/city/region"}
              onChange={(e) => setValue(e.target.value)}
              className="h-12 w-full"
            />

            {searchResults.length > 0 ? (
              <div className="space-y-2 rounded-lg border-2 bg-yellow-200 p-4">
                {searchResults
                  .filter((result) => result.data.length > 0)
                  .map((result) => (
                    <div key={result.label}>
                      <h3 className="font-semibold tracking-wider">
                        {result.label}
                      </h3>
                      <ul>
                        {result.data.map((item) => (
                          <li
                            key={item.objectID}
                            className="bg-gray-400 p-2 hover:bg-primary/50"
                          >
                            {result.label === "Hotels" ? (
                              <p>{item.hotel_Name}</p>
                            ) : result.label === "Cities" ? (
                              <p>{item.hotelCity_Name}</p>
                            ) : (
                              <p>{item.hotelCityRegion_Name}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            ) : (
              isLoading && <p>Searching...</p>
            )}
          </div>
        </div> */}

        <div className="wrapper grid grid-cols-1 gap-4 py-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tourPackages.map((tour) => (
            <Link
              key={tour.package_URL}
              href={tour.package_URL}
              className="flex h-fit w-full flex-col justify-between gap-3 rounded-xl p-4 shadow-[0px_0px_7px_rgba(0,0,0,0.2)]"
            >
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={tour.package_image_URL}
                  alt={`${tour.package_title} image`}
                  title={`${tour.package_title} image`}
                  width={160}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="mb-0.5 font-bold tracking-wide">
                  {tour.package_title}
                </p>
                <p className="line-clamp-3 text-sm tracking-wide">
                  {tour.package_description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
