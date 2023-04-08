<template>
    <span style="cursor: pointer;">
        <vue-feather :type="type"></vue-feather>
    </span>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: true,
  }
});
</script>
