<template>
  <div class="card">
    <div class="card-body">
      <div class="dashboard-card">
        <div class="card-header mb-7">
          <div class="dashboard-title flex justify-between items-center">
            <p class="text-sm text-gray-500">{{ title }}</p>
            <IconButton
              :icon="icon as string"
              shape="rounded"
              type="faded"
              size="sm"
              iconSize="17"
            />
          </div>
        </div>
        <div class="dashboard-content flex items-end  gap-4">
          <div class="amount">
            <h1>{{ amount.toLocaleString() }}</h1>
          </div>
          <div class="improvement-percentage">
            <p class="text-sm text-green-500">-3.5%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </template>

<script lang="ts" setup>
import IconButton from "../buttons/IconButton.vue";
interface IDashboardCard {
  icon: string;
  title: string;
  requireCurrency?: boolean;
  currency?: string;
  amount: number;
}
defineProps<IDashboardCard>();
</script>
<style scoped>
.improvement-percentage p {
  font-weight: 600;
}
</style>
