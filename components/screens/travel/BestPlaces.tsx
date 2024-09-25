import Image from "next/image";

export default function BestPlaces() {
  const destinations = [
    {
      locationId: "001",
      imageUrl: "",
      placeName: "Manali",
      visitTime: "Best time to visit: March to June",
      placesToVisit: [
        {
          id: "01",
          name: "Hadimba Temple",
        },
        {
          id: "02",
          name: "Museum of Himachal Culture & Folk Art",
        },
        {
          id: "01",
          name: "Van Vihar National Park",
        },
        {
          id: "01",
          name: "Jogini Waterfall",
        },
        {
          id: "01",
          name: "Solang Valley",
        },
      ],
      placeAbout:
        "Manali, nestled in the Himalayas, is a haven for nature enthusiasts and adventure seekers. Surrounded by snow-capped peaks and lush valleys, it offers a perfect blend of scenic beauty and thrilling activities.",
    },
    {
      locationId: "002",
      imageUrl: "",
      placeName: "Jaipur",
      visitTime: "Best time to visit: October to March",
      placesToVisit: [
        {
          id: "01",
          name: "Hawa Mahal",
        },
        {
          id: "01",
          name: "City Palace",
        },
        {
          id: "01",
          name: "Amber Fort",
        },
        {
          id: "01",
          name: "Jantar Mantar",
        },
        {
          id: "01",
          name: "Nahargarh Fort",
        },
      ],
      placeAbout:
        "Jaipur, the 'Pink City,' is a captivating blend of royal palaces, vibrant markets, and timeless architecture. Immerse yourself in the regal history and colorful culture of Rajasthan.",
    },
    {
      locationId: "003",
      imageUrl: "",
      placeName: "Jammu & Kashmir",
      visitTime: "Best time to visit: April to September",
      placesToVisit: [
        {
          id: "01",
          name: "Dal Lake",
        },
        {
          id: "02",
          name: "Gulmarg",
        },
        {
          id: "03",
          name: "Pahalgam",
        },
        {
          id: "04",
          name: "Shankaracharya Temple",
        },
        {
          id: "05",
          name: "Betaab Valley",
        },
      ],
      placeAbout:
        "Jammu & Kashmir, often referred to as 'Paradise on Earth,' captivates with its snow-capped peaks, pristine lakes, and charming valleys. A land of breathtaking beauty and tranquility.",
    },
    {
      locationId: "004",
      imageUrl: "",
      placeName: "Goa",
      visitTime: "Best time to visit: November to February",
      placesToVisit: [
        {
          id: "01",
          name: "Baga Beach",
        },
        {
          id: "02",
          name: "Fort Aguada",
        },
        {
          id: "03",
          name: "Dudhsagar Waterfalls",
        },
        {
          id: "04",
          name: "Calangute Beach",
        },
        {
          id: "05",
          name: "Old Goa Churches",
        },
      ],
      placeAbout:
        "Goa, the 'Pearl of the Orient,' is renowned for its sun-kissed beaches, vibrant nightlife, and Portuguese-influenced architecture. A perfect blend of relaxation and excitement.",
    },
    {
      locationId: "005",
      imageUrl: "",
      placeName: "Mussoorie",
      visitTime: "Best time to visit: March to June",
      placesToVisit: [
        {
          id: "01",
          name: "Kempty Falls",
        },
        {
          id: "02",
          name: "Gun Hill",
        },
        {
          id: "03",
          name: "Camel's Back Road",
        },
        {
          id: "04",
          name: "Lal Tibba",
        },
        {
          id: "05",
          name: "Cloud's End",
        },
      ],
      placeAbout:
        "Mussoorie, the 'Queen of Hills,' offers a refreshing escape with its cool climate, lush landscapes, and colonial charm. A perfect retreat for those seeking serenity and natural beauty.",
    },
    {
      locationId: "006",
      imageUrl: "",
      placeName: "Udaipur",
      visitTime: "Best time to visit: October to March",
      placesToVisit: [
        {
          id: "01",
          name: "City Palace",
        },
        {
          id: "02",
          name: "Lake Pichola",
        },
        {
          id: "03",
          name: "Jag Mandir",
        },
        {
          id: "04",
          name: "Jagdish Temple",
        },
        {
          id: "05",
          name: "Saheliyon Ki Bari",
        },
      ],
      placeAbout:
        "Udaipur, the 'City of Lakes,' exudes romantic charm with its exquisite palaces, tranquil lakes, and vibrant markets. A destination that transports you to the era of Rajput royalty.",
    },
    {
      locationId: "007",
      imageUrl: "",
      placeName: "Shimla",
      visitTime: "Best time to visit: May to June/ December to January",
      placesToVisit: [
        {
          id: "01",
          name: "The Ridge",
        },
        {
          id: "02",
          name: "Green Valley",
        },
        {
          id: "03",
          name: "Mall Road",
        },
        {
          id: "04",
          name: "Jakhoo Hill",
        },
        {
          id: "05",
          name: "Christ Church",
        },
      ],
      placeAbout:
        "Shimla, the 'Queen of the Hills,' captivates with its colonial architecture, panoramic views, and snow-clad peaks. A timeless destination that offers a blend of history and natural beauty.",
    },
    {
      locationId: "008",
      imageUrl: "",
      placeName: "Amritsar",
      visitTime: "Best time to visit: October to March",
      placesToVisit: [
        {
          id: "01",
          name: "Golden Temple",
        },
        {
          id: "02",
          name: "Jallianwala Bagh",
        },
        {
          id: "03",
          name: "Wagah Border",
        },
        {
          id: "04",
          name: "Akal Takht",
        },
        {
          id: "05",
          name: "Durgiana Temple",
        },
      ],
      placeAbout:
        "Amritsar, the spiritual heart of Punjab, beckons with the iconic Golden Temple, vibrant markets, and a rich cultural heritage. A city that resonates with history, spirituality, and warm hospitality.",
    },
  ];

  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide mb-2">
        Best Destinations to Visit in India
      </h2>
      <div className="w-full bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.2)] grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl p-3">
        {destinations.map((trip: any) => (
          <div
            key={trip.locationId}
            className="w-full bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.2)] overflow-hidden rounded-lg p-3"
          >
            <div className="flex items-start flex-col sm:flex-row">
              <div className="sm:w-40 w-full aspect-video sm:aspect-square rounded-lg bg-green-500"></div>
              <div className="px-3">
                <strong>{trip.placeName}</strong>
                <p>
                  <span className="text-secondary font-bold">
                    Best time to visit:
                  </span>{" "}
                  {trip.visitTime}
                </p>
                <p className="font-bold text-secondary tracking-wide">
                  Best Places tp visit:
                </p>
                {trip.placesToVisit.map((place: any) => (
                  <p key={place.id} className="text-xs font-medium">
                    {place.name}
                  </p>
                ))}
              </div>
            </div>
            <p className="pt-2">{trip.placeAbout}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
