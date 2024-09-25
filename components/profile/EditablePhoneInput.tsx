import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  firebaseHeaderName: string;
  inputLabel: string;
  inputType: string;
  inputPlaceholder: string;
  inputValue: number;
};

export const updateProfileDetailsHandler = async (
  header: string,
  value: any
) => {
  const response = await fetch("/api/userProfile/updateUserDetails", {
    method: "POST",
    body: JSON.stringify({
      headerValue1: header,
      textValue1: value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export default function EditablePhoneInput(props: Props) {
  const [editBtn, setEditBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(props.inputValue);

  const saveTextHandler = async () => {
    const responseData = await updateProfileDetailsHandler(
      props.firebaseHeaderName,
      inputValue
    );
    setEditBtn(false);
  };

  const handleClick = () => {
    if (editBtn) {
      setInputValue(props.inputValue);
    }
    setEditBtn(!editBtn);
  };

  return (
    <div className="relative w-full">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-4">
          <label className="font-medium">{props.inputLabel}</label>
          <div
            onClick={handleClick}
            className="flex items-center rounded-full bg-secondary font-medium text-white px-4 py-1 cursor-pointer text-sm"
          >
            {editBtn
              ? "Cancel"
              : inputValue.toString().length === 0
              ? "Add"
              : "Edit"}
          </div>
        </div>
        <PhoneInput
          country={"in"}
          inputProps={{
            name: "phoneNumber",
            required: true,
          }}
          value={String(inputValue)}
          onChange={(phone: any) => {
            setInputValue(phone);
          }}
          // placeholder={props.inputPlaceholder}
          countryCodeEditable={false}
          disabled={editBtn ? false : true}
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
      </div>

      {editBtn && (
        <button
          onClick={saveTextHandler}
          className="py-1.5 mt-1.5 px-4 rounded-full bg-green-300 text-green-800 font-medium cursor-pointer border-0 outline-none"
        >
          Save
        </button>
      )}
    </div>
  );
}
