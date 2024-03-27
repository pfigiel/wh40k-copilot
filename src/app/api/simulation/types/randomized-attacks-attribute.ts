import { AttacksAttribute } from "./attacks-attribute";
import { Dice } from "@/types/dice";
import { roll } from "../utils/roll";

export class RandomizedAttacksAttribute implements AttacksAttribute {
  private dice: Dice;
  private modifier: number;

  public constructor(dice: number, modifier?: number) {
    this.dice = dice;
    this.modifier = modifier ?? 0;
  }

  public resolve() {
    return roll(this.dice) + this.modifier;
  }
}
