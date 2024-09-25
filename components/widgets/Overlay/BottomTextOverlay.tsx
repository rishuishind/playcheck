"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
// import { XIcon } from "@heroicons/react/solid";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));

type Props = {
  modelState: boolean;
  setModelState: Function;
  dataList: any;
  heading: string;
};

export default function BottomTextOverlay({
  modelState,
  setModelState,
  dataList,
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

        <div className="absolute inset-0 top-[73px] overflow-hidden rounded-t-[36px] bg-white md:top-20 md:hidden">
          <div className="sticky inset-0 top-0 border-b-2 bg-green-50 p-4 pb-2">
            <div className="container mx-auto flex items-center justify-between">
              <h3 className="mb-2 text-2xl font-bold tracking-wide text-secondary">
                {heading}
              </h3>
              <button onClick={() => setModelState(false)}>
                <span className="sr-only">close model</span>
                <XIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
          <div className="container-snap container relative mx-auto h-full w-full overflow-y-scroll p-4 pb-24">
            <p dangerouslySetInnerHTML={{ __html: dataList }} />
          </div>
        </div>
      </motion.div>

      {/* overlay for mobile model */}
      <div className="fixed inset-0 z-50 hidden place-items-center md:grid">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-snap relative max-h-[80%] w-full max-w-[70%] overflow-y-scroll rounded-2xl bg-white">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 bg-white p-4 pb-2.5">
            <h3 className="mb-2 text-2xl font-bold tracking-wide text-secondary">
              {heading}
            </h3>
            <button onClick={() => setModelState(false)}>
              <span className="sr-only">close model</span>
              <XIcon className="h-7 w-7" />
            </button>
          </div>
          <div className="relative h-full w-full p-4">
            <p dangerouslySetInnerHTML={{ __html: dataList }} />
          </div>
        </div>
      </div>
    </>
  );
}
