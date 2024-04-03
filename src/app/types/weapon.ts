import { FixedOrRandomizedProperty } from "./fixed-or-randomized-property";

export interface Weapon {
  attacks: FixedOrRandomizedProperty;
  skill: number;
  strength: number;
  armourPenetration: number;
  damage: FixedOrRandomizedProperty;
}
