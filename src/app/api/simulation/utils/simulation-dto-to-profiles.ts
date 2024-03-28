import { DefenderProfileEntity } from "../entities/defender-profile-entity";
import { WeaponProfileEntity } from "../entities/weapon-profile-entity";
import { AttacksAttribute } from "../types/attacks-attribute";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RandomizedAttacksAttribute } from "../types/randomized-attacks-attribute";
import { SimulationDto } from "@/app/dtos/simulation-request-dto";

export const simulationDtoToProfiles = (
  dto: SimulationDto,
): {
  weaponProfiles: WeaponProfileEntity[];
  defenderProfile: DefenderProfileEntity;
} => {
  const weaponProfiles = dto.weaponProfiles.map((weaponProfile) => {
    const { attacks, ...rest } = weaponProfile;
    const attacksAttribute: AttacksAttribute = attacks.isFixed
      ? new FixedAttacksAttribute(attacks.value)
      : new RandomizedAttacksAttribute(
          attacks.dice,
          attacks.diceCount,
          attacks.value,
        );

    return new WeaponProfileEntity({ attacks: attacksAttribute, ...rest });
  });

  const defenderProfile = new DefenderProfileEntity(dto.defenderProfile);

  return { weaponProfiles, defenderProfile };
};
