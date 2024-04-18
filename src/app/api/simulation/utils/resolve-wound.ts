import { checkWound } from "./check-wound";
import { WeaponEntity } from "@/api/simulation/entities";

export const resolveWound = (
  rollResult: number,
  weapon: WeaponEntity,
  toughness: number,
  modifiers?: {
    criticalModifier?: number;
    woundModifier?: number;
  },
) => {
  const isWound = checkWound(
    rollResult + (modifiers?.woundModifier ?? 0),
    weapon.strength,
    toughness,
  );
  const isCriticalWound = rollResult + (modifiers?.criticalModifier ?? 0) >= 6;

  return { isWound, isCriticalWound };
};
