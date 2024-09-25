export default function BookingCardSkeleton() {
  return (
    <div className="relative flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl bg-white p-3 shadow-md hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="h-full w-full animate-pulse rounded-lg bg-gray-300" />
      </div>

      <div className="relative mt-3 flex w-full flex-col justify-between">
        <div className="font-xl w-full font-bold text-secondary">
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
        </div>

        <div className="my-3 flex flex-col space-y-1">
          <div className="relative flex w-full items-center space-x-1 align-middle">
            <span className="my-auto flex align-middle text-sm">
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
            </span>
            <span className="text-md my-auto flex align-middle font-medium">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
            </span>
          </div>
          <div className="relative flex w-full items-center space-x-1 align-middle">
            <span className="my-auto flex align-middle text-sm">
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
            </span>
            <span className="text-md my-auto flex align-middle font-medium">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
            </span>
          </div>
          <div className="relative flex w-full items-center space-x-1 align-middle">
            <span className="my-auto flex align-middle text-sm">
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
            </span>
            <span className="text-md my-auto flex align-middle font-medium">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="h-6 w-1/5 animate-pulse rounded bg-gray-300" />
          <div className="h-6 w-1/5 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
