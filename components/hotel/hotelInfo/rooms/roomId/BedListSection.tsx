import Image from "next/image";

type Props = {
  bedsList: any[];
};

export default function BedListSection({ bedsList }: Props) {
  function getImageForBed(key: string) {
    const imageMapping = {
      Custom: "/icons/bedSizes/Custom.svg",
      Diwan: "/icons/bedSizes/Diwan.svg",
      King: "/icons/bedSizes/King.svg",
      Queen: "/icons/bedSizes/Queen.svg",
      Singles: "/icons/bedSizes/Singles.svg",
    };

    const imageURL = imageMapping[key];
    return { key, imageURL };
  }

  return (
    <div id="bed-sizes" className="navLink p-4 xl:px-0">
      <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
        Bed List
      </h2>

      {bedsList.map((bed: any, index: number) => (
        <div
          key={index}
          className="flex aspect-video w-fit gap-4 rounded-xl border-2 bg-white p-4"
        >
          <div className="aspect-square w-1/2 overflow-hidden">
            <p className="text-sencondary text-center font-medium">
              {bed.bedCategory}
            </p>
            <div className="relative mx-auto grid h-16 w-16 place-items-center">
              <Image
                alt={getImageForBed(bed.bedCategory).key}
                src={getImageForBed(bed.bedCategory).imageURL}
                width={50}
                height={50}
                className="-mt-2"
                priority
              />
            </div>
          </div>

          <div className="flex w-1/2 flex-col justify-center whitespace-nowrap">
            <p className="flex items-center gap-1">
              <span>Size Unit</span> : <span>{bed.sizeUnit}</span>
            </p>
            <p className="flex items-center gap-1">
              <span>Height</span> :{" "}
              <span>
                {bed.height} {bed.sizeUnit}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span>Width</span> :{" "}
              <span>
                {bed.width} {bed.sizeUnit}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
