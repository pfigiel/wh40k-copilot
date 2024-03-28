import { SimulationDto } from "@/dtos/simulation-dto";
import { WeaponProfile } from "./weapon-profile";
import { DefenderProfile } from "./defender-profile";

export interface CalculatorFormValues {
  weaponProfiles: Partial<WeaponProfile>[];
  defenderProfile: Partial<DefenderProfile>;
}
