import Image from "next/image";
import Link from "next/link";

export default function PopularDestinationSection() {
  return (
    <div className="wrapper h-full py-5">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:w-1/2 lg:order-2 text-center lg:text-left text-sm md:text-base space-y-1">
          <h2 className="text-2xl md:text-3xl lg:text-left lg:text-4xl text-secondary border-secondary font-dream underline underline-offset-[10px] font-bold tracking-wide">
            Our Popular Destination
          </h2>
          <p className="text-secondary font-medium">
            Where Your Journy Begins, Our Hotel Await!
          </p>
          <p>
            Embark on a seamless travel experience with Staybook, your gateway
            to a network of exquisite hotels across the diverse landscapes of
            India. From the majestic mountains of the north to the sun-kissed
            beaches of the south, our accommodations are strategically placed to
            offer you a perfect stay at every destination. Choose your dream
            getaway with confidence, and let Staybook be your companion in
            crafting unforgettable memories. Your adventure starts here, your
            stay, our priority.
          </p>
          <Link
            title="contact"
            href={"/contactUs"}
            className="inline-block w-fit p-2 px-4 rounded bg-primary text-white font-medium"
          >
            Know More
          </Link>
        </div>
        <div className="w-full aspect-square lg:w-1/2">
          <Image
            title="Indian_map"
            alt="Indian_map"
            src="/indiaMap.svg"
            width={200}
            height={200}
            className="w-full h-full aspect-square object-cover"
          />
        </div>
      </div>
    </div>
  );
}
