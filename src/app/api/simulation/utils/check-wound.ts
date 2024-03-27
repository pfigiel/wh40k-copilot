export const checkWound = (
  rollResult: number,
  strength: number,
  toughness: number
) => {
  if (strength >= 2 * toughness) {
    return rollResult >= 2;
  } else if (strength > toughness) {
    return rollResult >= 3;
  } else if (strength === toughness) {
    return rollResult >= 4;
  } else if (strength <= 2 * toughness) {
    return rollResult >= 6;
  } else {
    return rollResult >= 5;
  }
};
