<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Input from '../../components/inputs/Input.vue';
import FullButton from '../../components/buttons/FullButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth';

const email = ref("")
const password = ref("")
const authStore = useAuthStore()
</script>
<template>
  <main>
    <h1>Welcome</h1>
    <Input  v-model="email" :required="true" :label="`Email`" />
    <Input v-model="password" :required="true" :label="`Password`" :type="`password`" />
    <FullButton :text="'Login'"  />
    {{ email }}
    {{ password }}
  </main>
</template>
