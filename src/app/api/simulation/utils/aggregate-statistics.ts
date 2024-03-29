import { RoundStatistics } from "../types/round-statistics";
import { average } from "./average";
import { AggregatedStatistics } from "@/types/aggregated-statistics";

export const aggregateStatistics = (
  statistics: RoundStatistics[],
): AggregatedStatistics => ({
  hits: average(statistics.map((statistic) => statistic.hits)),
  wounds: average(statistics.map((statistic) => statistic.wounds)),
  saves: average(statistics.map((statistic) => statistic.saves)),
  fnps: average(statistics.map((statistic) => statistic.passedFNPs)),
  woundsInflicted: average(
    statistics.map((statistic) => statistic.woundsInflicted),
  ),
  modelsDestroyed: average(
    statistics.map((statistic) => statistic.modelsDestroyed),
  ),
  wipeChance:
    statistics.reduce((prev, curr) => prev + (curr.squadWiped ? 1 : 0), 0) /
    statistics.length,
});
