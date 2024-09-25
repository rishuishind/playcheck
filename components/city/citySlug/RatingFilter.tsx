import { StarIcon } from "@heroicons/react/solid";

type Props = {
  rating: number;
};

export default function CitySlugRatingFilter({ rating }: Props) {
  const stars = Array.from({ length: rating }, (_, index: number) => (
    <StarIcon className="h-5 w-5 fill-yellow-500" key={index} />
  ));

  return (
    <div
      // onClick={handleCheckboxChange}
      className="flex cursor-pointer items-center gap-1.5 py-1"
    >
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="hidden" checked readOnly />
        <span
          className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded border-2`}
        ></span>
      </label>
      <p className="whitespace-nowrap">{rating} Star</p>
      <div className="flex">{stars}</div>
    </div>
  );
}
