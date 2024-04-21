export enum WeaponRerollApplication {
  HITS,
  WOUNDS,
}

export enum RerollType {
  ALL,
  ONES,
}

export interface WeaponReroll {
  application: WeaponRerollApplication;
  type: RerollType;
}
