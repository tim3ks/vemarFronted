<script setup>
import { onClickOutside } from "@vueuse/core";
const { filterStatus } = storeToRefs(useStore());
const { filter } = useStore();

const isOpen = ref(false);

const toggle = (e) => {
    setTimeout(() => (isOpen.value = true));
    // (isOpen.value = !isOpen.value)
};

onClickOutside(isOpen, (event) => {
    setTimeout(() => {
        isOpen.value = false;
    }, 100);
});

watch(
    () => filterStatus.value,
    (val) => {
        filter();
    }
);

const statusy = [
    {
        id: 1,
        name: "Nowy",
        color: "bg-green-400",
    },
    {
        id: 2,
        name: "Pomiar",
        color: "bg-red-400",
    },
    {
        id: 3,
        name: "Produkcja",
        color: "bg-yellow-400",
    },
    {
        id: 4,
        name: "Montaż",
        color: "bg-blue-400",
    },
];
</script>

<template>
    <!-- <div>

		<input type="checkbox" v-model="filterStatus" :value="1"/>
		{{ filterStatus }}
	</div> -->
    <div class="flex items-center gap-2">
        <div>
            <input
                type="text"
                class="p-[6px] ring-2 rounded-sm border-blue-500 disabled:shadow-none focus:outline-none duration-300 focus:duration-500 font-semibold focus:uppercase text-gray-600"
                placeholder="Wyszukaj klienta"
            />
        </div>
        <div class="relative">
            <button
                :class="{
                    '!bg-red-300': isOpen,
                    'bg-red-400': !isOpen,
                }"
                class="flex items-center gap-1 px-3 py-2 text-white duration-300 rounded-md animate-shake animate-once"
                @click.prevent="toggle"
            >
                <i :class="`pi pi-filter`" style="font-size: 1rem" />Status
            </button>
            <div
                class="absolute right-0 transition-all ease-out border rounded-[5px] w-36 border-slate-300 bg-slate-200 top-[41px] z-20"
                v-if="isOpen"
                ref="target"
            >
                <ul class="flex flex-col gap-[3px] p-2 shadow-md">
                    <li
                        v-for="status in statusy"
                        :class="`px-3 py-2 text-white flex-row gap-4 items-center ${status.color}`"
                    >
                        <label>
                            <input
                                type="checkbox"
                                v-model="filterStatus"
                                :value="status.id"
                            />
                            {{ status.name }}
                        </label>
                    </li>
                </ul>
                <!-- <button class="w-full text-sm" @click="console.log('link')">Wyloguj</button> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
@container style(--isNew: true) {
    .li {
        border: 2;
        border-color: aqua;
    }
}
</style>
