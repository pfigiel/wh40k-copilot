import { Section } from "@/components";
import { SimulationResults } from "@/types/simulation-results";
import classNames from "classnames";

interface Props {
  className?: string;
  results?: SimulationResults;
}

export const StatisticsSummary = ({ className, results }: Props) => {
  return (
    <Section
      className={classNames("pt-8", className)}
      title="Statistics summary"
    >
      {results ? (
        <Section title="Averages" level={2}>
          <div>Hits: {results.aggregates.hits}</div>
          <div>Wounds: {results.aggregates.wounds}</div>
          <div>Saves: {results.aggregates.saves}</div>
          <div>Passed FNPs: {results.aggregates.fnps}</div>
          <div>Wounds inflicted: {results.aggregates.woundsInflicted}</div>
        </Section>
      ) : (
        <>Statistics will be available after running the simulation</>
      )}
    </Section>
  );
};
