<script setup>
const { selectedProdukt } = storeToRefs(wycenyStore());
const { opcja } = wycenyStore();
import zawiasA from "@/assets/images/zawiasA.png";
import zawiasB from "@/assets/images/zawiasB.png";

const props = defineProps({
    item: { type: Object },
    kolory: { type: Array },
});

const typ = "drzwiowa";

// const zmianaKoloru = (id, doplata) => {
//   props.item.opcje.kolor = id;
//   doplata
//     ? (props.item.opcje.doplata = doplata)
//     : delete props.item.opcje.doplata;

//   // console.log('zmiana koloru', id, doplata)
// };

const typyZawiasow = [
    { id: 1, nazwa: "Zawias A", img: zawiasA },
    { id: 2, nazwa: "Zawias B", img: zawiasB },
];

onMounted(() => {
    props.item.rodzaj === typ ? null : (selectedProdukt.value.opcje = {});
});

const sterowanie = (zawias) => {
    props.item.opcje.zawias = zawias;
};

const typZawiasu = (typ) => {
    props.item.opcje.typZawiasu = typ;
};

const kratka = () => (props.item.opcje.kratka = !props.item.opcje.kratka);
</script>

<template>
    <div class="flex flex-col gap-1">
        <ProduktyMoskitieraKolor
            emit="kolor"
            @kolor="opcja"
            :kolory="kolory"
            :kolor="selectedProdukt.opcje.kolor"
        />
        <div class="grid grid-cols-2">
            <div>
                <ProduktyMoskitieraZawiasy
                    @zmiana-zawiasu="sterowanie"
                    :zawias="item.opcje.zawias"
                />
                <CheckBox
                    @kratka-zwierzeta="opcja"
                    :item="item.opcje.kratkaZwierzeta"
                    emit="kratkaZwierzeta"
                    class="p-1 text-sm"
                >
                    Kratka dla zwierząt
                </CheckBox>
            </div>
            <div class="flex gap-2">
                <TypZawiasu
                    :zawiasy="typyZawiasow"
                    :item="item.opcje.typZawiasu"
                    @typ-zawiasu="typZawiasu"
                />
            </div>
        </div>
    </div>
</template>
