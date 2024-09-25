import { useEffect, useState } from "react";
import CountrySelect from "../dropdown/countrySelect";
import { toast } from "sonner";
const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
})
import 'react-phone-input-2/lib/style.css'
import Calender from "../calender";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

interface FormProps {
  date: string;
  isOpen: boolean;
  selectedCountry: any;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({
  date,
  isOpen,
  onClose,
  selectedCountry,
}) => {
  const router = useRouter();
  const [country, setCountry]: any = useState(null);
  const [name, setName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [passportNo, setPassportNo] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [visaType, setVisaType] = useState<string>("30 days");
  const [showCalender, setShowCalender] = useState(false);
  const [year, setYear]: any = useState(new Date().getFullYear());
  const [month, setMonth]: any = useState(null);
  const [buttonContent, setButtonContent]: any = useState("Let us call you");

  useEffect(() => {
    if (router.query.month && router.query.year) {
      setMonth(router.query.month);
      setYear(router.query.year);
    }
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, []);

  const handleCountryChange = (country: any) => {
    setCountry(country);
  };

  const handleMonthChange = (e: any) => {
    setMonth(e);
    setShowCalender(false);
  };

  const handleYearChange = (e: number) => {
    setYear(e);
  };

  const resetState = () => {
    setCountry(null);
    setName(null);
    setMonth(null);
    setUserEmail(null);
    setPassportNo(null);
    setContactNumber(null);
    setVisaType("30 days");
  };

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonContent("Submitting...");
    const obj = {
      country: country?.value,
      name,
      dateOfVisit: `${month} ${year}`,
      userEmail,
      passportNo,
      contactNumber,
      visaType,
    };
    try {
      const response = await fetch("/api/visa/visaFormSubmission", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.statusText === "OK") {
        toast.success("Form Submitted Successfully. We will get back to you.", {
          style: {
            backgroundColor: "#1f5251",
            color: "white",
          },
        });
        setButtonContent("Submitted");
      }
    } catch (error) {
      setButtonContent("Error");
      console.error("Error submitting form:", error);
      toast.error("Error Submitting Form, please try again later", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } finally {
      onClose();
      setButtonContent("Let us call you");
      resetState();
    }
  };

  return (
    <section
      id="contact"
      className={`${isOpen ? " jusitfy-center mt-20 mx-2 flex w-full items-center md:max-w-lg" : ""} `}
    >
      <div className="container sticky top-2 mb-10 w-full">
        {isOpen && (
          <button
            className="absolute right-4 top-2 text-3xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        <div
          className={`w-full rounded-xl min-w-[43vh] border-2 border-solid border-secondary bg-gradient-to-br from-teal-200 to-secondary p-3 shadow-md`}
        >
          <h3 className="text-black-400 mb-1 py-2 text-center text-3xl">
            Contact Us
          </h3>
          <form
            id="contactHtmlForm"
            onSubmit={handleFormSubmission}
            className="grid gap-2"
          >
            <div className="mb-2 sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                required
                type="text"
                id="fullName"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                name="fullName"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-2 sm:col-span-2">
              <label
                htmlFor="email"
                className="block font-semibold text-gray-700"
              >
                Email Id
              </label>
              <input
                required
                type="email"
                value={userEmail ?? ""}
                onChange={(event) => setUserEmail(event.target.value)}
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-2 sm:col-span-2">
              <label
                htmlFor="passportNo"
                className="block font-semibold text-gray-700"
              >
                Passport No
              </label>
              <input
                required
                type="text"
                value={passportNo ?? ""}
                onChange={(event) => setPassportNo(event.target.value)}
                id="passportNo"
                name="passportNo"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="z-20 mb-2 sm:col-span-2">
              <label
                htmlFor="nationality"
                className="block font-semibold text-gray-700"
              >
                Nationality
              </label>
              <CountrySelect
                onChange={handleCountryChange}
                country={country}
                height={"5vh"}
              />
            </div>
            <div className="mb-2 sm:col-span-2">
              <label
                htmlFor="contactNo"
                className="block font-semibold text-gray-700"
              >
                Contact No
              </label>
              <PhoneInput
                countryCodeEditable={!country}
                country={// selectedCountry?.code.toString().toLowerCase() ||
                country?.code.toString().toLowerCase()}
                value={contactNumber || ""}
                onChange={(value: any) => setContactNumber(value)}
                containerStyle={{
                  width: "100%",
                  borderRadius: "0.375rem",
                  borderColor: "rgb(209 213 219)",
                }}
                inputStyle={{
                  width: "100%",
                  padding: "1.2rem 2rem 1.2rem 3rem",
                }}
                // className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex flex-row gap-3 sm:col-span-2">
              <div className="flex w-full flex-col items-baseline rounded-md text-white">
                <label
                  htmlFor="month"
                  className="block font-semibold text-gray-700"
                >
                  Month
                </label>
                <div
                  className="w-full cursor-pointer whitespace-nowrap rounded-md bg-white px-3 py-[9px] text-black"
                  onClick={() => setShowCalender(true)}
                >
                  {month && year ? `${month} ${year}` : "Select Date..."}
                </div>
                {showCalender && (
                  <Calender
                    year={year}
                    handleMonthChange={handleMonthChange}
                    handleYearChange={handleYearChange}
                  />
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="visa-type"
                  className="block font-semibold text-gray-700"
                >
                  Visa Type
                </label>
                <select
                  onChange={(event: any) => setVisaType(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="30 days">30 Days</option>
                  <option value="1 year">1 Year</option>
                  <option value="5 years">5 Years</option>
                </select>
              </div>
            </div>
            {/* <div className="mb-2 sm:col-span-2">
              <label
                htmlFor="nationality"
                className="block font-semibold text-gray-700"
              >
                Select Duration
              </label>
              <div className="flex flex-row justify-between">
                {radioButtonData.map((ele, index) => (
                  <RadioButtons
                    key={index}
                    onChange={handleRadioChange}
                    id={ele.id}
                    value={ele.value}
                    label={ele.label}
                    name={"radiobutton"}
                    duration={duration}
                  />
                ))}
              </div>
            </div> */}
            <div className="flex justify-center sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md px-4 py-2 font-semibold text-black transition duration-300 hover:bg-green-600"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(249, 225, 190, 1) 0%, rgba(232, 166, 70, 1) 100%)",
                }}
              >
                {buttonContent}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
