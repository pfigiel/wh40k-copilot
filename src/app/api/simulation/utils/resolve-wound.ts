import { checkWound } from "./check-wound";
import { WeaponProfile } from "../entities/weapon-profile";

export const resolveWound = (
  rollResult: number,
  weaponProfile: WeaponProfile,
  toughness: number,
  modifiers?: {
    criticalModifier?: number;
    woundModifier?: number;
  }
) => {
  const isWound = checkWound(
    rollResult + (modifiers?.woundModifier ?? 0),
    weaponProfile.strength,
    toughness
  );
  const isCriticalWound = rollResult + (modifiers?.criticalModifier ?? 0) >= 6;

  return { isWound, isCriticalWound };
};
