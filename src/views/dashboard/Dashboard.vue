<template>
  <DashboardWrapper title="ADMIN DASHBOARD" :requireSidebar="true" :requireHeader="true">
    <Suspense>
      <template #default>
        <DashboardCardData />
      </template>
      <template #fallback>
        <DashboardCardDataShimmer />
      </template>
    </Suspense>

    <div class="my-4">
      <Table :headers="headers">
        </Table>
    </div>
    <!-- EXPENSES CHART -->
    <div class="my-8">
      <row :gutter="12">
        <column :xs="12" :md="12" :lg="6">
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
                <Input
                  type="number"
                  label="Email"
                  v-model="email"
                  :required="false"
                />
              </div>
            </div>
          </div>
          <div class="card my-8">
            <div class="card-body">
              <div class="card-wrapper flex justify-between">
                <div class="title">
                  <h4>Month Expenditure</h4>
                </div>
                <div
                  class="chart-buttons bg-gray-100 p-1 flex justify-between items-center gap-2 mb-8"
                >
                  <div class="button-box">
                    <label
                      for="monthly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: expenditureSelected === 'option1' }"
                      >Monthly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option1"
                      v-model="expenditureSelected"
                      id="monthly"
                    />
                  </div>
                  <div class="button-box">
                    <label
                      for="weekly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: expenditureSelected === 'option2' }"
                      >Weekly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option2"
                      v-model="expenditureSelected"
                      id="weekly"
                    />
                  </div>
                </div>
              </div>
              <div class="chart-content">
                <Chart
                  type="area"
                  title="Monthly Expenditure"
                  :data="chartData"
                />
              </div>
            </div>
          </div>
        </column>
        <column :xs="12" :md="6" :lg="6">
          <div class="card my-8">
            <div class="card-body">
              <div class="card-wrapper flex justify-between">
                <div class="title">
                  <h4>Month Income</h4>
                </div>
                <div
                  class="chart-buttons bg-gray-100 p-1 flex justify-between items-center gap-2 mb-8"
                >
                  <div class="button-box">
                    <label
                      for="income-monthly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: incomeSelected === 'option1' }"
                      >Monthly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option1"
                      v-model="incomeSelected"
                      id="income-monthly"
                    />
                  </div>
                  <div class="button-box">
                    <label
                      for="income-weekly"
                      class="p-1 text-sm px-4 block cursor-pointer"
                      :class="{ active: incomeSelected === 'option2' }"
                      >Weekly</label
                    >
                    <input
                      type="radio"
                      name="chart-button"
                      class="hidden"
                      value="option2"
                      v-model="incomeSelected"
                      id="income-weekly"
                    />
                  </div>
                </div>
              </div>
              <div class="chart-content">
                <Chart type="bar" title="Monthly Income" :data="chartData" />
              </div>
            </div>
          </div>
        </column>
      </row>
    </div>

    <!-- USERS CHART -->
    <div class="my-5">
      <row :gutter="12">
        <column :xs="12" :md="12" :lg="6">
          <div class="card">
            <div class="card-body">
              <h1>ORGANIZATION LIST</h1>
            </div>
          </div>
        </column>
        <column :xs="12" :md="12" :lg="6">
          <div class="card">
            <div class="card-body">
              <div class="title">
                <h2>Users chart</h2>
              </div>

              <div class="chart-content">
                <DoughNutChart />
              </div>
            </div>
          </div>
        </column>
      </row>
    </div>
  </DashboardWrapper>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Chart from "../Chart.vue";
import DoughNutChart from "../DoughNutChart.vue";
import DashboardCardData from "./DashboardCardData.vue";
import DashboardCardDataShimmer from "../../components/shimmers/DashboardCardShimmer.vue";
import Input from "../../components/inputs/Input.vue";
import Table from "../../components/table/Table.vue";
import DashboardWrapper from "../../components/DashboardWrapper.vue";
const incomeSelected = ref("option1");
const expenditureSelected = ref("option1");
const email = ref("");

const headers = ref([
  { text: "PLAYER", value: "player" },
  { text: "TEAM", value: "team" },
  { text: "NUMBER", value: "number" },
  { text: "POSITION", value: "position" },
  { text: "HEIGHT", value: "indicator.height" },
  { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
  { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
  { text: "COUNTRY", value: "country" },
  { text: "TOWN", value: "town" },
  { text: "STATE", value: "state" },
  { text: "ZIPCODE", value: "zipcode" },
  { text: "CITY", value: "city" },
]);
const chartData = reactive({
  "Monthly Expenditure": [
    30, 40, 445, 50, 4956, 6090, 70, 9021, 9967, 70, 90, 67,
  ],
  "Monthly Income": [
    30, 40, -445, 550, 4956, 6090, 6770, 9021, 9967, 707, 590, 677,
  ],
});
</script>
<style scoped>
.active {
  border-radius: 4px;
  color: #fff;
  background: rgb(31, 41, 55);
  transition: background-color 0.3s ease-in-out;
}
@media (max-width: 768px) {
  .card-wrapper {
    display: block;
  }
  .chart-buttons {
    margin: 1rem 0;
  }
}
</style>
