<template>
  <div class="nav-link">
    <RouterLink :to="to" class="link" active-class="active">
      <div class="link-icon" v-if="hasIcon">
        <span><vue-feather :type="iconType"></vue-feather></span>
      </div>
      <div class="link-content">
        <div class="text">{{name}}</div>
      </div>
    </RouterLink>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hasIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
  iconType: String,
});
</script>
