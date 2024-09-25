import { useEffect, useState } from "react";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
type Props = {
  rating: number;
  setRatingState: any;
  ratingState: any;

  setTotalSelectedFilters: any;
  handleRemoveRatingFilters: any;
};

export default function RatingCard(props: Props) {
  const [checked, setchecked] = useState(false);

  const stars = Array.from({ length: props.rating }, (_, index: number) => (
    <StarIcon className="h-5 w-5 fill-yellow-500" key={index} />
  ));

  const handleCheckboxChange = () => {
    const isInState = props.ratingState.includes(props.rating);
    if (!isInState) {
      props.setRatingState((prevData: any) => [...prevData, props.rating]);
      setchecked(true);
    } else {
      props.setRatingState((prevData: any) =>
        prevData.filter((rating: any) => rating !== props.rating),
      );
      setchecked(false);
    }
  };

  // function to update local rating state
  useEffect(() => {
    const isInState = props.ratingState.includes(props.rating);
    if (isInState) {
      props.setTotalSelectedFilters((prevData: any) => {
        const isTitlePresent = prevData.some(
          (item: any) => item.title === `${props.rating}*`,
        );

        if (!isTitlePresent) {
          return [
            ...prevData,
            {
              title: `${props.rating}*`,
              value: props.rating,
              handleRemoveFilter: props.handleRemoveRatingFilters,
            },
          ];
        }

        return prevData;
      });

      setchecked(true);
    } else {
      props.setTotalSelectedFilters((prevData: any) =>
        prevData.filter((obj: any) => obj.title !== `${props.rating}*`),
      );

      setchecked(false);
    }
  }, [props.ratingState]);

  return (
    <div
      onClick={handleCheckboxChange}
      className="flex cursor-pointer items-center gap-1.5 py-1"
    >
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="hidden" checked={checked} readOnly />
        <span
          className={`flex h-5 w-5 items-center pointer-events-none justify-center rounded border-2 ${checked ? "bg-primary border-primary" : "bg-white"}`}
        >
          {checked && (
            <CheckIcon className="w-5 h-5 fill-lightText" />
          )}
        </span>
      </label>
      <p className="whitespace-nowrap">{props.rating} Star</p>
      <div className="flex">{stars}</div>
    </div>
  );
}
