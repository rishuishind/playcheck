import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { countriesData } from "@/lib/helper/countriesData";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingModel from "@/components/models/LoadingModel";

const Index = () => {
  const router: any = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry]: any = useState([]);

  const breadcrumb = router.asPath
    .split("/")
    .filter((link: string) => link !== "");
  breadcrumb.unshift("home");

  useEffect(() => {
    if (router.query.blog) {
      let parts = router.query.blog.split("-");
      const index = parts.indexOf("for");
      const countryData = parts.slice(index + 1).join("-");
      const country = countriesData.filter(
        (country: any) => country.link === countryData,
      );
      if (country.length > 0) {
        setCountry(country[0]);
      }
      setIsLoading(false);
    }
  }, [router.query]);
  useEffect(() => {
    if (!isLoading && country?.length === 0) {
      router.push("/404");
    }
  }, [isLoading, country, router]);

  if (isLoading || country.length === 0) {
    return (
      <div className="z-50 h-[100vh]">
        <LoadingModel isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    );
  }
  return (
    <>
      {country && (
        <>
          <Navbar />
          <section>
            <div className="w-full">
              <Image
                src="https://i.ibb.co/sqVR1MK/Rectangle-2025-1.webp"
                alt="visa-country"
                className="h-[10rem] w-full md:h-[20.2rem]"
                priority
                height={1920}
                width={900}
              />
            </div>
            <div className="wrapper">
              {/* first section with image */}
              <div className="flex lg:flex-row">
                <div className="mt-10">
                  <h1 className="text-3xl font-bold">
                    Indian eVisa for {country.label} Citizen
                  </h1>
                  <p className="mt-2">
                    India, a land celebrated for its rich history, diverse
                    cultures, and breathtaking natural beauty, has always
                    captivated travellers from around the world, including those
                    from the {country.label}. With its myriad attractions,
                    it&apos;s no wonder that this subcontinent holds a special
                    place in the hearts of global wanderers. If you&apos;re a{" "}
                    {country.label} citizen planning an exciting trip to India,
                    securing your Indian e-visa is a crucial step in your
                    journey.
                  </p>
                  <p className="mt-5">
                    This article provides a detailed guide on obtaining an
                    Indian e-visa, along with essential information to ensure a
                    smooth trip for {country.label} citizens.
                  </p>
                  <p className="mt-5">
                    The Indian Immigration system allows travellers to apply for
                    an Indian Visa online for various purposes. For instance, if
                    your trip to India is for commercial or business reasons,
                    you can apply for an Indian Business Visa Online. If you
                    need to visit India for medical reasons, such as consulting
                    a doctor, undergoing surgery, or other health-related
                    issues, the Indian Medical Visa Online is available to meet
                    your needs. For those traveling to India for tourism,
                    meeting friends or relatives, attending courses like yoga,
                    or sightseeing, the Indian Tourist Visa Online (eVisa India
                    for Tourist) is the appropriate option.
                  </p>
                </div>
                <div
                  className="object-fit mt-5 hidden w-[150rem] bg-gray-300 bg-center lg:block"
                  style={{
                    backgroundImage:
                      "url('https://i.ibb.co/4M7D1QB/aditya-siva-6r-Dbv-Xz-IVp-Q-unsplash-1.webp')",
                  }}
                ></div>
              </div>

              {/* second section? */}
              <div>
                <h2 className="mt-10 text-3xl font-bold">
                  Eligibility Criteria for Indian E-visa for the {country.label}{" "}
                  Citizens
                </h2>
                <p className="mt-2">
                  For{country.label} citizens planning to visit India, the great
                  news is that you can apply for an e-visa right from the
                  comfort of your home. Unlike traditional visas, this process
                  eliminates the need to stand in long queues or visit
                  government offices or embassies, which can be time-consuming
                  and stressful. However, certain eligibility criteria must be
                  met before applying. These include:
                </p>
                <p className="mt-2">
                  - A passport that is valid for at least six months beyond your
                  planned departure date from India.
                </p>
                <p className="mt-2">
                  - A valid email address to receive your visa confirmation.
                </p>
                <p className="mt-2">
                  - A recent digital passport-sized photograph.
                </p>
                <p className="mt-2">
                  - Proof of your visit, such as a hotel booking or an
                  invitation letter.
                </p>
                <p className="mt-2">
                  - A valid credit or debit card to pay the Indian e-visa fee
                  online.
                </p>
                <p className="mt-2">
                  <strong>Note: </strong>Age and health factors may also be
                  relevant. It is advisable to confirm all necessary details
                  before submitting your application. Additionally, carefully
                  review all conditions and guidelines provided by Indian
                  authorities. Failure to meet the eligibility requirements may
                  result in delays or the refusal of your visa application, so
                  ensure you check these details in advance.
                </p>
              </div>

              {/* Third section */}
              <div className="mt-10">
                <h2 className="text-3xl">Convenience of Online Application</h2>
                <p className="mt-2">
                  <strong>Process: </strong>· Process: The Indian eVisa can be
                  applied for online, eliminating the need to visit an embassy
                  or consulate. This online process is straightforward and can
                  be completed from the comfort of your home.
                </p>
                <p className="mt-2">
                  <strong>Advantages: </strong>Saves time and effort, avoiding
                  long queues and multiple trips to government offices.
                </p>
                <p className="mt-2">
                  <strong>Validity and Duration</strong>
                </p>
                <p className="mt-2">
                  <strong>Validity:</strong> The eVisa is typically valid for
                  one year from the date of issue.
                </p>
                <p className="mt-2">
                  <strong>Duration of Stay</strong>Each stay must not exceed 90
                  days for tourist visas. Business and medical visas may have
                  different conditions.
                </p>
              </div>

              {/* fourth section */}
              <div>
                <h2 className="mt-10 text-2xl font-bold">
                  Passport validity requirements
                </h2>
                <p className="mt-2">
                  Ensure your passport is valid for at least six months from
                  your date of entry into India. Additionally, your passport
                  must have two blank pages for the visa stamp.
                </p>
                <p className="mt-2">
                  Verify with your travel provider that your passport and other
                  travel documents meet the necessary requirements. Renew your
                  passport if needed. You will be denied entry if you do not
                  have a valid travel document or if you attempt to use a
                  passport that has been reported lost or stolen.
                </p>
              </div>

              {/* img */}
              <div
                className="object-fit mt-5 h-[30rem] bg-gray-300 bg-center lg:block"
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co/sqVR1MK/Rectangle-2025-1.webp')",
                }}
              ></div>

              {/* fifth section */}
              <div className="mt-10">
                <h2 className="mt-10 text-2xl font-bold">
                  Entry and Exit Points
                </h2>
                <p className="mt-2">
                  <strong>Air and Sea Entry: </strong>The eVisa is valid for
                  entry through 28 designated airports and 5 seaports.
                </p>
                <p className="mt-2">
                  <strong>Multiple Exit Options:</strong> Travelers can exit
                  India via air, sea, land, or rail.
                </p>
                <p className="mt-2">
                  <strong>Note: </strong>For detail enquiry for entry & exit
                  point, please check the Country page.
                </p>
              </div>

              {/* sixth section */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold">Application Process</h2>
                <p className="mt-2">
                  <strong>Step 1: </strong>Visit the official Indian eVisa
                  website.
                </p>
                <p className="mt-2">
                  <strong>Step 2: </strong>Select the type of eVisa you need
                  (tourist, business, or medical).
                </p>
                <p className="mt-2">
                  <strong>Step 3: </strong>Complete the online application form
                  with accurate personal, travel, and passport details.
                </p>
                <p className="mt-2">
                  <strong>Step 4: </strong>Upload the required documents,
                  including a digital photograph and a scanned copy of the
                  passport’s biographical page.
                </p>
                <p className="mt-2">
                  <strong>Step 5: </strong>Pay the eVisa fee using a valid
                  credit or debit card.
                </p>
                <p className="mt-2">
                  <strong>Step 6: </strong>Submit the application and wait for
                  the eVisa to be sent to your email, typically within 72 hours.
                </p>
              </div>

              {/* seventh section */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold">Carrying the eVisa</h2>
                <p className="mt-2">
                  <strong>Print or Digital Copy: </strong>You must carry a
                  printed copy or a digital copy of the eVisa on your phone,
                  computer, or tablet.
                </p>
                <p className="mt-2">
                  <strong>Presentation at Immigration: </strong>Show the eVisa
                  to the immigration officers upon arrival in India.
                </p>
              </div>

              {/* eigth section */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold">Staying Updated</h2>
                <p className="mt-2">
                  <strong>Periodic Revisions: </strong>Authorized entry and exit
                  points undergo periodic revisions, so it&apos;s crucial to
                  stay updated on the latest information.
                </p>
                <p className="mt-2">
                  <strong>Check Official Sources: </strong>Regularly check the
                  official Indian eVisa website for any updates or changes to
                  the entry and exit points or application requirements.
                </p>
              </div>

              {/* ninth section      */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold">Important Tips</h2>
                <p className="mt-2">
                  <strong>Accuracy: </strong>Ensure all information entered in
                  the application form matches your passport details.
                </p>
                <p className="mt-2">
                  <strong>Preparation: </strong>Have all necessary documents and
                  payment methods ready before starting the application.
                </p>
                <p className="mt-2">
                  <strong>Review Guidelines: </strong>Thoroughly review all
                  conditions and guidelines provided by Indian authorities to
                  avoid any delays or refusals.
                </p>
              </div>

              <p className="mb-10 mt-10">
                <strong>Note: </strong>By following these points,{" "}
                {country.label} citizens can smoothly navigate the process of
                obtaining an Indian eVisa and enjoy a hassle-free trip to India.
              </p>
              <div className="wrapper my-0 flex overflow-auto py-0">
                {breadcrumb.map((link: string, index: number) => (
                  <div key={link} className="whitespace-nowrap font-medium">
                    <Link
                      href={
                        link === "home"
                          ? "/"
                          : `/${breadcrumb.slice(1, index + 1).join("/")}`
                      }
                      className=" text-sm text-blue-500 hover:text-primary"
                    >
                      {link}
                    </Link>
                    {index < breadcrumb.length - 1 && <span> &gt;</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Index;
