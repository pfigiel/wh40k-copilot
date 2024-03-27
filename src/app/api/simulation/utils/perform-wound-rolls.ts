import { DefenderProfile } from "../entities/defender-profile";
import { WeaponProfile } from "../entities/weapon-profile";
import { Dice } from "@/types/dice";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { WeaponAttributeType } from "../types/weapon-attribute";
import { resolveWound } from "./resolve-wound";
import { roll } from "./roll";

export const performWoundRolls = (
  weaponProfile: WeaponProfile,
  defenderProfiles: DefenderProfile[]
) => {
  const woundRoll = roll(Dice.D6);
  let { isWound, isCriticalWound } = resolveWound(
    roll(Dice.D6),
    weaponProfile,
    defenderProfiles[0].toughness
  );

  const isRerollAvailable =
    weaponProfile.woundRerollType === RerollType.ALL ||
    weaponProfile.hasAttribute(WeaponAttributeType.TWIN_LINKED) ||
    (woundRoll === 1 && weaponProfile.woundRerollType === RerollType.ONES);

  const shouldRerollByFishingStrategy =
    weaponProfile.hasRerollStrategy(RerollStrategy.FISH_FOR_CRITICAL_WOUNDS) &&
    !isCriticalWound;

  const shouldRerollByDefaultStrategy =
    !shouldRerollByFishingStrategy && !isWound;

  const shouldReroll =
    isRerollAvailable &&
    (shouldRerollByDefaultStrategy || shouldRerollByFishingStrategy);

  if (!shouldReroll) {
    return { isWound, isCriticalWound };
  }

  return resolveWound(
    roll(Dice.D6),
    weaponProfile,
    defenderProfiles[0].toughness
  );
};
