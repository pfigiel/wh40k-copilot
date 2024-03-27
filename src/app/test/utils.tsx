export const createMockChildren = (testId?: string) => {
  const childTestId = testId ?? "child";
  const children = <div data-testid={childTestId} />;

  return { children, childTestId };
};
