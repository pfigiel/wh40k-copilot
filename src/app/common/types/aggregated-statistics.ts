import { NumericStatisticType } from "./numeric-statistic-type";

export interface AggregatedStatistics {
  average: {
    [key in NumericStatisticType]: number;
  } & {
    wipeChance: number;
  };
  discrete: {
    [key in NumericStatisticType]: { value: number; count: number }[];
  };
}
