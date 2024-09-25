import Select from "react-select";
import { countriesData } from "@/lib/helper/countriesData";

const options = [...countriesData];

const CountrySelect = ({ onChange, country, height }: any) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white", // Background color
      height: height,
      borderRadius: "0.3rem", // Height
      color: "black",
      border: "none",
      "&:hover": {
        border: "none",
      },
      inset: 0,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black", // Placeholder color
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black", // Text color,
      border: "none",
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      color: "#fffff", // Input text color
      border: state.isFocused ? "none" : "none",
      inset: 0,
      outline: "none",
      ring: "0",
    }),
    options: (...provided: any) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <Select
      isClearable
      value={country}
      onChange={onChange}
      className="basic-single w-full"
      options={options}
      styles={customStyles}
      required
      placeholder="Choose Country"
      instanceId="my-select"
    />
  );
};

export default CountrySelect;
