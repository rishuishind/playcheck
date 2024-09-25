import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { routerToAllRoomsPage } from "@/lib/handlers/pageHandler";
import { getDateDifference, stringToDate } from "@/lib/helper";
import {
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
} from "@/lib/redux/bookingSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  links: any[];
};

export default function TabBar({ links }: Props) {
  const [chekinDate, setCheckinDate] = useState("");
  const router = useRouter();
  const checkinSlice = useSelector(selectCheckInDate);
  const checkoutSlice = useSelector(selectCheckOutDate);
  const adultSearchedSlice = useSelector(selectSearchedGuestsCount);
  const childrenSearchedSlice = useSelector(selectSearchedChildrenCount);
  const roomSeachedSlice = useSelector(selectSearchedRoomsCount);

  const checkInDate =
    (router.query.checkin &&
      stringToDate(
        Array.isArray(router.query.checkin)
          ? router.query.checkin[0]
          : router.query.checkin,
      )) ||
    checkinSlice;
  const checkOutDate =
    (router.query.checkout &&
      stringToDate(
        Array.isArray(router.query.checkout)
          ? router.query.checkout[0]
          : router.query.checkout,
      )) ||
    checkoutSlice;
  const searchAdults =
    (router.query.num_guests && Number(router.query.num_guests)) ||
    adultSearchedSlice;
  const searchChildrenCount =
    (router.query.num_children && Number(router.query.num_children)) ||
    childrenSearchedSlice;
  const searchRoomsCount =
    (router.query.num_rooms && Number(router.query.num_rooms)) ||
    roomSeachedSlice;
  const numOfNights = getDateDifference(checkInDate, checkOutDate);

  const hotelPageHandler = async () => {
    const pageRouter = new PageRouterQueryParams(router);
    pageRouter.hotelSlugName = String(router.query?.hotelInfo);
    pageRouter.checkin = checkInDate;
    pageRouter.checkout = checkOutDate;
    pageRouter.num_nights = numOfNights;
    pageRouter.num_guests = searchAdults;
    pageRouter.num_rooms = searchRoomsCount;
    pageRouter.num_children = searchChildrenCount;
    // pageRouter.new_tab = true;

    await routerToAllRoomsPage(pageRouter);
  };

  return (
    <div className="sticky inset-x-0 top-16  border-b-2 bg-white lg:top-0">
      <div className="container-snap wrapper flex cursor-pointer items-center overflow-x-scroll">
        {links.map((link: any) => {
          const isActive = router.asPath.includes(link.hash);
          return (
            <div
              key={link.name}
              className={`min-w-fit px-6 py-1.5 text-sm font-semibold tracking-wide transition-all hover:border-gray-200 hover:text-primary ${
                isActive ? "border-b-[3px] border-primary" : ""
              }`}
            >
              {link.hash === "rooms" ? (
                <Link
                  href={`/hotels/${router.query?.hotelInfo}`}
                  target="__blank"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={`/hotels/${router.query?.hotelInfo}/${link.hash}`}
                  target="__blank"
                >
                  {link.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
