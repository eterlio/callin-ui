import { createRouter, createWebHistory } from "vue-router";
import { requireAuth } from "../middleware/auth";

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
    name: "Home",
    component: () => "<h1>Hello world</h1>",
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next);
  } else {
    next();
  }
});

export default router;
