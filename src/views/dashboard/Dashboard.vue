<template>
  <Wrapper title="Customer">
    <row container :gutter="12">
      <column :xs="12" :md="4" :lg="3" v-for="data of dashboardData">
        <DashboardCard
          :icon="data.icon"
          :title="data.title"
          :amount="data.amount"
          :key="Math.random()"
        />
      </column>
    </row>
  </Wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Wrapper from "../../components/Wrapper.vue";
import DashboardCard from "../../components/dashboard/Card.vue";
import { IDashboardCard } from "../../interface";
import { mockDashboardData } from "../../mock/dashboardData";
const dashboardData = ref<IDashboardCard[]>(mockDashboardData);
</script>
<style>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.032);
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}
</style>
