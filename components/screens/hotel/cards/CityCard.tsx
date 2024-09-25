import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string;
  cityName: string;
  linkUrl: string;
};

export default function CityCard(props: Props) {
  return (
    <Link
      title="cityName"
      href={props.linkUrl}
      className="flex w-full h-fit min-w-[300px] snap-start flex-col rounded-2xl bg-secondary"
    >
      <Image
        title={props.cityName}
        alt={props.cityName}
        src={props.imageUrl ? props.imageUrl : "/fallback_image.jpg"}
        width={200}
        height={200}
        className="aspect-video h-full w-full rounded-2xl object-cover sm:h-auto"
        priority
        unoptimized
      />
      <div className="grid h-12 place-items-center text-center font-bold text-white">
        <p>{props.cityName}</p>
      </div>
    </Link>
  );
}
