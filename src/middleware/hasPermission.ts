export type PermissionOperation = "create" | "read" | "update" | "delete";
export type PermissionString =
  | "users"
  | "organization"
  | "report"
  | "invoice"
  | "files"
  | "income"
  | "expenditure"
  | "role"
  | "plan";
export type IPermission = Record<
  PermissionString,
  Record<PermissionOperation, number>
>;

export const PERMISSIONS_LIST: PermissionString[] = [
  "users",
  "files",
  "invoice",
  "organization",
  "report",
];
export const PERMISSIONS = structurePermissionsObject(PERMISSIONS_LIST);

function structurePermissionsObject(
  permissionsArray: PermissionString[],
): IPermission {
  const permissions: any = {};
  for (let i = 0; i < permissionsArray.length; i++) {
    const resource = permissionsArray[i];
    permissions[resource] = {
      create: 32 + (i * 4 + 1),
      read: 32 + (i * 4 + 2),
      update: 32 + (i * 4 + 3),
      delete: 32 + (i * 4 + 4),
    };
  }
  return permissions;
}

export const hasPermission = (
  userPermission: string,
  permissions: [PermissionString, PermissionOperation],
): boolean => {
  const permissionString = permissions[0]
const permissionOperation = permissions[1];
  return userPermission.includes(
    String.fromCharCode(PERMISSIONS[permissionString][permissionOperation]),
  );
};
