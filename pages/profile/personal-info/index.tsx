import {
  LOGO_IMAGE_URL1,
  USER_ACCESS_TOKEN,
  extractJWTValues,
} from "@/lib/helper";
import { parse } from "cookie";
import {
  getUserAccessTokenObject,
  getUserProfileDetails,
} from "@/lib/firebase/userHandler";
import { useRouter } from "next/router";
import Link from "next/link";
import EditableInput from "@/components/profile/EditableInput";
import EditablePhoneInput from "@/components/profile/EditablePhoneInput";
import CustomHead from "@/components/header/CustomHead";
import Navbar from "@/components/navbar/booking/Navbar";
import dynamic from "next/dynamic";

type Props = {
  userDetails: any;
};

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
  { ssr: false },
);

export const fetchHandler = async () => {
  const data = await getUserAccessTokenObject();
  return data;
};

export default function PersonalInformation(props: Props) {
  const router = useRouter();
  const canonical = router.asPath.split("?");

  const breadcrumb = router.asPath
    .split("/")
    .filter((link: string) => link !== "");

  return (
    <>
      <CustomHead
        metaShowTitle={`User Profile - StayBook`}
        metaDescription={`Details of the logged in user`}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${canonical[0]}`}
      />

      <section className="h-auto min-h-screen w-full">
        <Navbar />
        <div className="wrapper h-full py-5">
          <div className="mb-4 flex items-center justify-between">
            <div
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-2"
            >
              <ChevronLeftIcon className="h-7 w-7 rounded-full bg-primary" />
              <h1 className="font-serif text-3xl font-medium tracking-wide">
                Personal Info
              </h1>
            </div>
            <h2 className="hidden text-lg font-medium sm:block">
              {props.userDetails.User_Email_Id}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            {breadcrumb.map((link: string, index: number) => (
              <div key={link} className="font-medium">
                <Link
                  href={`/${breadcrumb.slice(0, index + 1).join("/")}`}
                  className="hover:text-primary"
                >
                  {link}
                </Link>
                {index < breadcrumb.length - 1 && <span> &gt;</span>}
              </div>
            ))}
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-4">
            <div>
              <EditableInput
                firebaseHeaderName={"User_Display_Name"}
                inputLabel={"Display Name"}
                inputType={"text"}
                inputPlaceholder={"Enter Display Name"}
                inputValue={props.userDetails.User_Display_Name}
              />
            </div>

            <div className="grid grid-cols-3 gap-1">
              <EditableInput
                firebaseHeaderName={"User_First_Name"}
                inputLabel={"Legal First Name"}
                inputType={"text"}
                inputPlaceholder={"enter first name"}
                inputValue={props.userDetails?.User_First_Name || ""}
              />

              <EditableInput
                firebaseHeaderName={"User_Middle_Name"}
                inputLabel={"Legal Middle Name"}
                inputType={"text"}
                inputPlaceholder={"enter middle name"}
                inputValue={props.userDetails?.User_Middle_Name || ""}
              />

              <EditableInput
                firebaseHeaderName={"User_Last_Name"}
                inputLabel={"Legal Last Name"}
                inputType={"text"}
                inputPlaceholder={"enter last name"}
                inputValue={props.userDetails?.User_Last_Name || ""}
              />
            </div>
            <div>
              <EditablePhoneInput
                firebaseHeaderName={`User_Mobile_Number`}
                inputLabel={"Mobile Number"}
                inputType={"number"}
                inputPlaceholder={"Mobile Number"}
                inputValue={props.userDetails?.User_Mobile_Number || ""}
              />
            </div>
            <div>
              <EditablePhoneInput
                firebaseHeaderName={`User_Alternate_Mobile_Number`}
                inputLabel={"Alt Mobile Number"}
                inputType={"number"}
                inputPlaceholder={"Mobile Number"}
                inputValue={
                  props.userDetails?.User_Alternate_Mobile_Number || ""
                }
              />
            </div>
            <div>
              <EditableInput
                firebaseHeaderName={"User_Full_Address"}
                inputLabel={"Full Address"}
                inputType={"text"}
                inputPlaceholder={"Enter Full Address"}
                inputValue={props.userDetails?.User_Full_Address || ""}
              />
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
