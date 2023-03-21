<template>
  <div class="button-container">
    <button :class="`${className}`" :disabled="disabled">{{ text }}</button>
  </div>
</template>
<script setup lang="ts">
import {  defineProps } from "vue";

interface IProps {
disabled?: boolean;
text? :string;
className? :string;
}
 defineProps<IProps>();

</script>
