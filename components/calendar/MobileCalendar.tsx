import { XIcon } from "@heroicons/react/solid";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  startOfToday,
  startOfMonth,
  isToday,
  differenceInDays,
  differenceInMonths,
} from "date-fns";
import { useEffect, useState, useRef } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  setBookingDate: any;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckIn?: any;
  setCheckOut?: any;
  isDateSelected?: boolean;
  setIsDateSelected?: any;
  showDoneButton?: boolean;
  mobileCalendar: boolean;
  setMobileCalendar: any;
  spanText: string;
  primaryColor: string;
}

const MobileCalendar: React.FC<CalendarProps> = ({
  setBookingDate,
  checkInDate,
  checkOutDate,
  mobileCalendar,
  setCheckIn,
  setCheckOut,
  isDateSelected,
  setIsDateSelected,
  showDoneButton,
  setMobileCalendar,
  spanText,
  primaryColor,
}) => {
  const today: Date = startOfToday();
  const maxFutureMonth = addMonths(today, 24);
  const initialCheckInDate = isDateSelected ? checkInDate : null;
  const initialCheckOutDate = isDateSelected ? checkOutDate : null;
  const [selectedCheckInDay, setSelectedCheckInDay] = useState<Date | null>(
    initialCheckInDate,
  );
  const [selectedCheckOutDay, setSelectedCheckOutDay] = useState<Date | null>(
    initialCheckOutDate,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const isCheckInOrOut = (day: Date) =>
    (selectedCheckInDay !== null &&
      format(day, "yyyy-MM-dd") === format(selectedCheckInDay, "yyyy-MM-dd")) ||
    (selectedCheckOutDay !== null &&
      format(day, "yyyy-MM-dd") === format(selectedCheckOutDay, "yyyy-MM-dd"));

  const resetSelection = () => {
    setSelectedCheckInDay(null);
    setSelectedCheckOutDay(null);
    if (isDateSelected == true) {
      setIsDateSelected(false);
    }
  };

  const collapseCalendar = (day?: Date) => {
    setMobileCalendar(false);
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

    if (scrollContainerRef.current && (selectedCheckInDay || selectedCheckOutDay)) {
      const selectedDate = selectedCheckInDay || selectedCheckOutDay;
      if (selectedDate) {
        const monthOffset = differenceInMonths(selectedDate, today);
        const scrollPosition = monthOffset * 288;
        scrollContainerRef.current.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [initialCheckInDate, initialCheckOutDate]);

  const generateMonths = () => {
    const months: any = [];
    let month = startOfMonth(today);
    while (month <= maxFutureMonth) {
      months.push(month);
      month = addMonths(month, 1);
    }
    return months;
  };

  const months = generateMonths();

  return (
    <div className="fixed inset-0 z-50 h-full w-full bg-slate-200 lg:hidden">
      <div
        onClick={() => {
          setMobileCalendar(false);
        }}
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-secondary px-4 text-xl font-medium"
      >
        <p className="text-light">Select Dates</p>
        <XIcon className="h-6 w-6 fill-light" />
      </div>

      <div className="relative mx-auto mt-16 h-full w-fit">
        <div className="mx-auto py-2">
          <div className="relative mx-auto w-full rounded-lg bg-white p-2 py-2.5">
            <div
              ref={scrollContainerRef}
              className="h-auto max-h-[618px] space-y-4 overflow-x-hidden overflow-y-scroll"
            >
              {months.map((month, index) => {
                const days = eachDayOfInterval({
                  start: month,
                  end: endOfMonth(month),
                });

                return (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex-auto">
                        <h2 className="flex justify-center text-center font-semibold text-gray-900">
                          {format(month, "MMMM yyyy")}
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 py-1 text-center text-xs text-gray-500">
                      <div>Su</div>
                      <div>Mo</div>
                      <div>Tu</div>
                      <div>We</div>
                      <div>Th</div>
                      <div>Fr</div>
                      <div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 text-sm">
                      {days.map((day, dayIdx) => (
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
                            disabled={day < today}
                            style={{
                              backgroundColor: `${isCheckInOrOut(day) ? `#${primaryColor}` : ""}`,
                              color: `${isCheckInOrOut(day) ? `white` : ""}`,
                            }}
                            className={classNames(
                              "relative",
                              `${day < today && "cursor-not-allowed text-gray-400"}`,
                              `${isCheckInOrOut(day) && "text-white"}`,
                              `${isToday(day) && "text-red-700"}`,
                              `${!isCheckInOrOut(day) && !isSelectedRange(day) && "hover:bg-gray-200"}`,
                              "mx-auto flex h-12 w-12 items-center justify-center",
                            )}
                          >
                            <time dateTime={format(day, "yyyy-MM-dd")}>
                              {format(day, "d")}
                            </time>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-50 h-20 bg-white p-4">
          <div className="flex h-full w-full justify-between">
            <div className="flex flex-col text-sm">
              <p>{spanText}</p>
              <p className="text-gray-600">
                {selectedCheckInDay && selectedCheckOutDay ? (
                  <>
                    {differenceInDays(selectedCheckOutDay, selectedCheckInDay)}{" "}
                    {differenceInDays(selectedCheckOutDay, selectedCheckInDay) >
                    1
                      ? "nights"
                      : "night"}{" "}
                    stay
                  </>
                ) : (
                  "0 nights stay"
                )}
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={resetSelection}
                className="rounded bg-secondary px-5 font-semibold text-white hover:bg-secondary/80"
              >
                Reset
              </button>
              {showDoneButton && (
                <button
                  type="button"
                  onClick={() => collapseCalendar()}
                  style={{ backgroundColor: `#${primaryColor}` }}
                  className="rounded px-4 py-2 font-semibold text-white"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCalendar;

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
