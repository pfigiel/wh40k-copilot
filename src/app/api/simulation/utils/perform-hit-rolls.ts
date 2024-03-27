import { Dice } from "../types/dice";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { resolveHit } from "./resolve-hit";
import { roll } from "./roll";
import { WeaponProfile } from "../entities/weapon-profile";

export const performHitRolls = (weaponProfile: WeaponProfile) => {
  const hitRoll = roll(Dice.D6);
  let { isHit, isCriticalHit } = resolveHit(hitRoll, weaponProfile);

  const isRerollAvailable =
    weaponProfile.hitRerollType === RerollType.ALL ||
    (hitRoll === 1 && weaponProfile.hitRerollType === RerollType.ONES);

  const shouldRerollByFishingStrategy =
    weaponProfile.hasRerollStrategy(RerollStrategy.FISH_FOR_CRITICAL_HITS) &&
    !isCriticalHit;

  const shouldRerollByDefaultStrategy =
    !shouldRerollByFishingStrategy && !isHit;

  const shouldReroll =
    isRerollAvailable &&
    (shouldRerollByDefaultStrategy || shouldRerollByFishingStrategy);

  if (!shouldReroll) {
    return { isHit, isCriticalHit };
  }

  return resolveHit(roll(Dice.D6), weaponProfile);
};
