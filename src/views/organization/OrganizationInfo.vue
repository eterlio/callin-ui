<template>
  <div class="input-container">
    <Input
      type="text"
      label="Organization Name"
      :required="true"
      width="100%"
      v-model="organization.name"
    />
  </div>
  <div class="input-container my-5">
    <Input
      type="email"
      label="Organization Email"
      :required="true"
      width="100%"
      v-model="organization.email"
    />
  </div>
  <div class="input-container">
    <Input
      type="text"
      width="100%"
      label="Organization Phone"
      :required="true"
      v-model="organization.phone.number"
    />
  </div>
  <div class="input-container my-5">
    <Input
      type="text"
      width="100%"
      label="Organization Slogan"
      :required="true"
      v-model="organization.slogan"
    />
  </div>
  <div class="input-container my-5">
    <Input
      type="textarea"
      width="100%"
      label="Organization Description"
      :required="true"
      size="2"
      v-model="organization.description"
    />
  </div>
</template>
<script setup lang="ts">
import Input from "../../components/inputs/Input.vue";
import { ref } from "vue";
const phone = ref()
defineProps({
  organization: {
    type: Object,
    required: true,
  },
});
</script>
