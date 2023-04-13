<template>
  <div class="dropdown" @click="toggleDropdown">
    <slot name="button"></slot>
    <transition name="dropdown">
      <div class="dropdown-menu" v-if="isOpen" ref="dropdownMenu">
        <slot name="options"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:isOpen"]);
const { isOpen } = toRefs(props);

function toggleDropdown() {
  emit("update:isOpen", !isOpen.value);
}
</script>

<style>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  position: fixed;
  will-change: transform;
  top: 0px;
  left: 0px;
  transform: translate3d(20px, 20px, 0px);
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px;
  box-sizing: border-box;
  display: block;
  flex: 1 1 auto;
  overflow: auto;
  z-index: 400;
}
.dropdown-menu ul {
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-width: 800px;
  min-width: 149px;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  color: rgb(23, 43, 77);
  user-select: none;
}

.dropdown-menu li:hover {
  background-color: #f8f9fa;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
