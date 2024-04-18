export const ssCaseToSpacedPascalCase = (input: string) =>
  input
    .split("_")
    .map((word) => `${word[0]}${word.slice(1).toLowerCase()}`)
    .join(" ");
