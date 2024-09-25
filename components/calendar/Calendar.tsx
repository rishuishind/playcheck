import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  parse,
  startOfToday,
  startOfMonth,
  isToday,
  differenceInDays,
} from "date-fns";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  setBookingDate: any;
  checkInDate: Date;
  checkOutDate: Date;
  setCheckIn?: any;
  setCheckOut?: any;
  isDateSelected?: boolean;
  showDoneButton?: boolean;
  setIsDateSelected?: any;
  desktopCalendar?: boolean;
  setShowDesktopCalendar?: any;
  spanText: string;
  primaryColor: string;
}

const Calendar: React.FC<CalendarProps> = ({
  setBookingDate,
  checkInDate,
  checkOutDate,
  setCheckIn,
  setCheckOut,
  desktopCalendar,
  showDoneButton,
  setShowDesktopCalendar,
  isDateSelected,
  setIsDateSelected,
  spanText,
  primaryColor,
}) => {
  function utcToIst(utcDate: Date): Date {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(utcDate.getTime() + istOffset);

    // Set the time to 12:00 AM in IST
    istTime.setHours(0, 0, 0, 0);
    return istTime;
  }

  const utcDate = new Date();
  const istDate = utcToIst(utcDate);

  const today: Date = istDate;
  const maxFutureMonth = addMonths(today, 24);
  const initialCheckInDate = isDateSelected ? checkInDate : null;
  const initialCheckOutDate = isDateSelected ? checkOutDate : null;
  const [selectedCheckInDay, setSelectedCheckInDay] = useState<Date | null>(
    initialCheckInDate,
  );
  const [selectedCheckOutDay, setSelectedCheckOutDay] = useState<Date | null>(
    initialCheckOutDate,
  );
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [showPrices, setShowPrices] = useState(false);

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const nextMonth = addMonths(firstDayCurrentMonth, 1);

  const daysCurrentMonth = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const daysNextMonth = eachDayOfInterval({
    start: nextMonth,
    end: endOfMonth(nextMonth),
  });

  const previousMonth = () => {
    const firstDayPrevMonth = addMonths(firstDayCurrentMonth, -1);
    if (firstDayPrevMonth >= startOfMonth(today)) {
      setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
    }
  };

  const nextMonthView = () => {
    const firstDayNextMonth = addMonths(firstDayCurrentMonth, 1);
    if (firstDayNextMonth <= maxFutureMonth) {
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }
  };

  const handleDateSelection = (day: Date) => {
    if (!selectedCheckInDay || (selectedCheckInDay && selectedCheckOutDay)) {
      if (setCheckIn) {
        setCheckIn(day);
        setCheckOut(null);
      }
      setSelectedCheckInDay(day);
      setSelectedCheckOutDay(null);
    } else if (day > selectedCheckInDay) {
      if (setCheckOut) {
        setCheckOut(day);
      }
      setSelectedCheckOutDay(day);
      if (!showDoneButton) {
        collapseCalendar(day);
      }
      if (isDateSelected == false) {
        setIsDateSelected(true);
      }
      setCurrentMonth(format(day, "MMM-yyyy"));
    } else {
      if (setCheckIn) {
        setCheckIn(day);
        setCheckOut(null);
      }
      setSelectedCheckInDay(day);
      setSelectedCheckOutDay(null);
    }
  };

  const isSelectedRange = (day: Date) =>
    selectedCheckInDay &&
    selectedCheckOutDay &&
    day >= selectedCheckInDay &&
    day <= selectedCheckOutDay;

  const isCheckInOrOut = (day: Date) => {
    return (
      (selectedCheckInDay !== null &&
        format(day, "yyyy-MM-dd") ===
          format(selectedCheckInDay, "yyyy-MM-dd")) ||
      (selectedCheckOutDay !== null &&
        format(day, "yyyy-MM-dd") === format(selectedCheckOutDay, "yyyy-MM-dd"))
    );
  };

  function isTodayInIst(day: Date, todayInIst: Date): boolean {
    return (
      day.getFullYear() === todayInIst.getFullYear() &&
      day.getMonth() === todayInIst.getMonth() &&
      day.getDate() === todayInIst.getDate()
    );
  }

  // Adjust the disable logic to compare only date part, not the full time
  const isDateBeforeToday = (day: Date, todayInIst: Date) => {
    return (
      day.getFullYear() < todayInIst.getFullYear() ||
      (day.getFullYear() === todayInIst.getFullYear() &&
        (day.getMonth() < todayInIst.getMonth() ||
          (day.getMonth() === todayInIst.getMonth() &&
            day.getDate() < todayInIst.getDate())))
    );
  };

  const toggleShowPrices = () => {
    setShowPrices((prev) => !prev);
  };

  const resetSelection = () => {
    if (setCheckIn) {
      setCheckIn(null);
      setCheckOut(null);
    }
    setSelectedCheckInDay(null);
    setSelectedCheckOutDay(null);
    if (isDateSelected) {
      setIsDateSelected(false);
    }
  };

  const collapseCalendar = (day?: Date) => {
    if (setShowDesktopCalendar) {
      setShowDesktopCalendar(false);
    }
    if (showDoneButton) {
      if (!selectedCheckInDay || !selectedCheckOutDay) {
        return setBookingDate(today, today);
      }
    }

    return setBookingDate(selectedCheckInDay, day ? day : selectedCheckOutDay);
  };

  useEffect(() => {
    setSelectedCheckInDay(initialCheckInDate);
    setSelectedCheckOutDay(initialCheckOutDate);
    if (initialCheckInDate) {
      setCurrentMonth(format(initialCheckInDate, "MMM-yyyy")); // Set currentMonth to the month of the initial check-in date
    }
  }, [initialCheckInDate, initialCheckOutDate]);

  return (
    <>
      <div className="mx-auto w-fit space-y-3 divide-y-2 p-3">
        <div className="relative mx-auto w-full">
          <div className="relative rounded-lg bg-white p-4">
            {/* buttons */}
            <div className="absolute inset-x-0 flex w-full justify-between px-4">
              <button
                type="button"
                onClick={previousMonth}
                disabled={firstDayCurrentMonth <= startOfMonth(today)}
                className={classNames(
                  "-my-1.5 flex flex-none items-center justify-center p-1.5",
                  firstDayCurrentMonth <= startOfMonth(today)
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-400 hover:text-gray-500",
                )}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonthView}
                type="button"
                disabled={firstDayCurrentMonth >= startOfMonth(maxFutureMonth)}
                className={classNames(
                  "-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5",
                  firstDayCurrentMonth >= startOfMonth(maxFutureMonth)
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-400 hover:text-gray-500",
                )}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Current Month Calendar */}
              <div>
                <h2 className="mb-2 text-center font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <div className="mb-1 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>
                <div className="grid grid-cols-7 text-sm">
                  {daysCurrentMonth.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        `${dayIdx === 0 && colStartClasses[getDay(day)]}`,
                        `${isSelectedRange(day) && "bg-green-100"}`,
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleDateSelection(day)}
                        disabled={isDateBeforeToday(day, today)}
                        style={{
                          backgroundColor: `${
                            isCheckInOrOut(day) ? `#${primaryColor}` : ""
                          }`,
                          color: `${isCheckInOrOut(day) ? `white` : ""}`,
                        }}
                        className={classNames(
                          "relative",
                          `${
                            isDateBeforeToday(day, today) &&
                            "cursor-not-allowed text-gray-400"
                          }`,
                          `${isCheckInOrOut(day) && "text-white"}`,
                          `${isTodayInIst(day, today) && "text-red-700"}`,
                          `${
                            !isCheckInOrOut(day) &&
                            !isSelectedRange(day) &&
                            "hover:bg-gray-200"
                          }`,
                          "mx-auto flex h-11 w-11 items-center justify-center",
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                        {/* {showPrices && (
                                <div
                                  className={classNames(
                                    "absolute bottom-1 mt-1.5 w-full text-center text-xs text-gray-700",
                                    `${isCheckInOrOut(day) && "text-white"}`,
                                  )}
                                >
                                  ₹{Math.floor(Math.random() * 100) + 50}
                                </div>
                              )} */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Month Calendar */}
              <div className="w-fit">
                <h2 className="mb-2 text-center font-semibold text-gray-900">
                  {format(nextMonth, "MMMM yyyy")}
                </h2>
                <div className="mb-1 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>
                <div className="grid grid-cols-7 text-sm">
                  {daysNextMonth.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        `${dayIdx === 0 && colStartClasses[getDay(day)]}`,
                        `${isSelectedRange(day) && "bg-green-100"}`,
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleDateSelection(day)}
                        disabled={isDateBeforeToday(day, today)}
                        style={{
                          backgroundColor: `${
                            isCheckInOrOut(day) ? `#${primaryColor}` : ""
                          }`,
                          color: `${isCheckInOrOut(day) ? `white` : ""}`,
                        }}
                        className={classNames(
                          "relative",
                          `${day < today && "cursor-not-allowed text-gray-400"}`,
                          `${isCheckInOrOut(day) && "text-white"}`,
                          `${isTodayInIst(day, today) && "text-red-700"}`,
                          `${
                            !isCheckInOrOut(day) &&
                            !isSelectedRange(day) &&
                            "hover:bg-gray-200"
                          }`,
                          "mx-auto flex h-11 w-11 items-center justify-center",
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                        {/* {showPrices && (
                                <div
                                  className={classNames(
                                    "absolute bottom-1 mt-1.5 w-full text-center text-xs text-gray-700",
                                    `${isCheckInOrOut(day) && "text-white"}`,
                                  )}
                                >
                                  ₹{Math.floor(Math.random() * 100) + 50}
                                </div>
                              )} */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-3">
          <div className="flex flex-col">
            <span>{spanText}</span>
            <span className="text-gray-600">
              {selectedCheckInDay && selectedCheckOutDay ? (
                <>
                  Best Prices for{" "}
                  {differenceInDays(selectedCheckOutDay, selectedCheckInDay)}{" "}
                  {differenceInDays(selectedCheckOutDay, selectedCheckInDay) > 1
                    ? "nights"
                    : "night"}
                </>
              ) : selectedCheckInDay ? (
                `Best Prices for 1 night stay`
              ) : (
                "0 night stay"
              )}
            </span>
          </div>

          <div className="flex gap-4">
            {/* <button
                type="button"
                onClick={toggleShowPrices}
                style={{ backgroundColor: `#${primaryColor}` }}
                className={`rounded px-4 py-2 font-semibold text-white`}
              >
                {showPrices ? "Hide Prices" : "Show Prices"}
              </button> */}
            <button
              type="button"
              onClick={resetSelection}
              className="rounded bg-gray-200 px-4 font-semibold text-gray-700 hover:bg-gray-300"
            >
              Reset
            </button>
            {showDoneButton && (
              <button
                type="button"
                onClick={() => collapseCalendar()}
                style={{ backgroundColor: `#${primaryColor}` }}
                className="rounded px-4 font-semibold text-white"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
