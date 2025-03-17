<script setup>
const { opcja } = wycenyStore();

const props = defineProps({
  item: { type: Object },
  kolory: { type: Array },
});

const zmianaKoloru = (id, doplata) => {
  props.item.opcje.kolor = id;
  doplata
    ? (props.item.opcje.doplata = doplata)
    : delete props.item.opcje.doplata;

  // console.log('zmiana koloru', id, doplata)
};
</script>
<template>
  <div class="flex flex-col gap-1">
    <ProduktyMoskitieraKolor
      emit="kolor"
      @kolor="opcja"
      :kolory="kolory"
      :kolor="item.opcje.kolor"
    />
  </div>
</template>
