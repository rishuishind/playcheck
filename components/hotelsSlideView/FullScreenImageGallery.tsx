import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
// import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImmersiveGallery from "./ImmersiveGallery";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HotelImageDetails } from "@/lib/classModels/images/hotelImageDetails";

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
);

type Props = {
  imageList: any[];
  imageModel: boolean;
  roomList?: any[];
  isHotelPage: boolean;
  handleClose: () => void;
};

export default function FullScreenImageGallery({
  imageList,
  imageModel,
  roomList,
  isHotelPage,
  handleClose,
}: Props) {
  useEffect(() => {
    if (imageModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [fullImageView, setFullImageView] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState<string>("");
  const handleFullImageVIew = (imageId: string) => {
    setFullImageView((prev: any) => !prev);
    setSelectedImageId(imageId);
  };

  const isValidImageUrl = (url: string): boolean => {
    if (typeof url !== 'string') {
      return false;
    }
    // Check for absolute URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return true;
    }
    // Check for valid relative URLs
    if (url.startsWith('/')) {
      return true;
    }
    // Invalid URL
    return false;
  };

  // Combine imageList with hotelRoom_Images_Object_List for each room
  const combinedArray = roomList?.reduce(
    (result, room) => {
      const roomImages = room.hotelRoom_Images_Object_List || [];
      return result.concat(roomImages);
    },
    [...imageList],
  );
  const h2heading =
    "text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide";

  return (
    <div className="container-snap fixed inset-0 z-50 overflow-y-scroll bg-white">
      <div className="relative h-full w-full">
        <div className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between bg-white px-5 shadow-sm">
          <div
            onClick={handleClose}
            className="flex cursor-pointer items-center gap-0.5 rounded p-1 pr-2 font-semibold tracking-wide hover:bg-primary"
          >
            <ChevronLeftIcon className="h-6 w-6" />
            Close
          </div>
        </div>

        <div className="container mx-auto h-full p-4 pb-14 pt-16 md:px-10 xl:px-0">
          {isHotelPage && (
            <div className="mt-1">
              <h2 className={`${h2heading}`}>Photo Tour</h2>
              <div className="container-snap flex gap-4 overflow-x-scroll">
                <Link
                  title="property"
                  href="#property"
                  className="flex flex-col p-2 font-medium"
                >
                  <div className="h-full min-w-[240px] overflow-hidden rounded-md shadow-[0px_0px_7px_rgba(0,0,0,0.1)]">
                    {imageList[0]?.image_Url === "" ||
                    !isValidImageUrl(imageList[0]?.image_Url) ? (
                      <Image
                        title={"fallback_image"}
                        src={"/fallback_image.jpg"}
                        alt={"fallback_image"}
                        width={160}
                        height={90}
                        className="h-full min-w-[240px] max-w-xs object-cover"
                        // priority={true}
                      />
                    ) : (
                      <Image
                        src={imageList[0]?.image_Url}
                        alt="img"
                        width={160}
                        height={90}
                        className="h-full w-full object-cover"
                        // priority={true}
                      />
                    )}
                  </div>
                  <p className="py-1">Hotel Image</p>
                </Link>

                {/* room list */}
                {roomList?.map((room: HotelRoomInformation) => (
                  <Link
                    title="roomId"
                    key={room.hotelRoom_Id}
                    href={`#${room.hotelRoom_Type}`}
                    className="flex min-w-[240px] flex-col p-2 font-medium"
                  >
                    <div className="h-full min-w-[240px] overflow-hidden rounded-md shadow-[0px_0px_7px_rgba(0,0,0,0.1)]">
                      {room.hotelRoom_Image_Url === "" ||
                      !isValidImageUrl(room.hotelRoom_Image_Url) ? (
                        <Image
                          src={"/fallback_image.jpg"}
                          alt={"fallback_image"}
                          width={160}
                          height={90}
                          className="h-full min-w-[240px] max-w-xs object-cover"
                          // priority={true}
                        />
                      ) : (
                        <Image
                          src={room.hotelRoom_Image_Url}
                          alt={`${room.hotelRoom_Type} image`}
                          title={"hote_room_image"}
                          width={160}
                          height={90}
                          className="h-full min-w-[240px] max-w-xs object-cover"
                          // priority={true}
                        />
                      )}
                    </div>
                    <p className="truncate py-1">{room.hotelRoom_Type}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {isHotelPage ? (
            <>
              <div
                id="property"
                className="mt-7 flex w-full flex-col justify-between md:flex-row"
              >
                <div className="w-full py-7 md:w-3/12">
                  <h2 className={`${h2heading} top-0 md:sticky`}>Property</h2>
                </div>
                <div className="w-full columns-1 space-y-4 sm:columns-2 md:w-9/12 xl:columns-3">
                  {imageList.map((image: any) => (
                    <div
                      key={image.image_Id}
                      onClick={() => handleFullImageVIew(image.image_Id)}
                    >
                      {image.image_Url === "" ||
                      !isValidImageUrl(image.image_Url) ? (
                        <Image
                          src={"/fallback_image.jpg"}
                          alt={"fallback_image"}
                          width={160}
                          height={90}
                          className="h-full w-full rounded-lg object-cover"
                          // priority={true}
                        />
                      ) : (
                        <Image
                          src={image.image_Url}
                          alt={image.image_Description}
                          title={image.image_Description}
                          width={160}
                          height={90}
                          className="h-full w-full cursor-pointer rounded-lg object-cover"
                          // priority={true}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {roomList?.map((room: HotelRoomInformation) => (
                <div
                  key={room.hotelRoom_Type}
                  id={room.hotelRoom_Type}
                  className="mt-10 flex w-full flex-col justify-between md:flex-row"
                >
                  <div className="w-full py-7 md:w-3/12">
                    <div className="top-0 py-4 md:sticky md:py-0">
                      <h2 className={`${h2heading}`}>{room.hotelRoom_Type}</h2>
                      <div className="flex flex-wrap items-center">
                        {room.hotelRoom_Amenities_List.length > 0 &&
                          room.hotelRoom_Amenities_List.map(
                            (
                              amenity: HotelAmenityInformation,
                              index: number,
                            ) => (
                              <p
                                key={index}
                                className="text-sm font-medium text-gray-400"
                              >
                                {" "}
                                {amenity.amenity_Name}{" "}
                                {room.hotelRoom_Amenities_List.length - 1 ===
                                index ? (
                                  " "
                                ) : (
                                  <span>&#8901;</span>
                                )}
                              </p>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full columns-1 space-y-4 sm:columns-2 md:w-9/12 xl:columns-3">
                    {room.hotelRoom_Images_Object_List.map((image: HotelImageDetails) => (
                      <div
                        key={image.image_Id}
                        onClick={() => handleFullImageVIew(image.image_Id)}
                      >
                        {image.image_Url === "" ||
                        !isValidImageUrl(image.image_Url) ? (
                          <Image
                            src={"/fallback_image.jpg"}
                            alt={"fallback_image"}
                            width={160}
                            height={90}
                            className="h-full w-full rounded-lg object-cover"
                            // priority={true}
                          />
                        ) : (
                          <Image
                            src={image.image_Url}
                            alt={`${image.image_Description} room_image`}
                            title={image.image_Description}
                            width={160}
                            height={90}
                            className="h-full w-full cursor-pointer rounded-lg object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              id="property"
              className="mt-7 flex w-full flex-col justify-between md:flex-row"
            >
              <div className="w-full py-7 md:w-3/12">
                <h2 className={`${h2heading} top-0 md:sticky`}>Property</h2>
              </div>
              <div className="w-full columns-1 space-y-4 sm:columns-2 md:w-9/12 xl:columns-3">
                {imageList.map((image: any) => (
                  <div
                    key={image.image_Id}
                    onClick={() => handleFullImageVIew(image.image_Id)}
                  >
                    {image.image_url === "" ||
                    !isValidImageUrl(image.image_url) ? (
                      <Image
                        src={"/fallback_image.jpg"}
                        alt={"fallback_image"}
                        width={160}
                        height={90}
                        className="h-full w-full rounded-lg object-cover"
                        // priority={true}
                      />
                    ) : (
                      <Image
                        src={image.image_Url}
                        alt={`${image.image_Description} all_image`}
                        width={160}
                        height={90}
                        className="h-full w-full cursor-pointer rounded-lg object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {fullImageView && (
            <div className="fixed inset-0 z-10 bg-black">
              <div className="relative h-full w-full">
                <div className="fixed top-0 flex items-center justify-between p-4 shadow-sm sm:top-10 sm:px-10">
                  <div
                    onClick={() => handleFullImageVIew("")}
                    className="flex cursor-pointer items-center gap-0.5 rounded p-1 pr-2 font-semibold tracking-wide text-white hover:bg-primary"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                    Close
                  </div>
                </div>
                <div className="flex h-full w-full items-center">
                  <div className="w-full overflow-hidden">
                    <ImmersiveGallery
                      imagesList={combinedArray}
                      selectedImageId={selectedImageId}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
