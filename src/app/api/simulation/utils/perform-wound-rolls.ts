import { DefenderEntity } from "../entities/defender-entity";
import { WeaponEntity } from "../entities/weapon-entity";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { resolveWound } from "./resolve-wound";
import { roll } from "./roll";
import { Dice } from "@/types/dice";
import { WeaponAttributeType } from "@/types/weapon-attribute";

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

  const isRerollAvailable =
    weapon.woundRerollType === RerollType.ALL ||
    weapon.hasAttribute(WeaponAttributeType.TWIN_LINKED) ||
    (woundRoll === 1 && weapon.woundRerollType === RerollType.ONES);

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
