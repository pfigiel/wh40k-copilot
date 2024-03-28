export interface SimulationFormValues {
  weaponProfiles: {
    attacks?: string;
    skill?: string;
    strength?: string;
    armourPenetration?: string;
    damage?: string;
    weaponsCount?: string;
  }[];
  defenderProfile: {
    toughness?: string;
    armourSave?: string;
    invulnerableSave?: string;
    feelNoPain?: string;
    wounds?: string;
    modelsCount?: string;
  };
}
