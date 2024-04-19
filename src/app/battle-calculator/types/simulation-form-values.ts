import { WeaponAttributeType } from "@/types";

interface WeaponAttributeFormValues {
  type?: WeaponAttributeType;
  value?: string;
}

export interface SimulationFormValues {
  weaponGroups: {
    attacks?: string;
    skill?: string;
    strength?: string;
    armourPenetration?: string;
    damage?: string;
    weaponsCount?: string;
    attributes?: WeaponAttributeFormValues[];
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
