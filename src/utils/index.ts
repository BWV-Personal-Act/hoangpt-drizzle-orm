export const toNumber = <T>(
  input?: T,
): T extends null | undefined ? T : number => {
  if (input === null) return null as any;
  if (input === undefined) return undefined as any;
  return Number(input) as any;
};
