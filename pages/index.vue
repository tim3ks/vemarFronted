<script setup>

// definePageMeta({
//     layout: 'main'
// })
const supabase = useSupabaseClient();
const { userRoles } = useStore();

useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "My amazing site." }],
});

const user = useSupabaseUser();

// await callOnce(async () => {
//     if (user.value) {
//         userRoles()
//         // supabase
//         //     .channel("roles")
//         //     .on(
//         //         "postgres_changes",
//         //         {
//         //             event: "*",
//         //             schema: "public",
//         //             table: "user_roles",
//         //         },
//         //         (payload) => {
//         //             const { eventType } = payload;
//         //             if (
//         //                 eventType === "UPDATE" ||
//         //                 eventType === "INSERT" ||
//         //                 eventType === "DELETE"
//         //             ) {
//         //                 // console.log("zmiana");
//         //                 // getPomiary();
//         //                 // alert('Nowe pomiary!')
//         //                 // reloadNuxtApp({
//         //                 //     path: "/",
//         //                 //     ttl: 1000, // default 10000
//         //                 // });
//         //             }
//         //         }
//         //     )
//         //     .subscribe();
//     }
// });


</script>
<template>
    <div class="flex items-center justify-center select-none">
        Główna
        <!-- <Button label="toast" @click="showToast('success')" /> -->
    </div>
</template>
