import Image from "next/image";

type Props = {
  heading: string;
  para: string;
  img1: string;
  img2: string;
  index:number;
};

function Adventures(props: Props) {
  return (
    <div className="py-1 space-y-3">
      <div className="flex justify-center">
        <div className="relative flex justify-center px-5">
          <Image src={props.img1} alt={props.heading} height={200} width={200} className="rounded-xl h-[250px] md:w-[450px]" />
        </div>
        <div className="relative flex justify-center px-5 ">
          <Image src={props.img2} alt={props.heading} height={200} width={200} className="rounded-xl h-[250px] md:w-[450px]" />
        </div>
      </div>
      <div className="px-5 space-y-1 py-2">
        <h5 className="text-lg text-[#333333] font-semibold">{props.index} {props.heading}</h5>
        <p className="text-sm">{props.para}</p>
      </div>
    </div>
  );
}

export default Adventures;
