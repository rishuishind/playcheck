import Image from "next/image";
import CustomHead from "@/components/header/CustomHead";
import {
  ABOUT_US_PAGE_META_DESCRIPTION,
  ABOUT_US_PAGE_TAB_TITLE,
  ABOUT_US_URL,
  LOGO_IMAGE_URL1,
} from "@/lib/helper";
import { aboutCompany, aboutValues } from "@/lib/constantData";
import { useEffect, useState } from "react";

export default function AboutUsPage() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <>
      <CustomHead
        metaShowTitle={ABOUT_US_PAGE_TAB_TITLE}
        metaDescription={ABOUT_US_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${ABOUT_US_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={"https://images.staybook.in/pexels-marc-mueller.jpg"}
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <div className="relative grid h-full w-full place-items-center p-4  text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                About Us
              </h1>
              <p className="text-sm font-medium md:text-base">
                Crafting Memorable Experiences for You
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          <div className="my-4 md:text-center">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Our Company
            </h2>
            {aboutCompany.map((para: string, index: number) => (
              <p key={index} className="py-1 text-sm md:text-base">
                {para}
              </p>
            ))}
          </div>

          <div className="my-4">
            <h2 className="text-center text-lg font-bold text-secondary">
              Our Values Makes us Special
            </h2>
            <div className="mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {aboutValues.map((value: any, index: number) => (
                <div
                  key={index}
                  className="relative flex w-full flex-col items-center gap-4 rounded-xl bg-white p-4 text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)]"
                >
                  <div className="grid w-20 place-items-center rounded-full bg-secondary p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.2)]">
                    <Image
                      src={value.icon}
                      width={60}
                      height={60}
                      alt={`${value.title} icon`}
                    />
                  </div>
                  <p className="text-sm font-bold md:text-base lg:text-lg">
                    {value.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Our Mission
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/2.jpg"
                  unoptimized={true}
                  width={160}
                  height={90}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <p>
                  Our mission is to enhance hospitality service to the highest
                  possible level in order to satisfy guest&apos;s expectations
                  for better quality service. Staybook hotels are affordable for
                  everyone while also providing safe, secure, and memorable
                  experiences. Our each staff member feels a sense of dignity,
                  pride, and satisfaction in our work. as satisfying guests
                  requires the combined efforts of many people
                </p>
                <p>
                  We look forward to going the extra mile to build long-lasting
                  relationships with our customers.
                </p>
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Our Vision
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="aspect-video w-full lg:order-2 lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/3.jpg"
                  unoptimized={true}
                  width={160}
                  height={90}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <p>
                  Our long-term goal is to be the recommended as affordable
                  hotel chain. When a guest plans a trip or when someone is
                  looking for luxurious rooms at a low cost, they will all think
                  of Staybook hotels first. To keep nature in balance, we are
                  constantly introducing products that are sustainable,effective
                  and have value for money.
                </p>
              </div>
            </div>
          </div>

          <div className="my-4">
            <div className="relative grid w-full place-items-center rounded-xl bg-black/20 py-4 text-black">
              <div className="p-4 text-center">
                <h2 className="mb-1 text-lg font-bold">Our Mission</h2>
                <p className="text-sm font-medium md:text-lg">
                  There are perfect rooms for every traveler, no two rooms are
                  alike, and each one is unique in itself. All rooms are
                  furnished with wooden furniture and feature wooden or marble
                  floors, private bathrooms, a hairdryer, a free welcome water
                  bottle, rooftop restaurants, Indian & Continental buffet
                  breakfast, currency exchange, a new sim card for foreigners
                  (surcharge), airport shuttle (surcharge), 24 hr help desk,
                  room service, cleaning on request, hot water to drink, hot
                  water for a bath, satellite TV, free internet across all hotel
                  premises and most of them a balcony. Book any rooms with
                  special offers and get lower prices and extra amenities for
                  your best accommodations near your city. Staybook also offers
                  pet friendly hotels with every possible requirements for your
                  better stay.
                </p>
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Testimonials
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:order-2 lg:w-1/2">
                <p>
                  We also accept corporate and bulk hotels room bookings.
                  Previously we have collaborated with Excel
                  Entertainment&apos;s &quot;Farhan Akhtar Venture&quot; on the
                  films Fukrey 3 and many other projects such as Shahzada,
                  Rolla, and Splitsvilla, Yash Raj Films and Maddock Films,
                  Byjus and Ed-Tech Company, Zuventus Mendicity, and Tata Group.
                  During the pandemic we provided accommodation, food, and
                  transportation for Lady Hardinge Medical College and RML staff
                  so that they could c lg:w-1/2ontribute to the nation.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/6.jpg"
                  width={160}
                  height={90}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Honesty
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/2">
                <p>
                  Truthfulness and honesty are two different words that have the
                  same meaning. Our team is straightforward enough as Staybook
                  displays what we can offer our customers, we know that being
                  honest makes our guests happy as this makes them believe they
                  are in the right place, which brings peace of mind and
                  calmness we are here to become the family with guests so that
                  they can be our regular visitors and always choose us for
                  their next visit. Hotels booking is one of the difficult when
                  it comes your family lg:w-1/2 that why we make entire booking
                  process easy and fast with 24/7 customer support.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/4.jpg"
                  width={160}
                  height={90}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Playful
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:order-2 lg:w-1/2">
                <p>
                  Our staff is the strongest pillar of staybook. We always make
                  every effort possible to create the best atmosphere at
                  staybook for not only our guests but also for our staff
                  because any hospitality chain or a single hotel can stand in
                  the market simply because of its staff. We celebrate with all
                  our team staff from the ground team to the team behind ground
                  zero. its a task for our staff to satisfy our guest when they
                  receive a positive feedback they feel motivated and
                  enthusiastic towards lg:w-1/2 their work even negative
                  feedback&apos;s are also important just because it is a
                  challenge for us and our staff and it&apos;s a learning that
                  how can we improve our standards.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/8.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Affordability
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/2">
                <p>
                  Overspend mostly people fall in the trap of this as might
                  people thinks higher expenditure can provides you the best
                  services sometime they land in the correct hand sometimes not,
                  but no likes to do this on budgeted trip or a vacation this is
                  the reason they we always wanted to be affordable hotel chain
                  so that people can spend the correct amount to get the best
                  services, luxurious rooms to have a perfect good night sleep.
                  We are offering you many low price hotels near new Delhi
                  railway station with lg:w-1/2 best of our services.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/9.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Generosity
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:order-2 lg:w-1/2">
                <p>
                  “Act of giving” we try to give perfect treatment that the
                  guest expects, from providing support in medical conditions or
                  emergency transport. We are here to build a family-like
                  atmosphere. We know there could be any requirement of guests
                  and we are ready to solve this unlike others where every
                  service has hidden charges where everything is looked at in
                  terms of the profits. We just want to give every possible
                  thing that we can perform so that we can gain one and only
                  thing is the trust o lg:w-1/2f the guest which is all.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/10.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Consistency
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/2">
                <p>
                  We always try to be consistent day in and day out with budget
                  hotels in Delhi. we provide the best services and standards at
                  lowest price in Delhi. We are among Delhi&apos;s best hotel
                  chain which is consistently delivering top class service like
                  five star so why to spend more. Our aim is to give to be
                  consistently better stay at hotels in the best locations of
                  Delhi. India is full of happening places and historical
                  destination, there are so many best places to visit in India
                  such as Paharganj, L lg:w-1/2al Quila, Qutub Minar, Connught
                  Palce, Hauz Khas, Lotus Temple and many more.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/11.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Simplicity
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:order-2 lg:w-1/2">
                <p>
                  We have a lot of complications in our daily life, we
                  don&apos;t want to make your hotel stays experience
                  complicated that why we tries to build simple check-in,
                  check-out services, just provide your ids one signature and
                  you are ready to go or Guest can perform self check-in from
                  their phone via mail send at the time booking to the
                  registered email id. After the check in you will find each and
                  everything in your room that is needed the most for perfect
                  sta lg:w-1/2y.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/12.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl border-4 border-rose-400 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Customer Oriented
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/2">
                <p>
                  Staybook is a customer-oriented hotel chain, it places a
                  strong emphasis on providing excellent service and experiences
                  for its guests. Offering a range of amenities and services to
                  make the stay enjoyable and comfortable, such as comfortable
                  and clean rooms, welcoming and helpful staff, and a variety of
                  activities and facilities. Staybook also works to be
                  responsive to the needs and preferences of its guests, and
                  strives to resolve any issues or problems that may arise
                  during stay. By cons lg:w-1/2istently delivering a positive
                  and memorable experience we built a loyal customer base and
                  established a strong reputation in the industry.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/13.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Innovative
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:order-2 lg:w-1/2">
                <p>
                  Often people say, we are an innovative hotel chain that is
                  willing to try new approaches and technologies in order to
                  improve the experience of the guests, involving introducing
                  new amenities and services, such as advanced room booking
                  systems, express check-in and check-out, order food &
                  beverages with your mobile from your room, Modify booking,
                  add-on breakfast, lunch & dinner in your booking yourself, Pay
                  through credit card or debit card or payment link and virtual
                  concierge services. lg:w-1/2We also incorporate sustainable
                  and eco-friendly practices, such as using energy-efficient
                  lighting and appliances, offering eco-friendly guest
                  amenities, and implementing waste reduction and recycling
                  programs. By staying ahead of industry trends and continuously
                  seeking ways to improve the guest experience.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/14.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="mb-1 text-center text-lg font-bold text-secondary lg:mb-4 lg:text-3xl">
              Community
            </h2>
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/2">
                <p>
                  Staybook builds a strong community of our guests, it is
                  important for us to provide high-quality services and
                  amenities, as well as to actively engage with our guests and
                  local community and we did perfectly, including hosting
                  events, supporting local charities and organizations, and
                  promoting local and attractions.
                </p>
                <p>
                  Customer base and ar lg:w-1/2e able to attract new guests
                  through word-of-mouth recommendations and positive online
                  reviews.
                </p>
              </div>
              <div className="aspect-video w-full lg:w-1/2">
                <Image
                  src="https://images.staybook.in/About/15.jpg"
                  unoptimized={true}
                  width={50}
                  height={50}
                  alt="art"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
