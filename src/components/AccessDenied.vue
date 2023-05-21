<template>
  <div class="flex justify-between h-screen flex-col p-6 bg-white">
    <div class="header">Logo</div>
    <div
      class="content flex-grow flex items-center justify-between w-3/4 m-auto"
    >
      <div class="text-content">
        <h2 class="text-red-600">
          Looks like you don't have permission to access this page...
        </h2>
        <p class="text-lg text-gray-600 py-4">
          Let us guide you out of here back home
        </p>
        <Button
          text="Go Home"
          class="my-5 btn !bg-red-600 !text-white font-bold"
          @click="router.push(`/`)"
        />
      </div>
      <div class="img">
        <img src="/src/assets/403.gif" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import Button from "./buttons/Button.vue";
const router = useRouter();
</script>

<style scoped>
@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
    justify-content: start;
    text-align: center;
  }
  .text-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .img img {
    width: 80%;
  }
}
</style>
