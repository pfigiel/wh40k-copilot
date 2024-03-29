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

// suppress recharts errors as there is no fix available yet (https://github.com/recharts/recharts/issues/3615)
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

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
          <Section className="flex gap-8" title="Averages" level={2}>
            <div>
              <div>Hits:</div>
              <div>Wounds:</div>
              <div>Saves:</div>
              <div>Passed FNPs:</div>
              <div>Wounds inflicted:</div>
              <div>Models destroyed:</div>
              <div>Wipe chance:</div>
            </div>
            <div>
              <div>{results.aggregates.average.hits.toFixed(2)}</div>
              <div>{results.aggregates.average.wounds.toFixed(2)}</div>
              <div>{results.aggregates.average.saves.toFixed(2)}</div>
              <div>{results.aggregates.average.fnps.toFixed(2)}</div>
              <div>{results.aggregates.average.woundsInflicted.toFixed(2)}</div>
              <div>{results.aggregates.average.modelsDestroyed.toFixed(2)}</div>
              <div>
                {(results.aggregates.average.wipeChance * 100).toFixed(2)}%
              </div>
            </div>
          </Section>
          <Section
            className="mt-8 flex flex-wrap gap-5"
            title="Charts"
            level={2}
          >
            {chartKeys.map((key) => (
              <Section
                key={key}
                className="basis-1/2 pb-1"
                style={{ maxWidth: "calc(50% - 0.625rem)" }}
                title={dataKeyToSectionTitle(key)}
                level={3}
              >
                <ResponsiveContainer
                  className="relative -left-2"
                  width="100%"
                  height={150}
                >
                  <BarChart data={results.aggregates.discrete[key]}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="value" />
                    <YAxis dataKey="count" />
                    <Bar dataKey="count" fill="#cbd5e1" barSize={30} />
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
