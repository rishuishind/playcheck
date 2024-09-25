import { useState } from "react";
import Accordion from "../accordion";

const FaqSection = ({ country }) => {
  const [showMore, setShowMore] = useState(true);
  const [buttonContent, setButtonContent] = useState("Show Less");

  const visaDetailsAccordionItems = [
    {
      title: `Q. Do ${country.label} citizens need to visit the Indian Embassy at any point?`,
      content: (
        <p className="p-1">
          {`Ans: When applying for an Indian Visa from the ${country?.label} online, there is no necessity to physically visit the Indian Embassy or Indian Consulate at any stage. Upon receiving the eVisa for India via email, travelers are authorized to proceed with their journey to India.`}
        </p>
      ),
    },
    {
      title: `Q. Should ${country.label} citizens send their passports, photographs, or documents to the Indian Embassy via courier?`,
      content: (
        <p className="p-1">
          `Ans: When applying for an Indian Visa from the {country.label}
          online, there is no necessity to physically visit the Indian Embassy
          or Indian Consulate at any stage. Upon receiving the eVisa for India
          via email, travelers are authorized to proceed with their journey to
          India.`
        </p>
      ),
    },
    {
      title: `Q. Do ${country.label} citizens need to visit the Indian Embassy at any point?`,
      content: (
        <p className="p-1">
          Ans: You do not need to courier any required documents to obtain an
          Indian e-Visa. {country.label} Citizens can send the documents by
          email or upload them on the website if requested to support their
          Indian Visa Application. The link to upload documents will be sent to
          the applicant&apos;s email address provided at the time of applying.
        </p>
      ),
    },
    {
      title: `Q. How long does it take to get approval for a ${country.label} application?`,
      content: (
        <p className="p-1">
          Ans: Under normal circumstances, you can expect a decision within 3 to
          4 days if you&apos;ve submitted the Indian Visa Application Form and
          required documents correctly. In some cases, it may take up to 7
          business days depending on data accuracy, public holidays in India, or
          during busy holiday seasons.
        </p>
      ),
    },
    {
      title: `Q. What limitations does the Indian e-Visa have for ${country.label} citizens?`,
      content: (
        <p className="p-1">
          Ans {country.label} citizens are restricted from pursuing journalism,
          filmmaking, a university degree, or long-term paid work on the eVisa
          India. This visa also does not allow visits to military or cantonment
          areas without separate permission from the Government of India.
        </p>
      ),
    },
    {
      title: `Q. What should ${country.label} Citizens be aware of if coming to India on e-visa?`,
      content: (
        <p className="p-1">
          Ans: {country.label} citizens applying for an Indian eVisa can find
          helpful guidance on this website. Additional tips can help avoid
          rejection or {country.label} of entry into India. Business visitors
          and those applying for an Indian Business Visa can also benefit from
          useful guidance for a successful business visit to India.
        </p>
      ),
    },
  ];

  const showMoreAccordionItems = [
    {
      title: `What is the application process for Indian Visa for ${country.label} citizens?`,
      content: (
        <>
          <p className="p-1">
            There are various categories of Indian Visas, which are contingent
            upon the nationality of the visitor. ${country.label} citizens are
            required to complete the following straightforward procedures to
            obtain an Indian Visa.
          </p>
          <p className="p-1">
            Step 1: Complete the uncomplicated Indian Visa Application Form,
            with an estimated completion time of 3 minutes for the majority of
            applicants.
          </p>
          <p>
            Step 2: Make payment in any of 137 currencies using a Debit or
            Credit card.
          </p>
          <p>
            Step 3: Furnish additional information if requested by the
            Government of India; in such case, you will be notified via email
            for any further requisite details.
          </p>
          <p>
            Step 4: Receive an approved electronic Indian Visa Online (eVisa
            India) via email.
          </p>
          <p>
            Step 5: Proceed to board your flight to India from any $
            {country.label} or international airport.
          </p>
        </>
      ),
    },
    {
      title: `What can ${country.label} citizens do after getting an approved Indian Visa Online by email (eVisa India)?`,
      content: (
        <>
          <p className="p-1">
            Upon approval of the electronic Visa for India (eVisa India) by the
            Immigration Officers at the Government of India office, you will
            receive a notification via secure email. The notification will
            contain a PDF attachment, which you can either carry to the airport,
            or you may opt to obtain a paper printout of the electronic Indian
            Visa Online (eVisa India) from the email.
          </p>
          <p className="p-1">
            You have the option to travel to India by flying into an airport in
            the ${country.label} or any offshore airport without the necessity
            of obtaining a visa stamp on your passport or visiting the Indian
            Embassy or Indian consulate at any point.
          </p>
        </>
      ),
    },
    {
      title: `How many airports in India are accessible for citizens of the ${country.label} upon arrival?`,
      content: (
        <p className="p-1">
          As of 2024, citizens of the ${country.label} can make use of the eVisa
          India at Thirty-One (31) airports. Please take note that this list of
          airports is regularly updated to ensure accuracy regarding the Indian
          Visa Arrival Airports and Seaports. It is important to be aware that
          if your airport or seaport is not included in the list, it is
          necessary to obtain a regular paper visa from one of the Indian
          embassies.
        </p>
      ),
    },
    {
      title: `How long does it take to get approval for a ${country.label} application?`,
      content: (
        <p className="p-1">
          Under normal circumstances, you can expect a decision within 3 to 4
          days if you&apos;ve submitted the Indian Visa Application Form and
          required documents correctly. In some cases, it may take up to 7
          business days depending on data accuracy, public holidays in India, or
          during busy holiday seasons.
        </p>
      ),
    },
    {
      title: `Does a ${country.label} citizen visiting India by cruise ship require an Indian visa?`,
      content: (
        <>
          <p className="p-1">
            An Electronic India Visa is a mandatory requirement for travelers
            arriving by cruise ship. As of the present date, the eVisa India is
            deemed valid for entry at specific sea ports for cruise ship
            arrivals.
          </p>
          <ul className="list-disc p-1 pl-5">
            <li>Chennai</li>
            <li>Cochin</li>
            <li>Goa</li>
            <li>Mangalore</li>
            <li>Mumbai</li>
          </ul>
        </>
      ),
    },
    {
      title: `Can the ${country.label} Citizens arrive in India from any country or only depart from their country of Passport?`,
      content: (
        <p className="p-1">
          Travelers are permitted to enter India from any country, regardless of
          whether they originate their flight or cruise from the country
          indicated on their passport. Furthermore, upon receiving an Indian
          eVisa via email, there is no requirement to physically visit the
          Indian embassy or obtain a paper stamp in the passport.
        </p>
      ),
    },
    {
      title: "When do I need to contact the Embassy?",
      content: (
        <p className="p-1">
          You do not need to visit or call the Embassy of India during the
          online electronic visa process for India. If your eVisa is rejected,
          you may need to apply for a regular paper visa at the Indian Embassy,
          which is a rare occurrence. For tips on avoiding visa rejection, read
          our guide.
        </p>
      ),
    },
    {
      title: "Can I visit India from any country in the world?",
      content: (
        <p className="p-1">
          You can enter India from any country in the world, regardless of
          whether you are a resident of that country. However, entry and exit
          are limited to designated airports, seaports, railway ports, and land
          ports when using an eVisa.
        </p>
      ),
    },
    {
      title: `What activities are permitted for ${country.label} citizens holding an Indian e-Visa?`,
      content: (
        <>
          <p className="p-1">
            ${country.label} citizens cannot engage in long-term work or
            permanent employment on eVisa India. However, the following is
            allowed on eVisa:
          </p>
          <ul className="list-disc p-1 pl-5">
            <li>Volunteer work</li>
            <li>
              Business meetings, recruitment, setting up projects, technical
              meetings, and fixing machinery or computers, will require an
              invitation letter from an Indian company
            </li>
            <li>Conferences</li>
            <li>Trade fairs</li>
            <li>Meeting friends, relatives</li>
            <li>Studying for less than 6 months</li>
            <li>
              Medical treatment or being a Nurse / Attendant of someone who is
              coming for medical treatment
            </li>
            <li>Workshops</li>
            <li>Conducting tours as a travel guide</li>
          </ul>
        </>
      ),
    },
    {
      title: "Can I be present in India when I apply for eVisa?",
      content: (
        <p className="p-1">
          Regrettably, it is not feasible to acquire an electronic visa for
          India (eVisa India) if you are currently present within the country.
          We advise you to explore alternative avenues through the Indian
          Immigration Department.
        </p>
      ),
    },
    {
      title:
        "Is the e-Visa for India a single or multiple entry visa? Can it be extended?",
      content: (
        <p className="p-1">
          The e-Tourist 30-day Visa allows for double entry, while the e-Tourist
          Visa for 1 year and 5 years permits multiple entries. Similarly, the
          e-Business Visa is a multiple-entry visa. In contrast, the e-Medical
          Visa allows for triple entry. It&apos;s important to note that all
          eVisas are non-convertible and non-extendable.
        </p>
      ),
    },
    {
      title: "Is the e-Visa India valid for cruise ship entries?",
      content: (
        <p className="p-1">
          To visit India on a cruise ship, make sure the ship docks at an
          e-Visa-approved port such as Chennai, Cochin, Goa, Mangalore, or
          Mumbai. If the cruise docks at a different seaport, you&apos;ll need a
          regular visa stamped in your passport.
        </p>
      ),
    },
    {
      title:
        "What are the restrictions when entering India with an e-visa India?",
      content: (
        <>
          <p>
            The e-Visa for India permits entry into the country through
            designated airports and seaports.
          </p>
          <p>
            The list of approved landing airports and seaports in India is as
            follows:
          </p>
          <ul className="list-disc p-1 pl-5">
            <li>Ahmedabad</li>
            <li>Amritsar</li>
            <li>Bagdogra</li>
            <li>Bengaluru</li>
            <li>Bhubaneshwar</li>
            <li>Calicut</li>
            <li>Chennai</li>
            <li>Chandigarh</li>
            <li>Cochin</li>
            <li>Coimbatore</li>
            <li>Delhi</li>
            <li>Gaya</li>
            <li>Goa (Dabolim)</li>
            <li>Goa (Mopa)</li>
            <li>Guwahati</li>
            <li>Hyderabad</li>
            <li>Indore</li>
            <li>Jaipur</li>
            <li>Kannur</li>
            <li>Kolkata</li>
            <li>Lucknow</li>
            <li>Madurai</li>
            <li>Mangalore</li>
            <li>Mumbai</li>
            <li>Nagpur</li>
            <li>Port Blair</li>
            <li>Pune</li>
            <li>Tiruchirapalli</li>
            <li>Trivandrum</li>
            <li>Varanasi</li>
            <li>Vishakhapatnam</li>
          </ul>

          <h2>Or these Authorized Seaports:</h2>
          <ul className="list-disc p-1 pl-5">
            <li>Chennai</li>
            <li>Cochin</li>
            <li>Goa</li>
            <li>Mangalore</li>
            <li>Mumbai</li>
          </ul>
          <p className="p-1">
            It is mandatory for all individuals entering India with an e-Visa to
            exclusively arrive at one of the designated airports or seaports.
            Any attempt to enter India using an e-Visa via an unauthorized
            airport or seaport will result in a denial of entry into the
            country.
          </p>
        </>
      ),
    },
    {
      title: "Is it possible for us to process the eVisas for students?",
      content: (
        <p className="p-1">
          The Government of India supplies Indian e-Visa for travelers whose
          sole objectives such as tourism, short-duration medical treatment, or
          a casual business trip.
        </p>
      ),
    },
    {
      title: "What if I made a mistake on my e-Visa India application?",
      content: (
        <p className="p-1">
          In case the information provided during the e-Visa India application
          process is incorrect, applicants will be required to reapply and
          submit a new application for an online visa for India. The old eVisa
          India application will be canceled automatically.
        </p>
      ),
    },
    {
      title: "What should I do if I lose my passport while in India?",
      content: (
        <p className="p-1">
          In case of a lost passport, report to the local police station
          immediately, obtain a police report, and contact your country&apos;s
          embassy or consulate in India for further assistance.
        </p>
      ),
    },
  ];

  const handleShowMore = (event: any) => {
    if (buttonContent === "Show More") {
      setShowMore(true);
      setButtonContent("Show Less");
      return;
    } else {
      setShowMore(false);
      setButtonContent("Show More");
    }
  };

  return (
    <div id="FAQs">
      <p className="mt-5 text-lg font-bold xl:text-2xl">FAQs</p>
      <Accordion data={visaDetailsAccordionItems} />
      {showMore && <Accordion data={showMoreAccordionItems} />}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleShowMore}
          style={{ backgroundColor: "#005359" }}
          className="mb-4  me-2  rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:text-black"
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default FaqSection;
