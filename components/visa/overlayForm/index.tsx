import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Form = dynamic(() => import("../form"), {
  ssr: false,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  selectedCountry:
    | { label: string; flag: string; key: number; value: string; code: string }
    | "";
};

const OverlayForm: React.FC<Props> = ({
  isOpen,
  onClose,
  date,
  selectedCountry,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup when the component is unmounted
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="overlay-form fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Form
        isOpen={isOpen}
        date={date}
        onClose={onClose}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default OverlayForm;
