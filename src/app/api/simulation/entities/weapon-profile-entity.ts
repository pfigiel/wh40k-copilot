import { AttacksAttribute } from "../types/attacks-attribute";
import { FixedAttacksAttribute } from "../types/fixed-attacks-attribute";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import {
  WeaponAttribute,
  WeaponAttributeType,
} from "../types/weapon-attribute";
import { WeaponModifier, WeaponModifierType } from "../types/weapon-modifier";
import { WeaponProfile } from "@/types/weapon-profile";

export class WeaponProfileEntity implements Omit<WeaponProfile, "attacks"> {
  public armourPenetration: number = 0;
  public attacks: AttacksAttribute = new FixedAttacksAttribute(1);
  public damage: number = 1;
  public skill: number = 6;
  public strength: number = 1;
  public weaponsCount: number = 1;
  public hitRerollType?: RerollType;
  public woundRerollType?: RerollType;
  public attributes?: WeaponAttribute[];
  public modifiers?: WeaponModifier[];
  public rerollStrategies?: RerollStrategy[];

  public constructor(initializer?: Partial<WeaponProfileEntity>) {
    Object.assign(this, initializer);
  }

  public hasAttribute(attributeType: WeaponAttributeType): boolean {
    return this.attributes?.some(
      (attribute) => attribute.type === attributeType,
    )!!;
  }

  public getAttribute(
    attributeType: WeaponAttributeType,
  ): WeaponAttribute | undefined {
    return this.attributes?.find(
      (attribute) => attribute.type === attributeType,
    );
  }

  public hasModifier(modifierType: WeaponModifierType): boolean {
    return this.modifiers?.some((modifier) => modifier.type === modifierType)!!;
  }

  public getModifier(
    modifierType: WeaponModifierType,
  ): WeaponModifier | undefined {
    return this.modifiers?.find((modifier) => modifier.type === modifierType);
  }

  public hasRerollStrategy(rerollStrategy: RerollStrategy): boolean {
    return this.rerollStrategies?.some(
      (strategy) => strategy === rerollStrategy,
    )!!;
  }
}
