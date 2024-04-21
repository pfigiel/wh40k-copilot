import { resolveHit } from "./resolve-hit";
import { roll } from "./roll";
import { WeaponEntity } from "@/api/simulation/entities";
import {
  Dice,
  WeaponRerollApplication,
  RerollStrategy,
  RerollType,
  WeaponAttributeType,
} from "@/types";

export const performHitRolls = (weapon: WeaponEntity) => {
  if (weapon.hasAttribute(WeaponAttributeType.TORRENT)) {
    return { isHit: true, isCriticalHit: false };
  }

  const hitRoll = roll(Dice.D6);
  let { isHit, isCriticalHit } = resolveHit(hitRoll, weapon);

  const hitReroll = weapon.getReroll(WeaponRerollApplication.HITS);
  const isRerollAvailable =
    hitReroll &&
    (hitReroll.type === RerollType.ALL ||
      (hitRoll === 1 && hitReroll.type === RerollType.ONES));

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
