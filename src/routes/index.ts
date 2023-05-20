import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import { requireAuth } from "../middleware/auth";
import Login from "../views/authentication/Login.vue";
import Register from "../views/authentication/Register.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Landing from "../views/Landing.vue";
import Plan from "../views/plan/Plan.vue";
import Checkout from "../views/plan/checkout/Checkout.vue";
import NotFound from "../components/NotFound.vue";
import {
  BeforeEnterGuard,
  beforeEnterCheckout,
} from "./middleware/beforeEnter";
interface IRoutes {
  path: string;
  name: string;
  component: any;
  meta?: {
    requiresAuth: boolean;
  };
  beforeEnter?: any;
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
    path: "/plan",
    name: "Plan",
    component: Plan,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    beforeEnter: beforeEnterCheckout as BeforeEnterGuard,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta.requiresAuth) {
      requireAuth(to, from, next);
    } else {
      next();
    }
  }
);

export default router;
