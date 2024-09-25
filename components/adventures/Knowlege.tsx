import Image from "next/image";
import Weather from 'public/weather.svg'

type Props = {
  img: string;
  description: string;
  heading: string;
};

export default function Knowlege(props: Props) {
  return (
    <div className="lg:grid grid-cols-2 items-center justify-center gap-3 p-5">
      <div className="relative">
        <Image
          src={Weather}
          alt="Knowlege"
          height={200}
          width={200}
          className="rounded-xl md:w-[380px]"
        />
      </div>
      <div>
        <h5 className=" text-lg font-semibold">{props.heading}</h5>
        <p className="text-sm whitespace-pre-line">{props.description}</p>
      </div>
    </div>
  );
}
