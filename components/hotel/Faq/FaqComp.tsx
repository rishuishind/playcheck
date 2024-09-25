const Faq = ({ faq, hotelName }) => {
  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Faqs at ${hotelName}`}
      </h2>
      <div className="mb-8 mt-4 rounded-lg border-2">
        {faq.map(({ faq_Question, faq_Id, faq_Answer }) => (
          <div key={faq_Id} className="rounded p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary">
              {`Q. ${faq_Question}`}
            </h2>
            <p>{`Ans. ${faq_Answer}`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
