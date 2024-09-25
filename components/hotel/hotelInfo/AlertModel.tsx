import React from "react";

type Props = {
  setAlertModel: any;
  handleOpenCalender: any;
};

export default function AlertModelSection({
  setAlertModel,
  handleOpenCalender,
}: Props) {
  return (
    <div className="bg-dark/70 fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0" onClick={() => setAlertModel(false)} />
      <div className="bg-light relative rounded-xl p-4 text-center">
        <h2 className="mb-1 text-center text-xl font-bold tracking-wide">
          Checkin and Checkout
        </h2>
        <p className="mb-4">Please Select Checkin and checkout time.</p>
        <button
          onClick={handleOpenCalender}
          className="rounded bg-green-300 p-2 px-7 font-medium tracking-wide text-green-900"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
