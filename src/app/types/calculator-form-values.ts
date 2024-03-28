import { DefenderProfile } from "./defender-profile";
import { WeaponProfile } from "./weapon-profile";

export interface CalculatorFormValues {
  weaponProfiles: Partial<WeaponProfile>[];
  defenderProfile: Partial<DefenderProfile>;
}
