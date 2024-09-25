import Image from "next/image";

type Props = {
  img: string;
  description: string;
};

export default function KnowlegeHorizontal(props: Props) {
  return (
    <div className="flex flex-col gap-y-3 p-5">
      <div className="flex justify-center">
        <Image
          src={props.img}
          alt="Knowlege"
          height={200}
          width={200}
          className="rounded-xl md:w-[380px]"
        />
      </div>
      <div>
        <p className="text-sm text-left">{props.description}</p>
      </div>
    </div>
  );
}
