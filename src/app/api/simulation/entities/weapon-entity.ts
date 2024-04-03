import { FixedAttribute } from "../types/fixed-attribute";
import { FixedOrRandomizedAttribute } from "../types/fixed-or-randomized-attribute";
import { RerollStrategy } from "../types/reroll-strategy";
import { RerollType } from "../types/reroll-type";
import { WeaponModifier, WeaponModifierType } from "../types/weapon-modifier";
import { Weapon } from "@/app/types/weapon";
import { WeaponAttribute, WeaponAttributeType } from "@/types/weapon-attribute";

export class WeaponEntity implements Omit<Weapon, "attacks" | "damage"> {
  public armourPenetration: number = 0;
  public attacks: FixedOrRandomizedAttribute = new FixedAttribute(1);
  public damage: FixedOrRandomizedAttribute = new FixedAttribute(1);
  public skill: number = 6;
  public strength: number = 1;
  public hitRerollType?: RerollType;
  public woundRerollType?: RerollType;
  public attributes?: WeaponAttribute[];
  public modifiers?: WeaponModifier[];
  public rerollStrategies?: RerollStrategy[];

  public constructor(initializer?: Partial<WeaponEntity>) {
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
