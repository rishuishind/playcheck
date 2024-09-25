import FallbackImage from "@/components/hotel/FallbackImage";
import { updateSearchedText } from "@/lib/redux/bookingSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function TrendingSection() {
  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-center font-dream text-2xl font-bold tracking-wider text-secondary md:text-left md:text-3xl lg:text-4xl">
        Trending Destinations
      </h2>
      <p className="text-center text-sm font-medium text-secondary md:text-left md:text-base">
        Most popular choices for travelers in India
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <TrendingCard
          title={"delhi_image"}
          alt={"delhi_image"}
          src="https://images.staybook.in/website-images/new-delhi_1.webp"
          cityName={"New Delhi"}
          citySlugName={`hotels-in-new-delhi`}
          tagLine={"Where History Meets Modernity in a Bustling Melange."}
        />
        <TrendingCard
          title={"amritsar_image"}
          alt={"amritsar_image"}
          src="https://images.staybook.in/website-images/amritsar_1.webp"
          cityName={"Amritsar"}
          citySlugName={`hotels-in-amritsar`}
          tagLine={"Reverence, Resilience, and the Golden Temple's Serenity."}
        />
        <TrendingCard
          title={"mussoorie_image"}
          alt={"mussoorie_image"}
          src="https://images.staybook.in/website-images/mussoorie_1.webp"
          cityName={"Mussoorie"}
          citySlugName={`hotels-in-mussoorie`}
          tagLine={"Serene Hills, Cascading Waterfalls, and Majestic Views."}
        />
        <TrendingCard
          title={"jaipur_image"}
          alt={"jaipur_imgae"}
          src="https://images.staybook.in/website-images/jaipur_1.webp"
          cityName={"Jaipur"}
          citySlugName={`hotels-in-jaipur`}
          tagLine={"Vibrant Bazaars, Majestic Forts, and Pink City's Elegance."}
        />
        <TrendingCard
          title={"agra_image"}
          alt={"agra_image"}
          src="https://images.staybook.in/website-images/agra_1.webp"
          cityName={"Agra"}
          citySlugName={`hotels-in-agra`}
          tagLine={"Home to the Iconic Taj Mahal and Mughal Heritage."}
        />
        <TrendingCard
          title={"shimla_image"}
          alt={"shimla_image"}
          src="https://images.staybook.in/website-images/shimla_1.webp"
          cityName={"Shimla"}
          citySlugName={`hotels-in-shimla`}
          tagLine={"Colonial Charms, Snow-capped Peaks, and Alpine Serenity."}
        />
      </div>
    </div>
  );
}

const TrendingCard = (props: any) => {
  const dispatch = useDispatch();

  return (
    <Link
      title={props.citySlugName}
      href={props.citySlugName}
      className="block"
      onClick={() => {
        dispatch(updateSearchedText(`Hotels in ${props.cityName}`));
      }}
    >
      <div className=" peer relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg transition-all before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/50 lg:aspect-[3/2] ">
        {props.src == "" ? (
          <FallbackImage />
        ) : (
          <Image
            title={props.title}
            alt={props.alt}
            src={props.src}
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 p-2 text-white lg:p-4">
          <h3 className="font-bold lg:text-xl">{props.cityName}</h3>
          <p className="hidden text-sm font-medium md:block">{props.tagLine}</p>
        </div>
      </div>
    </Link>
  );
};
