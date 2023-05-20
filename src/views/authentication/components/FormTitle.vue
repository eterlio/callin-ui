<template>
  <div class="title-container">
    <h1 class="text-primary">{{ header }}</h1>
    <p class="text-sm">{{ paragraph }}</p>
  </div>
</template>

<script lang="ts" setup>
type Props = { header?: string; paragraph?: string };
defineProps<Props>();
</script>
<style scoped>
h1 {
  font-size: clamp(1rem, 2.5vw, 2rem);
}
</style>
