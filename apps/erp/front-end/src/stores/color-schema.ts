import type { ComputedRef } from 'vue';
import { computed } from 'vue';

import { defineStore } from 'pinia'

export const useColorScheme = defineStore('color-scheme', () => {
  const userColorSchemaPreference: ComputedRef<boolean> = computed<boolean>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  function toggleColorScheme() {
    document.querySelector('html')?.classList.toggle('dark');
  }

  return { toggleColorScheme, userColorSchemaPreference };
})
