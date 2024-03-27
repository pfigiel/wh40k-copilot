import { AttacksAttribute } from "./attacks-attribute";

export class FixedAttacksAttribute implements AttacksAttribute {
  private attacks: number;

  public constructor(attacks: number) {
    this.attacks = attacks;
  }

  public resolve() {
    return this.attacks;
  }
}
