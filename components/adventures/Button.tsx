import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

type Props = {
  setShowExtraInfo: Function;
  showExtrInfo: { [key: string]: boolean };
  infoType: string;
  handleToggle: (infoType: string) => void;
  heading: string;
};

const Button = (props: Props) => {
  return (
    <div
      onClick={() => props.handleToggle(props.infoType)}
      className="flex cursor-pointer items-center justify-between rounded-xl px-6 py-3 shadow-sm shadow-slate-800"
    >
      <span>{props.heading}</span>
      <button className="">
        {props.showExtrInfo[props.infoType] ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default Button;
