<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        class="modal-container flex justify-center items-center flex-col"
        v-if="isModalOpen"
      >
        <div
          :class="`modal max-h-full bg-white p-4 ${modalSizeDeterminer}`"
          ref="modalRef"
        >
          <div
            class="close-modal flex justify-end items-end"
            v-if="!hideCloseButton"
          >
            <Icon type="x" @click="closeModal" />
          </div>
          <div
            :class="`modal-wrapper flex justify-center items-center flex-col flex-1`"
            style="min-height: 300px"
          >
            <div class="modal-title my-4 text-center">
              <h2>{{ title }}</h2>
            </div>
            <div class="modal-description my-2 text-center">
              <p>{{ description }}</p>
            </div>

            <div
              class="modal-type flex justify-between items-center my-4"
              v-if="type"
            >
              <div class="modal-type-body" :class="`modal-${type}`">
                <p>
                  {{ typeDescription }}
                </p>
              </div>
            </div>

            <div class="modal-content my-3">
              <slot />
            </div>
            <div class="modal-buttons flex justify-center items-center gap-5">
              <div v-for="(button, index) in buttons" :key="index">
                <Button
                  :loading="button.loading"
                  :text="button.title"
                  class="btn bg-slate-500"
                  :class="button.className"
                  @click="button.click"
                  :isValid="button.disabled"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Icon from "../buttons/Icon.vue";
import { onClickOutside } from "@vueuse/core";
import Button from "../buttons/Button.vue";
interface IModalProps {
  title?: string;
  description?: string;
  typeDescription?: string;
  type?: "warning" | "success" | "info";
  buttons?: {
    title: string;
    className?: string;
    click?: Function;
    loading?: boolean;
    disabled?: boolean;
  }[];
  size?: "sm" | "md" | "lg" | "full";
  hideCloseButton?: boolean;
  contentCenter?: boolean;
}
const props = defineProps<IModalProps>();

// Data properties
const isModalOpen = ref(true);
const modalRef = ref(null);
const buttonColorClass = ref("");

function determineClassClose() {
  if (props.type === "info") buttonColorClass.value = "bg-blue-700";
  if (props.type === "success") buttonColorClass.value = "bg-green-700";
  if (props.type === "warning") buttonColorClass.value = "bg-red-700";
}
determineClassClose();
// Methods
const closeModal = () => {
  isModalOpen.value = false;
};

onClickOutside(modalRef, () => (isModalOpen.value = false));
const modalSizeMapper = {
  sm: "w-2/5",
  md: "w-1/2",
  lg: "w-2/3",
  full: "w-full h-full !rounded-none",
};
const modalSizeDeterminer = computed(() => {
  if (props.size) {
    return modalSizeMapper[props.size];
  }
  return modalSizeMapper.sm;
});
</script>
<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0000008e;
  z-index: 999;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.modal-warning {
  background: #ffe2ce;
}

.modal-warning::before {
  content: "";
  background: #da2c38;
}

.modal-success {
  background: #ceffd3;
}

.modal-success::before {
  content: "";
  background: #2af791;
}

.modal-info {
  background: #ced4ff;
}

.modal-info::before {
  content: "";
  background: #2c89da;
}

.modal {
  border-radius: 5px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-in-out;
}

.modal-enter-from,
.modal-enter-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
