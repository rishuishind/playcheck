import { format } from "date-fns";
import dynamic from "next/dynamic";

const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
  { ssr: false },
);

type Props = {
  setMobileCalender: any;
  checkinDateSelected: boolean;
  checkinDate: Date;
  checkoutDate: Date;
  setMobileGuests: any;
  guestCount: number;
  childCount: number;
  roomCount: number;
  handlePriceSearch: any;
};

export default function MobileSelectionCard({
  setMobileCalender,
  checkinDateSelected,
  checkinDate,
  checkoutDate,
  setMobileGuests,
  guestCount,
  childCount,
  roomCount,
  handlePriceSearch,
}: Props) {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-md bg-secondary p-3 md:hidden">
      <p className="w-full text-justify text-lg font-semibold text-white">
        Choose dates to see prices
      </p>
      <div className="w-full space-y-4">
        <div
          onClick={() => setMobileCalender(true)}
          className="flex items-center gap-x-4"
        >
          <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">Check-in</p>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
            <p className="flex items-center gap-x-2 text-lg font-medium">
              {checkoutDate > new Date()
                ? `${format(checkinDate, "MMM dd, yyyy")}  `
                : "Select date"}
            </p>
          </div>
          <div className="w-1/2 rounded bg-black/25 px-3 py-2 text-white">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">Check-out</p>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
            <p className="flex items-center gap-x-2 text-lg font-medium">
              {checkoutDate > new Date()
                ? `${format(checkoutDate, "MMM dd, yyyy")}`
                : "Select date"}
            </p>
          </div>
        </div>

        <div className="my-4 flex items-center gap-x-4">
          <div
            className="w-1/2 rounded bg-black/25 px-3 py-2 text-white"
            onClick={() => setMobileGuests(true)}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">Adults</p>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
            <p className="flex items-center gap-x-2 text-lg font-medium">
              {guestCount} Adults{" "}
            </p>
          </div>
          <div
            className="w-1/2 rounded bg-black/25 px-3 py-2 text-white"
            onClick={() => setMobileGuests(true)}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">Child</p>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
            <p className="flex items-center gap-x-2 text-lg font-medium">
              {childCount} Child
            </p>
          </div>
          <div
            className="w-1/2 rounded bg-black/25 px-3 py-2 text-white"
            onClick={() => setMobileGuests(true)}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">Rooms</p>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
            <p className="flex items-center gap-x-2 text-lg font-medium">
              {roomCount} {roomCount > 1 ? "Rooms" : "Room"}
            </p>
          </div>
        </div>

        <button
          onClick={() => handlePriceSearch(checkinDate, checkoutDate)}
          className="flex w-full justify-center rounded border-0 bg-primary px-2 py-3 text-lg font-bold tracking-wide outline-none"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}
