import Image from "next/image";
import Link from "next/link";
// import Star from "./star"
interface NearByHotelCardProps {
  data: any[];
}
const NearByHotelCard: React.FC<NearByHotelCardProps> = ({ data }) => {
  return (
    <div className="p-4 xl:px-0">
      <h2 className="mb-3 text-xl font-bold">{`Explore our Hotel Near ${data[0].hotel_Landmark}`}</h2>
      <div className="container-snap flex gap-4 overflow-x-auto">
        {data.map((ele: any, index: number) => (
          <div
            key={index}
            className="h-fit min-w-[240px] rounded-xl border-2 p-3 shadow-xl"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={ele.hotel_Image_Url}
                alt="packageimage"
                height={200}
                width={300}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pt-2">
              <p className="font-semibold tracking-wide line-clamp-1">{ele.hotel_Name}</p>
              <p className="text-sm line-clamp-1">{`${ele.hotel_Landmark}`}</p>
              <Link href={`/hotels/${ele.hotel_Slug_Name}`} className="w-full block bg-primary text-light p-2 rounded-md text-center mt-1">Know More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearByHotelCard;