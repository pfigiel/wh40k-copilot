import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  title: string;
}

export const Section = ({ children, className, title }: Props) => (
  <section
    className={classNames(
      "relative border border-solid border-slate-300 p-6",
      className,
    )}
  >
    <h1 className="absolute -top-6 bg-slate-800 p-1 text-2xl">{title}</h1>
    {children}
  </section>
);
