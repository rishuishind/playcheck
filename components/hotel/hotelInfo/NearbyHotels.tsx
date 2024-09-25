// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import NearByHotelsCard from "../NearByHotelsCard";
import { HotelInformationDetails } from "@/lib/classModels/hotels/hotelInfo";
import dynamic from "next/dynamic";

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
);
const ChevronRightIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronRightIcon"),
);

type Props = {
  data: HotelInformationDetails[];
  prevSlide: any;
  nextSlide: any;
  currentHotelData: HotelInformationDetails;
  slideRef: any;
};

export default function NearbyHotels({
  data,
  nextSlide,
  prevSlide,
  currentHotelData,
  slideRef,
}: Props) {
  return (
    <>
      {data.length > 0 && (
        <div id="nearby-hotels" className="navLink">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-2xl font-bold leading-none tracking-wider">
              Nearby Hotels
            </h2>
            <div className="flex gap-3">
              <ChevronLeftIcon
                onClick={prevSlide}
                className={` h-9 w-9 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]`}
              />
              <ChevronRightIcon
                onClick={nextSlide}
                className={` h-9 w-9 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]`}
              />
            </div>
          </div>

          <div className="flex">
            <div className="hidden min-w-[240px] flex-col md:flex">
              <p className="mb-1.5 font-semibold text-secondary">
                Current hotel
              </p>
              <NearByHotelsCard info={currentHotelData} />
            </div>
            <div
              className="container-snap flex w-full items-end gap-2 overflow-x-scroll px-1"
              ref={slideRef}
            >
              {data.map((element: HotelInformationDetails, index: any) => (
                <NearByHotelsCard key={index} info={element} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
