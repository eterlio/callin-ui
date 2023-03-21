import {
  useRouter,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { useAuthStore } from "../store/auth";

export function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    next();
  } else {
    const router = useRouter();

    router.push({ name: "Login" });
  }
}
