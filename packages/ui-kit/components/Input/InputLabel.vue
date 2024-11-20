<script setup lang="ts">
interface ILabelProps {
  for?: string;
  form?: string;
}

const labelProps = defineProps<ILabelProps>();
</script>

<template>
  <label
    :for="labelProps.for"
    :form="labelProps.form"
  >
    <slot />
  </label>
</template>

<style scoped lang="scss"></style>
