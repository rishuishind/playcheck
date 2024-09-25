import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectTotalGuestsCount } from "@/lib/redux/bookingSlice";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});

type Props = {
  modelState: boolean;
  setModelState: Function;
  errors: string;
  handleBookingWithErros: any;
};

export default function BookingErrorsModel({
  modelState,
  setModelState,
  errors,
  handleBookingWithErros,
}: Props) {
  useEffect(() => {
    if (modelState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modelState]);

  const numGuests = useSelector(selectTotalGuestsCount);

  return (
    <div
      // onClick={() => setModelState(!modelState)}
      className="fixed inset-0 z-30 grid place-items-center bg-black/75 p-4"
    >
      <div className="relative w-full max-w-md rounded-lg bg-white">
        <div className="w-full border-b border-gray-400 p-4 pb-2">
          <div className="flex items-center justify-between">
            <h4 className="flex flex-wrap gap-1 text-lg font-bold text-secondary">
              Review your selection
            </h4>
            <XIcon
              onClick={() => setModelState(!modelState)}
              className="h-6 w-6 cursor-pointer rounded-full bg-secondary fill-white p-1"
            />
          </div>
        </div>

        <p className="p-2 px-4" dangerouslySetInnerHTML={{__html: errors}} />

        <div className="flex w-full justify-between gap-4 p-4">
          <button
            onClick={() => setModelState(!modelState)}
            className="w-full rounded-md py-2 font-semibold tracking-wide text-secondary"
          >
            Edit Selection
          </button>
          {numGuests > 0 && (
            <button
              onClick={handleBookingWithErros}
              className="w-full rounded-md bg-secondary py-2 font-semibold tracking-wide text-white"
            >
              Book Anyway
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
