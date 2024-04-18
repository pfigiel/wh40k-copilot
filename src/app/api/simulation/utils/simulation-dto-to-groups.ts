import {
  DefenderGroupEntity,
  WeaponGroupEntity,
} from "@/api/simulation/entities";
import {
  FixedAttribute,
  FixedOrRandomizedAttribute,
  RandomizedAttribute,
} from "@/api/simulation/types";
import { SimulationRequestDto } from "@/dtos";

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
