import Image from "next/image";

export default function LandingSection() {
  return (
    <div className="relative h-[320px] w-full lg:h-[400px]">
      <div className="absolute inset-x-0 h-[320px] bg-secondary lg:h-[400px]">
        {/* <Image
          alt={"banner_Image"}
          src={"https://images.staybook.in/hotel_banner.jpg"}
          width={1000}
          height={600}
          className="w-full h-full object-cover"
          priority
        /> */}
      </div>
      <div className="wrapper relative pt-24">
        <div className="text-center text-white sm:text-left">
          <h1 className="w-fit font-dream text-7xl sm:text-6xl lg:text-9xl">
            Staybook
          </h1>
          <p className="text-sm tracking-wide sm:text-xl">
            Where Every Stay Tells a Story. Premium Hotels, Travel Packages,
            Your Chapter of Luxury
          </p>
        </div>
      </div>
    </div>
  );
}
