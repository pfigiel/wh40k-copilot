import classNames from "classnames";
import { MouseEventHandler } from "react";

interface Props {
  label: string;
  isLabelFloating: boolean;
  display?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const Toggle = ({ display, label, isLabelFloating, onClick }: Props) => {
  return (
    <div className="relative cursor-pointer" onMouseDown={onClick}>
      <label
        className={classNames(
          "absolute left-2 bg-slate-800 transition-all",
          { "-top-2.5 text-sm text-slate-300": isLabelFloating },
          { "top-2 cursor-pointer text-slate-500": !isLabelFloating },
        )}
      >
        {label}
      </label>
      <div className="h-8 border border-solid border-slate-300 p-2">
        {display}
      </div>
    </div>
  );
};
