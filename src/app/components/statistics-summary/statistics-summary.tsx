import { dataKeyToSectionTitle } from "./data-key-to-section-title";
import { Section } from "@/components";
import { SimulationResults } from "@/types/simulation-results";
import classNames from "classnames";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  className?: string;
  results?: SimulationResults;
}

export const StatisticsSummary = ({ className, results }: Props) => {
  const chartKeys = results
    ? (Object.keys(results.aggregates.discrete) as (string &
        keyof typeof results.aggregates.discrete)[])
    : [];

  return (
    <Section
      className={classNames("pt-8", className)}
      title="Statistics summary"
    >
      {results ? (
        <>
          <Section title="Averages" level={2}>
            <div>Hits: {results.aggregates.average.hits}</div>
            <div>Wounds: {results.aggregates.average.wounds}</div>
            <div>Saves: {results.aggregates.average.saves}</div>
            <div>Passed FNPs: {results.aggregates.average.fnps}</div>
            <div>
              Wounds inflicted: {results.aggregates.average.woundsInflicted}
            </div>
            <div>
              Models destroyed: {results.aggregates.average.modelsDestroyed}
            </div>
            <div>
              Wipe chance: {results.aggregates.average.wipeChance * 100}%
            </div>
          </Section>
          <Section className="mt-8 flex flex-wrap" title="Charts" level={2}>
            {chartKeys.map((key) => (
              <Section
                key={key}
                className="basis-1/2"
                title={dataKeyToSectionTitle(key)}
                level={3}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={results.aggregates.discrete[key]}
                    width={730}
                    height={250}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey={"value"} />
                    <YAxis />
                    {results.aggregates.discrete[key].map((record) => (
                      <Bar key={record.value} dataKey="count" fill="#cbd5e1" />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </Section>
            ))}
          </Section>
        </>
      ) : (
        <>Statistics will become available after running the simulation.</>
      )}
    </Section>
  );
};
