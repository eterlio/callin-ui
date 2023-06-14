<template>
  <div class="form-container">
    <FormTitle
      header="Log in"
      paragraph="Log into your account"
      class="text-center"
    />
    <div class="external__auth">
      <ExternalAuth name="google" />
      <ExternalAuth name="facebook" />
    </div>
    <div class="line-with-text">
      <LineWithText text="Or continue with email" />
    </div>

    <div class="input-container">
      <FormInput
        type="text"
        label="Email"
        width="100%"
        v-model="inputData.email"
        validations="email"
        validation-name="Email"
      />
    </div>
    <div class="input-container">
      <FormInput
        type="password"
        label="Password"
        width="100%"
        validations="password"
        validation-name="Password"
        v-model="inputData.password"
      />
      <div class="my-2 mb-4 flex justify-end items-end">
        <RouterLink
          to="/auth/forgot-password"
          class="no-underline text-primary font-medium"
          >Forgot Password?</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormTitle from "./FormTitle.vue";
import { reactive } from "vue";
import ExternalAuth from "./ExternalAuth.vue";
import LineWithText from "./LineWithText.vue";

const inputData = reactive({
  email: "",
  password: "",
});
const externalAuthData = {
  google: {},
  facebook: {},
};
</script>
