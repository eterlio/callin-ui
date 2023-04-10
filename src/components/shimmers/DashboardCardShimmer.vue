<template>
  <row :gutter="12">
    <column
      :xs="12"
      :md="6"
      :lg="3"
      v-for="data of shimmerCount"
      :key="Math.random()"
    >
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="title shine"></div>
            <div class="icon shine"></div>
          </div>
          <div class="flex gap-4 items-end">
            <div class="amount shine"></div>
            <div class="percentage shine"></div>
          </div>
        </div>
      </div>
    </column>
  </row>
</template>
<script lang="ts" setup>
const shimmerCount = [1, 2, 3, 4];
</script>

<style scoped>
.parent{
    padding: .4rem;
}
.title {
  width: 80%;
  padding: 0.5rem;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.amount {
  width: 40px;
  height: 40px;
}
.percentage {
  width: 20px;
  height: 20px;
}

.shine {
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}
@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
