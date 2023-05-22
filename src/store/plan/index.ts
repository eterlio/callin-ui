import { defineStore } from "pinia";
import axiosInstance from "../../axios/publicInstance";

export interface Plan {
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
  }),
  actions: {
    async getPlans() {
      try {
        const { data } = await axiosInstance.get("/api/plans");
        // console.log(data.response.plans);
        // this.plans = data.response.plans;
        this.setPlans(data.response.plans);
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
