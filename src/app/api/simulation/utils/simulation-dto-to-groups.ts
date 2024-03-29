import { DefenderGroupEntity } from "../entities/defender-group-entity";
import { WeaponGroupEntity } from "../entities/weapon-group-entity";
import { AttacksAttribute } from "../types/attacks-attribute";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RandomizedAttacksAttribute } from "../types/randomized-attacks-attribute";
import { SimulationRequestDto } from "@/app/dtos/simulation-request-dto";

export const simulationDtoToGroups = (
  dto: SimulationRequestDto,
): {
  weaponGroups: WeaponGroupEntity[];
  defenderGroups: DefenderGroupEntity[];
} => {
  const weaponGroups = dto.weaponGroups.map((weaponGroup) => {
    const { attacks, ...rest } = weaponGroup;
    const attacksAttribute: AttacksAttribute = attacks.isFixed
      ? new FixedAttacksAttribute(attacks.value)
      : new RandomizedAttacksAttribute(
          attacks.dice,
          attacks.diceCount,
          attacks.value,
        );

    return new WeaponGroupEntity({ attacks: attacksAttribute, ...rest });
  });

  const defenderGroups = dto.defenderGroups.map(
    (defenderGroup) => new DefenderGroupEntity(defenderGroup),
  );

  return { weaponGroups, defenderGroups };
};
