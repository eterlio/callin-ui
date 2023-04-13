<template>
    <span style="cursor: pointer;">
        <vue-feather :type="type" :size="size"></vue-feather>
    </span>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    require: false
  }
});
</script>
<style scoped>
 span{
  display: flex;
 }
</style>