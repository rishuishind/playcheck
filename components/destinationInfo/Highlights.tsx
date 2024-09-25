import Image from "next/image";
import { useRef, useState } from "react";
import HeighlightsOverlay from "./overlays/HeighlightsOverlay";
import { motion } from "framer-motion";
import { destinations } from "@/lib/constantData";

type Props = {
  data: any;
};

export default function Highlights({ data }: Props) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        id="heighlights"
        className="navLink border-b-2 p-4"
        ref={containerRef}
      >
        <div className="flex items-center lg:justify-between">
          <h2 className="mb-4 border-red-500 text-xl font-medium tracking-wide lg:border-l-4 lg:pl-2">
            Destination Highlights
          </h2>

          <button
            onClick={() => setShowOverlay(true)}
            className="hidden font-bold tracking-wide text-secondary lg:block"
          >
            See More
          </button>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          {destinations.slice(0, 4).map((destination: any, index: number) => (
            <motion.div
              key={destination.id}
              className="tex-sm destination-item flex w-full items-start justify-between gap-2 md:text-base lg:aspect-square lg:flex-col"
              initial={{ x: -150 }}
              whileInView={{ x: 0 }}
              viewport={{ margin: "-100px", once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative aspect-square w-1/3 overflow-hidden rounded-md bg-green-100 md:aspect-video lg:aspect-square lg:w-full lg:rounded-2xl">
                <Image
                  alt="destination_image"
                  src={destination.imageUrl}
                  width={160}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 pt-1 lg:w-full lg:px-2 lg:text-center">
                <p
                  className="line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: destination.about }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-1.5 text-right lg:hidden">
          <button
            onClick={() => setShowOverlay(true)}
            className="font-bold tracking-wide text-secondary"
          >
            See More
          </button>
        </div>
      </div>

      {/* <div className="hidden border-b-2 bg-rose-500 p-4 lg:block">
        <h2 className="mb-4 text-xl font-medium tracking-wide">
          Destination Highlights
        </h2>
        <div className="space-y-4">
          {destinations.slice(0, 3).map((destination: any) => (
            <div
              key={destination.id}
              className="tex-sm flex items-start justify-between gap-2 md:text-base"
            >
              <div className="relative aspect-square w-1/3 overflow-hidden rounded-md bg-green-100 md:aspect-video">
                <Image
                  alt="destination_image"
                  src={destination.imageUrl}
                  width={160}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 pt-1">
                <p
                  className="line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: destination.about }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1.5 text-right">
          <button
            onClick={() => setShowOverlay(true)}
            className="font-bold tracking-wide text-secondary"
          >
            See More
          </button>
        </div>
      </div> */}

      {showOverlay && (
        <HeighlightsOverlay
          modelState={showOverlay}
          setModelState={setShowOverlay}
          data={destinations}
          heading={"Destination Highlights"}
        />
      )}
    </>
  );
}
