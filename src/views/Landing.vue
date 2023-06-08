<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useUserStore } from "../store/users";

const userStore = useUserStore();
const authStore = useAuthStore();
</script>

<template>
  <div>
    <RouterLink to="/auth/register">Register</RouterLink>
  </div>
  <div>
    <RouterLink to="/subscription">Subscription</RouterLink>
  </div>
  <div>
    <RouterLink to="/checkout">Checkout</RouterLink>
  </div>
  <div>
    <RouterLink to="/auth/login">Login</RouterLink>
  </div>
  <h1>Hello world</h1>
  {{ JSON.stringify(userStore.currentUser, null, 2) }}
  <p>Authenticated: {{ authStore.isAuthenticated }}</p>
</template>
