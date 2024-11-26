<script setup lang="ts">
interface ILabelProps {
  for?: string;
  form?: string;
}

const { for: htmlFor, form } = defineProps<ILabelProps>();
</script>

<template>
  <label
    :for="htmlFor"
    :form="form"
    class="c-input__label"
  >
    <slot />
  </label>
</template>

<style scoped lang="scss">
@use '../../assets/styles/tools/color' as *;

.c-input__label {
  color: color(brand);

  &::after {
    content: '*';
    color: color(danger);
    margin-left: .25rem;
  }
}
</style>
