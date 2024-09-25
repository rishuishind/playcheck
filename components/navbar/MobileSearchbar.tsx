import { format } from "date-fns";
import dynamic from "next/dynamic";

const ChevronDownIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronDownIcon"),
  { ssr: false },
);

type Props = {
  searchedText: string;
  selectedHotelSlug: string;
  setSelectedHotelSlug: Function;
  checkIn: Date;
  checkOut: Date;
  noOfAdults: number;
  noOfRooms: number;
  noOfChildren: number;
  showHotelModel: Function;
  showCalenderModel: Function;
  showGuestModel: Function;
  isDateSelected: boolean;
  handleSearch: Function;
  showRecommendationList: any;
  matchingList: any;
  handleListClick: Function;
  handleLocationChange: Function;
  handleLocationOnclick: Function;
  searchInput: string;
  selectedItemFromSearch: any;
  isSearchButtonDisabled: boolean;
};

export default function DesktopSearbar(props: Props) {
  return (
    <div className="md:mt-30 relative z-40 mt-8 w-full space-y-4 rounded-2xl bg-white p-4 shadow-[0px_0px_12px_rgba(0,0,0,0.2)] sm:mt-7 sm:p-4 sm:px-6 lg:hidden">
      <div
        onClick={() => {
          props.showHotelModel();
        }}
        className="space-y-1 "
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-secondary sm:text-sm">
            Location
          </p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          autoFocus={false}
          placeholder={props.searchInput}
          className="pointer-events-none w-full border-0 px-0 font-medium outline-none"
          onChange={(event: any) => props.handleLocationChange(event)}
          onClick={() => {
            props.handleLocationOnclick();
          }}
          value={props.selectedItemFromSearch}
        />
      </div>

      <div
        onClick={() => {
          props.showCalenderModel(true);
        }}
        className="flex flex-col items-center gap-1 font-medium tracking-wide"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-secondary sm:text-sm">
            Check-in & Check-out
          </p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <div className="flex w-full items-center gap-2">
          <p>
            {props.isDateSelected
              ? (props.checkIn
                  ? format(props.checkIn, "dd, MMM yyyy")
                  : "Select Checkin ") +
                " - " +
                (props.checkOut
                  ? format(props.checkOut, "dd, MMM yyyy")
                  : " Select Checkout")
              : "Select Dates"}
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          props.showGuestModel();
        }}
        className="flex flex-col items-center gap-1 font-medium"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-secondary sm:text-sm">
            Add adults / rooms
          </p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <div className="flex w-full items-center gap-2">
          <p>
            {props.noOfRooms} {props.noOfRooms > 1 ? "Rooms" : "Room"} |
          </p>
          <p>
            {props.noOfAdults} {props.noOfAdults > 1 ? "Adults" : "Adult"} |
          </p>
          <p>
            {props.noOfChildren}{" "}
            {props.noOfChildren > 1 ? "Childrens" : "Children"}
          </p>
        </div>
      </div>

      <p
        className={`text-sm font-medium tracking-wide leading-none text-red-500 ${!props.isSearchButtonDisabled ? "block" : "hidden"}`}
      >
        Select child age
      </p>
      <button
        onClick={() => props.handleSearch()}
        disabled={!props.isSearchButtonDisabled}
        className="w-full rounded border-0 bg-secondary py-2.5 text-sm font-medium tracking-wide text-white outline-none disabled:bg-gray-400 sm:text-base"
      >
        Search
      </button>
    </div>
  );
}
