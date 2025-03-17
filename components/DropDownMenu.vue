<script setup>
const { selectedProdukt, tkaninyPlisy } = storeToRefs(wycenyStore());
const { material } = wycenyStore();

const searchQuery = ref("");
const isDropdownOpen = ref(false);

const filteredItems = computed(() => {
    const lowerQuery = selectedProdukt.value.opcje.material.toLowerCase();
    // if (selectedProdukt.value.opcje.material)
    return tkaninyPlisy.value.flatMap((item) => {
        const isNameMatch = item.name.toLowerCase().includes(lowerQuery);
        const matchedColors = item.colorNumbers.filter((color) =>
            color.includes(lowerQuery)
        );

        if (isNameMatch) {
            return [{ ...item }];
        } else if (matchedColors.length > 0) {
            return matchedColors.map((color) => ({
                ...item,
                colorNumbers: [color],
            }));
        } else {
            return [];
        }
    });
});

const openDropdown = () => {
    isDropdownOpen.value = true;
};

const closeDropdown = () => {
    setTimeout(() => {
        isDropdownOpen.value = false;
    }, 200);
};
</script>

<template>
    <div>
        <span class="flex underline">Tkanina</span>
        <div class="relative inline-block dropdown">
            <input
                type="text"
                v-model="selectedProdukt.opcje.material"
                placeholder="Wyszukaj..."
                @focus="openDropdown"
                @blur="closeDropdown"
                class="w-full p-2 pb-1 text-base border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                v-if="selectedProdukt.opcje.material"
                @click="selectedProdukt.opcje.material = ''"
                class="absolute px-2 py-0.5 rounded bg-slate-300 hover:bg-slate-200 right-1 top-1.5"
            >
                x
            </button>
            <div
                class="absolute z-10 w-full mt-2 overflow-y-auto bg-white rounded-md shadow-lg dropdown-content max-h-60"
                v-if="isDropdownOpen"
            >
                <ul class="divide-y divide-gray-200">
                    <li
                        v-for="(item, index) in filteredItems"
                        :key="index"
                        class="p-1"
                    >
                        <button
                            class="w-full p-2 text-left hover:bg-slate-400 hover:text-white"
                            v-for="kolor in item.colorNumbers"
                            @click="material(item, kolor)"
                        >
                            {{ item.name }} - {{ kolor }} - [gr.{{
                                item.grupa
                            }}]
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 5px;
}

/* Apply the Tailwind CSS scrollbar classes */
.dropdown-content ul {
    @apply list-none p-0;
}

.dropdown-content li {
    @apply cursor-pointer;
}

.dropdown-content::-webkit-scrollbar {
    @apply w-2;
}

.dropdown-content::-webkit-scrollbar-track {
    @apply bg-gray-200;
}

.dropdown-content::-webkit-scrollbar-thumb {
    @apply bg-gray-400 rounded;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500;
}
</style>
