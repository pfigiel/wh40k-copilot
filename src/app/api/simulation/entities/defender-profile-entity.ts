import { DamageReductionType } from "../types/damage-reduction-type";
import { DefenderProfile } from "@/app/types/defender-profile";

export class DefenderProfileEntity implements DefenderProfile {
  public armourSave: number = 6;
  public feelNoPain?: number;
  public invulnerableSave?: number;
  public toughness: number = 1;
  public wounds: number = 1;
  public modelsCount: number = 1;
  public woundsRemaining: number;
  public damageReduction?: DamageReductionType;

  public constructor(
    initializer: Omit<DefenderProfileEntity, "woundsRemaining">,
  ) {
    Object.assign(this, initializer);
    this.woundsRemaining = initializer.wounds;
  }
}
