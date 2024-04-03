import { DefenderGroupEntity } from "../entities/defender-group-entity";
import { WeaponGroupEntity } from "../entities/weapon-group-entity";
import { FixedAttribute } from "../types/fixed-attribute";
import { FixedOrRandomizedAttribute } from "../types/fixed-or-randomized-attribute";
import { RandomizedAttribute } from "../types/randomized-attribute";
import { SimulationRequestDto } from "@/app/dtos/simulation-request-dto";

export const simulationDtoToGroups = (
  dto: SimulationRequestDto,
): {
  weaponGroups: WeaponGroupEntity[];
  defenderGroups: DefenderGroupEntity[];
} => {
  const weaponGroups = dto.weaponGroups.map((weaponGroup) => {
    const { attacks, damage, ...rest } = weaponGroup;

    const attacksAttribute: FixedOrRandomizedAttribute = attacks.isFixed
      ? new FixedAttribute(attacks.value)
      : new RandomizedAttribute(attacks.dice, attacks.diceCount, attacks.value);
    const damageAttribute: FixedOrRandomizedAttribute = damage.isFixed
      ? new FixedAttribute(damage.value)
      : new RandomizedAttribute(damage.dice, damage.diceCount, damage.value);

    return new WeaponGroupEntity({
      attacks: attacksAttribute,
      damage: damageAttribute,
      ...rest,
    });
  });

  const defenderGroups = dto.defenderGroups.map(
    (defenderGroup) => new DefenderGroupEntity(defenderGroup),
  );

  return { weaponGroups, defenderGroups };
};
