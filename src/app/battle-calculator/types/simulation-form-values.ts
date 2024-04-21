interface WeaponAttributeFormValues {
  type?: string;
  value?: string;
}

interface RerollsFormValues {
  application?: string;
  type?: string;
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
    rerolls?: RerollsFormValues[];
  }[];
  defenderGroups: {
    toughness?: string;
    armourSave?: string;
    invulnerableSave?: string;
    feelNoPain?: string;
    wounds?: string;
    modelsCount?: string;
    saveRerollType?: string;
  }[];
}
