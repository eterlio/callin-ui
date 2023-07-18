import { useUserStore } from "../../store/users";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useOrganizationStore } from "../../store/organization";

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
  const organizationStore = useOrganizationStore();

  const userOrganizationHasActiveSubscription = organizationStore.organization.subscriptionInfo?.hasActiveSubscription

  if (userOrganizationHasActiveSubscription) return next({name: "OrganizationOnboarding"});
  return next();
}
export function beforeEnterOrganizationOnboarding(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  const organizationStore = useOrganizationStore();
  const organizationValidation =
    organizationStore.organization.organizationValidations;
  if (
    organizationValidation?.hasValidOrganizationInfo &&
    organizationValidation?.hasValidOrganiztionContact &&
    organizationValidation?.hasValidOrganizationSize
  ) {
    return next(`/${userStore.currentUser?.role}`);
  } else return next();
}

// Define the implementation of your navigation guard
export function beforeEnterAuthPages(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  next();
}

export function beforeEnterSubscription(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const organizationStore = useOrganizationStore();

  const userOrganizationHasActiveSubscription =
    organizationStore.organization.subscriptionInfo?.hasSelectedSubscription;
  if (userOrganizationHasActiveSubscription) {
    return next({ name: "Checkout" });
  } else return next();
}
