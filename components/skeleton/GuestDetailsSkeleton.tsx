import React from "react";

const GuestDetailsSkeleton = () => {
  return (
    <div className="bg-secondary/75 h-[100vh]">
      <div className="wrapper flex lg:flex-row flex-col justify-between space-x-8 p-4 pb-10 pt-10">
        {/* Left Column - Main Content */}
        <div className="w-full max-w-3xl space-y-4 mb-2">
          {/* Hotel Info Skeleton */}
          <div className="animate-pulse">
            <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
            <div className="mb-4 h-8 w-full rounded bg-gray-300"></div>
          </div>

          {/* Guest Details Form Skeleton */}
          <div className="animate-pulse bg-white space-y-4 rounded-md mb-2 border p-4">
            <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
            </div>
            <div className="h-10 rounded bg-gray-300"></div>
            <div className="h-10 rounded bg-gray-300"></div>
            <div className="h-10 rounded bg-gray-300"></div>
            <div className="h-10 rounded bg-gray-300"></div>
          </div>

          {/* Pincode and State Form Skeleton */}
          <div className="animate-pulse bg-white space-y-4 mb-2 rounded-md border p-4">
            <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
            </div>
          </div>

          <div className="animate-pulse bg-white space-y-4 rounded-md border p-4">
            <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
              <div className="h-10 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="mb-4 h-20 w-full rounded bg-gray-300"></div>
          <div className="mb-4 h-8 w-full rounded bg-gray-300"></div>
        </div>

        {/* Right Column - Sidebar (Price Summary) */}
        <div className="w-80 space-y-4 hidden lg:block">
          <div className="animate-pulse space-y-4 rounded-md border p-4 bg-white">
            <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="h-6 w-full rounded bg-gray-300"></div>
            <div className="h-6 w-full rounded bg-gray-300"></div>
            <div className="h-6 w-1/2 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsSkeleton;
