import { DamageReductionType } from "../types/damage-reduction-type";
import { Defender } from "@/types/defender";

export class DefenderEntity implements Defender {
  public armourSave: number = 6;
  public feelNoPain?: number;
  public invulnerableSave?: number;
  public toughness: number = 1;
  public wounds: number = 1;
  public woundsRemaining: number;
  public damageReduction?: DamageReductionType;

  public constructor(
    initializer: Partial<Omit<DefenderEntity, "woundsRemaining">>,
  ) {
    Object.assign(this, initializer);
    this.woundsRemaining = initializer.wounds ?? 1;
  }
}