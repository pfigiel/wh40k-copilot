import { FixedOrRandomizedAttribute } from "./fixed-or-randomized-attribute";
import { roll } from "@/api/simulation/utils";
import { Dice } from "@/types";

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
