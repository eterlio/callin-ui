<template>
<div class="app">
  <div class="nav">
    <RouterLink to="/auth/login">Login</RouterLink>
    <RouterLink to="/auth/register">Register</RouterLink>
  </div>
  <RouterView />
</div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

</script>

