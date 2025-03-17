<script setup>
const uuid = () => crypto.randomUUID();
const route = useRoute();



</script>
<template>
    <div class="flex flex-col gap-2 p-2">
        <!-- <Button label="+" @click="$router.push({path:'/pomiary/nowy'})"/> -->
        <!-- :to="`/pomiary/${uuid()}`" -->
        <div class="flex justify-between" v-if="route.fullPath === '/inwestycje'">
            <NuxtLink
                class="flex items-center gap-1 p-2 text-white duration-300 bg-green-400 border rounded-md hover:bg-green-600"
                to="/inwestycje/nowy"><i class="pi pi-plus" style="font-size: 1rem" />Nowy
                pomiar</NuxtLink>
            <div>


            </div>
            <div class="flex items-center">
                <PomiaryFilter />
                <!-- <NuxtLink
                    v-if="route.fullPath === '/pomiary'"
                    class="p-2 text-white bg-green-400 border rounded-md"
                    to="/pomiary/nowy"
                    >Nowy pomiar</NuxtLink
                > -->
            </div>
        </div>
        <slot />
    </div>
</template>
