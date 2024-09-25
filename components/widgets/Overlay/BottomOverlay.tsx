"use client";
import { useEffect } from "react";
import FullReviewCard from "../../hotel/Rating/FullReviewCard";
// import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));

type Props = {
  modelState: boolean;
  setModelState: Function;
  reviewList: any[];
  heading: string;
};

export default function BottomOverlay({
  modelState,
  setModelState,
  reviewList,
  heading,
}: Props) {
  useEffect(() => {
    if (modelState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      if (modelState) {
        document.body.style.overflow = "auto";
      }
    };
  }, [modelState]);

  const container = {
    hidden: { y: "100%" },
    visible: { y: 0 },
    exit: { y: "100%" },
  };
  const opacity = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* overlay for mobile model */}
      <motion.div
        className="fixed inset-0 z-50 md:hidden"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={opacity}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 bg-black/50"
        />

        <div className="md:hidden absolute inset-0 top-[73px] md:top-20 bg-white rounded-t-[36px] overflow-hidden">
          <div className="sticky top-0 inset-0 bg-green-50 border-b-2 p-4 pb-2">
            <div className="container mx-auto flex items-center justify-between">
              <h3 className="text-2xl tracking-wide font-bold mb-2 text-secondary">
                {heading}
              </h3>
              <button onClick={() => setModelState(false)}>
                <span className="sr-only">close model</span>
                <XIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="relative container mx-auto w-full h-full overflow-y-scroll container-snap p-4 pb-24 space-y-4">
            {reviewList.length > 0 &&
              reviewList.map((review: any, index: number) => (
                <FullReviewCard
                  key={index}
                  user_image_url={review.user_image_url}
                  user_name={review.user_name}
                  review_type_name={review.review_type.review_type_name}
                  user_comment={review.user_comment}
                  user_rating={review.user_rating}
                  review_posting_time={review.review_posting_time}
                />
              ))}
          </div>
        </div>
      </motion.div>

      {/* overlay for mobile model */}
      <div className="fixed inset-0 z-50 hidden md:grid place-items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-[70%] max-h-[80%] overflow-y-scroll container-snap bg-white rounded-2xl">
          <div className="sticky top-0 z-10 border-b-2 p-4 pb-2.5 flex items-center justify-between bg-white">
            <h3 className="text-2xl tracking-wide font-bold mb-2 text-secondary">
              {heading}
            </h3>
            <button onClick={() => setModelState(false)}>
              <span className="sr-only">close model</span>
              <XIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="relative w-full h-full p-4 space-y-4">
            {reviewList.length > 0 &&
              reviewList.map((review: any, index: number) => (
                <FullReviewCard
                  key={index}
                  user_image_url={review.user_image_url}
                  user_name={review.user_name}
                  review_type_name={review.review_type.review_type_name}
                  user_comment={review.user_comment}
                  user_rating={review.user_rating}
                  review_posting_time={review.review_posting_time}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
