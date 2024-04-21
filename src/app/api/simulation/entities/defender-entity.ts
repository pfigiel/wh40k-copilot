import { DamageReductionType, Defender, RerollType } from "@/types";

export class DefenderEntity implements Defender {
  public armourSave: number = 6;
  public feelNoPain?: number;
  public invulnerableSave?: number;
  public toughness: number = 1;
  public wounds: number = 1;
  public woundsRemaining: number;
  public damageReduction?: DamageReductionType;
  public saveRerollType?: RerollType;

  public constructor(
    initializer: Partial<Omit<DefenderEntity, "woundsRemaining">>,
  ) {
    Object.assign(this, initializer);
    this.woundsRemaining = initializer.wounds ?? 1;
  }
}
