type PageProps = {
  heading: string;
  margin: string;
  cityInfo: any;
};

export default function DescriptionUiCard({
  cityInfo,
  heading,
  margin,
}: PageProps) {
  return (
    <div className={`${margin} rounded-xl bg-primary/40 p-4 text-center`}>
      <h2 className="text-xl font-bold tracking-wide">{heading}</h2>
      <h3 className="line-clamp-[7] tracking-wide">
        {cityInfo === null
          ? "Description coming soon"
          : cityInfo.hotelCity_Description}
      </h3>
    </div>
  );
}
