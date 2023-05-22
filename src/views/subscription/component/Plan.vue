<template>
  <div class="plan">
    <div class="circle-container">
      <div class="circle">
        <div class="inner"></div>
      </div>
    </div>
    <div class="content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="pricing font-bold text-primary">
      <p class="current-price" style="width: 100px">
        &#8373;{{ currentPrice }} /mo.
      </p>
      <p
        class="old-price flex justify-center items-center text-gray-400 text-sm line-through"
        v-if="previousPrice > 0"
      >
        &#8373;{{ previousPrice }}/mo.
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Plan {
  id: string | null;
  name: string;
  description: string;
  previousPrice: number;
  currentPrice: number;
}
defineProps<Plan>();
</script>
<style scoped>
.plan {
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
.plan.active {
  border-color: #434ce6;
}
.plan .circle-container {
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
.plan.active .circle-container .circle {
  border-color: #434ce6;
}
.circle-container .circle .inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: border-color 0.3s ease-out;
}
.plan.active .circle-container .circle .inner {
  background-color: #434ce6;
}

@media (max-width: 840px) {
  .plan {
    flex-direction: column;
    gap: 0.5rem;
  }
  .old-price {
    justify-content: start;
    margin-top: 0.3rem;
  }
}
</style>
