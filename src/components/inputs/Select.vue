<template>
  <div class="select-wrapper">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search..."
      @click="toggleDropdown"
    />

    <div class="dropdown" v-if="showDropdown" ref="dropdownRef">
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        class="dropdown-option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>

    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption ? selectedOption.label : "Select an option" }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const options = ref([
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  // Add more options here
]);

const searchTerm = ref("");
const selectedOption = ref(null);
const showDropdown = ref(false);

const filteredOptions = computed(() => {
  return options.value.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  showDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  const dropdownElement = $refs.dropdownRef;

  if (dropdownElement && !dropdownElement.contains(event.target)) {
    showDropdown.value = false;
  }
};
</script>

<style scoped>
.select-wrapper {
  position: relative;
  width: 200px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-option {
  padding: 8px;
  cursor: pointer;
}

.selected-option {
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
</style>
