interface Props<TValue> {
  display: string;
  value: TValue;
  onSelect: (value: TValue) => void;
}

export const Option = <TValue extends any>({
  display,
  value,
  onSelect,
}: Props<TValue>) => {
  return (
    <div
      className="cursor-pointer border-t border-solid border-slate-300 p-2 first:border-t-0"
      onClick={() => onSelect(value)}
    >
      {display}
    </div>
  );
};
