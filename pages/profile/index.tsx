import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorModel from "@/components/models/Error/ErrorModel";
import CustomHead from "@/components/header/CustomHead";
import { LOGO_IMAGE_URL1, PROFILE_URL } from "@/lib/helper";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useDispatch } from "react-redux";
import Navbar from "@/components/navbar/booking/Navbar";
import { updateLoggedInUserDetails } from "@/lib/redux/userSlice";
import { USER_ACCESS_TOKEN, extractJWTValues } from "@/lib/helper";
import { parse } from "cookie";
import { getUserProfileDetails } from "@/lib/firebase/userHandler";
import dynamic from "next/dynamic";

const BookmarkIcon = dynamic(
  () => import("@heroicons/react/solid/BookmarkIcon"),
  { ssr: false },
);
const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
  { ssr: false },
);
const UserCircleIcon = dynamic(
  () => import("@heroicons/react/solid/UserCircleIcon"),
  { ssr: false },
);

type Props = {
  userDetails: any;
};

export const userLogoutHandler = async () => {
  const response = await fetch("/api/auth/userLogout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export default function UserProfilePage(props: Props) {
  const router = useRouter();
  const [errorModelVisible, setErrorModel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const dispath = useDispatch();

  useEffect(() => {
    //Add the user Detail from cookie to redux...

    dispatch(
      updateLoggedInUserDetails({
        userDisplayName: props.userDetails.User_Display_Name ?? "",
        userEmailId: props.userDetails.User_Email_Id ?? "",
        userPhoneNumber: props.userDetails.User_Mobile_Number ?? "",
        userImageUrl: props.userDetails.User_Image_Url ?? "",
        userId: props.userDetails.User_Id ?? "",
      }),
    );
  }, [props.userDetails]);

  const logoutHandler = async () => {
    dispatch(
      updateLoggedInUserDetails({
        userDisplayName: "",
        userEmailId: "",
        userPhoneNumber: "",
        userImageUrl: "",
        userId: "",
      }),
    );

    localStorage.removeItem("user");

    const response = await userLogoutHandler();

    if (response.status) {
      router.replace("/");
    } else {
      setErrorMessage("Unable to logout. Try again after some time");
      setErrorModel(true);
    }
  };

  return (
    <>
      <CustomHead
        metaShowTitle={`StayBook - Profile`}
        metaDescription={`Details of the logged in user`}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${PROFILE_URL}`}
      />

      <ErrorModel
        errorMsg={errorMessage}
        setErrorMessage={setErrorMessage}
        modelVisible={errorModelVisible}
        setErrorModel={setErrorModel}
      />

      <section className="h-auto min-h-screen w-full">
        <Navbar />
        <div className="wrapper h-full py-5">
          <div>
            <Link href={"/"} className="flex items-center gap-4">
              <ChevronLeftIcon className="h-8 w-8 rounded-full bg-primary" />
              <h1 className="text-3xl font-bold">Account</h1>
            </Link>
            <div
              className={`relative mb-16 mt-10 flex w-full flex-col space-y-4`}
            >
              <div
                onClick={() => {
                  router.push({
                    pathname: "/profile/personal-info",
                    // query: {
                    //   propKey: "propValue",
                    // },
                  });
                }}
                className={`realtive w-full cursor-pointer flex-wrap rounded-lg px-5 py-6 shadow-[0px_0px_10px_rgba(0,0,0,0.14)] hover:bg-gray-100 md:w-[60%] lg:w-[40%]`}
              >
                <UserCircleIcon className="mb-4 h-12 w-12" />
                <h2 className={`mb-2 font-semibold`}>Personal Information</h2>
                <p className={`text-sm text-gray-400`}>
                  Provide personal details and how we can reach you
                </p>
              </div>
              <div
                onClick={() => {
                  router.push({ pathname: "/profile/my-bookings" });
                }}
                className={`realtive w-full cursor-pointer flex-wrap rounded-lg px-5 py-6 shadow-[0px_0px_10px_rgba(0,0,0,0.14)] hover:bg-gray-100 md:w-[60%] lg:w-[40%]`}
              >
                <BookmarkIcon className="mb-4 h-12 w-12 rounded-full bg-gray-300 p-2" />
                <h3 className={`mb-2 font-semibold`}>Hotel Bookings</h3>
                <p className={`text-sm text-gray-400`}>
                  Provide all your booking details at one place
                </p>
              </div>
            </div>
            <div className={`relative mb-8 flex w-full`}>
              <div
                onClick={logoutHandler}
                className={`relative right-0 mx-auto my-auto flex cursor-pointer items-center justify-center rounded-md bg-black px-6 py-2 text-center align-middle text-white`}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const cookies = parse(req.headers.cookie || "");
  const userAccessToken = cookies[USER_ACCESS_TOKEN];
  const userAccessTokenObject = await extractJWTValues(userAccessToken);
  const userCollectionDoc = await getUserProfileDetails(userAccessTokenObject);
  const serializedUserInfo = JSON.stringify(userCollectionDoc);

  return {
    props: {
      userDetails: JSON.parse(serializedUserInfo),
    },
  };
}