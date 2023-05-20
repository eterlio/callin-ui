<template>
  <div class="checkout-container h-screen">
    <div
      class="container-wrapper m-auto flex justify-between py-5 flex-col h-full"
      style="width: 95%"
    >
      <div class="header-link flex-grow">
        <div
          class="flex items-center cursor-pointer text-gray-700 w-20"
          @click="router.go(-1)"
        >
          <Icon type="arrow-left" />
          <p>Back</p>
        </div>
      </div>
      <div class="main-content flex justify-between gap-8 mt-5">
        <div class="checkout-details flex-1">
          <h4>Select payment type</h4>
          <div v-for="(paymentType, index) in paymentTypes">
            <Input
              type="radio-input"
              name="paymentType"
              :id="camelize(paymentType.type)"
              :icon="paymentType.icon"
              :label="capitalize(paymentType.type)"
              :modelValue="paymentType.type"
              @click="handlePaymentType(paymentType.type)"
              :class="{
                active: paymentStore.type === paymentType.type,
              }"
            />
          </div>
          <div
            class="checkout-content p-8 border-2 border-solid rounded-md bg-white"
          >
            <p class="text-primary font-semibold">You have to pay:</p>
            <div class="my-4">
              <FormTitle
                :header="`&#8373;${subscriptionStore.currentSubscriptionAmount.toFixed(
                  2
                )}`"
              />
            </div>
            <div class="py-6">
              <div class="flex items-center gap-2">
                <div
                  class="check relative h-4 w-4 rounded-full bg-green-400"
                ></div>
                <p class="text-gray-600 font-semibold">Payment & Invoice</p>
              </div>
              <p
                class="pt-4 w-1/2 simple from-neutral-700 font-medium text-gray-600"
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum,
                tempore ea? Laborum quo minus inventore.
              </p>
            </div>
            <div
              class="checkout-banner p-4 bg-gray-100 flex items-center justify-between"
            >
              <div class="flex items-center flex-1 gap-4">
                <div
                  class="h-6 w-6 rounded-full flex items-center justify-center"
                >
                  <img src="/src/assets/money.png" />
                </div>
                <div class="text">
                  <h5 class="primary-text mb-2">
                    Yearly {{ subscriptionStore.subscriptionName }} Subscription
                    Plan
                  </h5>
                  <p
                    class="w-3/4 simple from-neutral-700 font-medium text-gray-600"
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fugit, recusandae?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkout-form flex-1">
          <FormTitle header="Payment" />
          <p class="w-3/4 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ad
            quisquam eius ipsam eum recusandae.
          </p>

          <div class="checkout-form my-8 w-3/4 auto" ref="formRef">
            <MobileMoneyForm
              v-if="paymentStore.type === 'mobile money'"
              @sendMobileMoneyData="handlePayment"
            />
            <CreditCardForm
              v-if="paymentStore.type === 'credit card'"
              @sendCreditCardData="handlePayment"
            />
            <button
              class="btn-primary text-center"
              :disabled="payButtonDisabled"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <div class="checkout-footer flex justify-center items-center flex-grow">
        <p>
          All right reserved and powered by
          <a
            href="https://paystack.com"
            target="_blank"
            class="text-primary font-semibold no-underline ml-2"
            >Paystack</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import Icon from "../../../components/buttons/Icon.vue";
import FormTitle from "../../authentication/components/FormTitle.vue";
import { useSubscriptionStore } from "../../../store/subscription";
import {
  usePaymentStore,
  PaymentType,
  PaymentDetails,
} from "../../../store/payment";
import Input from "../../../components/inputs/Input.vue";
import { camelize, capitalize, computed, ref } from "vue";
import MobileMoneyForm from "./MobileMoneyForm.vue";
import CreditCardForm from "./CreditCardForm.vue";

const discount = ref("");
const paymentTypes = ref<
  {
    icon: string;
    imgUrl?: string;
    type: PaymentType;
  }[]
>([
  {
    icon: "user",
    type: "mobile money",
  },
  {
    icon: "credit-card",
    type: "credit card",
  },
]);
const router = useRouter();
const formRef = ref<any>(null);
formRef.value?.scrollIntoView({ behavior: "smooth" });
const subscriptionStore = useSubscriptionStore();
const paymentStore = usePaymentStore();
const handlePaymentType = (type: PaymentType) => {
  paymentStore.setPaymentType(type);
};

const handlePayment = (data: PaymentDetails) => {
  paymentStore.setPayment(data);
};

const payButtonDisabled = computed(() => {
  return !(
    paymentStore.details &&
    Object.values(paymentStore.details as PaymentDetails).every(
      (detail: string) => {
        return detail && detail.length >= 3;
      }
    )
  );
});
</script>
<style scoped>
.main-content {
  flex-grow: 8;
}

.checkout-content {
  border-color: #eee;
}

.check::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(35deg);
  width: 3px;
  height: 7px;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .checkout-form {
    width: 100%;
  }
  .simple {
    width: 100%;
  }
}
</style>
