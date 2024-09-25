import FallbackImage from "@/components/hotel/FallbackImage";
import Image from "next/image";
import Link from "next/link";

type Slides = {
  id: number;
  caption: string;
  imageUrl: string;
};

export default function TourNTravelSection() {
  const slides: Slides[] = [
    {
      id: 1,
      imageUrl: "https:/images.staybook.in/website-images/taj-mahal_1.webp",
      caption: "Slide 1",
    },
    {
      id: 2,
      imageUrl: "https://images.staybook.in/website-images/lotus-temple_1.webp",
      caption: "Slide 2",
    },
    {
      id: 3,
      imageUrl: "https://images.staybook.in/website-images/manali_1.webp",
      caption: "Slide 3",
    },
    {
      id: 4,
      imageUrl: "https://images.staybook.in/website-images/rajasthan_1.webp",
      caption: "Slide 3",
    },
  ];

  return (
    <>
      <div className="wrapper h-full py-5">
        <div className="flex flex-col items-center text-secondary md:flex-row">
          <div className="flex w-full flex-col items-center p-4 md:w-1/2 md:items-start">
            <p className="text-sm md:text-base">Discover, Wander, Thrive</p>
            <h2 className="my-2 border-b-2 pb-1 text-center font-dream text-2xl font-bold tracking-wider text-secondary md:text-left md:text-3xl lg:text-4xl">
              Tours & Travels
            </h2>
            <p className="text-sm md:text-base">
              Unleash Your Journey with Our Unique Tours!
            </p>
            <p className="mt-2 text-justify text-sm md:line-clamp-4 md:text-start md:text-base lg:line-clamp-none">
              Embark on a voyage of discovery with our exceptional tours that
              cater to every traveler&#39;s desire. Whether you seek cultural
              immersion, thrilling adventures, or serene escapes, our diverse
              range of tours promises an experience like no other. At Staybook,
              we craft journeys that transcend the ordinary, offering you a
              tapestry of memories woven with unique destinations and
              unparalleled experiences. Let your wanderlust thrive &hyphen; join
              us on a tour that speaks to your soul and leaves you with stories
              to cherish a lifetime.
            </p>
            <Link
              title="contactUs"
              href={"/contactUs"}
              className="mt-4 rounded bg-primary p-2 px-4 font-medium text-white"
            >
              Know More
            </Link>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 p-4 md:w-1/2">
            {slides.map((image: Slides, index: number) => (
              <div
                key={image.id}
                className="aspect-square w-full overflow-hidden"
              >
                {image.imageUrl == "" ? (
                  <FallbackImage />
                ) : (
                  <Image
                    alt={image.caption}
                    src={image.imageUrl}
                    width={300}
                    height={200}
                    className="h-full w-full rounded-xl object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
