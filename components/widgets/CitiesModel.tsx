// import { ChevronLeftIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import CityCard from "../screens/hotel/cards/CityCard";
import { get_gallery_cities } from "@/lib/firebase/cityHandler";
import LandScapeCityCard from "../screens/hotel/cards/LandScapeCityCard";
import dynamic from "next/dynamic";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));
const ChevronLeftIcon = dynamic(() => import("@heroicons/react/solid/ChevronLeftIcon"));

type Props = {
  modelState: boolean;
  setModelState: Function;
  dataList: any;
  setDataList: Function;
  lastDoc: string | undefined;
  setLastDoc: Function;
};

export default function CitiesModel({
  modelState,
  setModelState,
  dataList,
  setDataList,
  lastDoc,
  setLastDoc,
}: Props) {
  useEffect(() => {
    if (modelState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modelState]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMoreDoc, sethasMoreDoc] = useState(false);

  async function handlePagination() {
    if (!lastDoc) return;

    const { results, last_doc_value } = await get_gallery_cities(lastDoc, 2);

    if (last_doc_value) {
      sethasMoreDoc(true);
    } else {
      sethasMoreDoc(false);
    }
    setLastDoc(last_doc_value);
    setDataList((prev: any) => [...prev, ...results]);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight + 10 >= scrollHeight) {
          handlePagination();
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, handlePagination]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 grid place-items-center">
      <div className="relative bg-white rounded-lg w-full h-full">
        <div className="container mx-auto">
          <div
            onClick={() => setModelState(!modelState)}
            className="flex items-center gap-2.5 w-full p-4 cursor-pointer shadow"
          >
            <span>
              <ChevronLeftIcon className="w-6 h-6" />
            </span>
            <h4 className="font-bold text-secondary text-lg flex gap-1 flex-wrap">
              Our Cities
            </h4>
          </div>
          <div
            ref={containerRef}
            className="p-4 h-[100vh] overflow-y-scroll container-snap"
          >
            {dataList.map((slide: any, index: number) => (
              <LandScapeCityCard
                key={index}
                imageUrl={slide.imageUrl}
                cityName={slide.cityName}
                linkUrl={slide.linkUrl}
                cityInfo={slide.cityInfo}
                cityDescription={slide.cityDescription}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
