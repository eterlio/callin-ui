<template>
  <div class="dashboard">
    <div class="header-container">
      <header class="main-header"></header>
    </div>
    <div class="sidebar-container" :class="{ open: isSidebarOpen }">
      <div class="sidebar">
        <div class="sidebar-content">
          <div class="main-content bg-primary">
            <div class="sidebar-groups">
              <div class="sidebar-logo">
                <div class="logo">
                  <h5>LOGO</h5>
                </div>
              </div>
              <!-- sidebar items -->
              <div class="sidebar-items">
                <div class="items">
                  <div class="sidebar-menu">
                    <div class="items">
                      <NavLink :name="'Dashboard'" :to="'/'" :iconType="'home'" />
                      <NavLink :name="'Users'" :to="'/users'" :iconType="'user'" />
                      <NavLink :name="'Files'" :to="'/files'" :iconType="'file'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section
      class="main__content-wrapper"
      :style="`${
        !isSidebarOpen ? 'padding-left:20px' : 'padding-left: 247px;'
      }`"
    >
      <div>
        <div class="section-content">
          <div class="main-content">
            <slot />
            <button @click="toggleSidebar">Click me</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted, watchEffect } from "vue";
import NavLink from "./NavLink.vue";
defineProps({
  requireSidebar: {
    type: Boolean,
    required: false,
    default: true,
  },
  requireHeader: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const isSidebarOpen = ref(true);
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// watch(screenWidth, (newVal, oldVal) => {
//   // Do something when the screen width changes
// });
watchEffect(() => {
  if (screenWidth.value <= 768) {
    isSidebarOpen.value = false;
  } else isSidebarOpen.value = true;
});
</script>
