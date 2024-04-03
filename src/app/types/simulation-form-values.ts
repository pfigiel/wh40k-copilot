import { WeaponAttribute } from "./weapon-attribute";

export interface SimulationFormValues {
  weaponGroups: {
    attacks?: string;
    skill?: string;
    strength?: string;
    armourPenetration?: string;
    damage?: string;
    weaponsCount?: string;
    attributes?: Partial<WeaponAttribute>[];
  }[];
  defenderGroups: {
    toughness?: string;
    armourSave?: string;
    invulnerableSave?: string;
    feelNoPain?: string;
    wounds?: string;
    modelsCount?: string;
  }[];
}
