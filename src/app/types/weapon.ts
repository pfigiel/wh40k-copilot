import { AttacksProperty } from "./attacks-property";

export interface Weapon {
  attacks: AttacksProperty;
  skill: number;
  strength: number;
  armourPenetration: number;
  damage: number;
}
