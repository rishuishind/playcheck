import React from 'react'
import Accordion from '../accordion';

const Faqs = () => {
    const visaLandingFirstFaq = (
        <div>
          <h3 className="text-xl font-bold">Ans: Eligibility</h3>
          <ul className="list-disc pb-8 pl-5">
            <li>
              <p className="text-base">
                Staybook.in helps you to get an e-Tourist visa with ease, for
                foreigners who want to visit India to explore Indian culture,
                sightseeing, visit friends or family, get short-duration medical
                treatment, or have a casual business meeting. This visa is only for
                these purposes and not for any other activities such as research,
                study, or long stay.
              </p>
            </li>
            <li>
              The applicant&apos;s passport must be valid for at least six months,
              failing which the application will not be considered valid/ or you can
              not apply for an Indian e-tourist visa.
            </li>
            <li>
              The applicant must have a return ticket or onward ticket and must have
              sufficient funds to spend during his/her stay in India. Applicants
              failing to fulfil these conditions will not be granted entry into India.
            </li>
            <li>
              International travellers holding Pakistani passports or having domicile
              in Pakistan cannot apply for an e-tourist Visa, but they can apply for a
              regular visa from an Indian Mission.
            </li>
            <li>
              Indian e-tourist Visa is not available to applicants holding
              diplomatic/official passports or laissez-passer travel documents.
            </li>
            <li>
              Applicant must have a separate passport, i.e. Indian e-Tourist Visa is
              not available to persons mentioned in parent/spouse&apos;s passport.
            </li>
          </ul>
          <h3 className="text-lg font-bold">Validity period of e-Tourist visa</h3>
          <h4 className="text-md font-bold">One-month e-tourist visa:</h4>
          <ul className="list-decimal pl-5">
            <li className="text-base">
              The validity of a one-month e-Tourist Visa is 30 days.
            </li>
            <li>
              This allows double entry, and it can not be extended or converted into
              other visas.
            </li>
          </ul>
      
          <h4 className="text-md mt-5 font-bold">One-year e-tourist visa:</h4>
          <ul className="list-decimal pl-5">
            <li className="text-base">
              A one-year e-tourist visa is valid for only 365 days, from the date of
              grant from ETA.
            </li>
            <li>A one-year e-tourist visa gives multiple entries.</li>
            <li>Applicants can stay for maximum of 180 days in a calendar year.</li>
          </ul>
      
          <h4 className="text-md mt-5 font-bold">Five-year e-tourist visa:</h4>
          <ul className="list-decimal pl-5">
            <li className="text-base">
              Five -years e-tourist visa is valid for only 1826 days, from the date of
              grant from ETA.
            </li>
            <li>Five-year e-tourist visa gives multiple entries.</li>
            <li>The maximum stay should not exceed 180 days in a calendar year.</li>
          </ul>
      
          <h3 className="mt-5 text-lg font-bold">
            Conditions for Indian e-Tourist Visa
          </h3>
          <ul className="mb-3 list-decimal pl-5">
            <li>
              e-Tourist Visa is non-extendable, non-convertible, and not valid for
              visiting protected/restricted, and cantonment areas and requires prior
              permission from the government of India.
            </li>
            <li>
              Applicants of eligible countries/territories must apply online for an
              e-tourist visa a minimum of 4 days before his/her date of arrival in
              India.
            </li>
            <li>
              e-tourist visa fees vary depending on the country/region. A bank
              transaction fee of 2.5% will be charged additionally on top of the
              applicable e-visa by the india immigration department. The fee must be
              paid a minimum of before 4 days of the applicant’s date of arrival in
              India
            </li>
            <li>
              e-tourist visa fee is non-refundable if once submitted for further
              processing, The fee is for processing your application for an e-tourist
              visa and is not dependent on the approval or rejection of the Electronic
              Travel Authorization (ETA).
            </li>
            <li>
              The Biometric details of the applicant will be captured at the time of
              arrival in India by the authorities.
            </li>
            <li>
              The applicant has to carry a copy of the Electronic Travel Authorization
              (ETA) at the time of travel, and the Electronic Travel Authorization
              status must be shown as “Granted ” staybook.in will assist you in
              tracking your application status.
            </li>
            <li>
              The electronic visa India fee payment status update may take up to 2
              hours due to technical reasons/network delays. Before re-applying, the
              applicants are requested to wait for 2 hours for payment status
              updating.
            </li>
            <li>
              Applicants must travel on a passport for which he/she has applied for an
              e-tourist visa. Entry will be allowed into India on the new passport
              even if the ETA has been issued on the old passport, there is no
              solution for this situation in such cases travellers must carry their
              old passport on which the ETA was issued.
            </li>
            <li>
              Indian e-tourist Visa is not available to applicants holding only
              international travel documents, the applicant must have a valid passport
              for up to six months.
            </li>
            <li>
              Applicants having a defence/military/security/police background
              (working/retired) or an official/diplomatic passport holder are not
              eligible for an Indian e-tourist visa. You are advised to ​​apply for an
              Indian visa online for a regular visa through the Indian visa online
              portal of the Government of India. If you attempt to enter India on an
              e-Visa also named as electronic visa india by concealing information
              about your professional background, you may be denied entry to India and
              deported from India to the port of embarkation(this condition is
              especially for Canadian Nationals)
            </li>
            <li>
              Repeat visit condition, e-Tourist visa is allowed for a maximum of two
              times in a calendar year to travellers of foreign countries.
            </li>
            <li>
              In some cases, the e-Visa fee is deducted but the status is not updated,
              applicants are advised to Verify payment/wait for visa fee payment to be
              processed and cooperate with our operator.
            </li>
            <li>
              Travellers arriving from Yellow fever-affected countries must carry a
              YELLOW FEVER VACCINATION CARD at the time of arrival in India,
              otherwise, they may be quarantined for 6 days upon arrival in India.
              Please visit the Ministry Of Health & Family Welfare latest guidelines
              regarding yellow fever countries.
            </li>
          </ul>
          <p className="text-lg font-bold">
            The applicant should furnish an undertaking on the following line:-
          </p>
          <p className="pb-5 text-base">
            (a) That he/she is not engaged in Business activities, nor in Employment
            or pursuing studies/research etc. in India
          </p>
          <h3 className="font-bold text-xl mb-1">Countries Affected by Yellow Fever:</h3>
          <div className="w-full mb-2">
        <table className="border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Africa</th>
              <th className="border border-gray-400 px-4 py-2">Central & South America</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-400">
                <ul className="list-decimal pl-4 text-ellipsis">
                  <li>Angola</li>
                  <li>Benin</li>
                  <li>Burkina Faso</li>
                  <li>Burundi</li>
                  <li>Cameroon</li>
                  <li>Central African Republic</li>
                  <li>Chad</li>
                  <li>Congo</li>
                  <li>Côte d’Ivoire</li>
                  <li>Democratic Republic of Congo</li>
                  <li>Equatorial Guinea</li>
                  <li>Ethiopia</li>
                  <li>Gabon</li>
                  <li>The Gambia</li>
                  <li>Ghana</li>
                  <li>Guinea</li>
                  <li>Guinea-Bissau</li>
                  <li>Kenya</li>
                  <li>Liberia</li>
                  <li>Mali</li>
                  <li>Mauritania</li>
                  <li>Niger</li>
                  <li>Nigeria</li>
                  <li>Senegal</li>
                  <li>Sierra Leone</li>
                  <li>Sudan</li>
                  <li>South Sudan</li>
                  <li>Togo</li>
                  <li>Uganda</li>
                </ul>
              </td>
              <td className=" px-4 py-2 flex items-start h-full">
                <ul className="list-decimal pl-4 text-start">
                  <li>Argentina</li>
                  <li>Bolivia</li>
                  <li>Brazil</li>
                  <li>Colombia</li>
                  <li>Ecuador</li>
                  <li>French Guiana</li>
                  <li>Guyana</li>
                  <li>Panama</li>
                  <li>Paraguay</li>
                  <li>Peru</li>
                  <li>Suriname</li>
                  <li>Trinidad and Tobago</li>
                  <li>Venezuela</li>
                </ul>
              </td>
      
            </tr>
          </tbody>
        </table>
        <p className="font-bold mt-2">This list was last updated on 3rd January 2023 by WHO.</p>
      </div>
      
      
        </div>
      );
      
      const visaLandingSecondFaq = (
        <ul className="list-disc pl-4">
          <p className="font-bold">Ans:</p>
          <li>Passport with minimum validity of 6 months</li>
          <li>
            Scanned Biographic Page of the applicant&apos;s passport showing the
            Photograph and other details.
          </li>
          <ul className="list-decimal pl-5">
            <li>Format: PDF</li>
            <li>PDF size minimum 10KB, and maximum 300 KB.</li>
          </ul>
      
          <li>
            A recent photograph of the traveller 
          </li>
          <li>The digital photograph to be uploaded
          along with the e-Visa application should meet the following requirements:</li>
          <ul className="list-decimal pl-5">
            <li>The format of the photograph must be: JPEG</li>
            <li>Size must be:</li>
            <ul className="pl-5">
              <li className="">(a) Minimum 10 KB</li>
              <li>(b) Maximum 1 MB</li>
            </ul>
            <li>The height and width of the Photo must be equal, without borders.</li>
            <li>
              The photo should present a full face, front view, eyes open and without
              spectacles
            </li>
            <li>
              Centre head within frame and present full head from top of hair to
              bottom of chin
            </li>
            <li>
              The background should be plain and light in colour or white background.
            </li>
            <li>No shadows on the face or on the background.</li>
          </ul>
          <p className="font-bold">
            keep all these documents ready at hand, the entire process may take around
            10-15 minutes including the payment of processing the visa application.
          </p>
        </ul>
      );
      
       const visaLandingAccordionItems = [
        { title: "Q. DETAILS FOR INDIAN eVISA", content: visaLandingFirstFaq },
        {
          title: "Q. DOCUMENTS REQUIRED FOR INDIAN eVISA",
          content: visaLandingSecondFaq,
        },
      ];
  return (
    <Accordion data={visaLandingAccordionItems} />
  )
}

export default Faqs