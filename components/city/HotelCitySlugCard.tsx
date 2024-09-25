import { CityHotelcardInfo } from "@/lib/classModels/city/hotelCardInfo";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import {
  routerToAllRoomsPage,
  routerToRoomDetailPage,
} from "@/lib/handlers/pageHandler";
import {
  convertChildArrayToString,
  convertChildArrayOfNumbersIntoUrlQuery,
  convertChildStringToArray,
  // convertChildStringToArray,
  getDateDifference,
  convertChildUrlQueryIntoArrayOfObjects,
  convertChildArrayOfObjectsIntoArrayOfNumbers,
} from "@/lib/helper";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
} from "@/lib/redux/bookingSlice";
import { StarIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  hotelData: CityHotelcardInfo;
  showLivePrice: boolean;
};

export default function HotelCitySlugCard({ hotelData, showLivePrice }: Props) {
  const router = useRouter();
  const percentage: number = 30;

  const [showCancellationPolicy, setShowCancellationPolicy] =
    useState<boolean>(false);

  // If either checkin or checkout date is present inside query then we will set isDateSelected to true
  const [isDateSelected, setIsDateSelected] = useState<boolean>(
    !!router.query.checkin || !!router.query.checkout,
  );
  // If the query changes then we will update the isDateSelected state
  useEffect(() => {
    setIsDateSelected(!!router.query.checkin || !!router.query.checkout);
  }, [router.query.checkin, router.query.checkout]);

  const stringToDate = (dateString: any) => {
    if (!dateString) return false;
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const calculateTotalPrice = (price: number) => {
    // Convert inputs to numbers
    const numericPrice = Number(price);
    const percentage = numericPrice > 7500 ? 0.18 : 0.12;

    // Calculate the total price
    const totalPrice = numericPrice + numericPrice * percentage;

    // Return the ceiling of the total price
    return Math.ceil(totalPrice);
  };

  const calculateTax = (numericAmount: number) => {
    const lowTaxRate = 0.12;
    const highTaxRate = 0.18;

    const tax =
      numericAmount <= 7500
        ? numericAmount * lowTaxRate
        : numericAmount * highTaxRate;

    return Math.ceil(tax);
  };

  const checkIn = useSelector(selectCheckInDate);
  const checkOut = useSelector(selectCheckOutDate);
  const searchedGuests = useSelector(selectSearchedGuestsCount);
  const searchedAdults = useSelector(selectSearchedAdultsCount);
  const searchedChild = useSelector(selectSearchedChildrenCount);
  const searchedRooms = useSelector(selectSearchedRoomsCount);

  const checkInDate =
    (router.query.checkin && stringToDate(router.query.checkin)) || checkIn;
  const checkOutDate =
    (router.query.checkout && stringToDate(router.query.checkout)) || checkOut;
  const searchGuests =
    (router.query.num_guests && Number(router.query.num_guests)) ||
    searchedGuests;
  const searchAdults =
    (router.query.num_adults && Number(router.query.num_adults)) ||
    searchedAdults;
  const searchChildrenCount =
    (router.query.num_children && Number(router.query.num_children)) ||
    searchedChild;
  const searchRoomsCount =
    (router.query.num_rooms && Number(router.query.num_rooms)) || searchedRooms;
  const numOfNights = getDateDifference(checkInDate, checkOutDate);

  // extract childAges from the router query
  const [child_age, setChild_age] = useState<any[]>(
    router.query?.child_age != ""
      ? convertChildUrlQueryIntoArrayOfObjects((router.query?.child_age as any[]))
      : [],
  );

  useEffect(() => {
    setChild_age(
      convertChildUrlQueryIntoArrayOfObjects((router.query?.child_age as any[])),
    );
  }, [router.query]);

  const handlePageRedirect = async () => {
    if (isDateSelected) {
      const pageRouter = new PageRouterQueryParams(router);
      pageRouter.hotelSlugName = hotelData.hotel_Slug_Name;
      pageRouter.checkin = checkInDate;
      pageRouter.checkout = checkOutDate;
      pageRouter.num_nights = numOfNights;
      pageRouter.num_rooms = searchRoomsCount;
      pageRouter.num_adults = searchAdults;
      pageRouter.num_children = searchChildrenCount;
      pageRouter.num_guests = searchedAdults + searchedChild;
      pageRouter.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

      pageRouter.new_tab = true;
      pageRouter.push = false;
      await routerToAllRoomsPage(pageRouter);
    } else {
      window.open(`/hotels/${hotelData.hotel_Slug_Name}`);
    }
  };

  const [soldOutModel, setSoldOutModel] = useState<boolean>(false);
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  useEffect(() => {
    if (
      showLivePrice &&
      hotelData.hotel_Starting_Price_Obj.plan_Base_Price === 0
    ) {
      setIsSoldOut(true);
    }
  }, [hotelData?.hotel_Starting_Price_Obj?.plan_Base_Price]);

  const hotelSatrs = [...Array(hotelData.hotel_Star_Rating)].map(
    (_, index: number) => (
      <StarIcon
        className={`h-4 w-4 ${isSoldOut ? "fill-gray-400" : "fill-secondary"}`}
        key={index}
      />
    ),
  );

  // get the desired formatted child ages string with key and value
  // ex [0_2, 1_4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(child_age);

  return (
    <>
      {soldOutModel && (
        <div
          onClick={() => setSoldOutModel(!soldOutModel)}
          className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800">
              Hotel is Sold Out
            </h3>
            <p className="mt-4 text-gray-600">
              We apologize for the inconvenience, but the selected hotel is
              currently sold out. Please try selecting other dates.
            </p>
            <button
              onClick={() => setSoldOutModel(!soldOutModel)}
              className="mt-4 rounded-md bg-primary px-7 py-2 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        className={`relative cursor-pointer rounded-xl border-2 p-3 ${!showLivePrice && "my-4"}`}
      >
        {!isSoldOut && (
          <div
            className="absolute -left-[5px] -top-[5px] z-10 h-24 w-24 overflow-hidden
                   before:absolute before:right-0 before:top-0 before:-z-10 before:border-[3px] before:border-secondary/50 
                   after:absolute after:bottom-0 after:left-0 after:-z-10 after:border-[3px] after:border-secondary/50"
          >
            <div className="absolute -left-[42px] top-6 w-[160px] -rotate-45 bg-secondary p-1 text-center text-sm font-bold text-light shadow-md">
              {percentage}% off
            </div>
          </div>
        )}

        {isSoldOut ? (
          <div
            onClick={() => setSoldOutModel(!soldOutModel)}
            className="relative block cursor-not-allowed"
            title="This hotel is sold out"
          >
            <div className="flex flex-col gap-2 lg:flex-row">
              {/* left side */}
              <div className="flex w-full items-stretch gap-2.5">
                <div
                  className={`relative aspect-[4/3] w-[40%] max-w-[180px] overflow-hidden rounded-md bg-secondary before:absolute before:inset-0 before:bg-black/50`}
                >
                  <Image
                    alt={"Hotel main image"}
                    title={"Hotel main image"}
                    className={"h-full w-full object-cover"}
                    src={hotelData.hotel_Image_Url}
                    width={320}
                    height={180}
                    priority={true}
                  />
                </div>

                <div className="flex w-[60%] flex-col gap-2 sm:w-full">
                  <div>
                    <h2
                      className={`line-clamp-2 font-bold leading-tight tracking-wide text-gray-400 lg:text-lg`}
                    >
                      {hotelData.hotel_Name}
                    </h2>
                    <p
                      className={`line-clamp-2 text-xs font-medium text-gray-400`}
                    >
                      {hotelData.hotel_Landmark}
                    </p>
                    <p className="flex py-0.5">{hotelSatrs}</p>
                  </div>
                  <div>
                    <div className="relative flex items-center gap-1.5">
                      <Image
                        alt={"google icon"}
                        title={"google icon"}
                        src={"/googleGrayIcon.svg"}
                        width={16}
                        height={16}
                      />
                      <strong className={`text-sm text-gray-400`}>
                        {hotelData.hotel_Google_Rating} / 5
                      </strong>
                    </div>
                    <p
                      className={`text-sm font-medium tracking-wider text-gray-400`}
                    >
                      {hotelData.hotel_Ratings_Count} Ratings
                    </p>
                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="flex min-w-fit items-end justify-end">
                <div className="text-right">
                  <strong>Sold Out</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 lg:flex-row">
            {/* left side */}
            <div
              onClick={
                isSoldOut
                  ? () => setSoldOutModel(!soldOutModel)
                  : (e) => {
                      // Prevent handlePageRedirect if the click was on the Link (hotel name)
                      if ((e.target as HTMLElement).tagName !== "A") {
                        handlePageRedirect();
                      }
                    }
              }
              className="flex w-full items-stretch gap-2.5"
            >
              <div
                className={`relative aspect-[4/3] w-[40%] max-w-[180px] overflow-hidden rounded-md bg-secondary ${isSoldOut && "before:absolute before:inset-0 before:bg-black/50"}`}
              >
                <Image
                  alt={"Hotel main image"}
                  title={"Hotel main image"}
                  className={"h-full w-full object-cover"}
                  src={hotelData.hotel_Image_Url}
                  width={320}
                  height={180}
                />
              </div>

              <div className="flex w-[60%] flex-col gap-2 sm:w-full">
                <div>
                  <Link
                    href={
                      isDateSelected
                        ? `/hotels/${String(hotelData.hotel_Slug_Name)}/rooms?checkin=${String(moment(checkInDate).format("DD-MM-YYYY"))}&checkout=${String(moment(checkOutDate).format("DD-MM-YYYY"))}&num_nights=${String(numOfNights)}&num_guests=${String(searchedAdults + searchedChild)}&num_adults=${String(searchAdults)}&num_rooms=${String(searchRoomsCount)}&num_children=${String(searchChildrenCount)}&${childAgeQuery}`
                        : `/hotels/${hotelData.hotel_Slug_Name}`
                    }
                    target="_blank"
                    className={`relative block hover:underline ${isSoldOut ? "decoration-gray-400" : "decoration-secondary"}`}
                    onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling up
                  >
                    <h2
                      className={`line-clamp-2 font-bold leading-tight tracking-wide lg:text-lg ${isSoldOut ? "text-gray-400" : "text-secondary"}`}
                    >
                      {hotelData.hotel_Name}
                    </h2>
                  </Link>
                  <p
                    className={`line-clamp-2 text-xs font-medium ${isSoldOut && "text-gray-400"}`}
                  >
                    {hotelData.hotel_Landmark}
                  </p>
                  <p className="flex py-0.5">{hotelSatrs}</p>
                </div>
                <div>
                  <div className="relative flex items-center gap-1.5">
                    <Image
                      alt={"google icon"}
                      title={"google icon"}
                      src={
                        isSoldOut ? "/googleGrayIcon.svg" : "/googleIcon.svg"
                      }
                      width={16}
                      height={16}
                    />
                    <strong
                      className={`text-sm ${isSoldOut && "text-gray-400"}`}
                    >
                      {hotelData.hotel_Google_Rating} / 5
                    </strong>
                  </div>
                  <p
                    className={`text-sm font-medium tracking-wider ${isSoldOut && "text-gray-400"}`}
                  >
                    {hotelData.hotel_Ratings_Count} Ratings
                  </p>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="flex min-w-fit items-end justify-end">
              <div className="text-right">
                {showLivePrice ? (
                  <>
                    <strong>
                      {`₹${hotelData.hotel_Starting_Price_Obj.plan_Base_Price} /  Night`}
                    </strong>
                    {!isSoldOut && (
                      <p className={`text-sm ${isSoldOut && "text-gray-400"}`}>
                        {`+ ₹${Math.ceil(hotelData.hotel_Starting_Price_Obj.plan_Base_Price)} taxes`}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <span className="font-semibold tracking-wider text-secondary">
                      Starting From
                    </span>
                    <br />
                    <strong>
                      ₹{Math.ceil(Number(hotelData.hotel_Starting_Price))} /
                      Night
                    </strong>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isSoldOut && (
          <div className="mt-4 rounded-md bg-gray-300 p-2 text-center font-bold tracking-wide text-red-700">
            <p>Sold Out for the selected dates</p>
            <p>Select other dates to book this hotel</p>
          </div>
        )}
      </div>
    </>
  );
}
