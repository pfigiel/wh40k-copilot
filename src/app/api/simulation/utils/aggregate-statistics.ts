import { RoundStatistics } from "../types/round-statistics";
import { average } from "./average";

export const aggregateStatistics = (statistics: RoundStatistics[]) => ({
  hits: average(statistics.map((statistic) => statistic.hits)),
  wounds: average(statistics.map((statistic) => statistic.wounds)),
  saves: average(statistics.map((statistic) => statistic.saves)),
  fnps: average(statistics.map((statistic) => statistic.passedFNPs)),
  woundsInflicted: average(
    statistics.map((statistic) => statistic.woundsInflicted),
  ),
});
