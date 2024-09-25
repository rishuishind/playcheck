import { capitalizeWords } from "@/lib/helper/helpingFunctions";
import Link from "next/link";

// Define the props type for the component
interface Props {
  queryCitySlug: string;
  starRatings: string[]; // Array of available star ratings
}
const HotelStarLink: React.FC<Props> = ({ queryCitySlug, starRatings }) => {
  let cityName: string = queryCitySlug.split("hotels-in-").pop() || "";
  if (cityName.includes("under")) {
    cityName = cityName.split("-under")[0];
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Hotels by Rating</h2>
      <div className="text-md mt-2 flex flex-wrap gap-3 text-center">
        {starRatings.includes("2-star") && (
          <Link
            href={`2-star-hotels-in-${cityName}`}
            className="block hover:text-blue-700 md:inline-block md:w-auto"
            target="_blank"
          >
            2 Star Hotels in {capitalizeWords(cityName.split("-").join(" "))}
          </Link>
        )}
        {starRatings.includes("3-star") && (
          <Link
            href={`3-star-hotels-in-${cityName}`}
            className="block hover:text-blue-700 md:inline-block md:w-auto"
            target="_blank"
          >
            3 Star Hotels in {capitalizeWords(cityName.split("-").join(" "))}
          </Link>
        )}
        {starRatings.includes("4-star") && (
          <Link
            href={`4-star-hotels-in-${cityName}`}
            className="block hover:text-blue-700 md:inline-block md:w-auto"
            target="_blank"
          >
            4 Star Hotels in {capitalizeWords(cityName.split("-").join(" "))}
          </Link>
        )}
        {starRatings.includes("5-star") && (
          <Link
            href={`5-star-hotels-in-${cityName}`}
            className="block hover:text-blue-700 md:inline-block md:w-auto"
            target="_blank"
          >
            5 Star Hotels in {capitalizeWords(cityName.split("-").join(" "))}
          </Link>
        )}
      </div>
    </div>
  );
};

export default HotelStarLink;
