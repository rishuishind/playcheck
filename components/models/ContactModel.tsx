import { useEffect, useState } from "react";
import InputField from "../inputs/InputField";
import { XIcon } from "@heroicons/react/solid";
import InputPhone from "../inputs/InputPhone";
import TextArea from "../inputs/TextArea";
import axios from "axios";
import Link from "next/link";

type Props = {
  contactModel: boolean;
  setContactModel: Function;
};
export default function ContactModel({ contactModel, setContactModel }: Props) {
  useEffect(() => {
    if (contactModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [contactModel]);

  const [mailSent, setMailSent] = useState<boolean>(false);
  const [mailSending, setMailSending] = useState<boolean>(false);

  const [mailData, setMailData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    hotelName: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    hotelName: "",
    message: "",
  });

  const handleValidation = (): boolean => {
    const newErrors: any = {
      userName: "",
      email: "",
      mobileNumber: "",
      hotelName: "",
      message: "",
    };
    if (!mailData.userName.trim()) {
      newErrors.userName = "Name is required";
    }
    if (mailData.mobileNumber.toString().length < 10) {
      newErrors.mobileNumber = "Please enter a valid phone number";
    }
    if (!mailData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mailData.email)) {
        newErrors.email = "Enter a valid Email address";
      } else {
        newErrors.email = "Email address is required";
      }
    }
    if (!mailData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => error === "");
    return isValid;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMailData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData: any) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handlePhoneInput = (value: number) => {
    setMailData((prevData: any) => ({
      ...prevData,
      mobileNumber: value,
    }));
    setErrors((prevData: any) => ({
      ...prevData,
      mobileNumber: "",
    }));
  };

  const handleFormSubmit = async () => {
    if (handleValidation()) {
      setMailSending(true);
      const res = await axios.post("/api/contactUs/ourContactEmail", mailData);
      if (res.status === 200) {
        setMailSent(true);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-xl bg-white p-4">
      {mailSent ? (
        <div className="w-full">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#48bb78"
              className="mx-auto my-5 h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <p className="mb-7 text-center text-sm">
            Our Representative team will contact you shortly...
          </p>
          <button
            onClick={() => setContactModel(false)}
            className="h-12 w-full rounded-full bg-green-200 font-bold tracking-wide text-green-800"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between bg-white p-2.5 px-4">
            <p className="text-xl font-bold">Contact Model</p>
            <XIcon
              onClick={() => setContactModel(false)}
              className="h-6 w-6 cursor-pointer text-secondary"
            />
          </div>
          <InputField
            inputLabel={"Name"}
            inputType={"text"}
            inputValue={mailData.userName}
            inputName={"userName"}
            inputPlaceholder={"Enter your name"}
            inputError={errors.userName}
            handleInputChange={handleInputChange}
          />
          <InputField
            inputLabel={"Email"}
            inputType={"email"}
            inputValue={mailData.email}
            inputName={"email"}
            inputPlaceholder={"Enter your email"}
            inputError={errors.email}
            handleInputChange={handleInputChange}
          />
          <InputPhone
            inputLabel={"Phone number"}
            inputValue={mailData.mobileNumber}
            inputName={"mobileNumber"}
            inputError={errors.mobileNumber}
            handleInputChange={handlePhoneInput}
          />
          <InputField
            inputLabel={"Hotel Name"}
            inputType={"text"}
            inputValue={mailData.hotelName}
            inputName={"hotelName"}
            inputPlaceholder={"Enter your name"}
            inputError={errors.hotelName}
            handleInputChange={handleInputChange}
          />
          <TextArea
            inputLabel={"Message"}
            inputType={"text"}
            inputValue={mailData.message}
            inputName={"message"}
            inputPlaceholder={"Enter your message"}
            inputError={errors.message}
            handleInputChange={handleInputChange}
          />
          <button
            onClick={handleFormSubmit}
            disabled={mailSending ? true : false}
            className="h-12 w-full rounded-full bg-green-200 font-bold tracking-wide text-green-800"
          >
            {mailSending ? "sending..." : "Send Message"}
          </button>
        </>
      )}
    </div>
  );
}
