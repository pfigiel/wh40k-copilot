"use client";

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useWindowScrollPosition } from "rooks";

export const Nav = () => {
  const { scrollY } = useWindowScrollPosition();
  const [isMounted, setMounted] = useState(false);

  const applyConditionalScrollStyles = useCallback(
    (scrolledStyles: string, notScrolledStyles: string) =>
      // mounted check necessary due to initial styles being applied for not scrolled, however page can be refreshed scrolled
      scrollY > 0 && isMounted ? scrolledStyles : notScrolledStyles,
    [isMounted, scrollY],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
