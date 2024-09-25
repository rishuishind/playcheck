// import React, { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";

// type Props = {
//   modelVisible: boolean;
//   setLoadingModel: Function;
// };

// export default function LoadingModel(props: Props) {
//   const [isClient, setIsClient] = useState<boolean>(false);

//   useEffect(() => {
//     // Set isClient to true when component mounts (client-side)
//     setIsClient(true);
//     return () => {};
//   }, []);

//   const renderLottie = () => {
//     if (!isClient) {
//       // Return null if rendering on the server
//       return null;
//     }

//     const Lottie = require("react-lottie").default;
//     const animationData = require("@/public/gifs/loader.json");

//     const defaultOptions = {
//       autoplay: true,
//       loop: true,
//       animationData: animationData,
//     };

//     return <Lottie style={{ width: "full" }} options={defaultOptions} />;
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {props.modelVisible && (
//         <div className="w-full h-screen flex flex-col justify-center items-center gap-y-10 fixed inset-0 z-50 bg-gradient-to-br from-primary to-secondary">
//           <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] xl:w-[300px] xl:h-[300px]">
//             {renderLottie()}
//           </div>

//           <span className="font-dream text-2xl md:text-4xl xl:text-5xl text-white tracking-widest">
//             Just a few seconds...
//           </span>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }

import React from "react";
import { motion, motionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
  modelVisible: boolean;
  setLoadingModel: Function;
};

const backdropVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 1,
        ease: "easeOut",
      },
      y: {
        yoyo: Infinity,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

export default function LoadingModel(props: Props) {
  return (
    <AnimatePresence mode="wait">
      {props.modelVisible && (
        <motion.div
          className="fixed top-0 left-0 flex items-center justify-center flex-col w-full h-full bg-black/75 z-30"
          variants={backdropVariant}
          initial={`hidden`}
          animate={`visible`}
        >
          <motion.div
            className={`relative flex flex-col align-middle items-center justify-center w-56 h-56 p-5 bg-red-100 rounded-full`}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className={`relative flex w-full h-full`}>
              <Image
                src={`/brand_logo.svg`}
                alt="icon"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                className={`rounded-full`}
              />
            </div>
          </motion.div>

          {/* <motion.div className={`absolute w-52 h-4`}>
            <motion.div
              className={`relative bg-red-500 h-3 w-3 rounded-full mt-16`}
              animate={{ x: 200 }}
              initial={{ x: -100 }}
              exit={{ x: 200 }}
              transition={{ ease: "linear", duration: 2, repeat: Infinity }}
            />
          </motion.div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// import React from "react";

// type Props = {
//   modelVisible: boolean;
//   setLoadingModel: Function;
// };

// export default function LoadingModel({}: Props) {
//   return <div className="hidden">LoadingModel</div>;
// }
