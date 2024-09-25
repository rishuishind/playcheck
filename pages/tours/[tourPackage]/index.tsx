import CustomHead from "@/components/header/CustomHead";
import { tourPackagesPdflinks } from "@/lib/constantData";
import { TAB_IMAGE_URL } from "@/lib/helper";
import { useRouter } from "next/router";

export default function TourPackagePage() {
  const router = useRouter();

  const getPdfUrl = (query: string) => {
    const link = tourPackagesPdflinks.find((link) => link.packageURL === query);
    return link ? link.pdfUrl : null;
  };

  const pagePdfUrl = getPdfUrl(router.query.tourPackage + "");

  if (!pagePdfUrl) {
    return "Invalid query";
  }

  return (
    <>
      <CustomHead
        canonicalUrl={`https://staybook.in/tours/${router.query.tourPackage}`}
        metaShowTitle={"staybook tours page"}
        metaDescription={"staybook tours description"}
        metaImageUrl={TAB_IMAGE_URL}
      />
      <section className="scrollbar-hide fixed inset-0 min-h-screen w-full flex-col gap-4 overflow-hidden bg-black">
        <iframe src={pagePdfUrl} className="h-full w-full" />
      </section>
    </>
  );
}
