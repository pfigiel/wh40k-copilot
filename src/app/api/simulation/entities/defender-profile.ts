import { DamageReductionType } from "../types/damage-reduction-type";

export class DefenderProfile {
  public armourSave: number = 6;
  public feelNoPain?: number;
  public invulnerableSave?: number;
  public toughness: number = 1;
  public wounds: number = 1;
  public woundsRemaining: number;
  public damageReduction?: DamageReductionType;

  public constructor(initializer: Omit<DefenderProfile, "woundsRemaining">) {
    Object.assign(this, initializer);
    this.woundsRemaining = initializer.wounds;
  }
}
