import { useEffect, useRef, useState } from "react";
import { IAMGE_GALLERY_INFO_ID } from "@/lib/helper";
import { HotelImageDetails } from "@/lib/classModels/images/hotelImageDetails";
import Image from "next/image";
// import {
  //   ChevronLeftIcon,
  //   ChevronRightIcon,
  //   ViewGridIcon,
  // } from "@heroicons/react/solid";
import dynamic from "next/dynamic";

const ChevronLeftIcon = dynamic(() => import("@heroicons/react/solid/ChevronLeftIcon"));
const ChevronRightIcon = dynamic(() => import("@heroicons/react/solid/ChevronRightIcon"));
const ViewGridIcon = dynamic(() => import("@heroicons/react/solid/ViewGridIcon"));

const FullScreenImageGallery = dynamic(
  () => import("./FullScreenImageGallery"),
  {
    ssr: false,
  }
);

type Props = {
  imagesList: HotelImageDetails[];
  roomsList: any[];
  showMoreButton: boolean;
  isHotelPage: boolean;
  loadMainImage: boolean;
  setLoadMainImage: (val: boolean) => void;
};

export default function ImageGallery({
  imagesList,
  showMoreButton,
  roomsList,
  isHotelPage,
  setLoadMainImage,
}: Props) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [leftIcon, setLeftIcon] = useState<boolean>(false);
  const [rightIcon, setRightIcon] = useState<boolean>(true);

  // handle next slide
  const handleNextImage = () => {
    if (imageRef.current) {
      const imageWidth =
        imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
      const currentScroll = imageRef.current.scrollLeft;
      const maxScroll =
        imageRef.current.scrollWidth - imageRef.current.clientWidth;

      imageRef.current.scrollTo({
        left: currentScroll + imageWidth,
        behavior: "smooth",
      });

      // Update Chevron visibility
      setLeftIcon(true);
      if (currentScroll + imageWidth >= maxScroll) {
        setRightIcon(false);
      }
    }
  };

  // hanlde previous slide
  const handlePrevImage = () => {
    if (imageRef.current) {
      const imageWidth =
        imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
      const currentScroll = imageRef.current.scrollLeft;
      imageRef.current.scrollTo({
        left: currentScroll - imageWidth,
        behavior: "smooth",
      });

      // Update Chevron visibility
      setRightIcon(true);
      if (currentScroll - imageWidth <= 0) {
        setLeftIcon(false);
      }
    }
  };

  const handleScroll = () => {
    if (imageRef.current) {
      const currentScroll = imageRef.current.scrollLeft;
      const maxScroll =
        imageRef.current.scrollWidth - imageRef.current.clientWidth;

      // Update Chevron visibility
      setLeftIcon(currentScroll > 0);
      setRightIcon(currentScroll < maxScroll);
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      setLeftIcon(false);
      setRightIcon(true);

      // Check if there is room to scroll right initially
      if (imageRef.current.scrollWidth <= imageRef.current.clientWidth) {
        setRightIcon(false);
      }

      imageRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [imagesList]);

  // state and function to show fullScreen gallery
  const [galleryView, setGalleryView] = useState<boolean>(false);
  const [fullScreenImageGallery, setFullScreenImageGallery] =
    useState<boolean>(false);
  const handlegalleryView = () => {
    setGalleryView((prev: any) => !prev);
    setFullScreenImageGallery((prev: any) => !prev);
  };

  return (
    <>
      <div className={`${galleryView ? "block" : "hidden"}`}>
        <FullScreenImageGallery
          imageList={imagesList}
          imageModel={fullScreenImageGallery}
          roomList={roomsList}
          isHotelPage={isHotelPage}
          handleClose={handlegalleryView}
        />
      </div>

      <div id={IAMGE_GALLERY_INFO_ID} className="relative w-full h-full">
        <ChevronLeftIcon
          onClick={handlePrevImage}
          className={`z-10 w-8 h-8 p-1 cursor-pointer bg-white rounded-full shadow-[0px_0px_12px_rgba(0,0,0,0.2)] absolute left-5 top-1/2 -translate-y-1/2 ${
            leftIcon ? "" : "hidden"
          }`}
        />
        <div
          ref={imageRef}
          className="relative w-full h-full flex snap-x snap-mandatory overflow-x-scroll container-snap"
        >
          {imagesList.map((image: HotelImageDetails, index: number) => (
            <div
              key={index}
              className="snap-center overflow-hidden aspect-video min-w-full h-full bg-[url('/fallback_image.jpg')] bg-cover bg-center"
            >
              {image.image_Url === "" ? (
                <Image
                  src={"/fallback_image.jpg"}
                  alt={"fallback_image"}
                  width={160}
                  height={90}
                  className="w-full h-full object-cover"
                  priority={true}
                />
              ) : (
                <Image
                  src={image.image_Url}
                  alt={image.image_Description}
                  width={160}
                  height={90}
                  className="w-full h-full object-cover"
                  // priority={true}
                  unoptimized
                  placeholder="blur"
                  blurDataURL={image.image_Url}
                  onLoad={(e) => {
                    if (imagesList.length - 1 === index) {
                      setLoadMainImage(true);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <ChevronRightIcon
          onClick={handleNextImage}
          className={`z-10 w-8 h-8 p-1 cursor-pointer bg-white rounded-full shadow-[0px_0px_12px_rgba(0,0,0,0.2)] absolute right-5 top-1/2 -translate-y-1/2 ${
            rightIcon ? "" : "hidden"
          }`}
        />
        {showMoreButton && (
          <button
            onClick={handlegalleryView}
            className="p-1 px-2 flex items-center justify-between border-2 font-medium gap-1 rounded-md bg-white border-secondary absolute bottom-3 right-3 lg:bottom-5 lg:right-5 z-10 text-xs sm:text-sm"
          >
            <ViewGridIcon className="w-5 h-5" />
            Show More
          </button>
        )}
      </div>
    </>
  );
}
