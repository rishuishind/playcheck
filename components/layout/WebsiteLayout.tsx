import { ReactNode, useState } from "react";
import Footer from "../footer/Footer";
import { Router } from "next/router";
import dynamic from "next/dynamic";

const CustomWhatsAppWidget = dynamic(
  () => import("@/components/CustomWhatsApp"),
  { ssr: false },
);

type Props = {
  children: ReactNode;
};

export default function WebsiteLayout(props: Props) {
  const [loader, setLoader] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => setLoader(true));
  Router.events.on("routeChangeComplete", () => setLoader(false));
  Router.events.on("routeChangeError", () => setLoader(false));

  return (
    <>
      {/* <LoadingModel modelVisible={loader} setLoadingModel={setLoader} /> */}
      {/* <WebsiteNavbar /> */}
      <main>{props.children}</main>
      <Footer />
      <div className="relative z-50">
        <CustomWhatsAppWidget />
      </div>
    </>
  );
}
