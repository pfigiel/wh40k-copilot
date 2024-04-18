import { WeaponEntity } from "@/api/simulation/entities";
import { WeaponModifierType } from "@/types";

export const resolveHit = (rollResult: number, weapon: WeaponEntity) => {
  const hitModifier =
    weapon.getModifier(WeaponModifierType.HIT_MODIFIER)?.value ?? 0;
  const criticalHitModifier =
    weapon.getModifier(WeaponModifierType.CRITICAL_HIT_MODIFIER)?.value ?? 0;

  const isHit = rollResult + hitModifier >= weapon.skill;
  const isCriticalHit = rollResult + criticalHitModifier >= 6;

  return { isHit, isCriticalHit };
};
