import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full h-16 sticky top-0 inset-x-0 z-20 bg-secondary text-white">
      <div className="wrapper h-full flex items-center justify-between">
        {/* brand logo */}
        <Link href="/" title="home" className="block w-10 h-10">
          <Image
            alt="home"
            src={"/brand_logo.svg"}
            className="w-full h-full"
            width={32}
            height={32}
            priority
          />
        </Link>

        <div className="space-x-2 font-bold tracking-wider flex items-center justify-between gap-2.5">
          <Link title="home" href={"/"}>Home</Link>
          <Link title="home" href={"/hotels"}>Hotels</Link>
        </div>
      </div>
    </div>
  );
}
