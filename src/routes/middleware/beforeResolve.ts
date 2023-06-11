import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUserStore } from "../../store/users";
import { get } from "lodash";

export const redirectToOnboarding = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const currentUser = get(userStore, "currentUser", null);
  if (
    to.name !== "OrganizationOnboarding" && // Check if not already on the OrganizationOnboarding route
    currentUser &&
    currentUser.role === "orgAdmin" &&
    currentUser.status === "pendingApproval"
  ) {
    return next({ name: "OrganizationOnboarding" });
  } else {
    return next();
  }
};
