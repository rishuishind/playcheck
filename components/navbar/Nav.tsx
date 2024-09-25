// import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  selectUserDisplayName,
  selectUserImageUrl,
} from "@/lib/redux/userSlice";
import dynamic from "next/dynamic";
import { EVISA_URL, HOTELS_URL } from "@/lib/helper";

const UserCircleIcon = dynamic(
  () => import("@heroicons/react/solid/UserCircleIcon"),
);

export default function Nav() {
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
      if (window.scrollY > 9) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="NavBar"
      className={`${
        isScrolled ? "bg-secondary text-white" : "text-white"
      } fixed top-0 z-50 hidden w-full items-center justify-center lg:flex`}
    >
      <div className="wrapper h-full">
        <div className="flex w-full items-center justify-between">
          {/* brand logo */}
          <div className="flex items-center gap-x-10 p-2">
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
          </div>

          {/* nav links */}
          <div className="hidden items-center gap-x-10 font-bold tracking-wide lg:flex">
            <Link
              title={"home"}
              href={"/"}
              className={`${
                router.pathname == "/"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              title={"hotels"}
              href={HOTELS_URL}
              className={`${
                router.pathname == HOTELS_URL
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Hotels
            </Link>
            <Link
              title={"eVisa"}
              href={EVISA_URL}
              className={`${
                router.pathname == EVISA_URL
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              eVisa
            </Link>
            {/* <Link href="/travel">Travel</Link> */}

            {!userName ? (
              <div
                onClick={() => router.push("/login")}
                className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full bg-white p-2 pr-4 text-black"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>Login</span>
              </div>
            ) : (
              <div
                onClick={() => router.push("/profile")}
                className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-2 pr-4"
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
        </div>
      </div>
    </div>
  );
}
