import { root_page_faq_showing_list } from "@/lib/helper/pageData";
import FaqCard from "../hotel/cards/FaqCard";

type Props = {};

export default function FaqSection({}: Props) {
  return (
    <>
      <div className="wrapper h-full py-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider font-dream text-secondary">
          Hotel Booking FAQs
        </h2>
        {root_page_faq_showing_list.map((faq, index) => (
          <FaqCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
}
