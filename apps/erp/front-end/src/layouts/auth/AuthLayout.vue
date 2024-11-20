<script setup lang="ts"></script>

<template>
  <div class="l-auth">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.l-auth {
  display: grid;
  padding: 2rem;
  place-items: center;
  height: 100dvh;
}
</style>
