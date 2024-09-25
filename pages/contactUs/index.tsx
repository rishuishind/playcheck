import { useEffect, useState } from "react";
import CustomHead from "@/components/header/CustomHead";
import {
  CONTACT_US_PAGE_META_DESCRIPTION,
  CONTACT_US_PAGE_TAB_TITLE,
  CONTACT_US_URL,
  LOGO_IMAGE_URL1,
} from "@/lib/helper";
import Image from "next/image";
import dynamic from "next/dynamic";

const LocationMarkerIcon = dynamic(
  () => import("@heroicons/react/solid/LocationMarkerIcon"),
  { ssr: false },
);
const MailIcon = dynamic(() => import("@heroicons/react/solid/MailIcon"), {
  ssr: false,
});
const PhoneIcon = dynamic(() => import("@heroicons/react/solid/PhoneIcon"), {
  ssr: false,
});

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: 0,
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name: string;
    phone: string;
    email: string;
    message: string;
  }>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // validate the email
  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // form validation logic
  const handleFormValidation = (): boolean => {
    const newFormErrors: any = {
      name: "",
      phone: "",
      email: "",
      message: "",
    };
    if (!formData.name.trim()) {
      newFormErrors.name = "Name is required";
    }
    if (formData.phone.toString().length < 10) {
      newFormErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newFormErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newFormErrors.message = "Message is required";
    }
    setFormErrors(newFormErrors);
    const isValid = Object.values(newFormErrors).every((error) => error === "");
    return isValid;
  };

  // handle input onChange
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
  };

  // call the api
  const handleFormSubmit = async () => {
    // setIsLoading(true);
    if (handleFormValidation()) {
      window.location.href = `mailto:booking@staybook.in?subject=Connect to Staybook&body=Sender's Name: ${formData.name}, Sender's Phone: ${formData.phone}, Sender's Email-Id: ${formData.email}, Message: ${formData.message}`;
    }
    //   setIsLoading(false);
  };

  return (
    <>
      <CustomHead
        metaShowTitle={CONTACT_US_PAGE_TAB_TITLE}
        metaDescription={CONTACT_US_PAGE_META_DESCRIPTION}
        metaImageUrl={LOGO_IMAGE_URL1}
        canonicalUrl={`https://staybook.in${CONTACT_US_URL}`}
      />
      <section className="h-auto min-h-screen w-full">
        <div className="relative grid h-[34vh] w-full place-items-center">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black/40">
            {showImage && (
              <Image
                alt={"banner_Image"}
                src={"https://images.staybook.in/pexels-alex-andrews.jpg"}
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <div className="relative grid h-full w-full place-items-center p-4 text-center text-white">
            <div>
              <h1 className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                Contact Us
              </h1>
              <h2 className="text-sm font-medium md:text-base">
                We love to hear you
              </h2>
            </div>
          </div>
        </div>
        <div className="wrapper h-full py-5">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="grid w-full place-items-center lg:w-2/3">
              <div className="w-full max-w-xl space-y-4">
                <div>
                  <label htmlFor="name" className="font-medium">
                    Full Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="h-12 w-full border-b-2 border-secondary px-4 outline-none"
                  />
                  <p className="-mb-2 text-xs font-medium tracking-wide text-red-800">
                    {formErrors.name}
                  </p>
                </div>
                <div>
                  <label htmlFor="phone" className="font-medium">
                    Phone No.
                  </label>
                  <input
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    // min={10}
                    maxLength={10}
                    name="phone"
                    placeholder="Enter Your Email"
                    className="h-12 w-full border-b-2 border-secondary px-4 outline-none"
                  />
                  <p className="-mb-2 text-xs font-medium tracking-wide text-red-800">
                    {formErrors.phone}
                  </p>
                </div>
                <div>
                  <label htmlFor="email" className="font-medium">
                    Email Id
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="h-12 w-full border-b-2 border-secondary px-4 outline-none"
                  />
                  <p className="-mb-2 text-xs font-medium tracking-wide text-red-800">
                    {formErrors.email}
                  </p>
                </div>
                <div>
                  <label htmlFor="message" className="font-medium">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    rows={5}
                    name="message"
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full resize-none border-b-2 border-secondary px-4 py-2 outline-none"
                  />
                  <p className="-mb-2 text-xs font-medium tracking-wide text-red-800">
                    {formErrors.message}
                  </p>
                </div>
                <button
                  onClick={handleFormSubmit}
                  className="w-full rounded bg-secondary px-7 py-2 font-medium tracking-wide text-white"
                >
                  Submit
                </button>
                {/* {!sent ? (
              <button
                onClick={handleFormSubmit}
                className="bg-secondary w-full text-white px-7 py-2 rounded font-medium tracking-wide"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push({ pathname: "/" });
                }}
              >
                Done
              </button>
            )} */}
              </div>
            </div>
            <div className="grid w-full place-items-center lg:w-1/3">
              <div className="w-full max-w-xl space-y-4 lg:w-[240px]">
                <div className="space-y-2 rounded-lg border-2 p-4 text-center text-secondary">
                  <div className="flex items-center justify-center gap-2 md:text-lg">
                    <MailIcon className="h-6 w-6" />
                    <p className="font-bold">Mail Us</p>
                  </div>
                  <div className="text-sm font-medium md:text-base">
                    <p>Staybook Hospitality Private Limited</p>
                    <a
                      href={"mailto:" + "booking@staybook.in"}
                      className="block"
                    >
                      booking@staybook.in
                    </a>
                    <a
                      href={"mailto:" + "staybookhost@gmail.com"}
                      className="block"
                    >
                      staybookhost@gmail.com
                    </a>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg border-2 p-4 text-center text-secondary">
                  <div className="flex items-center justify-center gap-2 md:text-lg">
                    <PhoneIcon className="h-6/> w-6" />
                    <p className="font-bold">Call Us</p>
                  </div>
                  <div className="text-sm font-medium md:text-base">
                    <a href="tel:+919211262749" className="block">
                      +91 92112 62749
                    </a>
                    <a href="tel:+919910613040" className="block">
                      +91 99106 13040
                    </a>
                    <a href="tel:+918527703312" className="block">
                      +91 85277 03312
                    </a>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg border-2 p-4 text-center text-secondary">
                  <div className="flex items-center justify-center gap-2 md:text-lg">
                    <LocationMarkerIcon className="h-6 w-6" />
                    <p className="font-bold">Walk In</p>
                  </div>
                  <div>
                    <p className="text-md font-sans text-gray-500">
                      First floor, 1/5, Desh Bandhu Gupta Road, Paharganj, New
                      Delhi, Central Delhi, Delhi, 110055
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-10 space-y-4">
            <h2 className="text-center text-2xl text-secondary font-bold">
              Find Us on Map
            </h2>
            <iframe
              className="w-full aspect-video md:h-[360px]"
              title="map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGvy5rBo-MPjD0vR2BkkRhtKAXmFHCLVY&q=${encodeURIComponent(
                "9918, Street No. 5, Multani Dhanda, Paharganj, Delhi, 110055"
              )}
								)}`}
            />
          </div> */}
        </div>
      </section>
    </>
  );
}
