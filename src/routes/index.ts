import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import Login from "../views/authentication/Login.vue";
import Register from "../views/authentication/Register.vue";
import ForgotPassword from "../views/authentication/ForgotPassword.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Landing from "../views/Landing.vue";
import Subscription from "../views/subscription/Subscription.vue";
import Checkout from "../views/subscription/checkout/Checkout.vue";
import NotFound from "../components/NotFound.vue";
import AccessDenied from "../components/AccessDenied.vue";
import Onboarding from "../views/organization/Onboarding.vue";
import {
  BeforeEnterGuard,
  beforeEnterAuthPages,
  beforeEnterCheckout,
  beforeEnterSubscription,
} from "./middleware/beforeEnter";
import {
  PermissionOperation,
  PermissionString,
} from "../middleware/hasPermission";
import { UserRole } from "../store/users";
import { authGetUser } from "./middleware/getUser";
import { canAccessRoute } from "./middleware/hasAccess";
import { redirectToOnboarding } from "./middleware/beforeResolve";
import { createPinia, setActivePinia } from "pinia";

interface IRoutes {
  path: string;
  name: string;
  component: any;
  meta?: {
    requiresAuth: boolean;
    permission?: [PermissionString, PermissionOperation];
  };
  beforeEnter?: BeforeEnterGuard;
}

const routes: IRoutes[] = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    beforeEnter: beforeEnterAuthPages,
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/subscription",
    name: "Subscription",
    component: Subscription,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: beforeEnterSubscription,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: beforeEnterCheckout,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/no-access",
    name: "AccessDenied",
    component: AccessDenied,
  },
  {
    path: "/organization-setup",
    name: "OrganizationOnboarding",
    component: Onboarding,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGetUser);
router.beforeEach(canAccessRoute);
router.beforeResolve(redirectToOnboarding);

export default router;
