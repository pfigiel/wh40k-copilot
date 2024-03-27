export const resolveSave = (
  rollResult: number,
  armourPenetration: number,
  armourSave: number,
  invulnerableSave?: number
) => {
  const saveWithPenetration = armourSave + armourPenetration;
  const bestSave = invulnerableSave
    ? Math.min(invulnerableSave, saveWithPenetration)
    : saveWithPenetration;

  return rollResult >= bestSave;
};
