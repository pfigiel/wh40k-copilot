import { WeaponEntity } from "./weapon-entity";
import { WeaponGroup } from "@/types";

export class WeaponGroupEntity
  extends WeaponEntity
  implements Omit<WeaponGroup, "attacks" | "damage">
{
  public weaponsCount: number = 1;

  public constructor(initializer?: Partial<WeaponGroupEntity>) {
    const { weaponsCount, ...rest } = initializer ?? {};
    super(rest);
    this.weaponsCount = weaponsCount ?? 0;
  }
}
