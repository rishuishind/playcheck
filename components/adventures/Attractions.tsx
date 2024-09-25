import Image from "next/image";

type Props = {
  img: string;
  description: string;
};

export default function Attractions(props: Props) {
  return (
    <div className="lg:grid space-y-3 grid-cols-2 justify-center p-5 gap-x-3">
      <div className="relative flex justify-center">
        <Image
          src={props.img}
          alt="attractions"
          height={200}
          width={200}
          className="rounded-xl md:w-[380px]"
        />
      </div>
      <div>
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
}
