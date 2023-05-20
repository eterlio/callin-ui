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
            <div v-for="(subscription, index) in subscriptions" :key="index">
              <Subscription
                :subscription="subscription"
                @click="handleSelectedSubscription(subscription)"
                :class="{
                  active: subscriptionStore?.plan?.name === subscription.name,
                }"
              />
            </div>
            <div class="submit">
              <button
                class="btn-primary"
                :disabled="!Boolean(subscriptionStore?.plan)"
                @click="handlePlan"
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
import Subscription from "./component/Subscription.vue";
import Accordion from "../../components/Accordion.vue";
import { ref } from "vue";
import { useSubscriptionStore, Plan } from "../../store/subscription";
import { useRouter } from "vue-router";
const router = useRouter();
const subscriptionStore = useSubscriptionStore();
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

const subscriptions = ref([
  {
    id: String(Math.floor(Math.random() * 40000000)),
    name: "Starter",
    description:
      "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, dolores?",
    currentAmount: 23.4,
    previousAmount: 0,
  },
  {
    id: String(Math.floor(Math.random() * 40000000)),
    name: "Standard",
    description:
      "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, dolores?",
    currentAmount: 25.7,
    previousAmount: 0,
  },
  {
    id: String(Math.floor(Math.random() * 40000000)),
    name: "Pro",
    description:
      "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, dolores?",
    currentAmount: 23.8,
    previousAmount: 45.1,
  },
]);

const handleSelectedSubscription = (plan: Plan) => {
  subscriptionStore.setPlan(plan);
};
const handlePlan = () => {
  router.push("/checkout");
};
</script>
