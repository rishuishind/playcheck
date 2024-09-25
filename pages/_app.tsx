import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import Router, { useRouter } from "next/router";
import HotelLayout from "@/components/layout/HotelLayout";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import ProgressBar from "@badrap/bar-of-progress";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import HotelInfoLayoutSkeleton from "@/components/skeleton/HotelInfoLayoutSkeleton";
import GuestDetailsSkeleton from "@/components/skeleton/GuestDetailsSkeleton";
import { useEffect } from "react";

// Dynamic imports

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-100",
  delay: 100,
});

const handleRouteChangeStart = () => progress.start();
const handleRouteChangeComplete = () => progress.finish();
const handleRouteChangeError = () => progress.finish();

Router.events.on("routeChangeStart", handleRouteChangeStart);
Router.events.on("routeChangeComplete", handleRouteChangeComplete);
Router.events.on("routeChangeError", handleRouteChangeError);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const persistor = persistStore(store);

  const isRoomsPageRoute = router.pathname.startsWith(
    "/hotels/[hotelInfo]/rooms",
  );
  const isHotelInfoPage =
    router.pathname.startsWith("/hotels/[hotelInfo]") &&
    !router.pathname.includes("rooms");
  const isHotelInfoORCityPage =
    (router.pathname.startsWith("/hotels/[hotelInfo]") &&
      !router.pathname.includes("rooms")) ||
    router.pathname.endsWith("[citySlugName]") ||
    router.pathname.endsWith("[cityRegionSlugName]");
  const bookingRoute = router.pathname.startsWith(
    "/hotels/[hotelInfo]/booking",
  );
  const paymentRouter = router.pathname.startsWith("/payment");
  const toursPage = router.pathname.startsWith("/tours/[tourPackage]");

  // useEffect(() => {
  //   console.log("Inside");
  //   const handleRouteChangeStart = async (url: string) => {
  //     if (url.startsWith("/hotels/[hotelInfo]/rooms")) {
  //       console.log("Url /rooms");
  //       await persistor.flush();
  //     }
  //   };

  //   Router.events.on("routeChangeStart", handleRouteChangeStart);

  //   return () => {
  //     Router.events.off("routeChangeStart", handleRouteChangeStart);
  //   };
  // }, [persistor]);

  if (toursPage) {
    return <Component {...pageProps} />;
  }

  if (bookingRoute || paymentRouter) {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<GuestDetailsSkeleton />}
        >
          <Component {...pageProps} />
          {/* <GuestDetailsSkeleton /> */}
        </PersistGate>
      </Provider>
    );
  }

  if (isRoomsPageRoute) {
    return (
      <Provider store={store}>
        {/* <PersistGate
          loading={<HotelInfoLayoutSkeleton />}
          persistor={persistor}
        > */}
        <Component {...pageProps} />
        {/* <HotelInfoLayoutSkeleton /> */}
        {/* </PersistGate> */}
      </Provider>
    );
  }
  if (isHotelInfoORCityPage) {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <HotelLayout>
          <Component {...pageProps} />
        </HotelLayout>
        {/* </PersistGate> */}
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <WebsiteLayout>
        <Component {...pageProps} />
      </WebsiteLayout>
      {/* </PersistGate> */}
    </Provider>
  );
}
