import { AttacksProperty } from "./attacks-property";

export interface WeaponProfile {
  attacks: AttacksProperty;
  skill: number;
  strength: number;
  armourPenetration: number;
  damage: number;
  weaponsCount: number;
}
