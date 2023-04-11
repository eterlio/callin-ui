<template>
  <div class="card">
    <div class="card-body">
      <!-- TODO - Work on the drag and drop of column and add it functionality -->
      <div class="columns-container">
        <div class="columns">
          <div class="columns-wrapper" v-for="header in tableHeaders">
            <div class="column-check">
              <input type="checkbox" name="column-check" id="" :value="header.text" checked />
            </div>
            <div class="column-name">
              <p>{{ header.text.toLowerCase() }}</p>
            </div>
            <div class="drag-icon">
              <img src="/drag.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EasyDataTable
      :headers="tableHeaders"
      :items="items"
      table-class-name="customize-table"
      v-model:items-selected="itemsSelected"
      theme-color="#07264d"
      buttons-pagination
      no-hover
      @click-row="showRow"
      :loading="loading"
    >
      <!-- LOADER SLOT -->
      <template #loading>
        <TableLoader />
      </template>

      <!-- EMPTY DATA SLOT -->
      <template #empty-message>
        <div class="no-data__container">
          <img src="/no_data.svg" alt="" />
          <h2>No data found</h2>
        </div>
      </template>

      <!-- EXPANDED SLOT -->
      <template #expand="item" v-if="expandable">
        <slot name="expanded"></slot>
      </template>

      <!-- PREVIOUS AND NEXT BUTTONS SLOT -->
      <template
        #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }"
        v-if="items.length > 25"
      >
        <button :disabled="isFirstPage" @click="prevPage">prev page</button>
        <button :disabled="isLastPage" @click="nextPage">next page</button>
      </template>
    </EasyDataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import type { ClickRowArgument, Header, Item } from "vue3-easy-data-table";
import TableLoader from "./TableLoader.vue";
import "../../style/table.css";
interface ITableProps {
  headers: Header[];
  items?: Item[];
  expandable?: boolean;
  loading?: boolean;
}
const props = defineProps<ITableProps>();
const emits = defineEmits(["clickedRow", "selectedRows"]);

// TABLE HEADERS
const tableHeaders = props.headers.map(
  (head: Header, index: number, data: Header[]) => {
    if (data.length > 8) {
      data[0].fixed = true;
      data[1].fixed = true;
      data[3].fixed = true;
    }
    return { ...head, sortable: true };
  }
);

// REFS
const itemsSelected = ref<Item[]>([]);
const items = ref<Item[]>([
  {
    player: "Stephen Curry",
    team: "GSW",
    number: 30,
    position: "G",
    indicator: { height: "6-2", weight: 185 },
    lastAttended: "Davidson",
    country: "USA",
  },
  {
    player: "Stephen Curry",
    team: "GSW",
    number: 30,
    position: "G",
    indicator: { height: "6-2", weight: 185 },
    lastAttended: "Davidson",
    country: "USA",
  },
]);

watchEffect(() => {
  if (itemsSelected.value.length) {
    emits("selectedRows", itemsSelected.value);
    return;
  }
});
const showRow = (item: ClickRowArgument) => {
  emits("clickedRow", item);
};
</script>
<style>
.customize-table {
  --easy-table-border: none;
  --easy-table-row-border: none;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #07264d;
  --easy-table-header-background-color: #f9fbfc;
  --easy-table-header-item-padding: 8px 14px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #13171c;
  --easy-table-body-row-background-color: #fff; /**Change to transparent later */
  --easy-table-body-row-height: 40px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: none;
  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #fff; /**Change to transparent later */
  --easy-table-footer-font-color: #13171c;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: transparent;
  --easy-table-scrollbar-color: transparent;
  --easy-table-scrollbar-thumb-color: transparent;
  --easy-table-scrollbar-corner-color: transparent;

  --easy-table-loading-mask-background-color: transparent;
}
.no-data__container {
  width: 200px;
  margin: 0 auto;
}
.no-data__container img {
  width: 100%;
}
</style>
