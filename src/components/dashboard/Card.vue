<template>
  <div class="card">
    <div class="card-body">
      <div class="dashboard-card">
        <div class="card-header flex justify-between items-center mb-7">
          <IconButton
            :icon="icon as string"
            shape="normal"
            type="faded"
            size="sm"
          />
          <Icon type="more-vertical" class="text-gray-800 text-sm" />
        </div>
        <div class="dashboard-title">
          <p class="text-sm">{{ title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "../buttons/Icon.vue";
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