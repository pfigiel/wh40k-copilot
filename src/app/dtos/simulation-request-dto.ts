import { DefenderProfile } from "@/types/defender-profile";
import { WeaponProfile } from "@/types/weapon-profile";

export interface SimulationRequestDto {
  weaponProfiles: WeaponProfile[];
  defenderProfile: DefenderProfile;
}
