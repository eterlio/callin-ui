<template>
  <PageLoader v-if="loading" />
  <div class="page-wrapper__container">
    <slot />
  </div>
</template>
<script setup lang="ts">
import PageLoader from "./PageLoader.vue";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
