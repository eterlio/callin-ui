export type PermissionOperation = "create" | "read" | "update" | "delete";
export type PermissionString =
  | "users"
  | "organization"
  | "report"
  | "invoice"
  | "files"
  | "income"
  | "expenditure"
  | "role";
export const PERMISSIONS_LIST: PermissionString[] = [
  "users",
  "files",
  "invoice",
  "organization",
  "report",
];
export type IPermission = Record<
  PermissionString,
  Record<PermissionOperation, number>
>;

export const PERMISSIONS = structurePermissionsObject(PERMISSIONS_LIST);

function structurePermissionsObject(
  permissionsArray: PermissionString[]
): IPermission {
  const permissions: any = {};
  for (let i = 0; i < permissionsArray.length; i++) {
    const resource = permissionsArray[i];
    permissions[resource] = {
      create: 1 << (i * 4 + 1),
      read: 1 << (i * 4 + 2),
      update: 1 << (i * 4 + 3),
      delete: 1 << (i * 4 + 4),
    };
  }
  return permissions;
}
export const hasPermission = (
  userPermission: number,
  permissions: [PermissionString, PermissionOperation]
): boolean => {
  if (!userPermission || !permissions) return false;
  const allowed = Boolean(
    userPermission & PERMISSIONS[permissions[0]][permissions[1]]
  );
  return allowed;
};
