import Image from "next/image";

const Amenity = ({ amenities, hotelName }) => {
  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Amenities at ${hotelName}`}
      </h2>
      <div className="mb-8 mt-4 grid grid-cols-1 gap-4 rounded-lg border-2 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map(({ amenity_Name, amenity_Image_Url }) => (
          <div key={amenity_Name} className="flex items-center gap-4 p-4">
            <div className="relative h-[34px] w-[34px] overflow-hidden rounded-full">
              <Image
                src={amenity_Image_Url ? amenity_Image_Url : "/brand_logo.svg"}
                alt={amenity_Name}
                width={36}
                height={36}
                className="h-[34px] w-[34px]"
              />
            </div>
            <h2 className="font-medium">{amenity_Name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Amenity;
