import { config } from "./config";
import { DefenderProfileEntity } from "./entities/defender-profile-entity";
import { range } from "./utils/range";
import { RoundStatistics } from "./types/round-statistics";
import { runRound } from "./run-round";
import { WeaponProfileEntity } from "./entities/weapon-profile-entity";

export const runSimulation = (
  weaponProfiles: WeaponProfileEntity[],
  defenderProfile: DefenderProfileEntity
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
