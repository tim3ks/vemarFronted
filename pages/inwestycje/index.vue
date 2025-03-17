<script setup>

const supabase = useSupabaseClient();
const { getPomiary, filter } = useStore();
const { pomiary } = storeToRefs(useStore());


// const filtered = computed(() => {
//     return  filter;
// });

const channel = supabase
    .channel("pomiary")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "pomiary",
        },
        (payload) => {
            const { eventType } = payload;
            if (
                eventType === "UPDATE" ||
                eventType === "INSERT" ||
                eventType === "DELETE"
            ) {
                // console.log("zmiana");
                getPomiary();
                // alert('Nowe pomiary!')
                // reloadNuxtApp({
                //     path: "/",
                //     ttl: 1000, // default 10000
                // });
            }
        }
    )
    .subscribe();

onMounted(() => {
    getPomiary();
    // return filter
});


const pageChange = () => {
    console.log("page change");
};

</script>
<template>
    <div>
        <!-- <div>
        <input v-model.number="filterStatus" @change="filter"/>
        </div> -->

        <span v-if="!pomiary.length">Lista pomiarów jest pusta!</span>
        <div v-else v-for="item in pomiary" :key="item.id" class="row">
            <NuxtLink :to="`/inwestycje/${item.pomiar_id}`">
                <PomiaryRow  :pomiar="item" />
            </NuxtLink>
        </div>
        <PomiaryPagination @changePage="pageChange" />
    </div>
</template>

<style scoped>
.row:nth-child(odd) {
    @apply bg-blue-200
}
.row:nth-child(even) {
    @apply bg-blue-100
}
.row:hover {
    @apply opacity-80
}
</style>
