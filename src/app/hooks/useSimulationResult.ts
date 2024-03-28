import { CalculatorFormValues } from "@/types/calculator-form-values";
import useSWR from "swr";

export const useSimulationResult = (formValues?: CalculatorFormValues) => {
  const { data, error, isLoading } = useSWR(
    formValues ? "api/simulation" : null,
    (...args) =>
      fetch(...args, {
        method: "POST",
        body: JSON.stringify(formValues),
      }).then((res) => res.json()),
  );

  return {
    simulationResult: data,
    simulationError: error,
    isSimulationLoading: isLoading,
  };
};
