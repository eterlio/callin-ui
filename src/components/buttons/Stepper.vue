<template>
  <div
    class="stepper-item relative pb-[2.5rem] flex items-center transition-colors ease-in-out cursor-pointer"
    :class="status"
  >
    <div
      class="stepper-line w-[40px] absolute z-0 left-0 top-0 bottom-0 translate-x-[50%]"
    ></div>
    <div
      class="stepper-icon w-[40px] h-[40px] z-[1] flex items-center justify-center mr-5 rounded"
      :class="`${active ? 'bg-blue-500' : 'bg-[#f1faff]'}`"
    >
      <Icon
        type="check"
        size="19"
        class="text-blue-600 font-extrabold"
        v-if="status === 'completed'"
      />
      <span
        v-else-if="status === 'pending'"
        class="font-semibold"
        :class="`${active ? 'text-white' : 'text-blue-500'}`"
        >{{ step }}</span
      >
    </div>
    <div class="stepper-label flex flex-col justify-center">
      <h3 class="stepper-title">{{ title }}</h3>
      <p class="stepper-desc text-[#b5b5c3] text-[13.5px] mt-1">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "./Icon.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  step: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
<style>
.stepper-line {
  border-left: 1px dashed #e4e6ef;
}
.stepper-item:first-child .stepper-line {
  top: 50%;
}
.stepper-item:last-child .stepper-line {
  bottom: 50%;
}
.stepper-item.completed .stepper-label .stepper-title {
  color: #969696;
}
.stepper-item.completed .stepper-label .stepper-desc {
  color: #b5b5c3c9;
}
</style>
