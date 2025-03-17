<script setup>
defineEmits(["changePage"]);
</script>
<template>
    <div>
        <span>Pagination</span>
        <button @click="$emit('changePage')">page</button>
    </div>
</template>
