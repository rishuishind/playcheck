import { EVISA_URL, HOTELS_URL } from "@/lib/helper";
import { MenuAlt4Icon, UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <header
      id="NavBar"
      className="relative z-50 grid h-16 place-items-center bg-secondary"
    >
      <div className="wrapper flex items-center justify-between">
        {/* brandLogo */}
        <div className="flex items-center gap-1">
          <Link
            rel="preload"
            href="/"
            title="home page link"
            className="relative block h-11 w-11 overflow-hidden rounded-full bg-gray-400"
          >
            <Image
              alt="home"
              title="brand logo"
              src={"/brand_logo.svg"}
              className="h-full w-full object-cover"
              width={44}
              height={44}
              priority
            />
          </Link>
          <p className="font-dream text-xl font-bold text-white">Staybook</p>
        </div>

        {/* navLinks   for mobile*/}
        <nav
          className="relative flex cursor-pointer items-center gap-1 rounded-full border-2 p-1.5 pr-3 md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="">
            <UserCircleIcon className="text-white` h-8 w-8" />
          </div>

          <button className="">
            <span className="sr-only">Menu</span>
            <MenuAlt4Icon className="h-8 w-8 fill-primary" />
          </button>

          {showMenu && (
            <>
              <div
                onClick={() => setShowMenu(false)}
                className="fixed inset-0"
              />
              <div className="absolute right-0 top-[55px] flex flex-col items-start rounded-b-xl border-b-2 border-l-2 border-r-2 bg-white">
                <Link
                  href="/"
                  onClick={() => setShowMenu(false)}
                  title={`home page link`}
                  className="flex w-full items-center gap-2 border-b-2 p-2 pl-4 pr-14 font-medium tracking-wide"
                >
                  {router.pathname === "/" ? (
                    <>
                      <span className="block h-2.5 w-2.5 rounded-full bg-primary" />
                      <strong className="text-primary">Home</strong>
                    </>
                  ) : (
                    <strong className="text-black">Home</strong>
                  )}
                </Link>
                <Link
                  href={HOTELS_URL}
                  title={`${HOTELS_URL} page link`}
                  onClick={() => setShowMenu(false)}
                  className="flex w-full items-center gap-2 border-b-2 p-2 pl-4 pr-14 font-medium tracking-wide"
                >
                  {router.pathname === HOTELS_URL ? (
                    <>
                      <span className="block h-2.5 w-2.5 rounded-full bg-primary" />
                      <strong className="text-primary">Hotels</strong>
                    </>
                  ) : (
                    <strong className="text-black">Hotels</strong>
                  )}
                </Link>
                <Link
                  href={EVISA_URL}
                  title={`${EVISA_URL} page link`}
                  onClick={() => setShowMenu(false)}
                  className="flex w-full items-center gap-2 p-2 pl-4 pr-14 font-medium tracking-wide"
                >
                  {router.pathname.startsWith(EVISA_URL) ? (
                    <>
                      <span className="block h-2.5 w-2.5 rounded-full bg-primary" />
                      <strong className="text-primary">eVisa</strong>
                    </>
                  ) : (
                    <strong className="text-black">eVisa</strong>
                  )}
                </Link>

                {/* <button
                  className="block w-full p-2 pl-4 pr-14 font-medium tracking-wide"
                  //   onClick={handleChangeForMobile}
                >
                  Login
                </button> */}
              </div>
            </>
          )}
        </nav>

        {/*  navLinks for desktop  */}
        <nav className="relative hidden items-center gap-14 md:flex">
          <Link
            href="/"
            title={`home page link`}
            onClick={() => setShowMenu(false)}
            className="font-medium tracking-wide"
          >
            {router.pathname === "/" ? (
              <strong className="border-b-2 border-primary text-primary">
                Home
              </strong>
            ) : (
              <strong className="text-white">Home</strong>
            )}
          </Link>
          <Link
            href={HOTELS_URL}
            title={`${HOTELS_URL} page link`}
            onClick={() => setShowMenu(false)}
            className="font-medium tracking-wide"
          >
            {router.pathname === HOTELS_URL ? (
              <strong className="border-b-2 border-primary text-primary">
                Hotels
              </strong>
            ) : (
              <strong className="text-white">Hotels</strong>
            )}
          </Link>

          <Link
            href={EVISA_URL}
            title={`${EVISA_URL} page link`}
            onClick={() => setShowMenu(false)}
            className="font-medium tracking-wide"
          >
            {router.pathname === EVISA_URL ? (
              <strong className="border-b-2 border-primary text-primary">
                eVisa
              </strong>
            ) : (
              <strong className="text-white">eVisa</strong>
            )}
          </Link>

          {/* <div
            // onClick={handleChangeForDesktop}
            className="flex cursor-pointer items-center gap-2 rounded-full border-2 p-1 pr-4 font-medium"
          >
            <UserCircleIcon className="h-8 w-8" />
            Login
          </div> */}
        </nav>
      </div>
    </header>
  );
}
