import React from "react";

const HotelInfoLayoutSkeleton = () => {
  return (
    <>
      <div className="animate-pulse space-y-4 p-4">
        <div className="mx-10 hidden flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:flex">
          {/* Property Name Skeleton */}
          <div className="w-full sm:flex-1">
            <div className="h-10 w-full animate-pulse rounded bg-gray-300 sm:w-48"></div>
          </div>

          {/* Check-in Skeleton */}
          <div className="w-full sm:flex-1">
            <div className="h-10 w-full animate-pulse rounded bg-gray-300 sm:w-64"></div>
          </div>

          {/* Guests Skeleton */}
          <div className="w-full sm:flex-1">
            <div className="h-10 w-full animate-pulse rounded bg-gray-300 sm:w-56"></div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full sm:ml-4 sm:w-auto">
            <div className="h-10 w-full animate-pulse rounded bg-gray-300 sm:w-28"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 lg:mx-10">
          <div className="h-6 animate-pulse rounded bg-gray-300 lg:w-2/3"></div>
          <div className="h-4 animate-pulse rounded bg-gray-300 lg:w-1/4"></div>
          <div className="h-4 animate-pulse rounded bg-gray-300 lg:w-1/5"></div>
        </div>

        <div className="flex flex-col space-y-4 lg:mx-10 lg:flex-row lg:space-x-6 lg:space-y-0">
          {/* Left Column: Images */}
          <div className="flex h-[30vh] w-full flex-row space-y-4 rounded-lg bg-gray-300 lg:h-[50vh] lg:w-1/2"></div>

          {/* Right Column: Hotel Info */}
          <div className="mx-10 flex flex-1 flex-col space-y-4">
            <div className="h-6 animate-pulse rounded bg-gray-300 lg:w-2/3"></div>
            <div className="h-4 animate-pulse rounded bg-gray-300 lg:w-1/4"></div>
            <div className="h-4 animate-pulse rounded bg-gray-300 lg:w-1/5"></div>

            <div className="flex h-[20vh] w-full flex-row space-y-4 rounded-lg bg-gray-300 lg:hidden lg:h-[20vh] lg:w-1/2"></div>

            <div className="hidden h-6 animate-pulse rounded bg-gray-300 lg:block lg:w-2/3"></div>
            <div className="hidden h-4 animate-pulse rounded bg-gray-300 lg:block lg:w-1/4"></div>
            <div className="hidden h-4 animate-pulse rounded bg-gray-300 lg:block lg:w-1/5"></div>

            <div className="h-10 w-full animate-pulse rounded bg-gray-300 lg:w-32"></div>

            {/* Price and Button */}
            <div className="hidden flex-col items-start justify-between space-y-4 lg:flex lg:flex-row lg:items-center lg:space-y-0">
              <div className="h-10 w-1/3 animate-pulse rounded bg-gray-300"></div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </div>
              <div className="h-10 w-full animate-pulse rounded bg-gray-300 lg:w-32"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 hidden flex-col space-y-4 p-4 lg:flex">
        <div className="flex gap-4">
          <div className="h-24 w-1/2 animate-pulse rounded-lg bg-gray-300"></div>
          <div className="h-24 w-1/2 animate-pulse rounded-lg bg-gray-300"></div>
        </div>
        <div className="hidden gap-4 lg:flex">
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-300"></div>
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </>
  );
};

export default HotelInfoLayoutSkeleton;
