import { HotelImageDetails } from "@/lib/classModels/images/hotelImageDetails";
import Image from "next/image";
import FallbackImage from "../../FallbackImage";
import BookingCard from "../../BookingCard/BookingCard";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ImageLoader } from "@/components/skeleton/HotelSkeletons";

const ViewGridIcon = dynamic(
  () => import("@heroicons/react/solid/ViewGridIcon"),
  { ssr: false },
);

type Props = {
  hotelName: string;
  hotelLandmark: string;
  hotelStarRating: number;
  hotelGoogleRating: number;
  hotelGoogelRatingsCount: number;
  hotelImageObjectList: HotelImageDetails[];
  handleGalleryView: any;
  hotelImageUrl: string;
  setMainImageLoaded: Function;
};

export default function HotelGallerySection({
  hotelName,
  hotelLandmark,
  hotelStarRating,
  hotelGoogleRating,
  hotelGoogelRatingsCount,
  hotelImageObjectList,
  handleGalleryView,
  hotelImageUrl,
  setMainImageLoaded,
}: Props) {
  return (
    <div className="wrapper flex w-full flex-col space-y-3 sm:space-x-4 md:flex-row md:space-y-0 md:py-2.5 lg:py-4">
      <div className="flex w-full flex-col justify-between space-y-3 md:w-[50%] lg:w-[60%] xl:w-[70%]">
        <div className="relative flex w-full gap-2 lg:gap-4">
          {/* hotel name, landmark and rating */}
          <div className="flex w-full flex-col justify-between">
            <h1 className="leading-0 text-lg font-bold tracking-wide text-secondary xl:text-2xl">
              {hotelName}
              <br />
              <span className="text-base font-semibold leading-none tracking-wider">
                {hotelLandmark}
              </span>
            </h1>
            <div className="mt-0.5 flex flex-row space-x-3 md:flex-col md:space-x-0">
              <div>
                {Array.from({
                  length: hotelStarRating,
                }).map((_, idx: any) => (
                  <span key={idx}>&#11088;</span>
                ))}
              </div>
            </div>
          </div>

          {/* rating area */}
          <Link
            href={"#location"}
            className="flex h-full w-fit cursor-pointer flex-col items-center justify-center space-y-1 rounded-md border-2 p-2 text-center align-middle text-sm-body-text"
          >
            <p className=" whitespace-nowrap text-lg font-bold">
              {hotelGoogleRating} / 5
            </p>
            <p className="whitespace-nowrap">
              {hotelGoogelRatingsCount} Ratings
            </p>
          </Link>
        </div>

        {/* hotel gallery with booking card */}
        <div className="relative flex h-full max-h-[50vh] w-full flex-row gap-x-2 md:gap-x-4">
          <div className="hidden h-full w-[50%] flex-col justify-between space-y-2 md:flex md:space-y-4 xl:w-[40%] xl:gap-4 xl:space-y-0">
            {hotelImageObjectList.length > 0
              ? hotelImageObjectList
                  .slice(1, 3)
                  .map((image: HotelImageDetails, index: number) => (
                    <div
                      key={index}
                      onClick={handleGalleryView}
                      className="relative h-[50%] w-full overflow-hidden rounded-md md:rounded-lg"
                    >
                      {image.image_Url ? (
                        <Image
                          alt="hotel_Image"
                          src={image.image_Url}
                          title={image.image_Description}
                          width={160}
                          height={90}
                          className="h-full w-full object-cover"
                          sizes={`20vh`}
                          placeholder="blur"
                          blurDataURL={image.image_Url}
                          priority
                        />
                      ) : (
                        <FallbackImage />
                      )}
                    </div>
                  ))
              : [...Array(2)].map((_, idx) => (
                  <div
                    key={idx}
                    className="relative h-[50%] w-full overflow-hidden rounded-md md:rounded-lg"
                  >
                    <ImageLoader />
                  </div>
                ))}
          </div>
          <div
            className="relative h-[180px] w-full overflow-hidden rounded-md md:h-full md:rounded-lg"
            style={{ aspectRatio: "16/9" }}
          >
            {hotelImageUrl ? (
              <Image
                title={`${hotelName} main image`}
                src={hotelImageUrl}
                alt="Hotel Image"
                className="object-cover"
                fill
                sizes="60vh"
                priority={true}
                placeholder="blur"
                blurDataURL={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkCAqoBwACHwEjQOcXOQAAAABJRU5ErkJggg=="
                }
                onLoadingComplete={() => {
                  setMainImageLoaded(true);
                }}
              />
            ) : (
              <FallbackImage />
            )}
            <button
              onClick={handleGalleryView}
              className="absolute bottom-3 right-3 z-10 flex items-center justify-between gap-1 rounded-md border-2 border-secondary bg-white px-1 py-0.5 text-xs font-medium sm:text-sm md:px-2 md:py-1 lg:bottom-5 lg:right-5"
            >
              <ViewGridIcon className="h-5 w-5" />
              Show More
            </button>
          </div>
        </div>
      </div>

      <div className="w-full justify-center md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <BookingCard />
      </div>
    </div>
  );
}
