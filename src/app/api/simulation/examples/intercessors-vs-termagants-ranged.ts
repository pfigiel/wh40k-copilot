import { DefenderGroupEntity } from "../entities/defender-group-entity";
import { WeaponGroupEntity } from "../entities/weapon-group-entity";
import { runSimulation } from "../run-simulation";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RandomizedAttacksAttribute } from "../types/randomized-attacks-attribute";
import { RerollType } from "../types/reroll-type";
import { WeaponAttributeType } from "../types/weapon-attribute";
import { range } from "../utils/range";
import { Dice } from "@/types/dice";

export const intercessorsVsTermagantsRanged = () => {
  const boltRifle = new WeaponGroupEntity({
    armourPenetration: 1,
    skill: 3,
    damage: 1,
    strength: 4,
    attacks: new FixedAttacksAttribute(2),
    hitRerollType: RerollType.ALL,
  });

  const grenadeLauncher = new WeaponGroupEntity({
    armourPenetration: 0,
    skill: 3,
    damage: 1,
    strength: 4,
    attacks: new RandomizedAttacksAttribute(Dice.D3),
    attributes: [{ type: WeaponAttributeType.BLAST }],
    hitRerollType: RerollType.ALL,
  });

  const boltRiflesCount = 8;
  const grenadeLaunchersCount = 2;

  const weaponGroups = [
    ...range(boltRiflesCount).map(() => boltRifle),
    ...range(grenadeLaunchersCount).map(() => grenadeLauncher),
  ];

  const defenderGroups = [
    new DefenderGroupEntity({
      armourSave: 5,
      toughness: 3,
      wounds: 1,
      modelsCount: 20,
    }),
  ];

  runSimulation(weaponGroups, defenderGroups);
};
