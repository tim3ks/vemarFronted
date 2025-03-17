<script setup>
const { selectedProdukt, produkty, tkaninyRolety } = storeToRefs(wycenyStore());
const { kolorProduktu, wymianaMaterialu, opcja } = wycenyStore();

const props = defineProps({
    item: { type: Object },
    kolory: { type: Array },
});
</script>

<template>
    <div class="flex flex-col gap-3">
        <produkty-moskitiera-kolor
            v-if="!props.item.opcje.wymianaMaterialu"
            emit="kolor"
            @kolor="opcja"
            :kolory="kolory"
            :kolor="selectedProdukt.opcje.kolor"
        />
        <!-- <ProduktyPlisaTkanina /> -->
        <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div class="flex flex-col gap-2">
                <Tkanina :tkaniny="tkaninyRolety" />
                <ProduktyRoletaSterowanie
                    @zmiana-sterowania="opcja"
                    :item="item"
                    :sterowanie="item.opcje.sterowanie"
                />
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
                        <div class="flex-col gap-1 p-1">dodatkowe</div>
                    </template>
                </dodatkowe-opcje-menu>
            </div>
            <div
                class="flex flex-col gap-2"
                v-if="!props.item.opcje.wymianaMaterialu"
            >
                <Plany />
            </div>
        </div>
    </div>
</template>
