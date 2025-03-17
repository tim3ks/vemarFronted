<script setup>
import { storeToRefs } from "pinia";
import { useLocalStorage } from "~/composables/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

const {
    planModal,
    modal,
    wycena,
    selectedProdukt,
    produkty,
    cenaProduktu,
    cenaProwadnicy,
    confirmModal,
    itemDelete,
    loader,
} = storeToRefs(wycenyStore());
const {
    dodajProdukt,
    selectProdukt,
    usunProdukt,
    updateWycena,
    changePietro,
    duplikuj,
    dodajJeden,
    odejmijJeden,
    opcja,
} = wycenyStore();

// const modal = ref(false);

const openModal = () => {
    modal.value = true;
};

const wymianaMaterialu = () => {
    if (selectedProdukt.value && selectedProdukt.value.opcje) {
        selectedProdukt.value.opcje.wymianaMaterialu =
            !selectedProdukt.value.opcje.wymianaMaterialu;
    }
};

const minSzer = computed(
    () =>
        produkty.value?.[selectedProdukt.value?.produkt]?.[
            selectedProdukt.value?.rodzaj
        ]?.minSzer
);

// const currentProdukt = computed(() => {
//   const produkt = selectedProdukt.value?.produkt;
//   const rodzaj = selectedProdukt.value?.rodzaj;
//   return produkty.value?.[produkt]?.[rodzaj] || {};
// });

// @click="usunProdukt(index, produkt.id)"
const openConfirm = (index, id) => {
    confirmModal.value = true;
    itemDelete.value = { index, id };
};

const handleConfirm = () => {
    usunProdukt(itemDelete.value.index, itemDelete.value.id);
    confirmModal.value = false;
    // logika usuwania elementu
    console.log("Element został usunięty");
    itemDelete.value = null;
};

const handleCancel = () => {
    confirmModal.value = false;
    console.log("Usunięcie anulowane");
};

const checkDim = (value) => {
    // console.log(value);
    // const minSzer =
    //   produkty[selectedProdukt.value.produkt][selectedProdukt.value.rodzaj]
    //     ?.minSzerokosc;
    // Add logic to validate the value against minSzer
};

const randomUUID = uuidv4();

const closeModal = () => {
    modal.value = false;
};

onUnmounted(() => (selectedProdukt.value = {}));

const wycenaStorageData = useLocalStorage("wycena", {
    id: randomUUID,
    produkty: [],
});

onMounted(() => {
    loader.value = true;
    setTimeout(() => {
        // Synchronize Pinia Store with LocalStorage
        updateWycena(wycenaStorageData.value);
        loader.value = false;
    }, 800);
});

const router = useRouter();
// Watcher to synchronize changes in Pinia Store with LocalStorage
// watch(
//     () => wycena.value,
//     (newData) => {
//         const currentRoute = router.currentRoute.value;
//         loader.value = true;
//         setTimeout(() => {
//             // wycenaStorageData.value = newData;
//             loader.value = false;
//         }, 1000);
//     },
//     { deep: true }
// );

watch(
    () => selectedProdukt.value.ilosc,
    (newRodzaj, oldRodzaj) => {
        console.log("ilosc");

        if (newRodzaj === 1)
            selectedProdukt.value.opcje.sterowanie = { lewe: 1, prawe: 0 };
    },
    { deep: true }
);

const resetWymiary = () => {
    if (selectedProdukt.value) {
        selectedProdukt.value.szerokosc = null;
        selectedProdukt.value.wysokosc = null;
    }
};
</script>
<template>
    <div>
        <div :class="{ blur: modal }">
            <div
                class="grid grid-cols-1 gap-5 pb-5 mt-8 md:grid-cols-2 lg:grid-cols-3 font-['Nunito']"
            >
                <div class="flex flex-col gap-7">
                    <Card class="cardStyle">
                        <template class="cardStyleTitle" #title
                            >Dodaj produkt</template
                        >
                        <template #cardContent>
                            <AddProduktMenu
                                class="mt-2"
                                @dodaj-produkt="dodajProdukt"
                            />
                        </template>
                    </Card>
                    <Card class="cardStyle" v-if="wycena.produkty.length">
                        <template class="cardStyleTitle" #title
                            >Produkty dodane - wybierz i edytuj!</template
                        >
                        <template #cardContent>
                            <div>
                                <ul>
                                    <li
                                        v-for="(
                                            produkt, index
                                        ) in wycena.produkty"
                                        :key="produkt.id"
                                        class="flex gap-1 p-1"
                                    >
                                        <ProduktyProdukt
                                            class="flex items-center flex-grow rounded-l cursor-pointer ring-1 hover:opacity-80"
                                            :class="[
                                                selectedProdukt.id ===
                                                produkt.id
                                                    ? 'ring-1 ring-blue-300 bg-blue-200'
                                                    : null,
                                            ]"
                                            :pozycja="produkt"
                                            :cena="cenaProduktu(index) * 1.23"
                                            @click="selectProdukt(produkt)"
                                        >
                                        </ProduktyProdukt>
                                        <button
                                            class="px-2 text-sm text-white duration-300 bg-blue-500 ring-1 drop-shadow-md hover:bg-blue-400"
                                            @click="duplikuj(produkt.id)"
                                        >
                                            Kopiuj
                                        </button>
                                        <button
                                            v-if="produkt.ilosc !== 1"
                                            class="px-2 text-sm text-white duration-300 bg-red-400 ring-1 drop-shadow-md hover:text-slate-200"
                                            @click="odejmijJeden(produkt.id)"
                                        >
                                            -1
                                        </button>
                                        <button
                                            class="px-2 text-sm text-white duration-300 bg-green-500 ring-1 drop-shadow-md hover:bg-green-400"
                                            @click="dodajJeden(produkt.id)"
                                        >
                                            +1
                                        </button>
                                        <button
                                            class="px-2 text-sm text-red-500 rounded-r ring-1 bg-slate-200 drop-shadow-md group hover:bg-red-500"
                                            @click="
                                                openConfirm(index, produkt.id)
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6 duration-300 group-hover:text-white"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M6 18 18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </Card>
                    <!-- <span class="cardStyleTitle"
                        >Produkty dodane - wybierz i edytuj!</span
                    > -->
                    <!-- </div> -->
                </div>
                <transition name="fade">
                    <div
                        v-if="selectedProdukt.produkt && wycena.produkty.length"
                        class="flex flex-col gap-10"
                    >
                        <NuxtLayout
                            v-if="selectedProdukt.produkt"
                            :name="selectedProdukt.produkt.toLowerCase()"
                        />
                        <div
                            v-if="selectedProdukt.rodzaj"
                            class="relative flex-wrap justify-center gap-2 p-3 pb-6 bg-white pt-9 drop-shadow-md ring-1 ring-slate-300"
                            :class="{
                                '!ring-red-500':
                                    !selectedProdukt.szerokosc ||
                                    !selectedProdukt.wysokosc,
                            }"
                        >
                            <div class="cardStyleTitle">
                                <span>Wymiary</span>

                                <div class="relative">
                                    Min:
                                    <span class="absolute right-0.5 top-3"
                                        >&#8596;</span
                                    >{{ minSzer }}
                                </div>
                                <div class="relative">
                                    Max:
                                    <span class="absolute right-1.5 top-3"
                                        >&#8596;</span
                                    >{{
                                        produkty[selectedProdukt.produkt][
                                            selectedProdukt.rodzaj
                                        ]?.maxSzer
                                    }}
                                </div>
                                <div class="relative">
                                    Max:
                                    {{
                                        produkty[selectedProdukt.produkt][
                                            selectedProdukt.rodzaj
                                        ]?.maxWys
                                    }}
                                    <span>&#8597;</span>
                                </div>
                                <CheckBox
                                    v-if="
                                        selectedProdukt.wysokosc &&
                                        selectedProdukt.szerokosc
                                    "
                                    @wymiana-materialu="opcja"
                                    :item="
                                        selectedProdukt.opcje.wymianaMaterialu
                                    "
                                    emit="wymianaMaterialu"
                                    class="text-sm"
                                >
                                    Wymiana materiału
                                </CheckBox>
                            </div>
                            <span
                                class="absolute top-[1.1px] right-[1.1px] px-2 py-0.5 text-base cursor-pointer text-white hover:bg-red-400 bg-red-500 ring-1"
                                @click="resetWymiary"
                                >reset</span
                            >

                            <div
                                v-if="selectedProdukt.rodzaj"
                                class="flex flex-wrap gap-3"
                            >
                                <div class="relative w-full md:w-1/2 lg:w-1/4">
                                    <input
                                        id="szerokosc"
                                        v-model="selectedProdukt.szerokosc"
                                        type="number"
                                        class="block px-2.5 pb-2 pt-4 w-full ring-1 text-base font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-red-600 bg-white border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:duration-300 focus:border-blue-600 peer"
                                        placeholder=" "
                                        @blur="
                                            checkDim(selectedProdukt.szerokosc)
                                        "
                                    />
                                    <label
                                        for="szerokosc"
                                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >Szerokość cm
                                    </label>
                                </div>
                                <div class="relative w-full md:w-1/2 lg:w-1/4">
                                    <input
                                        id="szerokoscMaterialu"
                                        v-model="
                                            selectedProdukt.szerokoscMaterialu
                                        "
                                        type="number"
                                        class="block text-blue-600 px-2.5 pb-2 pt-4 w-full ring-1 text-base font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:duration-300 focus:border-blue-600 peer"
                                        placeholder=" "
                                        @blur="
                                            checkDim(
                                                selectedProdukt.szerokoscMaterialu
                                            )
                                        "
                                    />
                                    <label
                                        for="szerokoscMaterialu"
                                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >Szerokość mat.
                                    </label>
                                </div>

                                <div class="relative w-full md:w-1/2 lg:w-1/4">
                                    <input
                                        id="wysokosc"
                                        v-model="selectedProdukt.wysokosc"
                                        type="number"
                                        placeholder=" "
                                        class="block px-2.5 pb-2 pt-4 w-full ring-1 text-base font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-900 bg-white border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:duration-300 focus:border-blue-600 peer"
                                    />
                                    <label
                                        for="wysokosc"
                                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >Wysokość cm</label
                                    >
                                </div>

                                <div
                                    v-if="
                                        selectedProdukt.rodzaj === 'przesuwna'
                                    "
                                    class="relative w-full md:w-1/2 lg:w-1/4"
                                >
                                    <input
                                        id="prowadnicaD"
                                        v-model="
                                            selectedProdukt.prowadnicaDolna
                                        "
                                        type="number"
                                        class="block px-2.5 pb-2 pt-4 w-full ring-1 text-base font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-900 bg-white border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:duration-300 focus:border-blue-600 peer"
                                        placeholder=" "
                                        @blur="
                                            cenaProwadnicy(
                                                selectedProdukt.prowadnicaDolna,
                                                selectedProdukt.prowadnicaGorna
                                            )
                                        "
                                    />
                                    <label
                                        for="prowadnicaD"
                                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >Prow. D. cm
                                    </label>
                                </div>

                                <div
                                    v-if="
                                        selectedProdukt.rodzaj === 'przesuwna'
                                    "
                                    class="relative w-full md:w-1/2 lg:w-1/4"
                                >
                                    <input
                                        id="prowadnicaG"
                                        v-model="
                                            selectedProdukt.prowadnicaGorna
                                        "
                                        type="number"
                                        class="block px-2.5 pb-2 pt-4 w-full ring-1 text-base font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-900 bg-white border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:duration-300 focus:border-blue-600 peer"
                                        placeholder=" "
                                        @blur="
                                            cenaProwadnicy(
                                                selectedProdukt.prowadnicaDolna,
                                                selectedProdukt.prowadnicaGorna
                                            )
                                        "
                                    />
                                    <label
                                        for="prowadnicaG"
                                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >Prow. G. cm
                                    </label>
                                </div>

                                <div
                                    class="relative flex items-center rounded-sm md:w-1/2 lg:w-1/6 ring-1"
                                >
                                    <button
                                        :class="{
                                            'cursor-not-allowed disabled':
                                                selectedProdukt.ilosc === 1,
                                        }"
                                        @click="
                                            selectedProdukt.ilosc = Math.max(
                                                1,
                                                selectedProdukt.ilosc - 1
                                            )
                                        "
                                        class="h-full px-4 py-1 font-bold rounded-l text-slate-700 focus:outline-none"
                                    >
                                        -
                                    </button>
                                    <div class="relative flex-shrink">
                                        <input
                                            id="ilosc"
                                            v-model="selectedProdukt.ilosc"
                                            type="number"
                                            class="items-center block pb-2.5 pt-3.5 w-full h-full text-base font-semibold text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-900 bg-white focus:outline-none peer"
                                            :class="{
                                                'cursor-not-allowed disabled':
                                                    selectedProdukt.ilosc === 1,
                                            }"
                                        />
                                    </div>
                                    <button
                                        @click="selectedProdukt.ilosc += 1"
                                        class="h-full px-4 py-1 font-bold rounded-r text-slate-700 focus:outline-none"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            v-if="selectedProdukt.rodzaj"
                            class="relative flex-wrap justify-center gap-2 p-2 pt-5 pb-5 bg-white drop-shadow-md ring-1 ring-slate-300"
                            :class="{
                                '!ring-red-500': !selectedProdukt.pomieszczenie,
                            }"
                        >
                            <div class="cardStyleTitle">Pomieszczenie</div>
                            <Pomieszczenie
                                :selected-produkt="selectedProdukt"
                                @pomieszczenie="changePietro"
                            />
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div
                        v-if="selectedProdukt.rodzaj && wycena.produkty.length"
                        class="flex flex-col gap-6"
                    >
                        <div
                            class="relative flex flex-wrap gap-2 p-2 pt-5 pb-5 bg-white shadow-md ring-1 ring-slate-300"
                        >
                            <span
                                class="absolute top-[-13px] text-slate-600 bg-white flex font-semibold"
                                >Opcje</span
                            >
                            <NuxtLayout
                                v-if="
                                    selectedProdukt.produkt &&
                                    selectedProdukt.rodzaj
                                "
                                :name="`${selectedProdukt.produkt.toLowerCase()}-${
                                    selectedProdukt.rodzaj
                                }`"
                                :item="selectedProdukt"
                                :kolory="
                                    produkty[selectedProdukt.produkt][
                                        selectedProdukt.rodzaj
                                    ].kolory
                                "
                            />
                        </div>
                    </div>
                </transition>
            </div>
            <div
                v-if="wycena.produkty.length > 0"
                class="relative flex flex-wrap gap-2 p-2 pt-5 pb-5 text-xl bg-white shadow-md ring-1 ring-slate-300"
            >
                <div
                    class="absolute top-[-16px] text-slate-600 bg-white flex font-semibold"
                >
                    Podsumowanie i dane
                </div>
                <Podsumowanie class="w-full" />
            </div>
            <div
                v-if="wycena.produkty.length > 0"
                class="flex justify-end mt-4"
            >
                <button
                    class="px-4 py-2 text-white duration-300 bg-green-500 rounded hover:bg-green-700"
                    @click="openModal"
                >
                    Wyślij i zapisz Ofertę
                </button>
            </div>
        </div>
        <Modal :isOpen="modal" @close="closeModal" />

        <ConfirmModal
            :show="confirmModal"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        >
            <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    >
                        <svg
                            class="w-6 h-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                            id="modal-title"
                            class="text-lg font-medium leading-6 text-gray-900"
                        >
                            Potwierdzenie usunięcia pozycji id:
                            {{ itemDelete.id }}
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Czy na pewno chcesz usunąć ten element? Tej
                                operacji nie można cofnąć.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ConfirmModal>
    </div>
</template>

<style scoped>
.blur {
    filter: blur(5px); /* Adjust the blur intensity as needed */
}

.text-shadow {
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}
</style>
