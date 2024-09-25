import RegionCard from "./RegionCard";

type Slide = {
  id: number;
  imageUrl: string;
  cityName: string;
  tagLine: string;
  link: string;
  colSpan: string;
};

export default function ExploreIndiaSection() {
  const slides: Slide[] = [
    {
      id: 1,
      imageUrl: "https://images.staybook.in/website-images/jim-corbett_1.webp",
      cityName: "Jim Corbett",
      tagLine: "Discovering the Rich Wildlife of Jim Corbett.",
      link: "hotels-in-jim-corbett",
      colSpan: "md:col-span-5",
    },
    {
      id: 2,
      imageUrl: "https://images.staybook.in/website-images/jodhpur_1.webp",
      cityName: "Jodhpur",
      tagLine: "The Blue City of Rajasthan.",
      link: "hotels-in-jodhpur",
      colSpan: "md:col-span-3",
    },
    {
      id: 3,
      imageUrl: "https://images.staybook.in/website-images/dharamshala_1.webp",
      cityName: "Dharamshala",
      tagLine: "Essential Tips for Traveling to Dharamshala.",
      link: "hotels-in-dharamshala",
      colSpan: "md:col-span-4",
    },
    {
      id: 4,
      imageUrl: "https://images.staybook.in/website-images/nainital_1.webp",
      cityName: "Nainital",
      tagLine: "Charming Lakeside Retreats in Nainital.",
      link: "hotels-in-nainital",
      colSpan: "md:col-span-3",
    },
    {
      id: 5,
      imageUrl: "https://images.staybook.in/website-images/chandigarh_1.webp",
      cityName: "Chandigarh",
      tagLine: "Discovering the Charms of Chandigarh.",
      link: "hotels-in-chandigarh",
      colSpan: "md:col-span-4",
    },
    {
      id: 6,
      imageUrl:
        "https://images.staybook.in/website-images/mathura_1.webp",
      cityName: "Mathura",
      tagLine: "The Vibrant Colors of Mathura's Festivals.",
      link: "hotels-in-mathura",
      colSpan: "md:col-span-5",
    },
    {
      id: 7,
      imageUrl: "https://images.staybook.in/website-images/pushkar_1.webp",
      cityName: "Pushkar",
      tagLine: "Serene desert town, adorned with spirituality..",
      link: "hotels-in-pushkar",
      colSpan: "md:col-span-5",
    },
    {
      id: 8,
      imageUrl:
        "https://images.staybook.in/website-images/pahalgam_1.webp",
      cityName: "Pahalgam",
      tagLine: "Paradise nestled in Kashmir's valleys.",
      link: "hotels-in-pahalgam",
      colSpan: "md:col-span-3",
    },
    {
      id: 9,
      imageUrl:
        "https://images.staybook.in/website-images/mysore_1.webp",
      cityName: "Mysore",
      tagLine: "Historic city, palaces, vibrant markets.",
      link: "hotels-in-mysore",
      colSpan: "md:col-span-4",
    },
    {
      id: 10,
      imageUrl: "https://images.staybook.in/website-images/udaipur_1.webp",
      cityName: "Udaipur",
      tagLine: "Discover the Royal Heritage of Udaipur",
      link: "hotels-in-udaipur",
      colSpan: "md:col-span-3",
    },
    {
      id: 11,
      imageUrl:
        "https://images.staybook.in/website-images/jaisalmer_1.webp",
      cityName: "Jaisalmer",
      tagLine: "Unique Experiences to Have in Jaisalmer",
      link: "hotels-in-jaisalmer",
      colSpan: "md:col-span-4",
    },
    {
      id: 12,
      imageUrl: "https://images.staybook.in/website-images/kasauni_1.webp",
      cityName: "Kasauni",
      tagLine: "Kasauni - Discover the Serene Beauty of Kasauni",
      link: "hotels-in-kasauni",
      colSpan: "md:col-span-5",
    },
  ];

  return (
    <>
      <div className="wrapper h-full py-5">
        <h2 className="text-center font-dream text-2xl font-bold tracking-wider text-secondary md:text-left md:text-3xl lg:text-4xl">
          Explore India
        </h2>
        <div className=" mt-4 grid h-auto w-full grid-cols-2 gap-4 md:grid-cols-12 ">
          {slides.map((slide: Slide, index: number) => (
            <RegionCard
              key={index}
              link={slide.link}
              imageUrl={slide.imageUrl}
              cityName={slide.cityName}
              tagLine={slide.tagLine}
              colSpan={slide.colSpan}
            />
          ))}
        </div>
      </div>
    </>
  );
}
