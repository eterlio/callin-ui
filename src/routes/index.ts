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
import { getRequest } from "../axios/privateRequest";

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
    path: "/subscription",
    name: "Subscription",
    component: Subscription,
    meta: {
      requiresAuth: true,
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

const checkAuthentication = async (next: any) => {
  try {
    const response = await getRequest("/api/auth");

    console.log({ response });
    useUserStore().setUser(response.data.response.user);
    return !!response.data.response.user;
  } catch (error: any) {}
};
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const requiresAuth = !!(
      Object.keys(to.meta).length && to.meta?.requiresAuth
    );

    const isAuthenticated = useAuthStore().isAuthenticated;
    const userPermission = useUserStore().userPermission;
    const permission = to.meta?.permission as [
      PermissionString,
      PermissionOperation
    ];

    if (requiresAuth) {
      try {
        const authenticatedFromApi = await checkAuthentication(next);
        if (!isAuthenticated && !authenticatedFromApi) {
          next({ name: "Login" });
        } else if (
          isAuthenticated &&
          authenticatedFromApi &&
          to.meta.permission &&
          !hasPermission(userPermission, permission)
        ) {
          next({ name: "AccessDenied" });
        } else {
          next();
        }
      } catch (error) {
        next({ name: "Login" }); // Redirect the user to the login screen
      }
    } else {
      next();
    }
  }
);

export default router;
