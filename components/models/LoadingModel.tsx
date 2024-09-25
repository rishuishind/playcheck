import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  isLoading: boolean;
  setIsLoading: Function;
};

export default function LoadingModel({ isLoading, setIsLoading }: Props) {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 z-50 grid place-items-center">
          <div className="space-y-4">
            <div className="relative w-32 aspect-square text-center">
              <Image
                alt="loading_image"
                src="/brand_logo.svg"
                width={100}
                height={100}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-2xl text-center font-dream text-white tracking-widest">
              Please wait
            </p>
          </div>
        </div>
      )}
    </>
  );
}
