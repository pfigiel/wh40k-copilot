import { DropdownProps } from "./dropdown-props";
import classNames from "classnames";
import { useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useResizeObserverRef } from "rooks";

interface ToggleProps {
  label: string;
  isLabelFloating: boolean;
  display?: string;
  onClick: () => void;
}

interface OptionProps<TValue> {
  display: string;
  value: TValue;
  onSelect: (value: TValue) => void;
}

const Toggle = ({ display, label, isLabelFloating, onClick }: ToggleProps) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
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

const Option = <TValue extends any>({
  display,
  value,
  onSelect,
}: OptionProps<TValue>) => {
  return (
    <div
      className="cursor-pointer border-t border-solid border-slate-300 p-2 first:border-t-0"
      onClick={() => onSelect(value)}
    >
      {display}
    </div>
  );
};

export const Dropdown = <TValue extends any>({
  className,
  options,
  value,
  label,
  onSelect: onSelectProp,
}: DropdownProps<TValue>) => {
  const [isOpen, setOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownWidthRef] = useResizeObserverRef((entries) => {
    setDropdownWidth(entries[0].borderBoxSize[0].inlineSize);
  });

  const selectedOptionDisplay = options.find(
    (option) => option.value === value,
  )?.display;

  const isLabelFloating =
    isOpen || !([undefined, ""] as (typeof value)[]).includes(value);

  const onToggleClick = () => {
    setOpen((prev) => !prev);
  };

  const onSelect = (value: TValue) => {
    onSelectProp && onSelectProp(value);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        ref={dropdownWidthRef}
        className={classNames("relative py-2", className)}
      >
        <Toggle
          display={selectedOptionDisplay}
          label={label ?? ""}
          isLabelFloating={isLabelFloating}
          onClick={onToggleClick}
        />
        {
          <div
            className={classNames(
              "absolute z-10 origin-top border border-solid border-slate-300 bg-slate-800 transition-all",
              { "scale-y-0 opacity-0": !isOpen },
              { "scale-y-1 opacity-100": isOpen },
            )}
            style={{ width: dropdownWidth }}
          >
            {options.map((option) => (
              <Option {...option} key={`${option.value}`} onSelect={onSelect} />
            ))}
          </div>
        }
      </div>
    </ClickAwayListener>
  );
};
