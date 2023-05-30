<template>
  <div class="plan-main__container">
    <div class="plan-wrapper">
      <div class="plan-header">
        <div class="logo">LOGO</div>
      </div>
      <div class="plan-main__content">
        <div class="wrapper">
          <div class="text-content">
            <div class="main-text font-bold text-xl text-primary my-3">
              Help us bring justice to the people
            </div>
            <FormTitle
              header="Choose your Callin plan"
              paragraph=""
              class="subscription-header"
            />
            <div v-for="(item, index) in items" :key="index">
              <Accordion :item="item" />
            </div>
          </div>

          <div class="subscription_container">
            <FormTitle
              header="Choose your Callin plan"
              paragraph=""
              class="subscription-header hidden"
            />
            <div v-for="(plan, index) in allPlans" :key="index">
              <Plan
                :id="plan.id"
                :name="plan.name"
                :current-price="plan.currentPrice"
                :description="plan.description"
                :previous-price="plan.previousPrice"
                @click="handleSelectedSubscription(plan.id as string)"
                :class="{
                  active: plan.id === subscriptionStore.planId,
                }"
              />
            </div>
            <div class="submit">
              <button
                class="btn-primary"
                :disabled="!subscriptionStore.planId"
                @click="handlePlanSelected"
              >
                Continue
              </button>
            </div>
            <div class="mt-3 flex justify-end items-end font-semibold">
              <RouterLink to="#" class="text-primary no-underline"
                >See full subscriptions</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="plan-footer flex justify-between items-center">
        <div class="left-content flex items-center gap-3">
          <div class="logo">Logo</div>
          <div class="copyright">
            <span> Copyright </span>
            <span>&copy;</span>
            <span>{{ new Date().getFullYear() }}</span>
          </div>
          <div class="company text-primary font-bold">Callin</div>
        </div>
        <div class="right-content flex justify-between items-center gap-3">
          <RouterLink to="" class="text-primary no-underline"
            >Terms of Service</RouterLink
          >
          <RouterLink to="" class="text-primary no-underline"
            >Privacy Policy</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormTitle from "../authentication/components/FormTitle.vue";
import Plan from "./component/Plan.vue";
import Accordion from "../../components/Accordion.vue";
import { ref } from "vue";
import { useSubscriptionStore } from "../../store/subscription";
import { useRouter } from "vue-router";
import { Plan as IPlan, usePlanStore } from "../../store/plan";
import { postRequest } from "../../axios/privateRequest";
import { useUserStore } from "../../store/users";
const router = useRouter();
const subscriptionStore = useSubscriptionStore();
const userStore = useUserStore();
const items = ref([
  {
    title: "How does the 30-days free trial works?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas amet laboriosam necessitatibus, facere molestiae debitis ad ab nesciunt animi quam beatae doloremque aperiam, nostrum tempore quia laborum architecto dolores?",
    isOpen: false,
  },
  {
    title: "Why do you need my credit card for the free trial?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas amet laboriosam necessitatibus, facere molestiae debitis ad ab nesciunt animi quam beatae doloremque aperiam, nostrum tempore quia laborum architecto dolores?",
    isOpen: false,
  },
  {
    title: "How do I cancel my subscription if not satisfied?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas amet laboriosam necessitatibus, facere molestiae debitis ad ab nesciunt animi quam beatae doloremque aperiam, nostrum tempore quia laborum architecto dolores?",
    isOpen: false,
  },
]);

//TODO - CHeck if client already has a subscription(do this in the backend as well, make that the current subscription)

const allPlans = ref<IPlan[]>();

const handleSelectedSubscription = (id: string) => {
  subscriptionStore.setPlan(id);
};
const handlePlanSelected = async () => {
  if (userStore?.currentUser?.subscription.planId) {
    router.push("/checkout");
  } else {
    await postRequest("/api/subscription/create", {
      planId: subscriptionStore.planId,
    });
    router.push("/checkout");
  }
};

const usePlan = usePlanStore();
const getPlans = async () => {
  try {
    const { plans } = await usePlan.getPlans();
    allPlans.value = plans;
    console.group(plans);
  } catch (error) {}
};
getPlans();
subscriptionStore.setPlan(userStore?.currentUser?.subscription.planId);
</script>
