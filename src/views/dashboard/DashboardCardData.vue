<template>
          <row :gutter="12">

          <column
        :xs="12"
        :md="6"
        :lg="3"
        v-for="data of dashboardData"
        :key="Math.random()"
      >
            <DashboardCard
              :icon="data.icon"
              :title="data.title"
              :amount="data.amount"
            />
          </column>
          </row>
</template>
<script lang="ts" setup>
import { IDashboardCard } from '../../interface';
import { mockDashboardData } from '../../mock/dashboardData';
import DashboardCard from "../../components/dashboard/Card.vue"
import {ref} from "vue"
const dashboardData = ref<IDashboardCard[]>();

async function fetchDashboardData() {
  dashboardData.value = await mockDashboardData();
}
await fetchDashboardData();
</script>