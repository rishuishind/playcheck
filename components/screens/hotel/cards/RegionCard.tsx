import { updateSearchedText } from "@/lib/redux/bookingSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import FallbackImage from "@/components/hotel/FallbackImage";

type Props = {
  link: string;
  imageUrl: string;
  cityName: string;
  tagLine: string;
  colSpan: string;
};

export default function RegionCard(props: Props) {
  const dispatch = useDispatch();

  return (
    <Link
      rel="preload"
      href={props.link}
      onClick={() => {
        dispatch(updateSearchedText(`Hotels in ${props.cityName}`));
      }}
      className={`${props.colSpan} relative block w-full max-h-[240px] cursor-pointer overflow-hidden rounded-2xl before:absolute before:inset-0 before:bg-black/20`}
    >
      {props.imageUrl == "" ? (
        <FallbackImage />
      ) : (
        <Image
          title={props.cityName}
          alt={props.cityName}
          src={props.imageUrl}
          width={1200}
          height={800}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 p-2 text-white lg:p-4">
        <h3 className="font-bold lg:text-xl">{props.cityName}</h3>
        <p className="hidden text-sm font-medium md:block">{props.tagLine}</p>
      </div>
    </Link>
  );
}
