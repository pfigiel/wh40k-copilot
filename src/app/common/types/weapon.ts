import { FixedOrRandomizedProperty } from "./fixed-or-randomized-property";
import { WeaponReroll } from "./reroll";
import { WeaponAttribute } from "./weapon-attribute";

export interface Weapon {
  attacks: FixedOrRandomizedProperty;
  skill: number;
  strength: number;
  armourPenetration: number;
  damage: FixedOrRandomizedProperty;
  attributes?: WeaponAttribute[];
  rerolls?: WeaponReroll[];
}
