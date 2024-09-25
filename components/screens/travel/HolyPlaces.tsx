export default function HolyPlaces() {
  const holyPlaces = [
    {
      locationId: "001",
      locationUrl: "",
      locationName: "Mathura",
    },
    {
      locationId: "002",
      locationUrl: "",
      locationName: "Ajmer",
    },
    {
      locationId: "003",
      locationUrl: "",
      locationName: "Mukteshwar",
    },
    {
      locationId: "004",
      locationUrl: "",
      locationName: "Haridwar",
    },
    {
      locationId: "005",
      locationUrl: "",
      locationName: "Ayodhya",
    },
    {
      locationId: "006",
      locationUrl: "",
      locationName: "Rishikesh",
    },
    {
      locationId: "007",
      locationUrl: "",
      locationName: "Haridwar",
    },
    {
      locationId: "008",
      locationUrl: "",
      locationName: "Ayodhya",
    },
    {
      locationId: "009",
      locationUrl: "",
      locationName: "Rishikesh",
    },
  ];
  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide mb-2">
        Holy places in India
      </h2>
      <div className="flex overflow-x-scroll gap-4 container-snap">
        {holyPlaces.map((place: any) => (
          <div
            key={place.locationId}
            className="min-w-[160px] flex flex-col items-center"
          >
            <div className="w-28 aspect-square rounded-full bg-green-500"></div>
            <p className="font-bold tracking-wide">{place.locationName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
