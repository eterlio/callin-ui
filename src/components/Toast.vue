<template>
  <Teleport to="#toast">
    <main class="toast">
      <div class="toast-notification">
        <div class="toast-notification-container">
          <h2 class="toast-notification-title">Connection Successful</h2>
          <p class="toast-notification-info"></p>
        </div>
        <button class="toast-notification-close">x</button>
        <div class="toast-notification-timeline"></div>
      </div>
      <button class="toast-connect">connect</button>
    </main>
  </Teleport>
</template>
<style scoped>
:root {
  --duration: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

.toast {
  display: grid;
  place-items: center;
}

.toast-notification {
  position: fixed;
  right: 2rem;
  top: 10vmin;
  width: min(325px, 90vw);
  box-shadow: 0 0 16px 10px rgba(0, 0, 0, 0.1);
  font: 100 0.65rem poppins, helvetica, sans-serif;
  padding: 1.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateX(400px);
  transition: transform 0.8s;
}

.toast-notification-title {
  font-size: 0.85rem;
  line-height: 2.5;
  color: rgba(0, 0, 0, 0.75);
}

.toast-notification-info {
  color: rgba(0, 0, 0, 0.65);
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

.toast-notification-timeline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background-color: black;
  transform-origin: left;
}

@keyframes countdown {
  to {
    transform: scaleX(0);
  }
}

.animate {
  animation: countdown var(--duration) linear forwards;
}

.toast-connect {
  font-weight: 900;
  border: none;
  background-color: black;
  color: white;
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 0.25rem;
}

.toast-connect:active {
  border: 1px solid black;
}

.active.toast-notification {
  transform: translateX(0);
}

.ignore.toast-connect {
  -webkit-pointer-events: none;
  pointer-events: none;
}
</style>
