import { NextRequest, NextResponse } from "next/server";
import {
  CACHED_BOOKING_TOKEN,
  USER_ACCESS_TOKEN,
  addDays,
  authenticateStartAndEndDate,
  formatDateToIST,
  searchDateFormat,
} from "./lib/helper";

export async function middleware(
  req: NextRequest,
  res: NextResponse,
  // reqApi: NextApiRequest,
  // resApi: NextApiResponse,
  next: () => void,
) {
  const response = NextResponse.next();
  const userAccessToken = req.cookies.get(USER_ACCESS_TOKEN);
  const bookingToken = req.cookies.get(CACHED_BOOKING_TOKEN);

  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  const query = Object.fromEntries(queryParams.entries());

  const urlList = req.nextUrl.pathname.split("/");
  const hotelSlugName = urlList.length >= 3 ? urlList[2] : null;

  if (req.nextUrl.pathname.startsWith("/login") && userAccessToken) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/profile") && !userAccessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith(`/hotels/${String(hotelSlugName)}`) &&
    ((query.checkin && !query.checkout) || (!query.checkin && query.checkout))
  ) {
    return NextResponse.redirect(
      new URL(
        `/hotels/${String(hotelSlugName)}?checkin=${searchDateFormat(
          new Date(),
        )}&checkout=${searchDateFormat(
          addDays(new Date(), 1),
        )}&num_nights=1&num_guests=2`,
        req.url,
      ),
    );
  }
  if (
    req.nextUrl.pathname.startsWith(`/hotels/${String(hotelSlugName)}`) &&
    query.checkin &&
    query.checkout &&
    !authenticateStartAndEndDate(query.checkin, query.checkout)
  ) {
    return NextResponse.redirect(
      new URL(
        `/hotels/${String(hotelSlugName)}?checkin=${searchDateFormat(
          new Date(),
        )}&checkout=${searchDateFormat(
          addDays(new Date(), 1),
        )}&num_nights=1&num_guests=2`,
        req.url,
      ),
    );
  }
  if (
    req.nextUrl.pathname.startsWith(`/hotels/${String(hotelSlugName)}/rooms`) &&
    ((query.checkin && !query.checkout) || (!query.checkin && query.checkout))
  ) {
    return NextResponse.redirect(
      new URL(
        `/hotels/${String(hotelSlugName)}?checkin=${searchDateFormat(
          new Date(),
        )}&checkout=${searchDateFormat(
          addDays(new Date(), 1),
        )}&num_nights=1&num_guests=2`,
        req.url,
      ),
    );
  }
  if (
    req.nextUrl.pathname.startsWith(`/hotels/${String(hotelSlugName)}/rooms`) &&
    query.checkin &&
    query.checkout &&
    !authenticateStartAndEndDate(query.checkin, query.checkout)
  ) {
    return NextResponse.redirect(
      new URL(
        `/hotels/${String(hotelSlugName)}?checkin=${searchDateFormat(
          new Date(),
        )}&checkout=${searchDateFormat(
          addDays(new Date(), 1),
        )}&num_nights=1&num_guests=2`,
        req.url,
      ),
    );
  }

  // consition to redirect the user to hotelInfo page if they try to access any url listed below
  // if (req.nextUrl.pathname.startsWith(`/hotels/${String(hotelSlugName)}`)) {
  //   const removedPaths = [
  //     "faq",
  //     "faqs",
  //     "amenities",
  //     "location",
  //     "nearby",
  //     "nearby-places",
  //     "photos",
  //     "review",
  //     "reviews",
  //   ];

  //   const matchesRemovedPath = removedPaths.some((path) =>
  //     req.nextUrl.pathname.endsWith(path),
  //   );

  //   if (matchesRemovedPath) {
  //     const redirectUrl = `/hotels/${String(hotelSlugName)}`;
  //     return NextResponse.redirect(new URL(redirectUrl, req.url));
  //   }
  // }

  // condition to redirect the user if they try to access the '/visa' url
  if (req.nextUrl.pathname.startsWith("/visa")) {
    const redirectUrl = `/indian-e-visa`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/hotels",
    "/hotels/:path*",
    "/visa/:path*",
    "/travel",
    "/travel/:path*",
    "/profile",
    "/profile/:path*",
    "/booking",
    "/payment",
    "/api/airpay/:path*",
    "/api/auth/:path*",
    "/api/userProfile/:path*",
    "/api/booking/:path*",
    "/api/hotelBooking/:path*",
  ],
};
