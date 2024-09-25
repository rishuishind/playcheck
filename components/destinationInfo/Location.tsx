import { useState } from "react";
import LocationOverlay from "./overlays/LocationOverlay";

type Props = {
  data: any;
};

export default function Location({ data }: Props) {
  const [distance, setDistance] = useState<boolean>();
  const nearbyPlace = !distance;
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const distances = [
    {
      distance: "13.7",
      name: "Indira Gandhi International Airport",
      time: "",
    },
    {
      name: "Inter State Bus Terminal",
      time: "",
      distance: "4.9",
    },
    {
      time: "",
      distance: "1.4",
      name: "New Delhi Railway Station",
    },
  ];

  const nearbyPlaces = [
    {
      place_Id: "0cb8eeadad7c",
      place_Name: "Humayun Tomb 10.3 km",
      place_Map_Url: "https://goo.gl/maps/yrxmaNk9fGDCz2ZA7",
    },
    {
      place_Id: "1132965bc644",
      place_Name: "Qutub Minar 20.1 km",
      place_Map_Url: "https://goo.gl/maps/1z4PdAXG46FjScdb8",
    },
    {
      place_Id: "117fca541626",
      place_Name: "Snow World 10.4 Km",
      place_Map_Url: "https://goo.gl/maps/2KqQMHNcbhb63Jrv9",
    },
    {
      place_Id: "14271f8f9729",
      place_Name: "Palika Bazar 2.8 Km",
      place_Map_Url: "https://goo.gl/maps/iZYEfjhLkaE7KSK97",
    },
    {
      place_Id: "16377e0c75d5",
      place_Name: "Hauz Khas 11.5 Km",
      place_Map_Url: "https://goo.gl/maps/68wcqBosyamMLx4t9",
    },
  ];

  return (
    <>
      <div id="location" className="navLink border-b-2 p-4">
        <div className="flex items-center lg:justify-between">
          <h2 className="mb-4 border-red-500 text-xl font-medium tracking-wide lg:border-l-4 lg:pl-2">
            Other Info
          </h2>

          <button
            onClick={() => setShowOverlay(true)}
            className="hidden font-bold tracking-wide text-secondary lg:block"
          >
            See More
          </button>
        </div>
        <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
          <div className="h-full w-full lg:w-1/2">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                title="Map display"
                className="h-full w-full"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGvy5rBo-MPjD0vR2BkkRhtKAXmFHCLVY&q=${encodeURIComponent(data.destination_Map_Url)})}`}
                allowFullScreen
              />
            </div>
            <p className="mt-2.5 lg:hidden">{data.destination_Address}</p>
          </div>

          <div className="h-full w-full lg:w-1/2">
            <p className="mb-2.5 hidden lg:block">{data.destination_Address}</p>
            <div className="flex items-center justify-around font-medium tracking-wide">
              <button
                onClick={() => setDistance(true)}
                className={`${distance && "border-b-2 border-secondary"} w-full py-2`}
              >
                Distance
              </button>
              <button
                onClick={() => setDistance(false)}
                className={`${nearbyPlace && "border-b-2 border-secondary"} w-full py-2`}
              >
                Nearby Place
              </button>
            </div>
            {distance && (
              <div className="space-y-1 px-4 pt-4">
                {distances.map((distance) => (
                  <div key={distance.name}>
                    <h3 className="font-semibold">{distance.name}</h3>
                    <p>{distance.distance} Kms</p>
                  </div>
                ))}
              </div>
            )}
            {nearbyPlace && (
              <div className="space-y-1 px-4 pt-4">
                {nearbyPlaces.map((place) => (
                  <div key={place.place_Id}>
                    <h3 className="font-semibold">{place.place_Name}</h3>
                    {/* <p>{place.place_Map_Url}</p> */}
                  </div>
                ))}
              </div>
            )}
          </div>
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

      {showOverlay && (
        <LocationOverlay
          modelState={showOverlay}
          setModelState={setShowOverlay}
          data={{ distances, nearbyPlaces }}
          heading={"Location"}
        />
      )}
    </>
  );
}
