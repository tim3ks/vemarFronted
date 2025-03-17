<script setup>
const { selectedProdukt, produkty } = storeToRefs(wycenyStore());

// const props = defineProps({
//     material: {
//         type: Function,
//     },
// });

const emit = defineEmits(["send-message"]);

console.log(emit);

const query = ref("");
const results = ref([]);

const dataArray = [
    {
        id: 1,
        grupa: 1,
        name: "LuxPearl",
        colorNumbers: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
        ],
    },
    {
        id: 2,
        grupa: 1,
        name: "DuoPearl",
        colorNumbers: ["201", "202", "203", "204"],
    },
    // Dodaj tutaj inne obiekty, jeśli są
];

const handleSubmit = () => {
    if (query.value.trim() === "") {
        results.value = [];
        return;
    }

    results.value = dataArray.flatMap((item) => {
        const lowerQuery = query.value.toLowerCase();
        const isNameMatch = item.name.toLowerCase().includes(lowerQuery);
        const matchedColors = item.colorNumbers.filter((color) =>
            color.includes(lowerQuery)
        );

        if (isNameMatch) {
            // Jeśli nazwa pasuje, zwraca obiekt z wszystkimi kolorami
            return [{ ...item }];
        } else if (matchedColors.length > 0) {
            // Jeśli pasują tylko kolory, zwraca obiekt tylko z pasującymi kolorami
            return matchedColors.map((color) => ({
                ...item,
                colorNumbers: [color],
            }));
        } else {
            return [];
        }
    });
};

// watch(
//     () => wycena.value,
//     (newData) => {

//     },
//     { deep: true }
// );
</script>

<template>
    <span>Tkanina</span>
    <dodatkowe-opcje-menu>
        <template #nazwa>{{ selectedProdukt.opcje.material }}</template>
        <template #opcje>
            <div class="flex-col gap-2 p-1 divide-y">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Kolor lub tkanina"
                    v-model="query"
                    @input="handleSubmit"
                    class="p-2 pb-1 text-base border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="results" class="results-container">
                    <ul v-if="results.length > 0" class="p-1 pb-3 divide-y">
                        <li v-for="(item, index) in results" :key="index">
                            <button
                                class="w-full p-1 text-left hover:bg-slate-400 hover:text-white"
                                v-for="kolor in item.colorNumbers"
                                @click="emit('send-message', '1234')"
                            >
                                {{ item.name }} - {{ kolor }}
                            </button>
                        </li>
                    </ul>
                    <p v-else>Brak wyników.</p>
                </div>
            </div>
        </template>
    </dodatkowe-opcje-menu>
</template>

<style>
.results-container {
    max-height: 300px; /* Możesz dostosować tę wartość w zależności od potrzeb */
    overflow-y: auto;
    margin-top: 5px;
    /* padding: 10px; */
}

/* Niestandardowy styl scrollbar dla WebKit */
.results-container::-webkit-scrollbar {
    width: 5px; /* Szerokość scrollbar */
}

.results-container::-webkit-scrollbar-track {
    background: #f1f1f1; /* Kolor tła track scrollbar */
}

.results-container::-webkit-scrollbar-thumb {
    background: #888; /* Kolor scrollbar */
    border-radius: 5px;
}

.results-container::-webkit-scrollbar-thumb:hover {
    background: #555; /* Kolor scrollbar na hover */
}
</style>
