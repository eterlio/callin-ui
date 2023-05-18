<template>
  <div class="form-container">
    <FormTitle header="Create Account" paragraph="Create an account with us" />
    <div class="input-container">
      <Input
        type="text"
        label="Organization Name"
        :required="false"
        :modelValue="inputData.organizationName"
        width="100%"
      />
    </div>
    <div class="input-container">
      <Input
        type="text"
        label="Organization Email"
        :required="false"
        :modelValue="inputData.organizationEmail"
        width="100%"
      />
    </div>
    <div class="input-container">
      <Input
        type="password"
        label="Password"
        :required="false"
        :modelValue="inputData.organizationPassword"
        width="100%"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormTitle from "./FormTitle.vue";
import Input from "../../../components/inputs/Input.vue";
import { reactive } from "vue";

const inputData = reactive({
  organizationEmail: "",
  organizationPassword: "",
  organizationName: "",
});
</script>
