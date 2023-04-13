<template>
  <div>
    <button @click="dropdownOpen = !dropdownOpen">Click me</button>
    <Login :is-open="dropdownOpen" @update:isOpen="(value) => dropdownOpen = value">
      <template #options>
        <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
        </ul>
      </template>
    </Login>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Login from './Login.vue';

const dropdownOpen = ref(false);
</script>
