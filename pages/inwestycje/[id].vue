<script setup>

const { newPomiar } = useStore();
const { id } = useRoute().params;

// newPomiar(id);
// onMounted(()=>{
// })
</script>
<template>
    <div>
        {{ id }}
    </div>
</template>
