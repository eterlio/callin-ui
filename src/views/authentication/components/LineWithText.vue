<template>
  <div class="container">
    <div class="line left"></div>
    <span class="text-sm text-center">{{ text }}</span>
    <div class="line right"></div>
  </div>
</template>
<script lang="ts" setup>
interface Text {
  text: string;
}
defineProps<Text>();
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  position: relative;
  gap: 0.6rem;
}

.line {
  width: 120px;
  height: 1.665px;
  background-color: rgba(0, 0, 0, 0.324);
}
</style>
