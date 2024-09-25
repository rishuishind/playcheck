import React, { useState } from "react";
import Card from "../card";

const visaCardData = [
  { heading: "Tourist evisa for 30 days", validity: "30 Days", price: 25 },
  { heading: "Tourist evisa for 1 Year", validity: "1 Year", price: 40 },
  { heading: "Tourist evisa for 5 years", validity: "5 Years", price: 80 },
];

const Evisa2 = ({ handleClick }) => {
  const handleButtonClick = (e: any) => {
    handleClick();
  };
  return (
    <div className="w-full">
      <h2 className="mb-2 text-2xl font-bold md:text-3xl">
        Select Visa Type to Apply
      </h2>
      <div className="grid-row-1 grid gap-6 rounded-xl md:grid-cols-2 lg:grid-cols-3">
        {visaCardData.map(
          (
            ele: { heading: string; validity: string; price: number },
            index: number,
          ) => (
            <Card key={index}>
              <div className="max-h-96 overflow-hidden rounded-xl shadow-md">
                <div className="flex h-[4rem]  items-center justify-center rounded-tl-xl rounded-tr-xl bg-secondary text-white">
                  <h3 className="text-lg md:text-xl">{ele.heading}</h3>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-white to-teal-100 p-5">
                  <div className="flex justify-between pb-1">
                    <p>Entry:</p>
                    <p>Double</p>
                  </div>
                  <div className="flex justify-between pb-1">
                    <p>Validity:</p>
                    <p>{ele.validity}</p>
                  </div>
                  <div className="flex justify-between pb-1">
                    <p>Processing:</p>
                    <p>5-7 Days</p>
                  </div>
                  <div className="flex justify-between pb-3">
                    <p className="text-lg font-bold md:text-xl">
                      Starting Fees:
                    </p>
                    <p className="text-lg font-bold md:text-xl">{`$${ele.price}*`}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      name={ele.validity}
                      onClick={handleButtonClick}
                      type="button"
                      className="rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-400 px-4 py-2 text-base font-medium text-green-900 shadow-lg hover:bg-yellow-500 md:px-5 md:py-2.5 md:text-lg"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};

export default Evisa2;
