<template>
  <div class="accordion cursor-pointer my-2">
    <div
      @click="item.isOpen = !item.isOpen"
      class="accordion-header font-bold text-primary flex justify-between items-center"
    >
      <p>
        {{ item.title }}
      </p>
      <Icon :type="item.isOpen ? 'minus' : 'plus'" size="18" />
    </div>
    <div v-show="item.isOpen" class="accordion-content py-4">
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "./buttons/Icon.vue";

interface Item {
  item: {
    content: string;
    isOpen: boolean;
    title: string;
  };
}
defineProps<Item>();
</script>

<style scoped>
.accordion {
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}
</style>
