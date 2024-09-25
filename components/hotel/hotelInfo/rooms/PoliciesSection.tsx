import BottomTextOverlay from "@/components/widgets/Overlay/BottomTextOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  policies: string;
  setShowAllPolicy: Function;
  showAllPolicy: boolean;
};

export default function PoliciesSection({
  hotelName,
  hotelCity,
  policies,
  setShowAllPolicy,
  showAllPolicy,
}: Props) {
  return (
    <div id="hotel-policies" className="navLink p-4 xl:px-0">
      <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
        Privacy Policies of {hotelName} in {hotelCity}
      </h2>
      <div
        className="line-clamp-6"
        dangerouslySetInnerHTML={{
          __html: policies,
        }}
      />
      <div
        onClick={() => setShowAllPolicy((prev: any) => !prev)}
        className="mt-1 cursor-pointer text-right font-bold tracking-wide text-secondary sm:text-left"
      >
        {showAllPolicy ? "Show Less -" : "Show More +"}
      </div>

      {showAllPolicy && (
        <BottomTextOverlay
          modelState={showAllPolicy}
          setModelState={setShowAllPolicy}
          dataList={policies}
          heading={"Hotel Privacy Policy"}
        />
      )}
    </div>
  );
}
