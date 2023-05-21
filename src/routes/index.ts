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
import Plan from "../views/plan/Plan.vue";
import Checkout from "../views/plan/checkout/Checkout.vue";
import NotFound from "../components/NotFound.vue";
import AccessDenied from "../components/AccessDenied.vue";
import {
  BeforeEnterGuard,
  beforeEnterCheckout,
} from "./middleware/beforeEnter";
import { useAuthStore } from "../store/auth";
import {
  PermissionOperation,
  PermissionString,
  hasPermission,
} from "../middleware/hasPermission";
import { useUserStore } from "../store/users";

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
    path: "/plan",
    name: "Plan",
    component: Plan,
    meta: {
      requiresAuth: true,
      permission: ["files", "create"],
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: beforeEnterCheckout as BeforeEnterGuard,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const requiresAuth = to.meta?.requiresAuth;
    const isAuthenticated = useAuthStore().isAuthenticated;
    const userPermission = useUserStore().userPermission;
    const canNotAccess = Boolean(requiresAuth && !isAuthenticated);
    const canAccess = Boolean(requiresAuth && isAuthenticated);
    const permission = to.meta?.permission as [
      PermissionString,
      PermissionOperation
    ];
    if (canNotAccess) {
      next({ name: "Login" });
    } else if (
      canAccess &&
      to.meta.permission &&
      !hasPermission(userPermission, permission)
    ) {
      next({ name: "AccessDenied" });
    } else {
      console.log({ canAccess });
      next();
    }
  }
);

export default router;
