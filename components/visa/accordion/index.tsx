import { useState } from "react";

interface AccordionProps {
  data: { title: string; content: React.ReactNode }[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    data.map((_, index) => index), // Set all indices open by default
  );

  const toggleAccordion = (index: number) => {
    setOpenIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index],
    );
  };

  return (
    <div className="mt-5 rounded-xl">
      {data?.map((item, index) => (
        <div key={index} className="rounded-xl bg-white shadow-lg">
          <div className="mb-4">
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-lg font-bold">{item.title}</h2>
              <svg
                className={`h-6 w-6 ${
                  openIndices.includes(index) ? "rotate-180 transform" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L10 11.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5z"
                />
              </svg>
            </div>
            {openIndices.includes(index) && (
              <div className="rounded-bl-xl rounded-br-xl border-t-2 bg-white p-4 shadow-md">
                {item.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
