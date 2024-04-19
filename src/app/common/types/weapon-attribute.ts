export enum WeaponAttributeType {
  ANTI,
  BLAST,
  DEVASTATING_WOUNDS,
  LETHAL_HITS,
  SUSTAINED_HITS,
  TORRENT,
  TWIN_LINKED,
}

export interface WeaponAttribute {
  type: WeaponAttributeType;
  value?: number;
}
