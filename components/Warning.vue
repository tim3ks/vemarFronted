<script setup>
defineProps({
  warning: {
    type: String,
    default: "Warning",
  },
});
</script>

<template>
  <span class="text-red-500">{{ warning }}</span>
</template>