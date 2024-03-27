import { Dice } from "./dice";

export interface CalculatorFormValues {
  weaponProfiles: {
    attacks?: {
      // isFixed: boolean;
      value?: number;
      // dice: Dice;
      // diceCount: number;
    };
    skill?: number;
    strength?: number;
    armourPenetration?: number;
    damage?: number;
    weaponsCount?: number;
  }[];
  defenderProfile: {
    toughness?: number;
    armourSave?: number;
    invulnerableSave?: number;
    feelNoPain?: number;
    wounds?: number;
    modelsCount?: number;
  };
}
