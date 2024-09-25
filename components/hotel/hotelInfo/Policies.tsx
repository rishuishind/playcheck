import BottomTextOverlay from "@/components/widgets/Overlay/BottomTextOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  policies: string;
  showAllPolicy: boolean;
  setShowAllPolicy: Function;
  roomsPage: boolean;
};

export default function PoliciesSection({
  hotelName,
  hotelCity,
  policies,
  showAllPolicy,
  setShowAllPolicy,
  roomsPage,
}: Props) {
  return (
    <>
      {!!policies.length && (
        <div id="hotel-policies" className="navLink">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Privacy Policies of {hotelName} in {hotelCity}
          </h2>

          <div
            className={`text-sm lg:text-base ${roomsPage ? "line-clamp-6" : ""}`}
            dangerouslySetInnerHTML={{
              __html: policies,
            }}
          />

          {roomsPage && (
            <button
              type="button"
              onClick={() => setShowAllPolicy(true)}
              className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
            >
              Show all Policies
            </button>
          )}

          {roomsPage && showAllPolicy && (
            <BottomTextOverlay
              modelState={showAllPolicy}
              setModelState={setShowAllPolicy}
              dataList={policies}
              heading={"Hotel Policies"}
            />
          )}
        </div>
      )}
    </>
  );
}
