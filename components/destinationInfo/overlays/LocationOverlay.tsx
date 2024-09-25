import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";

type Props = {
  modelState: boolean;
  setModelState: Function;
  data: any;
  heading: string;
};

export default function LocationOverlay({
  modelState,
  setModelState,
  data,
  heading,
}: Props) {
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

  const [distance, setDistance] = useState<boolean>();
  const nearbyPlace = !distance;

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
              <h3 className="text-2xl tracking-wide font-bold mb-2 text-secondary">
                {heading}
              </h3>
              <button onClick={() => setModelState(false)}>
                <span className="sr-only">close model</span>
                <XIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="relative container mx-auto w-full h-full overflow-y-scroll container-snap p-4 pb-24 space-y-4">
            <div>
              <div className="w-full aspect-video bg-green-500 rounded-lg"></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum -
                110055
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-around font-medium tracking-wide">
                <button
                  onClick={() => setDistance(true)}
                  className={`${distance && "border-b-2 border-secondary"}`}
                >
                  Distance
                </button>
                <button
                  onClick={() => setDistance(false)}
                  className={`${nearbyPlace && "border-b-2 border-secondary"}`}
                >
                  Nearby Place
                </button>
              </div>
              {distance && (
                <div className="pt-4 px-4 space-y-1">
                  {data.distances.map((distance: any) => (
                    <div key={distance.name}>
                      <h3 className="font-semibold">{distance.name}</h3>
                      <p>{distance.distance} Kms</p>
                    </div>
                  ))}
                </div>
              )}
              {nearbyPlace && (
                <div className="pt-4 px-4 space-y-1">
                  {data.nearbyPlaces.map((place: any) => (
                    <div key={place.place_Id}>
                      <h3 className="font-semibold">{place.place_Name}</h3>
                      {/* <p>{place.place_Map_Url}</p> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* overlay for mobile model */}
      <div className="fixed inset-0 z-50 hidden md:grid place-items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-xl max-h-[80%] overflow-y-scroll container-snap bg-white rounded-2xl">
          <div className="sticky top-0 z-10 border-b-2 p-4 pb-2.5 flex items-center justify-between bg-white">
            <h3 className="text-2xl tracking-wide font-bold mb-2 text-secondary">
              {heading}
            </h3>
            <button onClick={() => setModelState(false)}>
              <span className="sr-only">close model</span>
              <XIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="relative w-full h-full p-4 space-y-4">
            <div>
              <div className="w-full aspect-video bg-green-500 rounded-lg"></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum -
                110055
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-around font-medium tracking-wide">
                <button
                  onClick={() => setDistance(true)}
                  className={`${distance && "border-b-2 border-secondary"}`}
                >
                  Distance
                </button>
                <button
                  onClick={() => setDistance(false)}
                  className={`${nearbyPlace && "border-b-2 border-secondary"}`}
                >
                  Nearby Place
                </button>
              </div>
              {distance && (
                <div className="pt-4 px-4 space-y-1">
                  {data.distances.map((distance: any) => (
                    <div key={distance.name}>
                      <h3 className="font-semibold">{distance.name}</h3>
                      <p>{distance.distance} Kms</p>
                    </div>
                  ))}
                </div>
              )}
              {nearbyPlace && (
                <div className="pt-4 px-4 space-y-1">
                  {data.nearbyPlaces.map((place: any) => (
                    <div key={place.place_Id}>
                      <h3 className="font-semibold">{place.place_Name}</h3>
                      {/* <p>{place.place_Map_Url}</p> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
