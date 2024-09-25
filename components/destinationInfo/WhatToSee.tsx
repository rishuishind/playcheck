import image_1 from "@/public/images/pexels-maahid-photos-3881104.jpg";
import image_2 from "@/public/images/pexels-oleksandra-zelena-16575678.jpg";
import image_3 from "@/public/images/pexels-rahul-2081499.jpg";
import image_4 from "@/public/images/pexels-ranjeet-chauhan-20050829.jpg";
import image_5 from "@/public/images/pexels-vijesh-vijayan-19756410.jpg";
import Image from "next/image";
import { useState } from "react";
import WhatToSeeOverlay from "./overlays/WhatToSeeOverlay";

type Props = {
  data: any;
};

export default function WhatToSee({ data }: Props) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const places = [
    {
      id: 11,
      imageUrl: image_1,
      title: "title One",
      about:
        "<strong className='text-secondary'>Architecture:</strong> The Taj Mahal is renowned for its stunning white marble architecture, intricate carvings, and symmetrical design.",
    },
    {
      id: 22,
      imageUrl: image_2,
      title: "title two",
      about:
        "<strong className='text-secondary'>Architecture:</strong> The Taj Mahal is renowned for its stunning white marble architecture, intricate carvings, and symmetrical design.",
    },
    {
      id: 33,
      imageUrl: image_3,
      title: "title three",
      about:
        "<strong className='text-secondary'>Architecture:</strong> The Taj Mahal is renowned for its stunning white marble architecture, intricate carvings, and symmetrical design.",
    },
    {
      id: 44,
      imageUrl: image_4,
      title: "title four",
      about:
        "<strong className='text-secondary'>Architecture:</strong> The Taj Mahal is renowned for its stunning white marble architecture, intricate carvings, and symmetrical design.",
    },
    {
      id: 55,
      imageUrl: image_5,
      title: "title five",
      about:
        "<strong className='text-secondary'>Architecture:</strong> The Taj Mahal is renowned for its stunning white marble architecture, intricate carvings, and symmetrical design.",
    },
  ];

  return (
    <>
      <div id="insider" className="navLink border-b-2 p-4">
        <h2 className="mb-4 border-red-500 text-xl font-medium tracking-wide lg:border-l-4 lg:pl-2">
          What you can cover in this destination
        </h2>

        <div className="container-snap flex items-center gap-2.5 overflow-x-scroll">
          {places.slice(0, 5).map((destination: any) => (
            <div key={destination.id} className="tex-sm md:text-base">
              <div className="relative aspect-square min-w-[160px] overflow-hidden rounded-md bg-green-100">
                <Image
                  alt="destination_image"
                  src={destination.imageUrl}
                  width={160}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pt-1 text-center font-semibold tracking-wide">
                <p>{destination.title}</p>
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
      </div>

      {showOverlay && (
        <WhatToSeeOverlay
          modelState={showOverlay}
          setModelState={setShowOverlay}
          data={places}
          heading={"What to See"}
        />
      )}
    </>
  );
}
