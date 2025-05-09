// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefinedFields = <T extends Record<string, any>>(
  obj: T
): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as T;
};
