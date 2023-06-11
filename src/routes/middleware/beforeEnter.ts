import { get } from "lodash";
import { useAuthStore } from "../../store/auth";
import { useUserStore } from "../../store/users";
import { useSubscriptionStore } from "./../../store/subscription/index";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

// Define the navigation guard function type
export type BeforeEnterGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void;

// Define the implementation of your navigation guard
export function beforeEnterCheckout(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const subscriptionStore = useSubscriptionStore();
  const userStore = useUserStore();

  const planId = get(subscriptionStore, "planId", null);
  const currentUserPlanId = get(
    userStore.currentUser,
    "subscription.planId",
    null
  );
  const userOrganizationHasActiveSubscription = get(
    userStore.currentUser,
    "hasActiveSubscription",
    false
  );

  if (userOrganizationHasActiveSubscription) return next("/");
  if (!planId && !currentUserPlanId) {
    next("/subscription");
  } else {
    next();
  }
}

// Define the implementation of your navigation guard
export function beforeEnterAuthPages(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  next();
}

export function beforeEnterSubscription(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  const userOrganizationHasActiveSubscription = get(
    userStore.currentUser,
    "hasActiveSubscription",
    false
  );

  if (userOrganizationHasActiveSubscription) return next("/");
  return next();
}
