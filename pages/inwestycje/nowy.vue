<script setup>
// import { useStore } from "~/store";
import cards from "@/components/pomiary/nowy";

const { pomiar, isCompany } = storeToRefs(useStore());
const { newPomiar, zapiszPomiar } = useStore();


onMounted(() => {
    newPomiar();
});


const disabled = ref(false)

const zapisz = () => {
    disabled.value = true
    zapiszPomiar()
    disabled.value ? setTimeout(() => {
        disabled.value = false
    }, 2000) : null
}



</script>
<template>
    <div class="p-2">
        <div class="flex items-center gap-1">

            <span class="p-1 font-semibold ">ID:</span>
            <span class="p-1 font-semibold underline">{{ pomiar.pomiar_id }}</span>
            <!-- <pre>{{ pomiar }}</pre> -->
        </div>
        <div class="gap-3 pt-8 md:grid-cols-3 md:grid sm:gap-2">
            <PomiaryNowyCard v-for="item in cards"  :name="item.name" :headerClass="item.headerClass" >
                <component :is="item.component" :pomiar="pomiar" :contentClass="item.contentClass" />
            </PomiaryNowyCard>
        </div>
        <!-- <button @click.prevent="zapisz" :disabled="disabled" class="bg-green-500 justify-self-end">Zapisz</button> -->
    </div>
</template>
