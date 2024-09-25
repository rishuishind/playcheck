export default function HolidayPlan() {
  const tripDestinations = [
    {
      locationId: "001",
      locationUrl: "",
      locationName: "Manali",
    },
    {
      locationId: "002",
      locationUrl: "",
      locationName: "Mussoorie",
    },
    {
      locationId: "003",
      locationUrl: "",
      locationName: "Jammu & Kashmir",
    },
    {
      locationId: "004",
      locationUrl: "",
      locationName: "Shimla",
    },
    {
      locationId: "005",
      locationUrl: "",
      locationName: "Goa",
    },
    {
      locationId: "006",
      locationUrl: "",
      locationName: "Jodhpur",
    },
    {
      locationId: "007",
      locationUrl: "",
      locationName: "Manali",
    },
    {
      locationId: "008",
      locationUrl: "",
      locationName: "Mussoorie",
    },
    {
      locationId: "009",
      locationUrl: "",
      locationName: "Jammu & Kashmir",
    },
    {
      locationId: "010",
      locationUrl: "",
      locationName: "Shimla",
    },
    {
      locationId: "011",
      locationUrl: "",
      locationName: "Goa",
    },
    {
      locationId: "012",
      locationUrl: "",
      locationName: "Jodhpur",
    },
  ];

  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide mb-2">
        Make your Holiday trip
      </h2>
      <div className="w-full columns-1 sm:columns-2 lg:columns-3 space-y-4">
        {tripDestinations.map((trip: any) => {
          const generateAspectRatio = () => {
            const randomValue = Math.random() * 26;
            if (randomValue > 20) {
              return "aspect-square";
            } else if (randomValue < 10) {
              return "aspect-video";
            } else {
              return "aspect-[4/3]";
            }
          };
          const aspectRatioClass = generateAspectRatio();

          return (
            <div
              key={trip.id}
              className={`${aspectRatioClass} w-full bg-green-500 relative overflow-hidden rounded-lg`}
            >
              <p className="absolute inset-x-0 bottom-0 p-4 font-bold tracking-wide text-white">
                {trip.locationName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
