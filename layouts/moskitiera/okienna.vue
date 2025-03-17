<script setup>
const { selectedProdukt, produkty } = storeToRefs(wycenyStore());
const { kolorProduktu, wymianaMaterialu, opcja } = wycenyStore();

const props = defineProps({
    item: { type: Object },
    kolory: { type: Array },
});

const test = ref(0);

let i;

// onMounted(() => {
//     i = setInterval(() => {
//         test.value++;
//         console.log("Komponent został zamontowany", test.value);
//     }, 1000);
// });

// onUnmounted(() => {
//     clearInterval(i);
// });
</script>

<template>
    <div class="flex flex-col gap-1">
        <div v-if="!props.item.opcje.wymianaMaterialu">
            <ProduktyMoskitieraBlaszki
                :blaszka="selectedProdukt.opcje.blaszka"
                emit="blaszka"
                @blaszka="opcja"
            />
            <ProduktyMoskitieraKolor
                emit="kolor"
                @kolor="opcja"
                :kolory="kolory"
                :kolor="selectedProdukt.opcje.kolor"
            />
            <div class="flex flex-col">
                <div class="flex gap-3">
                    <div v-if="item.opcje.kot">
                        <span class="underline">Uszczelka</span>
                        <div class="rounded-sm">
                            <KotDoProfila :kolor="item.opcje.kolor" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="underline">Uwagi do produktu</span>
                        <textarea
                            v-model="item.opcje.uwagiProduktu"
                            class="w-full h-20 p-2 text-base border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dodaj uwagę!"
                        ></textarea>
                        <dodatkowe-opcje-menu>
                            <template #nazwa>Dodatkowe opcje</template>
                            <template #opcje>
                                <div class="flex-col gap-1 p-1 divide-y">
                                    <CheckBox
                                        @odwrotny-montaz="opcja"
                                        :item="item.opcje.odwrotnyMontaz"
                                        emit="odwrotnyMontaz"
                                        class="p-1 text-sm"
                                    >
                                        Odwrotny montaż
                                    </CheckBox>
                                    <CheckBox
                                        @stalowa-siatka="opcja"
                                        :item="item.opcje.stalowaSiatka"
                                        emit="stalowaSiatka"
                                        class="p-1 text-sm"
                                    >
                                        Stalowa siatka
                                    </CheckBox>
                                    <CheckBox
                                        @utrudniony-montaz="opcja"
                                        :item="item.opcje.utrudnionyMontaz"
                                        emit="utrudnionyMontaz"
                                        class="p-1 text-sm"
                                    >
                                        Trudny montaż
                                    </CheckBox>

                                    <!-- <CheckBox
                    @stalowa-siatka="dodatkoweBlaszki"
                    :item="item.opcje.stalowaSiatka"
                    emit="stalowaSiatka"
                    class="p-1 text-sm"
                  >
                    Stalowa siatka
                  </CheckBox> -->
                                    <!-- <CheckBox
                    @odwrotny-montaz="odwrotnyMontaz"
                    :item="item.opcje.odwrotnyMontaz"
                    emit="odwrotnyMontaz"
                    class="p-1 text-sm"
                  >
                    Stalowa siatka
                  </CheckBox>
                  <CheckBox
                    @odwrotny-montaz="odwrotnyMontaz"
                    :item="item.opcje.odwrotnyMontaz"
                    emit="odwrotnyMontaz"
                    class="p-1 text-sm"
                  >
                    Stalowa siatka
                  </CheckBox> -->
                                </div>
                            </template>
                        </dodatkowe-opcje-menu>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
