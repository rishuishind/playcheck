import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  errorMsg: string;
  modelVisible: boolean;
  setErrorModel: Function;
  setErrorMessage: Function;
};

const backdropVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function ErrorModel(props: Props) {
  return (
    <AnimatePresence mode="wait">
      {props.modelVisible && (
        <motion.div className="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-black/75 z-50">
          <motion.div
            className={`relative flex flex-col align-middle items-center justify-evenly w-[90%] h-[50%] sm:w-[65%] md:w-[60%] md:h-[50%] lg:w-[50%] lg:h-[40%] xl:w-[40%] p-3 bg-red-100 rounded-3xl`}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div className={`relative w-full px-2`}>
              <h2 className={`text-center font-semibold text-3xl`}>
                {props.errorMsg}
              </h2>
            </motion.div>
            <motion.div
              className={`relative rounded-full px-10 py-3 text-white bg-red-500 text-2xl font-semibold cursor-pointer`}
              onClick={() => {
                props.setErrorModel(false);
                props.setErrorMessage("");
              }}
            >
              Okay!
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
