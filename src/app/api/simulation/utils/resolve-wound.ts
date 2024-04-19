import { checkWound } from "./check-wound";
import { WeaponEntity } from "@/api/simulation/entities";
import { WeaponAttributeType } from "@/types";

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

  const antiAttribute = weapon.getAttribute(WeaponAttributeType.ANTI);
  const criticalThreshold = antiAttribute?.value ?? 6;
  const isCriticalWound =
    rollResult + (modifiers?.criticalModifier ?? 0) >= criticalThreshold;

  return { isWound, isCriticalWound };
};
