import Image from "next/image";

type Props = {
  bathAndToilet: any;
};

export default function BathAndToiletSection({ bathAndToilet }: Props) {
  // function to format the keys
  function formatKeyName(key: string) {
    let words = key.split("_");
    let formattedKey = words.slice(1).join(" ");
    return formattedKey;
  }

  function getImageForKey(key: string) {
    const imageMapping = {
      bathroom_Electronic_Bidet: "/icons/bath/bidet.svg",
      bathroom_Type: "bathroom_type_image_url",
      bathroom_Mobility_Accessible: "/icons/bath/mobility.svg",
      bathroom_Bathtub: "/icons/bath/bathtub.svg",
      bathroom_Shower: "/icons/bath/shower.svg",
    };

    const imageURL = imageMapping[key];
    return { key, imageURL };
  }

  return (
    <div id="bath-and-toilet" className="navLink p-4 xl:px-0">
      <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
        Bath & Toilet
      </h2>

      <div>
        <p className="font-semibold">Private Bathroom</p>
        {Object.entries(bathAndToilet).map(
          ([name, value]) =>
            name !== "bathroom_Type" && (
              <div
                key={name}
                className="relative flex gap-1.5 py-2 font-medium"
              >
                <div className="relative h-6 w-6">
                  <Image
                    alt={getImageForKey(name).key}
                    src={getImageForKey(name).imageURL}
                    width={24}
                    height={24}
                    priority
                  />
                </div>
                <p
                  className={`font-semibold ${
                    !value && "font-thin line-through"
                  }`}
                >
                  {formatKeyName(name)}
                </p>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
