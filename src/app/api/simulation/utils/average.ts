export const average = (sequence: number[]) =>
  sequence.length > 0
    ? sequence.reduce((a, b) => a + b, 0) / sequence.length
    : 0;
