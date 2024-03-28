import { DefenderProfileEntity } from "../entities/defender-profile-entity";
import { Dice } from "@/types/dice";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RandomizedAttacksAttribute } from "../types/randomized-attacks-attribute";
import { range } from "../utils/range";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { runSimulation } from "../run-simulation";
import { WeaponAttributeType } from "../types/weapon-attribute";
import { WeaponModifierType } from "../types/weapon-modifier";
import { WeaponProfileEntity } from "../entities/weapon-profile-entity";

export const aggressorsVsVoidDragonRangedMelee = () => {
  const fragstormGrenadeLaunchers = new WeaponProfileEntity({
    armourPenetration: 1,
    skill: 3,
    damage: 1,
    strength: 4,
    attacks: new RandomizedAttacksAttribute(Dice.D6),
    attributes: [
      { type: WeaponAttributeType.SUSTAINED_HITS, value: 1 },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    modifiers: [{ type: WeaponModifierType.CRITICAL_HIT_MODIFIER, value: 1 }],
    rerollStrategies: [RerollStrategy.FISH_FOR_CRITICAL_HITS],
    hitRerollType: RerollType.ALL,
  });

  const autoBoltstormGauntlets = new WeaponProfileEntity({
    armourPenetration: 1,
    skill: 3,
    damage: 1,
    strength: 4,
    attacks: new FixedAttacksAttribute(3),
    attributes: [
      { type: WeaponAttributeType.TWIN_LINKED },
      { type: WeaponAttributeType.SUSTAINED_HITS, value: 1 },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    modifiers: [{ type: WeaponModifierType.CRITICAL_HIT_MODIFIER, value: 1 }],
    rerollStrategies: [RerollStrategy.FISH_FOR_CRITICAL_HITS],
    hitRerollType: RerollType.ALL,
  });

  const twinPowerFists = new WeaponProfileEntity({
    armourPenetration: 2,
    skill: 3,
    damage: 1,
    strength: 8,
    attacks: new FixedAttacksAttribute(3),
    attributes: [
      { type: WeaponAttributeType.TWIN_LINKED },
      { type: WeaponAttributeType.LETHAL_HITS },
    ],
    hitRerollType: RerollType.ALL,
  });

  const fragstormGrenadeLaunchersCount = 6;
  const autoBoltstormGauntletsCount = 6;
  const twinPowerFistsCount = 6;

  const weaponProfiles = [
    ...range(fragstormGrenadeLaunchersCount).map(
      () => fragstormGrenadeLaunchers,
    ),
    ...range(autoBoltstormGauntletsCount).map(() => autoBoltstormGauntlets),
    ...range(twinPowerFistsCount).map(() => twinPowerFists),
  ];

  const defenderProfile = new DefenderProfileEntity({
    armourSave: 4,
    invulnerableSave: 4,
    feelNoPain: 5,
    toughness: 11,
    wounds: 12,
    modelsCount: 1,
  });

  runSimulation(weaponProfiles, defenderProfile);
};
