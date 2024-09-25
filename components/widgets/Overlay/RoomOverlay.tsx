import Amenities from "@/components/hotel/Amenity/Amenities";
import ImageGallery from "@/components/hotelsSlideView/ImageGallery";
// import { XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import AmenityCard from "@/components/hotel/Amenity/AmenityCard";
import dynamic from "next/dynamic";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));

type Props = {
  modelState: boolean;
  setModelState: Function;
  roomInfo: any;
  hotelAmenitiesList: any;
};

export default function RoomOverlay({
  modelState,
  setModelState,
  roomInfo,
  hotelAmenitiesList,
}: Props) {
  const [loadMainImage, setLoadMainImage] = useState<boolean>(true);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  useEffect(() => {
    if (modelState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      if (modelState) {
        document.body.style.overflow = "auto";
      }
    };
  }, [modelState]);

  // const pillPosition = useSpring({ y: 0 });
  // const bindPillPosition = useDrag((params) => {
  //   const y = params.xy[1];
  //   if (params.dragging) {
  //     if (y >= 0 && y <= window.innerHeight) {
  //       pillPosition.y.set(params.offset[1]);
  //     }
  //   } else {
  //     if (y > window.innerHeight / 2) {
  //       setModelState(false);
  //       pillPosition.y.start(0);
  //     }
  //   }
  // });

  // function to format the keys
  function formatKeyName(key: string) {
    let words = key.split("_");
    let formattedKey = words.slice(1).join(" ");
    return formattedKey;
  }

  function getImageForKey(key: string) {
    const imageMapping = {
      bathroom_Electronic_Bidet: "/icons/bath/bidet.svg",
      bathroom_Type: "bathroom_type_image_url",
      bathroom_Mobility_Accessible: "/icons/bath/mobility.svg",
      bathroom_Bathtub: "/icons/bath/bathtub.svg",
      bathroom_Shower: "/icons/bath/shower.svg",
    };

    const imageURL = imageMapping[key];
    return { key, imageURL };
  }

  const container = {
    hidden: { y: "100%" },
    visible: { y: 0 },
    exit: { y: "100%" },
  };
  const opacity = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* overlay for mobile model */}
      <motion.div
        className="fixed inset-0 z-50 md:hidden"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={opacity}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 bg-black/50"
        />

        <div className="md:hidden absolute inset-0 top-[73px] md:top-20 bg-white rounded-t-[36px] overflow-hidden">
          <div className="sticky top-0 inset-0 bg-green-50 border-b-2 p-4 pb-2">
            <div className="container mx-auto flex items-center justify-between">
              <h3 className="text-xl tracking-wide font-bold mb-2 text-secondary">
                <p className="font-dream">{roomInfo.hotelRoom_Type}</p>
                <p className="text-xs sm:text-xs">{roomInfo.hotelRoom_Info}</p>
              </h3>
              <button onClick={() => setModelState(false)}>
                <span className="sr-only">close model</span>
                <XIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="relative container mx-auto w-full h-full overflow-y-scroll container-snap p-4 pb-24 space-y-4">
            {/* Hotel Image */}
            <div className="w-full aspect-video overflow-hidden">
              <ImageGallery
                imagesList={roomInfo.hotelRoom_Images_Object_List}
                showMoreButton={false}
                roomsList={[]}
                isHotelPage={false}
                loadMainImage={loadMainImage}
                setLoadMainImage={setLoadMainImage}
              />
            </div>

            {/* About this property */}
            {roomInfo.hotelRoom_Description !== "" && (
              <div className="mt-4">
                <h2 className="text-center font-bold text-xl">
                  About {roomInfo.hotelRoom_Type}
                </h2>
                <p className="mt-1.5">{roomInfo.hotelRoom_Description}</p>
              </div>
            )}

            {/* amenities info */}
            <div>
              <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
                Room Amenities
              </h2>
              <div className="px-2">
                {hotelAmenitiesList.length > 0 && (
                  <Amenities
                    amenityList={hotelAmenitiesList}
                    seeAllAmenities={true}
                  />
                )}
              </div>
            </div>

            {/* bath and toilet */}
            <div>
              <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
                Bath & Toilet
              </h2>
              <div className="px-4 py-1">
                <p className="sm:text-lg font-semibold">Private Bathroom</p>
                {Object.entries(roomInfo.hotelRoom_BathAndToilet).map(
                  ([name, value]) =>
                    name !== "bathroom_Type" && (
                      <div
                        key={name}
                        className="relative flex py-2 gap-1.5 font-medium"
                      >
                        <div className="relative w-6 h-6">
                          <Image
                            alt={getImageForKey(name).key}
                            src={getImageForKey(name).imageURL}
                            width={24}
                            height={24}
                            priority
                          />
                        </div>
                        <p
                          className={`sm:text-lg font-semibold ${
                            !value && "line-through font-thin"
                          }`}
                        >
                          {formatKeyName(name)}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* bed list */}
            {roomInfo.hotelRoom_Beds_List.length > 0 && (
              <div className="p-4">
                <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  Bed List
                </h2>
                <div className="flex w-full gap-4 p-1 mt-4">
                  {roomInfo.hotelRoom_Beds_List.map(
                    (bed: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 aspect-video w-fit flex gap-2"
                      >
                        <div className="shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 w-1/2 aspect-square overflow-hidden">
                          <p className="font-medium text-sencondary text-center">
                            {bed.bedCategory}
                          </p>
                          <Image
                            alt="room_meal_image"
                            src={`/icons/bedSizes/${bed.bedCategory}.svg`}
                            width={28}
                            height={28}
                            className="w-full h-full p-2.5 "
                          />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center gap-2 whitespace-nowrap pl-2">
                          <p className="flex items-center gap-1">
                            <span>Size Unit</span> : <span>{bed.sizeUnit}</span>
                          </p>
                          <p className="flex items-center gap-1">
                            <span>Height</span> :{" "}
                            <span>
                              {bed.height}{" "}
                              {bed.sizeUnit === "Ft"
                                ? "ft"
                                : bed.sizeUnit === "In"
                                ? "In"
                                : "Cm"}
                            </span>
                          </p>
                          <p className="flex items-center gap-1">
                            <span>Width</span> :{" "}
                            <span>
                              {bed.width}{" "}
                              {bed.sizeUnit === "Ft"
                                ? "ft"
                                : bed.sizeUnit === "In"
                                ? "In"
                                : "Cm"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* overlay for mobile model */}
      <div className="fixed inset-0 z-50 hidden md:grid place-items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-xl max-h-[80%] overflow-y-scroll container-snap bg-white rounded-2xl">
          <div className="sticky top-0 z-10 border-b-2 p-4 pb-2.5 flex items-center justify-between bg-white">
            <h3 className="text-xl tracking-wide font-bold mb-2 text-secondary">
              <p className="font-dream">{roomInfo.hotelRoom_Type}</p>
              <p className="text-xs sm:text-xs">{roomInfo.hotelRoom_Info}</p>
            </h3>
            <button onClick={() => setModelState(false)}>
              <span className="sr-only">close model</span>
              <XIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="relative w-full h-full p-4 space-y-4">
            {/* Hotel Image */}
            <div className="w-full aspect-video overflow-hidden">
              <ImageGallery
                imagesList={roomInfo.hotelRoom_Images_Object_List}
                showMoreButton={false}
                roomsList={[]}
                isHotelPage={false}
                loadMainImage={loadMainImage}
                setLoadMainImage={setLoadMainImage}
              />
            </div>

            {/* About this property */}
            {roomInfo.hotelRoom_Description !== "" && (
              <div className="mt-4">
                <h2 className="text-center font-bold text-xl">
                  About {roomInfo.hotelRoom_Type}
                </h2>
                <p className="mt-1.5">{roomInfo.hotelRoom_Description}</p>
              </div>
            )}

            {/* amenities info */}
            <div>
              <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
                Room Amenities
              </h2>
              <div className="px-2">
                {hotelAmenitiesList.length > 0 && (
                  <div className="w-full grid grid-cols-2 items-center gap-0.5">
                    {hotelAmenitiesList.map(
                      (amenity: HotelAmenityInformation) => (
                        <AmenityCard
                          key={amenity.amenity_Id}
                          amenity={amenity}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* bath and toilet */}
            <div>
              <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
                Bath & Toilet
              </h2>
              <div className="px-4 py-1">
                <p className="sm:text-lg font-semibold">Private Bathroom</p>
                {Object.entries(roomInfo.hotelRoom_BathAndToilet).map(
                  ([name, value]) =>
                    name !== "bathroom_Type" && (
                      <div
                        key={name}
                        className="relative flex py-2 gap-1.5 font-medium"
                      >
                        <div className="relative w-6 h-6">
                          <Image
                            alt={getImageForKey(name).key}
                            src={getImageForKey(name).imageURL}
                            width={24}
                            height={24}
                            priority
                          />
                        </div>
                        <p
                          className={`sm:text-lg font-semibold ${
                            !value && "line-through font-thin"
                          }`}
                        >
                          {formatKeyName(name)}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* bed list */}
            {roomInfo.hotelRoom_Beds_List.length > 0 && (
              <div className="p-4">
                <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  Bed List
                </h2>
                <div className="flex w-full gap-4 p-1 mt-4">
                  {roomInfo.hotelRoom_Beds_List.map(
                    (bed: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 aspect-video w-fit flex gap-2"
                      >
                        <div className="shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 w-1/2 aspect-square overflow-hidden">
                          <p className="font-medium text-sencondary text-center">
                            {bed.bedCategory}
                          </p>
                          <Image
                            alt="room_meal_image"
                            src={`/icons/bedSizes/${bed.bedCategory}.svg`}
                            width={28}
                            height={28}
                            className="w-full h-full p-2.5 "
                          />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center gap-2 whitespace-nowrap pl-2">
                          <p className="flex items-center gap-1">
                            <span>Size Unit</span> : <span>{bed.sizeUnit}</span>
                          </p>
                          <p className="flex items-center gap-1">
                            <span>Height</span> :{" "}
                            <span>
                              {bed.height}{" "}
                              {bed.sizeUnit === "Ft"
                                ? "ft"
                                : bed.sizeUnit === "In"
                                ? "In"
                                : "Cm"}
                            </span>
                          </p>
                          <p className="flex items-center gap-1">
                            <span>Width</span> :{" "}
                            <span>
                              {bed.width}{" "}
                              {bed.sizeUnit === "Ft"
                                ? "ft"
                                : bed.sizeUnit === "In"
                                ? "In"
                                : "Cm"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    // <div className="fixed inset-0 w-full h-full z-30">
    //   <div
    //     onClick={() => setModelState(false)}
    //     className="absolute inset-0 bg-black/50 overflow-y-scroll"
    //   />
    //   <animated.div
    //     {...bindPillPosition()}
    //     style={{ y: pillPosition.y }}
    //     onClick={() => setModelState(false)}
    //     className="bg-white absolute inset-x-0 top-20 p-4 py-5 z-[70] flex justify-center shadow-sm cursor-pointer"
    //   >
    //     <div className="w-20 h-2 bg-secondary rounded-full cursor-pointer" />
    //   </animated.div>
    //   <animated.div
    //     style={{
    //       y: pillPosition.y,
    //     }}
    //     className="absolute inset-0 top-20 bg-white z-50 p-4 overflow-y-scroll container-snap"
    //   >
    //     <div className="relative p-4 md:px-7 xl:px-0 container mx-auto pt-12">
    //       <div className="font-medium mb-4">
    //         <p className="font-dream font-bold text-lg text-secondary">
    //           {roomInfo.hotelRoom_Type}
    //         </p>
    //         <p className="text-xs sm:text-xs">{roomInfo.hotelRoom_Info}</p>
    //       </div>

    //       {/* Hotel Image */}
    //       <div className="w-full aspect-video sm:h-[320px] md:h-[420px]">
    //         <ImageGallery
    //           imagesList={roomInfo.hotelRoom_Images_Object_List}
    //           showMoreButton={false}
    //           roomsList={[]}
    //           isHotelPage={false}
    //           loadMainImage={loadMainImage}
    //           setLoadMainImage={setLoadMainImage}
    //         />
    //       </div>

    //       {/* About this property */}
    //       {roomInfo.hotelRoom_Description !== "" && (
    //         <div className="mt-4">
    //           <h2 className="text-center font-bold text-xl">
    //             About {roomInfo.hotelRoom_Type}
    //           </h2>
    //           <p className="mt-1.5">{roomInfo.hotelRoom_Description}</p>
    //         </div>
    //       )}

    //       {/* amenities info */}
    //       <div>
    //         <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
    //           Room Amenities
    //         </h2>
    //         <div className="px-2">
    //           {hotelAmenitiesList.length > 0 && (
    //             <Amenities
    //               amenityList={hotelAmenitiesList}
    //               seeAllAmenities={true}
    //             />
    //           )}
    //         </div>
    //       </div>

    //       {/* bath and toilet */}
    //       <div>
    //         <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide px-4 pt-4">
    //           Bath & Toilet
    //         </h2>
    //         <div className="px-4 py-1">
    //           <p className="sm:text-lg font-semibold">Private Bathroom</p>
    //           {Object.entries(roomInfo.hotelRoom_BathAndToilet).map(
    //             ([name, value]) =>
    //               name !== "bathroom_Type" && (
    //                 <div
    //                   key={name}
    //                   className="relative flex py-2 gap-1.5 font-medium"
    //                 >
    //                   <div className="relative w-6 h-6">
    //                     <Image
    //                       alt={getImageForKey(name).key}
    //                       src={getImageForKey(name).imageURL}
    //                       width={24}
    //                       height={24}
    //                       priority
    //                     />
    //                   </div>
    //                   <p
    //                     className={`sm:text-lg font-semibold ${
    //                       !value && "line-through font-thin"
    //                     }`}
    //                   >
    //                     {formatKeyName(name)}
    //                   </p>
    //                 </div>
    //               )
    //           )}
    //         </div>
    //       </div>

    //       {/* bed list */}
    //       {roomInfo.hotelRoom_Beds_List.length > 0 && (
    //         <div className="p-4">
    //           <h2 className="text-secondary font-dream text-xl sm:text-2xl font-semibold tracking-wide mb-2">
    //             Bed List
    //           </h2>
    //           <div className="flex w-full gap-4 p-1 mt-4">
    //             {roomInfo.hotelRoom_Beds_List.map((bed: any, index: number) => (
    //               <div
    //                 key={index}
    //                 className="bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 aspect-video w-fit flex gap-2"
    //               >
    //                 <div className="shadow-[0px_0px_7px_rgba(0,0,0,0.25)] rounded-xl p-3 w-1/2 aspect-square overflow-hidden">
    //                   <p className="font-medium text-sencondary text-center">
    //                     {bed.bedCategory}
    //                   </p>
    //                   <Image
    //                     alt="room_meal_image"
    //                     src={`/icons/bedSizes/${bed.bedCategory}.svg`}
    //                     width={28}
    //                     height={28}
    //                     className="w-full h-full p-2.5 "
    //                   />
    //                 </div>
    //                 <div className="w-1/2 flex flex-col justify-center gap-2 whitespace-nowrap pl-2">
    //                   <p className="flex items-center gap-1">
    //                     <span>Size Unit</span> : <span>{bed.sizeUnit}</span>
    //                   </p>
    //                   <p className="flex items-center gap-1">
    //                     <span>Height</span> :{" "}
    //                     <span>
    //                       {bed.height}{" "}
    //                       {bed.sizeUnit === "Ft"
    //                         ? "ft"
    //                         : bed.sizeUnit === "In"
    //                         ? "In"
    //                         : "Cm"}
    //                     </span>
    //                   </p>
    //                   <p className="flex items-center gap-1">
    //                     <span>Width</span> :{" "}
    //                     <span>
    //                       {bed.width}{" "}
    //                       {bed.sizeUnit === "Ft"
    //                         ? "ft"
    //                         : bed.sizeUnit === "In"
    //                         ? "In"
    //                         : "Cm"}
    //                     </span>
    //                   </p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </animated.div>
    // </div>
  );
}
