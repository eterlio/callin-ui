<template>
  <div>
    <label for="" v-if="props.label">
      {{ props.label }} <sup v-if="requiredRegex">*</sup>
    </label>
    <input
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="handleBlur"
      :value="modelValue"
    />
    <small v-if="props.help">{{ props.help }}</small>
    <ul v-if="errors.length && !props.bail">
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="form-error__item"
      >
        {{ error }}
      </li>
    </ul>
    <ul v-else-if="errors.length && props.bail">
      <li class="form-error__item">
        {{ errors[0] }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Validator } from "./utils/Validator";
defineEmits(["update:modelValue"]);

type ValidationRule =
  | "required"
  | "min"
  | "max"
  | "in"
  | "email"
  | "password"
  | "number"
  | "string"
  | "matches"
  | "date"
  | "between"
  | "before"
  | "after"
  | "endsWith"
  | "startsWith"
  | "url";

interface Props {
  type: string;
  validations?: string;
  validationMessage?: string | Record<ValidationRule, string>;
  validationName?: string;
  help?: string;
  bail?: boolean; //Time prop prevents multiple error display at a time
  name?: string;
  modelValue: string;
  label?: string;
}

const props = defineProps<Props>();
const errors = ref<string[]>([]);

const c = "something";
const requiredRegex = new RegExp("required", "i").test(
  props.validations as string
);

const validations: any = props.validations || "";
const splittedValidations = validations
  .split("|")
  .filter((value: any) => value !== "");
const validationMessages =
  typeof props.validationMessage === "string"
    ? JSON.parse(props.validationMessage)
    : props.validationMessage || {};

const handleBlur = () => {
  validateRequired();
};

const validateRequired = () => {
  errors.value = [];
  const nameToUse: string = (props.name || props?.validationName) as string;
  const actualErrorMessage = validationMessages["required"];

  if (!Validator.required(props.modelValue)) {
    errors.value.push(actualErrorMessage || `${nameToUse} is required`);
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue && splittedValidations.length) {
      for (const rule of splittedValidations) {
        const splittedRule = rule.split(":");
        const actualRule: ValidationRule = splittedRule[0];
        const ruleValue = splittedRule[1];
        const nameToUse: string = (props.name ||
          props?.validationName) as string;

        const actualErrorMessage = validationMessages[actualRule];

        switch (actualRule) {
          case "required": {
            validateRequired();
            break;
          }
          case "in": {
            if (!Validator.in(props.modelValue, ruleValue))
              errors.value.push(
                actualErrorMessage || `${nameToUse} should be in ${ruleValue}`
              );
            break;
          }
          case "min": {
            if (!Validator.min(props.modelValue, ruleValue))
              errors.value.push(
                actualErrorMessage ||
                  `${nameToUse} should be at least ${ruleValue} characters long`
              );
            break;
          }
          case "max": {
            if (!Validator.max(props.modelValue, ruleValue))
              errors.value.push(
                actualErrorMessage ||
                  `${nameToUse} should be at most ${ruleValue} characters long`
              );
            break;
          }
          // Add more validation cases for other rules
        }
      }
    }
  }
);
</script>

<style scoped>
input {
  display: block;
}
.form-error__item {
  font-size: 15px;
  color: rgba(201, 27, 27, 0.858);
  margin: 0.2rem 0;
}
sup {
  font-weight: 700;
  color: rgba(201, 27, 27, 0.858);
}
</style>
