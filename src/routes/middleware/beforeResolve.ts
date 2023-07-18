import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUserStore } from "../../store/users";
import { get } from "lodash";
import { useOrganizationStore } from "../../store/organization";

export const redirectToOnboarding = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const currentUser = get(userStore, "currentUser", null);
  const organizationStore = useOrganizationStore();

  const organization = organizationStore.organization;
  const { subscriptionInfo, organizationValidations } = organization;

  if (currentUser && currentUser.role === "orgAdmin") {
    if (
      !subscriptionInfo ||
      (!subscriptionInfo?.hasSelectedSubscription && to.name !== "Subscription")
    ) {
      return next({ name: "Subscription" });
    }
    if (
      subscriptionInfo &&
      subscriptionInfo?.hasSelectedSubscription &&
      !subscriptionInfo?.hasActiveSubscription &&
      to.name !== "Checkout"
    ) {
      return next({ name: "Checkout" });
    }
    return next();
  } else return next();
};
