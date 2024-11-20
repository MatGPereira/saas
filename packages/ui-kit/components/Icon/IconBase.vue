<script setup lang="ts">
interface IIconProps {
  src: string;
  size?: number;
}

const iconProps = defineProps<IIconProps>();
const sizeStyle: Record<string, string> = {
  width: `${iconProps.size || 24}px`,
  height: `${iconProps.size || 24}px`
};
</script>

<template>
  <img
    :src="iconProps.src"
    :style="sizeStyle"
    alt=""
    aria-hidden="true"
  />
</template>

<style scoped lang="scss"></style>
