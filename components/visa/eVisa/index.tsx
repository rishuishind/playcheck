import React from "react";
import Card from "../card";

const data = [
  {
    imgurl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/visa-card-1.webp",
    heading: "Choose Your Country",
    content: "We help you not to waste your valuable time.",
  },
  {
    imgurl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/visa-card-2.webp",
    heading: "Fill Online Form",
    content: "Complete our simple online form",
  },
  {
    imgurl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/visa-card-3.webp",
    heading: "Receive Your eVisa",
    content: "Our team will contact you",
  },
];

const Evisa = () => {
  return (
    <>
      <div className="mt-5">
        <h2 className="mb-4 text-3xl">Indian eVisa Application Process</h2>
        <div className="grid-col-1 grid gap-6 md:grid-cols-3">
          {data.map((ele: any, index: number) => (
            <Card key={index}>
              <div className="rounded-xl bg-white p-5 pb-8 shadow-lg">
                {/* <h1>1.</h1> */}
                <span className="text-lg text-secondary">{`${index + 1}.`}</span>
                <div className="flex max-h-60 flex-col items-center justify-center">
                  <img
                    className={`max-h-48 max-w-[20rem]`}
                    src={ele.imgurl}
                    alt="card1"
                    loading="lazy"
                  ></img>
                  <p className="pt-5 text-center text-secondary">
                    {ele.heading}
                  </p>
                  <p className="pt-1 text-center ">{ele.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Evisa;
