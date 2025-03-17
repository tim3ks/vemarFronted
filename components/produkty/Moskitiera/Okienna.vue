<script setup>
const props = defineProps({
  item: { type: Object },
  kolory: { type: Array },
});

const zmianaBlaszki = (id) => {
  props.item.opcje.blaszka = id;
  console.log("zmiana blaszki", id);
};

const zmianaKoloru = (id) => {
  props.item.opcje.kolor = id;
  console.log("zmiana koloru", id);
};

onMounted(() => {
  console.log("okienna");
  props.item.opcje = {
    blaszka: null,
    kolor: "Biały - Ral 9003",
    kot: [],
    odwrotnyMontaz: false,
  };
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- <ProduktyMoskitieraBlaszki :blaszka="item.opcje.blaszka" @zmiana-blaszki="zmianaBlaszki"/>
		<ProduktyMoskitieraKolor @zmiana-koloru="zmianaKoloru" :kolory="kolory" :kolor="item.opcje.kolor"/> -->
  </div>
</template>