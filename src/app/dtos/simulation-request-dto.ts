import { DefenderProfile } from "@/types/defender-profile";
import { WeaponProfile } from "@/types/weapon-profile";

export interface SimulationDto {
  weaponProfiles: WeaponProfile[];
  defenderProfile: DefenderProfile;
}
