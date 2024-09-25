import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

type Props = {
  adults: number;
  rooms: number;
  child: number;
  childAges: number[];
  handleChildAgeChange: Function;
  handleAdults: Function;
  handleRooms: Function;
  handleChild: Function;
  handleSearch: Function;
  onClose: Function;
  isSearchButtonDisabled: boolean;
};

export default function MobileGuestSelection({
  adults,
  rooms,
  child,
  childAges,
  handleChildAgeChange,
  handleAdults,
  handleRooms,
  handleChild,
  handleSearch,
  onClose,
  isSearchButtonDisabled,
}: Props) {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="flex w-full items-center justify-between">
          <p className="tracking-wide">Adults</p>
          <div className="flex items-center gap-x-4 rounded-full bg-secondary text-white">
            <button
              onClick={() => handleAdults(-1)}
              disabled={adults <= 1}
              className="grid h-9 w-9 place-items-center"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{adults}</span>
            <button
              onClick={() => handleAdults(1)}
              className="grid h-9 w-9 place-items-center"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="tracking-wide">Rooms</p>
          <div className="flex items-center gap-x-4 rounded-full bg-secondary text-white">
            <button
              onClick={() => handleRooms(-1)}
              disabled={rooms <= 1}
              className="grid h-9 w-9 place-items-center"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{rooms}</span>
            <button
              onClick={() => handleRooms(1)}
              className="grid h-9 w-9 place-items-center"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="tracking-wide">Children</p>
          <div className="flex items-center gap-x-4 rounded-full bg-secondary text-white">
            <button
              onClick={() => handleChild(-1)}
              disabled={child <= 0}
              className="grid h-9 w-9 place-items-center"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{child}</span>
            <button
              onClick={() => handleChild(1)}
              className="grid h-9 w-9 place-items-center"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[340px] w-full space-y-2 overflow-y-scroll">
          {childAges.map((age: any) => (
            <div key={age.idx} className="space-y-1">
              <p>Child {age.idx + 1} Age</p>
              <div className="container-snap flex gap-2 overflow-x-scroll">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className={`grid h-10 min-w-[40px] cursor-pointer place-items-center rounded-sm ${i + 1 === age.age ? "bg-secondary text-light" : "bg-secondary/60"} text-sm hover:bg-secondary`}
                    onClick={() => handleChildAgeChange(i + 1, age.idx)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p
          className={`text-center text-sm font-medium tracking-wide text-red-500 ${!isSearchButtonDisabled ? "block" : "hidden"}`}
        >
          Select child age
        </p>
        <button
          onClick={() => {
            onClose();
            handleSearch();
          }}
          className="h-10 w-full rounded bg-primary disabled:bg-gray-400"
          disabled={!isSearchButtonDisabled}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
