<template>
  <div class="form-container">
    <FormTitle header="Create Account" paragraph="Create an account with us" />
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
        @input="$emit('sendRegistrationData', inputData)"
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
        @input="$emit('sendRegistrationData', inputData)"
        @hasErrors="(data:any)=>$emit('hasErrors', data)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormTitle from "./FormTitle.vue";
import Input from "../../../components/inputs/Input.vue";
import { reactive } from "vue";
import ExternalAuth from "./ExternalAuth.vue";
import LineWithText from "./LineWithText.vue";

defineEmits(["sendRegistrationData", "hasErrors"]);
const inputData = reactive({
  email: "",
  password: "",
});
const externalAuthData = {
  google: {},
  facebook: {},
};
</script>
