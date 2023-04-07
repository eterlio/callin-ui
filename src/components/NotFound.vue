<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <p>We're sorry, the page you requested could not be found.</p>
   <button @click="$event=>router.back()" class="btn bg-primary">Go back</button>
  </div>
</template>
<script lang="ts" setup>
import {  useRouter } from 'vue-router';
const router = useRouter()
</script>