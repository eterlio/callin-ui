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
              <Input
                type="text"
                label="Email"
                :required="true"
                width="100%"
                v-model="email"
              />
            </div>
            <!-- BUTTONS -->
            <div class="submit">
              <button class="btn-primary" :disabled="disableButton">
                Send
              </button>
            </div>
            <div class="my-2 mb-4 flex justify-end items-end">
              <span>Remember password??</span>
              <RouterLink
                to="/auth/login"
                class="no-underline text-primary ml-2 font-bold"
                >Login</RouterLink
              >
            </div>
          </div>
          <!-- FOOTER -->
          <div class="footer">
            <div class="steps-container"></div>
          </div>
        </div>
      </div>
      <div class="aside-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Input from "../../components/inputs/Input.vue";

const email = ref("");
const disableButton = computed(() => {
  return !(email.value && email.value.length >= 3);
});
</script>
