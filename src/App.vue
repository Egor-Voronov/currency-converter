<script setup lang="ts">
import Converter from "@/components/Converter.vue";
import './index.scss'
</script>

<template>
  <div class="container">
      <Converter />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
