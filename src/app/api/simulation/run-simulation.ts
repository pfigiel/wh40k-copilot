import { config } from "./config";
import { DefenderProfileEntity } from "./entities/defender-profile-entity";
import { WeaponProfileEntity } from "./entities/weapon-profile-entity";
import { runRound } from "./run-round";
import { RoundStatistics } from "./types/round-statistics";
import { range } from "./utils/range";

export const runSimulation = (
  weaponProfiles: WeaponProfileEntity[],
  defenderProfile: DefenderProfileEntity,
) => {
  const statistics: RoundStatistics[] = [];

  for (let i = 0; i < config.simulationRounds; i++) {
    const defenderProfiles = range(defenderProfile.modelsCount).map(() => ({
      ...defenderProfile,
    }));
    statistics.push(runRound(weaponProfiles, defenderProfiles));
  }

  return statistics;
};
