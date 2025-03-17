<script setup>
const { nowaWycena, dodajProdukt, selectProdukt, usunProdukt, updateWycena } =
    wycenyStore();

const { wycena, selectedProdukt, produkty, cenaProduktu } = storeToRefs(
    wycenyStore()
);

const route = useRoute();

const dodajRabat = () => console.log("rabat");

const menu = [
    {
        id: 2,
        name: "Nowa wycena",
        path: "/wyceny/nowa",
        class: "bg-green-400 hover:bg-green-600",
    },
    // { id: 2, name: 'W trakcie' },
    // { id: 3, name: 'Zakończone' },
    // { id: 4, name: 'Anulowane' },
    // { id: 5, name: 'Archiwalne' },
];

const opcje = ref([{ id: 1 }]);

const dodajOpcje = () => {
    const lastArray = opcje.value.slice(-1)[0];
    if (!lastArray) {
        opcje.value.push({ id: 1 });
    } else {
        opcje.value.push({ id: lastArray.id + 1 });
    }
};
</script>
<template>
    <div class="flex justify-between">
        <ul class="flex gap-1 p-1 lg:flex text-md">
            <li v-for="item in menu">
                <WycenyLink
                    :class="`flex items-center gap-1 p-2 text-white duration-300 ${item.class}`"
                    :to="item.path"
                >
                    {{ item.name }}
                </WycenyLink>
            </li>
        </ul>

        <!-- </div> -->
        <div class="relative gap-2">
            <div class="flex gap-1">
                <button
                    @click="dodajOpcje"
                    class="p-1 text-sm text-white bg-blue-400 rounded"
                >
                    Dodaj opcję
                </button>

                <button
                    @click="dodajRabat"
                    class="p-1 text-sm text-white rounded bg-violet-400"
                >
                    Dodaj Rabat
                </button>
            </div>
            <div class="absolute right-0 z-20 mt-1">
                <ul class="flex items-center gap-1">
                    <li v-for="item in opcje" class="gap-1 w-14">
                        <button
                            class="flex items-center p-1 text-sm text-white rounded bg-slate-400"
                        >
                            Opcja {{ item.id }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
