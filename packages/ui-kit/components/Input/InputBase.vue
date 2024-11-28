<script lang="ts">
import type { IInputRootInjection } from './InputRoot.vue';
import { inputInjectionKey } from './InputRoot.vue';

interface IInputRef {
  data?: string;
  touched: boolean;
  dirty: boolean;
}

export type { IInputRef };
</script>

<script setup lang="ts">
import { inject, ref } from 'vue';

const input = ref({
  data: undefined,
  touched: false,
  dirty: false,
});

function handleKeyUpEvent() {
  input.value.dirty = true
  handleInputChanges(input);
}

const { handleInputChanges } = inject<IInputRootInjection>(inputInjectionKey)!;
</script>

<template>
  <input
    v-model="input.data"
    @keyup="handleKeyUpEvent"
    @blur="input.touched = true"
    class="c-input__base"
  />
</template>

<style scoped lang="scss">
@use '../../assets/styles/tools/color' as *;

.c-input__base {
  color: color(gray-950);
  border-radius: 4px;
  border: none;
  background-color: color(gray-100);
  padding: .75rem 1rem;

  &::placeholder {
    color: color(gray-600);
  }

  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: 1px solid color(brand);
  }
}
</style>
