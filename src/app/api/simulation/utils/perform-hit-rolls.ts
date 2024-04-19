import { resolveHit } from "./resolve-hit";
import { roll } from "./roll";
import { WeaponEntity } from "@/api/simulation/entities";
import { Dice, RerollStrategy, RerollType, WeaponAttributeType } from "@/types";

export const performHitRolls = (weapon: WeaponEntity) => {
  if (weapon.hasAttribute(WeaponAttributeType.TORRENT)) {
    return { isHit: true, isCriticalHit: false };
  }

  const hitRoll = roll(Dice.D6);
  let { isHit, isCriticalHit } = resolveHit(hitRoll, weapon);

  const isRerollAvailable =
    weapon.hitRerollType === RerollType.ALL ||
    (hitRoll === 1 && weapon.hitRerollType === RerollType.ONES);

  const shouldRerollByFishingStrategy =
    weapon.hasRerollStrategy(RerollStrategy.FISH_FOR_CRITICAL_HITS) &&
    !isCriticalHit;

  const shouldRerollByDefaultStrategy =
    !shouldRerollByFishingStrategy && !isHit;

  const shouldReroll =
    isRerollAvailable &&
    (shouldRerollByDefaultStrategy || shouldRerollByFishingStrategy);

  if (!shouldReroll) {
    return { isHit, isCriticalHit };
  }

  return resolveHit(roll(Dice.D6), weapon);
};
