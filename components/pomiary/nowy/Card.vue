<script setup>
const { isCompany } = storeToRefs(useStore());

const props = defineProps({
    name: { type: String },
    headerClass: { type: String },
});
</script>
<template>
    <div class="flex flex-col">
        <div
            :class="`p-2 gap-2 justify-between flex text-white ${headerClass}`"
        >
            <span class="text-white">{{ name }}</span>
            <div class="flex gap-2" v-if="name === '*** Klient ***'">
                <label class="flex items-center gap-1"
                    >Firma<input type="radio" value="Firma" v-model="isCompany"
                /></label>
                <label class="flex items-center gap-1"
                    >Prywatna<input
                        type="radio"
                        value="Prywatna"
                        v-model="isCompany"
                /></label>
            </div>
        </div>

        <slot />
    </div>
</template>
