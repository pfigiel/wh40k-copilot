import { DefenderGroup } from "@/types/defender-group";
import { WeaponGroup } from "@/types/weapon-group";

export interface SimulationRequestDto {
  weaponGroups: WeaponGroup[];
  defenderGroups: DefenderGroup[];
}
