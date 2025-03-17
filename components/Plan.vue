<script setup>
defineProps({
    plan: {
        type: Object,
    },
});

defineEmits(["delete-plan", "toggle-plan"]);
</script>

<template>
    <div class="flex flex-row justify-between text-sm">
        <button @click="$emit('toggle-plan', plan.index)">
            {{ plan.nazwa }}
        </button>

        <button class="z-30" @click="$emit('delete-plan', plan.index)">
            Usuń
        </button>
    </div>
</template>
