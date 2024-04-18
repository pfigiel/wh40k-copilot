import { DefenderGroupEntity } from "../entities/defender-group-entity";
import { WeaponGroupEntity } from "../entities/weapon-group-entity";
import { runSimulation } from "../run-simulation";
import { FixedAttribute } from "../types/fixed-attribute";
import { RandomizedAttribute } from "../types/randomized-attribute";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { WeaponModifierType } from "../types/weapon-modifier";
import { Dice } from "@/types/dice";
import { WeaponAttributeType } from "@/types/weapon-attribute";
import { range } from "@/utils/range";

export const aggressorsVsVoidDragonRangedMelee = () => {
  const fragstormGrenadeLaunchers = new WeaponGroupEntity({
    armourPenetration: 1,
    skill: 3,
    damage: new FixedAttribute(1),
    strength: 4,
    attacks: new RandomizedAttribute(Dice.D6),
    attributes: [
      { type: WeaponAttributeType.SUSTAINED_HITS, value: 1 },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    modifiers: [{ type: WeaponModifierType.CRITICAL_HIT_MODIFIER, value: 1 }],
    rerollStrategies: [RerollStrategy.FISH_FOR_CRITICAL_HITS],
    hitRerollType: RerollType.ALL,
  });

  const autoBoltstormGauntlets = new WeaponGroupEntity({
    armourPenetration: 1,
    skill: 3,
    damage: new FixedAttribute(1),
    strength: 4,
    attacks: new FixedAttribute(3),
    attributes: [
      { type: WeaponAttributeType.TWIN_LINKED },
      { type: WeaponAttributeType.SUSTAINED_HITS, value: 1 },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    modifiers: [{ type: WeaponModifierType.CRITICAL_HIT_MODIFIER, value: 1 }],
    rerollStrategies: [RerollStrategy.FISH_FOR_CRITICAL_HITS],
    hitRerollType: RerollType.ALL,
  });

  const twinPowerFists = new WeaponGroupEntity({
    armourPenetration: 2,
    skill: 3,
    damage: new FixedAttribute(1),
    strength: 8,
    attacks: new FixedAttribute(3),
    attributes: [
      { type: WeaponAttributeType.TWIN_LINKED },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    hitRerollType: RerollType.ALL,
  });

  const fragstormGrenadeLaunchersCount = 6;
  const autoBoltstormGauntletsCount = 6;
  const twinPowerFistsCount = 6;

  const weaponGroups = [
    ...range(fragstormGrenadeLaunchersCount).map(
      () => fragstormGrenadeLaunchers,
    ),
    ...range(autoBoltstormGauntletsCount).map(() => autoBoltstormGauntlets),
    ...range(twinPowerFistsCount).map(() => twinPowerFists),
  ];

  const defenderGroups = [
    new DefenderGroupEntity({
      armourSave: 4,
      invulnerableSave: 4,
      feelNoPain: 5,
      toughness: 11,
      wounds: 12,
      modelsCount: 1,
    }),
  ];

  runSimulation(weaponGroups, defenderGroups);
};
