import { Dice } from "./dice";

export type FixedOrRandomizedProperty = {
  value: number;
} & (
  | {
      isFixed: false;
      dice: Dice;
      diceCount: number;
    }
  | {
      isFixed: true;
      dice?: never;
      diceCount?: never;
    }
);
