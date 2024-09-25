import Image from "next/image";
import FlightImage from 'public/Flighticon.svg'
import TrainImage from 'public/Trainoutlinesymbols.svg'
import RoadImage from 'public/Roadhugeicons.svg'
import Map from 'public/Rectangle 2071.svg'

type Props = {
    img: string;
    trainData:string
    airData:string
    roadData:string
};

export default function Reach(props: Props) {
  return (
    <div className="flex flex-col gap-y-3 p-5">
      <div className="flex justify-center">
        <Image
          src={Map}
          alt="Knowlege"
          className="rounded-xl"
        />
      </div>
      <div className="space-y-5">
        <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-3 items-center">
              <div className="rounded-full bg-[#015250] p-2">
                  <Image src={FlightImage} alt="flighticons"/>
              </div>
              <span className=" text-lg font-semibold">By Flight:</span>
            </div>
            <p>{props.airData}</p>
        </div>
        <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-3 items-center">
              <div className="rounded-full bg-[#015250] p-2">
                  <Image src={TrainImage} alt="trainIcons"/>
              </div>
              <span className=" text-lg font-semibold">By Train:</span>
            </div>
            <p>{props.trainData}</p>
        </div>
        <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-3 items-center">
              <div className="rounded-full bg-[#015250] p-2">
                  <Image src={RoadImage} alt="raodIcons"/>
              </div>
              <span className=" text-lg font-semibold">By Road:</span>
            </div>
            <p>{props.roadData}</p>
        </div>
      </div>
    </div>
  );
}
