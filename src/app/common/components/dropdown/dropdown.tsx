import { DropdownProps } from "./dropdown-props";
import { Option } from "./option";
import { Toggle } from "./toggle";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useResizeObserverRef } from "rooks";

export const Dropdown = <TValue extends any>({
  className,
  options,
  value,
  label,
  renderFocused,
  onSelect: onSelectProp,
}: DropdownProps<TValue>) => {
  const [isOpen, setOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownInstance, setDropdownInstance] =
    useState<HTMLDivElement | null>(null);
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

  const onFocus = () => {
    setOpen(true);
  };

  const refCallback = (instance: HTMLDivElement) => {
    dropdownWidthRef(instance);
    setDropdownInstance(instance);
  };

  useEffect(() => {
    if (renderFocused) {
      dropdownInstance?.focus();
    }
  }, [dropdownInstance, renderFocused]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        ref={refCallback}
        className={classNames("relative py-2 outline-none", className)}
        tabIndex={0} // make dropdown focusable
        autoFocus
        onFocus={onFocus}
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
