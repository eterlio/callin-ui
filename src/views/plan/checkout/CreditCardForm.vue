<template>
  <div class="mobile-money__container">
    <div class="input-container">
      <Input
        type="text"
        label="Card Holder Name"
        :required="true"
        width="100%"
        v-model="inputData.customerFullName"
        @input="$emit('sendCreditCardData', inputData)"
      />
    </div>
    <div class="input-container">
      <Input
        type="text"
        label="Card Number"
        :required="true"
        width="100%"
        v-model="inputData.cardNumber"
        @input="$emit('sendCreditCardData', inputData)"
      />
    </div>
    <div class="input-container flex gap-4 items-center">
      <Input
        type="text"
        label="Expiry Date"
        :required="true"
        v-model="inputData.cardExpirationDate"
        @input="$emit('sendCreditCardData', inputData)"
        width="100%"
        class="flex-1"
      />
      <Input
        type="text"
        label="CVV"
        :required="true"
        v-model="inputData.cvv"
        @input="$emit('sendCreditCardData', inputData)"
        width="100%"
        class="flex-1"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Input from "../../../components/inputs/Input.vue";

const inputData = reactive({
  customerFullName: "",
  cvv: "",
  cardNumber: "",
  cardExpirationDate: "",
});
</script>
