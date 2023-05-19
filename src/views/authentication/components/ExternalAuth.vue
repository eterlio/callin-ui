<template>
  <div class="external-auth__container">
    <div class="content shadow-sm">
      <div class="logo">
        <img :src="data[name].logoUrl" alt="" />
      </div>
      <div class="name text-primary font-semibold">{{ capitalize(name) }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { capitalize } from "vue";
type AuthType = "google" | "facebook" | "twitter";

interface AuthTypes {
  name: AuthType;
}
defineProps<AuthTypes>();
interface AuthData {
  [key: string]: {
    logoUrl: string;
  };
}
const data: AuthData = {
  google: {
    logoUrl: "/src/assets/google.svg",
  },
  facebook: {
    logoUrl: "/src/assets/facebook.svg",
  },
};
</script>
