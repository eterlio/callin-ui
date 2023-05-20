<template>
  <div class="mobile-money__container">
    <div class="input-container">
      <Input
        type="text"
        label="Mobile Money Name"
        :required="true"
        width="100%"
        v-model="inputData.customerFullName"
        @input="$emit('sendMobileMoneyData', inputData)"
      />
    </div>
    <div class="input-container">
      <Input
        type="text"
        label="Phone"
        :required="true"
        width="100%"
        v-model="inputData.phone"
        @input="$emit('sendMobileMoneyData', inputData)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Input from "../../../components/inputs/Input.vue";

const inputData = reactive({
  customerFullName: "",
  phone: "",
});
</script>
