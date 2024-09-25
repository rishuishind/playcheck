import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string;
  cityName: string;
  linkUrl: string;
  cityInfo: string;
  cityDescription: string;
};

export default function LandScapeCityCard(props: Props) {
  return (
    <Link
      href={props.linkUrl}
      className="w-full flex flex-col sm:flex-row items-center gap-4 sm:items-start border-2 border-secondary rounded-2xl p-4 mb-4"
    >
      <div className="relative w-full max-w-[300px] rounded-lg aspect-video overflow-hidden">
        <Image
          alt={props.cityName}
          src={props.imageUrl ? props.imageUrl : "/fallback_image.jpg"}
          width={200}
          height={200}
          className="w-full h-full object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="w-full h-full">
        <p className="text-secondary font-medium">{props.cityInfo}</p>
        <p className="line-clamp-5">{props.cityDescription}</p>
      </div>
    </Link>
  );
}
