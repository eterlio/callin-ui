<template>
  <div class="input-field">
    <label for=""
      >{{ label }} <sup v-if="required" class="text-red-600">*</sup>
    </label>
    <input
    :type="type"
      :value="modelValue"
      @input="updateValue"
      :class="`${className}`"
    />
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

interface IProps {
  modelValue: string;
  required?: boolean;
  label?: string;
  className?: string;
  type?: "text"| "password" | "number" | "date" 
}

 defineProps<IProps>();
const emits = defineEmits({
  "update:modelValue": (value: string) => true,
});

const updateValue = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
