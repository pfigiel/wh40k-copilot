import useSWR from "swr";
import { CalculatorFormValues } from "@/types/calculator-form-values";

export const useSimulationResult = (formValues?: CalculatorFormValues) => {
  console.log("Hook form values: ", formValues);
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
