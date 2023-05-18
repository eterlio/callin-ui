<template>
  <div class="selector my-5">
    <input
      type="radio"
      id="individual"
      class="hidden"
      name="accountType"
      value="client"
      v-model="data.stepValue"
    />
    <label for="individual" class="flex p-4">
      <div
        class="icon h-9 w-9 flex justify-center items-center shadow-md rounded mx-3"
      >
        <Icon type="user" size="20" />
      </div>
      <div class="main">
        <p class="font-semibold">I'm an individual</p>
        <p class="mt-2">I'm an individual looking for legal aid.</p>
      </div>
      <div class="check"></div>
    </label>
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: {
    value: String;
    stepValue: String;
  };
}
defineProps<Props>();
</script>
