import Image from "next/image";
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <>
      <div className="h-full w-full bg-light py-5">
        <div className="wrapper flex w-full flex-col gap-7 md:flex-row">
          <div className="relative grid h-full w-full place-items-center md:w-[40%] lg:w-1/3">
            <Image
              title="aboutus_image"
              alt="aboutus_image"
              src="/undraw_team_work.svg"
              width={320}
              height={320}
              className="md:h-[360px] md:w-[360px]"
              priority
            />
          </div>

          <div className="flex flex-col items-center justify-center p-4 text-center md:w-[60%] md:items-start md:px-0 md:text-start lg:w-2/3">
            <h2 className="border-b font-dream border-secondary text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl">
              Know More About Us!
            </h2>
            <p className="mt-1 text-sm">
              Every journey deserves the touch of expertise
            </p>
            <p className="mt-2 text-sm">
              At Staybook, our commitment extends beyond providing exceptional
              tours. With a passion for curating unforgettable journeys, we
              bring together a team of seasoned travel experts dedicated to
              crafting seamless and enriching experiences.
            </p>
            <Link
              title="aboutUs"
              href="/aboutus"
              className="mt-4 rounded bg-primary p-2 px-4 font-medium text-white"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
