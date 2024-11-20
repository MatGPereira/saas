<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useColorScheme } from '@/stores/color-schema';

import AuthLayout from './layouts/auth/AuthLayout.vue';
import LoginView from './views/auth/LoginView.vue';

const applicationColorSchema = useColorScheme();
const { userColorSchemaPreference } = storeToRefs(applicationColorSchema);

;(() => {
  const action = userColorSchemaPreference
    ? applicationColorSchema.toggleColorScheme
    : null;

  action?.();
})();
</script>

<template>
  <AuthLayout>
    <LoginView />
  </AuthLayout>
</template>

<style scoped></style>
