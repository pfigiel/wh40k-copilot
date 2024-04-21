import { resolveWound } from "./resolve-wound";
import { roll } from "./roll";
import { DefenderEntity, WeaponEntity } from "@/api/simulation/entities";
import {
  Dice,
  WeaponRerollApplication,
  RerollStrategy,
  RerollType,
  WeaponAttributeType,
} from "@/types";

export const performWoundRolls = (
  weapon: WeaponEntity,
  defenders: DefenderEntity[],
) => {
  const woundRoll = roll(Dice.D6);
  let { isWound, isCriticalWound } = resolveWound(
    roll(Dice.D6),
    weapon,
    defenders[0].toughness,
  );

  const woundReroll = weapon.getReroll(WeaponRerollApplication.WOUNDS);
  const isRerollAvailable =
    woundReroll &&
    (woundReroll.type === RerollType.ALL ||
      weapon.hasAttribute(WeaponAttributeType.TWIN_LINKED) ||
      (woundRoll === 1 && woundReroll.type === RerollType.ONES));

  const shouldRerollByFishingStrategy =
    weapon.hasRerollStrategy(RerollStrategy.FISH_FOR_CRITICAL_WOUNDS) &&
    !isCriticalWound;

  const shouldRerollByDefaultStrategy =
    !shouldRerollByFishingStrategy && !isWound;

  const shouldReroll =
    isRerollAvailable &&
    (shouldRerollByDefaultStrategy || shouldRerollByFishingStrategy);

  if (!shouldReroll) {
    return { isWound, isCriticalWound };
  }

  return resolveWound(roll(Dice.D6), weapon, defenders[0].toughness);
};
