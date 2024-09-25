import { useState } from "react";
import VisitingHoursOverlay from "./overlays/VisitingHoursOverlay";

type Props = {
  data: any;
};

export default function VisitingHours({ data }: Props) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const openignHours = [
    "<strong>Open:</strong> The Taj Mahal is open to visitors every day except Fridays.",
    "<strong>Opening Hours:</strong> (Sunrise to sunset) with extended hours for night viewing on full moon nights and two days before and after (except Fridays and during the month of Ramadan).",
  ];

  const whatToBring = [
    "<strong>Valid ID:</strong> Carry a valid government-issued ID for entry tickets.",
    "<strong>Comfortable Shoes:</strong> Wear comfortable walking shoes as you'll be exploring the grounds.",
    "<strong>Sun Protection:</strong> Bring sunscreen, sunglasses, and a hat to protect yourself from the sun.",
    "<strong>Water Bottle:</strong> Stay hydrated by carrying a refillable water bottle.",
    "<strong>Camera:</strong> Capture the beauty of the Taj Mahal with your camera or smartphone.",
  ];

  return (
    <>
      <div id="more-info" className="navLink space-y-4 p-4">
        <div className="flex items-center lg:justify-between">
          <h2 className="border-red-500 text-xl font-medium tracking-wide lg:border-l-4 lg:pl-2">
            Other Info
          </h2>

          <button
            onClick={() => setShowOverlay(true)}
            className="hidden font-bold tracking-wide text-secondary lg:block"
          >
            See More
          </button>
        </div>
        {/* <div>
          <h2 className="mb-4 text-xl font-medium tracking-wide">
            Opening Hours
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: data.destination_General_Info }}
          />
        </div> */}
        <div
          dangerouslySetInnerHTML={{ __html: data.destination_General_Info }}
        />

        {/* <div>
          <h2 className="mb-4 text-xl font-medium tracking-wide">
            What to bring with you
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: data.destination_Visiting_Info }}
          />
        </div> */}
        <div
          dangerouslySetInnerHTML={{ __html: data.destination_Visiting_Info }}
        />

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
        <VisitingHoursOverlay
          modelState={showOverlay}
          setModelState={setShowOverlay}
          data={{ openignHours, whatToBring }}
          heading={"More Details"}
        />
      )}
    </>
  );
}
