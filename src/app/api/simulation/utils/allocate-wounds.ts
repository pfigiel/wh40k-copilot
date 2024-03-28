import { DefenderProfileEntity } from "../entities/defender-profile-entity";
import { DamageReductionType } from "../types/damage-reduction-type";
import { RoundStatistics } from "../types/round-statistics";
import { range } from "./range";
import { roll } from "./roll";
import { Dice } from "@/types/dice";

export const allocateWounds = (
  defenderProfiles: DefenderProfileEntity[],
  damage: number,
  statistics: RoundStatistics,
) => {
  const woundedDefender = defenderProfiles[0];

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
    statistics.woundsInflicted += damageTaken;
  } else {
    range(damageTaken).forEach(() => {
      const feelNoPainRoll = roll(Dice.D6);
      if (feelNoPainRoll >= woundedDefender.feelNoPain!) {
        statistics.passedFNPs++;
      } else {
        woundedDefender.woundsRemaining -= 1;
        statistics.woundsInflicted += 1;
      }
    });
  }

  if (woundedDefender.woundsRemaining <= 0) {
    defenderProfiles.shift();
  }
};
