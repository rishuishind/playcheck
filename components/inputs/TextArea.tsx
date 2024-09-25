import React from "react";

type Props = {
  inputLabel: string;
  inputType: string;
  inputValue: string | number;
  inputName: string;
  inputPlaceholder: string;
  inputError: string;
  handleInputChange: (e: any) => void;
};

export default function TextArea({
  inputLabel,
  inputType,
  inputValue,
  inputName,
  inputPlaceholder,
  inputError,
  handleInputChange,
}: Props) {
  return (
    <>
      <div className="relative w-full space-y-1">
        <label htmlFor={inputName} className="block font-medium ml-4">
          {inputLabel}
        </label>
        <textarea
          value={inputValue}
          name={inputName}
          placeholder={inputPlaceholder}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 border-2 outline-none rounded-xl resize-y"
        />
        <p className="text-red-700 font-medium text-xs tracking-wide">
          {inputError}
        </p>
      </div>
    </>
  );
}
