import { SimulationResults } from "@/battle-calculator/types";
import { disableSwrRevalidationOptions } from "@/constants";
import { SimulationRequestDto, SimulationResponseDto } from "@/dtos";
import useSWR from "swr";

export const useSimulationResult = (dto?: SimulationRequestDto) => {
  const { data, error, isLoading } = useSWR<SimulationResponseDto>(
    dto ? ["api/simulation", JSON.stringify(dto)] : null,
    ([path]) =>
      fetch(path, {
        method: "POST",
        body: JSON.stringify(dto),
      }).then((res) => res.json()),
    disableSwrRevalidationOptions,
  );

  return {
    simulationResults: data as SimulationResults | undefined,
    simulationError: error,
    isSimulationLoading: isLoading,
  };
};
