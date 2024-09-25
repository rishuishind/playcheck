export default function LandingSection() {
  return (
    <div className="relative h-[30vh] lg:h-[40vh] xl:h-[50vh] w-full">
      <div className="absolute inset-0 bg-secondary">
        {/* <Image
          alt={"banner_Image"}
          src={"https://images.staybook.in/banner.jpg"}
          width={1920}
          height={1280}
          className="w-full h-full object-cover"
          priority
        /> */}
      </div>
      <div className="relative container mx-auto h-full pt-12 lg:pt-24 p-4 md:px-10 xl:px-0">
        <h1 className="font-dream text-6xl md:text-[10vw] text-white tracking-wide text-center">
          Staybook
        </h1>
        <p className="text-sm sm:text-xl font-medium tracking-wide text-white text-center px-4">
          Where Every Stay Tells a Story. Premium Hotels, Travel Packages, Your
          Chapter of Luxury
        </p>
      </div>
    </div>
  );
}
