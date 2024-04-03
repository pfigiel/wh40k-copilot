import { FixedOrRandomizedAttribute } from "./fixed-or-randomized-attribute";

export class FixedAttribute implements FixedOrRandomizedAttribute {
  private attacks: number;

  public constructor(attacks: number) {
    this.attacks = attacks;
  }

  public resolve() {
    return this.attacks;
  }
}
