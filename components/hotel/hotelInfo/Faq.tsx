import Faqs from "@/components/hotel/Faq/Faqs";
import GridOverlay from "@/components/widgets/Overlay/GridOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  faqList: any[];
  showAllFaqs: boolean;
  setShowAllFaqs: Function;
};

export default function FaqSection({
  hotelName,
  hotelCity,
  faqList,
  showAllFaqs,
  setShowAllFaqs,
}: Props) {
  // slice few data
  const lessData = faqList?.slice(0, Math.min(16, faqList?.length));
  return (
    <>
      {!!faqList?.length && (
        <div id="faqs" className="navLink">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            FAQs of {hotelName} in {hotelCity}
          </h2>

          <Faqs faqsList={lessData} showAllFaqs={true} />

          <button
            type="button"
            onClick={() => setShowAllFaqs(true)}
            className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
          >
            Show all Faqs
          </button>

          {showAllFaqs && (
            <GridOverlay
              modelState={showAllFaqs}
              setModelState={setShowAllFaqs}
              dataList={faqList}
              keyValue={"faq"}
              heading={"Hotel Faqs"}
            />
          )}
        </div>
      )}
    </>
  );
}
