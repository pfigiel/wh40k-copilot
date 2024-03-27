import { DefenderProfile } from "../entities/defender-profile";
import { Dice } from "@/types/dice";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RandomizedAttacksAttribute } from "../types/randomized-attacks-attribute";
import { range } from "../utils/range";
import { RerollType } from "../types/reroll-type";
import { runSimulation } from "../run-simulation";
import { WeaponAttributeType } from "../types/weapon-attribute";
import { WeaponProfile } from "../entities/weapon-profile";

export const intercessorsVsTermagantsRanged = () => {
  const boltRifle = new WeaponProfile({
    armourPenetration: 1,
    skill: 3,
    damage: 1,
    strength: 4,
    attacks: new FixedAttacksAttribute(2),
    hitRerollType: RerollType.ALL,
  });

  const grenadeLauncher = new WeaponProfile({
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

  const weaponProfiles = [
    ...range(boltRiflesCount).map(() => boltRifle),
    ...range(grenadeLaunchersCount).map(() => grenadeLauncher),
  ];

  const defenderProfile = new DefenderProfile({
    armourSave: 5,
    toughness: 3,
    wounds: 1,
  });
  const modelsCount = 20;

  runSimulation(weaponProfiles, defenderProfile, modelsCount);
};
