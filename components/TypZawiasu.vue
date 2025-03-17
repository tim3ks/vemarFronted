<script setup>
defineProps({
  zawiasy: { type: Array },
  item: { type: String },
});
</script>

<template>
  <div class="flex gap-2">
    <div
      v-for="zawias in zawiasy"
      class="p-1 cursor-pointer"
      :class="{ 'ring-4': item == zawias.nazwa }"
      @click="$emit('typZawiasu', zawias.nazwa)"
    >
      <span>{{ zawias.nazwa }}</span>
      <img :src="zawias.img" width="100" height="200" alt="" />
    </div>
  </div>
</template>