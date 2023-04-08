<template>
  <Wrapper>
    <h1>Some section came here</h1>
    <div class="flex justify-between items-center">
      <IconButton icon="trash" type="faded" size="sm" shape="rounded" />
      <IconButton icon="trash" type="faded-outline" size="md" shape="rounded" />
      <IconButton icon="trash" type="outline" size="lg" shape="rounded" />
      <IconButton icon="trash" type="bg" size="lg" shape="rounded" />
    </div>
    <div>
      <button class="btn bg-primary">Submit</button>
    </div>
    <div>
      <span>search value: </span>
      <input type="text" v-model="searchValue" />
      <EasyDataTable
        :headers="headers"
        :items="items"
        buttons-pagination
        fixed-checkbox
        :loading="loading"
        v-model:items-selected="itemsSelected"
        :search-value="searchValue"
      >
        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px"
          />
        </template>
        <template #empty-message>
          <a href="https://google.com">nothing here</a>
        </template>
        <template #item-player="item">
            <span>{{ item.player }}</span>
        </template>
        <template #item-action>
        <Icon type="trash"/>
       </template>
      </EasyDataTable>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Wrapper from "../../components/Wrapper.vue";
import IconButton from "../../components/buttons/IconButton.vue";
import type { Header, Item } from "vue3-easy-data-table";
import Icon from "../../components/buttons/Icon.vue";
const itemsSelected = ref<Item[]>([]);
const headers: Header[] = [
  { text: "PLAYER", value: "player", fixed: true },
  { text: "TEAM", value: "team" },
  { text: "NUMBER", value: "number" },
  { text: "POSITION", value: "position" },
  { text: "HEIGHT", value: "indicator.height", sortable: true, width: 200 },
  { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
  { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
  { text: "COUNTRY", value: "country" },
  {text:"ACTION", value: "action"},
];
const searchValue = ref("");

const items: Item[] = [
  { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
  { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: {"height": '6-9', "weight": 250}, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA"},
  { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: {"height": '6-10', "weight": 240}, lastAttended: "Texas-Austin", country: "USA"},
  { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: {"height": '6-11', "weight": 242}, lastAttended: "Filathlitikos", country: "Greece"},
];
const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 5000);
</script>
