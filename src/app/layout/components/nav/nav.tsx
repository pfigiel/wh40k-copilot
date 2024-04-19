"use client";

import classNames from "classnames";
import { useDebouncedValue, useWindowScrollPosition } from "rooks";

export const Nav = () => {
  const { scrollY } = useWindowScrollPosition();
  const [isScrolledDebounced] = useDebouncedValue(scrollY > 0, 20);

  const applyConditionalScrollStyles = (
    scrolledStyles: string,
    notScrolledStyles: string,
  ) => (isScrolledDebounced ? scrolledStyles : notScrolledStyles);

  return (
    <>
      <nav
        className={classNames(
          "fixed top-0 z-50 flex w-full items-baseline gap-4 border-b border-solid border-slate-600 bg-black px-8 align-middle text-slate-300 transition-all duration-200",
          applyConditionalScrollStyles("py-2", "py-4"),
        )}
      >
        <h1
          className={classNames(
            "w-44 origin-top-left font-bold transition-all duration-200",
            applyConditionalScrollStyles("text-l", "text-xl"),
          )}
        >
          WH40K Copilot
        </h1>
        <p
          className={classNames(
            "h-fit align-middle text-sm transition-all duration-200",
            applyConditionalScrollStyles("opacity-0", ""),
          )}
        >
          Statistics battle-calculator for Warhammer 40K
        </p>
      </nav>
      {/* Padding for the fixed header */}
      <div className="h-16" />
    </>
  );
};
