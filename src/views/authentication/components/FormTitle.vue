<template>
  <div class="title-container">
    <h1>{{ header }}</h1>
    <p class="text-sm">{{ paragraph }}</p>
  </div>
</template>

<script lang="ts" setup>
type Props = { header?: string; paragraph?: string };
defineProps<Props>();
</script>
