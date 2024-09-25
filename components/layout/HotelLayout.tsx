import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { Router } from "next/router";
import AllPageDeskNavbar from "../navbar/AllPageDeskNavbar";
import AllPageMobNavbar from "../navbar/AllPageMobNavbar";

const CustomWhatsAppWidget = dynamic(
  () => import("@/components/CustomWhatsApp"),
  { ssr: false },
);

type Props = {
  children: ReactNode;
};

export default function HotelLayout(props: Props) {
  const [loader, setLoader] = useState(false);

  Router.events.on("routeChangeStart", () => setLoader(true));
  Router.events.on("routeChangeComplete", () => setLoader(false));
  Router.events.on("routeChangeError", () => setLoader(false));

  return (
    <>
      {/* <LoadingModel modelVisible={loader} setLoadingModel={setLoader} /> */}
      <AllPageDeskNavbar />
      <AllPageMobNavbar />
      <main>{props.children}</main>
      <div className="relative z-50">
        <CustomWhatsAppWidget />
      </div>
    </>
  );
}
