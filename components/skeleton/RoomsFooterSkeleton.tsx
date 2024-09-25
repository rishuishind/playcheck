export default function RoomsFooterSkeleton() {
  return (
    <div>
      <div className="w-full bg-gray-300 text-xs md:hidden">
        <div className="wrapper py-1.5">
          <div className="flex items-center gap-1">
            <div className="h-4 w-12 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-20 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="flex w-full items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <div className="h-6 w-24 rounded bg-gray-300"></div>
              <div className="h-4 w-16 rounded bg-gray-300"></div>
            </div>
            <div className="h-4 w-40 rounded bg-gray-300 md:hidden"></div>
            <div className="hidden items-center gap-1 text-sm md:flex">
              <div className="h-4 w-32 rounded bg-gray-300"></div>
              <div className="h-4 w-4 rounded bg-gray-300"></div>
              <div className="h-4 w-36 rounded bg-gray-300"></div>
            </div>
          </div>

          <div className="h-10 w-28 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
