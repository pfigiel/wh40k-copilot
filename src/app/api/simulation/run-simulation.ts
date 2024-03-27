import { config } from "./config";
import { DefenderProfile } from "./entities/defender-profile";
import { range } from "./utils/range";
import { RoundStatistics } from "./types/round-statistics";
import { runRound } from "./run-round";
import { WeaponProfile } from "./entities/weapon-profile";

export const runSimulation = (
  weaponProfiles: WeaponProfile[],
  defenderProfile: DefenderProfile,
  modelCount: number
) => {
  const statistics: RoundStatistics[] = [];

  for (let i = 0; i < config.simulationRounds; i++) {
    const defenderProfiles = range(modelCount).map(() => ({
      ...defenderProfile,
    }));
    statistics.push(runRound(weaponProfiles, defenderProfiles));
  }

  console.log(
    `Average hits: ${
      statistics.reduce((prev, curr) => prev + curr.hits, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Average lethal hits: ${
      statistics.reduce((prev, curr) => prev + curr.lethalHits, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Average sustained hits: ${
      statistics.reduce((prev, curr) => prev + curr.sustainedHits, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Average wounds: ${
      statistics.reduce((prev, curr) => prev + curr.wounds, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Average wounds inflicted: ${
      statistics.reduce((prev, curr) => prev + curr.woundsInflicted, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Passed feel no pain checks: ${
      statistics.reduce((prev, curr) => prev + curr.passedFNPs, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Average models destroyed: ${
      statistics.reduce((prev, curr) => prev + curr.modelsDestroyed, 0) /
      config.simulationRounds
    }`
  );
  console.log(
    `Chance to wipe the entire squad: ${
      (statistics.reduce((prev, curr) => prev + (curr.squadWiped ? 1 : 0), 0) /
        config.simulationRounds) *
      100
    }%`
  );
};
