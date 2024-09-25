import {
  LOGO_IMAGE_URL1,
  USER_ACCESS_TOKEN,
  extractJWTValues,
} from "@/lib/helper";
import { parse } from "cookie";
import { getUserBookings } from "@/lib/handlers/pagePaginationHandler";
import BookingCard from "@/components/profile/bookings/BookingCard";
import React, { useState, useEffect, useCallback } from "react";
import CustomHead from "@/components/header/CustomHead";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/navbar/booking/Navbar";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { timestampToDate } from "@/lib/helper/timestampToDate";
import BookingCardSkeleton from "@/components/skeleton/BookingCardSkeleton";

export default function HotelBookings(props: any) {
  const router = useRouter();
  const canonical = router.asPath.split("?");
  const breadcrumb = router.asPath
    .split("/")
    .filter((link: string) => link !== "");
  const [allBookings, setAllBookings] = useState(props.userBookingsList);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(true);
  const [lastDocState, setLastDocState] = useState<any>(props.last_doc);

  const handleInfiniteScroll = useCallback(async () => {
    if (loading || !paginationLoading) return;
    setLoading(true);
    const { lastDoc, bookingList } = await getUserBookings(
      props.user_email,
      lastDocState,
      8,
    );
    setLastDocState(lastDoc);
    if (!lastDoc) setPaginationLoading(false);
    setAllBookings((prev) => [...prev, ...bookingList]);
    setLoading(false);
  }, [loading, paginationLoading, lastDocState, props.user_email]);

  useEffect(() => {
    if (!window && allBookings.length === 0) return;
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.scrollHeight
      ) {
        handleInfiniteScroll();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleInfiniteScroll]);

  return (
    <>
      <CustomHead
        metaShowTitle={`Hotel Bookings`}
        metaDescription={`List of all bookings of the user`}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />
      <section className="h-auto min-h-screen w-full">
        <Navbar />
        <div className="wrapper h-full py-5">
          <div
            onClick={() => router.back()}
            className="mb-4 flex cursor-pointer items-center gap-2"
          >
            <ChevronLeftIcon className="h-7 w-7 rounded-full bg-primary" />
            <h1 className="font-serif text-3xl font-medium tracking-wide">
              My Bookings
            </h1>
          </div>
          <div className="flex items-center gap-1">
            {breadcrumb.map((link: string, index: number) => (
              <div key={link} className="font-medium">
                <Link
                  href={`/${breadcrumb.slice(0, index + 1).join("/")}`}
                  className="hover:text-primary"
                >
                  {link}
                </Link>
                {index < breadcrumb.length - 1 && <span> &gt;</span>}
              </div>
            ))}
          </div>

          {allBookings.length === 0 && (
            <div className="mt-4 grid h-[320px] w-full place-items-center rounded-md bg-secondary/10">
              <h2 className="text-3xl font-thin tracking-wide md:text-5xl">
                No bookings available
              </h2>
            </div>
          )}
          <div className="grid h-auto grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allBookings.length > 0 &&
              allBookings.map((booking: any, index: number) => (
                <BookingCard key={index} bookingInfo={booking} />
              ))}
            {loading &&
              Array.from({ length: 8 }).map((_, index) => (
                <BookingCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const userAccessToken = cookies[USER_ACCESS_TOKEN];
  const userAccessTokenObject: any = await extractJWTValues(userAccessToken);

  let user_email = userAccessTokenObject.email;
  const { lastDoc, bookingList } = await getUserBookings(user_email, null, 8);

  const serializedBookingsList = JSON.stringify(bookingList);
  const serializedLastDoc = lastDoc ? JSON.stringify(lastDoc) : lastDoc;

  return {
    props: {
      last_doc: serializedLastDoc,
      userBookingsList: JSON.parse(serializedBookingsList),
      user_email: user_email,
    },
  };
}
