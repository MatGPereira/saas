<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

interface IInputProps {
  type?: InputTypeHTMLAttribute;
}

const inputBaseProps = defineProps<IInputProps>();
</script>

<template>
  <input :type="inputBaseProps.type || 'text'" />
</template>

<style scoped lang="scss">
@use '../../assets/styles/tools/color' as *;

input {
  border-radius: 4px;
  border: none;
  background-color: color(gray-100);
  padding: .75rem 1rem;

  &::placeholder {
    color: color(gray-600);
  }
}
</style>
