<script setup lang="ts">
import { useColorScheme } from '@/stores/color-schema';

import AuthLayout from './layouts/auth/AuthLayout.vue';
import LoginView from './views/auth/login/LoginView.vue';

;(() => {
  const applicationColorSchema = useColorScheme();

  const action = applicationColorSchema.userColorSchemaPreference
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
