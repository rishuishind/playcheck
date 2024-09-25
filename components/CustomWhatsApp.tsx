import Image from "next/image";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import "react-whatsapp-widget/dist/index.css";

// Dynamically import the WhatsAppWidget component and specify its props type
const WhatsAppWidget: ComponentType<{
  phoneNumber: string;
  companyName: string;
  replyTimeText?: string;
  CompanyIcon?: () => JSX.Element;
}> = dynamic(
  () => import("react-whatsapp-widget").then((mod) => mod.WhatsAppWidget),
  { ssr: false },
);

const CustomWhatsAppWidget = () => {
  return (
    <WhatsAppWidget
      phoneNumber="919211262749"
      companyName="Staybook"
      replyTimeText="replies within a minute"
      CompanyIcon={() => (
        <Image
          src="/brand_logo.svg"
          alt="Brand logo"
          title="Brand logo"
          width={100}
          height={100}
          priority
        />
      )}
    />
  );
};

export default CustomWhatsAppWidget;
