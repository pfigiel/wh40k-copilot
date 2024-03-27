import { WeaponModifierType } from "../types/weapon-modifier";
import { WeaponProfile } from "../entities/weapon-profile";

export const resolveHit = (
  rollResult: number,
  weaponProfile: WeaponProfile
) => {
  const hitModifier =
    weaponProfile.getModifier(WeaponModifierType.HIT_MODIFIER)?.value ?? 0;
  const criticalHitModifier =
    weaponProfile.getModifier(WeaponModifierType.CRITICAL_HIT_MODIFIER)
      ?.value ?? 0;

  const isHit = rollResult + hitModifier >= weaponProfile.skill;
  const isCriticalHit = rollResult + criticalHitModifier >= 6;

  return { isHit, isCriticalHit };
};
