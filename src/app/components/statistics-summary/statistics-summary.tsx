import { Section } from "@/components";
import { SimulationResults } from "@/types/simulation-results";

interface Props {
  results?: SimulationResults;
}

export const StatisticsSummary = ({ results }: Props) => {
  return results ? (
    <Section className="pt-8" title="Statistics summary">
      <Section title="Averages">
        <div>Hits: {results.aggregates.hits}</div>
        <div>Wounds: {results.aggregates.wounds}</div>
        <div>Saves: {results.aggregates.saves}</div>
        <div>Passed FNPs: {results.aggregates.fnps}</div>
        <div>Wounds inflicted: {results.aggregates.woundsInflicted}</div>
      </Section>
    </Section>
  ) : null;
};
