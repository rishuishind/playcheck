import Link from "next/link";

type HotelItem = {
  slug: string;
  name: string;
};

type Props = {
  staticData: {
    allCities: { name: string; slug: string }[];
    hotelList: HotelItem[];
    trendingHotels: HotelItem[];
    regionsSlugs: HotelItem[];
  };
};

const RegionLink = ({ staticData }: Props) => {
  const { regionsSlugs = [] } = staticData || {};

  return (
    <>
      <h2 className="mt-4 text-2xl font-bold">Hotels by Region</h2>
      <div className="text-md mt-4 flex flex-wrap gap-3 text-center text-blue-400 ">
        {regionsSlugs.map((hotel) => (
          <Link key={hotel.slug} href={`${hotel.slug}`} target="_blank">
            {`Hotels in ${hotel.name}`}
          </Link>
        ))}
      </div>
    </>
  );
};

export default RegionLink;
