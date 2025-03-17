<script setup>
const uchwyty = [
    { id: 1, name: "bezinwazyjny dolny", rodzaje: ["15mm", "19mm", "24mm"] },
    { id: 2, name: "bezinwazyjny górny", rodzaje: ["15mm", "19mm", "24mm"] },
    {
        id: 3,
        name: "bezinwazyjny górny długi",
        rodzaje: ["15mm", "19mm", "24mm"],
    },
];
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="relative flex flex-row gap-1">
            <span class="underline">Mocowanie</span>
        </div>
    </div>
</template>
