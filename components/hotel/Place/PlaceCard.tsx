import Image from "next/image";
import Link from "next/link";

type Props = {
  place: any;
};

export default function PlaceCard({ place }: Props) {
  return (
    <Link target="_blank" title="map url" href={String(place.place_Map_Url)+""}>
      <div className="flex items-center gap-1 my-0.5 py-2 font-medium">
        <Image
          src="/map.svg"
          alt={place.place_Name}
          width={28}
          height={28}
          className="w-7 h-7 rounded-full p-[1px]"
        />
        <h3 className="whitespace-nowrap line-clamp-1 text-sm">{place.place_Name}</h3>
      </div>
    </Link>
  );
}
