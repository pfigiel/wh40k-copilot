import { NumericStatisticType } from "@/app/types/numeric-statistic-type";

export const dataKeyToSectionTitle = (key: NumericStatisticType) => {
  switch (key) {
    case "hits":
      return "Hits";
    case "wounds":
      return "Wounds";
    case "saves":
      return "Saves";
    case "fnps":
      return "Passed FNPs";
    case "woundsInflicted":
      return "Wounds Inflicted";
    case "modelsDestroyed":
      return "Models Destroyed";
  }
};
