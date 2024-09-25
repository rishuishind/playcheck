import BottomTextOverlay from "@/components/widgets/Overlay/BottomTextOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  hotelDescription: string;
  setShowAllInfo: Function;
  showAllInfo: boolean;
};

export default function HotelInfoSection({
  hotelName,
  hotelCity,
  hotelDescription,
  setShowAllInfo,
  showAllInfo,
}: Props) {
  return (
    <div id="hotel-info" className="navLink p-4 xl:px-0">
      <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
        Information About {hotelName} in {hotelCity}
      </h2>

      <div
        className="line-clamp-6"
        dangerouslySetInnerHTML={{
          __html: hotelDescription,
        }}
      />
      <div
        onClick={() => setShowAllInfo((prev: any) => !prev)}
        className="mt-1 cursor-pointer text-right font-bold tracking-wide text-secondary sm:text-left"
      >
        {showAllInfo ? "Show Less -" : "Show More +"}
      </div>

      {showAllInfo && (
        <BottomTextOverlay
          modelState={showAllInfo}
          setModelState={setShowAllInfo}
          dataList={hotelDescription}
          heading={"Hotel Info"}
        />
      )}
    </div>
  );
}
