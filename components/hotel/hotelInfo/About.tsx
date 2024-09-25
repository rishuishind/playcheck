import BottomTextOverlay from "@/components/widgets/Overlay/BottomTextOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  hotelDescription: string;
  showAllInfo: boolean;
  setShowAllInfo: Function;
  roomsPage: boolean;
};

export default function AboutSection({
  hotelName,
  hotelCity,
  hotelDescription,
  showAllInfo,
  setShowAllInfo,
  roomsPage,
}: Props) {
  return (
    <>
      {!!hotelDescription?.length && (
        <div id="hotel-info" className="navLink">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Information About {hotelName} in {hotelCity}
          </h2>

          <div
            className={`text-justify text-sm lg:text-base ${roomsPage ? "line-clamp-6" : ""}`}
            dangerouslySetInnerHTML={{
              __html: hotelDescription,
            }}
          />

          {roomsPage && (
            <button
              type="button"
              onClick={() => setShowAllInfo(true)}
              className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
            >
              Show all About
            </button>
          )}

          {roomsPage && showAllInfo && (
            <BottomTextOverlay
              modelState={showAllInfo}
              setModelState={setShowAllInfo}
              dataList={hotelDescription}
              heading={"Hotel Info"}
            />
          )}
        </div>
      )}
    </>
  );
}
