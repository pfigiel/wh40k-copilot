import { DefenderEntity } from "./entities/defender-entity";
import { DefenderGroupEntity } from "./entities/defender-group-entity";
import { WeaponEntity } from "./entities/weapon-entity";
import { WeaponGroupEntity } from "./entities/weapon-group-entity";
import { RoundStatistics } from "./types/round-statistics";
import { WeaponAttributeType } from "./types/weapon-attribute";
import { allocateWounds } from "./utils/allocate-wounds";
import { performHitRolls } from "./utils/perform-hit-rolls";
import { performWoundRolls } from "./utils/perform-wound-rolls";
import { range } from "./utils/range";
import { resolveSave } from "./utils/resolveSave";
import { roll } from "./utils/roll";
import { Dice } from "@/types/dice";

export const runSimulationRound = (
  weaponGroups: WeaponGroupEntity[],
  defenderGroups: DefenderGroupEntity[],
) => {
  const roundStatistics = new RoundStatistics();
  const remainingDefenders: DefenderEntity[] = defenderGroups
    .map((defenderGroup) =>
      range(defenderGroup.modelsCount).map(() => {
        const { modelsCount, ...rest } = defenderGroup;
        return rest;
      }),
    )
    .flat();
  const initialModelsCount = remainingDefenders.length;

  weaponGroups.forEach((weaponGroup) => {
    range(weaponGroup.weaponsCount).forEach(() => {
      const weapon = weaponGroup as WeaponEntity;

      const additionalBlastAttacks = weapon.hasAttribute(
        WeaponAttributeType.BLAST,
      )
        ? Math.floor(initialModelsCount / 5)
        : 0;

      range(weapon.attacks.resolve() + additionalBlastAttacks).forEach(() => {
        if (checkEndCondition(remainingDefenders, roundStatistics)) {
          return;
        }

        const { isHit, isCriticalHit } = performHitRolls(weapon);

        if (!isHit) {
          return;
        }

        roundStatistics.hits++;

        const isAutoWound =
          isCriticalHit && weapon.hasAttribute(WeaponAttributeType.LETHAL_HITS);

        const sustainedHitsAttribute = weapon.getAttribute(
          WeaponAttributeType.SUSTAINED_HITS,
        );
        const sustainedHitsCount = isCriticalHit
          ? sustainedHitsAttribute?.value ?? 0
          : 0;

        roundStatistics.sustainedHits += sustainedHitsCount;

        resolveWoundsAndSaves(
          weapon,
          remainingDefenders,
          roundStatistics,
          isAutoWound,
        );

        range(sustainedHitsCount).forEach(() => {
          if (checkEndCondition(remainingDefenders, roundStatistics)) {
            return;
          }

          resolveWoundsAndSaves(
            weapon,
            remainingDefenders,
            roundStatistics,
            false,
          );
        });
      });
    });
  });

  roundStatistics.modelsDestroyed =
    initialModelsCount - remainingDefenders.length;

  roundStatistics.modelsDestroyed =
    initialModelsCount - remainingDefenders.length;
  roundStatistics.squadWiped = remainingDefenders.length === 0;

  return roundStatistics;
};

const resolveWoundsAndSaves = (
  weapon: WeaponEntity,
  defenders: DefenderEntity[],
  roundStatistics: RoundStatistics,
  isAutoWound?: boolean,
) => {
  if (!isAutoWound) {
    // TODO: apply rules around critical wounds
    const { isWound } = performWoundRolls(weapon, defenders);

    if (!isWound) {
      return;
    }
  } else {
    roundStatistics.lethalHits++;
  }

  roundStatistics.wounds++;
  const saveSuccessful = resolveSave(
    roll(Dice.D6),
    weapon.armourPenetration,
    defenders[0].armourSave,
    defenders[0].invulnerableSave,
  );

  if (saveSuccessful) {
    roundStatistics.saves++;
    return;
  }

  allocateWounds(defenders, weapon.damage, roundStatistics);
};

const checkEndCondition = (
  defenders: DefenderEntity[],
  statistics: RoundStatistics,
) => {
  if (defenders.length) {
    return false;
  }

  statistics.squadWiped = true;
  return true;
};
