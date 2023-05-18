<template>
  <div class="form-container">
    <FormTitle header="Create Account" paragraph="Create an account with us" />
    <div class="input-container">
      <Input
        type="text"
        label="Email"
        :required="false"
        :modelValue="inputData.email"
        width="100%"
      />
    </div>
    <div class="input-container">
      <Input
        type="password"
        label="Password"
        :required="false"
        :modelValue="inputData.password"
        width="100%"
      />
    </div>
    <div class="input-container"></div>
  </div>
</template>
<script lang="ts" setup>
import FormTitle from "./FormTitle.vue";
import Input from "../../../components/inputs/Input.vue";
import { reactive } from "vue";

const inputData = reactive({
  email: "",
  password: "",
});
</script>
