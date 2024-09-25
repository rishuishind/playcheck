import { useState } from "react";

type Props = {
  firebaseHeaderName: string;
  inputLabel: string;
  inputType: string;
  inputValue: string | number;
  inputPlaceholder: string;
};

export const updateProfileDetailsHandler = async (
  header: string,
  value: any
) => {
  const response = await fetch("/api/userProfile/updateUserDetails", {
    method: "POST",
    body: JSON.stringify({
      updateType: "",
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

export default function EditableInput(props: Props) {
  const [editBtn, setEditBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number>(
    props.inputValue
  );

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
        <input
          type={props.inputType}
          value={inputValue}
          readOnly={!editBtn}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          name={props.firebaseHeaderName}
          placeholder={props.inputPlaceholder}
          className={`
          ${
            !editBtn && "cursor-not-allowed"
          } w-full h-12 px-4 border-2 outline-none rounded-full`}
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
