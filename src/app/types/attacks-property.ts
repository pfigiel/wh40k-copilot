import { Dice } from "./dice";

export type AttacksProperty = {
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
