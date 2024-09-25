import { FAQS_INFO_ID } from "@/lib/helper";

type Props = {
  faqsList: any[];
  showAllFaqs: boolean;
};

export default function Faqs({ faqsList, showAllFaqs }: Props) {
  const fewFaqs = faqsList.slice(0, 8);

  return (
    <>
      <div
        id={FAQS_INFO_ID}
        className="grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-5"
      >
        {showAllFaqs ? (
          <>
            {faqsList.map((faq: any, idx: number) => (
              <FaqCard
                key={idx}
                question={faq.name}
                answer={faq.acceptedAnswer.text}
              />
            ))}
          </>
        ) : (
          <>
            {fewFaqs.map((faq: any, idx: number) => (
              <FaqCard
                key={idx}
                question={faq.name}
                answer={faq.acceptedAnswer.text}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

const FaqCard = ({ question, answer }) => {
  return (
    <div className="py-1 text-sm lg:text-base">
      <h3 className="font-semibold text-secondary">Q. {question}</h3>
      <h4 className="text-justify">Ans. {answer}</h4>
    </div>
  );
};
