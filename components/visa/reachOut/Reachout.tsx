import React from "react";

const Reachout = () => {
  return (
    <div className="mb-5 flex flex-row  gap-3 mt-5">
      <div className="flex w-[50%] flex-col justify-between rounded-lg bg-white p-2 shadow-lg">
        <h4 className="text-xl font-bold">
          To reach out for staybook e-tourist visa assistance.
        </h4>
        <p>
          (fees applicable including GST, and specialized services by staybook,
          please go through T&C.)
        </p>
        <div className="flex justify-end border-t pt-2">
          <button className="rounded-lg bg-secondary px-3 py-1 text-white">
            Click Here
          </button>
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-between rounded-lg bg-white p-2 shadow-lg">
        <div className="flex h-full flex-col justify-between">
          <h4 className="text-xl font-bold">
            To fill out the form by yourself.
          </h4>
          <p>
            (with a minimal fee for specialized services, please go through
            T&C.)
          </p>
        </div>
        <div className="mt-2 flex justify-end border-t pt-2">
          <button className="rounded-lg bg-secondary px-3 py-1 text-white">
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reachout;
