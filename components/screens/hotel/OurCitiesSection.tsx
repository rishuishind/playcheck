import { useEffect, useRef, useState } from "react";
import CityCard from "./cards/CityCard";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { get_gallery_cities } from "@/lib/firebase/cityHandler";
import CitiesModel from "@/components/widgets/CitiesModel";
import dynamic from "next/dynamic";

const ChevronLeftIcon = dynamic(() => import("@heroicons/react/solid/ChevronLeftIcon"));
const ChevronRightIcon = dynamic(() => import("@heroicons/react/solid/ChevronRightIcon"));

type Props = {
  // our_cities_array: any[];
  // last_doc_value: any;
};

export default function OurCitiesSection(props: Props) {
  const [lastDocValue, setlastDocValue] = useState();
  const [ourCitiesArray, setourCitiesArray] = useState<any[]>([]);

  const [hasMoreDoc, sethasMoreDoc] = useState(true);

  async function load_data() {
    const { results, last_doc_value } = await get_gallery_cities();
    setourCitiesArray(results);
    setlastDocValue(last_doc_value);
  }

  useEffect(() => {
    load_data();
  }, []);

  async function handlePagination() {
    if (!lastDocValue) return;

    const { results, last_doc_value } = await get_gallery_cities(
      lastDocValue,
      2
    );

    if (last_doc_value) {
      sethasMoreDoc(true);
    } else {
      sethasMoreDoc(false);
    }
    setlastDocValue(last_doc_value);
    setourCitiesArray((prev) => [...prev, ...results]);
  }

  const slideContainerRef = useRef<any>(null);

  const nextSlide = () => {
    handlePagination();
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;

      const currentScroll = slideContainerRef.current.scrollLeft;

      slideContainerRef.current.scrollTo({
        left: currentScroll + cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;
      const currentScroll = slideContainerRef.current.scrollLeft;
      slideContainerRef.current.scrollTo({
        left: currentScroll - cardWidth,
        behavior: "smooth",
      });
    }
  };

  const [width, setWidth] = useState(0);
  const [currentScrollLeft, setCurrentScrollLeft] = useState(0);

  const updateDivWidth = (e) => {
    const newScrollLeft = slideContainerRef.current.scrollLeft;
    if (currentScrollLeft < newScrollLeft) {
      setCurrentScrollLeft(newScrollLeft);
      if (width === 0) {
        setWidth(slideContainerRef.current.clientWidth + 10);
      } else {
        setWidth((previous) => previous + 10);
      }
    }
  };

  const [citiesModel, setCitiesModel] = useState<boolean>(false);

  return (
    <>
      {citiesModel && (
        <CitiesModel
          modelState={citiesModel}
          setModelState={setCitiesModel}
          dataList={ourCitiesArray}
          setDataList={setourCitiesArray}
          lastDoc={lastDocValue}
          setLastDoc={setlastDocValue}
        />
      )}
      <div className="wrapper h-full py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide">
            Our Cities
          </h2>
          <button
            onClick={() => setCitiesModel(true)}
            className="p-2 px-4 text-xs md:text-base text-white font-medium rounded bg-secondary"
          >
            View More
          </button>
        </div>

        <div className="relative flex w-full">
          <ChevronLeftIcon
            onClick={prevSlide}
            className={`w-10 h-10 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-full p-1 cursor-pointer`}
          />
          <ChevronRightIcon
            onClick={nextSlide}
            className="w-10 h-10 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-full p-1 cursor-pointer"
          />

          <div
            className="relative mt-4 w-full flex gap-4 snap-x snap-mandatory overflow-x-scroll container-snap"
            style={{ overflowX: "scroll", width: "100%" }}
            ref={slideContainerRef}
          >
            {ourCitiesArray.map((slide: any, index: number) => (
              <CityCard
                key={index}
                imageUrl={slide.imageUrl}
                cityName={slide.cityName}
                linkUrl={slide.linkUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
