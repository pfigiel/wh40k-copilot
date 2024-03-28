import { DefenderProfile } from "./defender-profile";
import { WeaponProfile } from "./weapon-profile";
import { SimulationDto } from "@/dtos/simulation-dto";

export interface CalculatorFormValues {
  weaponProfiles: Partial<WeaponProfile>[];
  defenderProfile: Partial<DefenderProfile>;
}
