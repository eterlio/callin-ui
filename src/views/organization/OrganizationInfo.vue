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
      type="select"
      width="100%"
      label="Corporation Type"
      :required="true"
      v-model="organization.corporationType"
    />
  </div>
  <div class="input-container my-5">
    <Input
      type="textarea"
      width="100%"
      label="Organization Slogan"
      :required="true"
      size="2"
      v-model="organization.slogan"
    />
  </div>
  <div class="input-container my-5">
    <Input
      type="textarea"
      width="100%"
      label="Organization Description"
      :required="true"
      size="6"
      v-model="organization.description"
    />
  </div>
</template>
<script setup lang="ts">
import Input from "../../components/inputs/Input.vue";

defineProps({
  organization: {
    type: Object,
    required: true,
  },
});
</script>
