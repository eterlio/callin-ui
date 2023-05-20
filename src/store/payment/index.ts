import { defineStore } from "pinia";

// Interfaces
export type PaymentType = "mobile money" | "credit card";
interface Customer {
  customerFullName: string;
}
interface CreditCard extends Customer {
  cvv: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardEmail?: string;
}

interface MobileMoney extends Customer {
  phone: string;
}

export type PaymentDetails = CreditCard | MobileMoney;

interface PaymentState {
  details: PaymentDetails | null;
  type: PaymentType;
}

// Store
export const usePaymentStore = defineStore({
  id: "payment",
  state: (): PaymentState => ({
    details: null,
    type: "mobile money",
  }),
  actions: {
    setPayment(details: PaymentDetails) {
      this.details = details;
    },
    setPaymentType(type: PaymentType) {
      this.type = type;
    },
    clearPaymentDetails() {
      // thid
    },
  },
});
