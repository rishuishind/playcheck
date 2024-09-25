import { useEffect, useRef, useState } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";
import dynamic from "next/dynamic";

const ChevronLeftIcon = dynamic(() => import("@heroicons/react/solid/ChevronLeftIcon"));
const ChevronRightIcon = dynamic(() => import("@heroicons/react/solid/ChevronRightIcon"));

type Props = {
  imagesList: any[];
  selectedImageId: string;
};

export default function ImmersiveGallery({
  imagesList,
  selectedImageId,
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

  // handle sroll form maouse or mousepad
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

  // check initial data
  useEffect(() => {
    if (imageRef.current && imagesList && imagesList.length > 0) {
      setLeftIcon(false);
      setRightIcon(true);

      // Check if there is room to scroll right initially
      if (imageRef.current.scrollWidth <= imageRef.current.clientWidth) {
        setRightIcon(false);
      }

      // Scroll to the selected image if provided
      if (selectedImageId) {
        const selectedImageIndex = imagesList.findIndex(
          (image) => image?.image_Id === selectedImageId,
        );

        if (selectedImageIndex !== -1) {
          const imageWidth =
            imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
          const scrollTo = selectedImageIndex * imageWidth;

          imageRef.current.scrollTo({
            left: scrollTo,
            behavior: "smooth",
          });

          // Update Chevron visibility
          setLeftIcon(scrollTo > 0);
          setRightIcon(scrollTo < imageRef.current.scrollWidth);
        }
      }

      imageRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [imagesList, selectedImageId]);

  return (
    <div className="h-full w-full">
      <ChevronLeftIcon
        onClick={handlePrevImage}
        className={`absolute left-5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_12px_rgba(0,0,0,0.2)] sm:left-10 sm:h-12 sm:w-12 ${
          leftIcon ? "" : "hidden"
        }`}
      />
      <div
        ref={imageRef}
        className="container-snap mx-auto flex aspect-square w-full snap-x snap-mandatory overflow-x-scroll sm:aspect-video sm:w-[74%] xl:w-[60%]"
      >
        {imagesList?.map((image: any, index: number) => (
          <div key={index} className="h-full min-w-full snap-center">
            {image.image_url === "" ? (
              <Image
                src={"/fallback_image.jpg"}
                alt={"fallback_image"}
                width={160}
                height={90}
                className="h-full w-full object-cover"
                quality={10}
              />
            ) : (
              <LazyLoadImage
                src={image.image_Url}
                alt={`${image.image_Description} all_image`}
                width={160}
                height={90}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <ChevronRightIcon
        onClick={handleNextImage}
        className={`absolute right-5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_12px_rgba(0,0,0,0.2)] sm:right-10 sm:h-12 sm:w-12 ${
          rightIcon ? "" : "hidden"
        }`}
      />
    </div>
  );
}
