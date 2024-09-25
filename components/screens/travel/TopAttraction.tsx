export default function TopAttraction() {
  const topDestinations = [
    {
      locationId: "001",
      locationUrl: "",
      locationName: "Red Fort, Delhi",
      locationSlogan: "A Timeless Emblem of India's Majesty and Heritage",
    },
    {
      locationId: "002",
      locationUrl: "",
      locationName: "Hawa Mahal, Jaipur",
      locationSlogan: "Where history whispers through delicate windows",
    },
    {
      locationId: "003",
      locationUrl: "",
      locationName: "Taj Mahal, Agra",
      locationSlogan: "A Timeless Epitome of Beauty and Romance",
    },
    {
      locationId: "004",
      locationUrl: "",
      locationName: "Golden Temple, Amritsar",
      locationSlogan:
        "Radiating divine tranquility, where all to witness the spiritual heartbeat",
    },
    {
      locationId: "005",
      locationUrl: "",
      locationName: "Kashi Vishwanath, Kashi",
      locationSlogan:
        "In the ancient lanes of Varanasi, stands tall, a sacred ode to spirituality.",
    },
    {
      locationId: "006",
      locationUrl: "",
      locationName: "Jim Corbett National Park, Jim Corbett",
      locationSlogan:
        "Where the wild roams free - a sanctuary of untamed beauty and biodiversity.",
    },
    {
      locationId: "007",
      locationUrl: "",
      locationName: "Brahma Mandir, Pushkar",
      locationSlogan:
        "At the heart of Pushkar, a timeless marvel, welcomes seekers of spiritual solace.",
    },
    {
      locationId: "008",
      locationUrl: "",
      locationName: "Har ka Pauri, Haridwar",
      locationSlogan:
        "On the sacred banks of the Ganges, a divine confluence of ritual and reverence.",
    },
    {
      locationId: "009",
      locationUrl: "",
      locationName: "Hadimba Devi Temple, Manali",
      locationSlogan:
        "In the serene hills of Manali, a testament to divine beauty and tranquility.",
    },
    {
      locationId: "010",
      locationUrl: "",
      locationName: "Christ Church, Shimla",
      locationSlogan:
        "Nestled in Shimla's embrace, an architectural gem, echoes with tales of colonial charm and grace.",
    },
  ];
  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide mb-2">
        Our Cities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-4">
        {topDestinations.map((destination: any) => (
          <div
            key={destination.locationId}
            className="flex items-center gap-x-4"
          >
            <div className="w-24 aspect-square rounded-full overflow-hidden bg-green-500"></div>
            <div className="flex-1">
              <p className="font-bold tracking-wide">
                {destination.locationName}
              </p>
              <p>{destination.locationSlogan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
