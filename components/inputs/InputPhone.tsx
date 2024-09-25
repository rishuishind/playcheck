import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  inputLabel: string;
  inputValue: string | number;
  inputName: string;
  inputError: string;
  handleInputChange: (e: any) => void;
};

export default function InputPhone({
  inputLabel,
  inputValue,
  inputName,
  inputError,
  handleInputChange,
}: Props) {
  return (
    <div className="w-full space-y-1">
      <label htmlFor={inputName} className="font-medium ml-4">
        {inputLabel}
      </label>
      <PhoneInput
        country={"in"}
        inputProps={{
          name: "phoneNumber",
          required: true,
        }}
        value={String(inputValue)}
        onChange={(phone: any) => {
          handleInputChange(phone);
        }}
        countryCodeEditable={false}
        inputStyle={{
          width: "100%",
          height: "3rem",
          border: "2px solid #e5e7eb",
          borderRadius: "9999px",
        }}
        buttonStyle={{
          padding: "4px 0 4px 8px",
          marginRight: "8px",
          background: "inherit",
          borderRadius: "9999px 0 0 9999px",
        }}
        dropdownStyle={{
          background: "#e8a646",
        }}
      />
      <p className="text-red-700 font-medium text-xs tracking-wide">
        {inputError}
      </p>
    </div>
  );
}
