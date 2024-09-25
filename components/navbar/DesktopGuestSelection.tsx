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

export default function DesktopGuestSelection({
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
    <div className="relative mx-auto w-[420px] rounded-md border-2 bg-white p-4">
      <div className="grid grid-cols-3 gap-x-4">
        <div className="p-1.5 text-center">
          <p>Adults</p>
          <div className="flex items-center justify-between rounded-full bg-secondary text-white">
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
        <div className="p-1.5 text-center">
          <p>Rooms</p>
          <div className="flex items-center justify-between rounded-full bg-secondary text-white">
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
        <div className="p-1.5 text-center">
          <p>Children</p>
          <div className="flex items-center justify-between rounded-full bg-secondary text-white">
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

        {childAges.map((age: any, index) => (
          <div key={index} className="p-1.5 text-center">
            <p>Child {index + 1} Age</p>
            <select
              value={age.age.toString()}
              onChange={(e) => {
                handleChildAgeChange(Number(e.target.value), index);
              }}
              className="w-full appearance-none rounded-full text-sm"
            >
              <option value={0}>select</option>
              {[...Array(15)].map((_, i) => (
                <option key={i} value={(i + 1).toString()}>
                  {i + 1} year
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p
        className={`text-center text-sm font-medium tracking-wide text-red-500 ${!isSearchButtonDisabled ? "block" : "hidden"}`}
      >
        Select child age
      </p>

      <div className="mt-2">
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
