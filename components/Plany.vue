<script setup>
const { selectedProdukt, planModal } = storeToRefs(wycenyStore());

const addPlan = () => {
    const length = selectedProdukt.value.opcje.plany.length;

    selectedProdukt.value.opcje.plany.push({
        nazwa: `Rys.${length === 0 ? 1 : length + 1}`,
        lines: [],
    });
    if (length > 0) console.log(length);
};

const selectedPlan = ref(null);

const toggleModal = (index) => {
    selectedPlan.value = index;
    planModal.value = !planModal.value;
};

const deletePlan = (index) => {
    selectedProdukt.value.opcje.plany.splice(index, 1);
};
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="relative flex flex-row gap-1">
            <span class="underline">Plany</span
            ><button
                class="absolute left-12 top-0 px-1.5 text-white bg-blue-400 hover:bg-blue-500 rounded-full"
                @click="addPlan"
            >
                +
            </button>
        </div>

        <Plan
            v-if="selectedProdukt.opcje.plany?.length"
            class="p-0.5"
            v-for="(plan, index) in selectedProdukt.opcje.plany"
            :plan="{ ...plan, index }"
            @delete-plan="deletePlan"
            @toggle-plan="toggleModal"
        />
        <span v-else>Brak planów</span>
        <ModalPlany :isOpen="planModal" :selectedPlan="selectedPlan" />
    </div>
</template>
