<template>
  <Teleport to="#toast">
    <main class="toast">
      <div class="toast-notification" :class="open ? 'active' : ''">
        <div class="toast-notification-container">
          <div class="toast-type-icon">
            <Icon type="alert-triangle" size="16" />
          </div>
          <h2 class="toast-notification-title">Error</h2>
          <p class="toast-notification-info">
            {{ text }}
          </p>
        </div>
        <div class="toast-notification-close">
          <Icon type="x" size="15" />
        </div>
      </div>
    </main>
  </Teleport>
</template>

<script setup lang="ts">
import Icon from "./buttons/Icon.vue";

interface Toast {
  open: boolean;
  text: string;
  type: "error" | "warning" | "info" | "success";
}
defineProps<Toast>();
</script>
<style scoped>
:root {
  --duration: 0;
}
.toast {
  display: grid;
  place-items: center;
}

.toast-notification {
  background: #fff;
  position: fixed;
  right: 40px;
  top: 20px;
  width: min(325px, 90vw);
  box-shadow: 0 0 16px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateX(1000px);
  transition: transform 0.8s;
}

.toast-type-icon.info {
}
.toast-type-icon.error {
}
.toast-type-icon.success {
  background: green;
}
.toast-type-icon.warning {
}
.toast-type-icon {
  width: 25px;
  height: 25px;
  background: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.toast-notification-title {
  font-size: 0.95rem;
  line-height: 2.5;
  color: rgba(0, 0, 0, 0.75);
}

.toast-notification-info {
  color: rgba(0, 0, 0, 0.65);
  font-size: 0.9rem;
}

.toast-notification-close {
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.25);
  font-size: 1rem;
}

.toast-notification-close:hover {
  color: rgba(0, 0, 0, 0.75);
}

@keyframes countdown {
  to {
    transform: scaleX(0);
  }
}

.animate {
  animation: countdown var(--duration) linear forwards;
}

.active.toast-notification {
  transform: translateX(0);
}

@media (max-width: 600px) {
  .toast-notification {
    right: 0px;
    top: 20px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
