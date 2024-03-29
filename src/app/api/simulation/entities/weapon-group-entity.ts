import { WeaponEntity } from "./weapon-entity";
import { WeaponGroup } from "@/types/weapon-group";

export class WeaponGroupEntity
  extends WeaponEntity
  implements Omit<WeaponGroup, "attacks">
{
  public weaponsCount: number = 1;

  public constructor(initializer?: Partial<WeaponGroupEntity>) {
    const { weaponsCount, ...rest } = initializer ?? {};
    super(rest);
    this.weaponsCount = weaponsCount ?? 0;
  }
}
