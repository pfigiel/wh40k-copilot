import { roll } from "./roll";
import { Dice, RerollType } from "@/types";

export const resolveSave = (
  armourPenetration: number,
  armourSave: number,
  invulnerableSave?: number,
  saveRerollType?: RerollType,
) => {
  let saveRoll = roll(Dice.D6);
  const saveWithPenetration = armourSave + armourPenetration;
  const bestSave = invulnerableSave
    ? Math.min(invulnerableSave, saveWithPenetration)
    : saveWithPenetration;

  const isSaveSuccessful = saveRoll >= bestSave;

  if (isSaveSuccessful || saveRerollType === undefined) {
    return isSaveSuccessful;
  }

  const isRerollAvailable =
    saveRerollType === RerollType.ALL ||
    (saveRoll === 1 && saveRerollType === RerollType.ONES);

  if (isRerollAvailable) {
    const rerolledSaveRoll = roll(Dice.D6);
    return rerolledSaveRoll >= bestSave;
  }

  return false;
};
