import { RoundStatistics } from "../types/round-statistics";

export const discretize = (
  statistics: RoundStatistics[],
  key: string & keyof Omit<RoundStatistics, "squadWiped">,
) => {
  const discreteStatistics: { value: number; count: number }[] = [];

  statistics.forEach((statistic) => {
    const value = statistic[key];
    const existingRecord = discreteStatistics.find(
      (record) => record.value === value,
    );

    if (existingRecord) {
      existingRecord.count++;
    } else {
      discreteStatistics.push({ value, count: 1 });
    }
  });

  return discreteStatistics.sort((a, b) => a.value - b.value);
};
