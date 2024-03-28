import { checkWound } from "./check-wound";
import { WeaponProfileEntity } from "../entities/weapon-profile-entity";

export const resolveWound = (
  rollResult: number,
  weaponProfile: WeaponProfileEntity,
  toughness: number,
  modifiers?: {
    criticalModifier?: number;
    woundModifier?: number;
  },
) => {
  const isWound = checkWound(
    rollResult + (modifiers?.woundModifier ?? 0),
    weaponProfile.strength,
    toughness,
  );
  const isCriticalWound = rollResult + (modifiers?.criticalModifier ?? 0) >= 6;

  return { isWound, isCriticalWound };
};
