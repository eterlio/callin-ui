export const hasPermission = (
  userPermission: number,
  permissions: number
): boolean => {
  const allowed = Boolean(userPermission & permissions);
  return allowed;
};
