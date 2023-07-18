<template>
  <div class="onboarding-container">
    <div class="h-full">
      <div class="h-full p-3 flex min-w-[0]">
        <div class="onboarding-content__body mx-auto lg:w-[700px]">
          <div class="lg:p-[3rem]">
            <div action="" class="pb-5 mx-auto">
              <div class="w-full">
                <div class="pb-5">
                  <h2 class="font-bold text-dark mb-2">Account Info</h2>
                  <p class="text-[#a1a5b7]">
                    If you need info, please check out
                    <a href="" class="font-bold text-blue-800 ml-2 no-underline"
                      >Help Page</a
                    >
                  </p>
                </div>
                <div class="mb-2">
                  <label
                    class="mb-1 flex items-center font-medium text-[#3f4254]"
                    >Specify Team Size
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
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
                <div class="mb-5">
                  <OrganizationInfo
                    :organization="organizationStore.organization"
                  />
                </div>
                <div class="buttons mt-5 flex items-center justify-end">
                  {{ hasValidOrganizationContactInfo }}
                  {{ hasValidOrganizationInfo }}
                  {{ hasValidOrganizationSize }}
                  <Button
                    class="btn btn-primary !p-4"
                    :disabled="
                      !(
                        hasValidOrganizationContactInfo &&
                        hasValidOrganizationInfo &&
                        hasValidOrganizationSize
                      )
                    "
                    @click="handleFormClick"
                  >
                    Complete
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
import { computed, onMounted} from "vue";
import { useUserStore } from "../../store/users";
import { useOrganizationStore } from "../../store/organization";
import SizeCard from "../../components/buttons/SizeCard.vue";
import Button from "../../components/buttons/Button.vue";
import { cloneDeep } from "lodash";
import { getObjectDifference } from "../../helpers/objectDifference";
import OrganizationInfo from "./OrganizationInfo.vue";
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const currentUser = userStore.currentUser;
type TeamSize = "1-1" | "2-10" | "10-50" | "50+";

// async function getOrganization() {
//    await organizationStore.fetchOrganization({
//     organizationId: currentUser?.organizationId as string,
//   });
// }
// onMounted(getOrganization);

const handleSizeSelected = (size: TeamSize) => {
  organizationStore.organization.size = size;
};

const organizationCopy = cloneDeep(organizationStore.organization);
const handleFormClick = async () => {
  const toIgnore: any = [];
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
    }
  } catch (error: any) {
    console.log({ error: error.message });
  }
};

// STEP VALIDATERS
const hasValidOrganizationSize = computed(() => {
  return (
    organizationStore.organization.size &&
    organizationStore.organization.size !== "0"
  );
});
const hasValidOrganizationInfo = computed(() => {
  return !!(
    organizationStore.organization.name &&
    organizationStore.organization.description &&
    organizationStore.organization.slogan
  );
});

const hasValidOrganizationContactInfo = computed(() => {
  const hasValidPhoneDetails =
    organizationStore.organization.phone &&
    organizationStore.organization.phone.country &&
    organizationStore.organization.phone.number &&
    organizationStore.organization.phone.prefix;
  return !!(organizationStore.organization.email && hasValidPhoneDetails);
});
const teamSize: TeamSize[] = ["1-1", "2-10", "10-50", "50+"];

</script>
