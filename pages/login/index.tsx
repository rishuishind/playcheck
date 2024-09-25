import CustomHead from "@/components/header/CustomHead";
import {
  LOGIN_PAGE_META_DESCRIPTION,
  LOGIN_PAGE_TAB_TITLE,
  LOGIN_URL,
  LOGO_IMAGE_URL1,
} from "@/lib/helper";
import dynamic from "next/dynamic";

const DynamicAuthCard = dynamic(() => import("@/components/AuthCard"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <>
      <CustomHead
        metaShowTitle={LOGIN_PAGE_TAB_TITLE}
        metaDescription={LOGIN_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${LOGIN_URL}`}
      />
      <section className="relative h-screen w-full bg-gradient-to-b from-primary to-secondary">
        <div className="wrapper grid h-full place-items-center">
          <h1 className="absolute top-20 -translate-y-1/2 font-dream text-[22vw] text-white/40 md:top-1/2 lg:tracking-[-20px] xl:tracking-[-24px]">
            Staybook
          </h1>
          <DynamicAuthCard />
        </div>
      </section>
    </>
  );
}
