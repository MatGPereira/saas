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
