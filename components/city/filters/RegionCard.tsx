import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

type Props = {
  regionData: any;
  regionSlug: string;
  regionFilters: any;
  setRegionFilters: any;

  setTotalSelectedFilters: any;
  handleRemoveRegionFilters: any;
};

export default function RegionCard(props: Props) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    props.setRegionFilters([props.regionSlug]);
    setChecked(true);
  };

  useEffect(() => {
    const isInState = props.regionFilters.includes(props.regionSlug);

    if (isInState) {
      props.setTotalSelectedFilters((prevData: any) => {
        const isTitlePresent = prevData.some(
          (item: any) => item.value == props.regionSlug,
        );

        if (!isTitlePresent) {
          return [
            ...prevData,
            {
              title: props.regionData.hotelCityRegion_Slug_Name,
              value: props.regionSlug,
              handleRemoveFilter: props.handleRemoveRegionFilters,
            },
          ];
        }

        return prevData;
      });

      setChecked(true);
    } else {
      props.setTotalSelectedFilters((prevData: any) =>
        prevData.filter((obj: any) => obj.value != props.regionSlug),
      );

      setChecked(false);
    }
  }, [props.regionFilters]);

  return (
    <label
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1.5"
    >
      <input type="radio" className="peer hidden" checked={checked} readOnly />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border-2 ${checked ? "border-primary bg-primary" : "bg-white"}`}
      >
        {checked && <CheckIcon className="h-5 w-5 fill-lightText" />}
      </span>
      <div className="tracking-wide">
        <p>{props.regionData.hotelCityRegion_Name}</p>
      </div>
    </label>
  );
}
