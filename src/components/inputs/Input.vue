<template>
  <div class="input-container">
    <label for="" v-if="inputLabel">{{ inputLabel }}</label>
    <input
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value),
          $emit('increment', hasError)
      "
      :value="modelValue"
      :class="{ 'is-invalid invalid-input': !inputHasErrors.isValid }"
      :style="{ width: width }"
    />
    <small
      :class="{ 'text-sm invalid-feedback': !inputHasErrors.isValid }"
      v-if="!inputHasErrors.isValid"
    >
      {{ inputHasErrors.errorMessage }}</small
    >
  </div>
</template>
<script lang="ts" setup emits="increment">
import { reactive, ref, watch } from "vue";
type inputTypes =
  | "text"
  | "password"
  | "date"
  | "datetime"
  | "datetime-local"
  | "number";
interface IInput {
  type: inputTypes;
  placeholder?: string;
  modelValue: string | number;
  label?: string;
  id?: string;
  required?: boolean;
  width?: string;
}
defineEmits(["update:modelValue", "increment"]);
const props = defineProps<IInput>();
const inputHasErrors = reactive({
  isValid: true,
  errorMessage: "",
});
const inputLabel = ref(props.label);
const hasError = ref(false);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === "" && props.required) {
      (inputHasErrors.isValid = false),
        (inputHasErrors.errorMessage = `${
          props.label ? `${props.label} is required` : "Input field is required"
        }`);
      hasError.value = true;
      return;
    } else if (
      props.modelValue &&
      props.type === "number" &&
      isNaN(props.modelValue as number)
    ) {
      console.log(props.type);
      (inputHasErrors.isValid = false),
        (inputHasErrors.errorMessage = `Input should be a number`);
      hasError.value = true;
      return;
    } else {
      (inputHasErrors.isValid = true), (inputHasErrors.errorMessage = ``);
      hasError.value = false;
      return;
    }
  }
);
</script>

<style scoped>
.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
}
.input-container {
  margin: 1rem 0;
}
.input-container label {
  display: block;
  margin: 0.5rem 0;
}
.input-container input {
  outline: none;
  display: block;
  padding: 0.812rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #e2edfb30;
  background-clip: padding-box;
  border: 1px solid #0a39772a;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
}
.invalid-input {
  border-color: rgba(255, 0, 0, 0.382) !important;
  background-color: #fef1f215 !important;
}
</style>
