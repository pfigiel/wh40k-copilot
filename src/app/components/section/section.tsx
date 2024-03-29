import classNames from "classnames";
import { ReactNode } from "react";

type Level = 1 | 2;

interface HeadingProps {
  level?: Level;
  children: ReactNode;
}

interface Props extends HeadingProps {
  className?: string;
  title: string;
}

const Heading = ({ level = 1, children }: HeadingProps) => {
  const baseClassName = "absolute bg-slate-800 p-1";

  switch (level) {
    case 1:
      return (
        <h1 className={classNames(baseClassName, "-top-6 text-2xl")}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={classNames(baseClassName, "-top-5 text-xl")}>
          {children}
        </h2>
      );
  }
};

export const Section = ({ children, className, level, title }: Props) => (
  <section
    className={classNames(
      "relative border border-solid border-slate-300 p-6 pt-8",
      {
        "p-4 pt-5": level == 2,
      },
      className,
    )}
  >
    <Heading level={level}>{title}</Heading>
    {children}
  </section>
);
