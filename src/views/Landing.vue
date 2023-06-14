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

  <FormInput
    v-model="email"
    type="text"
    validations="required|min:8"
    validation-name="Email"
    :validation-message="{}"
    help="Something cool"
    :bail="true"
  />
  <FormInput
    v-model="password"
    type="text"
    validations="password"
    label="Password"
    validation-name="Password"
    :validation-message="{
      password: 'Invalid password',
    }"
    help="Something cool"
    :bail="true"
    width="100%"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useUserStore } from "../store/users";

const userStore = useUserStore();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
</script>
