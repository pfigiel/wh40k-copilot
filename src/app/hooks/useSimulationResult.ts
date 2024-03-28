import { SimulationRequestDto } from "@/dtos/simulation-request-dto";
import { SimulationResponseDto } from "@/dtos/simulation-response-dto";
import { SimulationResults } from "@/types/simulation-results";
import useSWR from "swr";

export const useSimulationResult = (dto?: SimulationRequestDto) => {
  const { data, error, isLoading } = useSWR<SimulationResponseDto>(
    dto ? ["api/simulation", JSON.stringify(dto)] : null,
    ([path]) =>
      fetch(path, {
        method: "POST",
        body: JSON.stringify(dto),
      }).then((res) => res.json()),
  );

  return {
    simulationResults: data as SimulationResults | undefined,
    simulationError: error,
    isSimulationLoading: isLoading,
  };
};
