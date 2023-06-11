<template>
  <div class="onboarding-container h-screen">
    <div class="h-full grid grid-cols-1 lg:grid-cols-12">
      <div
        class="h-full lg:col-span-3 flex items-center flex-col py-5 px-4 shadow"
      >
        <div class="page-logo mb-20">
          <Logo />
        </div>
        <div class="stepper-nav flex flex-col">
          <Stepper
            v-for="(step, index) in stepperData"
            :title="step.title"
            :content="step.content"
            :status="step.status"
            :step="step.step"
            :active="step.active"
          />
        </div>
      </div>
      <div class="h-full lg:col-span-9 p-4 flex min-w-[0] flex-[1 auto] py-10">
        <div class="onboarding-content__body mx-auto lg:w-[700px]">
          <div class="lg:p-[3.5rem]">
            <div action="" class="pb-5 mx-auto">
              <div class="w-full">
                <div class="pb-10 lg:pb-15">
                  <h2 class="font-bold text-dark mb-2">Account Info</h2>
                  <p class="text-[#a1a5b7]">
                    If you need info, please check out
                    <a href="" class="font-bold text-blue-800 ml-2 no-underline"
                      >Help Page</a
                    >
                  </p>
                </div>

                <div class="mb-10">
                  <div class="mb-2" v-if="currentStep === '1'">
                    <label
                      class="mb-1 flex items-center font-medium text-[#3f4254]"
                      >Specify Team Size
                    </label>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <SizeCard
                        :text="size"
                        v-for="size in teamSize"
                        @click="handleSizeSelected(size)"
                        :class="{
                          active: size === organizationStore.organization.size,
                        }"
                      />
                    </div>
                  </div>

                  <div v-if="currentStep === '2'">
                    <OrganizationInfo
                      :organization="organizationStore.organization"
                    />
                  </div>
                </div>
                <div class="buttons mt-10 flex items-center justify-between">
                  <Button
                    class="btn !bg-[#f1faff] !text-blue-500 !p-4"
                    v-if="currentStep !== '1'"
                  >
                    Previous
                  </Button>
                  <Button
                    class="btn btn-primary !p-4"
                    :isValid="organizationStore.organization.size === '0'"
                    @click="handleFormClick"
                  >
                    {{ currentStep === "6" ? "Complete" : "Continue" }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Logo from "../../components/Logo.vue";
import Stepper from "../../components/buttons/Stepper.vue";
import { useUserStore } from "../../store/users";
import { useOrganizationStore } from "../../store/organization";
import SizeCard from "../../components/buttons/SizeCard.vue";
import Input from "../../components/inputs/Input.vue";
import Button from "../../components/buttons/Button.vue";
import { cloneDeep } from "lodash";
import { getObjectDifference } from "../../helpers/objectDifference";
import OrganizationInfo from "./OrganizationInfo.vue";
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const currentUser = userStore.currentUser;
const currentStep = ref("1");

type TeamSize = "1-1" | "2-10" | "10-50" | "50+";

async function getOrganization() {
  await organizationStore.getOrganization({
    organizationId: currentUser?.organizationId as string,
  });
}
onMounted(getOrganization);

if (!organizationStore.organization.size) {
  currentStep.value = "1";
} else if (!organizationStore.organization.name) {
  currentStep.value = "2";
}

const handleSizeSelected = (size: TeamSize) => {
  organizationStore.organization.size = size;
};

const organizationCopy = cloneDeep(organizationStore.organization);
const handleFormClick = async () => {
  const toIgnore: any = [];
  // Example usage
  const updated = getObjectDifference(
    organizationCopy,
    organizationStore.organization,
    toIgnore
  );

  try {
    if (Object.keys(updated).length) {
      const r = await organizationStore.updateOrganization(
        currentUser?.organizationId as string,
        updated
      );
      console.log(r);
    }
  } catch (error: any) {
    console.log({ error: error.message });
  }
};

// COMPUTED
const organizationSettingsPassed = computed(() => {
  return organizationStore.organization.size ? "completed" : "pending";
});
const organizationSettingsInfo = computed(() => {
  const { organization } = organizationStore;
  return organization.name && organization.description && organization.slogan
    ? // &&
      // organization.corporationType
      "completed"
    : "pending";
});

const teamSize: TeamSize[] = ["1-1", "2-10", "10-50", "50+"];
const stepperData = ref([
  {
    title: "Organization Size",
    content: "Choose Organization Size",
    step: "1",
    status: organizationSettingsPassed,
    active: currentStep.value === "1",
  },
  {
    title: "Organization Info",
    content: "Setup Organization Details",
    step: "2",
    status: organizationSettingsInfo,
    active: currentStep.value === "2",
  },
  {
    title: "Organization Contact",
    content: "Setup Organization Contact Details",
    step: "3",
    status: "pending",
    active: currentStep.value === "3",
  },
  {
    title: "Completed",
    content: "Woah, we're here",
    step: "4",
    status: organizationSettingsInfo,
    active: currentStep.value === "4",
  },
]);
</script>
