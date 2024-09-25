import Link from "next/link";

interface PriceLinkProps {
  queryCitySlug: string;
  priceRanges: string[]; // Array of available price ranges
}

const PriceLink: React.FC<PriceLinkProps> = ({
  queryCitySlug,
  priceRanges,
}) => {
  let cityName: string = queryCitySlug.split("hotels-in-").pop() || "";
  if (cityName.includes("under")) {
    cityName = cityName.split("-under")[0];
  }

  return (
    <div>
      <h2 className="mt-6 text-2xl font-bold">Hotels by Price</h2>
      <div className="text-md mt-4 flex flex-wrap gap-3 text-center text-blue-400">
        {priceRanges.includes("under-1000") && (
          <Link
            href={`hotels-in-${cityName}-under-1000`}
            className="block md:inline-block md:w-auto"
            target="_blank"
          >
            Hotels in {cityName} under 1000
          </Link>
        )}
        {priceRanges.includes("under-2000") && (
          <Link
            href={`hotels-in-${cityName}-under-2000`}
            className="block md:inline-block md:w-auto"
            target="_blank"
          >
            Hotels in {cityName} under 2000
          </Link>
        )}
        {priceRanges.includes("under-3000") && (
          <Link
            href={`hotels-in-${cityName}-under-3000`}
            className="block md:inline-block md:w-auto"
            target="_blank"
          >
            Hotels in {cityName} under 3000
          </Link>
        )}
        {priceRanges.includes("under-4000") && (
          <Link
            href={`hotels-in-${cityName}-under-4000`}
            className="block md:inline-block md:w-auto"
            target="_blank"
          >
            Hotels in {cityName} under 4000
          </Link>
        )}
        {priceRanges.includes("under-5000") && (
          <Link
            href={`hotels-in-${cityName}-under-5000`}
            className="block md:inline-block md:w-auto"
            target="_blank"
          >
            Hotels in {cityName} under 5000
          </Link>
        )}
      </div>
    </div>
  );
};

export default PriceLink
