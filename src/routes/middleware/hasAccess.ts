import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import {
  redirectToLogin,
  redirectToNotAuthorized,
  routeRequireAuth,
} from "./getUser";
import { useAuthStore } from "../../store/auth";
import { useUserStore } from "../../store/users";
import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "../../middleware/hasPermission";

export const canAccessRoute = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<any> => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { required } = routeRequireAuth(to);
  if (!required) return next();
  if (required && authStore.isAuthenticated) {
    try {
      const userPermission = userStore.currentUser?.permission;
      const permission = to.meta?.permission as [
        PermissionString,
        PermissionOperation
      ];
      if (
        !!permission &&
        !hasPermission(userPermission?.access as string, permission)
      ) {
        return redirectToNotAuthorized(next);
      }
      return next();
    } catch (error) {
      console.log("I was in this error");
      
      return redirectToLogin(next, to.fullPath);
    }
  }

  return redirectToLogin(next, to.fullPath);
};
