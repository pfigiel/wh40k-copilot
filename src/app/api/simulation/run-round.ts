import { DefenderProfileEntity } from "./entities/defender-profile-entity";
import { WeaponProfileEntity } from "./entities/weapon-profile-entity";
import { RoundStatistics } from "./types/round-statistics";
import { WeaponAttributeType } from "./types/weapon-attribute";
import { allocateWounds } from "./utils/allocate-wounds";
import { performHitRolls } from "./utils/perform-hit-rolls";
import { performWoundRolls } from "./utils/perform-wound-rolls";
import { range } from "./utils/range";
import { resolveSave } from "./utils/resolveSave";
import { roll } from "./utils/roll";
import { Dice } from "@/types/dice";

export const runRound = (
  weaponProfiles: WeaponProfileEntity[],
  defenderProfiles: DefenderProfileEntity[],
) => {
  const roundStatistics = new RoundStatistics();
  const initialModelsCount = defenderProfiles.length;

  weaponProfiles.forEach((weaponProfile) => {
    range(weaponProfile.weaponsCount).forEach(() => {
      const additionalBlastAttacks = weaponProfile.hasAttribute(
        WeaponAttributeType.BLAST,
      )
        ? Math.floor(initialModelsCount / 5)
        : 0;

      range(weaponProfile.attacks.resolve() + additionalBlastAttacks).forEach(
        () => {
          if (defenderProfiles.length === 0) {
            return;
          }

          const { isHit, isCriticalHit } = performHitRolls(weaponProfile);

          if (!isHit) {
            return;
          }

          roundStatistics.hits++;

          const isAutoWound =
            isCriticalHit &&
            weaponProfile.hasAttribute(WeaponAttributeType.LETHAL_HITS);

          const sustainedHitsAttribute = weaponProfile.getAttribute(
            WeaponAttributeType.SUSTAINED_HITS,
          );
          const sustainedHitsCount = isCriticalHit
            ? sustainedHitsAttribute?.value ?? 0
            : 0;

          roundStatistics.sustainedHits += sustainedHitsCount;

          resolveWoundsAndSaves(
            weaponProfile,
            defenderProfiles,
            roundStatistics,
            isAutoWound,
          );

          range(sustainedHitsCount).forEach(() => {
            if (defenderProfiles.length === 0) {
              return;
            }

            resolveWoundsAndSaves(
              weaponProfile,
              defenderProfiles,
              roundStatistics,
              false,
            );
          });
        },
      );
    });
  });

  roundStatistics.modelsDestroyed =
    initialModelsCount - defenderProfiles.length;

  roundStatistics.squadWiped = defenderProfiles.length === 0;

  return roundStatistics;
};

const resolveWoundsAndSaves = (
  weaponProfile: WeaponProfileEntity,
  defenderProfiles: DefenderProfileEntity[],
  roundStatistics: RoundStatistics,
  isAutoWound?: boolean,
) => {
  if (!isAutoWound) {
    // TODO: apply rules around critical wounds
    const { isWound } = performWoundRolls(weaponProfile, defenderProfiles);

    if (!isWound) {
      return;
    }
  } else {
    roundStatistics.lethalHits++;
  }

  roundStatistics.wounds++;
  const saveSuccessful = resolveSave(
    roll(Dice.D6),
    weaponProfile.armourPenetration,
    defenderProfiles[0].armourSave,
    defenderProfiles[0].invulnerableSave,
  );

  if (saveSuccessful) {
    roundStatistics.saves++;
    return;
  }

  allocateWounds(defenderProfiles, weaponProfile.damage, roundStatistics);
};
