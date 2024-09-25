import React from "react";
// import { StarIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";

const StarIcon = dynamic(() => import("@heroicons/react/solid/StarIcon"));

type Props = {
  reviewInfo: any;
};

export default function ReviewCard(props: Props) {
  return (
    <>
      <div className="relative flex flex-col rounded-xl shadow-md px-3 py-2 w-full sm:w-96 h-52 border-[1px] border-[#cf8f24]">
        <div className="relative flex flex-row space-x-3 mb-2 w-full">
          <div className="relative flex flex-row space-x-1 bg-[#cf8f24] px-1 py-[0.25px] rounded-md">
            <StarIcon className="h-4 w-4 my-auto fill-white" />
            <h6 className="text-white">{props.reviewInfo.review_Rating}</h6>
          </div>
          <p className="text-md font-medium whitespace-normal">
            {props.reviewInfo.review_Title}
          </p>
        </div>
        <div className="w-full border-[1px] mb-1"></div>
        <div className="relative w-full overflow-y-scroll no-scrollbar ">
          <p className="text-justify whitespace-normal">
            {props.reviewInfo.review_Description}
          </p>
        </div>
      </div>
    </>
  );
}
