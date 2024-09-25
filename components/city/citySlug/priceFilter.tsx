type Props = {
  min: number;
  max: number;
};

export default function CitySlugPriceFilter({ min, max }: Props) {
  return (
    <div className="flex cursor-pointer items-center py-1">
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="hidden" checked readOnly />
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border-2`}
        ></span>
      </label>
      <p className="pl-3">
        {max === 0
          ? `Upto ₹ ${min}`
          : max == 1
            ? `₹ ${min} +`
            : `₹ ${min} - ₹ ${max}`}
      </p>
    </div>
  );
}
