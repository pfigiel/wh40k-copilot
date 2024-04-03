import { DropdownProps } from "./dropdown-props";

export const Dropdown = ({ options, refCallback, ...props }: DropdownProps) => {
  return (
    <select ref={refCallback} {...props}>
      {options.map(({ value, display }) => (
        <option key={`${value}`} value={value}>
          {display}
        </option>
      ))}
    </select>
  );
};
