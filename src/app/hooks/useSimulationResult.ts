import { SimulationResponseDto } from "@/dtos/simulation-response-dto";
import { CalculatorFormValues } from "@/types/calculator-form-values";
import { SimulationResults } from "@/types/simulation-results";
import useSWR from "swr";

export const useSimulationResult = (formValues?: CalculatorFormValues) => {
  const { data, error, isLoading } = useSWR<SimulationResponseDto>(
    formValues ? "api/simulation" : null,
    (path: string) =>
      fetch(path, {
        method: "POST",
        body: JSON.stringify(formValues),
      }).then((res) => res.json()),
  );

  return {
    simulationResults: data as SimulationResults | undefined,
    simulationError: error,
    isSimulationLoading: isLoading,
  };
};
