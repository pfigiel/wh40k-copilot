import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const H1 = ({ children }: Props) => (
  <h1 className="text-2xl">{children}</h1>
);
