export default function RoomsBookingSkeleton() {
  return (
    <div className="relative flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl bg-white p-3 shadow-md hover:shadow-lg">
      <div className="relative w-full overflow-hidden">
        <div className="relative mx-auto -mt-4 mb-2.5 h-10 w-[45%] bg-gray-300 pt-2 text-center before:absolute before:-left-10 before:top-0 before:h-0 before:w-0 before:border-l-[40px] before:border-r-[0px] before:border-t-[40px] before:border-l-transparent before:border-r-transparent before:border-t-gray-300 after:absolute after:-right-10 after:top-0 after:h-0 after:w-0 after:border-b-[0px] after:border-r-[40px] after:border-t-[40px] after:border-b-transparent after:border-r-transparent after:border-t-gray-300" />
      </div>
      <div className="flex flex-col space-y-2 rounded-lg w-full  px-2">
        <div className="flex bg-gray-400 rounded h-4 w-3/5"></div>
        <div className="flex bg-gray-300 rounded h-3 w-3/4"></div>
        <div className="flex bg-gray-400 rounded h-4 w-2/5"></div>
      </div>
      <div className="flex flex-col gap-y-2 rounded-lg border-2 border-gray-100 p-2">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex animate-pulse justify-between rounded-lg border-2 p-2"
          >
            <div className="max-w-[90%] space-y-0.5">
              <div className="h-4 w-3/4 rounded bg-gray-400"></div>
              <div className="h-3 w-5/6 rounded bg-gray-300"></div>
              <div className="text-md-body-text flex items-center gap-1">
                <div className="h-3 w-12 rounded bg-gray-300"></div>
                <div className="h-3 w-12 rounded bg-gray-300"></div>
                <div className="h-3 w-16 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="h-6 w-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center rounded-lg">
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}

/* 

 <div className="relative mt-3 flex w-full flex-col justify-between">

        {/* <div className="flex animate-pulse justify-between rounded-lg border-2 p-2">
          <div className="max-w-[90%] space-y-0.5">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-3 w-5/6 rounded bg-gray-300"></div>
            <div className="text-md-body-text flex items-center gap-1">
              <div className="h-3 w-12 rounded bg-gray-300"></div>
              <div className="h-3 w-12 rounded bg-gray-300"></div>
              <div className="h-3 w-16 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* <div className="my-3 flex flex-col space-y-1">
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

    //     <div className="flex justify-center">
    //       <div className="h-8 w-full animate-pulse rounded bg-gray-300" />
    //     </div>
    //   </div>

    */
