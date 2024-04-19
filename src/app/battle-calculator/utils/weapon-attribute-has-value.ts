import { WeaponAttributeType } from "@/types";

export const weaponAttributeHasValue = (attributeType: WeaponAttributeType) => {
  switch (attributeType) {
    case WeaponAttributeType.SUSTAINED_HITS:
      return true;
    default:
      return false;
  }
};
