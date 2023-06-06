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
  if (
    !subscriptionStore.planId &&
    !userStore.currentUser?.subscription.planId
  ) {
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
