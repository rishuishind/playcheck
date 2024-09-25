import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarProps {
  year: number;
  handleMonthChange: (month: string) => void;
  handleYearChange: (year: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  handleMonthChange,
  handleYearChange,
}) => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth(); // 0-based index (0 = January, 1 = February, ..., 11 = December)

  const handleYearIncrement = () => {
    if (year < currYear + 3) {
      handleYearChange(year + 1);
    }
  };

  const handleYearDecrement = () => {
    if (year > currYear) {
      handleYearChange(year - 1);
    }
  };

  const filteredMonths = year === currYear ? months.slice(currMonth) : months;

  return (
    <div className="relative mt-2 w-full rounded-lg bg-white">
      <div className="absolute w-full">
        <div className="flex flex-row items-center justify-center gap-3 rounded-tl-lg rounded-tr-lg border-b-2 bg-white py-2">
          <ChevronLeftIcon
            color="black"
            className="h-8 w-8 cursor-pointer"
            onClick={handleYearDecrement}
          />
          <p className="text-center text-black">{year}</p>
          <ChevronRightIcon
            color="black"
            className="h-8 w-8 cursor-pointer"
            onClick={handleYearIncrement}
          />
        </div>
        <div className="max-h-28 w-full overflow-auto rounded-bl-lg rounded-br-lg bg-white">
          {filteredMonths.map((ele: string, index: number) => (
            <h3
              key={index}
              onClick={() => handleMonthChange(ele)}
              className="cursor-pointer pl-2 text-black hover:bg-teal-800 hover:text-white"
            >
              {ele}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
