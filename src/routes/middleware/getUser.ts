import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getRequest } from "../../axios/privateRequest";
import { useUserStore } from "../../store/users";

export const routeRequireAuth = (
  toRoute: RouteLocationNormalized
): { required: boolean } => {
  return {
    required: toRoute.matched?.some((route: any) => route.meta.requiresAuth),
  };
};
export const redirectToLogin = (next: NavigationGuardNext, from: string) => {
  return from === "/"
    ? next({ name: "Login" })
    : next({ name: "Login", query: { from } });
};

export const redirectToNotAuthorized = (next: NavigationGuardNext) =>
  next({ name: "AccessDenied" });
export const authGetUser = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  try {
    if (to.path === from.path) return next();
    // if (!!userStore.currentUser) return next();
    const {
      data: { response },
    } = await getRequest("/api/auth");

    if (response && response.authorized) {
      // if we have a user, initialize user data
      userStore.setUser(response.user);
    }

    return next();
  } catch (error) {
    const { required } = routeRequireAuth(to);
    if (!required) return next();
    return !required ? next() : redirectToLogin(next, to.fullPath);
  }
};
