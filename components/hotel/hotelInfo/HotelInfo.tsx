import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import FallbackImage from "../FallbackImage";

type Props = {
  hotelName: string;
  hotelLandmark: string;
  hotelStarRating: number;
  hotelGoogleRating: number;
  hotelRatingCount: number;
  hotelImageObjectList: any[];
  handleGalleryView: any;
  imageUrl: string;
  setLoadData: any;
};

export default function HotelInfo({
  hotelName,
  hotelLandmark,
  hotelStarRating,
  hotelGoogleRating,
  hotelRatingCount,
  hotelImageObjectList,
  handleGalleryView,
  imageUrl,
  setLoadData,
}: Props) {
  // const router = useRouter();
  // const canonocalUrl = router.asPath.split("?")[0];
  // // function to handle the share buttonlogic
  // async function handleShareLink() {
  //   const res = await copyToClipboard(`https://staybook.in${canonocalUrl}`);
  //   toast(res);
  // }

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = imageUrl;
    link.as = "image";
    document.head.appendChild(link);
  }, [imageUrl]);

  return (
    <div className="flex w-full flex-col space-y-3 md:w-[60%] xl:w-[70%]">
      <div className="relative flex w-full gap-2 lg:gap-4">
        {/* hotel name, landmark and rating */}
        <div className="flex w-full flex-col justify-between">
          <div className="flex justify-between">
            <h1 className="leading-0 font-bold tracking-wide text-secondary lg:text-xl">
              {hotelName}
              <br />
              <span className="text-base font-semibold leading-none tracking-wider">
                {hotelLandmark}
              </span>
            </h1>
          </div>
          <div className="md:flexcol mt-0.5 flex w-full flex-row justify-between space-x-3 md:space-x-0">
            <div>
              <div>
                {Array.from({
                  length: hotelStarRating,
                }).map((_, idx: any) => (
                  <span key={idx}>&#11088;</span>
                ))}
              </div>
            </div>

            <Link
              href={"#location"}
              className="flex h-full items-center gap-1 rounded-md border-2 p-2 text-sm"
            >
              <p className="whitespace-nowrap  font-bold">
                {hotelGoogleRating} / 5
              </p>
              <p className="whitespace-nowrap">{hotelRatingCount} Ratings</p>
            </Link>
          </div>
        </div>

        {/* rating area */}
        {/* <Link
          href={"#location"}
          className="flex h-full w-fit flex-col items-center justify-center space-y-1 rounded-md border-2 p-2 text-center align-middle text-sm-body-text"
        >
          <p className="whitespace-nowrap  font-bold">
            {hotelGoogleRating} / 5
          </p>
          <p className="whitespace-nowrap">{hotelRatingCount} Ratings</p>
        </Link> */}
      </div>

      {/* hotel gallery with booking card */}
      <div className="relative flex h-full max-h-[43vh] w-full flex-row gap-x-2 md:gap-x-4">
        <div className="hidden h-full w-[50%] flex-col justify-between space-y-2 md:flex md:space-y-4 xl:w-[40%] xl:gap-4 xl:space-y-0">
          {hotelImageObjectList.length > 0 &&
            hotelImageObjectList
              .slice(1, 3)
              .map((image: any, index: number) => (
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
                      priority={true}
                      blurDataURL={image.image_Url}
                      onLoad={() => setLoadData(true)}
                    />
                  ) : (
                    <FallbackImage />
                  )}
                </div>
              ))}
        </div>
        <div
          className="relative h-[180px] w-full overflow-hidden rounded-md md:h-full md:rounded-lg"
          style={{ aspectRatio: "16/9" }}
        >
          {imageUrl ? (
            <Image
              alt="hotel_Main_Image"
              src={imageUrl}
              title="hotel main image"
              fill
              sizes="45vh"
              placeholder="blur"
              blurDataURL={imageUrl}
              priority={true}
              onLoad={() => setLoadData(true)}
              onClick={handleGalleryView}
              className="object-cover"
            />
          ) : (
            <FallbackImage />
          )}
          <button
            onClick={handleGalleryView}
            className="absolute bottom-3 right-3 z-10 flex items-center justify-between gap-1 rounded-md border-2 border-secondary bg-white px-1 py-0.5 text-xs font-medium sm:text-sm md:px-2 md:py-1 lg:bottom-5 lg:right-5"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}
