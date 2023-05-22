<template>
  <div class="register-container">
    <div class="partition-container">
      <div class="main-selectors">
        <div class="wrapper">
          <div class="header">
            <div class="logo">
              <img src="" alt="Logo" />
            </div>
          </div>
          <div class="main-content">
            <div class="authForm">
              <RouterLink to="/">Home</RouterLink>
              <LoginForm @sendLoginData="handleLoginInput" />
            </div>
            <!-- BUTTONS -->
            <div class="submit">
              <Button
                class="btn-primary"
                @click="login"
                text="Login"
                :loading="loading"
                :isValid="disableButton"
              />
            </div>
            <div class="my-2 mb-4 flex justify-end items-end">
              <span>Don't have an account?</span>
              <RouterLink
                to="/auth/register"
                class="no-underline text-primary ml-2 font-bold"
                >Register</RouterLink
              >
            </div>
          </div>
          <!-- FOOTER -->
          <div class="footer">
            <div class="steps-container">
              <Toast />
            </div>
          </div>
        </div>
      </div>
      <div class="aside-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import LoginForm from "./components/LoginForm.vue";
import { useAuthStore } from "../../store/auth";
import Button from "../../components/buttons/Button.vue";
import Toast from "../../components/Toast.vue";

const loginData = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const disableButton = computed(() => {
  return !Object.values(loginData).every(
    (data: string) => data && data.length >= 3
  );
});
function handleLoginInput(data: { email: string; password: string }) {
  loginData.email = data.email;
  loginData.password = data.password;
}

const authStore = useAuthStore();
async function login() {
  try {
    loading.value = true;
    const result = await authStore.loginUser(
      loginData.email,
      loginData.password
    );
    console.info({ result });
  } catch (error: any) {
    console.log({ error });
  } finally {
    loading.value = false;
  }
}
</script>
