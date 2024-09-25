import Image from "next/image";

type Props = {
  imgUrl: string;
  name: string;
  distance: string;
};

export default function LocationCard({ imgUrl, name, distance }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12">
        <Image
          src={imgUrl}
          alt="nearby_location_icon"
          width={40}
          height={40}
          className="w-full h-full"
        />
      </div>
      <div className="w-full text-center py-2">
        <h3 className="font-medium text-center text-sm">
          {name} <span className="hidden">{distance} km</span>
        </h3>
        <p className="text-sm text-gray-600">{distance} km</p>
      </div>
    </div>
  );
}
