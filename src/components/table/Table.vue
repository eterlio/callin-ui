<template>
  <div class="card">
    <div class="card-body" style="padding-bottom: 0px !important">
      <div class="sort-button__container">
        <div class="search-container">
          <Input type="text" v-model="searchValue" />
        </div>
        <div class="sort-button dropdown">
        
            <button
              class="btn"
              @click="enableColumnDropDown = !enableColumnDropDown"
            >
              <Icon type="columns" size="23" />
              <span>Columns</span>
            </button>
            <!-- TODO - Work on the drag and drop of column and add it functionality -->
            <div
              class="columns-container"
              v-if="enableColumnDropDown"
              ref="dropdown"
            >
              <div class="columns">
                <div
                  class="columns-wrapper"
                  v-for="(header, index) in tableHeaders"
                  :draggable="true"
                  @dragstart="dragStartHandler(index)"
                  @dragover.prevent
                  @drop="dropHandler($event, index)"
                  @dragend="dragEndHandler"
                  :key="index"
                >
                  <div class="column-check">
                    <input
                      type="checkbox"
                      name="column-check"
                      :id="header.text"
                      :value="header.text"
                      checked
                      class="hidden"
                      @change="handleElementChange($event, index, header.value)"
                    />
                    <label :for="header.text"></label>
                  </div>
                  <div class="column-name">
                    <p class="font-bold">{{ header.text.toLowerCase() }}</p>
                  </div>
                  <div class="drag-icon">
                    <img src="/drag.svg" />
                  </div>
                </div>
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
      :search-value="searchValue"
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
import { reactive, ref, watchEffect } from "vue";
import type { ClickRowArgument, Header, Item } from "vue3-easy-data-table";
import TableLoader from "./TableLoader.vue";
import "../../style/table.css";
import Icon from "../buttons/Icon.vue";
import Input from "../inputs/Input.vue";
import { onClickOutside } from "@vueuse/core";
interface ITableProps {
  headers: Header[];
  items?: Item[];
  expandable?: boolean;
  loading?: boolean;
}
const props = defineProps<ITableProps>();
const emits = defineEmits(["clickedRow", "selectedRows"]);

// TABLE HEADERS
const tableHeaders = reactive(
  props.headers.map((head: Header, index: number, data: Header[]) => {
    return { ...head, sortable: true };
  })
);

// REFS
const dropdown = ref(null);
const enableColumnDropDown = ref(false);
const itemsSelected = ref<Item[]>([]);
const searchValue = ref("");
const items = ref<Item[]>([
  {
    player: "Stephen Curry",
    team: "GSW",
    number: 30,
    position: "G",
    indicator: { height: "6-2", weight: 185 },
    lastAttended: "Davidson",
    country: "USA",
    town:"brenda",
    city:"Texas",
    state:"Houston",
    zipcode:"56566",
  },
  {
    player: "Lebron James",
    team: "LAL",
    number: 6,
    position: "F",
    indicator: { height: "6-9", weight: 250 },
    lastAttended: "St. Vincent-St. Mary HS (OH)",
    country: "USA",
     town:"brenda",
    city:"Texas",
    state:"Houston",
    zipcode:"56566",
  },
  {
    player: "Kevin Durant",
    team: "BKN",
    number: 7,
    position: "F",
    indicator: { height: "6-10", weight: 240 },
    lastAttended: "Texas-Austin",
    country: "USA",
     town:"brenda",
    city:"Texas",
    state:"Houston",
    zipcode:"56566",
  },
  {
    player: "Giannis Antetokounmpo",
    team: "MIL",
    number: 34,
    position: "F",
    indicator: { height: "6-11", weight: 242 },
    lastAttended: "Filathlitikos",
    country: "Greece",
     town:"brenda",
    city:"Texas",
    state:"Houston",
    zipcode:"56566",
  },
]);

onClickOutside(dropdown, () => (enableColumnDropDown.value = false));
watchEffect(() => {
  if (itemsSelected.value.length) {
    emits("selectedRows", itemsSelected.value);
    return;
  }
});
const showRow = (item: ClickRowArgument) => {
  emits("clickedRow", item);
};

let dragIndex: number | null = null;

const dragStartHandler = (index: number) => {
  dragIndex = index;
};

const dropHandler = (event: Event, targetIndex: number) => {
  const itemToMove = tableHeaders[dragIndex as number];
  tableHeaders.splice(dragIndex as number, 1);
  tableHeaders.splice(targetIndex, 0, itemToMove);
};

const handleElementChange = (
  event: Event,
  index: number,
  headerValue: string
) => {
  const targetElement = event.target as HTMLInputElement;
  const inputLabel = targetElement.nextElementSibling;
  const columnWrapper = (targetElement.parentElement as HTMLElement)
    .parentElement as HTMLElement;
  const pToFade = columnWrapper.querySelector(".column-name p");
  const dragIcon = columnWrapper.querySelector(".drag-icon");

  if (!targetElement.checked) {
    pToFade?.classList.add("fade-text");
    inputLabel?.classList.add("background-fade");
    dragIcon?.classList.add("fade-away");
  } else {
    pToFade?.classList.remove("fade-text");
    inputLabel?.classList.remove("background-fade");
    dragIcon?.classList.remove("fade-away");
  }
};
const dragEndHandler = () => {
  dragIndex = null;
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
</style>
