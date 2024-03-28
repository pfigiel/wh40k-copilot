import { runSimulation } from "./run-simulation";
import { aggregateStatistics } from "./utils/aggregate-statistics";
import { simulationDtoToProfiles } from "./utils/simulation-dto-to-profiles";
import { SimulationRequestDto } from "@/app/dtos/simulation-request-dto";

export const POST = async (request: Request) => {
  const dto: SimulationRequestDto = await request.json();
  const { weaponProfiles, defenderProfile } = simulationDtoToProfiles(dto);

  const statistics = runSimulation(weaponProfiles, defenderProfile);

  return Response.json({ aggregates: aggregateStatistics(statistics) });
};
