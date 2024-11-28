<script lang="ts">
import type { Ref } from 'vue';

import type { IInputRef } from './InputBase.vue';

const inputInjectionKey: symbol = Symbol('key:input-root');

interface IInputRootInjection {
  handleInputChanges(inputInfos: Ref<IInputRef>): void;
}

interface IRule {
  errorMessage: string;
  validator(value: string): boolean;
}

export type { IInputRootInjection, IRule };
export { inputInjectionKey };
</script>

<script setup lang="ts">
import { provide, ref } from 'vue';


interface IInputRootProps {
  rules: IRule[];
}

const { rules } = defineProps<IInputRootProps>();

const errors = ref<string[]>([]);
function handleInputChanges(inputInfos: Ref<IInputRef>): void {
  errors.value = [];

  if(rules.length === 0) return;

  rules.forEach(rule => {
    const { data } = inputInfos.value;
    if(rule.validator(data!)) errors.value.push(rule.errorMessage);
  });
}

provide(inputInjectionKey, { handleInputChanges });
</script>

<template>
  <fieldset class="c-input__root">
    <slot :errors="errors" />
  </fieldset>
</template>

<style scoped lang="scss">
.c-input__root {
  display: flex;
  flex-direction: column;
  row-gap: .375rem;
}
</style>
