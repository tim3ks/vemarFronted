<script setup>
defineProps({
    text: { type: String },
});
</script>
<template>
    <div
        class="w-1/3 p-2 text-xs font-bold text-center text-gray-700 duration-300 bg-blue-300 border border-gray-400 rounded-sm cursor-pointer hover:opacity-70 active:bg-blue-200"
    >
        {{ text }}
    </div>
</template>
