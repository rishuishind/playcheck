import MobileGuestSelection from "@/components/navbar/MobileGuestSelection";
import dynamic from "next/dynamic";

const MinusCircleIcon = dynamic(
  () => import("@heroicons/react/solid/MinusCircleIcon"),
  { ssr: false },
);
const PlusCircleIcon = dynamic(
  () => import("@heroicons/react/solid/PlusCircleIcon"),
  { ssr: false },
);
const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"), {
  ssr: false,
});

type Props = {
  setMobileGuests: any;
  guestCount: number;
  setGuestCount: any;
  childCount: number;
  setChildCount: any;
  childAges: number[];
  roomCount: number;
  setRoomCount: any;
  checkinDate: Date;
  checkoutDate: Date;
  guestCountHandler: any;
  childCountHandler: any;
  roomCountHandler: any;
  handlePriceSearch: any;
  handleChildAgeChange: any;
  isSearchButtonDisabled: boolean;
};

export default function MobileGuestSection({
  setMobileGuests,
  guestCount,
  setGuestCount,
  childCount,
  setChildCount,
  childAges,
  roomCount,
  setRoomCount,
  checkinDate,
  checkoutDate,
  guestCountHandler,
  childCountHandler,
  roomCountHandler,
  handlePriceSearch,
  handleChildAgeChange,
  isSearchButtonDisabled,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 h-full w-full bg-light p-4 md:hidden">
      <div
        onClick={() => setMobileGuests(false)}
        className="fixed inset-x-0 top-0 flex h-16 items-center justify-between bg-secondary px-4 text-xl font-medium"
      >
        <p className="text-light">Select guests</p>
        <XIcon className="h-6 w-6 fill-light" />
      </div>

      {/* <div className="mt-16 rounded-lg bg-white p-4">
        <div className="mx-4 flex items-center gap-x-5 p-4">
          <p className="w-1/2 text-lg font-medium text-secondary">Adults</p>
          <div className="flex items-center gap-x-4">
            <MinusCircleIcon
              className="h-7 w-7 cursor-pointer fill-primary/75"
              onClick={() => {
                guestCountHandler(-1, guestCount, setGuestCount);
              }}
            />
            <p className="grid w-7 place-items-center font-medium text-secondary">
              {guestCount}
            </p>
            <PlusCircleIcon
              className="h-7 w-7 cursor-pointer fill-primary/75"
              onClick={() => {
                guestCountHandler(1, guestCount, setGuestCount);
              }}
            />
          </div>
        </div>
        <div className="mx-4 flex items-center gap-x-5 p-4">
          <p className="w-1/2 text-lg font-medium text-secondary">Children</p>
          <div className="flex items-center gap-x-4">
            <MinusCircleIcon
              onClick={() => {
                childCountHandler(-1, childCount, setChildCount);
              }}
              className="h-7 w-7 cursor-pointer fill-primary/75"
            />
            <p className="grid w-7 place-items-center font-medium text-secondary">
              {childCount}
            </p>
            <PlusCircleIcon
              onClick={() => {
                childCountHandler(1, childCount, setChildCount);
              }}
              className="h-7 w-7 cursor-pointer fill-primary/75"
            />
          </div>
        </div>
        <div className="mx-4 flex items-center gap-x-5 p-4">
          <p className="w-1/2 text-lg font-medium text-secondary">Rooms</p>
          <div className="flex items-center gap-x-4">
            <MinusCircleIcon
              onClick={() => {
                roomCountHandler(-1, roomCount, setRoomCount);
              }}
              className="h-7 w-7 cursor-pointer fill-primary/75"
            />
            <p className="grid w-7 place-items-center font-medium text-secondary">
              {roomCount}
            </p>
            <PlusCircleIcon
              onClick={() => {
                roomCountHandler(1, roomCount, setRoomCount);
              }}
              className="h-7 w-7 cursor-pointer fill-primary/75"
            />
          </div>
        </div>
      </div> */}

      <div className="mt-16 rounded-lg bg-white p-4">
        <MobileGuestSelection
          adults={guestCount}
          rooms={roomCount}
          child={childCount}
          childAges={childAges}
          handleChildAgeChange={handleChildAgeChange}
          handleAdults={guestCountHandler}
          handleRooms={roomCountHandler}
          handleChild={childCountHandler}
          handleSearch={() => handlePriceSearch(checkinDate, checkoutDate)}
          onClose={() => setMobileGuests(false)}
          isSearchButtonDisabled={isSearchButtonDisabled}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 font-medium">
        {/* <button
          onClick={() => {
            setMobileGuests(false);
            handlePriceSearch(checkinDate, checkoutDate);
          }}
          className="absolute bottom-3 left-4 right-4 h-12 rounded border-0 bg-secondary text-lg font-medium text-white outline-none"
        >
          Update
        </button> */}
      </div>
    </div>
  );
}
