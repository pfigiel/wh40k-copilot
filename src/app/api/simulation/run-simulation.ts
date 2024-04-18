import { config } from "./config";
import { DefenderGroupEntity } from "./entities/defender-group-entity";
import { WeaponGroupEntity } from "./entities/weapon-group-entity";
import { runSimulationRound } from "./run-simulation-round";
import { RoundStatistics } from "./types/round-statistics";
import { range } from "@/utils/range";

export const runSimulation = (
  weaponGroups: WeaponGroupEntity[],
  defenderGroups: DefenderGroupEntity[],
) => {
  const statistics: RoundStatistics[] = [];

  range(config.simulationRounds).forEach(() => {
    statistics.push(runSimulationRound(weaponGroups, defenderGroups));
  });

  return statistics;
};
