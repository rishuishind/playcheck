import { useState } from "react";
import InfoOverlay from "./overlays/InfoOverlay";

type Props = {
  data: any;
};

export default function Info({ data }: Props) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <>
      <div className="rounded-t-2xl p-4 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-between">
          <h1 className="mb-2.5 text-xl font-bold tracking-wide lg:text-3xl">
            {data.destination_Name}
          </h1>

          <button
            onClick={() => setShowOverlay(true)}
            className="hidden font-bold tracking-wide text-secondary lg:block"
          >
            See More
          </button>
        </div>

        <p className="mb-4">{data.destination_Info}</p>
        <p
          className="line-clamp-6"
          dangerouslySetInnerHTML={{ __html: data.destination_Description }}
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
        <InfoOverlay
          modelState={showOverlay}
          setModelState={setShowOverlay}
          data={data}
          heading={"Taj Mahal"}
        />
      )}
    </>
  );
}
