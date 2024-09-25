import Image from "next/image";
import Star from "./star";

const PopularPackage = ({ data }) => {
  return (
    <div className="mb-5 ml-6 mr-5 rounded-xl bg-white pb-5 pl-5 pt-5 shadow-xl sm:max-w-[40rem] md:ml-10 md:mr-10 md:max-w-full lg:max-w-[60rem] xl:ml-20 xl:mr-0 xl:py-5">
      <h2 className="text-xl font-bold">Explore our best packages:</h2>
      <div className="flex flex-row overflow-auto">
        {data.map((ele: any, index: number) => (
          <div
            key={index}
            className="my-5 mr-5 mt-2 flex max-h-64 min-w-[14rem] flex-col items-center justify-center rounded-xl bg-white p-5 shadow-lg"
          >
            <Image
              src={ele.imgUrl}
              alt="packageimage"
              className="h-[8rem] w-[12rem] rounded-lg object-cover shadow-2xl"
            />
            <div className="w-full pt-2">
              <p>{ele.packageName}</p>
            </div>

            <div className="flex w-full flex-row justify-between pt-1">
              <Star count={ele.rating} />

              <p>{`$${ele.price}`}</p>
            </div>
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                className="me-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-5 py-1.5 text-sm font-medium text-green-900  shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPackage;
