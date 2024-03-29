import { runSimulation } from "./run-simulation";
import { aggregateStatistics } from "./utils/aggregate-statistics";
import { simulationDtoToGroups } from "./utils/simulation-dto-to-groups";
import { SimulationRequestDto } from "@/app/dtos/simulation-request-dto";

export const POST = async (request: Request) => {
  const dto: SimulationRequestDto = await request.json();
  const { weaponGroups, defenderGroups } = simulationDtoToGroups(dto);

  const statistics = runSimulation(weaponGroups, defenderGroups);

  return Response.json({ aggregates: aggregateStatistics(statistics) });
};
