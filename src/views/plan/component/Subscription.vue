<template>
  <div class="subscription">
    <div class="circle-container">
      <div class="circle">
        <div class="inner"></div>
      </div>
    </div>
    <div class="content">
      <h3>{{ subscription.name }}</h3>
      <p>{{ subscription.description }}</p>
    </div>
    <div class="pricing font-bold text-primary">
      <p class="current-price" style="width: 100px">
        &#8373;{{ subscription.currentAmount }} /mo.
      </p>
      <p
        class="old-price flex justify-center items-center text-gray-400 text-sm line-through"
        v-if="subscription.previousAmount > 0"
      >
        &#8373;{{ subscription.previousAmount }}/mo.
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Subscription {
  subscription: {
    id: string;
    name: string;
    description: string;
    currentAmount: number;
    previousAmount: number;
  };
}
defineProps<Subscription>();
</script>
<style scoped>
.subscription {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 5px;
  background: #fff;
  border: 2px solid #eee;
  margin: 0.6rem 0;
  cursor: pointer;
  transition: border-color 0.3s ease-out;
}
.subscription.active {
  border-color: #434ce6;
}
.subscription .circle-container {
  display: flex;
  margin-right: 0.5rem;
}
.circle-container .circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #e9e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease-out;
}
.subscription.active .circle-container .circle {
  border-color: #434ce6;
}
.circle-container .circle .inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: border-color 0.3s ease-out;
}
.subscription.active .circle-container .circle .inner {
  background-color: #434ce6;
}

@media (max-width: 840px) {
  .subscription {
    flex-direction: column;
    gap: 0.5rem;
  }
  .old-price {
    justify-content: start;
    margin-top: 0.3rem;
  }
}
</style>
