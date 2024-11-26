<script lang="ts">
import type { IInjectionResult } from './InputRoot.vue';
import { injectionKey } from './InputRoot.vue';
</script>

<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';
import { inject } from 'vue';

interface IInputProps {
  type?: InputTypeHTMLAttribute;
}

const { type } = withDefaults(
  defineProps<IInputProps>(),
  {
    type: 'text',
  }
);

const {
  handleInput,
  rules,
  handleInputResult
} = inject<IInjectionResult>(injectionKey)!;
</script>

<template>
  <input
    @keyup="e => handleInput((<HTMLInputElement>e.target).value)"
    :type="type"
    class="c-input__base"
  />
  <template
    v-for="rule in rules"
    :key="rule.validationRule.name"
  >
    <span
      v-if="rule?.validationRule(handleInputResult)"
      class="c-input__base--error-message"
    >
      {{ rule.customErrorMessage }}
    </span>
  </template>
</template>

<style scoped lang="scss">
@use '../../assets/styles/tools/color' as *;

.c-input__base {
  border-radius: 4px;
  border: none;
  background-color: color(gray-100);
  padding: .75rem 1rem;

  &::placeholder {
    color: color(gray-600);
  }
}

.c-input__base--error-message {
  font-size: .75rem;
  color: color(danger);
}
</style>
