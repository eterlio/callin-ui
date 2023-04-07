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
import NotFound from "../components/NotFound.vue";
interface IRoutes {
  path: string;
  name: string;
  component: any;
  meta?: {
    requiresAuth: boolean;
  };
}

const routes: IRoutes[] = [
  {
    path: "/",
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
