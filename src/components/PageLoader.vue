<template>
  <div class="page-loader__container">
    <div class="custom-loader"></div>
  </div>
</template>
<style scoped>
.page-loader__container {
  overflow: hidden;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-loader {
  width: 70px;
  height: 70px;
  background: radial-gradient(farthest-side, #442df4 90%, #0000) center/16px
      16px,
    radial-gradient(farthest-side, #6f6d91 90%, #0000) bottom/12px 12px;
  background-repeat: no-repeat;
  animation: s7 0.6s infinite linear;
  position: relative;
}
.custom-loader::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  inset: auto 0 16px;
  margin: auto;
  background: #e4e4ed;
  border-radius: 50%;
  transform-origin: 50% calc(100% + 10px);
  animation: inherit;
  animation-duration: 0.7s;
}

@keyframes s7 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
