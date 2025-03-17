<script setup>
const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop
    selectedProdukt: {
        type: Object,
    },
});

const { pomieszczenia } = storeToRefs(wycenyStore());

const emit = defineEmits(["pomieszczenie"]);

const changePietro = () => {
    switch (props.selectedProdukt.pietro) {
        case "parter":
            return emit("pomieszczenie", "p.1");
        case "p.1":
            return emit("pomieszczenie", "p.2");
        case "p.2":
            return emit("pomieszczenie", "parter");
        default:
            break;
    }
};

watch(
    () => props.selectedProdukt.pomieszczenie,
    (newD, oldD) => {
        if (newD !== oldD) emit("pomieszczenie", "parter");
    }
    // { deep: true }
);

onMounted(() => {
    emit("pomieszczenie", "parter");
});
</script>

<template>
    <div class="flex flex-wrap gap-3 px-2 py-4">
        <label
            v-for="item in pomieszczenia"
            :key="item.id"
            :for="item.name"
            :class="[
                selectedProdukt.pomieszczenie == item.value
                    ? `ring-4 shadow-md duration-300 ${item.color} text-white`
                    : 'bg-gray-200',
            ]"
            class="relative items-center px-2 py-1 text-sm cursor-pointer ring-1"
        >
            <span
                v-if="selectedProdukt.pomieszczenie === item.value"
                class="absolute z-20 px-1 py-1 text-xs font-semibold rounded-sm ring-1 bg-slate-100 text-slate-700 -right-1 -top-7"
                >{{ selectedProdukt.pietro }}</span
            >
            <input
                v-if="
                    selectedProdukt.pomieszczenie == item.value &&
                    item.value === 'opis'
                "
                class="p-1 text-slate-800 focus:outline-none"
                type="text"
                v-model="selectedProdukt.opis"
            />
            <input
                type="radio"
                :id="item.name"
                class="hidden"
                :value="item.value"
                v-model="selectedProdukt.pomieszczenie"
                @click="changePietro"
            />
            {{ item.name }}
        </label>
    </div>
</template>
