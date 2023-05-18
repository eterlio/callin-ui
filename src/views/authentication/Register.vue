<template>
  <div class="register-container">
    <div class="partition-container">
      <div class="main-selectors">
        <div class="wrapper">
          <div class="header">
            <div class="logo">
              <img src="" alt="Logo" />
            </div>
            <div class="login-banner">
              <span>Already have an account?</span>
              <RouterLink to="/auth/login">Login</RouterLink>
            </div>
          </div>
          <div class="main-content">
            <div
              class="account-type__container"
              v-if="currentStep === 'step-1'"
            >
              <FormTitle
                header="Choose Account"
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ducimus?"
              />
              <div class="account-selectors__container">
                <div class="selector my-5">
                  <input
                    type="radio"
                    id="individual"
                    class="hidden"
                    name="accountType"
                    value="client"
                    v-model="stepValues.stepOne.value"
                  />
                  <label for="individual" class="flex p-4">
                    <div
                      class="icon h-9 w-9 flex justify-center items-center shadow-md rounded mx-3"
                    >
                      <Icon type="user" size="20" />
                    </div>
                    <div class="main">
                      <p class="font-semibold">I'm an individual</p>
                      <p class="mt-2 text-sm">
                        I'm an individual looking for legal aid.
                      </p>
                    </div>
                    <div class="check"></div>
                  </label>
                </div>
                <div class="selector my-5">
                  <input
                    type="radio"
                    id="organization"
                    class="hidden"
                    value="organizationadmin"
                    name="accountType"
                    v-model="stepValues.stepOne.value"
                  />
                  <label for="organization" class="flex p-4">
                    <div
                      class="icon h-9 w-9 flex justify-center items-center shadow-md rounded mx-3"
                    >
                      <Icon type="users" size="20" />
                    </div>
                    <div class="main">
                      <p class="font-semibold">I'm an organization</p>
                      <p class="mt-2 text-sm">
                        I'm an organization looking to provide legal aid to
                        clients.
                      </p>
                    </div>
                    <div class="check"></div>
                  </label>
                </div>
              </div>
            </div>
            <div v-if="currentStep === 'step-2'">
              <RegistrationForm />
            </div>
            <div class="submit">
              <button @click="validStepOneButtonClick" :disabled="!disableStep">
                Continue
              </button>
            </div>
            <div v-if="currentStep === 'step-3'"><h1>Step 3</h1></div>
            <div v-if="currentStep === 'step-4'"><h1>Step 4</h1></div>
          </div>
          <div class="footer">
            <div class="steps-container">
              <div class="steps">
                <div class="step" v-for="(step, index) in steps" :key="index">
                  <input
                    type="radio"
                    :id="step.key"
                    :value="step.value"
                    name="steps"
                    :checked="index === 0"
                    v-model="currentStep"
                    :disabled="!step.canClick"
                    class="hidden"
                  />
                  <label
                    :for="step.key"
                    :style="{
                      cursor: !step.canClick ? 'not-allowed' : 'pointer',
                    }"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="aside-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import Icon from "../../components/buttons/Icon.vue";
import FormTitle from "./components/FormTitle.vue";
import RegistrationForm from "./components/RegistrationForm.vue";
const currentStep = ref("step-1");
type Steps = "step-1" | "step-2" | "step-3" | "step-4";
interface StepValue {
  [key: string]: {
    key: Steps;
    value: string | Record<string, string>;
  };
}
interface Step {
  [key: string]: {
    key: Steps;
    value: string | Record<string, string>;
  };
}
const stepValues = reactive<StepValue>({
  stepOne: {
    key: "step-1",
    value: "",
  },
  stepTwo: {
    key: "step-2",
    value: {
      email: "",
      password: "",
    },
  },
  stepThree: {
    key: "step-3",
    value: {},
  },
  stepFour: {
    key: "step-4",
    value: {},
  },
});
const steps = ref<any>([
  {
    key: "stepOne",
    canClick: true,
    value: "step-1",
  },
  {
    key: "stepTwo",
    canClick: false,
    value: "step-2",
  },
  {
    key: "stepThree",
    canClick: false,
    value: "step-3",
  },
  {
    key: "stepFour",
    canClick: false,
    value: "step-4",
  },
]);

function validStepOneButtonClick() {
  const currentStepIndex = steps.value.findIndex(
    (step: any) => step.value === currentStep.value
  );
  if (currentStepIndex !== -1 && currentStepIndex < steps.value.length - 1) {
    currentStep.value = steps.value[currentStepIndex + 1].value;
    steps.value[currentStepIndex + 1].canClick = true;
  }
}

const disableStep = computed(() => {
  const currentStepIndex = steps.value.findIndex(
    (step: any) => step.value === currentStep.value
  );
  console.log(currentStepIndex);
  const currentStepKey = steps.value[currentStepIndex].key;

  const currentStepValue = stepValues[currentStepKey];

  if (typeof currentStepValue.value === "string")
    return !!currentStepValue.value;

  const hasValue = Object.values(currentStepValue.value).every(
    (value: any) => value !== ""
  );
  return hasValue;
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
