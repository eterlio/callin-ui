import { defineStore } from "pinia";
import axiosInstance from "../../axios/publicInstance";

export interface Plan {
  fetchData: boolean;
  id: string | null;
  name: string;
  description: string;
  previousPrice: number;
  currentPrice: number;
}

interface IPlan extends Plan {
  allPlans: Plan[];
}

// Store
export const usePlanStore = defineStore({
  id: "plan",
  state: (): IPlan => ({
    id: null,
    name: "",
    description: "",
    previousPrice: 0,
    currentPrice: 0,
    allPlans: [],
    fetchData: false,
  }),
  actions: {
    async getPlans() {
      try {
        this.fetchData = true;
        const { data } = await axiosInstance.get("/api/plans");
        this.setPlans(data.response.plans);
        return data.response;
      } catch (error) {
      } finally {
        this.fetchData = false;
      }
    },
    async getPlan(planId: string) {
      try {
        const { data } = await axiosInstance.get(`/api/plans/${planId}`);
        this.setPlans([data.response.plan]);
        return data.response;
      } catch (error) {}
    },
    setPlans(plans: Plan[]) {
      this.allPlans = plans;
    },
  },
  getters: {
    plans() {
      return this.plans;
    },
  },
});
