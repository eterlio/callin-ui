import { defineStore } from "pinia";

interface Subscription {
  coupon?: string;
  plan: Plan | null;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  currentAmount: number;
  previousAmount: number;
}

// Store
export const useSubscriptionStore = defineStore({
  id: "subscription",
  state: (): Subscription => ({
    plan: null,
    coupon: "",
  }),

  actions: {
    setPlan(plan: Plan) {
      this.plan = plan;
    },
    setCoupon(coupon: string) {
      this.coupon = coupon;
    },

    createSubscription(): Subscription {
      const subscription = { coupon: this.coupon, plan: this.plan };
      return subscription;
    },
  },

  getters: {
    currentSubscriptionAmount(): number {
      return this.plan?.currentAmount || 0;
    },
    subscriptionName(): string {
      return this.plan?.name || "";
    },
    getPlan(): Boolean {
      return Boolean(this.plan);
    },
  },
});
