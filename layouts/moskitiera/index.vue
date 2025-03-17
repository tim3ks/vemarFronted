<script setup>
const { wycena, selectedProdukt, produkty, noweProdukty } = storeToRefs(
    wycenyStore()
);
const {
    nowaWycena,
    dodajProdukt,
    selectProdukt,
    cenaM,
    updateProduct,
    produkt,
} = wycenyStore();

const { rodzaje } = noweProdukty.value.find(
    (produkt) => produkt.produkt.toLowerCase() === selectedProdukt.value.produkt
);

const currentProdukt = computed(() => {
    const produkt = selectedProdukt.value?.produkt;
    const rodzaj = selectedProdukt.value?.rodzaj;
    return produkty.value?.[produkt]?.[rodzaj] || {};
});

watch(
    () => selectedProdukt.value,
    (newRodzaj, oldRodzaj) => {
        var index = wycena.value.produkty.findIndex(
            (produkt) => produkt.id === selectedProdukt.value.id
        );
        const { produkt, rodzaj } = wycena.value.produkty[index];

        if (produkt && rodzaj) cenaM(index);
    },
    { deep: true }
);

// const opcjeProduktow = [
//     {rodzaj: 'okienna', opcje: {''}}
// ]

// watchEffect(() => {
//   if (!wycena.value.produkty.length) return;

// if (produkt && rodzaj)
//   cenaMontazu =
//     produkty.value[selectedProdukt.value.produkt][selectedProdukt.value.rodzaj]
//       .cenaMontazu;

//   const length = Object.keys(selectedProdukt.value.opcje).length;
//   const keys = Object.keys(selectedProdukt.value.opcje);

//   // console.log(keys);

//   if (selectedProdukt.value.rodzaj) {
//     // selectedProdukt.value.opcje = produkty.value[produkt][rodzaj].opcje;

//     const selectedKeys = Object.keys(selectedProdukt.value.opcje);
//     const produktKeys = Object.keys(produkty.value[produkt][rodzaj].opcje);

//     // console.log(selectedKeys, produktKeys);
//   }
// });
</script>

<template>
    <div
        class="relative flex flex-wrap gap-3 p-3 pt-5 pb-5 bg-white shadow-md ring-1 ring-slate-300"
        :class="{ '!ring-red-500': !selectedProdukt.rodzaj }"
    >
        <span
            class="absolute top-[-13px] text-slate-600 bg-white font-semibold"
        >
            Rodzaj Moskitiery
        </span>

        <span
            v-if="currentProdukt.oznaczenie"
            class="absolute py-0.5 px-1 bg-white right-2 ring-1 -top-5 shadow-md"
        >
            {{ currentProdukt.oznaczenie }}
        </span>

        <label
            v-for="item in rodzaje"
            :for="item.name"
            :class="[
                selectedProdukt.rodzaj == item.value
                    ? `ring-4 shadow-md duration-300 ${item.color} text-white`
                    : 'bg-gray-200',
            ]"
            class="relative flex items-center px-2 py-1 text-sm cursor-pointer ring-1"
        >
            <input
                @change="updateProduct"
                type="radio"
                :id="item.name"
                class="hidden"
                :value="item.value"
                v-model="selectedProdukt.rodzaj"
                aria-labelledby="moskitiery-label"
            />
            {{ item.name }}
            <div
                class="absolute -right-5 -bottom-9"
                v-if="item.podopcja && selectedProdukt.rodzaj == item.value"
            >
                <dodatkowe-opcje-menu>
                    <template #nazwa>Pozioma</template>
                    <template #opcje>
                        <div class="flex text-slate-500">
                            <div>Pozioma</div>
                            <div>Pozioma</div>
                            <div>Pozioma</div>
                            <div>Pozioma</div>
                        </div>
                    </template>
                </dodatkowe-opcje-menu>
            </div>
        </label>
    </div>
</template>
