import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

type Props = {
  amenityId: string;
  amenityName: string;
  amenityFilters: any;
  setAmenityFilters: any;
  setTotalSelectedFilters: any;
  handleRemoveAmenityFilters: any;
};

export default function AmenityCard(props: Props) {
  const [checked, setchecked] = useState(false);

  const handleClick = () => {
    const isInState = props.amenityFilters.includes(props.amenityName);

    if (!isInState) {
      props.setAmenityFilters((prevData: any) => [
        ...prevData,
        props.amenityName,
      ]);
      setchecked(true);
    } else {
      props.setAmenityFilters((prevData: any) =>
        prevData.filter((data: any) => data != props.amenityName),
      );
      setchecked(false);
    }
  };

  useEffect(() => {
    const isInState = props.amenityFilters.includes(props.amenityName);

    if (isInState) {
      props.setTotalSelectedFilters((prevData: any) => {
        const isTitlePresent = prevData.some(
          (item: any) => item.title == props.amenityName,
        );

        if (!isTitlePresent) {
          return [
            ...prevData,
            {
              title: props.amenityName,
              value: props.amenityName,
              handleRemoveFilter: props.handleRemoveAmenityFilters,
            },
          ];
        }

        return prevData;
      });

      setchecked(true);
    } else {
      props.setTotalSelectedFilters((prevData: any) =>
        prevData.filter((obj: any) => obj.title != props.amenityName),
      );

      setchecked(false);
    }
  }, [props.amenityFilters]);

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center py-1"
    >
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="hidden" checked={checked} readOnly />
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${checked ? "border-primary bg-primary" : "bg-white"}`}
        >
          {checked && <CheckIcon className="h-5 w-5 fill-lightText" />}
        </span>
      </label>
      <p className="pl-3">{props.amenityName}</p>
    </div>
  );
}
