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

  if (!subscriptionStore.planId) {
    next("/subscription");
  } else {
    next();
  }
}
