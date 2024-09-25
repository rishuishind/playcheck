import BookingCard from "@/components/hotel/BookingCard/BookingCard";
import FallbackImage from "@/components/hotel/FallbackImage";
import { ViewGridIcon } from "@heroicons/react/solid";
import Image from "next/image";

type Props = {
  hotelRoomType: string;
  hotelRoomInfo: string;
  allHotelRoomPageHandler: any;
  hotelRoomImagesList: any[];
  handlegalleryView: any;
  hotelRoomImageUrl: string;
};

export default function RoomInfoSection({
  hotelRoomType,
  hotelRoomInfo,
  allHotelRoomPageHandler,
  hotelRoomImagesList,
  handlegalleryView,
  hotelRoomImageUrl,
}: Props) {
  return (
    <div className="-mt-4 flex w-full flex-col space-y-4 p-1 sm:space-x-4 md:flex-row md:space-y-0">
      <div className="flex w-full flex-col justify-between space-y-3 md:w-[50%] lg:w-[60%] xl:w-[70%]">
        <div className="relative w-full">
          {/* hotel name, landmark and rating */}
          <div className="flex w-full items-end justify-between">
            <div className={`relative flex w-full flex-col`}>
              <h1 className="leading-0 text-lg font-bold tracking-wide text-secondary xl:text-2xl">
                {hotelRoomType}
              </h1>
              <p>{hotelRoomInfo}</p>
            </div>
            <button
              onClick={allHotelRoomPageHandler}
              className="whitespace-nowrap rounded bg-secondary p-1.5 px-3 font-medium tracking-wide text-white"
            >
              View All Rooms
            </button>
          </div>
        </div>

        {/* hotel gallery with booking card */}
        <div className="relative flex aspect-video max-h-[50vh] w-full flex-row gap-x-2 md:space-x-4">
          <div className="hidden h-full w-[50%] flex-col justify-between space-y-2 sm:flex md:space-y-4 xl:w-[40%] xl:gap-4 xl:space-y-0">
            {hotelRoomImagesList.length > 0 &&
              hotelRoomImagesList
                .slice(1, 3)
                .map((image: any, index: number) => (
                  <div
                    key={index}
                    onClick={handlegalleryView}
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
                        // onLoad={() => setLoadMainImage(true)}
                      />
                    ) : (
                      <FallbackImage />
                    )}
                  </div>
                ))}
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-md md:rounded-lg">
            {hotelRoomImageUrl ? (
              <Image
                alt={"hotel_Main_Image"}
                src={hotelRoomImageUrl}
                title="hotel main image"
                fill
                sizes={`55vh`}
                placeholder="blur"
                blurDataURL={hotelRoomImageUrl}
                priority={true}
                // onLoad={() => setLoadState(true)}
                onClick={handlegalleryView}
                className="object-cover"
              />
            ) : (
              <FallbackImage />
            )}
            <button
              onClick={handlegalleryView}
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
