import { useState } from "react";
import { FAQS_INFO_ID } from "@/lib/helper";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

type FaqsProps = {
  faqsList: any[];
  showAllFaqs: boolean;
};

type FaqCardProps = {
  id: number;
  isExpanded: boolean;
  onToggle: (id: number) => void;
};

export default function CityPageFaqs({ faqsList, showAllFaqs }: FaqsProps) {
  const fewFaqs = faqsList.slice(0, 8);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const handleToggle = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div id={FAQS_INFO_ID} className="w-full">
      {showAllFaqs
        ? faqsList.map((_, index: number) => (
            <FaqCard
              key={index}
              id={index}
              isExpanded={expandedFaq === index}
              onToggle={handleToggle}
            />
          ))
        : fewFaqs.map((_, index: number) => (
            <FaqCard
              key={index}
              id={index}
              isExpanded={expandedFaq === index}
              onToggle={handleToggle}
            />
          ))}
    </div>
  );
}

export const FaqCard = ({ id, isExpanded, onToggle }: FaqCardProps) => {
  return (
    <div
      className={`text-justify ${isExpanded ? "h-fit transition-all" : ""}`}
    >
      <div
        className={`flex cursor-pointer items-start justify-between gap-2 p-3 ${isExpanded ? "border-b-0 pb-1" : "border-b-2"}`}
        onClick={() => onToggle(id)}
      >
        <h3 className="text-sm font-semibold md:text-base">
          Q. Lorem ipsum dolor sit amet consectetur adipisicing.
        </h3>
        <ChevronUpIcon
          className={`w-7 transform transition-transform ${!isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      {isExpanded && (
        <h4
          className={`px-4 pb-2 text-justify ${isExpanded ? "border-b-2" : "border-b-0"}`}
        >
          Ans. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          rerum pariatur non unde ipsam voluptatem illo, dicta quisquam, numquam
          vitae eius error molestiae at, exercitationem laboriosam harum facere
          reiciendis natus?
        </h4>
      )}
    </div>
  );
};
