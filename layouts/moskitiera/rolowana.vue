<script setup>
const props = defineProps({
  item: { type: Object },
  kolory: { type: Array },
});

const zmianaKoloru = (nazwa, doplata, value) => {
  // console.log(value);
  props.item.opcje.kolor = nazwa;
  // kolorProfilu.value = value;
};
</script>
<template>
  <div class="flex flex-col gap-1">
    <ProduktyMoskitieraKolor
      @zmiana-koloru="zmianaKoloru"
      :kolory="kolory"
      :kolor="item.opcje?.kolor"
    />
  </div>
</template>
