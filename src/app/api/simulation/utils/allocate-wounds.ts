import { DamageReductionType } from "../types/damage-reduction-type";
import { DefenderProfile } from "../entities/defender-profile";
import { range } from "./range";
import { Dice } from "@/types/dice";
import { roll } from "./roll";

export const allocateWounds = (
  defenderProfiles: DefenderProfile[],
  damage: number
) => {
  const woundedDefender = defenderProfiles[0];
  let passedFNPs = 0;

  const damageTaken = (() => {
    switch (woundedDefender.damageReduction) {
      case DamageReductionType.HALVE:
        return Math.ceil(damage / 2);
      case DamageReductionType.REDUCE_BY_ONE:
        return Math.max(damage - 1, 1);
      default:
        return damage;
    }
  })();

  if (woundedDefender.feelNoPain === undefined) {
    woundedDefender.woundsRemaining -= damageTaken;
  } else {
    range(damageTaken).forEach(() => {
      const feelNoPainRoll = roll(Dice.D6);
      if (feelNoPainRoll >= woundedDefender.feelNoPain!) {
        passedFNPs++;
      } else {
        woundedDefender.woundsRemaining -= 1;
      }
    });
  }

  if (woundedDefender.woundsRemaining <= 0) {
    defenderProfiles.shift();
  }

  return passedFNPs;
};
