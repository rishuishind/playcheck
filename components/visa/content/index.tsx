"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const Content = () => {
  const [showMore, setShowMore] = useState(true);
  const [buttonContent, setButtonContnet] = useState("Show Less-");

  const handleContentChange = (event: any) => {
    if (buttonContent === "Show More+") {
      setShowMore(true);
      setButtonContnet("Show Less-");
    } else {
      setShowMore(false);
      setButtonContnet("Show More+");
    }
  };

  const extraContent = (
    <>
      <p className="mb-2">
        The Indian e-tourist visa is a convenient online system that allows
        citizens of 160 countries around the globe to apply for an e-tourist
        visa to India hassle-free, applicants can apply for an e-tourist visa
        without visiting an Indian mission. Staybook helps you apply for an
        Indian e-tourist visa with a few easy steps, providing us with the
        necessary information, and required documents. After completing the
        documentation and the form-filling applicant shall pay the e-visa India
        fees required for an e-tourist visa fees for Indian e-visa vary
        depending on the country/region. A bank transaction fee of 2.5% will be
        charged additionally on top of the applicable e-visa by the India
        immigration department. The e-visa India fee must be paid a minimum of 4
        days before the applicant’s date of arrival in India. applicants will
        receive their e-tourist visa by e-mail, simplifying their travel
        preparations. Staybook offers significant advantages in terms of
        convenience & assures applications be processed within 72 hours, it can
        take a little longer in some cases. The e-tourist visa system
        accommodates 11th-hour travel plans with no bureaucratic hurdles for
        travellers; there are three different types of e-tourist visas: one
        month, one year, and five years. Each has different conditions and
        validity periods such as double entry or multiple entry, making the
        Indian tourism sector more accessible.
      </p>
      <p className="mb-2">
        Applicants must go through the policies and conditions before applying
        for an Indian e-tourist visa, applications must be submitted a minimum 4
        days before the date of arrival in India, e-tourist visa holder
        travellers are permitted only through designated airports and seaports
        list available on our website.
      </p>
      <p className="mb-2">
        e-Tourist visa cannot be exceeded or converted into other visas, breach
        of policies or overstaying makes you liable to penalties or future
        restrictions.
      </p>
    </>
  );

  return (
    <div className="text-md mt-5 lg:p-0">
      <Image
        src="https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/about_evisa.webp"
        alt="about-image"
        className="h-48 w-[80rem] rounded-tl-xl rounded-tr-xl object-cover md:h-full"
        width={1280}
        height={192}
      ></Image>
      <div className="mb-2 rounded-bl-xl rounded-br-xl bg-gradient-to-br from-white to-teal-100 px-5 pb-2 pt-10 shadow-xl">
        <h2 className="mb-5 text-2xl md:text-3xl">
          About Indian e-Tourist Visa
        </h2>
        <p className="">
          The Indian e-Tourist Visa is a convenient online system that allows
          citizens from over 160 countries to apply for a visa to India without
          visiting an embassy or consulate. It caters to travel purposes.
          Applicants can complete the process online by filling out a form,
          submitting required documents, and paying the fee, after which the
          eVisa is emailed to them, simplifying their travel preparations.
        </p>
        {showMore && extraContent}
        <button
          className="mb-2 mt-2  font-bold text-teal-800"
          onClick={handleContentChange}
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default Content;
