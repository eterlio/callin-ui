import useAxiosPrivate from "../../axios/protectedInstance";
import axiosInstance from "../../axios/protectedInstance";
import { PaymentDetails, PaymentType } from "./../payment";
import { defineStore } from "pinia";

const { post } = useAxiosPrivate();
interface Subscription {
  coupon?: string;
  planId: string | null;
}

// Store
export const useSubscriptionStore = defineStore({
  id: "subscription",
  state: (): Subscription => ({
    planId: null,
    coupon: "",
  }),

  actions: {
    setPlan(planId: string) {
      this.planId = planId;
    },
    setCoupon(coupon: string) {
      this.coupon = coupon;
    },
    async createSubscription(payload: {
      details: PaymentDetails;
      paymentType: PaymentType;
      planId: string;
    }) {
      const subscription = {
        coupon: this.coupon,
        planId: payload.planId,
        subscriberDetails: payload.details,
        paymentType: payload.paymentType,
      };
      const { data } = await post(
        "/api/subscription/initialize/payment",
        subscription
      );
      return data;
    },
  },

  getters: {},
});
