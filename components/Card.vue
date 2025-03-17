<script setup>
defineProps({});
</script>

<template>
    <div>
        <span class="cardStyleTitle">
            <slot name="title" />
        </span>
        <slot name="cardContent" />
    </div>
</template>
