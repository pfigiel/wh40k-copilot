import { Dice } from "@/types/dice";

export interface SimulationDto {
  weaponProfiles: {
    attacks: {
      value: number;
      dice: Dice;
    };
    skill: number;
    strength: number;
    armourPenetration: number;
    damage: number;
    weaponsCount: number;
  }[];
  defenderProfile: {
    toughness: number;
    armourSave: number;
    invulnerableSave: number;
    feelNoPain: number;
    wounds: number;
    modelsCount: number;
  };
}
