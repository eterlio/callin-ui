<template>
  <button :class="`icon-button ${iconType} icon-${size} ${iconShape}`">
    <Icon :type="icon" />
  </button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Icon from "./Icon.vue";
type SIZE = "sm" | "md" | "lg" | "ex-lg" | "ex-sm";
type TYPE =
  | "faded"
  | "faded-outline"
  | "outline"
  | "shadow-outline"
  | "normal"
  | "shadow"
  | "bg";
interface IconButtonType {
  type?: TYPE;
  icon: string;
  size?: SIZE;
  shape?: "rounded"| "normal";
}
const props = defineProps<IconButtonType>();
const iconType = ref(props.type ? `icon-${props.type}` : `icon-normal`);
const iconShape = ref(props.shape ? `icon-${props.shape}` : `icon-okay`);
</script>
