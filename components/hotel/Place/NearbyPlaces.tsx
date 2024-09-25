import { NEARBY_PLACES_ID } from "@/lib/helper";
import Link from "next/link";

type Props = {
  placeList: any[];
  showAllPlaces: boolean;
};

export default function NearbyPlaces({ placeList, showAllPlaces }: Props) {
  const fewPlaces = placeList.slice(0, Math.min(placeList.length, 12));

  return (
    <div
      id={NEARBY_PLACES_ID}
      className="grid w-full grid-cols-2 items-center gap-0.5 md:grid-cols-3 xl:grid-cols-4"
    >
      {showAllPlaces ? (
        <>
          {placeList.map((place: any) => (
            <PlaceCard key={place.place_Id} place={place} />
          ))}
        </>
      ) : (
        <>
          {fewPlaces.map((place: any) => (
            <PlaceCard key={place.place_Id} place={place} />
          ))}
        </>
      )}
    </div>
  );
}

const PlaceCard = ({ place }) => {
  // Check if place.place_Name is defined and is a string
  const placeName =
    typeof place.place_Name === "string" ? place.place_Name : "";

  // Splitting the place_Name string by spaces
  const placeNameArray = placeName.split(" ");

  // Finding the index of the first numeric value
  const numericIndex = placeNameArray.findIndex(
    (word: string) => !isNaN(parseFloat(word)),
  );

  // Extracting the name
  const name = placeNameArray.slice(0, numericIndex).join(" ");
  // Extracting the distance
  const distance = placeNameArray.slice(numericIndex).join(" ");

  return (
    <div>
      <div className="my-0.5 flex items-start gap-1 py-2 text-sm font-medium lg:text-base">
        <span>&bull;</span>
        <h3>
          <p>{name}</p>
          <Link
            target="_blank"
            title="map"
            href={String(place.place_Map_Url?.split(" ")[0] || "").trim()}
            className=""
          >
            ({distance})
          </Link>
        </h3>
      </div>
    </div>
  );
};
