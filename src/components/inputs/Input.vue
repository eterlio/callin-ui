<template>
  <div class="input-container">
    <div
      class="radio-input flex justify-between items-center bg-white p-5 rounded-md cursor-pointer mb-4"
      v-if="type === 'radio-input'"
    >
      <label :for="id" v-if="inputLabel" class="flex items-center gap-2"
        ><icon :type="icon" v-if="icon" size="19" />
        <span>{{ inputLabel }}</span>
      </label>
      <input
        type="radio"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :value="modelValue"
        class="hidden"
        :id="id"
      />
      <div class="circle_container">
        <div class="circle">
          <div class="inner"></div>
        </div>
      </div>
    </div>
    <div class="normal-input" v-else>
      <label :for="id" v-if="inputLabel" class="label">{{ inputLabel }}</label>
      <input
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value),
            $emit('hasErrors', inputHasErrors)
        "
        :value="modelValue"
        :class="{ 'is-invalid invalid-input': !inputHasErrors.isValid }"
        :style="{ width: width }"
        :type="type === 'email' ? 'text' : type"
        class="input"
      />
      <small
        :class="{ 'text-sm invalid-feedback': !inputHasErrors.isValid }"
        v-if="!inputHasErrors.isValid"
      >
        {{ inputHasErrors.errorMessage }}</small
      >
    </div>
  </div>
</template>
<script lang="ts" setup emits="increment">
import { reactive, ref, watch } from "vue";
import Icon from "../buttons/Icon.vue";
import { Validator } from "../../validators/Validator";
type inputTypes =
  | "text"
  | "email"
  | "password"
  | "date"
  | "datetime"
  | "datetime-local"
  | "number"
  | "radio-input";
interface IInput {
  type: inputTypes;
  placeholder?: string;
  modelValue: string | number;
  label?: string;
  id?: string;
  required?: boolean;
  width?: string;
  icon?: string;
}
defineEmits(["update:modelValue", "hasErrors"]);
const props = defineProps<IInput>();
const inputHasErrors = reactive({
  isValid: true,
  errorMessage: "",
});
const inputLabel = ref(props.label);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === "" && props.required) {
      inputHasErrors.isValid = false;
      inputHasErrors.errorMessage = `${
        props.label ? `${props.label} is required` : "Input field is required"
      }`;
      return;
    } else if (
      props.modelValue &&
      props.type === "email" &&
      !Validator.isEmail(props.modelValue as string)
    ) {
      inputHasErrors.isValid = false;
      inputHasErrors.errorMessage = `Invalid email`;
    } else if (
      props.modelValue &&
      props.type === "password" &&
      !Validator.isValidPassword(props.modelValue as string)
    ) {
      inputHasErrors.isValid = false;
      inputHasErrors.errorMessage = `
      Password must be at least 8 characters long\n
      Must contain at least one special character\n
      Must contain at least one special uppercase character\n
      Must contain at least one special lowercase character\n
      Must contain at least one special number`;
    } else if (
      props.modelValue &&
      props.type === "number" &&
      isNaN(props.modelValue as number)
    ) {
      inputHasErrors.isValid = false;
      inputHasErrors.errorMessage = `Input should be a number`;
      return;
    } else {
      inputHasErrors.isValid = true;
      inputHasErrors.errorMessage = ``;
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
  margin: 0.5rem 0;
}
.input-container .label {
  display: block;
  margin: 0.5rem 0;
}
.input-container .input {
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
.input-container.active .radio-input {
  border-color: #434ce6;
}
.radio-input {
  transition: border-color 0.3s ease-in-out;
  border: 2px solid #eee;
}
.radio-input .circle_container {
  display: flex;
}
.circle_container .circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #e9e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease-in-out;
}

.circle_container .circle .inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: border-color 0.3s ease-in-out;
}
.input-container.active .radio-input .circle {
  border-color: #434ce6;
}
.input-container.active .radio-input .circle .inner {
  background-color: #434ce6;
}
</style>
