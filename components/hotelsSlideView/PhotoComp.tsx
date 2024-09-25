import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
// import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import ImmersiveGallery from "./ImmersiveGallery";
import Image from "next/image";
import dynamic from "next/dynamic";

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
);

type Props = {
  imageList: any[];
  imageModel: boolean;
  roomList?: any[];
  isHotelPage: boolean;
  handleClose: () => void;
  hotelName: string;
};

export default function Photo({
  imageList,
  imageModel,
  roomList,
  isHotelPage,
  handleClose,
  hotelName,
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
  }, [imageModel]);

  const [fullImageView, setFullImageView] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState<string>("");
  const handleFullImageVIew = (imageId: string) => {
    setFullImageView((prev) => !prev);
    setSelectedImageId(imageId);
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
    "text-secondary font-dream text-xl  font-semibold tracking-wide";

  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">{`Photo of ${hotelName}`}</h2>
      <div
        className={`${imageModel ? "fixed inset-0 z-10 bg-black" : ""} mt-8 rounded-lg border-2  p-4`}
      >
        <div className="relative h-full w-full">
          <div className="container mx-auto h-full p-4 pb-14  md:px-10 xl:px-0">
            {isHotelPage && (
              <div className="mt-1">
                <h2 className={`${h2heading}`}>Photo Tour</h2>
                <div className="container-snap flex gap-4 overflow-x-scroll">
                  <div className="flex flex-col p-2 font-medium">
                    <div className="h-full min-w-[240px] overflow-hidden rounded-md shadow-[0px_0px_7px_rgba(0,0,0,0.1)]">
                      {imageList[0]?.image_Url === "" ? (
                        <Image
                          title={"fallback_image"}
                          src={"/fallback_image.jpg"}
                          alt={"fallback_image"}
                          width={240}
                          height={160}
                          className="h-full w-full object-cover"
                          // priority={true}
                        />
                      ) : (
                        <Image
                          src={imageList[0]?.image_Url}
                          alt="img"
                          width={240}
                          height={160}
                          className="h-full w-full object-cover"
                          // priority={true}
                        />
                      )}
                    </div>
                    <p className="py-1">Hotel Image</p>
                  </div>

                  {/* room list */}
                  {roomList?.map((room: HotelRoomInformation) => (
                    <div
                      className="flex min-w-[240px] flex-col p-2 font-medium"
                      key={room.hotelRoom_Type}
                    >
                      <div className="h-full min-w-[240px] overflow-hidden rounded-md shadow-[0px_0px_7px_rgba(0,0,0,0.1)]">
                        {room.hotelRoom_Image_Url === "" ? (
                          <Image
                            src={"/fallback_image.jpg"}
                            alt={"fallback_image"}
                            width={240}
                            height={160}
                            className="h-full w-full object-cover"
                            // priority={true}
                          />
                        ) : (
                          <Image
                            src={room.hotelRoom_Image_Url}
                            alt={`${room.hotelRoom_Type} image`}
                            title={"hotel_room_image"}
                            width={240}
                            height={160}
                            quality={1}
                            className="h-full w-full object-cover"
                            // priority={true}
                          />
                        )}
                      </div>
                      <p className="truncate py-1">{room.hotelRoom_Type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    className="relative w-full overflow-hidden rounded-lg"
                  >
                    {image.image_Url === "" ? (
                      <Image
                        src={"/fallback_image.jpg"}
                        alt={"fallback_image"}
                        width={240}
                        height={160}
                        className="h-full w-full object-cover"
                        // priority={true}
                      />
                    ) : (
                      <Image
                        src={image.image_Url}
                        alt={image.image_Description}
                        title={image.image_Description}
                        quality={10}
                        width={240}
                        height={160}
                        className="h-full w-full cursor-pointer object-cover"
                        // priority={true}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {fullImageView && (
              <div className="fixed inset-0 z-50 bg-black">
                <div className="relative h-full w-full">
                  <div className="fixed left-16  flex items-center justify-between p-4 shadow-sm sm:px-10">
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
    </>
  );
}
