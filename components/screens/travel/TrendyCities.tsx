import React from "react";

type Props = {};

export default function TrendyCities({}: Props) {
  const trndyCities = [
    {
      locationId: "001",
      locationUrl: "",
      locationName: "Mathura, Uttar Pradesh",
      locationSlogan:
        "Mathura, the sacred city on the banks of the Yamuna River, is revered as the birthplace of Lord Krishna. With ancient temples, vibrant ghats, and a spiritual aura, it invites pilgrims and history enthusiasts to experience the cultural heartbeat of India.",
    },
    {
      locationId: "002",
      locationUrl: "",
      locationName: "Haridwar, Uttarakhand",
      locationSlogan:
        "Haridwar, the 'Gateway to the Gods,' invites you to its sacred ghats along the Ganges. Immerse yourself in spirituality, witness the Ganga Aarti, and experience the profound energy of this holy city.",
    },
    {
      locationId: "003",
      locationUrl: "",
      locationName: "Lucknow, Uttar Pradesh",
      locationSlogan:
        "Lucknow, the 'City of Nawabs,' enchants with its elegant architecture, culinary delights, and rich cultural heritage. Explore the royal past, savor exquisite kebabs, and embrace the grace of this historic city.",
    },
    {
      locationId: "004",
      locationUrl: "",
      locationName: "Nainital, Uttarakhand",
      locationSlogan:
        "Nestled in the Kumaon foothills, Nainital beckons with its emerald lake and panoramic views of the Himalayas. Discover tranquility in the midst of nature, embark on boat rides, and relish the charm of the 'City of Lakes.",
    },
    {
      locationId: "005",
      locationUrl: "",
      locationName: "Ambala, Punjab",
      locationSlogan:
        "Ambala, a vibrant city in Haryana, bridges the gap between tradition and modernity. Famous for its military cantonment and vibrant bazaars, Ambala offers a glimpse into the dynamic cultural fabric of northern India.",
    },
    {
      locationId: "006",
      locationUrl: "",
      locationName: "JUdaipur, Rajasthan",
      locationSlogan:
        "Udaipur, the 'City of Lakes,' beckons with its enchanting blend of regal palaces, serene lakes, and vibrant markets. Immerse yourself in a tapestry of rich history and breathtaking landscapes in this romantic jewel of Rajasthan.",
    },
  ];
  return (
    <div className="wrapper h-full py-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-dream text-secondary font-bold tracking-wide mb-2">
        Trendy cities in India
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trndyCities.map((city: any) => (
          <div
            key={city.locationId}
            className="bg-white rounded-xl overflow-hidden p-4 text-center shadow-[0px_0px_7px_rgba(0,0,0,0.2)]"
          >
            <div className="w-full aspect-video rounded bg-green-500"></div>
            <div className="p-2">
              <p className="font-bold tracking-wide">{city.locationName}</p>
              <p className="text-sm sm:text-base line-clamp-4">
                {city.locationSlogan}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
