import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserDisplayName,
  selectUserImageUrl,
} from "@/lib/redux/userSlice";
import dynamic from "next/dynamic";
import { EVISA_URL, HOTELS_URL } from "@/lib/helper";

const CreditCardIcon = dynamic(
  () => import("@heroicons/react/solid/CreditCardIcon"),
  { ssr: false },
);
const HomeIcon = dynamic(() => import("@heroicons/react/solid/HomeIcon"));
const OfficeBuildingIcon = dynamic(
  () => import("@heroicons/react/solid/OfficeBuildingIcon"),
);
const UserCircleIcon = dynamic(
  () => import("@heroicons/react/solid/UserCircleIcon"),
);

export default function MobileNav() {
  const router = useRouter();
  const UserDisplayName = useSelector(selectUserDisplayName);
  const UserImageUrl = useSelector(selectUserImageUrl);

  const [userName, setUserName] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setUserName(UserDisplayName);
    setUserImageUrl(UserImageUrl);
  }, [UserDisplayName, UserImageUrl]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 610) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* login button */}
      <div className="wrapper absolute top-2 flex h-fit items-center justify-between lg:hidden">
        <div className="w-ful flex items-center justify-between gap-2">
          <Link href="/" title="home" className="block h-12 w-12">
            <Image
              title="home"
              alt="home"
              src={"/brand_logo.svg"}
              className="h-full w-full"
              width={40}
              height={40}
              priority
            />
          </Link>
          <p className="font-dream text-2xl font-bold text-white">Staybook</p>
        </div>
        {!userName ? (
          <div
            onClick={() => router.push("/login")}
            className="flex w-fit cursor-pointer items-center gap-1 whitespace-nowrap rounded-full bg-white p-2 text-black"
          >
            <UserCircleIcon className="h-6 w-6" />
            <span>Login</span>
          </div>
        ) : (
          <div
            onClick={() => router.push("/profile")}
            className="flex w-fit cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-2 pr-4"
          >
            {userImageUrl ? (
              <div className="h-7 w-7">
                <Image
                  title="user_image"
                  alt="user_image"
                  src={userImageUrl}
                  width={30}
                  height={30}
                  priority
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-rose-600 to-blue-600">
                <span className="uppercase text-white">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <span className="font-medium tracking-wide text-black">
              {userName ? userName : "Logged In"}
            </span>
          </div>
        )}
      </div>

      {/* sticky bar */}
      <div
        className={`${
          isScrolled ? "mt-0 bg-secondary" : "bg-white"
        } sticky inset-x-0 top-0 z-20 flex w-full lg:hidden`}
      >
        <div className="mx-auto flex h-full flex-1 items-start gap-5 px-4 py-2 md:px-10 lg:hidden xl:px-0">
          <Link
            title={"home"}
            href={"/"}
            className={`block hover:shadow-md ${
              router.pathname === "/"
                ? "bg-primary shadow-md shadow-white"
                : "shadown-md border-[0.25px] border-secondary bg-white shadow-secondary"
            }  w-fit rounded-lg p-0.5 px-2 text-center font-bold text-secondary sm:px-7`}
          >
            <HomeIcon
              className={`mx-auto h-8 w-8 ${
                router.pathname === "/" ? "fill-secondary" : "fill-primary"
              }`}
            />
            <p
              className={`text-sm ${
                router.pathname === "/" ? "text-secondary" : "text-primary"
              }`}
            >
              Home
            </p>
          </Link>

          <Link
            title={"hotels"}
            href={HOTELS_URL}
            className={`block hover:shadow-md ${
              router.pathname === HOTELS_URL
                ? "bg-primary shadow-md shadow-white"
                : "shadown-md border-[0.25px] border-secondary bg-white shadow-secondary"
            } w-fit rounded-lg p-0.5 px-2 text-center font-bold text-secondary sm:px-7`}
          >
            <OfficeBuildingIcon
              className={`mx-auto h-8 w-8 ${
                router.pathname === HOTELS_URL
                  ? "fill-secondary"
                  : "fill-primary"
              } `}
            />
            <p
              className={`text-sm ${
                router.pathname === HOTELS_URL
                  ? "text-secondary"
                  : "text-primary"
              }`}
            >
              Hotels
            </p>
          </Link>

          <Link
            title={"eVisa"}
            href={EVISA_URL}
            className={`block hover:shadow-md ${
              router.pathname === EVISA_URL
                ? "bg-primary shadow-md shadow-white"
                : "shadown-md border-[0.25px] border-secondary bg-white shadow-secondary"
            } w-fit rounded-lg p-0.5 px-2 text-center font-bold text-secondary sm:px-7`}
          >
            <CreditCardIcon
              className={`mx-auto h-8 w-8 ${
                router.pathname === EVISA_URL
                  ? "fill-secondary"
                  : "fill-primary"
              } `}
            />
            <p
              className={`text-sm ${
                router.pathname === EVISA_URL
                  ? "text-secondary"
                  : "text-primary"
              }`}
            >
              eVisa
            </p>
          </Link>
        </div>

        {/*  Login button */}
        {isScrolled && (
          <div className="flex items-center pr-4">
            {!userName ? (
              <div
                onClick={() => router.push("/login")}
                className="flex w-fit cursor-pointer items-center gap-1 whitespace-nowrap rounded-full bg-white p-2 text-black"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>Login</span>
              </div>
            ) : (
              <div
                onClick={() => router.push("/profile")}
                className="flex w-fit cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-2 pr-4"
              >
                {userImageUrl ? (
                  <div className="h-7 w-7">
                    <Image
                      title="user_image"
                      alt="user_image"
                      src={userImageUrl}
                      width={30}
                      height={30}
                      priority
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-rose-600 to-blue-600">
                    <span className="uppercase text-black">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <span className="font-medium tracking-wide text-black">
                  {userName ? userName : "Logged In"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
