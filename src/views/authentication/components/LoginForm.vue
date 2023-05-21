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
      <Input
        type="email"
        label="Email"
        :required="true"
        width="100%"
        v-model="inputData.email"
        @input="$emit('sendLoginData', inputData)"
        @hasErrors="(data:any)=>$emit('hasErrors', data)"
      />
    </div>
    <div class="input-container">
      <Input
        type="password"
        label="Password"
        :required="true"
        width="100%"
        v-model="inputData.password"
        @input="$emit('sendLoginData', inputData)"
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
import Input from "../../../components/inputs/Input.vue";
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
