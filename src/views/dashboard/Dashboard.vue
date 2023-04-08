<template>
  <Wrapper title="ADMIN DASHBOARD">
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

    <div class="my-8">
      <row :gutter="12">
        <column :xs="12" :md="6" :lg="6">
          <div class="card">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <div class="title">
                  <h4>Newly registered users</h4>
                </div>
                <RouterLink
                  to=""
                  class="no-underline text-sm text-gray-800 font-bold"
                  >View All</RouterLink
                >
              </div>

              <div class="chart-content">
                <h1>Users table comes here</h1>
              </div>
            </div>
          </div>
          <div class="card my-8">
            <div class="card-body">
              <div class="card-wrapper flex justify-between items-center">
                <div class="title">
                  <h4>Newly registered users</h4>
                </div>
                <div
                  class="chart-buttons bg-gray-100 p-1 flex justify-between items-center gap-2"
                >
                  <div class="button-box">
                    <label
                      for="monthly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: selected === 'option1' }"
                      >Monthly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option1"
                      v-model="selected"
                      id="monthly"
                    />
                  </div>
                  <div class="button-box">
                    <label
                      for="weekly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: selected === 'option2' }"
                      >Weekly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option2"
                      v-model="selected"
                      id="weekly"
                    />
                  </div>
                </div>
              </div>
              <div class="chart-content">
              </div>
            </div>
          </div>
        </column>
        <column :xs="12" :md="6" :lg="6">
          <div class="card">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <div class="title">
                  <h4>Newly registered users</h4>
                </div>
                <RouterLink
                  to=""
                  class="no-underline text-sm text-gray-800 font-bold"
                  >View All</RouterLink
                >
              </div>
            </div>
          </div>
        </column>
      </row>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Wrapper from "../../components/Wrapper.vue";
import DashboardCard from "../../components/dashboard/Card.vue";
import { IDashboardCard } from "../../interface";
import { mockDashboardData } from "../../mock/dashboardData";
const dashboardData = ref<IDashboardCard[]>(mockDashboardData);
const selected = ref("option1");
</script>
<style scoped>
.active {
  border-radius: 4px;
  color: #fff;
  background: rgb(31, 41, 55);
  transition: background-color 0.3s ease-in-out;
}
@media (max-width: 768px) {
  .card-wrapper{
    display: block;
  }
  .chart-buttons{
    margin: 1rem 0;
  }
}</style>
