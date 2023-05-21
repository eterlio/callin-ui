<template>
  <button
    class="flex items-center justify-center"
    :disabled="isValid || loading"
  >
    <div v-if="loading">
      <div class="loader">
        <div class="big-circle">
          <div class="small-circle"></div>
        </div>
      </div>
    </div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
interface Button {
  text: string;
  loading?: boolean;
  isValid?: boolean;
}

defineProps<Button>();
</script>
<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
