<template>
  <div
    class="cursor-pointer text-center shadow-none border text-[#738299] p-4 w-full text-lg transparent rounded transition-[border-color .3s ease-in-out] font-bold hover:bg-[#f1faff] hover:border-blue-600 hover:text-[#3b82f6] border-dashed cursor"
  >
    {{ text }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<style>
.active {
  background: #f1faff;
  color: #3b82f6;
  border-color: #3b82f6;
}
</style>
