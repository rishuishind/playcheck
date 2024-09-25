"use client";
import React, { useEffect, useRef, useState } from "react";
import { countriesPriceData } from "@/lib/helper/countriesData";
import Link from "next/link";

const Details = ({ country }: any) => {
  const [selectedTab, setSelectedTab] = useState("Eligibility");

  const eligibilityRef = useRef(null);
  const requirementRef = useRef(null);
  const documentsRef = useRef(null);
  const entryPointRef = useRef(null);
  const exitPointRef = useRef(null);
  const faqSectionRef = useRef(null);
  const visaPricesRef = useRef(null);
  const containerRef = useRef(null);
  const embassyRef = useRef(null)

  const renderContent = () => {
    return (
      <>
        <div className="mb-3 pl-5" id="Eligibility" ref={eligibilityRef}>
          <h2 className="text-2xl font-bold">Eligibility</h2>
          <ul className="list-disc">
            <li>{`${country.label} citizens can apply for their e-tourist visa easily with the help of staybook.in`}</li>
            <li>
              {`${country.label} is a valid country to apply for India's tourist e-Visa.`}
            </li>
            <li>
              {`${country.label} citizens should submit the eVisa application at least 4 days before travelling to India.`}
            </li>
            <li>
              {`${country.label} citizen's Passport must be Ordinary or Regular. Diplomatic Passport is
                not allowed.`}
            </li>
            <li>
              {`${country.label}  can enjoy fast entry using the India online visa program with the help of staybook.in`}
            </li>
            <li>
              Tourist visa for India is available in 3 durations: 30 days, 1
              year, and 5 years.
            </li>
          </ul>

          <h3 className="mt-5 text-xl font-bold">Details and exemptions</h3>
          <ul className="list-decimal">
            <li>
              {country.label} citizens can apply for an e-tourist Visa with ease
              at staybook.in, which can be valid for up to 5 years as per your
              requirements.
            </li>
            <li>
              The Indian e-Visa for Albanian citizens allows multiple entries in
              india on 1-year and 5-year e-tourist visas.
            </li>
            <li>
              {country.label} citizens using the e-Visa can stay in India for up
              to 90 continuous days per visit.
            </li>
            <li>
              The e-Visa is valid for entry through authorised airports and
              seaports, not land-based immigration checkpoints.
            </li>
            <li>
              The e-Visa permits travel throughout all States and Union
              Territories of India.
            </li>
            <li>
              The Indian e-Visa Online can be used for purposes such as tourism,
              medical visits, and business trips by {country.label} citizens.
            </li>
          </ul>

          <h3 className="mt-5 text-xl font-bold">Details and validity</h3>
          <p>
            This e-Visa gives electronic authorization for visiting the country
            to travelers coming to India for the purposes of:-
          </p>
          <ul className="mt-1 list-disc">
            <li>Tourism and sightseeing,</li>
            <li>Visiting family and/or friend</li>
            <li>For a Yoga retreat</li>
          </ul>
          <p className="mt-5 text-xl font-bold">
            Things to keep in mind while applying for an e-tourist visa:
          </p>
          <ul className="list-disc">
            <li>
              <strong>Accuracy: </strong>Ensure application details match the
              passport.
            </li>
            <li>
              <strong>Preparation: </strong>Have all documents ready before
              applying.
            </li>
            <li>
              <strong>Timing</strong>Apply at least four days before the
              intended travel date.
            </li>
          </ul>
          <p className="mt-5 text-xl font-bold">
            There are 3 types of this Visa:
          </p>
          <ul className="list-disc">
            <li>The 30 Day Tourist e-Visa, which is a Double Entry Visa.</li>
            <li>The 1 Year Tourist e-Visa, which is a Multiple Entry Visa.</li>
            <li>The 5 Year Tourist e-Visa, which is a Multiple Entry Visa.</li>
          </ul>
        </div>

        <div className="mt-5" id="Requirement" ref={requirementRef}>
          <h2 className="pb-1 text-2xl font-bold">Requirement</h2>
          <section className="mb-8">
            <h2 className="text-xl font-bold">
              For Tourist e-Visa Information
            </h2>
            <ul className="list-inside list-disc">
              <li>
                {`When tourist e-Visa from ${country.value} is applied online there is no requirement at any stage to visit Indian Embassy or Indian Consulate. Once the e-Visa for India is received by email, you are authorized to travel to India.`}
              </li>
              <li>
                There is no need to visit the Indian Embassy or Consulate at any
                stage.
              </li>
              <li>
                Complete the e-Tourist Visa application process entirely online
                with the help of staybook.in.
              </li>
              <li>Once approved, the e-Visa is sent via email.</li>
              <li>
                No need for confirmation or stamp on the passport from the
                Indian Embassy.
              </li>
              <li>
                The Indian e-Visa is recorded in the central computer system of
                the Government of India.
              </li>
              <li>
                Immigration Officers at any airport globally can access your
                e-Visa information.
              </li>
              <li>
                {`${country.label} citizens must carry a soft copy (on phone, computer, or
                  tablet) or a printed copy of the e-Visa.`}
              </li>
              <li>
                No passport stamp is required for the electronic Indian Visa
                (e-Visa India).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-1 text-2xl font-bold">Validity and Conditions</h2>
            <h3 className="text-xl font-bold">One-month e-tourist visa:</h3>
            <ul className="list-inside list-disc">
              <li>
                Available for group tourists from October 15, 2021, and for
                individual tourists from November 15, 2021
              </li>
              <li>
                The validity of a one-month e-tourist visa is 30 days (not 28,29
                or 31 days).
              </li>
              <li>
                This allows double entry, and it can not be extended or
                converted into other visas.
              </li>

              <h3 className="mt-3 text-xl font-bold">
                One-year e-tourist visa:
              </h3>
              <li>
                A one-year e-tourist visa is valid for only 365 days, from the
                date of grant from ETA.
              </li>
              <li>A one-year e-tourist visa gives multiple entries.</li>
              <li>Applicants can stay for 180 days in a calendar year.</li>

              <h3 className="mt-3 text-xl font-bold">
                Five-years e-tourist visa:
              </h3>
              <li>
                Five -years e-tourist visa is valid for only 1826 days, from the
                date of grant from ETA.
              </li>
              <li>Five-year e-tourist visa gives multiple entries.</li>
              <li>
                The maximum stay should not exceed 180 days in a calendar year.
              </li>
              <p className="font-bold">
                Applicants must apply for an e-tourist visa at least four days
                before the date of travel.
              </p>

              <li className="mt-3">
                <strong>Entry Points:</strong> 28 designated airports:
                <ul className="ml-4 list-inside list-decimal">
                  <li>Ahmedabad Airport</li>
                  <li>Amritsar Airport</li>
                  <li>Bagdogra Airport</li>
                  <li>Bengaluru Airport</li>
                  <li>Bhubaneswar Airport</li>
                  <li>Calicut Airport</li>
                  <li>Chandigarh Airport</li>
                  <li>Chennai Airport</li>
                  <li>Cochin Airport</li>
                  <li>Coimbatore Airport</li>
                  <li>Delhi Airport</li>
                  <li>Gaya Airport</li>
                  <li>Goa Airport</li>
                  <li>Guwahati Airport</li>
                  <li>Hyderabad Airport</li>
                  <li>Jaipur Airport</li>
                  <li>Kannur Airport</li>
                  <li>Kolkata Airport</li>
                  <li>Lucknow Airport</li>
                  <li>Madurai Airport</li>
                  <li>Mangalore Airport</li>
                  <li>Mumbai Airport</li>
                  <li>Nagpur Airport</li>
                  <li>Pune Airport</li>
                  <li>Port Blair Airport</li>
                  <li>Tiruchirapalli Airport</li>
                  <li>Trivandrum Airport</li>
                  <li>Varanasi Airport</li>
                  <li>Vishakhapatnam Airport</li>
                </ul>
              </li>
              <li>
                <strong>Seaports:</strong> 5 seaports:
                <ul className="ml-4 list-inside list-decimal">
                  <li>Chennai Seaport</li>
                  <li>Cochin Seaport</li>
                  <li>Goa Seaport</li>
                  <li>Mangalore Seaport</li>
                  <li>Mumbai Seaport</li>
                </ul>
              </li>
              <li>
                <strong>Exit Points:</strong> Any authorized Immigration Check
                Posts (ICPs).
              </li>
            </ul>
          </section>
        </div>
        <div className="mt-5" id="Documents" ref={documentsRef}>
          <h2 className="pb-2 text-2xl font-bold">Documents</h2>
          <h1 className="mb-1 text-xl font-bold">
            Document Requirements for e-Tourist Visa of India
          </h1>
          <section className="mb-3">
            <h3 className="mb-1 text-lg font-semibold">
              Passport Requirements:
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Your passport must be valid for at least 6 months from the date
                of your arrival in India.
              </li>
              <li>It should have at least two blank pages for stamping.</li>
            </ul>
          </section>

          <section className="mb-3">
            <h2 className="mb-1 text-lg font-semibold">
              Passport Biographical Page:
            </h2>
            <ul className="list-disc pl-6">
              <li>
                Scanned Biographic Page of the applicant&apos;s passport showing
                the Photograph and other details.
              </li>
              <ul className="list-decimal pl-5">
                <li>Format: PDF</li>
                <li>PDF size minimum 10KB, and maximum 300 KB.</li>
              </ul>
            </ul>
          </section>

          <section className="mb-3">
            <h3 className="text-lg font-semibold">
              Recent Passport-Style Photograph:
            </h3>
            <ul className="list-decimal pl-6">
              <li>The format of the photograph must be: JPEG</li>
              <li>Size must be</li>
              <ul className="pl-5">
                <li>(a) Minimum 10 KB</li>
                <li>(b) Maximum 1 MB</li>
              </ul>
              <li>
                The height and width of the Photo must be equal, without
                borders.
              </li>
              <li>
                The photo should present a full face, front view, eyes open and
                without spectacles.
              </li>
              <li>
                Centre head within frame and present full head from top of hair
                to bottom of chin
              </li>
              <li>
                The background should be plain and light in colour or white
                background.
              </li>
              <li>There should be no shadow in the background of the face.</li>
            </ul>
          </section>

          <section className="mb-3">
            <h2 className="text-lg font-semibold">Payment Method:</h2>
            <ul className="list-disc pl-6">
              <li>
                A credit or debit card for online payment of the visa fee. The
                fee varies based on the duration and type of e-Visa.
              </li>
            </ul>
          </section>

          <section className="mb-3">
            <h2 className="text-xl font-semibold">Email Address:</h2>
            <ul className="list-disc pl-6">
              <li>
                A valid email address where you will receive the approved Indian
                Tourist e-Visa.
              </li>
              <li>
                Ensure you can access this email for important updates and
                notifications regarding your visa application.
              </li>
            </ul>
          </section>

          <section className="mb-3">
            <h2 className="text-xl font-semibold">Additional Requirement:</h2>
            <ul className="list-disc pl-6">
              <li>
                Proof of sufficient funds for your trip and stay in India may be
                required. This could include bank statements or other financial
                documents to demonstrate your ability to support yourself during
                your visit.
                <p className="">
                  By gathering these documents and information, you can smoothly
                  complete the online application process for your Indian
                  Tourist e-Visa, allowing you to enjoy your tourism activities
                  in India without the need to visit an embassy or consulate.
                </p>
              </li>
            </ul>
          </section>

          <h2 className="mb-3 text-xl font-bold">Details about Photo</h2>

          <section className="mb-3">
            <h3 className="text-lg font-semibold">Background and Lighting:</h3>
            <ul className="list-disc pl-6">
              <li>
                Choose a plain white or light-colored background without any
                designs or dark colors.
              </li>
              <li>Ensure there are no shadows on your face or background.</li>
              <li>Opt for even lighting to avoid harsh shadows.</li>
            </ul>
          </section>

          <section className="mb-3">
            <h3 className="text-lg font-semibold">Facial Expressions:</h3>
            <ul className="list-disc pl-6">
              <li>
                Maintain a neutral facial expression with your mouth closed and
                eyes open.
              </li>
              <li>
                Position your head in the center of the photograph for a clear
                and balanced image.
              </li>
            </ul>
          </section>

          <section className="mb-3">
            <h3 className="text-lg font-semibold">Quality of the Photo:</h3>
            <ul className="list-disc pl-6">
              <li>
                The photo should be clear, sharp, and free from blur or
                graininess.
              </li>
              <li>
                Ensure the image is of high resolution to maintain clarity.
              </li>
            </ul>
          </section>

          <section className="mb-3">
            <h3 className="text-lg font-semibold">Clothing and Accessories:</h3>
            <ul className="list-disc pl-6">
              <li>
                Wear normal, everyday clothing without any prominent patterns or
                designs.
              </li>
              <li>
                Avoid wearing hats, scarves, or sunglasses, as they are not
                permitted.
              </li>
              <li>
                Religious clothing, including headscarves, is acceptable as long
                as it does not obscure facial features.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">
              Dimensions, Size, and Format:
            </h3>
            <ul className="list-disc pl-6">
              <li>The photo should be square-shaped.</li>
              <li>
                Minimum dimensions should be 350 pixels by 350 pixels, and
                maximum dimensions can go up to 1000 pixels by 1000 pixels.
              </li>
              <li>
                The file size should not exceed 10 MB. If the file size exceeds
                this limit, contact the Help Desk for assistance.
              </li>
              <li>
                Any standard image format (JPEG, PNG, etc.) is acceptable for
                submission.
              </li>
            </ul>
          </section>

          <p>
            Adhering to these guidelines ensures that your photograph meets the
            requirements for the Indian Tourist e-Visa application, facilitating
            a smooth and efficient visa processing experience.
          </p>
        </div>
        <div className="mt-5" id="Embassy" ref={embassyRef}>
          <h2 className="pb-1 text-2xl font-bold">Embassy</h2>
          <div>
            <p><strong>Address: </strong>{country.address.address}</p>
            <p><strong>City: </strong>{country.address.city}</p>
            <p><strong>Phone: </strong>{(country.address.phone ? country.address.phone : '')}</p>
            <p><strong>Email: </strong>{(country.address.email ? country.address.email : '')}</p>
            <p><strong>Fax: </strong>{(country.address.fax ? country.address.fax : '')}</p>
          </div>
        </div>
        <div className="mt-5" id="Entry-Points" ref={entryPointRef}>
          <h2 className="pb-3 text-3xl font-bold">Entry Points</h2>
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">
              Entry Points for eVisa Holders
            </h2>
            <p>
              Indian e-Visa holders can enter India via authorized air and sea
              ports. For exiting, travelers can use air, sea, land, or rail
              routes. It’s essential to choose the correct entry and exit
              points.
            </p>
            <p>
              The list of authorized airports and seaports is periodically
              updated, so it’s advisable to check for the latest information
              regularly. Currently, e-Visa holders can enter India through 31
              designated airports and 5 seaports. Entry must be through these
              designated points, but exit can be through any authorized
              Immigration Check Points (ICPs), including air, sea, rail, or
              road.
            </p>
            <p>
              Electronic visa holders must enter India through one of the 31
              designated international airports. However, they can exit the
              country from any authorized ICPs, whether by air, sea, rail, or
              road.
            </p>
          </section>
          <h2 className="mb-4 text-2xl font-bold">
            Designated Entry Points for Indian eVisa
          </h2>
          <section className="mb-8 overflow-auto">
            <table className="w-full table-auto border-collapse border border-gray-400 text-xs md:text-lg">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Airports
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Airports
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Seaports
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Ahmedabad</td>
                  <td className="border border-gray-300 p-2">Amritsar</td>
                  <td className="border border-gray-300 p-2">Chennai</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Bagdogra</td>
                  <td className="border border-gray-300 p-2">Bengaluru</td>
                  <td className="border border-gray-300 p-2">Cochin</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Bhubaneshwar</td>
                  <td className="border border-gray-300 p-2">Calicut</td>
                  <td className="border border-gray-300 p-2">Goa</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Chennai</td>
                  <td className="border border-gray-300 p-2">Chandigarh</td>
                  <td className="border border-gray-300 p-2">Mangalore</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Cochin</td>
                  <td className="border border-gray-300 p-2">Coimbatore</td>
                  <td className="border border-gray-300 p-2">Mumbai</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Delhi</td>
                  <td className="border border-gray-300 p-2">Gaya</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Goa(Dabolim)</td>
                  <td className="border border-gray-300 p-2">Goa(Mopa)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Guwahati</td>
                  <td className="border border-gray-300 p-2">Hyderabad</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Indore</td>
                  <td className="border border-gray-300 p-2">Jaipur</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Kannur</td>
                  <td className="border border-gray-300 p-2">Kolkata</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Lucknow</td>
                  <td className="border border-gray-300 p-2">Madurai</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Mangalore</td>
                  <td className="border border-gray-300 p-2">Mumbai</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Nagpur</td>
                  <td className="border border-gray-300 p-2">Port Blair</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Pune</td>
                  <td className="border border-gray-300 p-2">Tiruchirapalli</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Trivandrum</td>
                  <td className="border border-gray-300 p-2">Varanasi</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Vishakhapatnam</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              Tourist e-Visa holders will only be issued at specific authorized
              airports
            </h2>
            <ul className="ml-4 list-inside list-disc">
              <li>Vishakhapatnam</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Kolkata</li>
              <li>Trivandrum</li>
              <li>Bangalore</li>
              <li>Hyderabad</li>
              <li>Kochi</li>
              <li>Goa</li>
            </ul>
            <p className="mt-4">
              <strong>Please note:</strong> Travelers can only enter and exit
              from these authorized airports & seaports. If you are planning to
              enter through any other seaport or airport that is not on the list
              then you must have a regular visa.
            </p>
          </section>
        </div>
        <div className="mt-5" id="Exit-Points" ref={exitPointRef}>
          <h2 className="pb-3 text-3xl font-bold">Exit Points</h2>
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">
              Exit Points for e-Visa Holders
            </h2>
            <p>
              Electronic visas have become a favorite among travelers for their
              convenience and advantages. Since the introduction of the Indian
              e-Visa in 2014, the number of tourists has significantly
              increased. Many travelers prefer the e-Visa over a regular one
              because it simplifies the process and offers several benefits. One
              major advantage of the Indian e-Visa is the flexibility it
              provides with a wide range of authorized Immigration Checkpoints
              for both entry and exit.
            </p>
            <p>
              These authorized entry and exit points are periodically revised,
              so staying updated is crucial. For the latest information, you can
              always check back for an updated list of Indian e-Visa exit
              points. Additionally, you can review and bookmark the list of
              Indian e-Visa authorized entry points for your convenience.
              Travelers can enter India by sea or air, while for exiting the
              country, they have four options: sea, air, land, and rail.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">
              What are the Exit Immigration Checkpoints?
            </h3>
            <ul className="mb-4 ml-4 list-inside list-disc">
              <li>34 Airports</li>
              <li>34 Land Checkpoints</li>
              <li>31 Seaports</li>
              <li>5 Rail Checkpoints</li>
            </ul>
            <h3 className="mb-4 text-xl font-semibold">
              Designated Airports for Exit
            </h3>
            <section className="overflow-auto">
              <table className="mb-8 w-full table-auto border-collapse border border-gray-400 text-xs md:text-lg">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">
                      Airports
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Airports
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Airports
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Ahmedabad</td>
                    <td className="border border-gray-300 p-2">Amritsar</td>
                    <td className="border border-gray-300 p-2">Bagdogra</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Bengaluru</td>
                    <td className="border border-gray-300 p-2">Bhubaneshwar</td>
                    <td className="border border-gray-300 p-2">Calicut</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Chennai</td>
                    <td className="border border-gray-300 p-2">Chandigarh</td>
                    <td className="border border-gray-300 p-2">Cochin</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Coimbatore</td>
                    <td className="border border-gray-300 p-2">Delhi</td>
                    <td className="border border-gray-300 p-2">Gaya</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Goa</td>
                    <td className="border border-gray-300 p-2">Guwahati</td>
                    <td className="border border-gray-300 p-2">Hyderabad</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Jaipur</td>
                    <td className="border border-gray-300 p-2">Kannur</td>
                    <td className="border border-gray-300 p-2">Kolkata</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Lucknow</td>
                    <td className="border border-gray-300 p-2">Madurai</td>
                    <td className="border border-gray-300 p-2">Mangalore</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Mumbai</td>
                    <td className="border border-gray-300 p-2">Nagpur</td>
                    <td className="border border-gray-300 p-2">Port Blair</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Pune</td>
                    <td className="border border-gray-300 p-2">Srinagar</td>
                    <td className="border border-gray-300 p-2">Surat</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Tiruchirapalli
                    </td>
                    <td className="border border-gray-300 p-2">Tirupati</td>
                    <td className="border border-gray-300 p-2">Trivandrum</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Varanasi</td>
                    <td className="border border-gray-300 p-2">Vijayawada</td>
                    <td className="border border-gray-300 p-2">
                      Vishakhapatnam
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <h3 className="mb-4 text-xl font-semibold">
              Designated Seaports for Exit
            </h3>
            <section className="overflow-auto">
              <table className="mb-8 w-full table-auto border-collapse overflow-auto border border-gray-400 text-xs md:text-lg">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">
                      Seaports
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Seaports
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Seaports
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Alang</td>
                    <td className="border border-gray-300 p-2">Bedi Bunder</td>
                    <td className="border border-gray-300 p-2">Bhavnagar</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Calicut</td>
                    <td className="border border-gray-300 p-2">Chennai</td>
                    <td className="border border-gray-300 p-2">Cochin</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Cuddalore</td>
                    <td className="border border-gray-300 p-2">Kakinada</td>
                    <td className="border border-gray-300 p-2">Kandla</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Kolkata</td>
                    <td className="border border-gray-300 p-2">Mandvi</td>
                    <td className="border border-gray-300 p-2">
                      Mormugao Harbour
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Mumbai Seaport
                    </td>
                    <td className="border border-gray-300 p-2">Nagapattinum</td>
                    <td className="border border-gray-300 p-2">Nhava Sheva</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Paradeep</td>
                    <td className="border border-gray-300 p-2">Porbandar</td>
                    <td className="border border-gray-300 p-2">Port Blair</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Tuticorin</td>
                    <td className="border border-gray-300 p-2">
                      Vishakhapatnam
                    </td>
                    <td className="border border-gray-300 p-2">
                      New Mangalore
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Vizhinjam</td>
                    <td className="border border-gray-300 p-2">
                      Agati and Minicoy Island Lakshdweep UT
                    </td>
                    <td className="border border-gray-300 p-2">Vallarpadam</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Mundra</td>
                    <td className="border border-gray-300 p-2">
                      Krishnapatnam
                    </td>
                    <td className="border border-gray-300 p-2">Dhubri</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Pandu</td>
                    <td className="border border-gray-300 p-2">Nagaon</td>
                    <td className="border border-gray-300 p-2">Karimganj</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Kattupalli</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <h3 className="mb-4 text-xl font-semibold">
              Designated Land Checkpoints
            </h3>
            <section className="overflow-auto">
              <table className="mb-8 w-full table-auto border-collapse border border-gray-400 text-xs md:text-lg">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">
                      Land Checkpoints
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Land Checkpoints
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Land Checkpoints
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Attari Road</td>
                    <td className="border border-gray-300 p-2">Akhaura</td>
                    <td className="border border-gray-300 p-2">Banbasa</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Changrabandha
                    </td>
                    <td className="border border-gray-300 p-2">Dalu</td>
                    <td className="border border-gray-300 p-2">Dawki</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Dhalaighat</td>
                    <td className="border border-gray-300 p-2">Gauriphanta</td>
                    <td className="border border-gray-300 p-2">Ghojadanga</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Haridaspur</td>
                    <td className="border border-gray-300 p-2">Hili</td>
                    <td className="border border-gray-300 p-2">Jaigaon</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Jogbani</td>
                    <td className="border border-gray-300 p-2">Kailashahar</td>
                    <td className="border border-gray-300 p-2">Karimgang</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Khowal</td>
                    <td className="border border-gray-300 p-2">Lalgolaghat</td>
                    <td className="border border-gray-300 p-2">Mahadipur</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Mankachar</td>
                    <td className="border border-gray-300 p-2">Moreh</td>
                    <td className="border border-gray-300 p-2">Muhurighat</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Radhikapur</td>
                    <td className="border border-gray-300 p-2">Ragna</td>
                    <td className="border border-gray-300 p-2">Ranigunj</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Raxaul</td>
                    <td className="border border-gray-300 p-2">Rupaidiha</td>
                    <td className="border border-gray-300 p-2">Sabroom</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Sonouli</td>
                    <td className="border border-gray-300 p-2">Srimantapur</td>
                    <td className="border border-gray-300 p-2">Sutarkandi</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Phulbari</td>
                    <td className="border border-gray-300 p-2">Kawarpuchia</td>
                    <td className="border border-gray-300 p-2">Zorinpuri</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Zokhawthar</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <h3 className="mb-4 text-xl font-semibold">
              Designated Rail Checkpoints
            </h3>
            <ul className="mb-4 ml-4 list-inside list-disc">
              <li>Munabao Rail Check Post</li>
              <li>Attari Rail Check Post</li>
              <li>Gede Rail and Road Check Post</li>
              <li>Haridaspur Rail Check Post</li>
              <li>Chitpur Rail Checkpost</li>
            </ul>
            <p className="text-red-600">
              Please note that travelers can only enter and exit from these
              authorized airports & seaports. If you are planning to enter
              through any other seaport or airport that is not on the list then
              you must have a regular visa.
            </p>
          </section>
        </div>
        <div className="mt-5" id="Visa-Prices" ref={visaPricesRef}>
          <h2 className="pb-3 text-3xl font-bold">Visa Prices</h2>
          <section className="overflow-auto">
            <table className="mb-8 w-full table-auto border-collapse border border-gray-400 text-xs md:text-lg">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Countries
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    30 days e- TV(April toJune)
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    30 days e-TV(July toMarch)
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    01 year e-TV
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    05 years e-TV
                  </th>
                </tr>
              </thead>
              <tbody>
                {countriesPriceData.map((ele: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{ele.name}</td>
                    <td className="border border-gray-300 p-2">
                      {ele.eTV_30days_AprToJun}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ele.eTV_30days_JulToMar}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ele.eTV_1year}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ele.eTV_5years}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <div ref={faqSectionRef} id="FAQs"></div>
      </>
    );
  };

  const buttonRefs = useRef({
    Eligibility: null,
    Requirement: null,
    Documents: null,
    Embassy : null,
    EntryPoints: null,
    ExitPoints: null,
    FAQs: null,
    VisaPrices: null,
  });

  useEffect(() => {
    const sections = [
      { name: "Eligibility", ref: eligibilityRef },
      { name: "Requirement", ref: requirementRef },
      { name: "Documents", ref: documentsRef },
      {name : 'Embassy', ref : embassyRef},
      { name: "Entry-Points", ref: entryPointRef },
      { name: "Exit-Points", ref: exitPointRef },
      { name: "Visa-Prices", ref: visaPricesRef },
      { name: "FAQs", ref: faqSectionRef },

    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedTab(entry.target.id);
          }
        });
      },
      { threshold: [0.05]  },
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    const button = buttonRefs.current[selectedTab];
    const container: any = containerRef.current;

    if (button && container) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollLeft =
        container.scrollLeft +
        (buttonRect.left - containerRect.left) -
        containerRect.width / 2 +
        buttonRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  const getButtonClass = (tabName: any) => {
    return `md:text-[2vh] text-xs font-bold ${
      selectedTab === tabName
        ? "text-white px-2 w-full bg-teal-800 whitespace-nowrap h-16 flex items-center justify-center"
        : "w-full text-teal-800 px-3 py-3 flex items-center justify-center whitespace-nowrap text-nowrap border-r-2 border-b-2 hover:text-black border-solid border-gray-300"
    }`;
  };

  return (
    <div className="mt-5 rounded-xl pb-8">
      <h2 className="mb-4 text-xl font-bold">{`Details for ${country.label}:`}</h2>
      <div className="relative rounded-xl border bg-white pb-4 shadow-md">
        <div
          ref={containerRef}
          className="tr-xl sticky top-0 mb-4 flex max-w-full justify-between overflow-auto rounded rounded-tl-xl border-b bg-white lg:pl-0 xl:max-w-full"
        >
          {[
            "Eligibility",
            "Requirement",
            "Documents",
            "Embassy",
            "Entry Points",
            "Exit Points",
            "Visa Prices",
            "FAQs",
          ].map((tabName) => (
            <Link
              key={tabName}
              className={getButtonClass(tabName.split(" ").join("-"))}
              href={`#${tabName.split(" ").join("-")}`}
              onClick={() => setSelectedTab(tabName.split(" ").join("-"))}
              ref={(el) => {
                buttonRefs.current[tabName.split(" ").join("-")] = el;
              }}
              title={`${tabName} link`}
            >
              {tabName}
            </Link>
          ))}
        </div>
        <div className="max-w-full px-5 md:max-w-[50rem] xl:max-w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Details;
