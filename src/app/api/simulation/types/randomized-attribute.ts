import { roll } from "../utils/roll";
import { FixedOrRandomizedAttribute } from "./fixed-or-randomized-attribute";
import { Dice } from "@/types/dice";

export class RandomizedAttribute implements FixedOrRandomizedAttribute {
  private dice: Dice;
  private diceCount: number;
  private modifier: number;

  public constructor(dice: Dice, diceCount: number = 1, modifier: number = 0) {
    this.dice = dice;
    this.diceCount = diceCount;
    this.modifier = modifier;
  }

  public resolve() {
    return this.diceCount * roll(this.dice) + this.modifier;
  }
}
