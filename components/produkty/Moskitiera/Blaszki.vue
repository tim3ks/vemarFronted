<script setup>
const props = defineProps({
  blaszka: String,
  emit: String,
});

const blaszki = [
  { id: 1, name: "0mm" },
  { id: 2, name: "3mm" },
  { id: 3, name: "5mm" },
  { id: 4, name: "7mm" },
  { id: 5, name: "9mm" },
  { id: 6, name: "12mm" },
  { id: 7, name: "15mm" },
  { id: 8, name: "18mm" },
  { id: 9, name: "20mm" },
  { id: 10, name: "25mm" },
  { id: 11, name: "Bez blaszek" },
];
</script>

<template>
  <div>
    <span class="underline">Mocowanie</span>
    <div class="flex flex-wrap gap-2 p-2">
      <span
        :class="[blaszka === item.name ? 'ring-4' : null]"
        class="p-1 text-sm duration-300 cursor-pointer ring-1"
        @click="$emit(emit, emit, { blaszka: item.name })"
        v-for="item in blaszki"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>