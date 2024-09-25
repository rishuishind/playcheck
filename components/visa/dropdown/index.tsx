import { useState } from "react";
import Link from "next/link";
import CountrySelect from "./countrySelect";
import Calender from "../calender";

const Dropdown = () => {
  const [country, setSelectedCountry]: any = useState(null);
  const [month, setMonth]: any = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  const onChange = (selectedOption: any) => {
    if (selectedOption !== null) {
      setSelectedCountry(selectedOption);
    } else {
      setSelectedCountry(null);
    }
    validateForm(selectedOption, month);
  };

  const handleMonthChange = (e: any) => {
    setMonth(e);
    setShowCalender(false);
    validateForm(country, e);
  };

  const handleYearChange = (e: number) => {
    setYear(e);
  };

  const validateForm = (selectedCountry: any, visitDate: any) => {
    setIsFormValid(selectedCountry && visitDate);
  };

  return (
    <form className="wrapper mb-5 flex w-full flex-col items-center justify-around gap-4 rounded-lg bg-gradient-to-br from-teal-200 to-secondary px-5 py-4 shadow-xl md:top-[27vh] md:ml-0 md:mr-10 md:flex-row lg:absolute lg:top-[32vh] lg:max-w-[50rem]">
      <div className="z-20 w-full whitespace-nowrap rounded-md">
        <CountrySelect
          onChange={onChange}
          country={country}
          height={"3rem"}
          required
        />
      </div>

      <div className="z-10 flex h-[3rem] w-full flex-col items-baseline rounded-md text-white">
        <div
          className="w-full cursor-pointer rounded-md bg-white px-3 py-3 text-black"
          onClick={() => setShowCalender(true)}
        >
          {month && year ? `Visiting on ${month} ${year}` : "Select Date..."}
        </div>
        {showCalender && (
          <Calender
            year={year}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />
        )}
      </div>
      <Link
        className="w-full lg:max-w-[20%]"
        href={
          isFormValid
            ? {
                pathname: `/indian-e-visa/indian-e-visa-eligibility-for-${country?.link}-citizens`,
                query: { month, year },
              }
            : "#"
        }
        as={
          isFormValid
            ? `/indian-e-visa/indian-e-visa-eligibility-for-${country?.link}-citizens`
            : "#"
        }
      >
        <button
          type="button"
          className={`h-[3rem] w-full overflow-hidden rounded-md px-8 text-black hover:bg-teal-800 hover:text-white  ${isFormValid ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-300"}`}
          disabled={!isFormValid}
        >
          Search
        </button>
      </Link>
    </form>
  );
};

export default Dropdown;
