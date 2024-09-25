import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

type Props = {
  priceIndex: number;
  minPrice: any;
  maxPrice: any;
  priceFilters: any;
  setPriceFilters: any;

  setTotalSelectedFilters: any;
  handleRemovePriceFilters: any;
};

export default function PriceCard(props: Props) {
  const [checked, setchecked] = useState(false);

  const priceText =
    props.maxPrice === 0
      ? `Upto ₹ ${props.minPrice}`
      : props.maxPrice == 1
        ? `₹ ${props.minPrice} +`
        : `₹ ${props.minPrice} - ₹ ${props.maxPrice}`;

  const handleClick = () => {
    const isInState = props.priceFilters.includes(props.priceIndex);

    if (!isInState) {
      props.setPriceFilters((prevData: any) => [...prevData, props.priceIndex]);
      setchecked(true);
    } else {
      props.setPriceFilters((prevData: any) =>
        prevData.filter((price: any) => price !== props.priceIndex),
      );
      setchecked(false);
    }
  };

  useEffect(() => {
    const isInState = props.priceFilters.includes(props.priceIndex);

    if (isInState) {
      props.setTotalSelectedFilters((prevData: any) => {
        const isTitlePresent = prevData.some((item: any) => {
          return item.uniqueId == props.priceIndex + "p";
        });

        if (!isTitlePresent) {
          return [
            ...prevData,
            {
              title:
                props.maxPrice === 0
                  ? `0 - ${props.minPrice}`
                  : props.maxPrice === 1
                    ? `${props.minPrice} +`
                    : `${props.minPrice} - ${props.maxPrice}`,
              value: props.priceIndex,
              uniqueId: props.priceIndex + "p",
              handleRemoveFilter: props.handleRemovePriceFilters,
            },
          ];
        }

        return prevData;
      });

      setchecked(true);
    } else {
      props.setTotalSelectedFilters((prevData: any) =>
        prevData.filter((obj: any) => obj.uniqueId != props.priceIndex + "p"),
      );

      setchecked(false);
    }
  }, [props.priceFilters]);

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
      <p className="pl-3">{priceText}</p>
    </div>
  );
}
