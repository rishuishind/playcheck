// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const HotelInfoSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden bg-gray-200 p-4 lg:px-7 xl:p-0 xl:py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-gray-400" />
        <div className="h-3 w-5 rounded-full bg-slate-400" />
      </div>
      <div className="mt-2.5">
        <div className="h-3 w-2/3 rounded-full bg-gray-500" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-2 w-32 rounded-full bg-gray-400" />
          <div className="h-2 w-20 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export const ImageLoader = () => {
  return (
    <div
      className={`${shimmer} relative h-full w-full overflow-hidden bg-gray-200 object-cover grid place-items-center`}
    >
      <svg
        className="aspect-square w-[4vw] text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  );
};

export const NavbarSkeleton = () => {
  return (
    <div
      className={`sticky inset-x-0 top-0 z-20 h-16 w-full overflow-hidden bg-gray-200 ${shimmer}`}
    >
      <div className="wrapper relative flex h-full items-center justify-between p-4 lg:px-7 xl:p-0 xl:py-4">
        <div className="relative h-10 w-10 bg-gray-400" />

        <div className="flex items-center gap-2.5 space-x-2 font-bold tracking-wider">
          <div className="relative h-3 w-12 rounded-full bg-gray-400" />
          <div className="relative h-3 w-12 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export const HotelGalleryWithBookingCardSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden lg:flex lg:gap-7`}
    >
      <div className="w-full lg:w-2/3">
        <div className="grid aspect-video w-full place-items-center bg-gray-200">
          <svg
            className="aspect-square w-[10vw] text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <div className="hidden w-full lg:block lg:w-1/3">
        <div className="h-full w-full rounded-2xl bg-gray-200 p-4">
          <div className="flex items-end gap-4">
            <div className="h-10 w-36 rounded-full bg-gray-500" />
            <div className="h-5 w-20 rounded-full bg-gray-500" />
          </div>
          <div className="mt-4 h-3 w-32 rounded-full bg-gray-500" />
          <div className="mt-2 h-3 w-24 rounded-full bg-gray-500" />
          <div className="mt-4 h-16 w-full rounded bg-gray-400" />
          <div className="mt-4 h-16 w-full rounded bg-gray-400" />
          <div className="mt-4 h-16 w-full rounded bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export const AboutSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-xl bg-gray-200 p-4`}
    >
      <div className="h-5 w-24 rounded-full bg-gray-500" />
      <div className="mt-4 h-3 w-full rounded-full bg-gray-500" />
      <div className="mt-1 h-3 w-11/12 rounded-full bg-gray-500" />
      <div className="mt-1 h-3 w-10/12 rounded-full bg-gray-500" />
    </div>
  );
};

export const AmenitiesSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative h-[30vh] w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-7 w-24 rounded bg-gray-300" />
      <div className="mt-4 flex w-full flex-wrap items-center gap-4">
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export const ReviewsAndRatingSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative h-fit w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-7 w-24 rounded bg-gray-300" />
      <RatingsSkeleton />
      <div className="container-snap mt-4 flex w-full items-center gap-4 overflow-x-scroll">
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
      </div>
    </div>
  );
};

export const ReviewSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full min-w-[300px] overflow-hidden rounded-lg border-2 bg-white p-3`}
    >
      <div className="flex items-center">
        <div className="mr-4 h-10 w-10 rounded-full border-2 bg-gray-300" />
        <div className="flex flex-col space-y-2">
          <div className="h-3 w-24 rounded-full bg-gray-300" />
          <div className="h-2 w-16 rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="ml-14 mt-2 space-y-2">
        <div className="h-3 w-full rounded-full bg-gray-300" />
        <div className="h-3 w-5/6 rounded-full bg-gray-300" />
        <div className="h-3 w-4/6 rounded-full bg-gray-300" />
      </div>
      <div className="ml-14 mt-0.5">
        <div className="h-2 w-20 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export const RatingsSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative mt-4 flex flex-col items-center gap-4 overflow-hidden md:flex-row`}
    >
      <div className="flex w-full items-center gap-4">
        <div className="relative flex aspect-square w-fit flex-col justify-center rounded-lg bg-gray-300 p-4 text-center">
          <div className="h-6 rounded-md bg-gray-400 pb-0.5" />
          <div className="mt-2 h-4 w-24 rounded-md bg-gray-400" />
        </div>
        <div className="w-[40%] space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <div className="flex-start flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="flex h-full w-2/3 rounded-full bg-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NearbyPlacesSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative h-[30vh] w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-7 w-24 rounded bg-gray-300" />
      <div className="mt-4 flex w-full flex-wrap items-center gap-4">
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
        <div className="h-8 w-40 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export const PlacesSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-7 w-24 rounded bg-gray-300" />
      <div className="mt-4 grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
        <div className="h-7 w-48 rounded bg-gray-300" />
      </div>
    </div>
  );
};

export const PrivacyPolicySkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-xl bg-gray-200 p-4`}
    >
      <div className="h-5 w-24 rounded-full bg-gray-500" />
      <div className="mt-4 h-3 w-full rounded-full bg-gray-500" />
      <div className="mt-1 h-3 w-11/12 rounded-full bg-gray-500" />
      <div className="mt-1 h-3 w-10/12 rounded-full bg-gray-500" />
    </div>
  );
};

export const FaqSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-7 w-24 rounded bg-gray-300" />
      <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-5">
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-full bg-gray-400" />
          <div className="h-5 w-full rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export const NearbyHotelsSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative h-[48vh] w-full overflow-hidden rounded-xl bg-gray-100 p-4`}
    >
      <div className="h-5 w-24 rounded-full bg-gray-300" />
      <div className="flex w-full items-center gap-4">
        <div className="mt-4 h-fit min-w-[200px] max-w-xs overflow-hidden rounded-xl bg-gray-300">
          <div className="grid aspect-video w-full place-items-center">
            <svg
              className="aspect-square w-[4vw] text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full space-y-1 bg-gray-400 p-3">
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-full rounded-full bg-gray-500" />
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-48 rounded-full bg-gray-500" />
          </div>
        </div>
        <div className="mt-4 h-fit min-w-[200px] max-w-xs overflow-hidden rounded-xl bg-gray-300">
          <div className="grid aspect-video w-full place-items-center">
            <svg
              className="aspect-square w-[4vw] text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full space-y-1 bg-gray-400 p-3">
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-full rounded-full bg-gray-500" />
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-48 rounded-full bg-gray-500" />
          </div>
        </div>

        <div className="mt-4 h-fit min-w-[200px] max-w-xs overflow-hidden rounded-xl bg-gray-300">
          <div className="grid aspect-video w-full place-items-center">
            <svg
              className="aspect-square w-[4vw] text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full space-y-1 bg-gray-400 p-3">
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-full rounded-full bg-gray-500" />
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-48 rounded-full bg-gray-500" />
          </div>
        </div>
        <div className="mt-4 h-fit min-w-[200px] max-w-xs overflow-hidden rounded-xl bg-gray-300">
          <div className="grid aspect-video w-full place-items-center">
            <svg
              className="aspect-square w-[4vw] text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full space-y-1 bg-gray-400 p-3">
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-full rounded-full bg-gray-500" />
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-48 rounded-full bg-gray-500" />
          </div>
        </div>
        <div className="mt-4 h-fit min-w-[200px] max-w-xs overflow-hidden rounded-xl bg-gray-300">
          <div className="grid aspect-video w-full place-items-center">
            <svg
              className="aspect-square w-[4vw] text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full space-y-1 bg-gray-400 p-3">
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-full rounded-full bg-gray-500" />
            <div className="h-3 w-28 rounded-full bg-gray-500" />
            <div className="h-3 w-48 rounded-full bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const RoomPlanCard = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-xl bg-gray-200 p-4`}
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="grid aspect-video w-full place-items-center rounded-xl bg-gray-300 sm:w-1/2">
          <svg
            className="aspect-square w-[5vw] text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        <div className="flex w-full flex-col justify-between pb-4 sm:w-1/2">
          <div className="space-y-1.5">
            <div className="h-3 w-11/12 rounded-full bg-gray-400" />
            <div className="h-3 w-9/12 rounded-full bg-gray-400" />
            <div className="h-3 w-7/12 rounded-full bg-gray-400" />
          </div>
          <div className="flex w-full justify-end">
            <div className="h-3 w-24 rounded-full bg-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-3 rounded-2xl bg-gray-400 p-3 text-black">
          <div className="h-2 w-20 rounded-full bg-gray-300" />
          <div className="h-2 w-36 rounded-full bg-gray-300" />
        </div>
        <div className="space-y-3 rounded-2xl bg-gray-400 p-3 text-black">
          <div className="h-2 w-20 rounded-full bg-gray-300" />
          <div className="h-2 w-36 rounded-full bg-gray-300" />
        </div>
        <div className="space-y-3 rounded-2xl bg-gray-400 p-3 text-black">
          <div className="h-2 w-20 rounded-full bg-gray-300" />
          <div className="h-2 w-36 rounded-full bg-gray-300" />
        </div>
        <div className="space-y-3 rounded-2xl bg-gray-400 p-3 text-black">
          <div className="h-2 w-20 rounded-full bg-gray-300" />
          <div className="h-2 w-36 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export const RoomPlansSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <RoomPlanCard />
      <RoomPlanCard />
      <RoomPlanCard />
      <RoomPlanCard />
    </div>
  );
};

export const SearchSkelleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-md bg-gray-200 p-4 lg:px-7 xl:p-0 xl:py-4`}
    >
      <div>
        <div className="h-6 w-28 rounded-full bg-gray-400" />
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
      </div>
      <div className="mt-4">
        <div className="h-6 w-36 rounded-full bg-gray-400" />
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
        <div className="mt-2 h-10 w-full rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
};
export const HotelSearchSkelleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-md bg-gray-200 p-4`}
    >
      <div>
        <div className="h-4 w-28 rounded-full bg-gray-400" />
        <div className="mt-2 h-5 w-full rounded-full bg-gray-400"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 w-36 rounded-full bg-gray-400" />
        <div className="mt-2 h-5 w-full rounded-full bg-gray-400"></div>
        <div className="mt-2 h-5 w-full rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
};

export const ImageSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative grid h-full w-full place-items-center overflow-hidden bg-gray-200`}
    >
      <svg
        className="aspect-square w-[10vw] text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  );
};

export const RoomCardSkeleton = () => {
  return (
    <div
      className={`relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border-2 p-4 md:flex-row ${shimmer}`}
    >
      {/* room gallery */}
      <div className="relative h-[180px] w-full overflow-hidden rounded-md bg-gray-300 sm:h-[230px] lg:h-[200px] lg:w-1/3" />

      {/* room information */}
      <div className="flex h-fit w-full flex-col justify-between gap-2 divide-y-2 sm:h-[230px] lg:h-[200px] lg:w-2/3">
        {/* room name */}
        <div className="w-full cursor-pointer space-y-2">
          <div className={`h-6 w-[80%] rounded bg-gray-300`} />
          <div className={`h-6 w-2/3 rounded bg-gray-300`} />
          <div className={`h-6 w-1/3 rounded bg-gray-300`} />
        </div>
      </div>
    </div>
  );
};
