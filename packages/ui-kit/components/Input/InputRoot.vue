<script lang="ts">
interface IInjectionResult {
  handleInput(inputValue: string): void;
  rules?: IRule[];
  handleInputResult: string;
}

interface IRule {
  validationRule(content: string): boolean;
  customErrorMessage: string;
}

const injectionKey: symbol = Symbol('provide:input-root');

export type { IInjectionResult, IRule };
export { injectionKey };
</script>

<script setup lang="ts">
import { provide, ref } from 'vue';

interface IInputRootProps {
  rules?: IRule[];
}

const { rules } = defineProps<IInputRootProps>();

const handleInputResult = ref<string>('');
function handleInput(inputValue: string): void {
  handleInputResult.value = inputValue
}

provide(injectionKey, { handleInput, rules, handleInputResult });
</script>

<template>
  <fieldset class="c-input__root">
    <slot :input-value="handleInputResult" />
  </fieldset>
</template>

<style scoped lang="scss">
.c-input__root {
  display: flex;
  flex-direction: column;
  row-gap: .375rem;
}
</style>
