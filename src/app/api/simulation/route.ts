import { SimulationDto } from "@/app/dtos/simulation-dto";
import { simulationDtoToProfiles } from "./utils/simulation-dto-to-profiles";
import { runSimulation } from "./run-simulation";
import { aggregateStatistics } from "./utils/aggregate-statistics";

export const POST = async (request: Request) => {
  const dto: SimulationDto = await request.json();
  const { weaponProfiles, defenderProfile } = simulationDtoToProfiles(dto);

  const statistics = runSimulation(weaponProfiles, defenderProfile);

  return Response.json(aggregateStatistics(statistics));
};
