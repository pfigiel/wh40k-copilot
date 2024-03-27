export enum WeaponModifierType {
  HIT_MODIFIER,
  CRITICAL_HIT_MODIFIER,
  WOUND_MODIFIER,
  CRITICAL_WOUND_MODIFIER,
}

export interface WeaponModifier {
  type: WeaponModifierType;
  value: number;
}
