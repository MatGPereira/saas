import type { Ref } from 'vue';
import { ref } from 'vue';

import { defineStore } from 'pinia'

export const useColorScheme = defineStore('color-scheme', () => {
  const userColorSchemaPreference: Ref<boolean, boolean> = ref<boolean>(window
    .matchMedia('(prefers-color-scheme: dark)').matches);

  function toggleColorScheme() {
    document.querySelector('html')?.classList.toggle('dark');
  }

  return { toggleColorScheme, userColorSchemaPreference };
})
