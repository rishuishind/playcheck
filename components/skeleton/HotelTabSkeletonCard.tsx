type Props = {
  colSpan: string;
};

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const HotelSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative flex h-44 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm`}
    >
      <div className="flex aspect-[4/3] w-1/3 items-center justify-center bg-gray-300 lg:aspect-auto">
        <svg
          className="h-10 w-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      <div className="flex w-2/3 flex-col justify-between p-4">
        <div className="space-y-1 md:space-y-4">
          <div className="flex items-center justify-between gap-1 md:gap-4">
            <div className="h-2 w-56 rounded-full bg-gray-500" />
            <div className="hidden h-2 w-20 rounded-full bg-gray-500 md:block" />
          </div>
          <div className="h-2 w-2/3 rounded-full bg-gray-500" />
          <div className="h-2 w-2/3 rounded-full bg-gray-500" />
          <div className="h-2 w-16 rounded-full bg-gray-500" />
        </div>
        <div className="hidden flex-col items-end gap-1 md:flex">
          <div className="h-2 w-24 rounded-full bg-gray-500" />
          <div className="h-2 w-16 rounded-full bg-gray-500" />
          <div className="h-2 w-10 rounded-full bg-gray-500" />
        </div>
      </div>
    </div>
  );
};
export const HotelRegionSkeletons = () => {
  return (
    <div className="relative space-y-4">
      <HotelSkeleton />
      <HotelSkeleton />
      <HotelSkeleton />
      <HotelSkeleton />
      <HotelSkeleton />
      <HotelSkeleton />
    </div>
  );
};

export const RegionSkeleton = (props: Props) => {
  return (
    <div
      className={`${shimmer} ${props.colSpan} relative overflow-hidden rounded-2xl bg-gray-200 shadow-sm`}
    >
      <div className="grid h-full w-full place-items-center">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
          stroke="darkgray"
          className="h-24 w-24"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-2 p-2 lg:p-4">
        <div className="h-2 w-20 rounded-md bg-gray-500" />
        <div className="h-2 w-full rounded-md bg-gray-500 text-sm font-medium" />
      </div>
    </div>
  );
};
export const ExploreIndiaSkeletons = () => {
  const slides: any[] = [
    {
      id: 1,
      colSpan: "md:col-span-5",
    },
    {
      id: 2,
      colSpan: "md:col-span-3",
    },
    {
      id: 3,
      colSpan: "md:col-span-4",
    },
    {
      id: 4,
      colSpan: "md:col-span-3",
    },
    {
      id: 5,
      colSpan: "md:col-span-4",
    },
    {
      id: 6,
      colSpan: "md:col-span-5",
    },
  ];

  return (
    <>
      <div className="mt-4 grid aspect-video w-full grid-cols-1 gap-4 md:grid-cols-12">
        {slides.map((slide: any, index: number) => (
          <RegionSkeleton key={index} colSpan={slide.colSpan} />
        ))}
      </div>
    </>
  );
};

export const TrendingSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative aspect-video overflow-hidden rounded-2xl bg-gray-200 shadow-sm`}
    >
      <div className="grid h-full w-full place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="darkgray"
          className="h-24 w-24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-2 p-2 lg:p-4">
        <div className="h-2 w-20 rounded-md bg-gray-500" />
        <div className="h-2 w-full rounded-md bg-gray-500 text-sm font-medium" />
      </div>
    </div>
  );
};
export const TrendingDestinationSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
      <TrendingSkeleton />
      <TrendingSkeleton />
      <TrendingSkeleton />
      <TrendingSkeleton />
      <TrendingSkeleton />
      <TrendingSkeleton />
    </div>
  );
};
