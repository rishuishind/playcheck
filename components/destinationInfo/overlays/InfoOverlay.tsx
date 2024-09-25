import { useEffect } from "react";
import { motion } from "framer-motion";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";

type Props = {
  modelState: boolean;
  setModelState: Function;
  data: any;
  heading: string;
};

export default function InfoOverlay({
  modelState,
  setModelState,
  data,
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
          <div className="relative container mx-auto w-full h-full overflow-y-scroll container-snap p-4 pb-24">
            <p className="mb-4 font-medium">{data.destination_Info}</p>
            <p
              dangerouslySetInnerHTML={{ __html: data.destination_Description }}
            />

            <div className="mt-4 space-y-4">
              {Array.from({ length: 4 }).map(
                (image: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-video bg-rose-500"
                  >
                    {/* <Image
                      alt="destination_image"
                      src={}
                      width={160}
                      height={90}
                    /> */}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* overlay for mobile model */}
      <div className="fixed inset-0 z-50 hidden md:grid place-items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative w-full max-w-xl max-h-[80%] overflow-y-scroll container-snap bg-white rounded-2xl">
          <div className="sticky top-0 z-10 border-b-2 p-4 pb-2.5 flex items-center justify-between bg-white">
            <h3 className="text-2xl tracking-wide font-bold mb-2 text-secondary">
              {heading}
            </h3>
            <button onClick={() => setModelState(false)}>
              <span className="sr-only">close model</span>
              <XIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="relative w-full h-full p-4 bg-rose-500">
            <p
              dangerouslySetInnerHTML={{ __html: data.destination_Description }}
            />

            <div className="mt-4 columns-2 space-y-4">
              {Array.from({ length: data.imageArraylength }).map(
                (image: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-video bg-rose-500 break-inside-avoid-column"
                  >
                    {/* <Image
                      alt="destination_image"
                      src={}
                      width={160}
                      height={90}
                    /> */}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
